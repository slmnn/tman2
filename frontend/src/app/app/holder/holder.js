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
  angular.module('frontend.app.holder', []);

  // Module configuration
  angular.module('frontend.app.holder')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // holder list
          .state('app.holders', {
            url: '/app/holders',
            views: {
              'content@': {
                templateUrl: '/frontend/app/holder/list.html',
                controller: 'HolderListController',
                name: 'Alueomistajat',
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
                  _app: [
                    '$stateParams',
                    'AppModel',
                    function resolve(
                      $stateParams,
                      AppModel
                    ) {
                      return AppModel.load();
                    }
                  ]
                }
              }
            }
          })

          // Single holder
          .state('app.holder', {
            url: '/app/holder/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/app/holder/holder.html',
                controller: 'HolderController',
                name: 'Alueomistajan tiedot',
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
                  _app: [
                    '$stateParams',
                    'AppModel',
                    function resolve(
                      $stateParams,
                      AppModel
                    ) {
                      return AppModel.load();
                    }
                  ]
                }
              }
            }
          })

          // Add new holder
          .state('app.holder.add', {
            url: '/app/holder/add',
            data: {
              access: 2
            },
            views: {
              'content@': {
                templateUrl: '/frontend/app/holder/add.html',
                controller: 'HolderAddController',
                name: 'Alueomistajan lisääminen',
                resolve: {
                  _app: [
                    '$stateParams',
                    'AppModel',
                    function resolve(
                      $stateParams,
                      AppModel
                    ) {
                      return AppModel.load();
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
