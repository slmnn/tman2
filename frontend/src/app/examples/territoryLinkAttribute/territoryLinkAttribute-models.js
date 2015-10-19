/**
 * This file contains all necessary Angular model definitions for 'frontend.examples.territoryLinkAttribute
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  // Define frontend.examples.territoryLinkAttribute angular module
  angular.module('frontend.examples.territoryLinkAttribute', []);

  /**
   * Model for TerritoryLinkAttribute API, this is used to wrap all TerritoryLinkAttribute objects specified actions and data change actions.
   */
  angular.module('frontend.examples.territoryLinkAttribute')
    .service('TerritoryLinkAttributeModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('territoryLinkAttribute');
      }
    ])
  ;
}());
