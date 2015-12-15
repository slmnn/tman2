/**
 * Login history component. This component is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.admin.migrate' angular module. This also contains necessary route
 * definitions for this module.
 */
(function() {
  'use strict';

  // Define frontend.admin module.migrate
  angular.module('frontend.admin.migrate', []);

  // Module configuration
  angular.module('frontend.admin.migrate')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('admin.migrate', {
            url: '/app/migrate',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/migrate/migrate.html',
                controller: 'MigrateController',
                name: 'Migraatio',
                resolve: {
                  _territories: [
                    'TerritoryModel',
                    function resolve(TerritoryModel) {
                      return TerritoryModel.load();
                    }
                  ],
                  _app: [
                    '$stateParams',
                    'AppModel',
                    function resolve(
                      $stateParams,
                      AppModel
                    ) {
                      return AppModel.load();
                    }
                  ],
                  _holders: [
                    '$stateParams',
                    'HolderModel',
                    function resolve(
                      $stateParams,
                      HolderModel
                    ) {

                      // Load all holders, later add isActive param.
                      return HolderModel.load();
                    }
                  ],
                }
              }
            }
          })
        ;
      }
    ])
  ;
}());
