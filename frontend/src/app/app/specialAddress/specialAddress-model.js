/**
 * This file contains all necessary Angular model definitions for 'frontend.app.specialAddress
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  // Define frontend.app.specialAddress angular module
  angular.module('frontend.app.specialAddress', []);

  /**
   * Model for Territory API, this is used to wrap all Territory objects specified actions and data change actions.
   */
  angular.module('frontend.app.specialAddress')
    .service('SpecialAddressModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('specialAddress');
      }
    ])
  ;
}());