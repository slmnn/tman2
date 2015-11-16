/**
 * This file contains all necessary Angular model definitions for 'frontend.app.territoryLinkAttribute
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  // Define frontend.app.territoryLinkAttribute angular module
  angular.module('frontend.app.territoryLinkAttribute', []);

  /**
   * Model for TerritoryLinkAttribute API, this is used to wrap all TerritoryLinkAttribute objects specified actions and data change actions.
   */
  angular.module('frontend.app.territoryLinkAttribute')
    .service('TerritoryLinkAttributeModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('territoryLinkAttribute');
      }
    ])
  ;
}());
