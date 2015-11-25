'use strict';

var _ = require('lodash');

/**
 * Author.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
  attributes: {
    lastBackup : "DATE",

  	backupInterval : "INTEGER",

    backupEmail : "string",

    smtpUsername : "string",
    smtpPassword : "string",
  	
    name : "string",

    lastStats : "DATE",

  	notCoveredLimit : "INTEGER",

  	notCoveredWarningEmailLimit : "INTEGER",

  	holderNotChangedWarningLimit : "INTEGER",

  	holderChangePreventedIfLimitExeeded : "BOOLEAN",
  	
  	holderChangeToDefaultIfLimitExeeded : "BOOLEAN",

    defaultLatitude : "FLOAT",
    defaultLongitude : "FLOAT",

    notificationEmailSenderAddress : "string",
    notificationEmailNewTerritory : "string",
    notificationEmailNewTerritoryTitle : "string",
    notificationEmailNotCoveredTerritory : "string",
    notificationEmailNotCoveredTerritoryTitle : "string",
    notificationEmailRemovedTerritory : "string",
    notificationEmailRemovedTerritoryTitle : "string",

  	defaultHolder : {
    	model: 'holder'
    }
  }
});
