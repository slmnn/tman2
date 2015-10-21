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
  	
    name : "string",

  	lastStats : "DATE",

  	notCoveredLimit : "INTEGER",

  	notCoveredWarningEmailLimit : "INTEGER",

  	holderNotChangedWarningLimit : "INTEGER",

  	holderChangePreventedIfLimitExeeded : "BOOLEAN",
  	
  	holderChangeToDefaultIfLimitExeeded : "BOOLEAN",

    defaultLatitude : "FLOAT",
    defaultLongitude : "FLOAT",

  	defaultHolder : {
    	model: 'holder'
    }
  }
});
