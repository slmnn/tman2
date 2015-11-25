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

    // Name for address
    name: "STRING",

    // Address
    address: "STRING",

    // Type
    type: "STRING",
    
    // Added datetime
    added: "datetime",

    // Below is all specification for relations to another models

    // Special address belongs to a territory.
    territory: {
      model: 'territory',
    }
  }
});