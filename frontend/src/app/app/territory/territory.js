/**
 * Territory component to wrap all territory specified stuff together. This component is divided to following logical
 * components:
 *
 *  Controllers
 *  Models
 *
 * All of these are wrapped to 'frontend.app.territory' angular module.
 */
(function() {
  'use strict';

  // Define frontend.app.territory angular module
  angular.module('frontend.app.territory', []);

  // Module configuration
  angular.module('frontend.app.territory')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          // Territorys list
          .state('app.territories', {
            url: '/app/territories',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/list.html',
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
                        populate: ['holder', 'territoryHolderHistory', 'territoryLinkAttribute'],
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
                      return HolderModel.load();
                    }
                  ],
                  _attributes: [
                    '$stateParams',
                    'AttributeModel',
                    function resolve(
                      $stateParams,
                      AttributeModel
                    ) {
                      return AttributeModel.load();
                    }
                  ],
                  _count: [
                    'TerritoryModel',
                    function resolve(TerritoryModel) {
                      return TerritoryModel.count();
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

          // S-13
          .state('app.territories.s13', {
            url: '/app/territories/s13',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/s13.html',
                controller: 'TerritoryS13Controller',
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
                        limit: 999,
                        sort: 'territoryCode ASC'
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
                  ]
                }
              }
            }
          })

          // Stats
          .state('app.territories.stats', {
            url: '/app/territories/stats',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/stats.html',
                controller: 'TerritoryStatsController',
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
                        populate: ['territoryHolderHistory'],
                        limit: 999,
                        sort: 'territoryCode ASC'
                      };

                      return TerritoryModel.load(parameters);
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

          // Map
          .state('app.territories.map', {
            url: '/app/territories/map',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/map.html',
                controller: 'TerritoryMapController',
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
                        populate: ['holder', 'center'],
                        limit: 999,
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
                      return HolderModel.load();
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

          // Map
          .state('app.territories.quickview', {
            url: '/app/territories/quickview',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/quickview.html',
                controller: 'TerritoryQuickViewController',
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
                        populate: ['holder', 'center'],
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
                      return HolderModel.load();
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

          // Single territory
          .state('app.territory', {
            url: '/app/territory/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/territory.html',
                controller: 'TerritoryController',
                resolve: {
                  _territory: [
                    '$stateParams',
                    'TerritoryModel',
                    function resolve(
                      $stateParams,
                      TerritoryModel
                    ) {
                      return TerritoryModel.fetch(
                        $stateParams.id, 
                        {
                          populate: [
                            'holder', 
                            'territoryHolderHistory', 
                            'center', 
                            'coordinates', 
                            'territoryLinkAttribute',
                            'specialAddress'
                          ]
                        }
                      );
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
                  _attributes: [
                    '$stateParams',
                    'AttributeModel',
                    function resolve(
                      $stateParams,
                      AttributeModel
                    ) {
                      return AttributeModel.load();
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

          // Add new territory
          .state('app.territory.add', {
            url: '/app/territory/add',
            data: {
              access: 2
            },
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/add.html',
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
        ;
      }
    ])
  ;
}());
