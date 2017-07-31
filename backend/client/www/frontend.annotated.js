/**
 * Login history component. This component is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.admin.login-history' angular module. This also contains necessary route
 * definitions for this module.
 */
(function() {
  'use strict';

  // Define frontend.admin module.login-history
  angular.module('frontend.admin.login-history', []);

  // Module configuration
  angular.module('frontend.admin.login-history')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('admin.login-history', {
            url: '/admin/loginHistory',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/loginHistory/index.html',
                controller: 'LoginHistoryController',
                name: 'Kirjautumishistoria',
                resolve: {
                  _items: [
                    'ListConfig',
                    'LoginHistoryModel',
                    function resolve(
                      ListConfig,
                      LoginHistoryModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        limit: config.itemsPerPage,
                        sort: 'createdAt DESC',
                        populate: 'user'
                      };

                      return LoginHistoryModel.load(parameters);
                    }
                  ],
                  _count: [
                    'LoginHistoryModel',
                    function resolve(LoginHistoryModel) {
                      return LoginHistoryModel.count();
                    }
                  ],
                  _statsBrowser: [
                    'LoginHistoryModel',
                    function resolve(LoginHistoryModel) {
                      return LoginHistoryModel.statistics('Browser');
                    }
                  ],
                  _statsOS: [
                    'LoginHistoryModel',
                    function resolve(LoginHistoryModel) {
                      return LoginHistoryModel.statistics('OS');
                    }
                  ],
                  _statsUser: [
                    'LoginHistoryModel',
                    function resolve(LoginHistoryModel) {
                      return LoginHistoryModel.statistics('User');
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

(function() {
  'use strict';

  // Define frontend.admin module.request-log
  angular.module('frontend.admin.request-log', []);

  // Module configuration
  angular.module('frontend.admin.request-log')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('admin.request-log', {
            url: '/admin/requestlog',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/requestlog/index.html',
                controller: 'RequestLogController',
                name: 'Taustakyselyt',
                resolve: {
                  _items: [
                    'ListConfig',
                    'RequestLogModel',
                    function resolve(
                      ListConfig,
                      RequestLogModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        limit: config.itemsPerPage,
                        sort: 'createdAt DESC',
                        populate: 'user'
                      };

                      return RequestLogModel.load(parameters);
                    }
                  ],
                  _count: [
                    'RequestLogModel',
                    function resolve(RequestLogModel) {
                      return RequestLogModel.count();
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

/**
 * Login history component. This component is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.admin.user' angular module. This also contains necessary route
 * definitions for this module.
 */
(function() {
  'use strict';

  // Define frontend.admin module.user
  angular.module('frontend.admin.user', []);

  // Module configuration
  angular.module('frontend.admin.user')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          .state('admin.user', {
            url: '/admin/user/',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/user/index.html',
                controller: 'UsersController',
                name: 'Käyttäjät',
                resolve: {
                  _items: [
                    'ListConfig',
                    'UserModel',
                    function resolve(
                      ListConfig,
                      UserModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        limit: config.itemsPerPage,
                        sort: 'createdAt DESC',
                        populate: 'holder'
                      };

                      return UserModel.load(parameters);
                    }
                  ],
                  _count: [
                    'UserModel',
                    function resolve(UserModel) {
                      return UserModel.count();
                    }
                  ],
                }
              }
            }
          })

          .state('admin.user.add', {
            url: '/add',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/user/add.html',
                controller: 'UserAddController',
                name: 'Käyttäjän lisääminen',
                resolve: {
                  _app: [
                    '$stateParams',
                    'AppModel',
                    function resolve(
                      $stateParams,
                      AppModel
                    ) {
                      return AppModel.load({populate: 'defaultHolder'});
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
                  ]
                }
              }
            }
          })

          // Single user
          .state('admin.user.single', {
            url: '/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/user/user.html',
                controller: 'UserController',
                name: 'Käyttäjän tiedot',
                resolve: {
                  _user: [
                    '$stateParams',
                    'UserModel',
                    function resolve(
                      $stateParams,
                      UserModel
                    ) {
                      return UserModel.fetch($stateParams.id, {populate: 'holder'});
                    }
                  ],
                  _app: [
                    '$stateParams',
                    'AppModel',
                    function resolve(
                      $stateParams,
                      AppModel
                    ) {
                      return AppModel.load({populate: 'defaultHolder'});
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

/**
 * Angular module for frontend.app.about component. Basically this file contains actual angular module initialize
 * and route definitions for this module.
 */
(function() {
  'use strict';

  // Define frontend.public module
  angular.module('frontend.app.about', []);

  // Module configuration
  angular.module('frontend.app.about')
    .config([
      '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('app.about', {
            url: '/about',
            data: {
              access: 0
            },
            views: {
              'content@': {
                templateUrl: '/frontend/app/about/about.html',
                controller: 'AboutController',
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
              },
              'pageNavigation@': false
            }
          })
        ;
      }
    ])
    .controller('AboutController', [
      '$scope', '$state',
      'AuthService',
      '_app',
      function controller(
        $scope, $state,
        AuthService,
        _app
      ) {
        $scope.auth = AuthService;
        $scope.name = _app[0].name;
      }
    ])
  ;
}());

/**
 * app component to wrap all app specified stuff together. This component is divided to following logical components:
 *
 *  Controllers
 *  Models
 *
 * All of these are wrapped to 'frontend.app' angular module.
 */
(function() {
  'use strict';

  // Define frontend.app.coordinate angular module
  angular.module('frontend.app.app', []);

  // Module configuration
  angular.module('frontend.app.app')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          // Single app
          .state('app.settings', {
            url: '/app/settings/',
            views: {
              'content@': {
                templateUrl: '/frontend/app/app/app.html',
                controller: 'AppController',
                name: 'Aluehallinnan asetukset',
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
                      return AppModel.load({populate: 'defaultHolder'});
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

/**
 * attribute component to wrap all attribute specified stuff together. This component is divided to following logical components:
 *
 *  Controllers
 *  Models
 *
 * All of these are wrattributeed to 'frontend.attribute' angular module.
 */
(function() {
  'use strict';

  // Define frontend.app.coordinate angular module
  angular.module('frontend.app.attribute', []);

  // Module configuration
  angular.module('frontend.app.attribute')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          // Single attribute
          .state('app.attributes', {
            url: '/app/attributes/',
            views: {
              'content@': {
                templateUrl: '/frontend/app/attributes/attributes.html',
                controller: 'AttributesController',
                name:'Attribuutit',
                resolve: {
                  _attributes: [
                    '$stateParams',
                    'AttributeModel',
                    function resolve(
                      $stateParams,
                      AttributeModel
                    ) {
                      return AttributeModel.load();
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

/**
 * Chat component to wrap all book specified stuff together. This component is divided to following logical components:
 *
 *  Controllers
 *  Directives
 *  Models
 *
 * All of these are wrapped to 'frontend.app.chat' angular module.
 */
(function() {
  'use strict';

  // Define frontend.app.chat angular module
  angular.module('frontend.app.chat', []);

  // Module configuration
  angular.module('frontend.app.chat')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Chat
          .state('app.chat', {
            url: '/app/chat',
            views: {
              'content@': {
                templateUrl: '/frontend/app/chat/chat.html',
                controller: 'ChatController',
                resolve: {
                  _messages: [
                    '$localStorage',
                    'moment',
                    'MessageModel',
                    function resolve(
                      $localStorage,
                      moment,
                      MessageModel
                    ) {
                      var parameters = {
                        where: {
                          createdAt: {
                            '>': ($localStorage.chat && $localStorage.chat.time) ?
                              $localStorage.chat.time : moment().format()
                          }
                        }
                      };

                      return MessageModel.load(parameters);
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

/**
 * This file contains all necessary Angular model definitions for 'frontend.app.coordinate
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  // Define frontend.app.coordinate angular module
  angular.module('frontend.app.coordinate', []);

  /**
   * Model for Coordinate API, this is used to wrap all Coordinate objects specified actions and data change actions.
   */
  angular.module('frontend.app.coordinate')
    .service('CoordinateModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('coordinate');
      }
    ])
  ;
}());

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
          .state('app.holder', {
            url: '/app/holder',
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
                        sort: 'name ASC'
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

          // Add new holder
          .state('app.holder.add', {
            url: '/add',
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

          // Single holder
          .state('app.holder.single', {
            url: '/:id',
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

        ;
      }
    ])
  ;
}());

/**
 * Messages component which is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.app.messages' angular module.
 */
(function() {
  'use strict';

  // Define frontend.app.messages angular module
  angular.module('frontend.app.messages', []);

  // Module configuration
  angular.module('frontend.app.messages')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Messages
          .state('app.messages', {
            url: '/app/messages',
            views: {
              'content@': {
                templateUrl: '/frontend/app/messages/messages.html',
                controller: 'MessagesController'
              }
            }
          })
        ;
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.app.specialAddress
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  // Define frontend.app.specialAddress angular module
  angular.module('frontend.app.specialAddress', []);

  /**
   * Model for Territory API, this is used to wrap all Territory objects specified actions and data change actions.
   */
  angular.module('frontend.app.specialAddress')
    .service('SpecialAddressModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('specialAddress');
      }
    ])
  ;
}());
(function() {
  'use strict';

  angular.module('frontend.app.stat', []);

  angular.module('frontend.app.stat')
    .service('StatModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('stat');
      }
    ])
  ;
}());

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
  angular.module('frontend.app.territoryHolderHistory', []);

}());

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

'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "ap.",
      "ip."
    ],
    "DAY": [
      "sunnuntaina",
      "maanantaina",
      "tiistaina",
      "keskiviikkona",
      "torstaina",
      "perjantaina",
      "lauantaina"
    ],
    "ERANAMES": [
      "ennen Kristuksen syntym\u00e4\u00e4",
      "j\u00e4lkeen Kristuksen syntym\u00e4n"
    ],
    "ERAS": [
      "eKr.",
      "jKr."
    ],
    "FIRSTDAYOFWEEK": 0,
    "MONTH": [
      "tammikuuta",
      "helmikuuta",
      "maaliskuuta",
      "huhtikuuta",
      "toukokuuta",
      "kes\u00e4kuuta",
      "hein\u00e4kuuta",
      "elokuuta",
      "syyskuuta",
      "lokakuuta",
      "marraskuuta",
      "joulukuuta"
    ],
    "SHORTDAY": [
      "su",
      "ma",
      "ti",
      "ke",
      "to",
      "pe",
      "la"
    ],
    "SHORTMONTH": [
      "tammikuuta",
      "helmikuuta",
      "maaliskuuta",
      "huhtikuuta",
      "toukokuuta",
      "kes\u00e4kuuta",
      "hein\u00e4kuuta",
      "elokuuta",
      "syyskuuta",
      "lokakuuta",
      "marraskuuta",
      "joulukuuta"
    ],
    "STANDALONEMONTH": [
      "tammikuu",
      "helmikuu",
      "maaliskuu",
      "huhtikuu",
      "toukokuu",
      "kes\u00e4kuu",
      "hein\u00e4kuu",
      "elokuu",
      "syyskuu",
      "lokakuu",
      "marraskuu",
      "joulukuu"
    ],
    "WEEKENDRANGE": [
      5,
      6
    ],
    "fullDate": "cccc d. MMMM y",
    "longDate": "d. MMMM y",
    "medium": "d.M.y H.mm.ss",
    "mediumDate": "d.M.y",
    "mediumTime": "H.mm.ss",
    "short": "d.M.y H.mm",
    "shortDate": "d.M.y",
    "shortTime": "H.mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u20ac",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": "\u00a0",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "fi-fi",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);
//! moment.js locale configuration
//! locale : finnish (fi)
//! author : Tarmo Aidantausta : https://github.com/bleadof
//! author : Christoffer Niska : https://github.com/crisu83

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['minuutti', 'minuutin'],
            'mm': [number + ' minuuttia', number + ' minuutin'],
            'h': ['tunti', 'tunnin'],
            'hh': [number + ' tuntia', number + ' tunnin'],
            'd': ['päivä', 'päivän'],
            'dd': [number + ' päivää', number + ' päivän'],
            'M': ['kuukausi', 'kuukauden'],
            'MM': [number + ' kuukautta', number + ' kuukauden'],
            'y': ['vuosi', 'vuoden'],
            'yy': [number + ' vuotta', number + ' vuoden']
        };
        return !isFuture ? format[key][0] : format[key][1];
    }

    var fi = moment.defineLocale('fi', {
        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
        monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD.MM.YYYY',
            LL : 'Do MMMM[ta] YYYY',
            LLL : 'Do MMMM[ta] YYYY, [klo] LT',
            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] LT',
            l : 'D.M.YYYY',
            ll : 'Do MMM YYYY',
            lll : 'Do MMM YYYY, [klo] LT',
            llll : 'ddd, Do MMM YYYY, [klo] LT'
        },
        calendar : {
            sameDay : '[tänään] [klo] LT',
            nextDay : '[huomenna] [klo] LT',
            nextWeek : 'dddd [klo] LT',
            lastDay : '[eilen] [klo] LT',
            lastWeek : '[viime] dddd[na] [klo] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s päästä',
            past : '%s sitten',
            s : 'hetki',
            m : processRelativeTime,
            mm : processRelativeTime,
            h : processRelativeTime,
            hh : processRelativeTime,
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fi;

}));
/**
 * Messages component which is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.auth.login' angular module.
 */
(function() {
  'use strict';

  // Define frontend.auth.login angular module
  angular.module('frontend.core.auth.login', []);

  // Module configuration
  angular.module('frontend.core.auth.login')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Login
          .state('auth.login', {
            url: '/login',
            data: {
              access: 0
            },
            views: {
              'content@': {
                templateUrl: '/frontend/core/auth/login/login.html',
                controller: 'LoginController'
              }
            }
          })
        ;
      }
    ])
  ;
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.auth.services', []);
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.components', []);
}());

/**
 * Generic models angular module initialize. This module contains all 3rd party dependencies that application needs to
 * actually work.
 *
 * Also note that this module have to be loaded before any other application modules that have dependencies to these
 * "core" modules.
 */
(function() {
  'use strict';

  angular.module('frontend.core.dependencies', [
    'angular-loading-bar',
    'ngAnimate',
    'ngSanitize',
    'ngBootbox',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'ui.utils',
    'angularMoment',
    'toastr',
    'xeditable',
    'sails.io',
    'uiGmapgoogle-maps',
    'highcharts-ng',
    'pascalprecht.translate'
  ]);
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.error', []);

  // Module configuration
  angular.module('frontend.core.error')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('error', {
            parent: 'frontend',
            url: '/error',
            data: {
              access: 0
            },
            views: {
              'content@': {
                templateUrl: '/frontend/core/error/partials/error.html',
                controller: 'ErrorController',
                resolve: {
                  _error: function resolve() {
                    return this.self.error;
                  }
                }
              }
            }
          })
        ;
      }
    ])
  ;
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.filters', []);
}());

(function() {
	'use strict';

	angular.module('frontend.core.i18n', []);

	angular.module('frontend.core.i18n')
	.config(["$translateProvider", function ($translateProvider) {
	  $translateProvider.preferredLanguage('fi');
	  $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.translations('fi', {
      TITLE: 'Aluesovellus v2.0',

      // General
      EDIT: 'Muokkaa',
      SAVE: 'Tallenna',
      CANCEL: 'Peruuta',
      DELETE: 'Poista',

      ADD: 'Lisää',

      FIRST: 'Ensimmäinen',
      PREVIOUS: 'Edellinen',
      NEXT: 'Seuraava',
      LAST: 'Viimeinen',

      EMAIL: 'Sähköpostiosoite',
      EMAIL_ADDRESS_IS_IN_USE: 'Sähköpostiosoite on käytössä',

      // Profile.html
      USER_NOT_FOUND: 'Käyttäjää ei löydy',
      NEW_PASSWORD: 'Uusi salasana',
      REPEAT_PASSWORD: 'Toista uusi salasana',
      SAVE_PASSWORD: 'Tallenna salasana',
      NEW_PASSWORD_HINT: 'Syötä uusi salasanasi tähän',
      REPEAT_NEW_PASSWORD_HINT: 'Syötä uusi salasanasi uudemman kerran',

      NEW_HOLDER_HISTORY_ADDED_SUCCESS: 'Alueen historiatieto lisätty.',
      HOLDER_HISTORY_UPDATED_SUCCESS_1: 'Alueen ',
      HOLDER_HISTORY_UPDATED_SUCCESS_2: ' historiatieto päivitetty.',
      HOLDER_HISTORY_REMOVED_SUCCESS_2: ' historiatieto poistettu.',

      HOLDER: 'Alueomistaja',
      COVERED: 'Käyty',
      TAKEN: 'Omistajalle',
      TYPE: 'Tyyppi',
      NUMBER_OF_APARTMENTS: 'Asuntoja',
      ARCHIVED: 'Arkistoitu',
      DESCRIPTION: 'Kuvaus',
      NOT_COUNTED_WHEN_CALCULATING_POORLY_COVERED: 'Lasketaanko vuoteen käymättömiä alueita laskettaessa',
      NOT_COUNTED_WHEN_CALCULATING_POORLY_COVERED_2: 'Ohitetaanko alue, kun lasketaan yhteen vuoteen käymättömät alueet?',

      DELETING_TERRITORY_HISTORY_ROW: 'Olet poistamassa aluehistoriatietoa.',
      DELETING_TERRITORY: 'Olet poistamassa aluetta ',
      ARE_YOU_SURE: 'Oletko varma?',

      TERRITORY_NOT_FOUND: 'Aluetta ei löydy',
      NO_HOLDER_HISTORY: 'Alueella ei ole historiatietoja.',
      HISTORY: 'Alueen historia',

      START_DATE: 'Alkupäivä',
      END_DATE: 'Loppupäivä',
      ADDITIONAL_INFO: 'Lisätiedot',
      ADDITIONAL_COMMENT: 'Lisää kommentti tähän',

      NO_TERRITORY_ATTRIBUTES: 'Alueella ei ole attribuutteja',
      ADD_ATTRIBUTE: 'Lisää attribuutti',
      ATTRIBUTES: 'Attribuutit',

      NAME: 'Nimi',
      ATTRIBUTE_DESCRIPTION: 'Kuvaus',

      DELETE_BORDER: 'Aseta rajat alkutilaan',
      SAVE_MAP: 'Tallenna kartta',

      TERRITORY : 'Alue',

      TERRITORY_LIST: 'Aluekorttiluettelo',
      MAP: 'Kartta',
      QUICK_VIEW: 'Pikatarkastelu',

      TERRITORY_CODE: 'Aluekoodi',
      INITIAL_HOLDER: 'Ensimmäinen alueomistaja',

      TERRITORIES: 'Alueet',
      CLEAR_SELECTION: 'Poista valinta kaikista',

      OPERATIONS_FOR_SELECTED_TERRITORIES: 'Valitut alueet',

      MARK_COVERED_NO_HOLDER_CHANGE: 'Merkistse alue käydyksi vaihtamatta alueomistajaa',
      CHANGE_HOLDER_MARK_COVERED: 'Vaihda alueomistajaa ja merkitse merkitse alue käydyksi',
      CHANGE_HOLDER_NOT_MARK_COVERED: 'Vaihda alueomistajaa merkitsemättä aluetta käydyksi',

      TERRITORY_HELP_1: 
      'Joissakin tilanteissa saattaa olla tarpeen lisätä alueen käymiseen tai palautukseen liittyvä kommentti. Esimerkiksi, myöhemmin voi olla hyödyllistä tietää että alueelle on levitetty muistonvietto- tai konventtikutsut. Kirjoita kommentti sille varttuun tilaan. Kommentti ei ole pakollinen.',
      TERRITORY_HELP_2:
      'Alueen voi merkitä käydyksi niin että se jää nykyiselle alueomistajalle. Valitse silloin \'Merkitse alue käydyksi vaihtamatta alueomistajaa\' -painike.',
      TERRITORY_HELP_3:
      'Jos haluat vaihtaa alueomistajan, toimi seuraavasti:',
      TERRITORY_LI_1: 'Valitse uusi alueomistaja alasvetovalikosta.',
      TERRITORY_LI_2: 'Vaihda alueomistaja ja merkitse alue käydyksi valitsemalla \'Vaihda alueomistajaa ja merkitse merkitse alue käydyksi\' -painike. Jos et halua että alue merkitään samalla käydyksi, valitse \'Vaihda alueomistajaa merkitsemättä aluetta käydyksi\'-painike.',

      HOLDER_DESCRIPTION: 'Lisätiedot',
      HOLDER_TELEPHONE: 'Puhelinnumero',
      HOLDER_EMAIL: 'Sähköpostiosoite',
      HOLDER_EMAIL_IN_USE: 'Sähköpostiosoite käytössä',
      HOLDER_NAME: 'Alueomistajan nimi',

      HOLDER_NOT_FOUND: 'Alueomistajaa ei löydy',

    });
    $translateProvider.preferredLanguage('fi');
  }]);
})();


// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.interceptors', []);
}());

/**
 * Layout component to wrap all core layout specified stuff together. This component is divided to following logical
 * components:
 *
 *  Controllers
 *  Directives
 *  Services
 *
 * All of these are wrapped to 'frontend.core.layout' angular module.
 */
(function() {
  'use strict';

  angular.module('frontend.core.layout', []);
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.libraries', []);
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.models', []);
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.services', []);
}());

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/profile/profile.html',
    '<div data-ng-show="!user"><h3>{{\'USER_NOT_FOUND\' | translate}}</h3></div><div data-ng-show="user"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveUser()"><div class="row"><div class="col-sm-4"><h3>{{user.firstName}} {{user.lastName}} <span class="pull-right" data-ng-show="!editableForm.$visible"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="{{\'EDIT\' | translate}}"><i class="fa fa-wrench"></i></a></span></h3><dl><dt>{{\'EMAIL\' | translate}}</dt><dd><span style="width: 100%" data-editable-text="user.email" data-e-name="user.email" data-e-required>{{user.email}}</span></dd><dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">{{\'SAVE\' | translate}}</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel()">{{\'CANCEL\' | translate}}</button></div></div></dl></dl></div></div></form><form class="form-vertical" role="form" name="passwordForm" data-ng-submit="saveNewPassword()"><div class="row"><div class="col-sm-4"><div class="form-group" style="margin-top: 10px">{{\'NEW_PASSWORD\' | translate}}: <input type="password" class="form-control" name="password1" required placeholder="{{\'NEW_PASSWORD_HINT\' | translate}}" minlength="8" data-ng-model="password1"></div><div class="form-group" style="margin-top: 10px">{{\'REPEAT_PASSWORD\' | translate}}: <input type="password" class="form-control" name="password2" required placeholder="{{\'REPEAT_NEW_PASSWORD_HINT\' | translate}}" data-ng-model="password2"></div><div><input type="submit" class="btn btn-primary" data-ng-disabled="password1 == null || password1 != password2" value="{{\'SAVE_PASSWORD\' | translate}}"></div></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/loginHistory/index-info.html',
    '<p>Tällä sivulla näet sovellukseen tulleet kirjautumiset.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/loginHistory/index.html',
    '<h3>Kirjautumishistoria ({{itemCount}})</h3><div class="row"><div class="col-sm-12"><list-search data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search></div></div><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div><table class="table table-hover"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title"></span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody><tr data-ng-repeat="item in items"><td class="col-xs-2">{{item.ip}}</td><td class="col-xs-2">{{item.browser}}</td><td class="col-xs-2">{{item.os}}</td><td class="col-xs-2">{{item.user.lastName}}, {{item.user.firstName}} <span class="text-muted">({{item.user.username}})</span></td><td class="col-xs-4">{{item.createdAt | amDateFormat : \'LLLL\'}}, <span data-am-time-ago="item.createdAt"></span></td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>Ei käyttäjiä</em></td></tr></tbody></table><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/requestlog/index-info.html',
    '<p>Tällä sivulla voit selata taustajärjestelmään lähetettyjä POST-, PUT- ja DELETE pyyntöjä. Voit avata pyynnön sisällön "näytä / piilota" -linkistä</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/requestlog/index.html',
    '<h3>Taustakyselyhistoria ({{itemCount}})</h3><div class="row"><div class="col-sm-12 list-search"><list-search data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search></div></div><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div><table class="table table-hover"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title"></span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody><tr data-ng-repeat="item in items"><td class="col-xs-2">{{item.createdAt | date : \'dd.MM.yyyy\'}}, <span data-am-time-ago="item.createdAt"></span></td><td class="col-xs-1">{{item.method}}</td><td class="col-xs-2"><span data-ng-if="item.url.length > 100">{{item.url | limitTo : 100}} ...</span> <span data-ng-if="item.url.length <= 100">{{item.url}}</span></td><td class="col-xs-3"><a data-ng-if="item.body" data-ng-click="item.showBody = !item.showBody">näytä / piilota</a><pre data-ng-show="item.showBody" data-ng-if="item.body">{{item.body | json}}</pre></td><td class="col-xs-1">{{item.user.username || \'Ei käyttäjää\'}}</td><td class="col-xs-1">{{item.user.lastName}} {{item.user.firstName}}</td><td class="col-xs-2">{{item.user.admin ? \'Pääkäyttäjä\':\'Normaalikäyttäjä\'}}</td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>Ei taustakyselyjä</em></td></tr></tbody></table><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/migrate/migrate-info.html',
    '<p>Tällä sivulla voit tehdä migraation vanhasta aluesovelluksesta uuteen.</p><p><ol><li>Tee ensin sovelluksen oletusomistaja (Aluepöytä) ja aseta se sovelluksen asetuksissa oletusomistajaksi.</li><li>Kopioi varmuuskopiosta alueomistajadata ylempään tekstiruutuun. Paina ko. ruudun alta "Tallenna".</li><li>Kopioi varmuuskopiosta aluedata alempaan tekstiruutuun. Paina alemman ruudun alta "Tallenna"</li><li>HUOM! Tarkista tietokannassa, että luontitieto on oikein tehdyillä alueilla ja alueomistajilla. Katso alta hyödyllisiä komentoja.</li></ol><ul><li>Kantaan:<pre>use dbname</pre></li><li>Näytä taulut:<pre>show collections</pre></li><li>Näytä käyttäjät:<pre>show users</pre></li><li>Haku:<pre>db.collectionname.find({kenttä:"arvo"})</pre></li><li>Hae alueet joilla luontitieto pielessä:<pre>db.territory.find({createdId:null})</pre></li><li>Omistajan päivittäminen:<pre>db.territory.update({createdUserId: null}, { $set: { createdUserId: ObjectId("56670a58ff3e4c41d81e9adb")}}, false, true);</pre></li></ul></p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/migrate/migrate.html',
    '<h1>Migraatio</h1><p>Huom! Oletusalueomistaja täytyy luoda ja asettaa oletusomistajaksi ennen migraation ajamista.</p><form class="form-vertical col-md-12" role="form" name="migrateForm" data-ng-submit="parseMigrationHolders(migrationData)">Alueomistajadata<br><textarea data-ng-model="migrationData.holders" cols="120" rows="10">\n' +
    '\n' +
    '    </textarea><br><button type="submit" class="btn btn-primary">Tallenna</button></form><form class="form-vertical col-md-12" role="form" name="migrateForm" data-ng-submit="parseMigrationTerritories(migrationData)">Aluedata<br><textarea data-ng-model="migrationData.territories" cols="120" rows="10">\n' +
    '\n' +
    '    </textarea><br><button type="submit" class="btn btn-primary">Tallenna</button></form><hr><button data-ng-click="rollback()" class="btn btn-primary">Poista juuri luodut</button>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/user/add-info.html',
    '<p>Tällä sivulla voit tehdä uuden käyttäjän sovellukseen.</p><p>Syötä uuden käyttäjän tiedot. Salasanan tulee olla vähintään 8 merkkiä pitkä. Käyttäjänimen ja salasanan tulee olla yksilöllinen.</p><p>Jos tunnus on liitetty alueomistajaan, käyttäjä voi muuttaa ainoastaan oletusomistajalla (Aluepöytä) ja itsellään olevia alueita. Alueomistajaan liittyvä tunnus ei voi olla pääkäyttäjä.</p><p>Voit antaa käyttäjälle lisäoikeuksia rastittamalla "Voi ..." -alkuiset oikeudet.</p><p>Väärin luotua tunnusta ei voi poistaa, se voidaan vain arkistoida.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/user/add.html',
    '<form class="form-vertical" role="form" name="userForm" data-ng-submit="addUser()"><div class="row"><div class="col-md-12"><div class="form-group" style="margin-top: 10px">Etunimi: <input class="form-control" name="user.firstName" required placeholder="Anna käyttäjän etunimi" data-ng-model="user.firstName"></div><div class="form-group" style="margin-top: 10px">Sukunimi: <input class="form-control" name="user.lastName" required placeholder="Anna käyttäjän sukunimi" data-ng-model="user.lastName"></div><div class="form-group" style="margin-top: 10px">Käyttäjänimi: <input class="form-control" name="user.username" required placeholder="Anna käyttäjänimi jota käytetään kirjautumiseen" data-ng-model="user.username"></div><div class="form-group" style="margin-top: 10px">Salasana: <input class="form-control" name="user.password1" required placeholder="Käyttäjän salasana" minlength="8" data-ng-model="user.password1"></div><div class="form-group" style="margin-top: 10px">Salasana uudelleen: <input class="form-control" name="user.password2" required placeholder="Käyttäjän salasana uudelleen" data-ng-model="user.password2"></div><div class="form-group" style="margin-top: 10px">Sähköpostiosoite: <input class="form-control" name="user.email" required placeholder="Käyttäjän sähköpostiosoite" data-ng-model="user.email"></div><div class="checkbox"><label><input type="checkbox" name="user.canAddAttributes" data-ng-model="user.canAddAttributes"> Voi lisätä alueille attribuutteja</label></div><div class="checkbox"><label><input type="checkbox" name="user.canAddAttributes" data-ng-model="user.canAddApartmentCount"> Voi muokata alueiden asuntojen lukumääriä</label></div><div class="checkbox"><label><input type="checkbox" name="user.canAddSpecialAddresses" data-ng-model="user.canAddSpecialAddresses"> Voi muokata alueiden kieltopaikkojen ja vieraskielisten osoitteiden tietoja</label></div><div class="form-group">Tunnukseen liitetty alueomistaja (jos valittu, rajoittaa toiminnot vain tälle omistajalle):<select class="form-control" data-ng-model="selectedHolderId" data-ng-options="holder.id as holder.name for holder in holders" data-ng-change="user.admin = false"><option value="">-- tunnus ei liity alueomistajaan --</option></select></div><div class="checkbox"><label><input data-ng-disabled="selectedHolderId" type="checkbox" name="user.admin" data-ng-model="user.admin"> Pääkäyttäjä</label></div><button type="submit" class="btn btn-primary" data-ng-disabled="!userForm.$valid && user.password1 != user.password2">Lisää uusi käyttäjä</button></div></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/user/index-info.html',
    '<p>Tällä sivulla näet sovellukseen luodut käyttäjät.</p><p>Voit tehdä uuden käyttäjän plus-symbolista oikealla ylhäällä.</p><p>Arkistoidut käyttäjät on merkitty yliviivauksella.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/user/index.html',
    '<h3>Käyttäjät ({{items.length}})<div class="pull-right"><a data-ui-sref="admin.user.add" data-tooltip="Uusi käyttäjä"><i class="fa fa-plus-circle"></i></a></div></h3><div class="row"><div class="col-sm-12 list-search"><list-search data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search></div></div><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div><table class="table table-hover"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title"></span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody><tr data-ng-repeat="item in items"><td class="col-xs-2">{{item.firstName}}</td><td class="col-xs-2">{{item.lastName}}</td><td class="col-xs-1"><a data-ui-sref="admin.user.single({id: item.id})"><span style="{{item.archived ? \'text-decoration: line-through\':\'\'}}">{{item.username}}</span></a></td><td class="col-xs-2">{{item.email}}</td><td class="col-xs-2">{{item.admin ? \'admin\':\'regular user\'}} <span data-ng-if="item.archived">(archived)</span></td><td class="col-xs-3">{{item.createdAt | date : \'dd.MM.yyyy\'}}, <span data-am-time-ago="item.createdAt"></span></td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>Ei käyttäjiä</em></td></tr></tbody></table><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/user/user-info.html',
    '<p>Tällä sivulla voit muuttaa käyttäjän tietoja. Pääset muokkaustilaan painamalla työkalu-kuvaketta.</p><p>Käyttäjän sähköpostiosoite tulee olla yksilöllinen.</p><p>Jos tunnus on liitetty alueomistajaan, käyttäjä voi muuttaa ainoastaan oletusomistajalla (Aluepöytä) ja itsellään olevia alueita. Alueomistajaan liittyvä tunnus ei voi olla pääkäyttäjä. Voit poistaa linkityksen alueomistajaan valitsemalla linkitetyksi omistajaksi oletusomistajan (Aluepöytä).</p><p>Voit antaa käyttäjälle lisäoikeuksia rastittamalla "Voi ..." -alkuiset oikeudet. Rastien poistaminen poistaa oikeudet.</p><p>Väärin luotua tunnusta ei voi poistaa, se voidaan vain arkistoida. Arkistoitu käyttäjä ei voi kirjautua sovellukseen.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/admin/user/user.html',
    '<div data-ng-show="!user"><h3>Käyttäjää ei lötynyt</h3></div><div data-ng-show="user"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveUser()"><div class="row"><div class="col-sm-4"><h3><span style="width: 100%" data-editable-text="user.firstName" data-e-name="user.firstName" data-e-required>{{user.firstName}}</span> <span style="width: 100%" data-editable-text="user.lastName" data-e-name="user.lastName" data-e-required>{{user.lastName}}</span> <span class="pull-right" data-ng-show="!editableForm.$visible && currentUser.admin"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="Muokkaa"><i class="fa fa-wrench"></i></a></span></h3><dl><dt>Sähköpostiosoite</dt><dd><span style="width: 100%" data-editable-text="user.email" data-e-name="user.email" data-e-required>{{user.email}}</span></dd><dt>{{\'HOLDER\' | translate}}</dt><dd><span data-editable-select="user.holder.id" data-e-name="holder.id" data-e-ng-options="holder.id as holder.name for holder in holders | filter : onlyActiveHolders" data-e-required>{{user.holder.name || \'Käyttäjä ei liity alueomistajaan\'}}</span></dd><dt>Voi lisätä attribuutteja alueille</dt><dd><span data-editable-checkbox="user.canAddAttributes" data-e-title="Käyttäjä voi lisätä attribuutteja alueille">{{user.canAddAttributes ? \'Kyllä\' : \'Ei\'}}</span></dd><dt>Voi lisätä ja muuttaa alueen asuntojen määrää</dt><dd><span data-editable-checkbox="user.canAddApartmentCount" data-e-title="Käyttäjä voi muuttaa alueen asuntojen lukumäärän">{{user.canAddApartmentCount ? \'Kyllä\' : \'Ei\'}}</span></dd><dt>Voi lisätä ja muuttaa alueen kieltopaikkoja ja vieraskielisiä osoitteita</dt><dd><span data-editable-checkbox="user.canAddSpecialAddresses" data-e-title="Käyttäjä voi muuttaa alueen kieltopaikkojen ja vieraskielisten paikkojen osoitteita">{{user.canAddSpecialAddresses ? \'Kyllä\' : \'Ei\'}}</span></dd><dt>Arkistoitu</dt><dd><span data-editable-checkbox="user.archived" data-e-title="Käyttäjä ei ole enää käytössä">{{user.archived ? \'Kyllä\' : \'Ei\'}}</span></dd><dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">Tallenna</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel()">Peruuta</button></div></div></dl></dl></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/app/app-info.html',
    '<p>Aluehallinnan asetukset vaikuttavat koko sovelluksen toimintaan.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/app/app.html',
    '<div data-ng-show="!app"><h3>Sovellusasetuksia ei löytynyt! Ota yhteyttä ylläpitäjään.</h3></div><div data-ng-show="app"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveApp()"><div class="row"><div class="col-sm-8"><h3><span style="width: 100%" data-editable-text="app.name" data-e-name="app.name" data-e-required>{{app.name || \'Sovellukselle ei ole annettu nimeä\'}}</span> <span class="pull-right" data-ng-show="!editableForm.$visible && user.admin"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="Muuta asetuksia"><i class="fa fa-wrench"></i></a></span></h3><dl><dt>Alueiden oletusomistaja (yleensä aluepöytä tms.)</dt><dd><span data-editable-select="app.defaultHolder.id" data-e-name="defaultHolder.id" data-e-ng-options="holder.id as holder.name for holder in holders" data-e-required>{{app.defaultHolder.name || \'Ei asetettu\'}}</span></dd><dt>Sähköpostiosoite varmuuskopioiden vastaanottamiseen</dt><dd><span style="width: 100%" data-editable-text="app.backupEmail" data-e-name="app.backupEmail" data-e-required>{{app.backupEmail || \'Sähköpostiosoite puuttuu\'}}</span></dd><dt>Varmuuskopioiden väli (päiviä)</dt><dd><span style="width: 100%" data-editable-number="app.backupInterval" data-e-min="1" data-e-name="app.backupInterval" data-e-required>{{app.backupInterval || \'Ei asetettu\'}}</span></dd><dt>Aika, jonka jälkeen aluetta pidetään harvoin käytynä (päiviä)</dt><dd><span style="width: 100%" data-editable-number="app.notCoveredLimit" data-e-min="1" data-e-name="app.notCoveredLimit" data-e-required>{{app.notCoveredLimit || \'Ei asetettu\'}}</span></dd><dt>Aika, jonka jälkeen lähetetään muistutusviesti alueen käymisestä (päiviä)</dt><dd><span style="width: 100%" data-editable-number="app.notCoveredWarningEmailLimit" data-e-min="1" data-e-name="app.notCoveredWarningEmailLimit" data-e-required>{{app.notCoveredWarningEmailLimit || \'Ei asetettu\'}}</span></dd><dt>Aika, jonka jälkeen alue on ollut liian kauan samalla omistajalla (päiviä)</dt><dd><span style="width: 100%" data-editable-number="app.holderNotChangedWarningLimit" data-e-min="1" data-e-name="app.holderNotChangedWarningLimit" data-e-required>{{app.holderNotChangedWarningLimit || \'Ei asetettu\'}}</span></dd><dt>Oletus leveyskoordinaatti (Suomessa noin 60-64)</dt><dd><span style="width: 100%" data-editable-number="app.defaultLatitude" data-e-min="-90" data-e-max="90" data-e-step="any" data-e-name="app.defaultLatitude" data-e-required>{{app.defaultLatitude || \'Ei asetettu\'}}</span></dd><dt>Oletus pituuskoordinaatti (Suomessa noin 19-25)</dt><dd><span style="width: 100%" data-editable-number="app.defaultLongitude" data-e-min="-180" data-e-max="180" data-e-step="any" data-e-name="app.defaultLongitude" data-e-required>{{app.defaultLongitude || \'Ei asetettu\'}}</span></dd><dt>Tulostettavan aluekartan tyyppi</dt><dd><span data-editable-select="app.printMapType" data-e-name="app.printMapType" data-e-ng-options="type as type for type in mapTypes" data-e-required>{{app.printMapType || \'Ei asetettu\'}}</span></dd><dt>Tulostettavan aluekartan rajan väri</dt><dd><span style="width: 100%" data-editable-text="app.printMapLineColor" data-e-name="app.printMapLineColor" data-e-required>{{app.printMapLineColor || \'Asetus puuttuu\'}}</span></dd><dt>Tulostettavan aluekartan alueen väri</dt><dd><span style="width: 100%" data-editable-text="app.printMapAreaFillColor" data-e-name="app.printMapAreaFillColor" data-e-required>{{app.printMapAreaFillColor || \'Asetus puuttuu\'}}</span></dd><dt>Tulostettavan aluekartan skaalaus</dt><dd><span style="width: 100%" data-editable-number="app.printMapScale" data-e-min="0" data-e-max="2" data-e-step="1" data-e-name="app.printMapScale" data-e-required>{{app.printMapScale || \'Asetus puuttuu\'}}</span></dd><dt>Sähköposteissa toimivat avainkentät</dt><dd><pre>\n' +
    '"_holderName" = alueomistajan nimi\n' +
    '"_territoryCode" = alueen koodi\n' +
    '"_territoryLat", = alueen leveyskoordinaatti\n' +
    '"_territoryLng", = alueen pituuskoordinaatti\n' +
    '"_taken", = aika jolloin alue on otettu\n' +
    '"_covered" = aika jolloin alue on merkitty käydyksi\n' +
    '"_territoryDetails", = alueen tarkempi kuvaus\n' +
    '"_listAllTerritoryCodes" = kaikki alueomistajan alueiden koodit\n' +
    '"_staticMap" = alueen karttakuva (jos rajat piirretty)\n' +
    '"_staticMapSatellite" = alueen satelliittikuva (jos rajat piirretty)\n' +
    '</pre></dd><dt>Sähköpostipohja: muistutus alueen käymisestä, viestin aihe</dt><dd><span style="width: 100%" data-editable-text="app.notificationEmailNotCoveredTerritoryTitle" data-e-name="app.notificationEmailNotCoveredTerritoryTitle" data-e-required>{{app.notificationEmailNotCoveredTerritoryTitle || \'Ei asetettu\'}}</span></dd><dt>Sähköpostipohja: muistutus alueen käymisestä</dt><dd><span style="width: 100%" data-editable-textarea="app.notificationEmailNotCoveredTerritory" data-e-name="app.notificationEmailNotCoveredTerritory" data-e-required>{{app.notificationEmailNotCoveredTerritory || \'Ei asetettu\'}}</span></dd><dt>Sähköpostipohja: uuden alueen ottaminen, viestin aihe</dt><dd><span style="width: 100%" data-editable-text="app.notificationEmailNewTerritoryTitle" data-e-name="app.notificationEmailNewTerritoryTitle" data-e-required>{{app.notificationEmailNewTerritoryTitle || \'Ei asetettu\'}}</span></dd><dt>Sähköpostipohja: uuden alueen ottaminen</dt><dd><span style="width: 100%" data-editable-textarea="app.notificationEmailNewTerritory" data-e-name="app.notificationEmailNewTerritory" data-e-required>{{app.notificationEmailNewTerritory || \'Ei asetettu\'}}</span></dd><dt>Sähköpostipohja: alueen palautus aluepöytään, viestin aihe</dt><dd><span style="width: 100%" data-editable-text="app.notificationEmailRemovedTerritoryTitle" data-e-name="app.notificationEmailRemovedTerritoryTitle" data-e-required>{{app.notificationEmailRemovedTerritoryTitle || \'Ei asetettu\'}}</span></dd><dt>Sähköpostipohja: alueen palautus aluepöytään</dt><dd><span style="width: 100%" data-editable-textarea="app.notificationEmailRemovedTerritory" data-e-name="app.notificationEmailRemovedTerritory" data-e-required>{{app.notificationEmailRemovedTerritory || \'Ei asetettu\'}}</span></dd><dt>Lähtevän sähköpostin osoite</dt><dd><span style="width: 100%" data-editable-email="app.notificationEmailSenderAddress" data-e-name="app.notificationEmailSenderAddress" data-e-required>{{app.notificationEmailSenderAddress || \'Ei asetettu\'}}</span></dd><dt>SMTP käyttäjänimi</dt><dd><span style="width: 100%" data-editable-text="app.smtpUsername" data-e-name="app.smtpUsername" data-e-required>{{app.smtpUsername || \'Ei asetettu\'}}</span></dd><dt>SMTP salasana</dt><dd><span style="width: 100%" data-editable-text="app.smtpPassword" data-e-name="app.smtpPassword" data-e-required>{{app.smtpPassword || \'Ei asetettu\'}}</span></dd><dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">Tallenna</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel()">Peruuta</button></div></div></dl></dl></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/about/about.html',
    '<h3>{{name || \'Aluehallintasovellus v2.0\'}}</h3><div class="row"><div class="col-sm-12"><p>Tämä aluehallintasovellus on tarkoitettu helpottamaan alueveljien työtä ja tarjoamaan ajantasaista tietoa seurakunnan aluetilanteesta.</p><h4>Tärkeimmät ominaisuudet</h4><ul><li>Alueiden merkitseminen eri omistajille ja käydyksi</li><li>Sopivien alueiden etsiminen eri attribuuttien mukaisesti</li><li>Käyttäjäoikeustasot, joiden avulla eri käyttäjien toimia voidaan hallita</li><li>Sähköpostimuistutukset alueiden käymisestä</li><li>Seurakunnan alueiden esittäminen havainnollisena karttana</li><li>S-13 -lomake</li></ul><h4>Suunnitteilla olevia ominaisuuksia</h4><ul><li>Alueiden antaminen julistajille linkkinä, sähköpostilla tai PDF-tiedostona</li></ul></div></div><h4 data-ng-show="!auth.isAuthenticated()">Jos sinulla on käyttäjätunnus, <a data-ui-sref="auth.login">kirjaudu sisään</a>.</h4><h4 data-ng-show="auth.isAuthenticated()">Olet kirjautunut sisään. Jatka <a data-ui-sref="app.territory">aluehallintaan</a>.</h4>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/chat/chat-info.html',
    '<h4>General info</h4><p>This example demonstrates how to use sails.js and web sockets to pass updates between clients automatically. This simple <em>chat</em> application is perfect for this demonstration. All communications here are made via web sockets.</p><h4>Functions in this example</h4><dl class="dl-horizontal"><dt>Basic stuff</dt><dd>Enter / leave chat. Create new chat message. Message updates to all clients.</dd></dl><page-info-files data-files="{{files}}"></page-info-files>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/chat/chat.html',
    '<div class="chat-enter" data-ng-show="!message.nick"><h4>Enter a nick</h4><div class="input-group col-md-4"><input id="nick" name="nick" class="form-control" placeholder="Enter a nickname" data-ng-model="nick" data-ui-keypress="{\'enter\': \'enterToChat($event)\'}"> <span class="input-group-btn"><button class="btn btn-primary" type="button" data-ng-click="enterToChat()">Enter to chat</button></span></div></div><div class="chat" data-ng-show="message.nick"><div class="row"><div id="messages" class="col-md-12 messages chat-screen"><ul class="list-unstyled"><li class="clearfix" data-ng-repeat="message in messages | orderBy: \'createdAt\'"><span class="pull-left time text-muted"><code>[{{message.createdAt | amDateFormat:\'YYYY-MM-DD HH:mm:ss\'}}]</code></span> <span class="pull-left message"><span class="text-info">{{message.nick}}</span> <span data-ng-bind-html="message.message | linky : \'_blank\'"></span></span></li></ul></div></div><div class="row"><div class="col-md-12 input-group"><div class="input-group-addon">{{message.nick}}</div><input id="message" name="message" class="form-control" placeholder="enter chat message" data-ng-model="message.message" data-ui-keypress="{\'enter\': \'postMessage($event)\'}"><div class="input-group-btn"><button class="btn btn-primary" type="button" data-ng-click="postMessage()">Send message</button> <button class="btn btn-danger" type="button" data-tooltip="Leave chat" data-ng-click="leaveChat()"><i class="fa fa-times"></i></button></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/attributes/attributes-info.html',
    '<h4>Attribuutit</h4><p>Attribuutit ovat alueisiin liittyviä lisätietoja. Voit etsiä sopivia kuvakkeita <a href="https://fortawesome.github.io/Font-Awesome/icons/" target="_blank">Font Awesome -kirjastosta</a>. Kirjoita kuvakkeen nimi ilman fa-etuliitettä.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/attributes/attributes.html',
    '<div data-ng-show="!attributes.length"><h3>Attributes not found</h3></div><div data-ng-show="attributes.length"><table class="table table-condensed table-hover"><thead><tr><th>Nimi</th><th>Kuvaus</th><th>Kuvakkeen nimi</th><th>Kuvake</th><th></th></tr></thead><tbody data-ng-repeat="a in attributes"><tr><td><span data-editable-text="a.name" data-e-name="a.name" data-e-required data-onaftersave="updateAttribute(a)">{{a.name}}</span></td><td><span data-editable-text="a.description" data-e-name="a.description" data-e-required data-onaftersave="updateAttribute(a)">{{a.description}}</span></td><td><span data-editable-text="a.icon" data-e-name="a.icon" data-e-required data-onaftersave="updateAttribute(a)">{{a.icon}}</span></td><td><span class="fa fa-{{a.icon}}"></span></td><td><a data-ng-click="deleteAttribute(a)" data-ng-if="user.admin"><span title="Remove attribute" class="fa fa-trash"></span></a></td></tr></tbody></table></div><div data-ng-if="user.admin"><h3>Lisää uusi attribuutti</h3><form class="form-verical col-md-4" name="newAttributeForm" data-ng-submit="createAttribute(newAttribute)"><div class="form-group"><label for="name">Nimi</label><input data-ng-model="newAttribute.name" required class="form-control" id="name" placeholder="Esim. Hissi"></div><div class="form-group"><label for="description">Kuvaus</label><input data-ng-model="newAttribute.description" max-length="100" required class="form-control" id="description" placeholder="Esim. Talossa on hissi"></div><div class="form-group"><label for="icon">Kuvakkeen nimi</label><input data-ng-model="newAttribute.icon" required class="form-control" id="icon" placeholder="Font Awesome kuvake, esim. arrows-v"></div><input type="submit" id="submit" value="Lisää" class="btn btn-primary"></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/holder/add-info.html',
    '<h4>Alueomistajan lisääminen</h4><p>Kirjoita tarvittavat tiedot ja paina tallenna.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/holder/add.html',
    '<form class="form-vertical" role="form" name="holderForm" data-ng-submit="addHolder()"><div class="row"><div class="col-lg-8"><div class="form-group" style="margin-top: 10px"><input class="form-control" required name="name" placeholder="{{\'HOLDER_NAME\' | translate}}" data-ng-model="holder.name"></div><div class="form-group"><input type="email" class="form-control" required name="email" placeholder="{{\'HOLDER_EMAIL\' | translate}}" data-ng-model="holder.email"></div><div class="form-group"><input class="form-control" name="telephone" placeholder="{{\'HOLDER_TELEPHONE\' | translate}}" data-ng-model="holder.telephone"></div><div class="form-group"><input class="form-control" name="description" placeholder="{{\'HOLDER_DESCRIPTION\' | translate}}" data-ng-model="holder.description"></div><div class="checkbox"><label><input type="checkbox" name="emailValid" data-ng-model="holder.emailValid"> {{\'EMAIL_ADDRESS_IS_IN_USE\' | translate}}</label></div><div><button type="submit" class="btn btn-primary" data-ng-disabled="!holderForm.$valid">{{\'SAVE\' | translate}}</button></div></div></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/holder/holder-info.html',
    '<h4>Alueomistajan tiedot</h4><p>Tällä sivulla näet alueomistajan tiedot ja hänen hallussaan olevat alueet.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/holder/holder.html',
    '<div data-ng-show="!holder"><h3>{{\'HOLDER_NOT_FOUND\' | translate}}</h3></div><div data-ng-show="holder"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveHolder()"><div class="row"><div class="col-md-4"><h3><span style="width: 100%" data-editable-text="holder.name" data-e-name="holder.name" data-e-required>{{holder.name}} <span data-ng-if="holder.isArchived">(arkistoitu)</span></span> <span class="pull-right" data-ng-show="!editableForm.$visible && user.admin"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="{{\'EDIT\' | translate}}"><i class="fa fa-wrench"></i></a></span></h3><dl class="dl-horizontal"><dt>{{\'EMAIL\' | translate}}</dt><dd><span style="width: 100%" data-editable-text="holder.email" data-e-name="holder.email" data-e-required>{{holder.email}}</span></dd><dt>{{\'HOLDER_EMAIL_IN_USE\' | translate}}</dt><dd><span data-editable-checkbox="holder.emailValid" data-e-title="{{\'HOLDER_EMAIL_IN_USE\' | translate}}">{{holder.emailValid ? \'Kyllä\' : \'Ei\'}}</span></dd><dt>{{\'HOLDER_TELEPHONE\' | translate}}</dt><dd><span style="width: 100%" data-editable-text="holder.telephone" data-e-name="holder.telephone">{{holder.telephone}}</span></dd><dd><dt>{{\'HOLDER_DESCRIPTION\' | translate}}</dt></dd><dd><p data-editable-textarea="holder.description" data-e-name="holder.description">{{holder.description}}</p></dd><dt>{{\'ARCHIVED\' | translate}}</dt><dd><span data-editable-checkbox="holder.isArchived" data-e-title="Alueomistaja ei ole käytössä">{{holder.isArchived ? \'Kyllä\' : \'Ei\'}}</span></dd><dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">{{\'SAVE\' | translate}}</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel()">{{\'CANCEL\' | translate}}</button> <button type="button" class="btn btn-danger pull-right" data-ng-bootbox-title="Olet poistamassa alueomistajaa" data-ng-bootbox-custom-dialog="Oletko varma, että haluat poistaa <strong>{{holder.name}}</strong> nimisen alueomistajan?" data-ng-bootbox-buttons="confirmButtonsDelete">{{\'DELETE\' | translate}}</button></div></div></dl></dl></div><div class="col-md-8"><h4 class="text-muted top-buffer">{{holder.territories.length ? \'Alueomistajan alueet\' : \'Alueomistajalla ei ole yhtään aluetta\'}}</h4><table data-ng-if="holder.territories.length" class="table table-condensed table-hover"><thead><tr><th class="col-xs-2">{{\'TERRITORY\' | translate}}</th><th class="col-xs-2 text-nowrap">{{\'COVERED\' | translate}}</th><th class="col-xs-2 text-nowrap">{{\'TAKEN\' | translate}}</th><th class="col-xs-6 text-nowrap">{{\'DESCRIPTION\' | translate}}</th></tr></thead><tbody data-ng-repeat="t in holder.territories"><tr><td><a data-ui-sref="app.territory.single({id: t.id})"><strong>{{t.territoryCode}}</strong></a></td><td data-ng-class="isNotCoveredLimitExeeded(t, app) ? \'bg-danger\' : \'\'"><a data-tooltip="{{t.covered | amTimeAgo}}">{{t.covered | date : \'dd.MM.yyyy\'}}</a></td><td data-ng-class="isHolderNotChangedLimitExeeded(t, app) ? \'bg-danger\': \'\'"><a data-tooltip="{{t.taken | amTimeAgo}}">{{t.taken | date : \'dd.MM.yyyy\'}}</a></td><td><a data-tooltip="{{t.description}}">{{t.description | limitTo : 50}} {{t.description.length > 50 ? \'...\' : \'\'}}</a></td></tr></tbody></table></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/holder/list-info.html',
    '<h4>Alueomistajat</h4><p>Tämä näkymä listaa kaikki alueomistajat. Hakutoiminnon avulla voit etsiä alueomistajia. Voit valita alueomistajan painamalla omistajan nimeä ja nähdä tarkempia tietoja.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/holder/list.html',
    '<h3>Alueomistajat ({{itemCount}}) <a class="pull-right" data-ng-if="user.admin" data-ui-sref="app.holder.add" data-tooltip="Lisää uusi alueomistaja"><i class="fa fa-plus-circle"></i></a></h3><div class="row"><div class="col-sm-12 list-search"><list-search data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search></div></div><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div><div class="row"><div class="col-sm-12"><table class="table table-hover"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title"></span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody><tr data-ng-repeat="holder in items"><td class="col-md-3"><a data-ui-sref="app.holder.single({id: holder.id})"><span data-ng-if="!holder.isArchived">{{holder.name}}</span> <span data-ng-if="holder.isArchived"><s>{{holder.name}}</s> (arkistoitu)</span></a></td><td class="col-md-3 mobile-hide">{{holder.email}}</td><td class="col-md-2 mobile-hide">{{holder.telephone}}</td><td class="col-md-3">{{holder.description}}</td><td class="col-md-1">{{holder.territories.length}}</td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>Ei omistajia ...</em></td></tr></tbody></table></div></div><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/messages/messages-info.html',
    '<h4>General info</h4><p>This is an example page to demonstrate how this boilerplate handles errors with <em>$http</em> and <em>$sailsSocket</em> requests. Note that this <em>magic</em> is done automatically via the error interceptor so you don\'t have to do anything extra for error handling. The error handling is done via the error interceptor that is attached to <em>$http</em> and <em>$sailsSocket</em> services.</p><p>This interceptor will catch <em>all</em> errors from <em>$http</em> and <em>$sailsSocket</em> requests and show those to the user via the message service. Note that the message shown depends on the actual error response from the backend.</p><h4>Functions in this example</h4><dl class="dl-horizontal"><dt>Custom messages</dt><dd>Simple example to trigger different types of messages: <em>info, success, warning</em> and <em>error</em> with specified <em>title</em> and actual <em>message</em>.</dd><dt>$http / $sailsSocket</dt><dd>Examples to demonstrate invalid URL and not found record. These are handled automatically by <em>ErrorInterceptor</em>.</dd></dl><page-info-files data-files="{{files}}"></page-info-files>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/messages/messages.html',
    '<h3>Messages</h3><p>This page demonstrates how you can use the <code>Message</code> service in your application. This service is automatically hooked to <code>$http</code> and <code>$sailsSocket</code> errors.</p><div class="row"><div class="col-md-4"><h5 class="col-md-offset-3">Message trigger from form data</h5><form name="customMessage" class="form-horizontal" role="form"><div class="form-group"><label for="title" class="col-md-3 control-label">Title</label><div class="col-md-9"><input id="title" name="title" class="form-control" placeholder="Enter title" required data-ng-model="title"></div></div><div class="form-group"><label for="message" class="col-md-3 control-label">Message</label><div class="col-md-9"><textarea id="message" name="message" class="form-control" data-ng-model="message"></textarea></div></div><div class="form-group"><label for="type" class="col-md-3 control-label">Type</label><div class="col-md-9"><select id="type" name="type" class="form-control" required data-ng-model="type" data-ng-options="messageType as messageType for messageType in messageTypes"></select></div></div><div class="form-group"><div class="col-md-9 col-md-offset-3"><button class="btn btn-primary" data-ng-disabled="!customMessage.$valid" data-ng-click="showMessage()">Show message</button></div></div></form></div><div class="col-md-4"><h5>Automatic message trigger via <code>$http</code></h5><div class="form-group"><button class="btn btn-primary" data-ng-click="makeInvalidHttpRequest(0)">Invalid URL</button> <button class="btn btn-primary" data-ng-click="makeInvalidHttpRequest(1)">Record not found</button></div><h5>Automatic message trigger via <code>$sailsSocket</code></h5><div class="form-group"><button class="btn btn-primary" data-ng-click="makeInvalidSailsSocketRequest(0)">Invalid URL</button> <button class="btn btn-primary" data-ng-click="makeInvalidSailsSocketRequest(1)">Record not found</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/add-info.html',
    '<p>Tässä näkymässä voit lisätä uuden alueen.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/add.html',
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" data-ng-click="dismiss()"><span aria-hidden="true">&times;</span> <span class="sr-only">Sulje</span></button><h3 class="modal-title">Uuden alueen lisääminen</h3></div><div class="modal-body modal-help"><form class="form-vertical" role="form" name="territoryForm" data-ng-submit="addTerritory()"><div class="row"><div class="col-md-12"><div class="form-group" style="margin-top: 10px">{{\'TERRITORY_CODE\' | translate}}: <input class="form-control" name="territory.territoryCode" required placeholder="Kirjoita alueen koodi tai tunnus" data-ng-model="territory.territoryCode"></div><div class="form-group" style="margin-top: 10px">{{\'TYPE\' | translate}}: <input class="form-control" name="territory.type" required placeholder="Kirjoita aluetyyppi" data-ng-model="territory.type"></div><div class="form-group" style="margin-top: 10px">{{\'NUMBER_OF_APARTMENTS\' | translate}}: <input type="number" min="0" class="form-control" name="territory.apartmentCount" required placeholder="Kirjoita alueen asuntojen lukumäärä kokonaislukuna" data-ng-model="territory.apartmentCount"></div><div class="form-group">{{\'DESCRIPTION\' | translate}}:<textarea name="territory.description" class="form-control" required placeholder="Kirjoita alueen kuvaus" data-ng-model="territory.description">{territory.description}</textarea></div><div class="form-group">{{\'COVERED\' | translate}}:<p class="input-group"><input required class="form-control" data-datepicker-popup="dd.MM.yyyy" data-is-open="coveredDatePickerIsOpen" data-ng-click="datePickerOpened($event); coveredDatePickerIsOpen = true;" data-ng-model="territory.covered"><span class="input-group-btn"><button type="button" class="btn btn-default" data-ng-click="datePickerOpened($event); coveredDatePickerIsOpen = true;"><span class="fa fa-calendar"></span></button></span></p></div><div class="form-group">{{\'TAKEN\' | translate}}:<p class="input-group"><input class="form-control" data-datepicker-popup="dd.MM.yyyy" required data-is-open="takenDatePickerIsOpen" data-ng-click="datePickerOpened($event); takenDatePickerIsOpen = true;" data-ng-model="territory.taken"><span class="input-group-btn"><button type="button" class="btn btn-default" data-ng-click="datePickerOpened($event); coveredDatePickerIsOpen = true;"><span class="fa fa-calendar"></span></button></span></p></div><div class="form-group">{{\'INITIAL_HOLDER\' | translate}}:<select class="form-control" data-ng-model="selectedHolder" required data-ng-options="holder.id as holder.name for holder in holders"></select></div><div class="form-group" style="margin-top: 10px">{{\'Leveyskoordinaatti\' | translate}}: <input type="number" min="-90" max="90" step="0.0000000000000001" class="form-control" name="map.territoryCenterMarker.coords.latitude" required placeholder="Anna leveyskoordinaatti" data-ng-model="map.territoryCenterMarker.coords.latitude"> {{\'Pituuskoordinaatti\' | translate}}: <input type="number" min="-180" max="180" step="0.0000000000000001" class="form-control" name="map.territoryCenterMarker.coords.longitude" required placeholder="Anna pituuskoordinaatti" data-ng-model="map.territoryCenterMarker.coords.longitude"></div><ui-gmap-google-map center="map.center" zoom="map.zoom"><ui-gmap-marker coords="map.territoryCenterMarker.coords" idkey="map.territoryCenterMarker.id" options="map.territoryCenterMarker.options" events="map.territoryCenterMarker.events"></ui-gmap-marker></ui-gmap-google-map><button type="submit" class="btn btn-primary" data-ng-disabled="!territoryForm.$valid">{{\'SAVE\' | translate}}</button></div></div></form></div><div class="modal-footer"><button class="btn btn-primary btn-sm" data-ng-click="dismiss()">Sulje</button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/list-info.html',
    '<h4>Alueiden merkitseminen ja omistajan vaihtaminen</h4><ol><li>Valitse alueet joita haluat muuttaa rastittamalla alueet "Valinta"-sarakkeessa.</li><li>Ilmestyvässä ikkunassa näet valitut alueet.</li><li>Kun valinta on tehty, paina "Tee muutoksia alueisiin".</li><li>Valitse toiminto, jonka haluat tehdä.</li><li>Paina tallenna tai peruuta.</li></ol><p>Huom! Jos käyttäjätunnuksesi liittyy tiettyyn alueomistajaan, voit valita vain omia tai aluepöydässä olevia alueita.</p><h4>Alueiden haku</h4><ol><li>Kirjoita hakutermit niille varattuun tilaan.</li><li>Voit hakea myös tietyn omistajan alueita.</li><li>Kaikki hakuehdot yhdistetään TAI-operaattorilla.</li><li>Voit poistaa hakuehtoja yksitellen klikkaamalla niitä.</li></ol><h4>Sähköpostimuistutukset</h4>Muistutus lähetetään seuraavista tapahtumista:<ol><li>Alueen ottaminen.</li><li>Alueen palauttaminen.</li><li>Aluetta ei ole käyty määräaikaan mennessä.</li></ol>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/list.html',
    '<div data-territory-sub-pages></div><div class="alert alert-info top-buffer email-warning" data-ng-show="mailsTotal > 0"><h4><i class="fa fa-envelope"></i> Sähköpostimuistutukset <button type="button" class="close" data-dismiss="alert">&times;</button></h4><span data-ng-class="mailsTotal > 5 ? \'badge badge-important\' : \'badge badge-info\'">{{mailsTotal}}</span> <span data-ng-if="mailsTotal == 1">viesti odottaa lähettämistä.</span> <span data-ng-if="mailsTotal > 1">viestiä odottaa lähettämistä.</span> <a class="btn btn-xs btn-primary" data-ng-click="sendNotificationEmails()">Lähetä</a></div><div class="alert alert-danger top-buffer backup-warning" data-ng-show="suggestBackup"><h4><i class="fa fa-exclamation-circle"></i> Varmuuskopiointi <button type="button" class="close" data-dismiss="alert">&times;</button></h4>Edellisen varmuuskopion ottamisesta on kulunut jo tovi <a class="btn btn-xs btn-danger" data-ng-click="runBackup()">Varmuuskopioi</a></div><h3>{{\'TERRITORIES\' | translate}} ({{itemCount}}) <a class="pull-right" data-ng-if="user.admin" data-ui-sref="app.territory.add" data-tooltip="Lisää uusi alue"><i class="fa fa-plus-circle"></i></a></h3><div class="row"><div class="col-sm-12"><list-search data-holders="holders" data-attributes="attributes" data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search><ul class="list-inline" data-ng-if="filters.searchWord.length">Hakutermit:<li data-ng-repeat="w in filters.searchWord.split(\' \') track by $index"><span class="label label-primary" data-ng-click="removeSearchWord(filters.searchWord, $index);">{{w}} <span class="fa fa-times"></span></span></li></ul><span data-ng-if="filters.holderId">Ainoastaan omistaja: <span class="label label-primary" data-ng-click="filters.holderId = null;">{{getHolderNameWithId(holders, filters.holderId)}} <span class="fa fa-times"></span></span></span> <span data-ng-if="filters.attributeLinkId">&nbsp;Ainoastaan attribuutti: <span class="label label-primary" data-ng-click="filters.attributeLinkId = null;"><span class="fa fa-{{getAttributeWithId(attributes, filters.attributeLinkId).icon}}"></span> {{getAttributeWithId(attributes, filters.attributeLinkId).name}} <span class="fa fa-times"></span></span></span></div></div><div class="row"><div class="col-sm-12"></div></div><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager><table class="table table-hover"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems | filter:titleFilter"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title">{{item.title | translate}}</span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody data-ng-repeat="territory in items"><tr data-ng-class="territory.checked ? \'bg-info\' : (selectionDisabledFilter(territory) ? \'bg-tuned-down\' : \'\')"><td class="col-md-1 valign"><h4><strong><a data-ui-sref="app.territory.single({id: territory.id})"><span data-ng-if="!territory.archived">{{territory.territoryCode || territory.id}}</span> <span data-ng-if="territory.archived"><s>{{territory.territoryCode || territory.id}}</s></span></a></strong></h4></td><td class="col-md-1 valign mobile-hide">{{territory.type}} <span data-ng-if="territory.archived">(arkistoitu)</span></td><td data-ng-class="isNotCoveredLimitExeeded(territory, app) ? \'bg-danger col-md-1 valign\' : \'col-md-1 valign\'"><a data-tooltip="{{territory.covered | amTimeAgo}}">{{territory.covered | date : \'dd.MM.yyyy\'}}</a></td><td data-ng-class="isHolderNotChangedLimitExeeded(territory, app) ? \'bg-danger col-md-1 valign mobile-hide\': \'col-md-1 valign mobile-hide\'"><a data-tooltip="{{territory.taken | amTimeAgo}}">{{territory.taken | date : \'dd.MM.yyyy\'}}</a> <a data-ng-if="getLastTerritoryHolderHistory(territory).description" class="fa fa-comment" data-tooltip="{{getLastTerritoryHolderHistory(territory).description}}"></a></td><td class="col-md-1 valign mobile-hide"><ul class="list-inline"><li data-ng-repeat="tla in territory.territoryLinkAttribute"><span class="fa fa-{{getAttributeWithId(attributes, tla.attribute).icon}}" data-tooltip="{{getAttributeWithId(attributes, tla.attribute).description}}"></span></li><li data-ng-if="user.admin || user.canAddAttributes"><span data-editable-select="newAttributeLink" data-e-ng-options="a.id as a.name for a in attributes" data-onaftersave="addAttributeLink(territory, newAttributeLink)"><a class="fa fa-plus-circle" data-tooltip="Lisää uusi attribuutti"></a></span></li></ul></td><td class="col-md-4 valign mobile-hide"><span class="badge" data-ng-if="!user.admin && territory.apartmentCount"><span data-tooltip="{{territory.apartmentCount ? \'Asuntojen lukumäärä \' + territory.apartmentCount : \'Asuntojen lukumäärä ei ole tiedossa\'}}">{{territory.apartmentCount}}</span></span> <a data-tooltip="{{territory.description}}">{{territory.description | limitTo : 60}} {{territory.description.length > 60 ? \'...\' : \'\'}}</a> <span class="pull-right" data-ng-if="user.admin || user.canAddApartmentCount" data-editable-number="territory.apartmentCount" data-onaftersave="updateApartmentCount(territory, territory.apartmentCount)"><a data-tooltip="{{territory.apartmentCount ? \'Asuntojen lukumäärä \' : \'Asuntojen lukumäärä ei ole tiedossa\'}}">{{territory.apartmentCount || \'?\'}}</a></span></td><td data-ng-class="!isDefaultHolder(territory.holder.id) ? \'bg-tuned-down col-md-2 valign\' : \'col-md-2 valign\'"><a data-ui-sref="app.holder.single({id: territory.holder.id})">{{territory.holder.name}}</a></td><td class="col-md-1 valign text-center"><label class="whitespace-label"><input type="checkbox" class="big-checkbox" id="checkbox_{{territory.id}}" data-ng-model="territory.checked" data-ng-change="territoryChecked(territory, items)" data-ng-disabled="selectionDisabledFilter(territory)"></label></td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>no data found...</em></td></tr></tbody></table></div></div><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right mobile-hide" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="5" data-boundary-links="true" data-rotate="false" data-first-text="{{\'FIRST\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}" data-next-text="{{\'NEXT\' | translate}}" data-last-text="{{\'LAST\' | translate}}"></pagination><pager class="desktop-hide" total-items="itemCount" data-ng-model="currentPage" data-rotate="false" data-items-per-page="itemsPerPage" data-next-text="{{\'NEXT\' | translate}}" data-previous-text="{{\'PREVIOUS\' | translate}}"></pager></div></div><div class="row top-buffer" data-ng-show="filteredItems.length > 0"><div class="col-sm-12"><div class="panel panel-primary" id="territoryOperationsWrapper"><div class="panel-heading"><button class="btn btn-xs btn-primary pull-right" data-ng-click="clearSelected(items)"><i style="color: white" class="fa fa-times text-info"></i></button> <button style="margin-right: 2px" class="btn btn-xs btn-primary pull-right" class="btn btn-primary btn-sm" data-ng-init="isAllCollapsed = false" data-ng-click="isAllCollapsed = !isAllCollapsed"><i data-ng-if="!isAllCollapsed" style="color: white" class="fa fa-minus text-info"></i> <i data-ng-if="isAllCollapsed" style="color: white" class="fa fa-square-o text-info"></i></button> {{\'OPERATIONS_FOR_SELECTED_TERRITORIES\' | translate}} ({{filteredItems.length}})<div class="clearfix"></div></div><div class="panel-body" id="territoryOperations" data-collapse="isAllCollapsed"><ul class="list-inline"><li class="vertical-list" data-ng-repeat="t in filteredItems = (items | filter : onlyCheckedTerritories)"><a data-ui-sref="app.territory.single({id: t.id})"><h3>{{t.territoryCode || t.id}}</h3></a></li></ul><span class="text-muted">Nykyinen omistaja {{getHolderNameWithId(holders, selectedTerritoryHolderId)}}</span><div data-collapse="isCollapsed"><form class="form-horizontal"><fieldset class="fieldset-nomargins"><legend>Alueiden merkitseminen ja omistajan vaihtaminen</legend><div class="form-group row"><label class="col-lg-12 control-label text-left" for="operation">Valitse toiminto</label><div class="col-lg-12"><div class="radio"><label for="operation-0"><input type="radio" data-ng-model="operation" name="operation" id="operation-0" value="1" checked data-ng-disabled="isDefaultHolder(selectedTerritoryHolderId)" data-ng-change="territoryOperationChange(operation)"> Merkitse käydyksi (alueomistaja ei vaihdu)</label></div><div class="radio"><label for="operation-1"><input type="radio" data-ng-model="operation" name="operation" id="operation-1" data-ng-disabled="isDefaultHolder(selectedTerritoryHolderId)" data-ng-change="territoryOperationChange(operation)" value="2"> Merkitse käydyksi ja vaihda alueomistaja</label></div><div class="radio"><label for="operation-2"><input type="radio" data-ng-model="operation" name="operation" id="operation-2" data-ng-change="territoryOperationChange(operation)" value="3"> Vaihda alueomistaja (ei merkitä käydyksi)</label></div></div></div><div class="form-group row" data-ng-show="operation == 2 || operation == 3"><label class="col-lg-12 control-label text-left" for="selectbasic">Uusi alueomistaja</label><div class="col-lg-12"><select id="selectbasic" class="form-control" data-ng-model="selectedHolder" data-ng-options="holder.id as ((holder.id == selectedTerritoryHolderId ? \'* \':\'\') + holder.name) for holder in holders | filter : onlyAllowedHolders | filter : onlyActiveHolders"></select></div></div><div class="form-group row"><label class="col-lg-12 control-label text-left" for="textinput">Kommentti</label><div class="col-lg-12"><input id="textinput" data-ng-model="territoryChangeComment" name="textinput" maxlength="100" placeholder="Muutokseen liittyvä kommentti" class="form-control input-md"> <span class="help-block">Voit kirjoittaa kommentin esim. jos alue on käyty kampanjan yhteydessä</span></div></div><div class="form-group top-buffer"><div class="col-lg-12"><button data-ng-if="operation !== \'1\' && operation !== \'2\' && operation !== \'3\'" class="btn btn-success btn-md" disabled>Tallenna</button> <button data-ng-if="operation === \'1\'" class="btn btn-success btn-md" data-ng-click="markTerritoriesAsCovered(filteredItems, territoryChangeComment)">Tallenna</button> <button data-ng-if="operation === \'2\'" class="btn btn-success btn-md" data-ng-disabled="!selectedHolder || selectedHolder === selectedTerritoryHolderId" data-ng-click="changeHolder(filteredItems, true, selectedHolder, territoryChangeComment)">Tallenna</button> <button data-ng-if="operation === \'3\'" class="btn btn-success btn-md" data-ng-disabled="!selectedHolder || selectedHolder === selectedTerritoryHolderId" data-ng-click="changeHolder(filteredItems, false, selectedHolder, territoryChangeComment)">Tallenna</button> <button class="btn btn-danger btn-md pull-right" data-ng-click="clearSelected(items)">Peruuta</button></div></div></fieldset></form></div></div><div class="panel-footer text-center" data-collapse="isAllCollapsed"><button class="btn btn-primary btn-xs" data-ng-init="isCollapsed = true" data-ng-click="isCollapsed = !isCollapsed">{{isCollapsed ? \'Tee muutoksia alueisiin\' : \'Pienennä\'}}</button><div class="clearfix"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/map-info.html',
    '<p>Tässä näkymässä voit tarkastella alueita kartalla.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/map.html',
    '<style>.angular-google-map-container { height: 800px; }</style><div data-territory-sub-pages></div><ui-gmap-google-map class="bigMap" center="map.center" zoom="map.zoom"><ui-gmap-window show="map.window.show" coords="map.window.model" options="map.window.options" closeclick="map.window.closeClick()"><div><h4><a href="/app/territory/{{map.window.linkId}}">{{map.window.title}}</a></h4><p>{{\'COVERED\' | translate}} <span data-am-time-ago="map.window.covered"></span></p></div></ui-gmap-window><ui-gmap-markers models="territoryMarkers" coords="\'self\'" icon="\'icon\'" fit="true" events="map.markersEvents" options="\'options\'"></ui-gmap-markers></ui-gmap-google-map>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/quickview-info.html',
    '<p>Tässä näkymässä voit tarkastella alueiden tilannetta nopeasti.</p><ul><li>Lihavoidut koodit tarkoittavat alueita jotka ovat aluepöydässä.</li><li>Lihavoidut koodit tarkoittavat alueita jotka ovat jollakulla alueomistajista.</li><li>Punaiset koodit tarkoittavat alueita joita ei ole merkitty käydyksi määräaikaan mennessä.</li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/quickview.html',
    '<div data-territory-sub-pages></div><div class="content top-buffer"><ul class="list-inline"><li class="vertical-list" data-ng-repeat="t in territories | orderBy  : \'territoryCode\'"><h4><a data-ui-sref="app.territory.single({id: t.id})" data-ng-class="isDefaultHolder(t.holder.id) ? \'strong-text\':\'\'"><span data-tooltip="Omistaja {{t.holder.name}}. Käyty {{t.covered | amTimeAgo}}." data-ng-class="isNotCoveredRecently(t, app) ? \'text-danger\' : \'\'">{{t.territoryCode}}</span></a></h4></li></ul></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/s13-info.html',
    '<p>S-13 lomake vastaa painettua lomaketta. Voit tulostaa lomakkeen normaalisti selaimen tulostustoiminnolla.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/s13.html',
    '<div data-territory-sub-pages></div><div data-ng-repeat="t in territories"><div data-ng-if="$index !== 0 && $index % 5 === 0" style="page-break-after: always"></div><h3 data-ng-if="$index === 0 || $index % 5 === 0" class="col-xs-12">{{\'TERRITORY_LIST\' | translate}}</h3><table border="1px" class="s13"><thead><tr><th colspan="2" width="124px" class="text-center">{{t.territoryCode}}</th></tr></thead><tbody data-ng-repeat="thh in t.territoryHolderHistory"><tr style="height: 21px"><td colspan="2">{{getHolderNameWithId(thh.holder)}}</td></tr><tr style="height: 21px"><td class="small">{{thh.startDate | date: \'dd.MM.yyyy\'}}</td><td class="small">{{thh.endDate | date: \'dd.MM.yyyy\'}}</td></tr></tbody><tbody data-ng-repeat="x in t.emptyArray"><tr style="height: 21px"><td colspan="2">&emsp;</td></tr><tr style="height: 21px"><td>&emsp;</td><td>&emsp;</td></tr></tbody></table></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/stats-info.html',
    '<p>Tilastot kertovat alueiden tilanteen eri tunnuslukujen avulla.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/stats.html',
    '<div data-territory-sub-pages></div><div><table><tr><td>Alueita yhteensä</td><td>{{totalCount}}</td></tr><tr></tr><tr><td>Alueita aluepöydässä</td><td>{{holderIsDefault}}</td></tr><tr></tr><tr><td>Huonosti käytyjä alueita ({{app.notCoveredLimit}} päivää käymättä)</td><td>{{notCoveredRecently}}</td></tr><tr></tr><tr><td>Alueita, joita ei lasketa huonosti käydyiksi (esim. puhelin- ja liikealueet)</td><td>{{totalNotCountedWhenCalculatingCoveredDuringLastYearTotal}}, joista huonosti käytyjä {{totalNotCountedWhenCalculatingCoveredDuringLastYearTotalNotCovered}}</td></tr><tr></tr><tr><td>Keskimääräinen aika käydyksi merkitsemisen välillä</td><td>{{averageCoveredTime}}</td></tr><tr></tr><tr><td>Keskimääräinen aika samalla omistajalla</td><td>{{averageTimeSameHolder}}</td></tr><tr></tr></table></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/territory-info.html',
    '<p>Tässä näkymässä voit tarkastella alueen tietoja ja karttaa.</p><h4>Kieltopaikkojen ja vieraskielisten merkitseminen</h4><ol><li>Klikkaa työkalu-kuvaketta "Kieltopaikat ja vieraskieliset" -listan kohdalta.</li><li>Kirjoita paikan nimi, osoite ja valitse oikea tyyppi.</li><li>Lisää merkintä klikkaamalla "Lisää"</li></ol><p>Vain pääkäyttäjät voivat tehdä muutoksia alueen tietoihin lukuunottamatta kieltopaikkojen ja vieraskielisten merkitsemistä.</p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/app/territory/territory.html',
    '<div data-ng-show="!territory"><h3>{{\'TERRITORY_NOT_FOUND\' | translate}}</h3></div><div class="row print-only"><div class="col-sm-12 col-print-12"><h3>{{territory.territoryCode || \'Alueen koodi puuttuu\'}} <span class="pull-right">{{territory.type}}</span></h3><pre style="white-space: pre-line; width: 100%">\n' +
    '            {{territory.description}}\n' +
    '        </pre><p ng-show="!!territory.apartmentCount">Alueen asuntojen yhteismäärä {{territory.apartmentCount}}</p></div></div><div class="row"><div class="col-sm-6 no-print"><div data-ng-show="territory"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveTerritory()"><h3><span style="width: 100%" data-editable-text="territory.territoryCode" data-e-name="territory.territoryCode" data-e-required>{{territory.territoryCode}} <span data-ng-if="territory.archived">(arkistoitu)</span></span> <span class="pull-right" data-ng-show="!editableForm.$visible && user.admin"><a href="#" class="no-print" data-ng-click="editableForm.$show()" data-tooltip="{{\'EDIT\' | translate}}"><i class="fa fa-wrench"></i></a></span></h3><dl class="dl-horizontal no-print"><dt>{{\'HOLDER\' | translate}}</dt><dd><span data-editable-select="territory.holder.id" data-e-name="holder.id" data-e-ng-options="holder.id as holder.name for holder in holders | filter : onlyActiveHolders" data-e-required><a data-ui-sref="app.holder.single({id: territory.holder.id})">{{territory.holder.name}}</a></span></dd><dt>{{\'COVERED\' | translate}}</dt><dd><span data-editable-bsdate="territory.covered" data-e-ng-click="openPickers(\'coveredDateOpened\')" data-e-is-open="pickers.coveredDateOpened" data-e-datepicker-popup="dd.MM.yyyy" data-e-current-text="Tänään" data-e-clear-text="Tyhjennä" data-e-close-text="Ok" data-e-name="date"><a data-ng-class="isNotCoveredLimitExeeded(territory, app) ? \'bg-danger\' : \'\'" data-tooltip="{{territory.covered | amTimeAgo}}">{{(territory.covered | date : \'dd.MM.yyyy\') || \'Ei merkintää\'}}</a></span></dd><dt>{{\'TAKEN\' | translate}}</dt><dd><span data-editable-bsdate="territory.taken" data-e-ng-click="openPickers(\'takenDateOpened\')" data-e-is-open="pickers.takenDateOpened" data-e-datepicker-popup="dd.MM.yyyy" data-e-current-text="Tänään" data-e-clear-text="Tyhjennä" data-e-close-text="Ok" data-e-name="date"><a data-ng-class="isHolderNotChangedLimitExeeded(territory, app) ? \'bg-danger\' : \'\'" data-tooltip="{{territory.taken | amTimeAgo}}">{{(territory.taken | date : \'dd.MM.yyyy\') || \'Ei merkintää\'}}</a></span></dd><dt>{{\'TYPE\' | translate}}</dt><dd><span data-editable-text="territory.type" data-e-name="territory.type" data-e-required>{{territory.type}}</span></dd><dt>{{\'NUMBER_OF_APARTMENTS\' | translate}}</dt><dd><span data-editable-number="territory.apartmentCount" data-e-name="territory.apartmentCount" data-e-required>{{territory.apartmentCount}}</span></dd><dt>{{\'ARCHIVED\' | translate}}</dt><dd><span data-editable-checkbox="territory.archived" data-e-title="Alue ei ole enää käytössä?">{{territory.archived ? \'Kyllä\' : \'Ei\'}}</span></dd><dt>{{\'NOT_COUNTED_WHEN_CALCULATING_POORLY_COVERED\' | translate}}</dt><dd><span data-editable-checkbox="territory.notCountedWhenCalculatingCoveredDuringLastYearTotal" data-e-title="{{\'NOT_COUNTED_WHEN_CALCULATING_POORLY_COVERED_2\' | translate}}"><a data-tooltip="Esimerkiksi puhelin- ja liikealueita ei yleensä lasketa vuoteen käymättömien alueiden joukkoon.">{{!territory.notCountedWhenCalculatingCoveredDuringLastYearTotal ? \'Kyllä\' : \'Ei\'}}</a></span></dd></dl><div class="no-print"><h4>{{\'Alueen kuvaus\' | translate}}</h4><pre style="white-space: pre-line" data-editable-textarea="territory.description" data-e-name="territory.description" data-e-required>{{territory.description}}</pre></div><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">{{\'SAVE\' | translate}}</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel(); editableMap = false;">{{\'CANCEL\' | translate}}</button> <button type="button" class="btn btn-danger pull-right" data-ng-bootbox-title="Danger - Danger - Danger" data-ng-bootbox-custom-dialog="{{\'DELETING_TERRITORY\' | translate}} <strong>{{territory.territoryCode}}</strong>. {{\'ARE_YOU_SURE\' | translate}}" data-ng-bootbox-buttons="confirmButtonsDelete">{{\'DELETE\' | translate}}</button></div></div></form></div></div><div class="col-sm-6 no-print" data-ng-if="territory.territoryHolderHistory.length === 0"><h4>{{\'NO_HOLDER_HISTORY\' | translate}}</h4></div><div class="col-sm-6 no-print" data-ng-if="territory.territoryHolderHistory.length > 0"><h4>{{\'HISTORY\' | translate}} ({{territory.territoryHolderHistory.length}}) <span class="pull-right" data-ng-show="!deleteTerritoryHolderHistoryItemVisible && user.admin"><a href="#" class="no-print" data-ng-click="deleteTerritoryHolderHistoryItemVisible = true" data-tooltip="{{\'EDIT\' | translate}}"><i class="fa fa-wrench"></i></a></span></h4><table class="table table-condensed table-hover"><thead><tr><th class="col-xs-3">{{\'HOLDER\' | translate}}</th><th class="col-xs-2 text-nowrap">{{\'START_DATE\' | translate}}</th><th class="col-xs-2 text-nowrap">{{\'END_DATE\' | translate}}</th><th class="col-xs-4 text-nowrap">{{\'ADDITIONAL_INFO\' | translate}}</th><th class="col-xs-1 text-nowrap"></th></tr></thead><tbody data-ng-repeat="thh in territory.territoryHolderHistory"><tr><td><span data-ng-if="user.admin" data-editable-select="thh.holder" data-e-name="thh.holder.id" data-e-ng-options="holder.id as holder.name for holder in holders" data-e-required data-onaftersave="saveTerritoryHistoryItem(thh)">{{getHolderNameWithId(thh.holder)}}</span> <span data-ng-if="!user.admin"><a data-ui-sref="app.holder.single({id: thh.holder})">{{getHolderNameWithId(thh.holder)}}</a></span></td><td><span data-ng-if="user.admin" data-editable-bsdate="thh.startDate" data-e-ng-click="openPickers(\'thhStartDateOpened\')" data-e-is-open="pickers.thhStartDateOpened" data-e-datepicker-popup="dd.MM.yyyy" data-e-current-text="Tänään" data-e-clear-text="Tyhjennä" data-e-close-text="Ok" data-e-name="date" data-onaftersave="saveTerritoryHistoryItem(thh)">{{(thh.startDate | date : \'dd.MM.yyyy\') || \'Ei alkupäivää\'}}</span> <span data-ng-if="!user.admin">{{thh.startDate | date : \'dd.MM.yyyy\'}}</span></td><td><span data-ng-if="user.admin" data-editable-bsdate="thh.endDate" data-e-ng-click="openPickers(\'thhEndDateOpened\')" data-e-is-open="pickers.thhEndDateOpened" data-e-current-text="Tänään" data-e-clear-text="Tyhjennä" data-e-close-text="Ok" data-e-datepicker-popup="dd.MM.yyyy" data-onaftersave="saveTerritoryHistoryItem(thh)" data-e-name="date">{{(thh.endDate | date: \'dd.MM.yyyy\') || \'Ei loppupäivää\'}}</span> <span data-ng-if="!user.admin">{{thh.endDate | date: \'dd.MM.yyyy\'}}</span></td><td><span data-ng-if="user.admin" data-editable-text="thh.description" data-e-name="thh.description" data-onaftersave="saveTerritoryHistoryItem(thh)">{{thh.description || \'Ei kommenttia\'}}</span> <span data-ng-if="!user.admin">{{thh.description}}</span></td><td><a data-ng-show="deleteTerritoryHolderHistoryItemVisible" data-ng-click="setTerritoryHolderHistoryToBeDeleted(thh)" data-ng-bootbox-title="{{\'DELETING_TERRITORY_HISTORY_ROW\' | translate}}" data-ng-bootbox-custom-dialog="{{\'ARE_YOU_SURE\' | translate}}" data-ng-bootbox-buttons="confirmHistoryButtonsDelete"><span class="fa fa-trash fa-2x"></span></a></td></tr></tbody></table></div><div class="col-sm-6"><h4><span data-ng-if="territory.territoryLinkAttribute.length > 0">{{\'ATTRIBUTES\' | translate}} ({{territory.territoryLinkAttribute.length}})</span> <span data-ng-if="territory.territoryLinkAttribute.length === 0" class="no-print">{{\'NO_TERRITORY_ATTRIBUTES\' | translate}}</span> <span class="pull-right" data-ng-show="!deleteTerritoryLinkAttributeItemVisible && user.admin"><a href="#" class="no-print" data-ng-click="deleteTerritoryLinkAttributeItemVisible = true" data-tooltip="{{\'EDIT\' | translate}}"><i class="fa fa-wrench"></i></a></span></h4><table class="table table-condensed table-hover" data-ng-if="territory.territoryLinkAttribute.length > 0"><thead><tr><th class="col-xs-1"></th><th class="col-xs-3 text-nowrap">{{\'NAME\' | translate}}</th><th class="col-xs-7 text-nowrap">{{\'ATTRIBUTE_DESCRIPTION\' | translate}}</th><th class="col-xs-1 text-nowrap"></th></tr></thead><tbody data-ng-repeat="tla in territory.territoryLinkAttribute"><tr><td><span class="fa fa-{{getAttributeWithId(attributes, tla.attribute).icon}}"></span></td><td>{{getAttributeWithId(attributes, tla.attribute).name}}</td><td>{{getAttributeWithId(attributes, tla.attribute).description}}</td><td><a data-ng-show="deleteTerritoryLinkAttributeItemVisible" data-ng-click="setTerritoryLinkAttributeToBeDeleted(tla)" data-ng-bootbox-title="You are about to delete a territory attribute" data-ng-bootbox-custom-dialog="Are you sure about the territory attribute delete?" data-ng-bootbox-buttons="confirmAttributeButtonsDelete"><span class="fa fa-trash fa-2x"></span></a></td></tr></tbody></table><div data-ng-if="user.admin && deleteTerritoryLinkAttributeItemVisible"><div class="form-inline"><div class="form-group"><label for="newAttributeInput">{{\'ADD_ATTRIBUTE\' | translate}}</label><select id="newAttributeInput" class="form-control input-sm" ng-model="newAttribute" ng-options="a.name for a in attributes"></select></div><a class="btn btn-primary btn-sm" data-ng-click="addNewAttribute(newAttribute);">{{\'ADD\' | translate}}</a></div></div></div><div class="col-sm-6 no-print"><h4><span data-ng-if="territory.specialAddress.length > 0">Kieltopaikat ja vieraskieliset ({{territory.specialAddress.length}})</span> <span data-ng-if="territory.specialAddress.length === 0">Alueella ei ole kieltopaikkoja tai vieraskielisiä</span> <span class="pull-right" data-ng-show="!deleteSpecialAddressItemVisible && (user.admin || user.canAddSpecialAddresses)"><a href="#" class="no-print" data-ng-click="deleteSpecialAddressItemVisible = true" data-tooltip="{{\'EDIT\' | translate}}"><i class="fa fa-wrench"></i></a></span></h4><table class="table table-condensed table-hover" data-ng-if="territory.specialAddress.length > 0"><thead><tr><th class="col-xs-1 text-nowrap">Päiväys</th><th class="col-xs-4 text-nowrap">Nimi</th><th class="col-xs-5 text-nowrap">Osoite</th><th class="col-xs-1 text-nowrap">Tyyppi</th><th class="col-xs-1 text-nowrap"></th></tr></thead><tbody data-ng-repeat="sa in territory.specialAddress | filter : \'Kielto\'"><tr><td>{{sa.added | date : \'dd.MM.yyyy\'}}</td><td>{{sa.name}}</td><td>{{sa.address}}</td><td>{{sa.type}}</td><td><a data-ng-if="user.admin" data-ng-show="deleteSpecialAddressItemVisible" data-ng-click="setSpecialAddressToBeDeleted(sa)" data-ng-bootbox-title="Vahvista toiminto" data-ng-bootbox-custom-dialog="Oletko varma että haluat poistaa merkinnän?" data-ng-bootbox-buttons="confirmSpecialAddressButtonsDelete"><span class="fa fa-trash"></span></a></td></tr></tbody><tbody data-ng-repeat="sa in territory.specialAddress | filter : \'Vierask\'"><tr><td>{{sa.added | date : \'dd.MM.yyyy\'}}</td><td>{{sa.name}}</td><td>{{sa.address}}</td><td>{{sa.type}}</td><td><a data-ng-show="deleteSpecialAddressItemVisible" data-ng-click="setSpecialAddressToBeDeleted(sa)" data-ng-bootbox-title="Vahvista toiminto" data-ng-bootbox-custom-dialog="Oletko varma että haluat poistaa merkinnän?" data-ng-bootbox-buttons="confirmSpecialAddressButtonsDelete"><span class="fa fa-trash"></span></a></td></tr></tbody></table><div data-ng-if="deleteSpecialAddressItemVisible"><div class="form-inline"><div class="form-group"><label>Nimi: <input class="form-control input-sm" minlength="3" required maxlength="40" data-ng-model="specialAddress.name"></label><label>Osoite: <input class="form-control input-sm" minlength="3" maxlength="100" required data-ng-model="specialAddress.address"></label><label>Tyyppi:<select class="form-control input-sm" data-ng-model="specialAddress.type"><option value="">-</option><option value="Kielto">Kieltopaikka</option><option value="Vierask">Vieraskielinen</option></select></label><button class="btn btn-primary btn-sm" data-ng-click="addSpecialAddress(specialAddress);" data-ng-disabled="!specialAddress.name || !specialAddress.address || specialAddress.type == \'\'">{{\'ADD\' | translate}}</button></div></div></div></div></div><div data-ng-if="territory" class="no-print"><h4>Kartta <span class="pull-right" data-ng-show="!editableMap && user.admin"><a href="#" class="no-print" data-ng-click="toggleMapEditable()" data-tooltip="{{\'EDIT\' | translate}}"><i class="fa fa-wrench"></i></a></span></h4><a data-ng-show="editableMap" class="btn btn-danger pull-right" data-ng-click="replacePolylineWithDefault()">{{\'DELETE_BORDER\' | translate}}</a> <a data-ng-show="editableMap" class="btn btn-primary" data-ng-click="saveMap(map)">{{\'SAVE_MAP\' | translate}}</a><ui-gmap-google-map center="map.center" style="display: block" zoom="map.zoom"><ui-gmap-marker coords="map.territoryCenterMarker.coords" idkey="map.territoryCenterMarker.id" options="map.territoryCenterMarker.options" events="map.territoryCenterMarker.events"></ui-gmap-marker><ui-gmap-polygon editable="editableMap" static="false" ng-repeat="p in map.polygons track by p.id" path="p.path" stroke="p.stroke" visible geodesic="p.geodesic" fill="p.fill" fit="false" draggable events="map.polygonEvents"></ui-gmap-polygon></ui-gmap-google-map></div><p class="no-print">{{"Voit tulostaa aluekartan painamalla Ctrl+P" | translate}}</p><div class="col-print-12 print-only territoryMap" style="page-break-before: always"><img ng-src="{{imgSrc}}" alt="Alueen kartta puuttuu"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/auth/login/login.html',
    '<div class="form-login"><form name="loginForm" method="post" novalidate><h2 class="title">Kirjaudu sisään</h2><div class="form-group" data-show-errors><input name="username" class="form-control username" placeholder="käyttäjätunnus" autofocus autocomplete="off" required data-focus-on="username" data-ng-model="credentials.identifier"></div><div class="form-group" data-show-errors><input type="password" name="password" class="form-control password" placeholder="salasana" required data-ng-model="credentials.password"></div><button class="btn btn-primary btn-block" data-ng-click="login()" data-ng-disabled="!loginForm.$valid">Kirjaudu sisään</button></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/directives/partials/ListSearch.html',
    '<div><div class="list-search-filters list-search pull-right"><form class="form-inline mobile-hide" role="form"><div class="form-group"><input id="textFilters" class="form-control input-sm" placeholder="Hakutermit" data-ng-model="filters.searchWord"><select data-ng-if="holders.length" id="filtersHolderSelect" class="form-control input-sm" data-ng-model="filters.holderId" data-ng-options="holder.id as holder.name for holder in holders | filter : onlyActiveHolders"><option value="">-- valitse omistaja --</option></select><button data-ng-click="filters.searchWord = \'\'; filters.holderId = null; filters.attributeId = null" class="btn btn-xs" data-tooltip="Tyhjennä hakuehdot"><i class="fa fa-times text-info"></i></button><label>Rivejä:<select class="form-control input-sm" data-ng-model="items" data-ng-options="page for page in options"></select></label></div></form></div><form class="desktop-hide" role="form"><div class="form-group"><input id="textFilters" class="form-control" placeholder="Hakutermit" data-ng-model="filters.searchWord"><select data-ng-if="holders.length" id="filtersHolderSelect" class="form-control" data-ng-model="filters.holderId" data-ng-options="holder.id as holder.name for holder in holders | filter : onlyActiveHolders"><option value="">-- valitse omistaja --</option></select><label class="pull-right">Rivejä:<select class="input-sm" data-ng-model="items" data-ng-options="page for page in options"></select></label></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/directives/partials/territorySubPages.html',
    '<div class="row"><div class="col-xs-12"><ul class="list-inline pull-right"><li><a data-ui-sref="app.territory.stats" data-tooltip="Tilastot"><span class="fa fa-line-chart"></span> Tilastot</a></li><li><a data-ui-sref="app.territory.s13" data-tooltip="S-13"><span class="fa fa-history"></span> S-13</a></li><li><a data-ui-sref="app.territory.map" data-tooltip="Kartta"><span class="fa fa-map-marker"></span> {{\'MAP\' | translate}}</a></li><li><a data-ui-sref="app.territory.quickview" data-tooltip="Alueiden pikatarkastelu"><span class="fa fa-eye"></span> {{\'QUICK_VIEW\' | translate}}</a></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/error/partials/error.html',
    '<h3>Hups! Havaittiin moka.</h3><p>Aluesovelluksen rattaat ovat menneet solmuun, pahoittelut. Jos ongelma toistuu, ota yhteyttä ylläpitäjiin.</p><p data-ng-show="error.fromState.name"><a href="#" data-ng-click="goToPrevious()">Palaa siihen mitä olit tekemässä</a></p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/layout/partials/files.html',
    '<div><h4>Files used in this example</h4><p>Below you can see all the actual <em>backend / frontend</em> files which are used to make this example page work.</p><div class="row"><div class="col-xs-3" data-ng-repeat="(title, items) in filesJson"><h5 data-ng-bind-html="title"></h5><ul class="list-unstyled"><li data-ng-repeat="item in items"><a href="{{item.url}}" target="_blank" data-tooltip-html-unsafe="{{getTooltip(item)}}" data-tooltip-placement="left" data-ng-bind-html="item.title"></a></li></ul></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/layout/partials/footer.html',
    '<footer class="no-print mobile-hide"><div class="navbar navbar-default navbar-fixed-bottom"><div class="container"><ul class="nav navbar-nav"><li><a href="https://github.com/slmnn/tman2" target="_blank"><i class="fa fa-github"></i>GitHub</a></li><li><a href="https://github.com/slmnn/tman2/issues" target="_blank"><i class="fa fa-bug"></i>Raportoi ongelma</a></li><li><a href="http://tman2.slack.com" target="_blank"><i class="fa fa-slack"></i>Slack</a></li></ul></div></div></footer>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/layout/partials/header.html',
    '<header><div class="navbar navbar-default navbar-fixed-top no-print"><div class="container"><div class="navbar-header"><button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button></div><div class="collapse navbar-collapse" id="navbar-main"><ul class="nav navbar-nav navbar-right"><li data-ui-sref-active="active" data-ng-show="auth.isAuthenticated()"><a href="#" data-ui-sref="profile.edit({id: user().id})"><span class="fa fa-user"></span> {{user().username}}</a></li><li data-ui-sref-active="active" data-ng-show="!auth.isAuthenticated()"><a href="#" data-ui-sref="auth.login"><span class="fa fa-sign-in"></span> Kirjaudu sisään</a></li><li data-ng-show="auth.isAuthenticated()"><a href="#" data-ng-click="logout()"><span class="fa fa-sign-out"></span> Kirjaudu ulos</a></li></ul><ul class="nav navbar-nav"><li class="{{item.class}}" data-ng-repeat="item in navigationItems" data-ng-show="auth.authorize(item.access)" data-ng-class="{\'not-active\': isNotActive(item), \'active\': isActive(item)}" data-ui-sref-active="active"><a href="#" data-ui-sref="{{item.state}}"><span data-ng-if="item.icon" class="fa {{item.icon}}"></span> {{item.title}}</a></li></ul></div></div></div></header>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/layout/partials/help.html',
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" data-ng-click="dismiss()"><span aria-hidden="true">&times;</span> <span class="sr-only">Sulje</span></button><h3 class="modal-title">{{title}}</h3></div><div class="modal-body modal-help"><div data-ng-include="template"></div></div><div class="modal-footer"><button class="btn btn-primary btn-sm" data-ng-click="dismiss()">Sulje</button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/layout/partials/navigation.html',
    '<ul class="nav nav-tabs no-print top-buffer-sm"><li data-ng-repeat="item in navigationItems" data-ui-sref-active="active"><a data-ng-if="item.state" data-ng-show="auth.authorize(item.access)" data-ui-sref="{{item.state}}"><span data-ng-if="item.icon" class="fa {{item.icon}}"></span> {{item.title}}</a> <a style="text-decoration: line-through" data-ng-if="!item.state">{{item.title}}</a></li><li class="pull-right"><a href="#" class="help" data-ng-click="openInformation()">Sivun ohje <i class="fa fa-info-circle"></i></a></li></ul>');
}]);
})();

/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.admin.login-history')
    .controller('LoginHistoryController', [
      '$scope', '$timeout', '$q', '$filter',
      '_',
      'ListConfig',
      'SocketHelperService',
      'LoginHistoryModel',
      '_items', '_count', '_statsBrowser', '_statsOS', '_statsUser',
      function controller(
        $scope, $timeout, $q, $filter,
        _,
        ListConfig,
        SocketHelperService,
        LoginHistoryModel,
        _items, _count, _statsBrowser, _statsOS, _statsUser
      ) {
        // Set current scope reference to models
        LoginHistoryModel.setScope($scope, false, 'items', 'itemCount');

        // Store statistics
        $scope.statsBrowser = _statsBrowser;
        $scope.statsOS = _statsOS;
        $scope.statsUser = _statsUser;

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(LoginHistoryModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'createdAt',
          direction: false
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        // Define default chart configuration for each statistics chart
        var chartConfig = {
          options: {
            chart: {
              type: 'pie'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: false
                },
                showInLegend: true
              }
            },
            exporting: {
              enabled: false
            },
            tooltip: {
              formatter: function formatter() {
                return '<strong>' + this.key + '</strong><br />' +
                  'Percentage: ' + $filter('number')(this.point.percentage, 2) + '%<br />' +
                  'Total: ' + $filter('number')(this.y)
                ;
              },
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            }
          },
          title: {
            text: ''
          },
          series: [{
            type: 'pie',
            name: '',
            data: []
          }]
        };

        var charts = [
          {
            scope: 'chartBrowser',
            data: 'statsBrowser',
            title: 'Browsers'
          },
          {
            scope: 'chartOs',
            data: 'statsOS',
            title: 'Operating systems'
          },
          {
            scope: 'chartUser',
            data: 'statsUser',
            title: 'Users'
          }
        ];

        _.forEach(charts, function iterator(config) {
          $scope[config.scope] = angular.copy(chartConfig);

          $scope[config.scope].series[0].data = $scope[config.data];
          $scope[config.scope].title.text = config.title;
        });

        // Function to change sort column / direction on list
        $scope.changeSort = function changeSort(item) {
          var sort = $scope.sort;

          if (sort.column === item.column) {
            sort.direction = !sort.direction;
          } else {
            sort.column = item.column;
            sort.direction = true;
          }

          _triggerFetchData();
        };

        // Watcher for items, this is needed to update charts
        $scope.$watch('items', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            var actions = [
              {
                action: 'Browser',
                scope: 'chartBrowser'
              },
              {
                action: 'OS',
                scope: 'chartOs'
              },
              {
                action: 'User',
                scope: 'chartUser'
              }
            ];

            // Create necessary promises to update chart data
            var promises = _.map(actions, function iterator(config) {
              LoginHistoryModel
                .statistics(config.action)
                .then(
                  function onSuccess(data) {
                    $scope[config.scope].series[0].data = data;
                  }
                )
              ;
            });

            // Execute all promises
            $q.all(promises);
          }
        });

        // Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        // Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _triggerFetchData();
          }
        });

        var searchWordTimer;

        /**
         * Watcher for 'filter' scope variable, which contains multiple values that we're interested
         * within actual GUI. This will trigger new data fetch query to server if following conditions
         * have been met:
         *
         *  1) Actual filter variable is different than old one
         *  2) Search word have not been changed in 400ms
         *
         * If those are ok, then watcher will call 'fetchData' function.
         */
        $scope.$watch('filters', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            if (searchWordTimer) {
              $timeout.cancel(searchWordTimer);
            }

            searchWordTimer = $timeout(_triggerFetchData, 400);
          }
        }, true);

        /**
         * Helper function to trigger actual data fetch from backend. This will just check current page
         * scope variable and if it is 1 call 'fetchData' function right away. Any other case just set
         * 'currentPage' scope variable to 1, which will trigger watcher to fetch data.
         *
         * @private
         */
        function _triggerFetchData() {
          if ($scope.currentPage === 1) {
            _fetchData();
          } else {
            $scope.currentPage = 1;
          }
        }

        /**
         * Helper function to fetch actual data for GUI from backend server with current parameters:
         *  1) Current page
         *  2) Search word
         *  3) Sort order
         *  4) Items per page
         *
         * Actually this function is doing two request to backend:
         *  1) Data count by given filter parameters
         *  2) Actual data fetch for current page with filter parameters
         *
         * These are fetched via 'LoginHistoryModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters),
            populate: 'user'
          };

          // Data query specified parameters
          var parameters = {
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = LoginHistoryModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = LoginHistoryModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // Load all needed data
          $q
            .all([count, load])
            .finally(
              function onFinally() {
                $scope.loaded = true;
                $scope.loading = false;
              }
            )
          ;
        };

        _triggerFetchData();
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function () {
  'use strict';

  /**
   * Model for Book API, this is used to wrap all Book objects specified actions and data change actions.
   */
  angular.module('frontend.admin.login-history')
    .factory('LoginHistoryModel', [
      '$log',
      'DataModel', 'DataService',
      function factory(
        $log,
        DataModel, DataService
      ) {
        var model = new DataModel('userlogin');

        model.statistics = function statistics(type) {
          var self = this;

          return DataService
            .collection(self.endpoint + '/statistics/', {type: type})
            .then(
              function onSuccess(response) {
                return response.data;
              },
              function onError(error) {
                $log.error('LoginHistoryModel.statistics() failed.', error, self.endpoint, type);
              }
            )
          ;
        };

        return model;
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.migrate' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.admin.migrate')
    .controller('MigrateController', [
      '_',
      '$scope', '$state', 
      'UserModel', 
      'TerritoryModel',
      'HolderModel',
      'CoordinateModel',
      'TerritoryHolderHistoryModel',
      '_app',
      'MessageService',
      function controller(
        _,
        $scope, $state,
        UserModel, 
        TerritoryModel,
        HolderModel,
        CoordinateModel,
        TerritoryHolderHistoryModel,
        _app,
        MessageService
      ) {
        var app = _app[0];

        var _newTerritories;
        var _newHolders;

        var _newHolderIds = [];
        var _newTerritoryIds = [];
        var _newCoordinateIds = [];
        var _newHolderHistories = [];

        $scope.rollback = function rollback() {
          _.each(_newTerritoryIds, function(id) {
            TerritoryModel.delete(id);
          });
          _.each(_newHolderIds, function(id) {
            HolderModel.delete(id);
          });
          _.each(_newCoordinateIds, function(id) {
            CoordinateModel.delete(id);
          });
          _.each(_newHolderHistories, function(id) {
            TerritoryHolderHistoryModel.delete(id);
          });
        };

        $scope.parseMigrationHolders = function parseMigrationHolders(migration) {
          _newHolders = JSON.parse(migration.holders);

          _.each(_newHolders, function(h) {
            HolderModel.create(
              {
                name: h.name,
                email: h.email,
                emailValid: h.emailValid,
                isArchived: false,
              }
            )            
            .then(
              function onSuccess(result) {
                h.new_id = result.data.id;
                _newHolderIds.push(result.data.id);
              }
            );
          });
        };

        $scope.parseMigrationTerritories = function parseMigrationTerritories(migration) {
          _newTerritories = JSON.parse(migration.territories);

          _.each(_newTerritories, function(t) {

            var holder = _newHolders.filter(function(i) { return i.id == t.holder; })[0];
            var holderId = (holder && holder.new_id) ? holder.new_id : app.defaultHolder;

            CoordinateModel.create({
              latitude: t.lat,
              longitude: t.lng,
              type: 'center'
            }).then(
              function onSuccess(result) {
                var new_coordinateId = result.data.id;
                _newCoordinateIds.push(result.data.id);

                TerritoryModel.create(
                  {
                    territoryCode: t.territoryCode,
                    lastCoveredTime: t.lastCoveredTime,
                    notificationEmailDate: t.notificationEmailDate,
                    taken: t.reallyTaken,
                    covered: t.taken,
                    description: t.description,
                    holder: holderId,
                    center: new_coordinateId,
                    archived: false,
                    type: t.type == 'Normal' ? 'Tavallinen' : null,
                    notCountedWhenCalculatingCoveredDuringLastYearTotal: t.type == 'Normal' ? false : true
                  }
                )
                .then(
                  function onSuccess(result) {
                    t.new_id = result.data.id;
                    _newTerritoryIds.push(result.data.id);

                    if(holderId != app.defaultHolder) {
                      
                      TerritoryHolderHistoryModel.create({
                        holder: holderId,
                        territory: t.new_id,
                        startDate: t.reallyTaken
                      }).then(
                        function onSuccess(result) {
                          _newHolderHistories.push(result.data.id);
                        }
                      );                      
                    }
                  }
                );
              }
            );
          });
        };
      }
    ])
  ;

}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.user' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.admin.request-log')
    .controller('RequestLogController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig',
      'SocketHelperService',
      'MessageService',
      'RequestLogModel',
      'UserService',
      '_items', '_count',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig,
        SocketHelperService,
        MessageService,
        RequestLogModel,
        UserService,
        _items, _count
      ) {
        // Set current scope reference to models
        RequestLogModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.user = UserService.user();
        $scope.itemCount = _count.count;

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(RequestLogModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'createdAt',
          direction: false
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        // Function to change sort column / direction on list
        $scope.changeSort = function changeSort(item) {
          var sort = $scope.sort;

          if (sort.column === item.column) {
            sort.direction = !sort.direction;
          } else {
            sort.column = item.column;
            sort.direction = true;
          }

          _triggerFetchData();
        };

        // Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        // Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _triggerFetchData();
          }
        });

        var searchWordTimer;

        /**
         * Watcher for 'filter' scope variable, which contains multiple values that we're interested
         * within actual GUI. This will trigger new data fetch query to server if following conditions
         * have been met:
         *
         *  1) Actual filter variable is different than old one
         *  2) Search word have not been changed in 400ms
         *
         * If those are ok, then watcher will call 'fetchData' function.
         */
        $scope.$watch('filters', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            if (searchWordTimer) {
              $timeout.cancel(searchWordTimer);
            }

            searchWordTimer = $timeout(_triggerFetchData, 400);
          }
        }, true);

        /**
         * Helper function to trigger actual data fetch from backend. This will just check current page
         * scope variable and if it is 1 call 'fetchData' function right away. Any other case just set
         * 'currentPage' scope variable to 1, which will trigger watcher to fetch data.
         *
         * @private
         */
        function _triggerFetchData() {
          if ($scope.currentPage === 1) {
            _fetchData();
          } else {
            $scope.currentPage = 1;
          }
        }

        /**
         * Helper function to fetch actual data for GUI from backend server with current parameters:
         *  1) Current page
         *  2) Search word
         *  3) Sort order
         *  4) Items per page
         *
         * Actually this function is doing two request to backend:
         *  1) Data count by given filter parameters
         *  2) Actual data fetch for current page with filter parameters
         *
         * These are fetched via 'UserModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters),
            populate: 'user'
          };

          // Data query specified parameters
          var parameters = {
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          console.log(parameters);

          // Fetch actual data
          var load = RequestLogModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // Fetch data count
          var count = RequestLogModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Load all needed data
          $q
            .all([count, load])
            .finally(
              function onFinally() {
                $scope.loaded = true;
                $scope.loading = false;
              }
            )
          ;
        }

        _triggerFetchData();
      }
    ])
  ;
}());

(function () {
  'use strict';

  /**
   * Model for Book API, this is used to wrap all Book objects specified actions and data change actions.
   */
  angular.module('frontend.admin.request-log')
    .factory('RequestLogModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('requestLog');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.user' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.admin.user')
    .controller('UserAddController', [
      '$scope', '$state', 
      'UserModel', 
      '_app', '_holders',
      'MessageService',
      function controller(
        $scope, $state,
        UserModel, 
        _app, _holders,
        MessageService
      ) {

        // Set current scope reference to model
        UserModel.setScope($scope, 'user');

        $scope.app = _app[0];
        $scope.holders = _holders;

        // Initialize territory model
        var initModel = function() {
          $scope.user = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            archived: false,
            admin: false
          };
        };
        initModel();

        /**
         * Scope function to store new user to database. After successfully save user will be redirected
         * to view users list.
         */
        $scope.addUser = function addUser() {
          var data = angular.copy($scope.user);
          if($scope.selectedHolderId) {
            data.holder = $scope.selectedHolderId;
          }
          UserModel
            .create(data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Uusi käyttäjä lisättiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }

                $state.go('admin.user', {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single user on GUI.
  angular.module('frontend.admin.user')
    .controller('UserController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'UserModel',
      '_user', '_holders', '_app',
      function controller(
        $scope, $state,
        UserService, MessageService,
        UserModel, _user, _holders, _app
      ) {

        // Initialize scope data
        $scope.currentUser = UserService.user();
        $scope.user = _user;
        $scope.holders = _holders;

        /**
         * Scope function to save the modified holder. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveUser = function saveUser() {
          var data = angular.copy($scope.user);
          if(data.holder != null && data.holder.id !== _app[0].defaultHolder.id) {
            data.holder = data.holder.id;
          } 
          else if(data.holder != null && data.holder.id === _app[0].defaultHolder.id) {
            data.holder = null;
          }
          else {
            data.holder = null;
          }

          // Make actual data update
          UserModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Käyttäjän "' + $scope.user.username + '" tiedot päivitettiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
                $state.go($state.current, {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;

  angular.module('frontend.admin.user')
    .controller('UsersController', [
      '$scope', '$timeout', '$q', '$filter',
      '_',
      'ListConfig',
      'SocketHelperService',
      'MessageService',
      'UserService',
      'UserModel',
      '_items', '_count',
      function controller(
        $scope, $timeout, $q, $filter,
        _,
        ListConfig,
        SocketHelperService,
        MessageService,
        UserService,
        UserModel,
        _items, _count
      ) {
        // Set current scope reference to models
        UserModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(UserModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'createdAt',
          direction: false
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        // Function to change sort column / direction on list
        $scope.changeSort = function changeSort(item) {
          var sort = $scope.sort;

          if (sort.column === item.column) {
            sort.direction = !sort.direction;
          } else {
            sort.column = item.column;
            sort.direction = true;
          }

          _triggerFetchData();
        };

        // Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        // Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _triggerFetchData();
          }
        });

        var searchWordTimer;

        /**
         * Watcher for 'filter' scope variable, which contains multiple values that we're interested
         * within actual GUI. This will trigger new data fetch query to server if following conditions
         * have been met:
         *
         *  1) Actual filter variable is different than old one
         *  2) Search word have not been changed in 400ms
         *
         * If those are ok, then watcher will call 'fetchData' function.
         */
        $scope.$watch('filters', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            if (searchWordTimer) {
              $timeout.cancel(searchWordTimer);
            }

            searchWordTimer = $timeout(_triggerFetchData, 400);
          }
        }, true);

        /**
         * Helper function to trigger actual data fetch from backend. This will just check current page
         * scope variable and if it is 1 call 'fetchData' function right away. Any other case just set
         * 'currentPage' scope variable to 1, which will trigger watcher to fetch data.
         *
         * @private
         */
        function _triggerFetchData() {
          if ($scope.currentPage === 1) {
            _fetchData();
          } else {
            $scope.currentPage = 1;
          }
        }

        /**
         * Helper function to fetch actual data for GUI from backend server with current parameters:
         *  1) Current page
         *  2) Search word
         *  3) Sort order
         *  4) Items per page
         *
         * Actually this function is doing two request to backend:
         *  1) Data count by given filter parameters
         *  2) Actual data fetch for current page with filter parameters
         *
         * These are fetched via 'UserModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters),
            populate: 'user'
          };

          // Data query specified parameters
          var parameters = {
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = UserModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = UserModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // Load all needed data
          $q
            .all([count, load])
            .finally(
              function onFinally() {
                $scope.loaded = true;
                $scope.loading = false;
              }
            )
          ;
        }

        _triggerFetchData();
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.admin.user' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function () {
  'use strict';

  /**
   * Model for Book API, this is used to wrap all Book objects specified actions and data change actions.
   */
  angular.module('frontend.admin.user')
    .factory('UserModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('user');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.app' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller to show single app on GUI.
  angular.module('frontend.app.app')
    .controller('AppController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'AppModel',
      '_app',
      '_holders',
      function controller(
        $scope, $state,
        UserService, MessageService,
        AppModel,
        _app,
        _holders
      ) {

        // Set current scope reference to model
        AppModel.setScope($scope, 'app');

        // Initialize scope data
        $scope.user = UserService.user();
        $scope.app = _app[0];
        $scope.holders = _holders;
        $scope.mapTypes = ["hybrid", "satellite", "roadmap", "terrain"];

        // If app is undefined, create one and reload.
        if(_app.length === 0) {
          AppModel
          .create(
            {
              lastBackup : new Date(),
              backupInterval : 7,
              backupEmail : 'example.email.address@example.com',
              lastStats : new Date(),
              notCoveredLimit : 365,
              notCoveredWarningEmailLimit : 100,  
              holderNotChangedWarningLimit : 200,
              holderChangePreventedIfLimitExeeded : false,
              holderChangeToDefaultIfLimitExeeded : false,
              printMapType: "hybrid",
              printMapLineColor: "0x00FF0066",
              printMapAreaFillColor: "0x00FF0022",
              printMapScale: 1
            }
          )
          .then(
            function onSuccess(value) {
              if(value.status == 201) {
                MessageService.success('Sovellusasetukset tallennettiin.');
              } else {
                MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
              }
              $state.go($state.current, {}, {reload: true});
            }
          );
        }

        /**
         * Scope function to save the modified app. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveApp = function saveApp() {
          var data = angular.copy($scope.app);

          data.defaultHolder = {
            id: data.defaultHolder.id
          };

          // Make actual data update
          AppModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
              if(value.status == 200) {
                MessageService.success('Sovellusasetukset päivitettiin.');
              } else {
                MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
              }
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.app.app
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  /**
   * Model for Territory API, this is used to wrap all Territory objects specified actions and data change actions.
   */
  angular.module('frontend.app.app')
    .service('AppModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('app');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.app.attribute
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  /**
   * Model for Territory API, this is used to wrap all Territory objects specified actions and data change actions.
   */
  angular.module('frontend.app.attribute')
    .service('AttributeModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('attribute');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.attribute' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller to show single attribute on GUI.
  angular.module('frontend.app.attribute')
    .controller('AttributesController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'AttributeModel',
      '_attributes',
      function controller(
        $scope, $state,
        UserService, MessageService,
        AttributeModel,
        _attributes
      ) {

        // Set current scope reference to model
        AttributeModel.setScope($scope, 'attribute');

        // Initialize scope data
        $scope.user = UserService.user();
        $scope.attributes = _attributes;

        /**
         * Scope function to delete an attribute. This will send a
         * socket request to the backend server with the new object.
         */
        $scope.deleteAttribute = function deleteAttribute(attribute) {

          // Make actual data update
          AttributeModel
            .delete(attribute.id)
            .then(
              function onSuccess() {
                MessageService.success('Attribuutti poistettiin.');
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };

        /**
         * Scope function to create an attribute. This will send a
         * socket request to the backend server with the new object.
         */
        $scope.createAttribute = function createAttribute(attribute) {
          var data = angular.copy(attribute);

          // Make actual data update
          AttributeModel
            .create(data)
            .then(
              function onSuccess(value) {
                if(value.status == 201) {
                  MessageService.success('Uusi attribuutti luotiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };

        /**
         * Scope function to save the modified attribute. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.updateAttribute = function updateAttribute(attribute) {
          var data = angular.copy(attribute);

          // Make actual data update
          AttributeModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Attribuutti päivitettiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.chat' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  /**
   * Main Chat controller which handles the actions on this Chat example page. This controller is fired up whenever
   * user enters to following url:
   *
   *  http://{YourServer}:{YourPort}/chat
   *
   * where
   *  YourServer  =   Usually 'localhost', this depends on your setup.
   *  YourPort    =   By default 3000 for production and 3001 for development or something else depending on your
   *                  setup.
   *
   * Controller handles message loading and creating of new messages to backend side. Basically really simple stuff.
   *
   * @todo
   *  1) implement 'enter' and 'leave' status messages to chat
   *  2) private messages to another user
   *  3) do not load all messages when user enters to chat
   *  4) add notification about new chat messages, if user is elsewhere on app
   */
  angular.module('frontend.app.chat')
    .controller('ChatController', [
      '$scope', '$timeout', '$localStorage',
      'moment',
      'MessageService',
      'MessageModel',
      '_messages',
      function controller(
        $scope, $timeout, $localStorage,
        moment,
        MessageService,
        MessageModel,
        _messages
      ) {
        // Add loaded messages to scope
        $scope.messages = _messages;

        // Get current nick of user
        $scope.nick = ($localStorage.chat && $localStorage.chat.nick) ? $localStorage.chat.nick : '';

        // Initialize message object
        $scope.message = {
          nick: $scope.nick,
          message: ''
        };

        // We have nick set, so load messages
        if ($scope.nick && $scope.nick.trim()) {
          _scrollBottom();
        }

        // Watcher for actual messages, whenever this is changed we need to scroll chat to bottom
        $scope.$watch('messages', function watcher(valueNew) {
          if (valueNew) {
            _scrollBottom();
          }
        }, true);

        // Enter to chat function
        $scope.enterToChat = function enterToChat() {
          if ($scope.nick && $scope.nick.trim() !== '') {
            $scope.message.nick = $scope.nick;

            $localStorage.chat = {
              nick: $scope.nick,
              time: moment().format()
            };

            _scrollBottom();
          } else {
            MessageService.error('Please provide some nick.');
          }
        };

        // Function to leave chat
        $scope.leaveChat = function leaveChat() {
          $scope.message.nick = '';
          $scope.nick = '';
          $scope.messages = [];

          $localStorage.chat = {};
        };

        // Function to post a new message to server
        $scope.postMessage = function postMessage() {
          if ($scope.message.message.trim() !== '') {
            MessageModel
              .create($scope.message)
              .then(
                function success() {
                  $scope.message.message = '';

                  _scrollBottom();
                }
              )
            ;
          } else {
            MessageService.error('Please enter some text to chat.');
          }
        };

        /**
         * Helper function to scroll to bottom of the chat
         *
         * @private
         */
        function _scrollBottom() {
          $timeout(function timeout() {
            document.getElementById('messages').scrollTop = $scope.messages.length * 50;
          });
        }
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular directive definitions for 'frontend.app.chat' module.
 *
 * Note that this file should only contain directives and nothing else.
 */
(function() {
  'use strict';

  /**
   * Directive to resize "chat" screen to take all "possible" space on browser screen. This is just cruel thing to
   * do, but it works like a charm.
   */
  angular.module('frontend.app.chat')
    .directive('chatScreen', [
      '$timeout', '$window',
      function directive($timeout, $window) {
        return {
          restrict: 'C',
          link: function link(scope, element) {
            var resize = function resize() {
              var totalHeight = angular.element($window).height() - 170;

              angular.element(element).css('height', totalHeight + 'px');
            };

            angular.element($window).bind('resize', function onEvent() {
              resize();
            });

            resize();
          }
        };
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.app.chat' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  /**
   * Model for Message API, this is used to wrap all Message objects specified actions and data change actions.
   */
  angular.module('frontend.app.chat')
    .factory('MessageModel', [
      'DataModel',
      function factory(DataModel) {
        var model = new DataModel('message');

        // Custom handler for created objects
        model.handlerCreated = function handlerCreated(message){
          this.objects.push(message.data);
        };

        return model;
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.holder' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new holder creation.
  angular.module('frontend.app.holder')
    .controller('HolderAddController', [
      '$scope', '$state',
      'MessageService',
      'HolderModel',
      function controller(
        $scope, $state,
        MessageService,
        HolderModel
      ) {

        // Initialize holder model
        var initScope = function() {
          $scope.holder = {
            name: '',
            email: '',
            emailValid: true,
            isArchived: false,
            territories: []
          };
        };
        initScope();

        /**
         * Scope function to store new holder to database. After successfully save user will be redirected
         * to view that new created holder.
         */
        $scope.addHolder = function addHolder() {
          var data = angular.copy($scope.holder)
          HolderModel
            .create(data)
            .then(
              function onSuccess(value) {
                if(value.status == 201) {
                  MessageService.success('Uusi alueomistaja luotiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
                initScope();
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single holder on GUI.
  angular.module('frontend.app.holder')
    .controller('HolderController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'TerritoryHelper',
      'HolderModel', 'TerritoryModel',
      '_holder', '_app',
      function controller(
        $scope, $state,
        UserService, MessageService,
        TerritoryHelper,
        HolderModel, TerritoryModel,
        _holder, _app
      ) {
        // Set current scope reference to model
        HolderModel.setScope($scope, 'holder');

        _holder.territories = _.sortBy(_holder.territories, function(i) {
            if(!i.territoryCode) {
                return 0;
            }
            return i.territoryCode;
        });

        // Initialize scope data
        $scope.user = UserService.user();
        $scope.holder = _holder;
        $scope.app = _app[0];
        $scope.territories = [];

        $scope.isNotCoveredLimitExeeded = function(territory, app) {
          return TerritoryHelper.isNotCoveredRecently(territory, app);
        };

        $scope.isHolderNotChangedLimitExeeded = function(territory, app) {
          return TerritoryHelper.isHolderNotChangedLimitExeeded(territory, app);
        };

        // Holder delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Poista',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteHolder();
            }
          },
          cancel: {
            label: 'Peruuta',
            className: 'btn-default pull-left'
          }
        };

        /**
         * Scope function to save the modified holder. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveHolder = function saveHolder() {
          var data = angular.copy($scope.holder);
          data.isArchived = data.isArchived || false;
          data.emailValid = data.emailValid || true;

          // Remove populate data that should not be changed to prevent errors.
          delete data.territories;

          // Make actual data update
          HolderModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Alueomistajan "' + $scope.holder.name + '" tiedot päivitettiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
              }
            )
          ;
        };

        /**
         * Scope function to delete current holder. This will send DELETE query to backend via web socket
         * query and after successfully delete redirect user back to holder list.
         */
        $scope.deleteHolder = function deleteHolder() {
          HolderModel
            .delete($scope.holder.id)
            .then(
              function onSuccess() {
                MessageService.success('Alueomistaja "' + $scope.holder.name + '" poistettiin.');

                $state.go('app.holder');
              }
            )
          ;
        };

        /**
         * Scope function to fetch territory data when needed, this is triggered whenever user starts to edit
         * current holder.
         *
         * @returns {null|promise}
         */
        $scope.loadTerritorys = function loadTerritorys() {
          if ($scope.territorys.length) {
            return null;
          } else {
            return TerritoryModel
              .load()
              .then(
                function onSuccess(data) {
                  $scope.territorys = data;
                }
              )
            ;
          }
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for holder list GUI on boilerplate application.
  angular.module('frontend.app.holder')
    .controller('HolderListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig', 'SocketHelperService',
      'UserService', 'HolderModel', 'TerritoryModel',
      '_items', '_count',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig, SocketHelperService,
        UserService, HolderModel, TerritoryModel,
        _items, _count
      ) {
        // Set current scope reference to models
        HolderModel.setScope($scope, false, 'items', 'itemCount');
        TerritoryModel.setScope($scope, false, 'territories');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(HolderModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'name',
          direction: true
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        // Function to change sort column / direction on list
        $scope.changeSort = function changeSort(item) {
          var sort = $scope.sort;

          if (sort.column === item.column) {
            sort.direction = !sort.direction;
          } else {
            sort.column = item.column;
            sort.direction = true;
          }

          _triggerFetchData();
        };

        /**
         * Helper function to fetch specified territory property.
         *
         * @param   {Number}    territoryId     Territory id to search
         * @param   {String}    [property]      Property to return, if not given returns whole territory object
         * @param   {String}    [defaultValue]  Default value if territory or property is not founded
         *
         * @returns {*}
         */
        $scope.getTerritory = function getTerritory(territoryId, property, defaultValue) {
          defaultValue = defaultValue || 'Unknown';
          property = property || true;

          // Find territory
          var territory = _.find($scope.territorys, function iterator(territory) {
            return parseInt(territory.id, 10) === parseInt(territoryId.toString(), 10);
          });

          return territory ? (property === true ? territory : territory[property]) : defaultValue;
        };

        /**
         * Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch holder data
         * from server.
         */
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        /**
         * Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch holder data
         * from server.
         */
        $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _triggerFetchData();
          }
        });

        var searchWordTimer;

        /**
         * Watcher for 'filter' scope variable, which contains multiple values that we're interested
         * within actual GUI. This will trigger new data fetch query to server if following conditions
         * have been met:
         *
         *  1) Actual filter variable is different than old one
         *  2) Search word have not been changed in 400ms
         *
         * If those are ok, then watcher will call 'fetchData' function.
         */
        $scope.$watch('filters', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            if (searchWordTimer) {
              $timeout.cancel(searchWordTimer);
            }

            searchWordTimer = $timeout(_triggerFetchData, 400);
          }
        }, true);

        /**
         * Helper function to trigger actual data fetch from backend. This will just check current page
         * scope variable and if it is 1 call 'fetchData' function right away. Any other case just set
         * 'currentPage' scope variable to 1, which will trigger watcher to fetch data.
         *
         * @private
         */
        function _triggerFetchData() {
          if ($scope.currentPage === 1) {
            _fetchData();
          } else {
            $scope.currentPage = 1;
          }
        }

        /**
         * Helper function to fetch actual data for GUI from backend server with current parameters:
         *  1) Current page
         *  2) Search word
         *  3) Sort order
         *  4) Items per page
         *
         * Actually this function is doing two request to backend:
         *  1) Data count by given filter parameters
         *  2) Actual data fetch for current page with filter parameters
         *
         * These are fetched via 'HolderModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters)
          };

          // Data query specified parameters
          var parameters = {
            populate: 'territories',
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = HolderModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = HolderModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // Load all needed data
          $q
            .all([count, load])
            .finally(
              function onFinally() {
                $scope.loaded = true;
                $scope.loading = false;
              }
            )
          ;
        }

        _triggerFetchData();
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.app.holder' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function () {
  'use strict';

  /**
   * Model for Holder API, this is used to wrap all Holder objects specified actions and data change actions.
   */
  angular.module('frontend.app.holder')
    .factory('HolderModel', [
      'DataModel',
      function factory(DataModel) {
        return new DataModel('holder');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.messages' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  /**
   * Message controller that demonstrates boilerplate error handling and usage of MessageService.
   *
   * @todo
   *  1) Make example about $http / $sailsSocket usage where automatic message is disabled.
   *  2) Make example about invalid JWT
   */
  angular.module('frontend.app.messages')
    .controller('MessagesController', [
      '$scope', '$http', '$sailsSocket',
      'MessageService', 'BackendConfig',
      function(
        $scope, $http, $sailsSocket,
        MessageService, BackendConfig
      ) {
        // Initialize used scope variables
        $scope.title = '';
        $scope.message = '';
        $scope.type = 'info';
        $scope.messageTypes = [
          'info', 'success', 'warning', 'error'
        ];

        // Specify invalid urls
        var urls = [
          BackendConfig.url + '/Basdfasdf',
          BackendConfig.url + '/Book/123123123'
        ];

        // Scope function to show specified message
        $scope.showMessage = function showMessage() {
          MessageService[$scope.type]($scope.message, $scope.title);
        };

        // Function to make invalid HTTP request
        $scope.makeInvalidHttpRequest = function makeInvalidHttpRequest(type) {
          $http.get(urls[type]);
        };

        // Function to make invalid socket request
        $scope.makeInvalidSailsSocketRequest = function makeInvalidSailsSocketRequest(type) {
          $sailsSocket.get(urls[type]);
        };
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.app.territoryHolderHistory
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  /**
   * Model for Territory API, this is used to wrap all Territory objects specified actions and data change actions.
   */
  angular.module('frontend.app.territoryHolderHistory')
    .service('TerritoryHolderHistoryModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('territoryHolderHistory');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.territory
' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new territory creation.
  angular.module('frontend.app.territory')
    .controller('TerritoryAddController', [
      '$scope', '$state', '$modalInstance',
      'HolderModel', 
      'CoordinateModel',
      '_holders',
      '_app',
      'MessageService', 'TerritoryModel',
      function controller(
        $scope, $state, $modalInstance,
        HolderModel, 
        CoordinateModel,
        _holders,
        _app,
        MessageService, TerritoryModel
      ) {
        $scope.holders = _holders;
        $scope.app = _app[0];

        // Initialize territory model
        var initModel = function() {
          $scope.territory = {
            name: '',
            description: '',
            type: '',
            covered: new Date(),
            taken: new Date()
          };
          $scope.selectedHolder = $scope.app.defaultHolder;
        };
        initModel();

        // Dismiss function for modal
        $scope.dismiss = function dismiss() {
          $modalInstance.dismiss();
        };

        $scope.datePickerOpened = function datePickerOpened($event) {
          if ($event) {
              $event.preventDefault();
              $event.stopPropagation(); // This is the magic
          }
        };

        /**
         * Scope function to store new territory to database. After successfully save user will be redirected
         * to view that new created territory.
         */
        $scope.addTerritory = function addTerritory() {
          var data = angular.copy($scope.territory);
          if($scope.selectedHolder) {
            data.holder = {id: $scope.selectedHolder};
          } else {
            data.holder = $scope.app.defaultHolder;
          }
          TerritoryModel
            .create(data)
            .then(
              function onSuccess(value) {
                if(value.status == 201) {
                  MessageService.success('Uusi alue luotiin.');
                  CoordinateModel
                  .create({
                    type:'center',
                    latitude: $scope.map.territoryCenterMarker.coords.latitude,
                    longitude: $scope.map.territoryCenterMarker.coords.longitude
                  })
                  .then(
                    function onSuccess(response) {
                      TerritoryModel
                      .update(value.data.id, { center : response.data.id })
                      .then(
                        function onSuccess() {
                          MessageService.success('Alueen "' + value.data.territoryCode + '" keskikohta asetettiin.');
                        }
                      );
                    }
                  );

                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
                $state.go($state.current, {reload: true});
                initModel();
              }
            )
          ;
        };

        // Describe the map.
        $scope.map = { 
          center: { latitude: $scope.app.defaultLatitude || 61, longitude: $scope.app.defaultLongitude || 23},
          zoom: 13, 
          territoryCenterMarker : { 
            id: 0,
            options: {
              draggable: true
            },
            coords: { latitude: $scope.app.defaultLatitude || 61, longitude: $scope.app.defaultLongitude || 23},
            events: {
              dragend: function () {
                $scope.map.territoryCenterMarker.options = {
                  draggable: true,
                  labelContent: 'lat: ' + $scope.map.territoryCenterMarker.coords.latitude + ' ' + 'lon: ' + $scope.map.territoryCenterMarker.coords.longitude,
                  labelAnchor: '100 0',
                  labelClass: 'marker-labels'
                };
              }
            }
          }
        };
      }
    ])
  ;

  // Controller to show single territory on GUI.
  angular.module('frontend.app.territory')
    .controller('TerritoryController', [
      '$scope', '$state', '_', '$timeout',
      'UserService', 'MessageService',
      'TerritoryModel', 'HolderModel', 'SpecialAddressModel',
      '_territory', '_holders', '_app', '_attributes',
      'TerritoryHolderHistoryModel',
      'TerritoryLinkAttributeModel',
      'TerritoryHelper',
      'CoordinateModel', 'uiGmapGoogleMapApi',
      function controller(
        $scope, $state, _, $timeout,
        UserService, MessageService,
        TerritoryModel, HolderModel, SpecialAddressModel,
        _territory, _holders, _app, _attributes,
        TerritoryHolderHistoryModel,
        TerritoryLinkAttributeModel,
        TerritoryHelper,
        CoordinateModel, uiGmapGoogleMapApi
      ) {
        // Set current scope reference to models
        TerritoryModel.setScope($scope, 'territory');
        HolderModel.setScope($scope, false, 'holders', 'holdersCount');

        // Expose necessary data to the scope.
        $scope.user = UserService.user();
        _territory.territoryHolderHistory = _.sortBy(_territory.territoryHolderHistory, function(i) {
            if(!i.startDate) {
                return 0;
            }
            return Date.parse(i.startDate);
        });
        _attributes = _.sortBy(_attributes, function(i) {
            if(!i.name) {
                return 0;
            }
            return i.name;
        });

        $scope.territory = angular.copy(_territory);
        $scope.holders = _holders;
        $scope.attributes = _attributes;
        $scope.app = _app[0];

        $scope.pickers = {};

        $scope.pickers.thhEndDateOpened = false;
        $scope.pickers.thhStartDateOpened = false;
        $scope.pickers.coveredDateOpened = false;
        $scope.pickers.takenDateOpened = false;

        $scope.openPickers = function openPickers(key) {
          $timeout(function() {
            $scope.pickers[key] = true;
          });
        };
        
        $scope.closePickers = function closePickers(key) {
          $timeout(function() {
            $scope.pickers[key] = true;
          });
        };

        $scope.isNotCoveredLimitExeeded = function(territory, app) {
          return TerritoryHelper.isNotCoveredRecently(territory, app);
        };

        $scope.isHolderNotChangedLimitExeeded = function(territory, app) {
          return TerritoryHelper.isHolderNotChangedLimitExeeded(territory, app);
        };


        // Create Google Map settings for showing the center and border of the territory.
        // Copy the border path from territory.
        var path = [];
        var sortedCoordinates = _.sortBy(_territory.coordinates, "order")
        _.each(sortedCoordinates, function(c) {
          path.push(c);
        });

        // Describe the map.
        $scope.map = { 
          center: $scope.territory.center || { latitude: $scope.app.defaultLatitude, longitude: $scope.app.defaultLongitude},
          zoom: 16, 
          territoryCenterMarker : { 
            id: $scope.territory.center ? $scope.territory.center.id : 0,
            options: {
              draggable: false
            },
            coords: $scope.territory.center || { latitude: $scope.app.defaultLatitude, longitude: $scope.app.defaultLongitude},
            events: {
              dragend: function () {
                $scope.map.territoryCenterMarker.options = {
                  draggable: true,
                  labelContent: 'lat: ' + $scope.map.territoryCenterMarker.coords.latitude + ' ' + 'lon: ' + $scope.map.territoryCenterMarker.coords.longitude,
                  labelAnchor: '100 0',
                  labelClass: 'marker-labels'
                };
              }
            }
          },

          // Create a polygon from coordinate array attached to the territory.
          polygons: [
            {
              id: 1,
              path: path,
              stroke: {
                color: '#33CDDC',
                weight: 3
              },
              editable: true,
              draggable: false,
              geodesic: true,
              visible: true,
              fill: {
                color: '#33CCCC',
                opacity: 0.2
              },
            }
          ]
        };
        $scope.map.center.coordinates = [];

        $scope.imgSrc = "";
        if(path.length > 0) {
          var imgPath = "";
          for(var i = 0; i < path.length; i++) {
            imgPath += path[i].latitude + "," + path[i].longitude + "%7C";
          }
          imgPath += path[0].latitude + "," + path[0].longitude;

          $scope.imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:blue%7C'
            + $scope.territory.center.latitude + ',' + $scope.territory.center.longitude +
            '&maptype='+$scope.app.printMapType+
            '&path=fillcolor:'+$scope.app.printMapAreaFillColor+'%7Ccolor:'+$scope.app.printMapLineColor+'%7Cweight:5%7C'+ imgPath + 
            '&scale='+$scope.app.printMapScale +
            '&key=AIzaSyDFdn9_nl-V2VywY_VsaZJmeXImTifATRQ';
        } else {
            $scope.imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:blue%7C'
            + $scope.territory.center.latitude + ',' + $scope.territory.center.longitude +
            '&maptype='+$scope.app.printMapType+
            '&scale='+$scope.app.printMapScale+
            '&key=AIzaSyDFdn9_nl-V2VywY_VsaZJmeXImTifATRQ';
        }

        // Toggle the map status to be editable.
        $scope.editableMap = false;
        $scope.toggleMapEditable = function makeMapEditable() {
          $timeout(function() {
            $scope.editableMap = !$scope.editableMap;
            $scope.map.territoryCenterMarker.options.draggable = !$scope.map.territoryCenterMarker.options.draggable;
          });
        };

        // Replace the polyline with a new one with calculated coordinates.
        $scope.replacePolylineWithDefault = function replacePolylineWithDefault() {
          
          // Delete All
          deletePolylineCoordinates(angular.copy($scope.territory.coordinates));

          // Create simple rectangle          
          $scope.map.polygons[0].path = [];
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude + 0.0005,
            longitude: $scope.map.center.longitude + 0.0005,
            order: $scope.map.polygons[0].path.length
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude + 0.0005,
            longitude: $scope.map.center.longitude - 0.0005,
            order: $scope.map.polygons[0].path.length            
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude - 0.0005,
            longitude: $scope.map.center.longitude - 0.0005,
            order: $scope.map.polygons[0].path.length     
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude - 0.0005,
            longitude: $scope.map.center.longitude + 0.0005,
            order: $scope.map.polygons[0].path.length     
          });

          // Save to the backend.
          $scope.saveMap($scope.map);
        };

        // Delete set of coordinates with ids;
        var deletePolylineCoordinates = function deletePolylineCoordinates(polyline) {
          var promises = [];
          _.each(polyline, function(p){
            if(p.id) {
              promises.push(CoordinateModel.delete(p.id));
            }
          });
          Promise.all(promises).then(function(values) {
            MessageService.success("Alueen kartta nollattiin.");
          });
        };

        // Save the map to the backend.
        $scope.saveMap = function saveMap() {

          // Save the marker either by updating or creating a new one.
          var coords = {
            latitude: $scope.map.territoryCenterMarker.coords.latitude,
            longitude: $scope.map.territoryCenterMarker.coords.longitude,
            type: 'center',
            order: 0
          }

          var promises = [];

          if($scope.map.territoryCenterMarker && 
            $scope.map.territoryCenterMarker.id && 
            $scope.map.territoryCenterMarker.id !== 0) {
            promises.push(
              CoordinateModel
              .update($scope.map.territoryCenterMarker.id, coords)
            );
          } else {
            promises.push(
              CoordinateModel
              .create(coords)
              .then(function onSuccess(response){
                TerritoryModel
                  .update($scope.territory.id, { center : response.data.id })
                  .then(
                    function onSuccess() {
                      MessageService.success('Alueen "' + $scope.territory.territoryCode + '" keskikohta päivitettiin.');
                    }
                  )
                ;
              })
            );
          }

          // Save the polyline.
          if($scope.map.polygons[0]) {

            // Convert coordinates to backend compatible form.
            var path = [];
            var oldPathIds = [];
            _.each($scope.map.polygons[0].path, function(p, index) {
              path.push({
                type: 'border',
                territory: $scope.territory.id,
                latitude: p.latitude,
                longitude: p.longitude,
                order: index
              });
              if(p.id) {
                oldPathIds.push(p.id);
              }
            });
            _.each(oldPathIds, function(oldId){
              promises.push(
                CoordinateModel.delete(oldId)
              );
            });
            _.each(path, function(p){
              promises.push(
                CoordinateModel.create(p)
              );
            });
          }
          Promise.all(promises).then(function(values) {
            MessageService.success("Alueen kartta päivitettiin.");
            $scope.toggleMapEditable();
            $state.go($state.current, {id: _territory.id}, {reload: true});
          });
        };

        $scope.saveTerritoryHistory = function saveTerritoryHistory() {
          _.each($scope.territory.territoryHolderHistory, function(thh) {
            $scope.saveTerritoryHistoryItem(thh);
          });
          $timeout(function() {
              $state.go($state.current, {id: _territory.id}, {reload: true});
          }, 2000);
        };

        $scope.onlyActiveHolders = function onlyActiveHolders(holder) {
          return holder.isArchived ? false : true;
        };

        $scope.saveTerritoryHistoryItem = function saveTerritoryHistoryItem(historyItem) {
          TerritoryHolderHistoryModel
          .update(historyItem.id, {
            startDate: historyItem.startDate,
            endDate: historyItem.endDate,
            description: historyItem.description,
            holder: historyItem.holder
          })            
          .then(
            function onSuccess(value) {
              if(value.status == 200) {
                MessageService.success('Aluehistoriatieto päivitettiin.');
              } else {
                MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
              }
            }
          );
        };

        var territoryHolderHistoryItemToBeDeletedId = null;
        $scope.setTerritoryHolderHistoryToBeDeleted = function setTerritoryHolderHistoryToBeDeleted(historyItem) {
          territoryHolderHistoryItemToBeDeletedId = historyItem.id;
        };

        // Territory delete dialog buttons configuration
        $scope.confirmHistoryButtonsDelete = {
          ok: {
            label: 'Poista',
            className: 'btn-danger',
            callback: function callback() {
              TerritoryHolderHistoryModel
              .delete(territoryHolderHistoryItemToBeDeletedId)            
              .then(
                function onSuccess() {
                  MessageService.success('Aluehistoriatieto poistettiin.');
                  territoryHolderHistoryItemToBeDeletedId = null;
                  $scope.deleteTerritoryHolderHistoryItemVisible = false;
                  $state.go($state.current, {id: _territory.id}, {reload: true});
                }
              );
            }
          },
          cancel: {
            label: 'Peruuta',
            className: 'btn-default pull-left',
            callback: function callback() {
              territoryHolderHistoryItemToBeDeletedId = null;
            }
          }
        };

        // Territory delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Poista',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteTerritory();
            }
          },
          cancel: {
            label: 'Peruuta',
            className: 'btn-default pull-left'
          }
        };

        // Scope function to save modified territory.
        $scope.saveTerritory = function saveTerritory() {
          var data = angular.copy($scope.territory);

          data.holder = data.holder.id || $scope.app.defaultHolder;

          // Add holder history item
          if(!_territory.holder || data.holder !== _territory.holder.id) {
            var now = new Date();

            // Update the last row with end time
            if(
              data.territoryHolderHistory && 
              data.territoryHolderHistory.length > 0 && 
              !_.last(data.territoryHolderHistory).endTime
            ) {
              TerritoryHolderHistoryModel
              .update(
                _.last(data.territoryHolderHistory).id,
                {
                  endDate: now
                }
              );
            }

            // If the new holder is not default holder, add new row.
            if(data.holder !== $scope.app.defaultHolder) {
              var holderHistoryData = {
                startDate: now,
                holder: data.holder,
                territory: data.id
              };

              TerritoryHolderHistoryModel
                .create(holderHistoryData)
                .then(
                  function onSuccess(value) {
                    if(value.status == 201) {
                      MessageService.success('Aluehistoriatieto alueelle "' + $scope.territory.territoryCode + '" luotiin.');
                    } else {
                      MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                    }
                  }
                )
              ;  
            }          
          }

          // Remove populated data as update operation may mess it up.
          delete data.territoryHolderHistory;
          delete data.specialAddress;
          delete data.center;
          delete data.coordinates;
          delete data.territoryLinkAttribute;

          // Make territory data update
          TerritoryModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Alue "' + $scope.territory.territoryCode + '" päivitettiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
                $state.go($state.current, {id: _territory.id}, {reload: true});
              }
            )
          ;

        };

        // Scope function to delete territory

        $scope.deleteTerritory = function deleteTerritory() {
          TerritoryModel
            .delete($scope.territory.id)
            .then(
              function onSuccess() {
                MessageService.success('Alue "' + $scope.territory.territoryCode + '" poistettiin.');

                $state.go('app.territory');
              }
            )
          ;
        };

        $scope.getHolderNameWithId = function getHolderNameWithId(holderId) {
          return  _.result(
              _.find(_holders, function(h) {
                return h.id === holderId;
              }), 
              'name'
            );
        };

        $scope.getAttributeWithId = function getAttributeWithId(attributes, id) {
          return _.find(attributes, function(a) {
            return a.id === id;
          });
        };

        $scope.addNewAttribute = function addNewAttribute(attribute) {
          TerritoryLinkAttributeModel.create({
            attribute: attribute.id,
            territory: _territory.id
          })
          .then(function onSuccess(){
            MessageService.success('Attribuutti "' + attribute.name + '" lisättiin.');
            $scope.deleteTerritoryLinkAttributeItemVisible = false;
            $state.go($state.current, {id: _territory.id}, {reload: true});
          });
        };

        var specialAddressToBeDeletedId = null;
        $scope.setSpecialAddressToBeDeleted = function setSpecialAddressToBeDeleted(item) {
          specialAddressToBeDeletedId = item.id;
        };

        var territoryLinkAttributeItemToBeDeletedId = null;
        $scope.setTerritoryLinkAttributeToBeDeleted = function setTerritoryLinkAttributeToBeDeleted(item) {
          territoryLinkAttributeItemToBeDeletedId = item.id;
        };

        $scope.addSpecialAddress = function addSpecialAddress(specialAddress) {
          specialAddress.territory = _territory.id;
          specialAddress.added = new Date();
          SpecialAddressModel.create(specialAddress)
          .then(function onSuccess(){
            MessageService.success('Merkintä kieltopaikasta tai vieraskielisestä osoitteesta lisättiin.');
            $scope.deleteSpecialAddressItemVisible = false;
            $state.go($state.current, {id: _territory.id}, {reload: true});
          });
        };

        $scope.confirmSpecialAddressButtonsDelete = {
          ok: {
            label: 'Poista',
            className: 'btn-danger',
            callback: function callback() {
              SpecialAddressModel
              .delete(specialAddressToBeDeletedId)            
              .then(
                function onSuccess() {
                  MessageService.success('Merkintä poistettiin');
                  specialAddressToBeDeletedId = null;
                  $scope.deleteSpecialAddressItemVisible = false;
                  $state.go($state.current, {id: _territory.id}, {reload: true});
                }
              );
            }
          },
          cancel: {
            label: 'Peruuta',
            className: 'btn-default pull-left',
            callback: function callback() {
              specialAddressToBeDeletedId = null;
            }
          }
        };

        // Territory delete dialog buttons configuration
        $scope.confirmAttributeButtonsDelete = {
          ok: {
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              TerritoryLinkAttributeModel
              .delete(territoryLinkAttributeItemToBeDeletedId)            
              .then(
                function onSuccess() {
                  MessageService.success('Attribuutti poistettiin');
                  territoryLinkAttributeItemToBeDeletedId = null;
                  $scope.deleteTerritoryLinkAttributeItemVisible = false;
                  $state.go($state.current, {id: _territory.id}, {reload: true});
                }
              );
            }
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default pull-left',
            callback: function callback() {
              territoryLinkAttributeItemToBeDeletedId = null;
            }
          }
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for territory list GUI on boilerplate application.
  angular.module('frontend.app.territory')
    .controller('TerritoryListController', [
      '$scope', '$q', '$timeout',
      '$ngBootbox',
      '_',
      'ListConfig',
      'TerritoryHelper',
      'MessageService',
      'MailService',
      'TerritoryLinkAttributeModel',
      'TerritoryHolderHistoryModel',
      'SocketHelperService', 'UserService', 'TerritoryModel',
      '_items', '_count', '_holders', '_app', '_attributes',
      function controller(
        $scope, $q, $timeout,
        $ngBootbox,
        _,
        ListConfig,
        TerritoryHelper,
        MessageService,
        MailService,
        TerritoryLinkAttributeModel,
        TerritoryHolderHistoryModel,
        SocketHelperService, UserService, TerritoryModel,
        _items, _count, _holders, _app, _attributes
      ) {
        // Set current scope reference to model
        TerritoryModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.holders = _holders;
        $scope.attributes = _attributes;
        $scope.app = _app[0];
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(TerritoryModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'territoryCode',
          direction: true
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        $scope.getLastTerritoryHolderHistory = function getLastTerritoryHolderHistory(territory) {
          territory.territoryHolderHistory = _.sortBy(territory.territoryHolderHistory, function(i) {
              if(!i.startDate) {
                  return 0;
              }
              return Date.parse(i.startDate);
          });
          return _.last(territory.territoryHolderHistory);
        };

        $scope.addAttributeLink = function addAttributeLink(territory, attributeId) {
          TerritoryLinkAttributeModel.create({
            territory: territory.id,
            attribute: attributeId
          }).then(function(value){
            if(value.status == 201) {
              MessageService.success("Attribuutti lisättiin alueelle " + territory.territoryCode);
            } else {
              MessageService.info("Odottamaton tulos. Toiminto saattoi epäonnistua (" + value.status + ")");
            }
            _fetchData();
          });
        };

        $scope.updateApartmentCount = function updateApartmentCount(territory, newCount) {
          TerritoryModel.update(territory.id, 
            {
              apartmentCount : newCount
            }
          ).then(function(value){
            if(value.status == 200) {
              MessageService.success("Päivitettiin alueen " + territory.territoryCode + " asuntojen lukumäärä.");
            } else {
              MessageService.info("Odottamaton tulos. Toiminto saattoi epäonnistua (" + value.status + ")");
            }
            _fetchData();
          });
        };

        // Check if backup should be suggested
        var updateBackupSuggestion = function updateBackupSuggestion() {
          var lastBackup = new Date($scope.app.lastBackup);
          var now = new Date();
          $scope.suggestBackup = false;
          if(now.getTime() - lastBackup.getTime() > $scope.app.backupInterval * 24 * 60 * 60 * 1000) {
            $scope.suggestBackup = true;
          }
        };
        $timeout(updateBackupSuggestion, 50);

        $scope.runBackup = function runBackup() {
          MailService.backup().then(function() {
            MessageService.success('Tiedot varmuuskopioitiin.');
            updateBackupSuggestion();
          });
        };

        var updateMailCount = function updateMailCount() {
          MailService.count().then(function(data) {
            $scope.mails = data.data;
            $scope.mailsTotal = data.data.new_territory_taken_emails + data.data.territory_removed_emails + data.data.not_covered_territory_emails;
          });
        };
        $timeout(updateMailCount, 50);

        $scope.sendNotificationEmails = function sendNotificationEmails() {
          MailService.send(null).then(function(data) {
            console.log(data);
            MessageService.success('Sähköpostiviestit lähetettiin.');
            updateMailCount();
          });
        };

        // Initialize checked rows data.
        $scope.onlyCheckedTerritories = function onlyCheckedTerritories(territory) {
          return territory.checked;
        };

        $scope.onlyActiveHolders = function onlyActiveHolders(holder) {
          return holder.isArchived ? false : true;
        };

        // Filter applies when the user is limited to one holder only
        $scope.onlyAllowedHolders = function onlyAllowedHolders(holder) {
          if($scope.user.holder && holder.id !== $scope.user.holder && !$scope.isDefaultHolder(holder.id)) {
            return false;
          }
          return true;
        };

        $scope.isDefaultHolder = function isDefaultHolder(holderId) {
          return holderId === $scope.app.defaultHolder;
        };

        $scope.selectedHolder = $scope.app.defaultHolder;

        // Callback that is evaluated when user toggles a territory checkbox.
        $scope.selectedTerritoryHolderId = null;
        $scope.territoryChecked = function territoryChecked(territory, territories) {
          $scope.territoryOperationChange();
          $scope.selectedTerritoryHolderId = territory.holder.id;

          // When default holder is selected only operation 3 is possible
          // Otherwise no operation is checked, to prevent mistakes.
          if($scope.isDefaultHolder(territory.holder.id)) {
            $scope.operation = "3";
          } else {
            $scope.operation = null;
          }

          // Check if this was last unchecked
          var atLeastOneIsChecked = false;
          _.each(territories, function(t) {
            if(t.checked === true) {
              atLeastOneIsChecked = true;
            }
          });
          if(!atLeastOneIsChecked) {
            $scope.selectedTerritoryHolderId = null;
          }
        };

        $scope.removeSearchWord = function removeSearchWord(word, index) {
          var words = word.split(' ');
          words.splice(index, 1);
          $scope.filters.searchWord = words.join(' ');
        }

        $scope.clearSelected = function clearSelected(territories) {
          _.each(territories, function(t) {
            t.checked = false;
          });
          $scope.isCollapsed = true;
          $scope.isAllCollapsed = false;
          $scope.selectedTerritoryHolderId = null;
        };

        $scope.getHolderNameWithId = function getHolderWithId(holders, id) {
          if(holders && id) {
            var result = _.find(holders, function(a) {
              return a.id === id;
            });
            return result.name;
          }
          return '';
        };

        $scope.getAttributeWithId = function getAttributeNameWithId(attributes, id) {
          if(attributes && id) {
            var result = _.find(attributes, function(a) {
              return a.id === id;
            });
            return result;
          }
          return null;
        };

        $scope.getAttributeWithId = function getAttributeWithId(attributes, id) {
          return _.find(attributes, function(a) {
            return a.id === id;
          });
        };

        $scope.territoryOperationChange = function territoryOperationChange(operation) {
          $scope.selectedHolder = $scope.app.defaultHolder;
        };

        // Filter disables all territories that have different holder than the
        // initial selection. It also disables territories if the user has limited
        // user right to territories.
        $scope.selectionDisabledFilter = function(territory) {
          if(territory.archived) {
            return true;
          }
          if($scope.selectedTerritoryHolderId !== null && $scope.selectedTerritoryHolderId == territory.holder.id) {
            if($scope.user.holder 
              && territory.holder.id !== $scope.app.defaultHolder 
              && territory.holder.id !== $scope.user.holder) {
              return true;
            }
            return false;
          } else if ($scope.selectedTerritoryHolderId === null) {
            if($scope.user.holder 
              && territory.holder.id !== $scope.app.defaultHolder 
              && territory.holder.id !== $scope.user.holder) {
              return true;
            }
            return false;
          } else {
            return true;
          }
        };

        // Makes necessary update and create operations for changed territory history.
        var makeHolderHistoryUpdate = function(territory, comment, newHolderId) {

          var p = [];

          // If the holder change was anything else but return to the default
          // holder, add also row into history.
          if(newHolderId !== $scope.app.defaultHolder) {
            p.push(
              TerritoryHolderHistoryModel
              .create(
                {
                  startDate: new Date(),
                  holder: newHolderId,
                  territory: territory.id,
                  description: comment
                }
              )
              .then(function(value) {
                if(value.status != 201) {
                  MessageService.error("Aluehistoriatiedon lisäys epäonnistui alueelle " + territory.territoryCode);
                }
              })
            );
          }

          // If there was a row in history, update the end time if it is not already defined.
          if(
            territory.territoryHolderHistory && 
            territory.territoryHolderHistory.length > 0 && 
            !_.last(territory.territoryHolderHistory).endTime
          ) {
            p.push(
              TerritoryHolderHistoryModel
              .update(
                _.last(territory.territoryHolderHistory).id,
                {
                  endDate: new Date()
                }
              )
              .then(function(value) {
                if(value.status != 200) {
                  MessageService.error("Aluehistoriatiedon muutos epäonnistui alueelle " + territory.territoryCode);
                }
              })
            );
          }

          return p;
        };

        $scope.markTerritoriesAsCovered = function markTerritoriesAsCovered(territories, comment) {
          var p = [];
          _.each(territories, function(t) {
            p.push(
              TerritoryModel
              .update(t.id, 
                {
                  covered: new Date()
                }
              )
            );
            makeHolderHistoryUpdate(t, comment, t.holder.id);
          });
          handleTerritoryChangePromises(p);

        };

        $scope.changeHolder = function changeHolder(territories, markAsCovered, newHolderId, comment) {
          var errorSelection = false;
          _.each(territories, function(t) {
            if(t.holder && t.holder.id == newHolderId) {
              MessageService.error('Yksi valituista alueista, ' + t.territoryCode + ', on jo merkitty tälle omistajalle.');
              errorSelection = true;
            }
          });
          if(errorSelection) {
            return;
          }
          var p = [];
          _.each(territories, function(t) {
            if(!t.holder || (t.holder != newHolderId && t.holder.id != newHolderId)) {
              var data = {
                taken: new Date(),
                holder: newHolderId
              };
              if(markAsCovered) {
                data.covered = new Date();
              }
              p.push(
                TerritoryModel
                .update(t.id, data)
              );

              makeHolderHistoryUpdate(t, comment, newHolderId);
            }
          });
          handleTerritoryChangePromises(p);
        };

        var handleTerritoryChangePromises = function handleTerritoryChangePromises(p) {
          Promise.all(p).then(function(values) {
            var msgPrefixSuccess = "Muutettiin alueita: ";
            var msgPrefixFailed = "Muutos ei onnistunut alueille: ";
            var msg = "";
            _.each(values, function(v){
              if(v.status == 200) {
                msg += v.data.territoryCode + " ";
              }
            });
            if(msg.length > 0) {
              MessageService.success(msgPrefixSuccess + msg);
            }
            var msg2 = ""
            _.each(values, function(v){
              if(v.status != 200) {
                msg2 += v.data.territoryCode + " ";
              }
            });
            if(msg2.length > 0) {
              MessageService.error(msgPrefixFailed + msg2);
            }
          });
          $scope.isCollapsed = true;
          $scope.isAllCollapsed = false;
          $scope.selectedTerritoryHolderId = null;
          updateMailCount();
          _fetchData();
        };

        $scope.isNotCoveredLimitExeeded = function(territory, app) {
          return TerritoryHelper.isNotCoveredRecently(territory, app);
        };

        $scope.isHolderNotChangedLimitExeeded = function(territory, app) {
          return TerritoryHelper.isHolderNotChangedLimitExeeded(territory, app);
        };

        // Function to change sort column / direction on list
        $scope.changeSort = function changeSort(item) {
          var sort = $scope.sort;

          if (sort.column === item.column) {
            sort.direction = !sort.direction;
          } else {
            sort.column = item.column;
            sort.direction = true;
          }

          _triggerFetchData();
        };

        /**
         * Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch territory data
         * from server.
         */
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        /**
         * Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch territory data
         * from server.
         */
        $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _triggerFetchData();
          }
        });

        var searchWordTimer;

        /**
         * Watcher for 'filter' scope variable, which contains multiple values that we're interested
         * within actual GUI. This will trigger new data fetch query to server if following conditions
         * have been met:
         *
         *  1) Actual filter variable is different than old one
         *  2) Search word have not been changed in 400ms
         *
         * If those are ok, then watcher will call 'fetchData' function.
         */
        $scope.$watch('filters', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            if (searchWordTimer) {
              $timeout.cancel(searchWordTimer);
            }

            searchWordTimer = $timeout(_triggerFetchData, 400);
          }
        }, true);

        /**
         * Helper function to trigger actual data fetch from backend. This will just check current page
         * scope variable and if it is 1 call 'fetchData' function right away. Any other case just set
         * 'currentPage' scope variable to 1, which will trigger watcher to fetch data.
         *
         * @private
         */
        function _triggerFetchData() {
          $scope.clearSelected($scope.items);
          if ($scope.currentPage === 1) {
            _fetchData();
          } else {
            $scope.currentPage = 1;
          }
        }

        /**
         * Helper function to fetch actual data for GUI from backend server with current parameters:
         *  1) Current page
         *  2) Search word
         *  3) Sort order
         *  4) Items per page
         *
         * Actually this function is doing two request to backend:
         *  1) Data count by given filter parameters
         *  2) Actual data fetch for current page with filter parameters
         *
         * These are fetched via 'TerritoryModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters)
          };

          if($scope.filters && $scope.filters.holderId) {
            commonParameters.where = _.merge(
              {}, 
              commonParameters.where, 
              {holder: $scope.filters.holderId}
            );
          }

          if($scope.filters && $scope.filters.attributeLinkId) {
            // TODO: look for all territories with said attribute,
            // Add list of territory ids to where query
          }

          // Data query specified parameters
          var parameters = {
            populate: ['holder', 'territoryHolderHistory', 'territoryLinkAttribute'],
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = TerritoryModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          console.log(_.merge({}, commonParameters, parameters));

          // Fetch actual data
          var load = TerritoryModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // And wrap those all to promise loading
          $q
            .all([count, load])
            .finally(
              function onFinally() {
                $scope.loaded = true;
                $scope.loading = false;
              }
            )
          ;
        }

        _triggerFetchData();
      }
    ])
  ;

  angular.module('frontend.app.territory')
    .controller('TerritoryStatsController', [
      '$scope', '$q',
      '_',
      'ListConfig',
      'SocketHelperService', 'UserService',
      'StatModel',
      '_items',
      '_app',
      '_stats',
      function controller(
        $scope, $q,
        _,
        ListConfig,
        SocketHelperService, UserService,
        StatModel,
        _items,
        _app,
        _stats
      ) {

        var formDaysMonthsYearsObject = function(in_millisecs) {
          var millisecondsPerDay = 1000 * 60 * 60 * 24;
            var days = in_millisecs / millisecondsPerDay;
            var months = days / 30;
            var years = months / 12;
            days = days % 30;
            months = months % 12;
            return {'days':Math.floor(days), 'months':Math.floor(months), 'years': Math.floor(years)};
        }

        // Set initial data
        $scope.territories = _items;
        $scope.app = _app[0];
        $scope.user = UserService.user();

        $scope.totalCount = 0;
        $scope.notCoveredRecently = 0;
        $scope.totalWithoutNotCountedWhenCalculatingCoveredDuringLastYearTotal = 0;
        $scope.holderIsDefault = 0;
        $scope.totalNotCountedWhenCalculatingCoveredDuringLastYearTotal = 0;
        $scope.totalNotCountedWhenCalculatingCoveredDuringLastYearTotalNotCovered = 0;
        $scope.averageCoveredTime = 0;
        var totalCoveredTimeMs = 0;
        var totalTimeOnSameHolder = 0;
        var totalTimeOnSameHolderDivider = 0;
        $scope.averageTimeBetweenHolderChange = 0;
        $scope.holderChanges = 0;
        $scope.territoryTypeCounts = [];
        var now = new Date();
        var NOT_COVERED_LIMIT_MS = 1000 * 60 * 60 * 24 * ($scope.app.notCoveredLimit || 365);
        _.each($scope.territories, function(t) {

          $scope.holderChanges += t.territoryHolderHistory ? t.territoryHolderHistory.length : 0;
          _.each(t.territoryHolderHistory, function(thh) {
            var start = new Date(Date.parse(thh.startDate || now));
            var end = new Date(Date.parse(thh.endDate || now));
            totalCoveredTimeMs += (end.getTime() - start.getTime());
          });

          if(t.holder !== $scope.app.defaultHolder && !t.archived) {
            var taken = new Date(Date.parse(t.taken || now));
            totalTimeOnSameHolder += (now.getTime() - taken.getTime());
            totalTimeOnSameHolderDivider++;
          }

          var covered = new Date(Date.parse(t.covered));
          if(now.getTime() - covered.getTime() > NOT_COVERED_LIMIT_MS 
            && !t.notCountedWhenCalculatingCoveredDuringLastYearTotal
            && !t.archived) {
            $scope.notCoveredRecently++;
          }
           if(!t.archived) {
            $scope.totalCount++;
          }
          if(t.notCountedWhenCalculatingCoveredDuringLastYearTotal
            && !t.archived) {
            $scope.totalNotCountedWhenCalculatingCoveredDuringLastYearTotal++;
            if(now.getTime() - covered.getTime() > NOT_COVERED_LIMIT_MS) {
              $scope.totalNotCountedWhenCalculatingCoveredDuringLastYearTotalNotCovered++;
            }
          }
          if(t.holder === $scope.app.defaultHolder) {
            $scope.holderIsDefault++;
          }
        });
        var avCoveredTime = totalCoveredTimeMs / $scope.holderChanges;
        var avCoveredObject = formDaysMonthsYearsObject(avCoveredTime);
        $scope.averageCoveredTime = avCoveredObject.days + ' päivää, ' + avCoveredObject.months + ' kuukautta ja ' + avCoveredObject.years + ' vuotta.';

        var avTimeSameHolder = totalTimeOnSameHolder / totalTimeOnSameHolderDivider;
        var avTimeSameHolderObject = formDaysMonthsYearsObject(avTimeSameHolder);
        $scope.averageTimeSameHolder = avTimeSameHolderObject.days + ' päivää, ' + avTimeSameHolderObject.months + ' kuukautta ja ' + avTimeSameHolderObject.years + ' vuotta.';

        StatModel.create({
          statisticDate: new Date(),
          averageCoveredTime: avCoveredTime,
          averageHoldingTime: avTimeSameHolder,
          totalCount: $scope.totalCount,
          notCoveredCount: $scope.notCoveredRecently,
          availableCount: $scope.holderIsDefault,
        });
      }
    ])
  ;

  angular.module('frontend.app.territory')
    .controller('TerritoryS13Controller', [
      '$scope', '$q',
      '_',
      'ListConfig',
      'SocketHelperService', 'UserService',
      '_items', '_holders',
      function controller(
        $scope, $q,
        _,
        ListConfig,
        SocketHelperService, UserService,
        _items, _holders
      ) {

        // Set initial data
        $scope.territories = _items;
        $scope.holders = _holders;
        $scope.user = UserService.user();

        _.each($scope.territories, function(t) {
          var emptyHistoryLength = 20 - t.territoryHolderHistory.length;
          emptyHistoryLength = emptyHistoryLength > 0 ? emptyHistoryLength : 0;
          t.emptyArray = Array.apply(null, Array(emptyHistoryLength)).map(function (x, i) { return i; });
        });

        $scope.getHolderNameWithId = function getHolderNameWithId(holderId) {
          return  _.result(
              _.find(_holders, function(h) {
                return h.id === holderId;
              }), 
              'name'
            );
        };
      }
    ])
  ;

  angular.module('frontend.app.territory')
    .controller('TerritoryQuickViewController', [
      '$scope', '$q',
      '_',
      'ListConfig',
      'TerritoryHelper',
      'SocketHelperService', 'UserService',
      '_items', '_holders', '_app',
      function controller(
        $scope, $q,
        _,
        ListConfig,
        TerritoryHelper,
        SocketHelperService, UserService,
        _items, _holders, _app
      ) {
        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.territories = _items;
        $scope.holders = _holders;
        $scope.app = _app[0];
        $scope.user = UserService.user();

        $scope.isNotCoveredRecently = function isNotCoveredRecently(territory, app) {
          return TerritoryHelper.isNotCoveredRecently(territory, app);
        };

        $scope.isDefaultHolder = function isDefaultHolder(holderId) {
          return holderId === $scope.app.defaultHolder;
        };

        $scope.getHolderNameWithId = function getHolderNameWithId(holderId) {
          return  _.result(
              _.find(_holders, function(h) {
                return h.id === holderId;
              }), 
              'name'
            );
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for territory list GUI on boilerplate application.
  angular.module('frontend.app.territory')
    .controller('TerritoryMapController', [
      '$scope', '$q', '$filter',
      '_',
      'ListConfig',
      'TerritoryHelper',
      'SocketHelperService', 'UserService',
      '_items', '_app',
      function controller(
        $scope, $q, $filter,
        _,
        ListConfig,
        TerritoryHelper,
        SocketHelperService, UserService,
        _items, _app
      ) {
        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        $scope.territories = _items;
        $scope.app = _app[0];
        $scope.user = UserService.user();

        // Set initial data
        $scope.map = {
          center: {
            latitude: $scope.app.defaultLatitude || $scope.app.defaultLatitude,
            longitude: $scope.app.defaultLongitude || $scope.app.defaultLongitude
          },
          zoom: 10,
          markersEvents: {},
          window: {
              marker: {},
              show: false,
              closeClick: function() {
                  this.show = false;
              },
              options: {}, // define when map is ready
              title: ''
          }
        };

        var clickHandler = function clickHandler(marker, eventName, model) {
            $scope.map.window.model = model;
            $scope.map.window.title = model.title;
            $scope.map.window.linkId = model.id;
            $scope.map.window.covered = model.covered;
            $scope.map.window.show = true;
        };

        $scope.map.markersEvents.click = clickHandler;

        $scope.onClick = function onClick(marker) {
          $scope.selectedMarker = marker.model;
        };

        var getIconUrl = function getIconUrl(territory) {
          try {
            if(TerritoryHelper.isNotCoveredRecently(territory, $scope.app)) {
              if(territory.holder.id !== $scope.app.defaultHolder) {
                return '/assets/images/red.png';
              }
              return '/assets/images/red-dot.png';
            }
            if(territory.holder.id !== $scope.app.defaultHolder) {
              return '/assets/images/green.png';
            }
            return '/assets/images/green-dot.png';           
          } catch(err) {
            return '/assets/images/yellow.png';
          }

        };

        $scope.closeClick = function () {
            this.window = false;
        };

        $scope.territoryMarkers = [];
        _.each($scope.territories, function(t) {
          t.markerOptions = {
            icon: { url: getIconUrl(t) }
          }
          $scope.territoryMarkers.push({
            id: t.id,
            title: t.territoryCode,
            covered: t.covered,
            latitude: t.center ? t.center.latitude : 61,
            longitude: t.center ? t.center.longitude: 23,
            icon: t.markerOptions.icon,
            onClick: function() {
              console.log("Clicked", this);
            }
          })
        })


      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.app.territory
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  /**
   * Model for Territory API, this is used to wrap all Territory objects specified actions and data change actions.
   */
  angular.module('frontend.app.territory')
    .service('TerritoryModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('territory');
      }
    ])
  ;
}());


'use strict';

angular.module('frontend.app.territory')
.factory('TerritoryHelper', [function () {

	var millisecondsInDay = 24 * 60 * 60 * 1000;

	return {
		isNotCoveredRecently : function(territory, appSettings) {
			var limitInMilliseconds = millisecondsInDay * appSettings.notCoveredLimit;
			var now = new Date();
			return Date.parse(territory.covered) < (now.getTime() - limitInMilliseconds);
		},
		isHolderNotChangedLimitExeeded : function(territory, appSettings) {
			var limitInMilliseconds = millisecondsInDay * appSettings.holderNotChangedWarningLimit;
			var now = new Date();
			return Date.parse(territory.taken) < (now.getTime() - limitInMilliseconds);
		}
	};

}]);

/**
 * Angular module for frontend.core.auth component. This component is divided to following logical components:
 *
 *  frontend.core.auth.login
 *  frontend.core.auth.services
 */
(function() {
  'use strict';

  // Define frontend.auth module
  angular.module('frontend.core.auth', [
    'frontend.core.auth.login',
    'frontend.core.auth.services'
  ]);

  // Module configuration
  angular.module('frontend.core.auth')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('auth', {
            abstract: true,
            parent: 'frontend',
            data: {
              access: 1
            }
          })
        ;
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.auth.login' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  /**
   * Login controller to handle user's login to application. Controller uses 'Auth' service to make actual HTTP
   * request to server and try to authenticate user.
   *
   * After successfully login Auth service will store user data and JWT token via 'Storage' service where those are
   * asked whenever needed in application.
   *
   * @todo
   *  1) different authentication providers
   *  2) user registration
   */
  angular.module('frontend.core.auth.login')
    .controller('LoginController', [
      '$scope', '$state',
      'AuthService', 'FocusOnService',
      function controller(
        $scope, $state,
        AuthService, FocusOnService
      ) {
        // Already authenticated so redirect back to territories list
        if (AuthService.isAuthenticated()) {
          $state.go('app.territory');
        }

        // Scope function to perform actual login request to server
        $scope.login = function login() {
          AuthService
            .login($scope.credentials)
            .then(
              function successCallback() {
                $state.go('app.territory');
              },
              function errorCallback() {
                _reset();
              }
            )
          ;
        };

        /**
         * Private helper function to reset credentials and set focus to username input.
         *
         * @private
         */
        function _reset() {
          FocusOnService.focus('username');

          // Initialize credentials
          $scope.credentials = {
            identifier: '',
            password: ''
          };
        }

        _reset();
      }
    ])
  ;
}());

/**
 * AuthService service which is used to authenticate users with backend server and provide simple
 * methods to check if user is authenticated or not.
 *
 * Within successfully login process service will store user data and JWT token to ngStorage where
 * those are accessible in the application.
 *
 * This service provides following methods:
 *
 *  AuthService.authorize(access)
 *  AuthService.isAuthenticated()
 *  AuthService.login(credentials)
 *  AuthService.logout()
 *
 * You can use this service fairly easy on your controllers and views if you like to. It's
 * recommend that you use this service with 'UserService' service in your controllers and
 * views.
 *
 * Usage example in controller:
 *
 *  angular
 *    .module('app')
 *    .controller('SomeController', [
 *      '$scope', 'AuthService', 'UserService',
 *      function ($scope, AuthService, UserService) {
 *        $scope.auth = AuthService;
 *        $scope.user = UserService.user;
 *      }
 *    ])
 *  ;
 *
 * Usage example in view:
 *
 *  <div data-ng-show="auth.isAuthenticated()">
 *      Hello, <strong>{{user().email}}</strong>
 *  </div>
 *
 * Happy coding!
 *
 * @todo  Revoke method?
 * @todo  Text localizations?
 */
(function() {
  'use strict';

  angular.module('frontend.core.auth.services')
    .factory('AuthService', [
      '$http', '$state', '$localStorage',
      'AccessLevels', 'BackendConfig', 'MessageService',
      function factory(
        $http, $state, $localStorage,
        AccessLevels, BackendConfig, MessageService
      ) {
        return {
          /**
           * Method to authorize current user with given access level in application.
           *
           * @param   {Number}    accessLevel Access level to check
           *
           * @returns {Boolean}
           */
          authorize: function authorize(accessLevel) {
            if (accessLevel === AccessLevels.user) {
              return this.isAuthenticated();
            } else if (accessLevel === AccessLevels.admin) {
              return this.isAuthenticated() && Boolean($localStorage.credentials.user.admin);
            } else {
              return accessLevel === AccessLevels.anon;
            }
          },

          /**
           * Method to check if current user is authenticated or not. This will just
           * simply call 'Storage' service 'get' method and returns it results.
           *
           * @returns {Boolean}
           */
          isAuthenticated: function isAuthenticated() {
            return Boolean($localStorage.credentials);
          },

          /**
           * Method make login request to backend server. Successfully response from
           * server contains user data and JWT token as in JSON object. After successful
           * authentication method will store user data and JWT token to local storage
           * where those can be used.
           *
           * @param   {*} credentials
           *
           * @returns {*|Promise}
           */
          login: function login(credentials) {
            return $http
              .post(BackendConfig.url + '/login', credentials, {withCredentials: true})
              .then(
                function(response) {
                  MessageService.success('Sisäänkirjautuminen onnistui.');

                  $localStorage.credentials = response.data;
                }
              )
            ;
          },

          /**
           * The backend doesn't care about actual user logout, just delete the token
           * and you're good to go.
           *
           * Question still: Should we make logout process to backend side?
           */
          logout: function logout() {
            $localStorage.$reset();

            MessageService.success('Uloskirjautuminen onnistui.');

            $state.go('auth.login');
          }
        };
      }
    ])
  ;
}());

/**
 * Current user data service within this you can access to currently signed in user data.
 * Note that if you wanna be secure about this you have to also use 'Auth' service in your
 * views.
 *
 * Usage example in controller:
 *  angular
 *    .module('app')
 *    .controller('SomeController',[
 *      '$scope', 'AuthService', 'UserService',
 *      function controller($scope, AuthService, UserService) {
 *        $scope.auth = AuthService;
 *        $scope.user = UserService.user;
 *      }
 *    ])
 *  ;
 *
 * Usage example in view:
 *  <div data-ng-show="auth.isAuthenticated()">
 *      Hello, <strong>{{user().email}}</strong>
 *  </div>
 *
 * Happy coding!
 */
(function() {
  'use strict';

  angular.module('frontend.core.auth.services')
    .factory('UserService', [
      '$localStorage',
      function factory($localStorage) {
        return {
          user: function user() {
            return $localStorage.credentials ? $localStorage.credentials.user : {};
          }
        };
      }
    ])
  ;
}());

/**
 * Generic 'focus' component for boilerplate application. Purpose of this component is to provide an easy way to trigger
 * focus to specified input whenever needed.
 *
 * @link    https://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field/18295416#18295416
 */
(function() {
  'use strict';

  /**
   * Directive definition for 'focus' component. This will listen 'focusOn' event on scope, and whenever that's
   * fired directive will check if that event is attached to current element.
   *
   * Usage example:
   *  <input type="text" data-focus-on="focusMe" />
   *
   * This will attach 'focusOn' event with 'focusMe' parameter to trigger focus of this element.
   */
  angular.module('frontend.core.components')
    .directive('focusOn', [
      '$timeout',
      function directive($timeout) {
        /**
         * Actual directive return function.
         *
         * @param   {angular.scope}     scope   Angular scope object.
         * @param   {angular.element}   element jqLite-wrapped element that this directive matches.
         */
        return function focusOn(scope, element) {
          scope.$on('focusOn', function focusOnEvent(event, identifier) {
            if (element.data('focusOn') && identifier === element.data('focusOn')) {
              $timeout(function timeout() {
                element.focus();
              }, 0, false);
            }
          });
        };
      }
    ])
  ;

  /**
   * Service for focus component. This is need for actual element focus events which can be activated from another
   * components like controllers and services.
   *
   * Usage example:
   *  angular.module('frontend.controllers')
   *    .controller('MyCtrl', [
   *      '$scope', 'FocusOnService',
   *      function($scope, FocusOnService) {
   *        focusOnService('focusMe');
   *      }
   *    ])
   *  ;
   *
   * This will trigger focus to input element that has 'data-focus-on' attribute set with value 'focusMe'.
   */
  angular.module('frontend.core.components')
    .factory('FocusOnService', [
      '$rootScope', '$timeout',
      function factory($rootScope, $timeout) {
        /**
         * Actual functionality for this service. This will just broadcast 'focusOn' event with specified
         * identifier, which is catch on 'focus' component directive.
         *
         * @param   {string}    identifier  Identifier for 'data-focus-on' attribute
         */
        return {
          'focus': function focus(identifier) {
            $timeout(function timeout() {
              $rootScope.$broadcast('focusOn', identifier);
            }, 0, false);
          }
        };
      }
    ])
  ;
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.directives', []);

  // Fixes datepicker showing ISO date instead of nicely formatted date.
  angular.module('frontend.core.directives')
	.directive('datepickerPopup', function (){
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function(scope, element, attr, controller) {

	      //remove the default formatter from the input directive to prevent conflict
	      controller.$formatters.shift();
  		}
		}
	})
	.directive('territorySubPages', function (){
	  return {
	  	templateUrl: '/frontend/core/directives/partials/territorySubPages.html'
	  }
	});
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.core.error' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  /**
   * Controller for generic error handling.
   */
  angular.module('frontend.core.error')
    .controller('ErrorController', [
      '$scope', '$state',
      '_',
      '_error',
      function controller(
        $scope, $state,
        _,
        _error
      ) {
        if (_.isUndefined(_error)) {
          return $state.go('auth.login');
        }

        $scope.error = _error;

        // Helper function to change current state to previous one
        $scope.goToPrevious = function goToPrevious() {
          $state.go($scope.error.fromState.name, $scope.error.fromParams);
        };
      }
    ])
  ;
}());

/**
 * Auth interceptor for HTTP and Socket request. This interceptor will add required
 * JWT (Json Web Token) token to each requests. That token is validated in server side
 * application.
 *
 * @see http://angular-tips.com/blog/2014/05/json-web-tokens-introduction/
 * @see http://angular-tips.com/blog/2014/05/json-web-tokens-examples/
 */
(function() {
  'use strict';

  angular.module('frontend.core.interceptors')
    .factory('AuthInterceptor', [
      '$q', '$injector', '$localStorage',
      function(
        $q, $injector, $localStorage
      ) {
        return {
          /**
           * Interceptor method for $http requests. Main purpose of this method is to add JWT token
           * to every request that application does.
           *
           * @param   {*} config  HTTP request configuration
           *
           * @returns {*}
           */
          request: function requestCallback(config) {
            var token;

            // Yeah we have some user data on local storage
            if ($localStorage.credentials) {
              token = $localStorage.credentials.token;
            }

            // Yeah we have a token
            if (token) {
              if (!config.data) {
                config.data = {};
              }

              /**
               * Set token to actual data and headers. Note that we need bot ways because of socket cannot modify
               * headers anyway. These values are cleaned up in backend side policy (middleware).
               */
              config.data.token = token;
              config.headers.authorization = 'Bearer ' + token;
            }

            return config;
          },

          /**
           * Interceptor method that is triggered whenever response error occurs on $http requests.
           *
           * @param   {*} response
           *
           * @returns {*|Promise}
           */
          responseError: function responseErrorCallback(response) {
            if (response.status === 401) {
              $localStorage.$reset();

              $injector.get('$state').go('auth.login');
            }

            return $q.reject(response);
          }
        };
      }
    ])
  ;
}());

/**
 * Interceptor for $http and $sailSocket request to handle possible errors and show
 * that error to user automatically. Message is shown by application 'Message' service
 * which uses noty library.
 *
 * @todo Add option to skip showing automatic error message
 */
(function() {
  'use strict';

  angular.module('frontend.core.interceptors')
    .factory('ErrorInterceptor', [
      '$q', '$injector',
      function($q, $injector) {
        return {
          /**
           * Interceptor method which is triggered whenever response occurs on $http queries. Note
           * that this has some sails.js specified hack for errors that returns HTTP 200 status.
           *
           * This is maybe sails.js bug, but I'm not sure of that.
           *
           * @param   {*} response
           *
           * @returns {*|Promise}
           */
          response: function responseCallback(response) {
            if (response.data.error &&
              response.data.status &&
              response.data.status !== 200
            ) {
              return $q.reject(response);
            } else {
              return response || $q.when(response);
            }
          },

          /**
           * Interceptor method that is triggered whenever response error occurs on $http requests.
           *
           * @param   {*} response
           *
           * @returns {*|Promise}
           */
          responseError: function responseErrorCallback(response) {
            var message = '';

            if (response.data && response.data.error) {
              message = response.data.error;
            } else if (response.data && response.data.message) {
              message = response.data.message;
            } else {
              if (typeof response.data === 'string') {
                message = response.data;
              } else if (response.statusText) {
                message = response.statusText;
              } else {
                message = $injector.get('HttpStatusService').getStatusCodeText(response.status);
              }

              message = message + ' <span class="text-small">(HTTP status ' + response.status + ')</span>';
            }

            if (message) {
              $injector.get('MessageService').error(message);
            }

            return $q.reject(response);
          }
        };
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.core.layout' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  /**
   * Generic header controller for application layout. this contains all necessary logic which is used on application
   * header section. Basically this contains following:
   *
   *  1) Main navigation
   *  2) Login / Logout
   *  3) Profile
   */
  angular.module('frontend.core.layout')
    .controller('HeaderController', [
      '$scope', '$state',
      'HeaderNavigationItems',
      'UserService', 'AuthService',
      function controller(
        $scope, $state,
        HeaderNavigationItems,
        UserService, AuthService
      ) {
        $scope.user = UserService.user;
        $scope.auth = AuthService;
        $scope.navigationItems = HeaderNavigationItems;

        /**
         * Helper function to determine if menu item needs 'not-active' class or not. This is basically
         * special case because of 'examples.about' state.
         *
         * @param   {layout.menuItem}   item    Menu item object
         *
         * @returns {boolean}
         */
        $scope.isNotActive = function isNotActive(item) {
          return !!(item.state === 'examples' && $state.current.name === 'examples.about');
        };

        /**
         * Helper function to determine if specified menu item needs 'active' class or not. This is needed
         * because of reload of page, in this case top level navigation items are not activated without
         * this helper.
         *
         * @param   {layout.menuItem}   item    Menu item object
         *
         * @returns {boolean}
         */
        $scope.isActive = function isActive(item) {
          var bits = $state.current.name.toString().split('.');

          return !!(
            (item.state === $state.current.name) ||
            (item.state === bits[0] && $state.current.name !== 'examples.about')
          );
        };

        // Simple helper function which triggers user logout action.
        $scope.logout = function logout() {
          AuthService.logout();
        };
      }
    ])
  ;

  /**
   * Generic footer controller for application layout. This contains all necessary logic which is used on application
   * footer section. Basically this contains following:
   *
   *  1) Generic links
   *  2) Version info parsing (back- and frontend)
   */
  angular.module('frontend.core.layout')
    .controller('FooterController', [
      function controller() {
        // TODO: add version info parsing
      }
    ])
  ;

  /**
   * Generic navigation controller for application layout. This contains all necessary logic for pages sub-navigation
   * section. Basically this handles following:
   *
   *  1) Sub navigation of the page
   *  2) Opening of information modal
   */
  angular.module('frontend.core.layout')
    .controller('NavigationController', [
      '$scope', '$state', '$modal',
      '_items',
      'AuthService',
      function controller(
        $scope, $state, $modal,
        _items,
        AuthService
      ) {
        $scope.navigationItems = _items;
        $scope.auth = AuthService;

        // Helper function to open information modal about current GUI.
        $scope.openInformation = function openInformation() {
          $modal.open({
            templateUrl: '/frontend/core/layout/partials/help.html',
            controller: 'NavigationModalController',
            size: 'lg',
            resolve: {
              '_title': function resolve() {
                return $state.current.views['content@'].name;
              },
              '_files': [
                'NavigationInfoModalFiles',
                function resolve(NavigationInfoModalFiles) {
                  return NavigationInfoModalFiles.get($state.current.name.toString());
                }
              ],
              '_template': function resolve() {
                return $state.current.views['content@'].templateUrl.replace('.html', '-info.html');
              }
            }
          });
        };
      }
    ])
  ;

  /**
   * Controller for navigation info modal. This is used to show GUI specified detailed information about how those
   * are done (links to sources + generic information / description).
   */
  angular.module('frontend.core.layout')
    .controller('NavigationModalController', [
      '$scope', '$modalInstance',
      'BackendConfig',
      '_title', '_files', '_template',
      function(
        $scope, $modalInstance,
        BackendConfig,
        _title, _files, _template
      ) {
        $scope.title = _title;
        $scope.files = _files;
        $scope.template = _template;
        $scope.backendConfig = BackendConfig;

        // Dismiss function for modal
        $scope.dismiss = function dismiss() {
          $modalInstance.dismiss();
        };
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular directive definitions for 'frontend.core.layout' module.
 *
 * Note that this file should only contain directives and nothing else.
 */
(function() {
  'use strict';

  /**
   * Directive to build file links to information modal about current GUI. Actual files are passed to this directive
   * within modal open function.
   */
  angular.module('frontend.core.layout')
    .directive('pageInfoFiles', function directive() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          'files': '@'
        },
        templateUrl: '/frontend/core/layout/partials/files.html',
        controller: [
          '$scope',
          function controller($scope) {
            try {
              $scope.filesJson = angular.fromJson($scope.files);
            } catch (error) {
              $scope.filesJson = false;
            }

            $scope.getTooltip = function getTooltip(item) {
              return '<h5 class="title">' + item.title + '</h5>' + item.info;
            };
          }
        ]
      };
    })
  ;
}());

/**
 * This file contains all necessary Angular service definitions for 'frontend.core.layout' module.
 *
 * Note that this file should only contain services and nothing else.
 */
(function() {
  'use strict';

  // Generic service to return all available menu items for main level navigation.
  angular.module('frontend.core.layout')
    .factory('HeaderNavigationItems', [
      'AccessLevels',
      function factory(AccessLevels) {
        return [
          {
            state: 'app.about',
            title: 'Etusivu',
            access: AccessLevels.anon,
            icon: 'fa-home'
          },
          {
            state: 'app',
            title: 'Aluehallinta',
            access: AccessLevels.user,
            icon: 'fa-map-o'
          },
          {
            state: 'admin',
            title: 'Käyttäjät',
            access: AccessLevels.admin,
            icon: 'fa-users'
          }
        ];
      }
    ])
  ;

  // Generic service to return all available menu items for specified sub level navigation.
  angular.module('frontend.core.layout')
    .factory('ContentNavigationItems', [
      'AccessLevels',
      function factory(AccessLevels) {
        var items = {
          'app': [
            {
              state: 'app.territory',
              title: 'Alueet',
              access: AccessLevels.user,
              icon: 'fa-list'
            },
            {
              state: 'app.holder',
              title: 'Alueomistajat',
              access: AccessLevels.user,
              icon: 'fa-street-view'
            },
            {
              state: 'app.attributes',
              title: 'Attribuutit',
              access: AccessLevels.admin,
              icon: 'fa-flag'
            },
            {
              state: 'app.settings',
              title: 'Aluehallinnan asetukset',
              access: AccessLevels.admin,
              icon: 'fa-cogs'
            }
          ],
          'admin': [
            {
              state: 'admin.user',
              title: 'Käyttäjät',
              access: AccessLevels.admin
            },
            {
              state: 'admin.login-history',
              title: 'Kirjautumiset',
              access: AccessLevels.admin
            },
            {
              state: 'admin.request-log',
              title: 'Taustakyselyt',
              access: AccessLevels.admin
            },
            {
              state: 'admin.migrate',
              title: 'Migraatio',
              access: AccessLevels.admin
            }
          ]
        };

        return {
          getItems: function getItems(section) {
            return items[section];
          }
        };
      }
    ])
  ;

  /**
   * Service which contains information about all used files (back- and frontend) within specified example page.
   * These files are shown in example page info modal, so that users can easily see what current example page is
   * using to do things.
   */
  angular.module('frontend.core.layout')
    .factory('NavigationInfoModalFiles', [
      '_',
      function factory(_) {
        /**
         * Base url for code repository.
         *
         * @type {string}
         */
        var repository = 'https://github.com/tarlepp/angular-sailsjs-boilerplate/blob/master/';

        /**
         * Type configuration for files.
         *
         * @type    {{
         *            generic: {
         *              controller: string,
         *              data: string,
         *              model: string,
         *              template: string
         *            },
         *            backend: {
         *              baseController: string,
         *              baseModel: string
         *            },
         *            frontend: {
         *              module: string,
         *              listConfig: string
         *            }
         *          }}
         */
        var types = {
          generic: {
            controller: 'Used controller.',
            data: 'Initial data that is loaded to database at first time that sails lift.',
            model: 'Used model.',
            template: 'Used HTML template.'
          },
          backend: {
            baseController: 'Generic base controller that is extended by real controllers.',
            baseModel: 'Generic base model that is extended by real models.',
            policy: {
              authenticated: 'Authentication policy that will check if request contains correct JWT or not.',
              passport: 'Policy to initialize passport.js library to use.'
            }
          },
          frontend: {
            module: 'Current angular module configuration.',
            modelFactory: 'Generic model factory that all individual models uses. This contains default functions for each model.',
            dataService: 'Generic data service, which handles all the communications between back- and frontend via $sailsSocket service.',
            listConfig: 'Service that contains all list specified configurations (title items, default configurations, etc.).',
            backendConfig: 'Backend config, this contains backend url and other "static" backend specified definitions.',
            authInterceptor: 'Authentication interceptor, that attach JWT to $http and $sailsSockets requests.',
            errorInterceptor: 'Generic error interceptor, this will handle all error situations and shows those to user.',
            directive: 'Used directive(s) in this example page.'
          }
        };

        /**
         * Generic files that are used across each GUI example.
         *
         * @type    {{}}
         */
        var generic = {
          'backend': {
            'Backend <span class="text-muted">generic</span>': [
              {
                url: repository + 'backend/api/base/controller.js',
                title: 'controller.js',
                info: types.backend.baseController
              },
              {
                url: repository + 'backend/api/base/model.js',
                title: 'model.js',
                info: types.backend.baseModel
              },
              {
                url: repository + 'backend/api/policies/Authenticated.js',
                title: 'Authenticated.js',
                info: types.backend.policy.authenticated
              },
              {
                url: repository + 'backend/api/policies/Passport.js',
                title: 'Passport.js',
                info: types.backend.policy.passport
              }
            ]
          },
          'frontend': {
            'Frontend <span class="text-muted">generic</span>': [
              {
                url: repository + 'frontend/src/app/core/services/ListConfigService.js',
                title: 'ListConfigService.js',
                info: types.frontend.listConfig
              },
              {
                url: repository + 'frontend/src/app/core/models/factory.js',
                title: 'factory.js',
                info: types.frontend.modelFactory
              },
              {
                url: repository + 'frontend/src/app/core/services/DataService.js',
                title: 'DataService.js',
                info: types.frontend.dataService
              },
              {
                url: repository + 'frontend/src/app/core/constants/BackendConfig.js',
                title: 'BackendConfig.js',
                info: types.frontend.backendConfig
              },
              {
                url: repository + 'frontend/src/app/core/interceptors/AuthInterceptor.js',
                title: 'AuthInterceptor.js',
                info: types.frontend.authInterceptor
              },
              {
                url: repository + 'frontend/src/app/core/interceptors/ErrorInterceptor.js',
                title: 'ErrorInterceptor.js',
                info: types.frontend.errorInterceptor
              }
            ]
          }
        };

        /**
         * Actual data for each example page. This data contains used files in each example GUI item, these
         * files are grouped to following sections:
         *  - backend
         *  - backend (generic)
         *  - frontend
         *  - frontend (generic)
         *
         * @type    {{}}
         */
        var data = {
          'app.holder': {
            'Backend': [
              {
                url: repository + 'backend/api/models/Holder.js',
                title: 'Holder.js',
                info: types.generic.model
              },
              {
                url: repository + 'backend/api/controllers/HolderController.js',
                title: 'HolderController.js',
                info: types.generic.controller
              },
              {
                url: repository + 'backend/test/fixtures/Holder.json',
                title: 'Holder.json',
                info: types.generic.data
              }
            ],
            'Frontend': [
              {
                url: repository + 'frontend/src/app/app/holder/holder.js',
                title: 'holder.js',
                info: types.frontend.module
              },
              {
                url: repository + 'frontend/src/app/app/holder/holder-controllers.js',
                title: 'holder-controllers.js',
                info: types.generic.controller
              },
              {
                url: repository + 'frontend/src/app/app/holder/holder-models.js',
                title: 'holder-models.js',
                info: types.generic.model
              },
              {
                url: repository + 'frontend/src/app/app/holder/list.html',
                title: 'list.html',
                info: types.generic.template
              }
            ]
          },
          'app.territory': {
            'Backend': [
              {
                url: repository + 'backend/api/models/Territory.js',
                title: 'Territory.js',
                info: types.generic.model
              },
              {
                url: repository + 'backend/api/controllers/TerritoryController.js',
                title: 'TerritoryController.js',
                info: types.generic.controller
              },
              {
                url: repository + 'backend/test/fixtures/Territory.json',
                title: 'Territory.json',
                info: types.generic.data
              }
            ],
            'Frontend': [
              {
                url: repository + 'frontend/src/app/app/territory/territory.js',
                title: 'territory.js',
                info: types.frontend.module
              },
              {
                url: repository + 'frontend/src/app/app/territory/territory-controllers.js',
                title: 'territory-controllers.js',
                info: types.generic.controller
              },
              {
                url: repository + 'frontend/src/app/app/territory/territory-models.js',
                title: 'territory-models.js',
                info: types.generic.model
              },
              {
                url: repository + 'frontend/src/app/app/territory/list.html',
                title: 'list.html',
                info: types.generic.template
              }
            ]
          },
          'app.messages': {
            'Frontend': [
              {
                url: repository + 'frontend/src/app/app/messages/messages.js',
                title: 'messages.js',
                info: types.frontend.module
              },
              {
                url: repository + 'frontend/src/app/app/messages/messages-controllers.js',
                title: 'messages-controllers.js',
                info: types.generic.controller
              },
              {
                url: repository + 'frontend/src/app/app/messages/messages.html',
                title: 'messages.html',
                info: types.generic.template
              }
            ],
            'Frontend <span class="text-muted">generic</span>': [
              {
                url: repository + 'frontend/src/app/core/interceptors/ErrorInterceptor.js',
                title: 'ErrorInterceptor.js',
                info: types.frontend.errorInterceptor
              },
              {
                url: repository + 'frontend/src/app/core/services/MessageService.js',
                title: 'MessageService.js',
                info: 'Service to show messages to users via <em>toastr</em> service.'
              },
              {
                url: repository + 'frontend/src/app/core/services/HttpStatusService.js',
                title: 'HttpStatusService.js',
                info: 'Generic HTTP status service that contains helper methods for HTTP status code handling.'
              }
            ]
          },
          'app.chat': {
            'Backend': [
              {
                url: repository + 'backend/api/models/Message.js',
                title: 'Message.js',
                info: types.generic.model
              },
              {
                url: repository + 'backend/api/controllers/MessageController.js',
                title: 'MessageController.js',
                info: types.generic.controller
              }
            ],
            'Frontend': [
              {
                url: repository + 'frontend/src/app/app/chat/chat.js',
                title: 'chat.js',
                info: types.frontend.module
              },
              {
                url: repository + 'frontend/src/app/app/chat/chat-controllers.js',
                title: 'chat-controllers.js',
                info: types.generic.controller
              },
              {
                url: repository + 'frontend/src/app/app/chat/chat-directives.js',
                title: 'chat-directives.js',
                info: types.frontend.directive
              },
              {
                url: repository + 'frontend/src/app/app/chat/chat-models.js',
                title: 'chat-models.js',
                info: types.generic.model
              },
              {
                url: repository + 'frontend/src/app/app/chat/chat.html',
                title: 'chat.html',
                info: types.generic.template
              }
            ]
          }
        };

        return {
          /**
           * Service function to fetch all defined backend and frontend used files.
           *
           * @returns {{}}    All the file definitions
           */
          getAll: function getAll() {
            return data;
          },
          /**
           * Service function to fetch specified GUI used backend and frontend used files.
           *
           * @param   {string}    state
           *
           * @returns {{}}
           */
          get: function get(state) {
            var files = data[state];

            switch (state) {
              case 'app.holder':
              case 'app.territory':
              case 'app.chat':
                files = _.merge(files, generic.backend, generic.frontend);
                break;
              default:
                break;
            }

            return files;
          }
        };
      }
    ])
  ;
}());

/**
 * Angular service to inject lo-dash library to your controllers.
 *
 * Usage example in controller:
 *
 *  angular
 *      .module('app')
 *      .controller('SomeController',
 *          [
 *              '$scope', '_',
 *              function ($scope, _) {
 *                  var foo = _.map(data, function(foo) { return foo.bar = 'foobar'; });
 *              }
 *          ]
 *      );
 *
 * With this you can use lo-dash library easily in your controllers.
 */
(function() {
  'use strict';

  angular.module('frontend.core.libraries')
    .factory('_', [
      '$window',
      function factory($window) {
        return $window._;
      }
    ])
  ;
}());

/**
 * This file contains generic model factory that will return a specified model instance for desired endpoint with
 * given event handlers. Basically all of this boilerplate application individual models are using this service to
 * generate real model.
 */
(function() {
  'use strict';

  angular.module('frontend.core.models')
    .factory('DataModel', [
      '$sailsSocket', '$log',
      '_',
      'DataService',
      function(
        $sailsSocket, $log,
        _,
        DataService
      ) {
        /**
         * Constructor for actual data model.
         *
         * @param   {string}  [endpoint]  Name of the API endpoint
         * @constructor
         */
        var DataModel = function(endpoint) {
          // Initialize default values.
          this.object = {};
          this.objects = [];

          // Cache parameters
          this.cache = {
            count: {},
            fetch: {},
            load: {}
          };

          // Is scope used with data model or not, if yes this is actual scope
          this.scope = false;

          // Scope item names for single, collection and count
          this.itemNames = {
            object: false,
            objects: false,
            count: false
          };

          // Subscribe to specified endpoint
          if (endpoint) {
            this.endpoint = endpoint;

            this._subscribe();
          } else {
            this.endpoint = false;
          }
        };

        //noinspection JSUnusedGlobalSymbols
        /**
         * Service function to set used model endpoint. Note that this will also trigger subscribe for
         * this endpoint actions (created, updated, deleted, etc.).
         *
         * @param {string}  endpoint  Model endpoint definition
         */
        DataModel.prototype.setEndpoint = function setEndpoint(endpoint) {
          var self = this;

          // Set used endpoint
          self.endpoint = endpoint;

          // Subscribe to specified endpoint
          self._subscribe();
        };

        /**
         * Service function to set used model and 'item' names which are updated on specified scope when
         * socket events occurs.
         *
         * @param {{}}              scope
         * @param {string|boolean}  [nameObject]
         * @param {string|boolean}  [nameObjects]
         * @param {string|boolean}  [nameCount]
         */
        DataModel.prototype.setScope = function setScope(scope, nameObject, nameObjects, nameCount) {
          var self = this;

          self.scope = scope;
          self.itemNames = {
            object: nameObject || false,
            objects: nameObjects || false,
            count: nameCount || false
          };
        };

        //noinspection JSUnusedGlobalSymbols
        /**
         * Default behaviour for created objects for specified endpoint. If you need some custom logic
         * for your model, just overwrite this function on your model.
         *
         * @param {{
         *          verb:       String,
         *          data:       {},
         *          id:         Number,
         *          [previous]: {}
         *        }}  message
         */
        DataModel.prototype.handlerCreated = function handlerCreated(message) {
          var self = this;

          $log.log('Object created', self.endpoint, message);

          // Scope is set, so we need to load collection and determine count again
          if (self.scope) {
            if (self.itemNames.objects) {
              self.load(null, true);
            }

            if (self.itemNames.count) {
              self.count(null, true);
            }
          }
        };

        //noinspection JSUnusedGlobalSymbols
        /**
         * Default behaviour for updated objects for specified endpoint. If you need some custom logic
         * for your model, just overwrite this function on your model.
         *
         * @param {{
         *          verb:       String,
         *          data:       {},
         *          id:         Number,
         *          [previous]: {}
         *        }}  message
         */
        DataModel.prototype.handlerUpdated = function handlerUpdated(message) {
          var self = this;

          $log.log('Object updated', self.endpoint, message);

          // Scope is set, so we need to fetch collection and object data again
          if (self.scope) {
            if (self.itemNames.object && parseInt(message.id, 10) === parseInt(self.object.id, 10)) {
              self.fetch(null, null, true);
            }

            if (self.itemNames.objects) {
              self.load(null, true);
            }
          }
        };

        //noinspection JSUnusedGlobalSymbols
        /**
         * Default behaviour for deleted objects for specified endpoint. If you need some custom logic
         * for your model, just overwrite this function on your model.
         *
         * @param {{
         *          verb:       String,
         *          data:       {},
         *          id:         Number,
         *          [previous]: {}
         *        }}  message
         */
        DataModel.prototype.handlerDeleted = function handlerDeleted(message) {
          var self = this;

          $log.log('Object deleted', self.endpoint, message);

          // Scope is set, so we need to fetch collection and object data again
          if (self.scope) {
            if (self.itemNames.object && parseInt(message.id, 10) === parseInt(self.object.id, 10)) {
              $log.warn('How to handle this case?');
            }

            if (self.itemNames.objects) {
              self.load(null, true);
            }

            if (self.itemNames.count) {
              self.count(null, true);
            }
          }
        };

        //noinspection JSUnusedGlobalSymbols
        /**
         * Default behaviour for addedTo events for specified endpoint. If you need some custom logic for
         * your model, just overwrite this function on your model.
         *
         * @param {{
         *          verb:       String,
         *          data:       {},
         *          id:         Number,
         *          [previous]: {}
         *        }}  message
         */
        DataModel.prototype.handlerAddedTo = function handlerAddedTo(message) {
          var self = this;

          $log.log('AddedTo', self.endpoint, message);
        };

        //noinspection JSUnusedGlobalSymbols
        /**
         * Default behaviour for removedFrom events for specified endpoint. If you need some custom logic
         * for your model, just overwrite this function on your model.
         *
         * @param  {{
         *           verb:       String,
         *           data:       {},
         *           id:         Number,
         *           [previous]: {}
         *         }}  message
         */
        DataModel.prototype.handlerRemovedFrom = function handlerRemovedFrom(message) {
          var self = this;

          $log.log('RemovedFrom', self.endpoint, message);
        };

        /**
         * Service function to return count of objects with specified parameters.
         *
         * @param   {{}}        [parameters]    Query parameters
         * @param   {Boolean}   [fromCache]     Fetch with cache parameters
         *
         * @returns {Promise|models.count}
         */
        DataModel.prototype.count = function count(parameters, fromCache) {
          var self = this;

          // Normalize parameters
          parameters = parameters || {};
          fromCache = fromCache || false;

          if (fromCache) {
            parameters = self.cache.count.parameters;
          } else {
            // Store used parameters
            self.cache.count = {
              parameters: parameters
            };
          }

          return DataService
            .count(self.endpoint, parameters)
            .then(
              function onSuccess(response) {
                if (fromCache && self.scope && self.itemNames.count) {
                  self.scope[self.itemNames.count] = response.data.count;
                }

                return response.data;
              },
              function onError(error) {
                $log.error('DataModel.count() failed.', error, self.endpoint, parameters);
              }
            )
          ;
        };

        /**
         * Service function to load objects from specified endpoint with given parameters. Note that this
         * function will also store those objects to current service instance.
         *
         * @param   {{}}        [parameters]    Query parameters
         * @param   {Boolean}   [fromCache]     Fetch with cache parameters
         *
         * @returns {Promise|*}
         */
        DataModel.prototype.load = function load(parameters, fromCache) {
          var self = this;

          // Normalize parameters
          parameters = parameters || {};
          fromCache = fromCache || false;

          if (fromCache) {
            parameters = self.cache.load.parameters;
          } else {
            // Store used parameters
            self.cache.load = {
              parameters: parameters
            };
          }

          return DataService
            .collection(self.endpoint, parameters)
            .then(
              function onSuccess(response) {
                self.objects = response.data;

                if (fromCache && self.scope && self.itemNames.objects) {
                  self.scope[self.itemNames.objects] = self.objects;
                }

                return self.objects;
              },
              function onError(error) {
                $log.error('DataModel.load() failed.', error, self.endpoint, parameters);
              }
            )
          ;
        };

        /**
         * Service function to load single object from specified endpoint with given parameters. Note that
         * this will also store fetched object to current instance of this service.
         *
         * @param   {Number}    identifier      Object identifier
         * @param   {{}}        [parameters]    Query parameters
         * @param   {Boolean}   [fromCache]     Fetch with cache parameters
         *
         * @returns {Promise|*}
         */
        DataModel.prototype.fetch = function fetch(identifier, parameters, fromCache) {
          var self = this;

          // Normalize parameters
          parameters = parameters || {};
          fromCache = fromCache || false;

          if (fromCache) {
            identifier = self.cache.fetch.identifier;
            parameters = self.cache.fetch.parameters;
          } else {
            // Store identifier and used parameters to cache
            self.cache.fetch = {
              identifier: identifier,
              parameters: parameters
            };
          }

          return DataService
            .fetch(self.endpoint, identifier, parameters)
            .then(
              function onSuccess(response) {
                self.object = response.data;

                if (fromCache && self.scope && self.itemNames.object) {
                  self.scope[self.itemNames.object] = self.object;
                }

                return self.object;
              },
              function onError(error) {
                $log.error('DataModel.fetch() failed.', error, self.endpoint, identifier, parameters);
              }
            )
          ;
        };

        /**
         * Service function to create new object to current model endpoint. Note that this will also
         * trigger 'handleMessage' service function, which will handle all necessary updates to current
         * service instance.
         *
         * @param   {{}}    data    Object data to create
         *
         * @returns {Promise|*}
         */
        DataModel.prototype.create = function create(data) {
          var self = this;

          return DataService
            .create(self.endpoint, data)
            .then(
              function onSuccess(result) {
                return result;
              },
              function onError(error) {
                $log.error('DataModel.create() failed.', error, self.endpoint, data);
              }
            )
          ;
        };

        /**
         * Service function to update specified object in current model endpoint. Note that this will also
         * trigger 'handleMessage' service function, which will handle all necessary updates to current
         * service instance.
         *
         * @param   {Number}    identifier  Object identifier
         * @param   {{}}        data        Object data to update
         *
         * @returns {Promise|*}
         */
        DataModel.prototype.update = function update(identifier, data) {
          var self = this;

          return DataService
            .update(self.endpoint, identifier, data)
            .then(
              function onSuccess(result) {
                return result;
              },
              function onError(error) {
                $log.error('DataModel.update() failed.', error, self.endpoint, identifier, data);
              }
            )
          ;
        };

        /**
         * Service function to delete specified object from current model endpoint. Note that this will
         * also trigger 'handleMessage' service function, which will handle all necessary updates to
         * current service instance.
         *
         * @param   {Number}    identifier  Object identifier
         *
         * @returns {Promise|*}
         */
        DataModel.prototype.delete = function deleteObject(identifier) {
          var self = this;

          return DataService
            .delete(self.endpoint, identifier)
            .then(
              function onSuccess(result) {
                return result;
              },
              function onError(error) {
                $log.error('DataModel.delete() failed.', error, self.endpoint, identifier);
              }
            )
          ;
        };

        /**
         * Service function to subscribe model socket events. This is needed to update model data according
         * to another users updates (create, update, delete, etc.) within this model. Basically this will
         * just trigger one of following service function calls:
         *
         *  - handlerCreated
         *  - handlerUpdated
         *  - handlerDeleted
         *  - handlerAddedTo
         *  - handlerRemovedFrom
         *
         * @private
         */
        DataModel.prototype._subscribe = function subscribe() {
          var self = this;

          // Actual subscribe
          $sailsSocket
            .subscribe(self.endpoint, function modelEvent(message) {
              // Handle socket event
              self._handleEvent(message);
            })
          ;
        };

        /**
         * Generic event handler for model events (created, updated, deleted, etc.). This function is
         * called from model socket events and 'create', 'update' and 'delete' service function.
         *
         * @param {{
         *          verb: String,
         *          data: {},
         *          id:   Number
         *        }}  message Message to handle
         *
         * @private
         */
        DataModel.prototype._handleEvent = function handleEvent(message) {
          var self = this;
          var method = 'handler' + message.verb[0].toUpperCase() + message.verb.slice(1);

          if (_.isFunction(self[method])) {
            self[method](message);
          } else {
            $log.log('Implement handling for \'' + message.verb + '\' socket messages');
          }
        };

        return DataModel;
      }
    ])
  ;
}());

/**
 * Generic data service to interact with Sails.js backend. This will just
 * wrap $sailsSocket methods to a single service, that is used from application.
 *
 * This is needed because we need to make some common url handling for sails
 * endpoint.
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('DataService', [
      '$sailsSocket',
      '_',
      'BackendConfig',
      function factory(
        $sailsSocket,
        _,
        BackendConfig
      ) {
        /**
         * Helper function to get "proper" end point url for sails backend API.
         *
         * @param   {string}    endPoint        Name of the end point
         * @param   {number}    [identifier]    Identifier of endpoint object
         *
         * @returns {string}
         * @private
         */
        function _parseEndPointUrl(endPoint, identifier) {
          if (!_.isUndefined(identifier)) {
            endPoint = endPoint + '/' + identifier;
          }

          return BackendConfig.url + '/' + endPoint;
        }

        /**
         * Helper function to parse used parameters in 'get' and 'count' methods.
         *
         * @param   {{}}    parameters  Used query parameters
         *
         * @returns {{params: {}}}
         * @private
         */
        function _parseParameters(parameters) {
          parameters = parameters || {};

          return {params: parameters};
        }

        return {
          /**
           * Service method to get count of certain end point objects.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {{}}        parameters  Used query parameters
           *
           * @returns {Promise|*}
           */
          count: function count(endPoint, parameters) {
            return $sailsSocket
              .get(_parseEndPointUrl(endPoint) + '/count/', _parseParameters(parameters));
          },

          /**
           * Service method to get data from certain end point. This will always return a collection
           * of data.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {{}}        parameters  Used query parameters
           *
           * @returns {Promise|*}
           */
          collection: function collection(endPoint, parameters) {
            return $sailsSocket
              .get(_parseEndPointUrl(endPoint), _parseParameters(parameters));
          },

          /**
           * Service method to get data from certain end point. This will return just a one
           * record as an object.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {number}    identifier  Identifier of endpoint object
           * @param   {{}}        parameters  Used query parameters
           *
           * @returns {Promise|*}
           */
          fetch: function fetch(endPoint, identifier, parameters) {
            return $sailsSocket
              .get(_parseEndPointUrl(endPoint, identifier), _parseParameters(parameters));
          },

          /**
           * Service method to create new object to specified end point.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {{}}        data        Data to update
           *
           * @returns {Promise|*}
           */
          create: function create(endPoint, data) {
            return $sailsSocket
              .post(_parseEndPointUrl(endPoint), data);
          },

          /**
           * Service method to update specified end point object.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {number}    identifier  Identifier of endpoint object
           * @param   {{}}        data        Data to update
           *
           * @returns {Promise|*}
           */
          update: function update(endPoint, identifier, data) {
            return $sailsSocket
              .put(_parseEndPointUrl(endPoint, identifier), data);
          },

          /**
           * Service method to delete specified object.
           *
           * @param   {string}    endPoint    Name of the end point
           * @param   {number}    identifier  Identifier of endpoint object
           *
           * @returns {Promise|*}
           */
          delete: function remove(endPoint, identifier) {
            return $sailsSocket
              .delete(_parseEndPointUrl(endPoint, identifier));
          }
        };
      }
    ])
  ;
}());


/**
 * Service to wrap generic HTTP status specified helper methods. Currently this service has
 * following methods available:
 *
 *  HttpStatusService.getStatusCodeText(httpStatusCode);
 *
 * @todo add more these helpers :D
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('HttpStatusService',
      function factory() {
        return {
          /**
           * Getter method for HTTP status message by given status code.
           *
           * @param   {Number}  statusCode  HTTP status code
           *
           * @returns {String}              Status message
           */
          getStatusCodeText: function getStatusCodeText(statusCode) {
            var output = '';

            switch (parseInt(statusCode.toString(), 10)) {
              // 1xx Informational
              case 100:
                output = 'Continue';
                break;
              case 101:
                output = 'Switching Protocols';
                break;
              case 102:
                output = 'Processing (WebDAV; RFC 2518)';
                break;
              // 2xx Success
              case 200:
                output = 'OK';
                break;
              case 201:
                output = 'Created';
                break;
              case 202:
                output = 'Accepted';
                break;
              case 203:
                output = 'Non-Authoritative Information (since HTTP/1.1)';
                break;
              case 204:
                output = 'No Content';
                break;
              case 205:
                output = 'Reset Content';
                break;
              case 206:
                output = 'Partial Content';
                break;
              case 207:
                output = 'Multi-Status (WebDAV; RFC 4918)';
                break;
              case 208:
                output = 'Already Reported (WebDAV; RFC 5842)';
                break;
              case 226:
                output = 'IM Used (RFC 3229)';
                break;
              // 3xx Redirection
              case 300:
                output = 'Multiple Choices';
                break;
              case 301:
                output = 'Moved Permanently';
                break;
              case 302:
                output = 'Found';
                break;
              case 303:
                output = 'See Other';
                break;
              case 304:
                output = 'Not Modified';
                break;
              case 305:
                output = 'Use Proxy';
                break;
              case 306:
                output = 'Switch Proxy';
                break;
              case 307:
                output = 'Temporary Redirect';
                break;
              case 308:
                output = 'Permanent Redirect (Experimental RFC; RFC 7238)';
                break;
              // 4xx Client Error
              case 400:
                output = 'Bad Request';
                break;
              case 401:
                output = 'Unauthorized';
                break;
              case 402:
                output = 'Payment Required';
                break;
              case 403:
                output = 'Forbidden';
                break;
              case 404:
                output = 'Not Found';
                break;
              case 405:
                output = 'Method Not Allowed';
                break;
              case 406:
                output = 'Not Acceptable';
                break;
              case 407:
                output = 'Proxy Authentication Required';
                break;
              case 408:
                output = 'Request Timeout';
                break;
              case 409:
                output = 'Conflict';
                break;
              case 410:
                output = 'Gone';
                break;
              case 411:
                output = 'Length Required';
                break;
              case 412:
                output = 'Precondition Failed';
                break;
              case 413:
                output = 'Request Entity Too Large';
                break;
              case 414:
                output = 'Request-URI Too Long';
                break;
              case 415:
                output = 'Unsupported Media Type';
                break;
              case 416:
                output = 'Requested Range Not Satisfiable';
                break;
              case 417:
                output = 'Expectation Failed';
                break;
              case 418:
                output = 'I\'m a teapot (RFC 2324)';
                break;
              case 419:
                output = 'Authentication Timeout (not in RFC 2616)';
                break;
              case 420:
                output = 'Method Failure (Spring Framework) / Enhance Your Calm (Twitter)';
                break;
              case 422:
                output = 'Unprocessable Entity (WebDAV; RFC 4918)';
                break;
              case 423:
                output = 'Locked (WebDAV; RFC 4918)';
                break;
              case 424:
                output = 'Failed Dependency (WebDAV; RFC 4918)';
                break;
              case 426:
                output = 'Upgrade Required';
                break;
              case 428:
                output = 'Precondition Required (RFC 6585)';
                break;
              case 429:
                output = 'Too Many Requests (RFC 6585)';
                break;
              case 431:
                output = 'Request Header Fields Too Large (RFC 6585)';
                break;
              case 440:
                output = 'Login Timeout (Microsoft)';
                break;
              case 444:
                output = 'No Response (Nginx)';
                break;
              case 449:
                output = 'Retry With (Microsoft)';
                break;
              case 450:
                output = 'Blocked by Windows Parental Controls (Microsoft)';
                break;
              case 451:
                output = 'Unavailable For Legal Reasons (Internet draft) / Redirect (Microsoft)';
                break;
              case 494:
                output = 'Request Header Too Large (Nginx)';
                break;
              case 495:
                output = 'Cert Error (Nginx)';
                break;
              case 496:
                output = 'No Cert (Nginx)';
                break;
              case 497:
                output = 'HTTP to HTTPS (Nginx)';
                break;
              case 498:
                output = 'Token expired/invalid (Esri)';
                break;
              case 499:
                output = 'Client Closed Request (Nginx) / Token required (Esri)';
                break;
              // 5xx Server Error
              case 500:
                output = 'Internal Server Error';
                break;
              case 501:
                output = 'Not Implemented';
                break;
              case 502:
                output = 'Bad Gateway';
                break;
              case 503:
                output = 'Service Unavailable';
                break;
              case 504:
                output = 'Gateway Timeout';
                break;
              case 505:
                output = 'HTTP Version Not Supported';
                break;
              case 506:
                output = 'Variant Also Negotiates (RFC 2295)';
                break;
              case 507:
                output = 'Insufficient Storage (WebDAV; RFC 4918)';
                break;
              case 508:
                output = 'Loop Detected (WebDAV; RFC 5842)';
                break;
              case 509:
                output = 'Bandwidth Limit Exceeded (Apache bw/limited extension)';
                break;
              case 510:
                output = 'Not Extended (RFC 2774)';
                break;
              case 511:
                output = 'Network Authentication Required (RFC 6585)';
                break;
              case 520:
                output = 'Origin Error (Cloudflare)';
                break;
              case 521:
                output = 'Web server is down (Cloudflare)';
                break;
              case 522:
                output = 'Connection timed out (Cloudflare)';
                break;
              case 523:
                output = 'Proxy Declined Request (Cloudflare)';
                break;
              case 524:
                output = 'A timeout occurred (Cloudflare)';
                break;
              case 598:
                output = 'Network read timeout error (Unknown)';
                break;
              case 599:
                output = 'Network connect timeout error (Unknown)';
                break;
              default:
                output = 'Unknown HTTP status \'' + statusCode + '\', what is this?';
                break;
            }

            return output;
          }
        };
      }
    )
  ;
}());

/**
 * Simple service to return configuration for generic list. This service contains only
 * getter methods that all list views uses in Boilerplate frontend application.
 *
 * So generally you change these getter methods and changes are affected to all list
 * views on application.
 *
 * @todo text translations
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('ListConfig', [
      '_',
      function factory(_) {
        /**
         * List title item configuration.
         *
         * @type  {{
         *          territory: *[],
         *          holder: *[]
         *        }}
         */
        var titleItems = {
          territory: [
            {
              title: 'Koodi',
              column: 'territoryCode',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Tyyppi',
              column: 'type',
              class: 'col-xs-1 mobile-hide',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Käyty',
              column: 'covered',
              class: 'col-xs-1',
              searchable: false,
              sortable: true,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Omistajalle',
              column: 'taken',
              class: 'col-xs-1 mobile-hide',
              searchable: false,
              sortable: true,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Attribuutit',
              column: false,
              class: 'col-xs-1 mobile-hide',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Kuvaus',
              column: 'description',
              class: 'col-xs-4 mobile-hide',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Omistaja',
              column: false,
              class: 'col-xs-2',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Valinta',
              column: false,
              class: 'text-center',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            }
          ],
          holder: [
            {
              title: 'Nimi',
              column: 'name',
              class: 'col-xs-3',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Sähköposti',
              column: 'email',
              class: 'col-xs-3 mobile-hide',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Puhelin',
              column: 'telephone',
              class: 'col-xs-2 mobile-hide',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Kuvaus',
              column: 'description',
              class: 'col-xs-4 text-left',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Alueita',
              column: false,
              class: 'col-xs-1 text-left',
              searchable: false,
              sortable: true,
              inSearch: false,
              inTitle: true
            }
          ],
          requestLog: [
            {
              title: 'Aika',
              column: 'createdAt',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Metodi',
              column: 'method',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Url',
              column: 'url',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Sisältö',
              column: 'body',
              class: 'col-xs-3',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Käyttäjänimi',
              column: 'user',
              class: 'col-xs-2',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Nimi',
              column: 'firstName',
              class: 'col-xs-1',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Tyyppi',
              column: 'user',
              class: 'col-xs-2',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            }
          ],
          userlogin: [
            {
              title: 'IP-osoite',
              column: 'ip',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Selain',
              column: 'browser',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Käyttöjärjestelmä',
              column: 'os',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Käyttäjänimi',
              column: false,
              class: 'col-xs-2',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Kirjautumisaika',
              column: 'createdAt',
              class: 'col-xs-4',
              searchable: false,
              sortable: true,
              inSearch: false,
              inTitle: true
            }
          ],
          user: [
            {
              title: 'Etunimi',
              column: 'firstName',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Sukunimi',
              column: 'lastName',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Käyttäjänimi',
              column: 'username',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Sähköposti',
              column: 'email',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Tyyppi',
              column: 'admin',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Luotu',
              column: 'createdAt',
              class: 'col-xs-3',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            }
          ]
        };

        return {
          /**
           * Getter method for list default settings.
           *
           * @returns {{
           *            itemCount:            Number,
           *            items:                Array,
           *            itemsPerPage:         Number,
           *            itemsPerPageOptions:  Array,
           *            currentPage:          Number,
           *            where:                {},
           *            loading:              Boolean,
           *            loaded:               Boolean
           *          }}
           */
          getConfig: function getConfig() {
            return {
              itemCount: 0,
              items: [],
              itemsPerPage: 10,
              itemsPerPageOptions: [10, 25, 50, 100],
              currentPage: 1,
              where: {},
              loading: true,
              loaded: false
            };
          },

          /**
           * Getter method for lists title items. These are defined in the 'titleItems'
           * variable.
           *
           * @param   {String}    model   Name of the model
           *
           * @returns {Array}
           */
          getTitleItems: function getTitleItems(model) {
            return _.isUndefined(titleItems[model]) ? [] : titleItems[model];
          }
        };
      }
    ])
  ;
}());

/**
 * Generic data service to interact with Sails.js backend. This will just
 * wrap $sailsSocket methods to a single service, that is used from application.
 *
 * This is needed because we need to make some common url handling for sails
 * endpoint.
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('MailService', [
      '$sailsSocket',
      'BackendConfig',
      function factory(
        $sailsSocket,
        BackendConfig
      ) {
        return {
          count: function count() {
            return $sailsSocket
              .get(BackendConfig.url + '/mail/count');
          },
          send: function send(data) {
            return $sailsSocket
              .post(BackendConfig.url + '/mail/send', data);
          },
          backup: function backup() {
            return $sailsSocket
              .post(BackendConfig.url + '/mail/backup', null);
          }
        };
      }
    ])
  ;
}());

/**
 * Simple service to activate noty2 message to GUI. This service can be used every where in application. Generally
 * all $http and $socket queries uses this service to show specified errors to user.
 *
 * Service can be used as in following examples (assuming that you have inject this service to your controller):
 *  Message.success(message, [title], [options]);
 *  Message.error(message, [title], [options]);
 *  Message.message(message, [title], [options]);
 *
 * Feel free to be happy and code some awesome stuff!
 *
 * @todo do we need some queue dismiss?
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('MessageService', [
      'toastr', '_',
      function factory(toastr, _) {
        var service = {};

        /**
         * Private helper function to make actual message via toastr component.
         *
         * @param   {string}  message         Message content
         * @param   {string}  title           Message title
         * @param   {{}}      options         Message specified options
         * @param   {{}}      defaultOptions  Default options for current message type
         * @param   {string}  type            Message type
         * @private
         */
        function _makeMessage(message, title, options, defaultOptions, type) {
          title = title || '';
          options = options || {};

          toastr[type](message, title, _.assign(defaultOptions, options));
        }

        /**
         * Method to generate 'success' message.
         *
         * @param   {string}  message   Message content
         * @param   {string}  [title]   Message title
         * @param   {{}}      [options] Message options
         */
        service.success = function success(message, title, options) {
          var defaultOptions = {
            timeOut: 2000
          };

          _makeMessage(message, title, options, defaultOptions, 'success');
        };

        /**
         * Method to generate 'info' message.
         *
         * @param   {string}  message   Message content
         * @param   {string}  [title]   Message title
         * @param   {{}}      [options] Message options
         */
        service.info = function error(message, title, options) {
          var defaultOptions = {
            timeout: 3000
          };

          _makeMessage(message, title, options, defaultOptions, 'info');
        };

        /**
         * Method to generate 'warning' message.
         *
         * @param   {string}  message   Message content
         * @param   {string}  [title]   Message title
         * @param   {{}}      [options] Message options
         */
        service.warning = function error(message, title, options) {
          var defaultOptions = {
            timeout: 3000
          };

          _makeMessage(message, title, options, defaultOptions, 'warning');
        };

        /**
         * Method to generate 'error' message.
         *
         * @param   {string}  message   Message content
         * @param   {string}  [title]   Message title
         * @param   {{}}      [options] Message options
         */
        service.error = function error(message, title, options) {
          var defaultOptions = {
            timeout: 4000
          };

          _makeMessage(message, title, options, defaultOptions, 'error');
        };

        return service;
      }
    ])
  ;
}());

/**
 * Generic data service to interact with Sails.js backend. This will just
 * wrap $sailsSocket methods to a single service, that is used from application.
 *
 * This is needed because we need to make some common url handling for sails
 * endpoint.
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('PasswordService', [
      '$sailsSocket',
      'BackendConfig',
      function factory(
        $sailsSocket,
        BackendConfig
      ) {
        return {
          updatePassword: function updatePassword(data) {
            return $sailsSocket
              .post(BackendConfig.url + '/user/password', data);
          }
        };
      }
    ])
  ;
}());

/**
 * Simple angular service to parse search filters for socket queries. Usage example:
 *
 *  $sailsSocket
 *    .get("/Book/", {
 *      params: {
 *        where: SocketHelperService.getWhere($scope.filters)
 *      }
 *    })
 *    .then(
 *      function successCb(response) {
 *        // Do your data handling here
 *      }
 *      function errorCb(response) {
 *        // Do your error handling here
 *      }
 *    );
 *
 * @todo add more complex parameter handling
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('SocketHelperService', [
      '_',
      function factory(_) {
        return {
          getWhere: function getWhere(filters, defaults) {
            var output = defaults || {};

            // Determine search columns
            var columns = _.filter(filters.columns, function iterator(column) {
              return column.inSearch;
            });

            // Determine search words
            var words = (filters.searchWord && filters.searchWord.length > 0) ? _.filter(filters.searchWord.split(' ')) : [];

            // We have some search word(s) and column(s)
            if (columns.length > 0 && words.length > 0) {
              var conditions = [];

              // Iterate each columns
              _.forEach(columns, function iteratorColumns(column) {

                // Iterate each search word
                _.forEach(words, function iteratorWords(word) {
                  var condition = {};

                  // Create actual condition and push that to main condition
                  condition[column.column] = {contains: word};

                  conditions.push(condition);
                });
              });

              output = {or: conditions};
            }

            return output;
          }
        };
      }
    ])
  ;
}());
(function() {
  'use strict';

  // Define frontend.admin module.user
  angular.module('frontend.profile', []);

  // Controller to edit single profile on GUI
  angular.module('frontend.profile')
    .controller('ProfileController', [
      '$scope', '$state', '$http',
      'UserService', 'MessageService', 'PasswordService',
      'UserModel',
      '_user',
      function controller(
        $scope, $state, $http,
        UserService, MessageService, PasswordService,
        UserModel, _user
      ) {
        // Set current scope reference to model
        UserModel.setScope($scope, 'user');

        // Initialize scope data
        $scope.currentUser = UserService.user();
        $scope.user = _user;

        $scope.saveUser = function saveUser() {
          var data = angular.copy($scope.user);

          // Make actual data update
          UserModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Käyttäjä "' + $scope.user.username + '" päivitettiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
              }
            )
          ;
        };

        $scope.saveNewPassword = function saveNewPassword() {
          var data = {
          	userid: _user.id,
          	password1: $scope.password1
          };

          PasswordService.updatePassword(data)
          .then(
            function onSuccess() {
              MessageService.success('Käyttäjän "' + $scope.user.username + '" salasana asetettiin.');
              $scope.password2 = '';
            },
            function onError(error) {
              MessageService.error('Käyttäjän "' + $scope.user.username + '" salasanan tallennus epäonnistui.');
            }
          );
        };
      }
    ])
  ;

}());

/**
 * Angular module for admin component. All of these are wrapped to 'frontend.admin.login-history' angular module. This
 * component is divided to following logical components:
 *
 *  frontend.admin.login-history
 *
 * Also this file contains all necessary information about 'frontend.admin' module route definitions.
 */
(function() {
  'use strict';

  // Define frontend.admin module
  angular.module('frontend.admin', [
    'frontend.admin.login-history',
    'frontend.admin.migrate',
    'frontend.admin.user',
    'frontend.admin.request-log'
  ]);

  // Module configuration
  angular.module('frontend.admin')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('admin', {
            parent: 'frontend',
            data: {
              access: 2
            },
            views: {
              'content@': {
                controller: [
                  '$state',
                  function($state) {
                    $state.go('admin.login-history');
                  }
                ]
              },
              'pageNavigation@': {
                templateUrl: '/frontend/core/layout/partials/navigation.html',
                controller: 'NavigationController',
                resolve: {
                  _items: [
                    'ContentNavigationItems',
                    function resolve(ContentNavigationItems) {
                      return ContentNavigationItems.getItems('admin');
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

/**
 * Angular module for app component. This component is divided to following logical components:
 *
 *  frontend.app.about
 *  frontend.app.author
 *  frontend.app.holder
 *  frontend.app.chat
 *  frontend.app.messages
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
  'use strict';

  // Define frontend.admin module
  angular.module('frontend.app', [
    'frontend.app.about',
    'frontend.app.territory',
    'frontend.app.territoryHolderHistory',
    'frontend.app.holder',
    'frontend.app.coordinate',
    'frontend.app.territoryLinkAttribute',
    'frontend.app.specialAddress',
    'frontend.app.attribute',
    'frontend.app.app',
    'frontend.app.stat',
    'frontend.app.chat',
    'frontend.app.messages'
  ]);

  // Module configuration
  angular.module('frontend.app')
    .config([
      '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('app', {
            parent: 'frontend',
            data: {
              access: 1
            },
            views: {
              'content@': {
                controller: [
                  '$state',
                  function($state) {
                    $state.go('app.territory');
                  }
                ]
              },
              'pageNavigation@': {
                templateUrl: '/frontend/core/layout/partials/navigation.html',
                controller: 'NavigationController',
                resolve: {
                  _items: [
                    'ContentNavigationItems',
                    function resolve(ContentNavigationItems) {
                      return ContentNavigationItems.getItems('app');
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

/**
 * Angular module for 'core' component. This component is divided to following logical components:
 *
 *  frontend.core.dependencies
 *  frontend.core.auth
 *  frontend.core.components
 *  frontend.core.directives
 *  frontend.core.error
 *  frontend.core.filters
 *  frontend.core.interceptors
 *  frontend.core.layout
 *  frontend.core.libraries
 *  frontend.core.models
 *  frontend.core.services
 */
(function() {
  'use strict';

  // Define frontend.core module
  angular.module('frontend.core', [
    'frontend.core.dependencies', // Note that this must be loaded first
    'frontend.core.auth',
    'frontend.core.components',
    'frontend.core.directives',
    'frontend.core.error',
    'frontend.core.filters',
    'frontend.core.interceptors',
    'frontend.core.layout',
    'frontend.core.libraries',
    'frontend.core.models',
    'frontend.core.services',
    'frontend.core.i18n'
  ]);
}());

/**
 * Directive to create search component for lists. This is used generally in all lists on application. Basically
 * this directive just manipulates given filters and items per page variables. Directive needs three attributes to
 * work:
 *  1) filters, filter data
 *  2) options, items per page options
 *  3) items, current items per page value
 *
 * Passed filters must be in following format:
 *  $scope.filters = {
 *    searchWord: '',
 *    columns: $scope.items
 *  };
 *
 * Where '$scope.items' is array of objects like:
 *  $scope.items = [
 *    {
 *      title: 'Object',
 *      column: 'objectName',
 *      searchable: true,
 *      sortable: true,
 *      inSearch: true,
 *      inTitle: true
 *    },
 *  ];
 *
 * Usage example:
 *
 *  <list-search
 *      data-filters="filters"
 *      data-options="itemsPerPageOptions"
 *      data-items="itemsPerPage"
 *  ></list-search>
 */
(function() {
  'use strict';

  angular.module('frontend.core.directives')
    .directive('listSearch', function directive() {
      return {
        restrict: 'E',
        scope: {
          filters: '=',
          holders: '=',
          attributes: '=',
          items: '=',
          options: '='
        },
        replace: true,
        templateUrl: '/frontend/core/directives/partials/ListSearch.html',
        controller: [
          '$scope',
          function controller($scope) {
            $scope.id = Math.floor((Math.random() * 6) + 1);

            $scope.inSearch = function inSearch(item) {
              return (!angular.isUndefined(item.searchable)) ? item.searchable : false;
            };
          }
        ]
      };
    })
  ;
}());

/**
 * Frontend application definition.
 *
 * This is the main file for the 'Frontend' application.
 */
(function() {
  'use strict';

  // Create frontend module and specify dependencies for that
  angular.module('frontend', [
    'frontend-templates',
    'frontend.core',
    'frontend.app',
    'frontend.profile',
    'frontend.admin'
  ]);

  /**
   * Configuration for frontend application, this contains following main sections:
   *
   *  1) Configure $httpProvider and $sailsSocketProvider
   *  2) Set necessary HTTP and Socket interceptor(s)
   *  3) Turn on HTML5 mode on application routes
   *  4) Set up application routes
   */
  angular.module('frontend')
    .config([
      '$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$sailsSocketProvider',
      '$tooltipProvider', 'cfpLoadingBarProvider',
      'toastrConfig',
      'AccessLevels',
      function config(
        $stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $sailsSocketProvider,
        $tooltipProvider, cfpLoadingBarProvider,
        toastrConfig,
        AccessLevels
      ) {
        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // Add interceptors for $httpProvider and $sailsSocketProvider
        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('ErrorInterceptor');

        // Iterate $httpProvider interceptors and add those to $sailsSocketProvider
        angular.forEach($httpProvider.interceptors, function iterator(interceptor) {
          $sailsSocketProvider.interceptors.push(interceptor);
        });

        // Set tooltip options
        $tooltipProvider.options({
          appendToBody: true
        });

        // Disable spinner from cfpLoadingBar
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 200;

        // Extend default toastr configuration with application specified configuration
        angular.extend(
          toastrConfig,
          {
            allowHtml: true,
            closeButton: true,
            extendedTimeOut: 3000
          }
        );

        // Yeah we wanna to use HTML5 urls!
        $locationProvider
          .html5Mode({
            enabled: true,
            requireBase: false
          })
          .hashPrefix('!')
        ;

        // Routes that needs authenticated user
        $stateProvider
          .state('profile', {
            abstract: true,
            template: '<ui-view/>',
            parent: 'frontend',
            data: {
              access: AccessLevels.user
            }
          })
          .state('profile.edit', {
            url: '/profile/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/profile/profile.html',
                controller: 'ProfileController',
                resolve: {
                  _user: [
                    '$stateParams',
                    'UserModel',
                    function resolve(
                      $stateParams,
                      UserModel
                    ) {
                      return UserModel.fetch($stateParams.id);
                    }
                  ]
                }
              }
            }

          })
        ;

        // Main state provider for frontend application
        $stateProvider
          .state('frontend', {
            abstract: true,
            views: {
              header: {
                templateUrl: '/frontend/core/layout/partials/header.html',
                controller: 'HeaderController'
              },
              footer: {
                templateUrl: '/frontend/core/layout/partials/footer.html',
                controller: 'FooterController'
              }
            }
          })
        ;

        // For any unmatched url, redirect to /about
        $urlRouterProvider.otherwise('/login');
      }
    ]
  )
  .config(["uiGmapGoogleMapApiProvider", function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyCEGiaZcIX3dFBOH5KLfrv6R8lvL-bdujQ',
          v: '3.24', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  }])
  ;

  /**
   * Frontend application run hook configuration. This will attach auth status
   * check whenever application changes URL states.
   */
  angular.module('frontend')
    .run([
      '$rootScope', '$state', '$injector',
      'editableOptions',
      'AuthService',
      function run(
        $rootScope, $state, $injector,
        editableOptions,
        AuthService
      ) {
        // Set usage of Bootstrap 3 CSS with angular-xeditable
        editableOptions.theme = 'bs3';
        editableOptions.icon_set = 'font-awesome';

        /**
         * Route state change start event, this is needed for following:
         *  1) Check if user is authenticated to access page, and if not redirect user back to login page
         */
        $rootScope.$on('$stateChangeStart', function stateChangeStart(event, toState) {
          if (!AuthService.authorize(toState.data.access)) {
            event.preventDefault();

            $state.go('auth.login');
          }
        });

        // Check for state change errors.
        $rootScope.$on('$stateChangeError', function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
          event.preventDefault();

          $injector.get('MessageService')
            .error('Virhe sivua ladattaessa.');

          $state.get('error').error = {
            event: event,
            toState: toState,
            toParams: toParams,
            fromState: fromState,
            fromParams: fromParams,
            error: error
          };

          console.log(error);

          return $state.go('error');
        });
      }
    ])
  ;
}());

/**
 * Frontend application access level constant definitions. These are used to to restrict access to certain routes in
 * application.
 *
 * Note that actual access check is done by currently signed in user.
 */
(function() {
  'use strict';

  angular.module('frontend')
    .constant('AccessLevels', {
      anon: 0,
      user: 1,
      admin: 2
    })
  ;
}());

/**
 * Frontend application backend constant definitions. This is something that you must define in your application.
 *
 * Note that 'BackendConfig.url' is configured in /frontend/config/config.json file and you _must_ change it to match
 * your backend API url.
 */
(function() {
  'use strict';

  angular.module('frontend')
    .constant('BackendConfig', {
      url: window.io.sails.url
    })
  ;
}());
