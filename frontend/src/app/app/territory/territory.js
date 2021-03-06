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
          .state('app.territory', {
            url: '/app/territory',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/list.html',
                controller: 'TerritoryListController',
                name: 'Aluelistaus',
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
                      return HolderModel.load({
                        where: {
                          isArchived:false
                        },
                        sort: 'name ASC'
                      });
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
          .state('app.territory.s13', {
            url: '/s13',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/s13.html',
                controller: 'TerritoryS13Controller',
                name: 'S13-lomake',
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
          .state('app.territory.stats', {
            url: '/stats',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/stats.html',
                controller: 'TerritoryStatsController',
                name: 'Tilastot',
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
                  ],
                  _stats: [
                    '$stateParams',
                    'StatModel',
                    function resolve(
                      $stateParams,
                      StatModel
                    ) {
                      return StatModel.load();
                    }
                  ]
                }
              }
            }
          })

          // Map
          .state('app.territory.map', {
            url: '/map',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/map.html',
                controller: 'TerritoryMapController',
                name: 'Kartta',
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
          .state('app.territory.quickview', {
            url: '/quickview',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/quickview.html',
                controller: 'TerritoryQuickViewController',
                name: 'Pikatarkastelu',
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

          .state("app.territory.add", {
              url: "/add",
              data: {
                access: 2
              },
              onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                  $modal.open({
                      templateUrl: '/frontend/app/territory/add.html',
                      resolve: {
                        _holders: [
                          'HolderModel',
                          function resolve(
                            HolderModel
                          ) {
                            return HolderModel.load({
                              where: {
                                isArchived: false
                              },
                              sort: 'name ASC'
                            });
                          }
                        ],
                        _app: [
                          'AppModel',
                          function resolve(
                            AppModel
                          ) {
                            return AppModel.load();
                          }
                        ]
                      },
                      controller: 'TerritoryAddController',
                      name: 'Uusi alue',
                      }).result.finally(function() {
                        $state.go('^');
                  });
              }]
          })

          // Single territory
          .state('app.territory.single', {
            url: '/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/app/territory/territory.html',
                controller: 'TerritoryController',
                name: 'Alueen tiedot',
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
                      return HolderModel.load({
                        sort: 'name ASC'
                      });
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
        ;
      }
    ])
  ;
}());
