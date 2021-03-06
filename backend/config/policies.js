'use strict';

/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */
module.exports.policies = {
  // Default policy for all controllers and actions
  '*': ['authenticated'],

  // Author controller
  AuthController: {
    '*':              ['passport'],
    'checkPassword':  ['authenticated']
  },

  // Mail controller
  MailController: {
    '*':        ['authenticated']
  },

  RequestLogController: {
    '*':          false,
    'statistics': ['authenticated', 'isAdmin'],
    'count':      ['authenticated', 'isAdmin'],
    'find':       ['authenticated', 'isAdmin'],
    'findOne':    ['authenticated', 'isAdmin'],
    'create':     false,
    'update':     false,
    'destroy':    false,
    'add':        false,
    'remove':     false
  },

  // Territory controller
  TerritoryController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'isAdmin', 'addDataCreate'],
    'update':   ['authenticated', 'addDataUpdate'],
    'destroy':  ['authenticated', 'isAdmin'],
    'add':      ['authenticated', 'isAdmin'],
    'remove':   ['authenticated', 'isAdmin']
  },

  // Holder controller
  HolderController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'isAdmin', 'addDataCreate'],
    'update':   ['authenticated', 'addDataUpdate'],
    'destroy':  ['authenticated', 'isAdmin'],
    'add':      ['authenticated', 'isAdmin'],
    'remove':   ['authenticated', 'isAdmin']
  },

  SpecialAddressController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'addDataCreate'],
    'update':   ['authenticated', 'addDataUpdate'],
    'destroy':  ['authenticated', 'isAdmin'],
    'add':      ['authenticated'],
    'remove':   ['authenticated', 'isAdmin']
  },

  CoordinateController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'isAdmin', 'addDataCreate'],
    'update':   ['authenticated', 'isAdmin', 'addDataUpdate'],
    'destroy':  ['authenticated', 'isAdmin'],
    'add':      ['authenticated', 'isAdmin'],
    'remove':   ['authenticated', 'isAdmin']
  },

  TerritoryHolderHistoryController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'addDataCreate'],
    'update':   ['authenticated', 'addDataUpdate'],
    'destroy':  ['authenticated', 'isAdmin'],
    'add':      ['authenticated'],
    'remove':   ['authenticated', 'isAdmin']
  },

  StatController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'addDataCreate'],
    'update':   ['authenticated', 'isAdmin', 'addDataUpdate'],
    'destroy':  ['authenticated', 'isAdmin'],
    'add':      ['authenticated'],
    'remove':   ['authenticated', 'isAdmin']
  },

  AttributeController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'isAdmin', 'addDataCreate'],
    'update':   ['authenticated', 'isAdmin', 'addDataUpdate'],
    'destroy':  ['authenticated', 'isAdmin'],
    'add':      ['authenticated', 'isAdmin'],
    'remove':   ['authenticated', 'isAdmin']
  },

  TerritoryLinkAttributeController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'addDataCreate'],
    'update':   ['authenticated', 'addDataUpdate'],
    'destroy':  ['authenticated'],
    'add':      ['authenticated'],
    'remove':   ['authenticated']
  },

  AppController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'isAdmin', 'addDataCreate'],
    'update':   ['authenticated', 'isAdmin', 'addDataUpdate'],
    'destroy':  false,
    'add':      false,
    'remove':   false
  },

  // User controller
  UserController: {
    '*':        ['authenticated'],
    'count':    ['authenticated'],
    'find':     ['authenticated'],
    'findOne':  ['authenticated'],
    'create':   ['authenticated', 'isAdmin', 'addDataCreate'],
    'update':   ['authenticated', 'isAdmin', 'addDataUpdate'],
    'destroy':  ['authenticated', 'isAdmin'],
    'add':      ['authenticated', 'isAdmin'],
    'remove':   ['authenticated', 'isAdmin']
  },

  // UserLogin controller
  UserLoginController: {
    '*':          false,
    'statistics': ['authenticated', 'isAdmin'],
    'count':      ['authenticated', 'isAdmin'],
    'find':       ['authenticated', 'isAdmin'],
    'findOne':    ['authenticated', 'isAdmin'],
    'create':     false,
    'update':     false,
    'destroy':    false,
    'add':        false,
    'remove':     false
  }
};
