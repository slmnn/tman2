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

    /* When the territory is "covered" by a holder */
    covered : "DATE",

    /* Not active anymore */
    archived : "BOOLEAN",

    /* Not active anymore */
    notCountedWhenCalculatingCoveredDuringLastYearTotal : "BOOLEAN",

    /* type: normal, phone, business */
    type : "STRING",

    /* Description */
    description : "STRING",

    /* Url to PDF file */
    pdfUrl : "STRING",

    /* Apartmetn count */
    apartmentCount : "INTEGER",

    // Below is all specification for relations to another models

    // Holder of the territory
    holder: {
      model: 'holder'
    },

    // Link to coordinates pointing to territory center.
    center: {
      model: "coordinate"
    },

    // Link to number of coodinates indicating territory border.
    coordinates: {
      collection: 'coordinate',
      via: 'territory'
    },

    territoryLinkAttribute: {
      collection: 'territoryLinkAttribute',
      via: 'territory'
    },

    territoryHolderHistory: {
      collection: 'territoryHolderHistory',
      via: 'territory'
    },

  }
});
