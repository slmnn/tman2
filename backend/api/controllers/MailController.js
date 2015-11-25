/**
 * TerritoryController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var nodemailer = require("nodemailer");
var async = require("async");

var createEmailMessage = function(in_template, in_holder, in_territory, in_listOfTerritories, app) {
  var subjectTxt = in_template.title.replace("_holderName", in_holder.name);
  subjectTxt = subjectTxt.replace("_territoryCode", in_territory.territoryCode);
  var bodyHTML = in_template.body.replace("_territoryCode", in_territory.territoryCode);
  bodyHTML = bodyHTML.replace("_territoryLat", in_territory.center.latitude);
  bodyHTML = bodyHTML.replace("_territoryLng", in_territory.center.longitude);
  var taken = new Date(in_territory.taken);
  var covered = new Date(in_territory.covered);
  bodyHTML = bodyHTML.replace("_taken", taken.getFullYear() + "-" + (taken.getMonth()+1) + "-" + taken.getDate());
  bodyHTML = bodyHTML.replace("_covered", covered.getFullYear() + "-" + (covered.getMonth()+1) + "-" + covered.getDate());
  bodyHTML = bodyHTML.replace("_holderName", in_holder.name);
  bodyHTML = bodyHTML.replace("_territoryDetails", in_territory.description);
  bodyHTML = bodyHTML.replace("_listAllTerritoryCodes", in_listOfTerritories);
  var mailOptions = {
    from: app.notificationEmailSenderAddress, // sender address
    to: in_holder.email, // list of receivers
    subject: subjectTxt, // Subject line
    text: "Viesti on mahdollista lukea vain HTML-muodossa.", // plaintext body
    html: bodyHTML // html body
  }
  return mailOptions;
};

var createEmailObject = function(t, t_all, h_all, app, template) {
  var current_holder = undefined;
  for(var j = 0; j < h_all.length; j++) {
    if(h_all[j].id == t.holder && h_all[j].emailValid === true) {
      current_holder = h_all[j];
    }
  }
  if(t.holder == app.defaultHolder && t.territoryHolderHistory && t.territoryHolderHistory.length > 0) {
    for(var j = 0; j < h_all.length; j++) {
      if(h_all[j].id == t.territoryHolderHistory[t.territoryHolderHistory.length-1].holder && h_all[j].emailValid === true) {
        current_holder = h_all[j];
      }
    }
  }
  if(typeof current_holder != "undefined") {
    var list_of_territories = [];
    for(var k = 0; k < t_all.length; k++) {
      if(t_all[k].holder == current_holder.id) {
        list_of_territories.push(t_all[k].territoryCode);
      }
    }
    var mail = createEmailMessage(
      template, 
      current_holder, 
      t,
      list_of_territories.toString(),
      app
    );
    return mail;
  }
  return undefined;
};

var sendMails = function(smtpTransport, mails, callback) {
  if(mails.length == 0) { 
    callback(); 
    return;
  }
  smtpTransport.sendMail(mails.pop(), function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Message sent: " + response.message);
      }
      sendMails(smtpTransport, mails, callback)
    }
  );
}

module.exports = {

  countNotificationEmails : function(request, response) {
    var App = sails.models.app;
    var Territory = sails.models.territory;

    App.find().exec(function(err, apps) {

      if(err) return;

      var app = apps[0];
      Territory.find().exec(function(err, t_all) {
        var new_territory_taken_emails = 0;
        var not_covered_territory_emails = 0;
        var territory_removed_emails = 0;

        var now = new Date();
        now = now.getTime();
        var not_covered_limit = now - (1000*60*60*24* app.notCoveredWarningEmailLimit);
        
        for(var i = 0; i < t_all.length; i++) {
          if(t_all[i].notificationEmailDate) {
            var reallyTaken = new Date(t_all[i].taken);
            reallyTaken = reallyTaken.getTime();
            var last_email_sent = new Date(t_all[i].notificationEmailDate);
            last_email_sent = last_email_sent.getTime();
            if(last_email_sent < reallyTaken && t_all[i].holder != app.defaultHolder) {
              new_territory_taken_emails++;
            } 
            if(last_email_sent < reallyTaken && t_all[i].holder == app.defaultHolder) {
              territory_removed_emails++;
            } 
            var taken = new Date(t_all[i].taken);
            taken = taken.getTime();
            if(not_covered_limit > taken 
              && last_email_sent < (now - 30*1000*60*60*24)
              && t_all[i].holder != app.defaultHolder) {
              not_covered_territory_emails++;
            }
          } else if(!t_all[i].notificationEmailDate && t_all[i].holder != app.defaultHolder) {
            new_territory_taken_emails++;
          }
        }
        return response.json({
          new_territory_taken_emails: new_territory_taken_emails,
          territory_removed_emails: territory_removed_emails,
          not_covered_territory_emails: not_covered_territory_emails
        });
      });
    });
  },

  sendNotificationEmails : function(request, response) {
    var App = sails.models.app;
    var Territory = sails.models.territory;
    var Holder = sails.models.holder;

    App.find().exec(function(err, apps) {

      if(err) return;

      var app = apps[0];

      // create reusable transport method (opens pool of SMTP connections)
      var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: app.smtpUsername,
            pass: app.smtpPassword
          }
      });

      Territory
        .find()
        .populate('territoryHolderHistory')
        .populate('center')
        .exec(function(err, t_all) {
        Holder.find().exec(function(err, h_all) {
          var new_territory_taken_emails = 0;
          var territory_removed_emails = 0;
          var not_covered_territory_emails = 0;

          var now = new Date();
          now = now.getTime();
          var mails = [];
          var t_to_be_updated = [];

          var not_covered_limit = now - (1000*60*60*24 * app.notCoveredWarningEmailLimit);
          
          // Iterate through all territories and create emails to be sent.
          for(var i = 0; i < t_all.length; i++) {
            if(t_all[i].notificationEmailDate ) {
              var taken = new Date(t_all[i].taken);
              taken = taken.getTime();
              var last_email_sent = new Date(t_all[i].notificationEmailDate);
              last_email_sent = last_email_sent.getTime();

              // holder is not default, and email is not sent
              if(last_email_sent < taken && t_all[i].holder != app.defaultHolder) {
                new_territory_taken_emails++;
                t_to_be_updated.push(t_all[i]);
                var mail = createEmailObject(t_all[i], t_all, h_all, app, 
                  {
                    body: app.notificationEmailNewTerritory,
                    title: app.notificationEmailNewTerritoryTitle
                  }
                );
                if(typeof mail != 'undefined') {
                  mails.push(mail);
                }
              } 

              // holder is now default and email is not sent
              if(last_email_sent < taken && t_all[i].holder == app.defaultHolder) {
                territory_removed_emails++;
                t_to_be_updated.push(t_all[i]);
                var mail = createEmailObject(t_all[i], t_all, h_all, app, 
                  {
                    body: app.notificationEmailRemovedTerritory,
                    title: app.notificationEmailRemovedTerritoryTitle
                  });
                if(typeof mail != 'undefined') {
                  mails.push(mail);
                }
              }

              // not_covered_limit is expired and email is not sent
              var taken = new Date(t_all[i].taken);
              taken = taken.getTime();
              if(not_covered_limit > taken && last_email_sent < (now - 30*1000*60*60*24) && t_all[i].holder != app.defaultHolder) {
                not_covered_territory_emails++;
                t_to_be_updated.push(t_all[i]);
                var mail = createEmailObject(t_all[i], t_all, h_all, app, 
                {
                  body: app.notificationEmailNotCoveredTerritory,
                  title: app.notificationEmailNotCoveredTerritoryTitle
                });
                if(typeof mail != 'undefined') {
                  mails.push(mail);
                }
              }
            } else if(!t_all[i].notificationEmailDate && t_all[i].holder != app.defaultHolder) {
              var mail = createEmailObject(t_all[i], t_all, h_all, app, 
                {
                  body: app.notificationEmailNewTerritory,
                  title: app.notificationEmailNewTerritoryTitle
                }
              );
              t_to_be_updated.push(t_all[i]);
              if(typeof mail != 'undefined') {
                mails.push(mail);
              }
            }
          }

          // Send emails
          async.each(t_to_be_updated, function(t, callback) {
            t.notificationEmailDate = new Date();
            t.save(function(err){
              callback();
            })
          }, function(result) {
            console.log("trying to send mails", mails)
            async.each(mails, function(mail, callback) {
              smtpTransport.sendMail(mail, function(error, response){
                if(error){
                  console.log(error);
                }else{
                  console.log("Message sent: " + response.message);
                }
                callback();
              });
            }, function() {
              smtpTransport.close(); // shut down the connection pool, no more messages
              return response.json({
                sentCount: mails.length
              });
            });
          });
        });
      });
    });
  },

  backupTerritoryData : function(request, response) {
    var App = sails.models.app;
    var Territory = sails.models.territory;
    var Holder = sails.models.holder;

    App.find().exec(function(err, apps) {

      if(err) return;

      var app = apps[0];

      // create reusable transport method (opens pool of SMTP connections)
      var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: app.smtpUsername,
          pass: app.smtpPassword
        }
      });

      var all_territories, all_holders, backup_email;
      var now = new Date();

      async.parallel([

        function(cb) {
          App.find().exec(function(err, a) {
            if(err || a.length == 0) cb("error");
            backup_email = a[0].backupEmail;
            a[0].lastBackup = now;
            a[0].save(cb)
          });       
        }, 

        function(cb) {
          Territory.find()
          .populate("center")
          .populate("coordinates")
          .populate("territoryLinkAttribute")
          .populate("territoryHolderHistory")
          .populate("specialAddress")
          .exec(function(err, all_t) {
            if(err) cb("error");
            all_territories = all_t;
            cb();
          })
        }, 

        function(cb) {
          Holder.find().exec(function(err, all_h) {
            if(err) cb("error");
            all_holders = all_h;
            cb();
          })
        }/*, 

        function(cb) {
          Trace.create(common.createTrace(request.user[0].username, "New email backup created."))
          .exec(function(err, trace) { 
            if(err) cb("error" + err);
            cb();
          });
        }*/
      ], 

      function(err) {
        if(err) {
          smtpTransport.close();
          console.log("Backup failed", err);
          return response.send("Backup failed", 500);
        }
        var mail = {
          from: app.smtpUsername,
          to: app.backupEmail,
          subject: "Territory Manager Backup " + now,
          text: "\n\n------- TERRITORIES --------\n\n" +
          JSON.stringify(all_territories) + 
          "\n\n------- HOLDERS ------------\n\n" +
          JSON.stringify(all_holders),
        }
        smtpTransport.sendMail(mail, function(error, res){
          if(error){
            console.log("Backup failed when sending mail", error);
            return response.json("error");
          } else{
            smtpTransport.close();
            console.log("Backup email was sent");
            return response.json("Backup job was run");
          }
        });      
      });
    });
  },

  _config: {}

};