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
  angular.module('frontend.examples.territoryHolderHistory', []);

  // Module configuration
  angular.module('frontend.examples.territoryHolderHistory')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          // Territorys list
          .state('examples.territoryHolderHistories', {
            url: '/examples/territoryHolderHistories',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territoryHolderHistories/list.html',
                controller: 'TerritoryHolderHistoryListController',
                resolve: {
                  _items: [
                    'ListConfig',
                    'TerritoryHolderHistoryModel',
                    function resolve(
                      ListConfig,
                      TerritoryHolderHistoryModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        populate: ['holder', 'territory'],
                        limit: config.itemsPerPage,
                        sort: 'name ASC'
                      };

                      return TerritoryHolderHistoryModel.load(parameters);
                    }
                  ],
                  _count: [
                    'TerritoryHolderHistoryModel',
                    function resolve(TerritoryHolderHistoryModel) {
                      return TerritoryHolderHistoryModel.count();
                    }
                  ]
                }
              }
            }
          })

          // Single territory
          .state('examples.territoryHolderHistory', {
            url: '/examples/territoryHolderHistory/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territoryHolderHistory/territoryHolderHistory.html',
                controller: 'TerritoryHolderHistoryController',
                resolve: {
                  _territoryHolderHistory: [
                    '$stateParams',
                    'TerritoryHolderHistoryModel',
                    function resolve(
                      $stateParams,
                      TerritoryHolderHistoryModel
                    ) {
                      return TerritoryHolderHistoryModel.fetch($stateParams.id, {populate: ['holder', 'territory']});
                    }
                  ],
                  _holder: [
                    '$stateParams',
                    'HolderModel',
                    function resolve(
                      $stateParams,
                      HolderModel
                    ) {
                      return HolderModel.load();
                    }
                  ],
                  _territory: [
                    '$stateParams',
                    'TerritoryModel',
                    function resolve(
                      $stateParams,
                      TerritoryModel
                    ) {
                      return TerritoryModel.load();
                    }
                  ]
                }
              }
            }
          })

          // Add new territory
          .state('examples.territoryHolderHistory.add', {
            url: '/examples/territoryHolderHistory/add',
            data: {
              access: 2
            },
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territoryHolderHistory/add.html',
                controller: 'TerritoryHolderHistoryAddController'
              }
            }
          })
        ;
      }
    ])
  ;
}());
