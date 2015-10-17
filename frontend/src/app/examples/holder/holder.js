/**
 * Holder component to wrap all holder specified stuff together. This component is divided to following logical components:
 *
 *  Controllers
 *  Models
 *
 * All of these are wrapped to 'frontend.holder' angular module.
 */
(function() {
  'use strict';

  // Define frontend.holder angular module
  angular.module('frontend.examples.holder', []);

  // Module configuration
  angular.module('frontend.examples.holder')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // holder list
          .state('examples.holders', {
            url: '/examples/holders',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/holder/list.html',
                controller: 'HolderListController',
                resolve: {
                  _items: [
                    'ListConfig',
                    'HolderModel',
                    function resolve(
                      ListConfig,
                      HolderModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        populate: 'territories',
                        limit: config.itemsPerPage,
                        sort: 'releaseDate DESC'
                      };

                      return HolderModel.load(parameters);
                    }
                  ],
                  _count: [
                    'HolderModel',
                    function resolve(HolderModel) {
                      return HolderModel.count();
                    }
                  ],
                  _territories: [
                    'TerritoryModel',
                    function resolve(TerritoryModel) {
                      return TerritoryModel.load();
                    }
                  ]
                }
              }
            }
          })

          // Single holder
          .state('examples.holder', {
            url: '/examples/holder/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/holder/holder.html',
                controller: 'HolderController',
                resolve: {
                  _holder: [
                    '$stateParams',
                    'HolderModel',
                    function resolve(
                      $stateParams,
                      HolderModel
                    ) {
                      return HolderModel.fetch($stateParams.id, {populate: 'territories'});
                    }
                  ],
                  _territories: [
                    'TerritoryModel',
                    function resolve(TerritoryModel) {
                      return TerritoryModel.load();
                    }
                  ]
                }
              }
            }
          })

          // Add new holder
          .state('examples.holder.add', {
            url: '/examples/holder/add',
            data: {
              access: 2
            },
            views: {
              'content@': {
                templateUrl: '/frontend/examples/holder/add.html',
                controller: 'HolderAddController',
                resolve: {
                  _territories: [
                    'TerritoryModel',
                    function resolve(TerritoryModel) {
                      return TerritoryModel.load();
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