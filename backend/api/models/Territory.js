'use strict';

var _ = require('lodash');

/**
 * Book.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
  attributes: {

    /* Tells the rough direction of a territory */
  	territoryLetter : {
  		type : "STRING"
  	},

  	/* Identifies the territory */
  	territoryNumber : {
  		type : "INTEGER",
  		min : 0
  	},

  	/* Territory code (letter+number) */
  	territoryCode : {
  		type : "STRING"
  	},

    /* How long it took to cover the territory */
    lastCoveredTime : "INTEGER",

    /* When was the last notification email sent */
    notificationEmailDate : "DATE",

  	/* When the territory is "taken" to a holder */
    taken : "DATE",

    /* When the holder was really changed last time? */
  	reallyTaken : "DATE",

    /* When the territory is "covered" by a holder */
    covered : "DATE",

    /* Not active anymore */
    archived : "BOOLEAN",

    /* type: normal, phone, business */
    type : "STRING",

    /* Coordinates */
    lat : "FLOAT",
  	lng : "FLOAT",

    /* Description */
    description : "STRING",

    // Below is all specification for relations to another models

    // Author of the book
    holder: {
      model: 'holder'
    }

    // Link to coordinates pointing to territory center.
    center: {
      model: "coordinate"
    },

    // Link to number of coodinates indicating territory border.
    territories: {
      collection: 'coordinate',
      via: 'territory'
    },

    attributes: {
      collection: 'attribute',
      via: 'territory'
    }

  }
});
