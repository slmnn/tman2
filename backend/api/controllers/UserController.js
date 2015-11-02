'use strict';

var _ = require('lodash');

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {

	create : function create(req, res) {

		var User = sails.models.user;
		var Passport = sails.models.passport;

	  User.create(req.body).exec(
	  	function createCB(err,created) {
	  		if(!err) {
	  			console.log(created);
	  			Passport.create({
	  				password: req.body.password1 || process.ENV.DEFAULT_PASSWORD,
	  				protocol: 'local',
	  				user: created.id
	  			})
	  			.exec(function(err, createdPassport) {
	  				console.log("Passport", createdPassport);
	  				if(err){
	    				return res.negotiate(err); 			
	  				} else {
	  					return res.json(created);
	  				}
	  			})
	  		} else {
	    		return res.negotiate(err); 			
	  		}
	  	}
	  );
	}

});
