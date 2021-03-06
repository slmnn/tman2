/**
 * This file contains all necessary Angular model definitions for 'frontend.app.holder' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function () {
  'use strict';

  /**
   * Model for Holder API, this is used to wrap all Holder objects specified actions and data change actions.
   */
  angular.module('frontend.app.holder')
    .factory('HolderModel', [
      'DataModel',
      function factory(DataModel) {
        return new DataModel('holder');
      }
    ])
  ;
}());
