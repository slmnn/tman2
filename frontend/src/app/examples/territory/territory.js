/**
 * Territory component to wrap all territory specified stuff together. This component is divided to following logical
 * components:
 *
 *  Controllers
 *  Models
 *
 * All of these are wrapped to 'frontend.examples.territory' angular module.
 */
(function() {
  'use strict';

  // Define frontend.examples.territory angular module
  angular.module('frontend.examples.territory', []);

  // Module configuration
  angular.module('frontend.examples.territory')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          // Territorys list
          .state('examples.territories', {
            url: '/examples/territories',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territory/list.html',
                controller: 'TerritoryListController',
                resolve: {
                  _items: [
                    'ListConfig',
                    'TerritoryModel',
                    function resolve(
                      ListConfig,
                      TerritoryModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        populate: ['holder', 'territoryHolderHistory'],
                        limit: config.itemsPerPage,
                        sort: 'name ASC'
                      };

                      return TerritoryModel.load(parameters);
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
                  _count: [
                    'TerritoryModel',
                    function resolve(TerritoryModel) {
                      return TerritoryModel.count();
                    }
                  ]
                }
              }
            }
          })

          // Single territory
          .state('examples.territory', {
            url: '/examples/territory/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territory/territory.html',
                controller: 'TerritoryController',
                resolve: {
                  _territory: [
                    '$stateParams',
                    'TerritoryModel',
                    function resolve(
                      $stateParams,
                      TerritoryModel
                    ) {
                      return TerritoryModel.fetch($stateParams.id, {populate: ['holder', 'territoryHolderHistory', 'center', 'coordinates']});
                    }
                  ],
                  _territoryHolderHistory: [
                    '$stateParams',
                    'TerritoryHolderHistoryModel',
                    function resolve(
                      $stateParams,
                      TerritoryHolderHistoryModel
                    ) {
                      return TerritoryHolderHistoryModel.load();
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
                  _holdersCount: [
                    '$stateParams',
                    'HolderModel',
                    function resolve(
                      $stateParams,
                      HolderModel
                    ) {
                      return HolderModel.count({territory: $stateParams.id});
                    }
                  ]
                }
              }
            }
          })

          // Add new territory
          .state('examples.territory.add', {
            url: '/examples/territory/add',
            data: {
              access: 2
            },
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territory/add.html',
                controller: 'TerritoryAddController',
                resolve: {
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
                  ]
                }
              }
            }
          })
        ;
      }
    ])
  ;
}());
