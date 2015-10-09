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
    // Name of the holder
    name: {
      type: 'string',
      required: true,
      unique : true
    },

    // Email address of the holder
    email : {
  		type : "email",
  		required : true
  	},

    // Is the email in use
    emailValid : {
      type : "boolean",
      required : true
    }

    // Telephone number of the holder
    telephone: {
      type: 'string',
      required: false
    },

    // Holder description
    description: {
      type: 'text'
    },

    // Below is all specification for relations to another models

    // Territories that area attached to holder
    territories: {
      collection: 'territory',
      via: 'holder'
    }
  }
});
