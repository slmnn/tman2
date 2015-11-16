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
          .state('examples.territories.s13', {
            url: '/examples/territories/s13',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territory/s13.html',
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

                      // Load all holders, later add isActive param.
                      return HolderModel.load();
                    }
                  ]
                }
              }
            }
          })

          // Map
          .state('examples.territories.map', {
            url: '/examples/territories/map',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territory/map.html',
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

          // Map
          .state('examples.territories.quickview', {
            url: '/examples/territories/quickview',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/territory/quickview.html',
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
