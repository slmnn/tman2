/**
 * This file contains all necessary Angular model definitions for 'frontend.app.coordinate
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  // Define frontend.app.coordinate angular module
  angular.module('frontend.app.coordinate', []);

  /**
   * Model for Coordinate API, this is used to wrap all Coordinate objects specified actions and data change actions.
   */
  angular.module('frontend.app.coordinate')
    .service('CoordinateModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('coordinate');
      }
    ])
  ;
}());
