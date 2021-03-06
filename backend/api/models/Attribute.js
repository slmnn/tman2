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

    // Description of the attribute
    description: "string",

    // Name of the attribute
    name: "string",

    // Type of the attribute
    type: "string",

    // True if the attribute raises the territory to special attention list
    needsAttention: "boolean",

    // Icon class
    icon: "string",

    // Value as string
    value: "string"
  }
});
