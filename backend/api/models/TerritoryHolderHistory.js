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

    // Time period indicating how long the ownership was.
    startDate: { type: "DATE", required: true},
    endDate: "DATE",

    // Brief description
    description: "STRING",

    // Below is all specification for relations to another models

    // This history belongs to a holder.
    holder: {
      model: 'holder',
      required: true
    },

    // This history belongs to a territory.
    territory: {
      model: 'territory',
      required: true
    }
  }
});
