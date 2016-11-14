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
          .state('admin.user.add', {
            url: '/admin/user/add',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/user/add.html',
                controller: 'UserAddController',
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
                  ]
                }
              }
            }
          })

          // Single user
          .state('admin.user', {
            url: '/examples/user/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/user/user.html',
                controller: 'UserController',
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
          .state('admin.users', {
            url: '/admin/users/',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/user/index.html',
                controller: 'UsersController',
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
                        populate: ''
                      };

                      return UserModel.load(parameters);
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
    'highcharts-ng'
  ]);
}());

// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.directives', []);
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

/**
 * Angular module for frontend.examples.about component. Basically this file contains actual angular module initialize
 * and route definitions for this module.
 */
(function() {
  'use strict';

  // Define frontend.public module
  angular.module('frontend.examples.about', []);

  // Module configuration
  angular.module('frontend.examples.about')
    .config([
      '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('examples.about', {
            url: '/about',
            data: {
              access: 0
            },
            views: {
              'content@': {
                templateUrl: '/frontend/examples/about/about.html'
              },
              'pageNavigation@': false
            }
          })
        ;
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

  // Define frontend.examples.coordinate angular module
  angular.module('frontend.examples.app', []);

  // Module configuration
  angular.module('frontend.examples.app')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          // Single app
          .state('examples.app', {
            url: '/examples/app/',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/app/app.html',
                controller: 'AppController',
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

  // Define frontend.examples.coordinate angular module
  angular.module('frontend.examples.attribute', []);

  // Module configuration
  angular.module('frontend.examples.attribute')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          // Single attribute
          .state('examples.attributes', {
            url: '/examples/attributes/',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/attributes/attributes.html',
                controller: 'AttributesController',
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
 * All of these are wrapped to 'frontend.examples.chat' angular module.
 */
(function() {
  'use strict';

  // Define frontend.examples.chat angular module
  angular.module('frontend.examples.chat', []);

  // Module configuration
  angular.module('frontend.examples.chat')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Chat
          .state('examples.chat', {
            url: '/examples/chat',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/chat/chat.html',
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
 * This file contains all necessary Angular model definitions for 'frontend.examples.coordinate
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  // Define frontend.examples.coordinate angular module
  angular.module('frontend.examples.coordinate', []);

  /**
   * Model for Coordinate API, this is used to wrap all Coordinate objects specified actions and data change actions.
   */
  angular.module('frontend.examples.coordinate')
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
 * All of these are wrapped to 'frontend.examples.messages' angular module.
 */
(function() {
  'use strict';

  // Define frontend.examples.messages angular module
  angular.module('frontend.examples.messages', []);

  // Module configuration
  angular.module('frontend.examples.messages')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Messages
          .state('examples.messages', {
            url: '/examples/messages',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/messages/messages.html',
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

/**
 * This file contains all necessary Angular model definitions for 'frontend.examples.territoryLinkAttribute
' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  // Define frontend.examples.territoryLinkAttribute angular module
  angular.module('frontend.examples.territoryLinkAttribute', []);

  /**
   * Model for TerritoryLinkAttribute API, this is used to wrap all TerritoryLinkAttribute objects specified actions and data change actions.
   */
  angular.module('frontend.examples.territoryLinkAttribute')
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
                            'territoryLinkAttribute'
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

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/profile/profile.html',
    '<div data-ng-show="!user"><h3>Requested user not found</h3></div><div data-ng-show="user"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveUser()"><div class="row"><div class="col-sm-4"><h3>{{user.firstName}} {{user.lastName}} <span class="pull-right" data-ng-show="!editableForm.$visible"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h3><dl><dt>Email</dt><dd><span style="width: 100%" data-editable-text="user.email" data-e-name="user.email" data-e-required>{{user.email}}</span></dd><dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">Save</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel()">Cancel</button></div></div></dl></dl></div></div></form><form class="form-vertical" role="form" name="passwordForm" data-ng-submit="saveNewPassword()"><div class="row"><div class="col-sm-4"><div class="form-group" style="margin-top: 10px">New password: <input type="password" class="form-control" name="password1" required placeholder="Enter user\'s password" minlength="8" data-ng-model="password1"></div><div class="form-group" style="margin-top: 10px">Repeat new password: <input type="password" class="form-control" name="password2" required placeholder="Enter user\'s password, again" data-ng-model="password2"></div><div><input type="submit" class="btn btn-primary" data-ng-disabled="password1 == null || password1 != password2" value="Save new password"></div></div></div></form></div>');
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
    '<h3>User login history ({{itemCount}})<div class="col-xs-6 pull-right list-search"><list-search data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search><pagination class="pagination-sm" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="10" data-boundary-links="true" data-rotate="false"></pagination></div></h3><table class="table"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title"></span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody><tr data-ng-repeat="item in items"><td class="col-xs-2">{{item.ip}}</td><td class="col-xs-2">{{item.browser}}</td><td class="col-xs-2">{{item.os}}</td><td class="col-xs-2">{{item.user.lastName}}, {{item.user.firstName}} <span class="text-muted">({{item.user.username}})</span></td><td class="col-xs-4">{{item.createdAt | amDateFormat : \'LLLL\'}}, <span data-am-time-ago="item.createdAt"></span></td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>no data founded...</em></td></tr></tbody></table><pagination class="pagination-sm pull-right" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="10" data-boundary-links="true" data-rotate="false"></pagination><div class="clearfix"></div><div class="row"><div class="col-xs-4"><highchart id="statsBrowser" config="chartBrowser"></highchart></div><div class="col-xs-4"><highchart id="statsOs" config="chartOs"></highchart></div><div class="col-xs-4"><highchart id="statsUser" config="chartUser"></highchart></div></div>');
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
    '<form class="form-vertical" role="form" name="userForm" data-ng-submit="addUser()"><div class="row"><div class="col-md-12"><div class="form-group" style="margin-top: 10px">First name: <input class="form-control" name="user.firstName" required placeholder="Enter user\'s first name" data-ng-model="user.firstName"></div><div class="form-group" style="margin-top: 10px">Last name: <input class="form-control" name="user.lastName" required placeholder="Enter user\'s last name" data-ng-model="user.lastName"></div><div class="form-group" style="margin-top: 10px">Username: <input class="form-control" name="user.username" required placeholder="Enter user\'s username" data-ng-model="user.username"></div><div class="form-group" style="margin-top: 10px">Password: <input class="form-control" name="user.password1" required placeholder="Enter user\'s password" minlength="8" data-ng-model="user.password1"></div><div class="form-group" style="margin-top: 10px">Repeat password: <input class="form-control" name="user.password2" required placeholder="Enter user\'s password, again" data-ng-model="user.password2"></div><div class="form-group" style="margin-top: 10px">Email: <input class="form-control" name="user.email" required placeholder="Enter user\'s email" data-ng-model="user.email"></div><div class="checkbox"><label><input type="checkbox" name="user.admin" data-ng-model="user.admin"> User is admin</label></div><button type="submit" class="btn btn-primary" data-ng-disabled="!userForm.$valid && user.password1 != user.password2">Save</button></div></div></form>');
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
    '<h3>Users ({{items.length}})<div class="col-xs-6 pull-right list-search"><a data-ui-sref="admin.user.add" data-tooltip="Add new user"><i class="fa fa-plus-circle"></i></a><list-search data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search><pagination class="pagination-sm" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="10" data-boundary-links="true" data-rotate="false"></pagination></div></h3><table class="table"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title"></span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody><tr data-ng-repeat="item in items"><td class="col-xs-2">{{item.firstName}}</td><td class="col-xs-2">{{item.lastName}}</td><td class="col-xs-1"><a data-ui-sref="admin.user({id: item.id})"><span style="{{item.archived ? \'text-decoration: line-through\':\'\'}}">{{item.username}}</span></a></td><td class="col-xs-2">{{item.email}}</td><td class="col-xs-2">{{item.admin ? \'admin\':\'regular user\'}} <span data-ng-if="item.archived">(archived)</span></td><td class="col-xs-3">{{item.createdAt | date : \'dd.MM.yyyy\'}}, <span data-am-time-ago="item.createdAt"></span></td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>no data founded...</em></td></tr></tbody></table><pagination class="pagination-sm pull-right" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="10" data-boundary-links="true" data-rotate="false"></pagination>');
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
    '<div data-ng-show="!user"><h3>Requested user not found</h3></div><div data-ng-show="user"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveUser()"><div class="row"><div class="col-sm-4"><h3><span style="width: 100%" data-editable-text="user.firstName" data-e-name="user.firstName" data-e-required>{{user.firstName}}</span> <span style="width: 100%" data-editable-text="user.lastName" data-e-name="user.lastName" data-e-required>{{user.lastName}}</span> <span class="pull-right" data-ng-show="!editableForm.$visible && user.admin"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h3><dl><dt>Email</dt><dd><span style="width: 100%" data-editable-text="user.email" data-e-name="user.email" data-e-required>{{user.email}}</span></dd><dt>Is archived</dt><dd><span data-editable-checkbox="user.archived" data-e-title="User is not in use">{{user.archived ? \'Yes\' : \'No\'}}</span></dd><dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">Save</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel()">Cancel</button></div></div></dl></dl></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/about/about.html',
    '<h3>Aluehallintasovellus <em>v2.0</em></h3><div class="row"><div class="col-sm-12"><p>Tämä aluehallintasovellus on tarkoitettu helpottamaan alueveljien työtä ja tarjoamaan ajantasaista tietoa seurakunnan aluetilanteesta.</p><h4>Tärkeimmät ominaisuudet</h4><ul><li>Alueiden merkitseminen eri omistajille ja käydyksi</li><li>Sopivien alueiden etsiminen eri attribuuttien mukaisesti</li><li>Käyttäjäoikeustasot, joiden avulla eri käyttäjien toimia voidaan hallita</li><li>Alueiden antaminen julistajille sähköpostilla tai PDF-tiedostona</li><li>Sähköpostimuistutukset alueiden käymisestä</li><li>Seurakunnan alueiden esittäminen havainnollisena karttana</li><li>S-13 -lomake</li></ul></div></div><p>Use following credentials for login:<pre>\n' +
    'username: demo\n' +
    'password: demodemodemo</pre></p>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/app/app.html',
    '<div data-ng-show="!app"><h3>App not found</h3></div><div data-ng-show="app"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveApp()"><div class="row"><div class="col-sm-8"><h3><span style="width: 100%" data-editable-text="app.name" data-e-name="app.name" data-e-required>{{app.name}}</span> <span class="pull-right" data-ng-show="!editableForm.$visible && user.admin"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h3><dl><dt>Default holder</dt><dd><span data-editable-select="app.defaultHolder.id" data-e-name="defaultHolder.id" data-e-ng-options="holder.id as holder.name for holder in holders" data-e-required>{{app.defaultHolder.name}}</span></dd><dt>Backup email</dt><dd><span style="width: 100%" data-editable-text="app.backupEmail" data-e-name="app.backupEmail" data-e-required>{{app.backupEmail}}</span></dd><dt>Backup interval (days)</dt><dd><span style="width: 100%" data-editable-number="app.backupInterval" data-e-min="1" data-e-name="app.backupInterval" data-e-required>{{app.backupInterval}}</span></dd><dt>Limit for not covered territories (days)</dt><dd><span style="width: 100%" data-editable-number="app.notCoveredLimit" data-e-min="1" data-e-name="app.notCoveredLimit" data-e-required>{{app.notCoveredLimit}}</span></dd><dt>Limit for warning email about not covered territories (days)</dt><dd><span style="width: 100%" data-editable-number="app.notCoveredWarningEmailLimit" data-e-min="1" data-e-name="app.notCoveredWarningEmailLimit" data-e-required>{{app.notCoveredWarningEmailLimit}}</span></dd><dt>Limit for warning about not changed holder (days)</dt><dd><span style="width: 100%" data-editable-number="app.holderNotChangedWarningLimit" data-e-min="1" data-e-name="app.holderNotChangedWarningLimit" data-e-required>{{app.holderNotChangedWarningLimit}}</span></dd><dt>Default latitude</dt><dd><span style="width: 100%" data-editable-number="app.defaultLatitude" data-e-min="-90" data-e-max="90" data-e-step="any" data-e-name="app.defaultLatitude" data-e-required>{{app.defaultLatitude}}</span></dd><dt>Default longitude</dt><dd><span style="width: 100%" data-editable-number="app.defaultLongitude" data-e-min="-180" data-e-max="180" data-e-step="any" data-e-name="app.defaultLongitude" data-e-required>{{app.defaultLongitude}}</span></dd><dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">Save</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel()">Cancel</button></div></div></dl></dl></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/attributes/attributes.html',
    '<div data-ng-show="!attributes.length"><h3>Attributes not found</h3></div><div data-ng-show="attributes.length"><table class="table table-condensed table-hover"><thead><tr><th>Name</th><th>Description</th><th>Icon</th><th>Icon example</th><th>Action</th></tr></thead><tbody data-ng-repeat="a in attributes"><tr><td><span data-editable-text="a.name" data-e-name="a.name" data-e-required data-onaftersave="updateAttribute(a)">{{a.name}}</span></td><td><span data-editable-text="a.description" data-e-name="a.description" data-e-required data-onaftersave="updateAttribute(a)">{{a.description}}</span></td><td><span data-editable-text="a.icon" data-e-name="a.icon" data-e-required data-onaftersave="updateAttribute(a)">{{a.icon}}</span></td><td><span class="fa fa-{{a.icon}}"></span></td><td><a data-ng-click="deleteAttribute(a)"><span title="Remove attribute" class="fa fa-trash"></span></a></td></tr></tbody></table></div><h3>Create new attribute</h3><form class="form-verical col-md-4" name="newAttributeForm" data-ng-submit="createAttribute(newAttribute)"><div class="form-group"><label for="name">Name</label><input data-ng-model="newAttribute.name" required class="form-control" id="name" placeholder="Elevator"></div><div class="form-group"><label for="description">Description</label><input data-ng-model="newAttribute.description" max-length="100" required class="form-control" id="description" placeholder="The territory has elevator"></div><div class="form-group"><label for="icon">Icon</label><input data-ng-model="newAttribute.icon" required class="form-control" id="icon" placeholder="Font Awesome icon, e.g. arrows-v"></div><input type="submit" id="submit" value="Create" class="btn btn-primary"></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/chat/chat-info.html',
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
  $templateCache.put('/frontend/examples/chat/chat.html',
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
  $templateCache.put('/frontend/examples/holder/add.html',
    '<form class="form-vertical" role="form" name="holderForm" data-ng-submit="addHolder()"><div class="row"><div class="col-lg-8"><div class="form-group" style="margin-top: 10px"><input class="form-control" required name="name" placeholder="Enter holder name" data-ng-model="holder.name"></div><div class="form-group"><input type="email" class="form-control" required name="email" placeholder="Enter holder email" data-ng-model="holder.email"></div><div class="form-group"><input class="form-control" name="telephone" placeholder="Enter holder telephone" data-ng-model="holder.telephone"></div><div class="form-group"><input class="form-control" name="description" placeholder="Enter holder description" data-ng-model="holder.description"></div><div class="checkbox"><label><input type="checkbox" name="emailValid" data-ng-model="holder.emailValid"> Email address is in use</label></div><div><button type="submit" class="btn btn-primary" data-ng-disabled="!holderForm.$valid">Save</button></div></div></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/holder/holder.html',
    '<div data-ng-show="!holder"><h3>Requested holder not found</h3></div><div data-ng-show="holder"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveHolder()"><div class="row"><div class="col-sm-4"><h3><span style="width: 100%" data-editable-text="holder.name" data-e-name="holder.name" data-e-required>{{holder.name}}</span> <span class="pull-right" data-ng-show="!editableForm.$visible && user.admin"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h3><dl><dt>Email</dt><dd><span style="width: 100%" data-editable-text="holder.email" data-e-name="holder.email" data-e-required>{{holder.email}}</span></dd><dt>Email in use</dt><dd><span data-editable-checkbox="holder.emailValid" data-e-title="Email address is in use">{{holder.emailValid ? \'Yes\' : \'No\'}}</span></dd><dt>Telephone</dt><dd><span style="width: 100%" data-editable-text="holder.telephone" data-e-name="holder.telephone">{{holder.telephone}}</span></dd><dd><dt>Description</dt></dd><dd><p data-editable-textarea="holder.description" data-e-name="holder.description">{{holder.description}}</p></dd><dt>Is archived</dt><dd><span data-editable-checkbox="holder.isArchived" data-e-title="Holder is not in use">{{holder.isArchived ? \'Yes\' : \'No\'}}</span></dd><dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">Save</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel()">Cancel</button> <button type="button" class="btn btn-danger pull-right" data-ng-bootbox-title="Danger - Danger - Danger" data-ng-bootbox-custom-dialog="Are you sure about the <strong>{{holder.name}}</strong> holder delete?" data-ng-bootbox-buttons="confirmButtonsDelete">Delete</button></div></div></dl></dl></div><div class="col-sm-8"><h4 class="text-muted">{{holder.territories.length ? \'Territories\' : \'The holder does not have any territories\'}}</h4><table data-ng-if="holder.territories.length" class="table table-condensed table-hover"><thead><tr><th class="col-xs-2">Territory</th><th class="col-xs-2 text-nowrap">Covered</th><th class="col-xs-2 text-nowrap">Taken</th><th class="col-xs-6 text-nowrap">Description</th></tr></thead><tbody data-ng-repeat="t in holder.territories"><tr><td><a data-ui-sref="examples.territory({id: t.id})">{{t.territoryCode}}</a></td><td data-ng-class="isNotCoveredLimitExeeded(t, app) ? \'bg-danger\' : \'\'"><a data-tooltip="{{t.covered | amTimeAgo}}">{{t.covered | date : \'dd.MM.yyyy\'}}</a></td><td data-ng-class="isHolderNotChangedLimitExeeded(t, app) ? \'bg-danger\': \'\'"><a data-tooltip="{{t.taken | amTimeAgo}}">{{t.taken | date : \'dd.MM.yyyy\'}}</a></td><td>{{t.description | limitTo: 40}} {{t.description.length > 40 ? \'...\' : \'\'}}</td></tr></tbody></table></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/holder/list-info.html',
    '<h4>General info</h4><p>This page demonstrates fetching data from the backend via WebSockets and showing it in a simple list. This example application fetches <em>books</em> with related <em>author</em> data populated for each and also covers data pagination, sort, and search functions. The actual data is fetched from the following endpoint on the backend.</p><pre>GET {{backendConfig.url}}/book <a ng-href="{{backendConfig.url}}/holder" target="_blank" data-tooltip="Open endpoint url"><i class="fa fa-external-link"></i></a></pre><p>Note that all data communication to the backend requires a JSON Web Token (<em>JWT</em>) for authentication to make sure that user is allowed to access the data.</p><h4>Functions in this example</h4><dl class="dl-horizontal"><dt>Data fetch</dt><dd>From backend via WebSockets using <em>$sailsSocket</em> service.</dd><dt>Search</dt><dd>Specify which columns are used in search and type your search words to see results while you\'re typing.</dd><dt>Pagination</dt><dd>By default, the page displays an example of ten books per page. You can change the number to be displayed per page.</dd><dt>Sorting data</dt><dd>Simply by clicking the column header. This will fetch data from backend again. <em>Unfortunately not from relation columns... yet.</em></dd><dt>Live updates</dt><dd>GUI is automatically updated if changes are made to the data.</dd><dt>Navigation</dt><dd>Access to single book and author pages simply by clicking the book or author name.</dd></dl><page-info-files data-files="{{files}}"></page-info-files>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/holder/list.html',
    '<h3>Holders ({{itemCount}})<div class="col-xs-6 pull-right list-search"><a data-ng-if="user.admin" data-ui-sref="examples.holder.add" data-tooltip="Add new holder"><i class="fa fa-plus-circle"></i></a><list-search data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search><pagination class="pagination-sm" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="10" data-boundary-links="true" data-rotate="false"></pagination></div></h3><table class="table"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title"></span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody><tr data-ng-repeat="holder in items"><td class="col-md-3"><a data-ui-sref="examples.holder({id: holder.id})">{{holder.name}}</a></td><td class="col-md-3">{{holder.email}}</td><td class="col-md-2">{{holder.telephone}}</td><td class="col-md-3">{{holder.description}}</td><td class="col-md-1">{{holder.territories.length}}</td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>no data founded...</em></td></tr></tbody></table><pagination class="pagination-sm pull-right" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="10" data-boundary-links="true" data-rotate="false"></pagination>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/messages/messages-info.html',
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
  $templateCache.put('/frontend/examples/messages/messages.html',
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
  $templateCache.put('/frontend/examples/territory/add.html',
    '<form class="form-vertical" role="form" name="territoryForm" data-ng-submit="addTerritory()"><div class="row"><div class="col-md-12"><div class="form-group" style="margin-top: 10px">Territory code: <input class="form-control" name="territory.territoryCode" required placeholder="Enter territory code" data-ng-model="territory.territoryCode"></div><div class="form-group" style="margin-top: 10px">Type: <input class="form-control" name="territory.type" required placeholder="Enter territory type" data-ng-model="territory.type"></div><div class="form-group" style="margin-top: 10px">Number of apartments: <input type="number" min="0" class="form-control" name="territory.apartmentCount" required placeholder="Enter number of apartments at the territory" data-ng-model="territory.apartmentCount"></div><div class="form-group">Description:<textarea name="territory.description" class="form-control" required placeholder="Enter territory description" data-ng-model="territory.description">{territory.description}</textarea></div><div class="form-group">Covered date:<p class="input-group"><input class="form-control" data-datepicker-popup="dd.MM.yyyy" data-is-open="coveredDatePickerIsOpen" data-ng-click="datePickerOpened($event); coveredDatePickerIsOpen = true;" data-ng-model="territory.covered"><span class="input-group-btn"><button type="button" class="btn btn-default" data-ng-click="datePickerOpened($event); coveredDatePickerIsOpen = true;"><span class="fa fa-calendar"></span></button></span></p></div><div class="form-group">Taken date:<p class="input-group"><input class="form-control" data-datepicker-popup="dd.MM.yyyy" data-is-open="takenDatePickerIsOpen" data-ng-click="datePickerOpened($event); takenDatePickerIsOpen = true;" data-ng-model="territory.taken"><span class="input-group-btn"><button type="button" class="btn btn-default" data-ng-click="datePickerOpened($event); coveredDatePickerIsOpen = true;"><span class="fa fa-calendar"></span></button></span></p></div><div class="form-group">Initial holder:<select class="form-control" data-ng-model="selectedHolder" data-ng-options="holder.id as holder.name for holder in holders"></select></div><button type="submit" class="btn btn-primary" data-ng-disabled="!territoryForm.$valid">Save</button></div></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/territory/list-info.html',
    '<h4>General info</h4><p>This page demonstrates fetching data from the backend via WebSockets and showing it in a simple list. This example application fetches <em>authors</em> with related <em>book</em> data populated for each and also covers data pagination, sort, and search functions. The actual data is fetched from the following endpoint on the backend.</p><pre>GET {{backendConfig.url}}/author <a ng-href="{{backendConfig.url}}/author" target="_blank" data-tooltip="Open endpoint url"><i class="fa fa-external-link"></i></a></pre><p>Note that all data communication to the backend requires a JSON Web Token (<em>JWT</em>) for authentication to make sure that user is allowed to access the data.</p><h4>Functions in this example</h4><dl class="dl-horizontal"><dt>Data fetch</dt><dd>From backend via WebSockets using <em>$sailsSocket</em> service.</dd><dt>Search</dt><dd>Specify which columns are used in search and type your search words to see results while you\'re typing.</dd><dt>Pagination</dt><dd>By default, the page displays an example of ten books per page. You can change the number to be displayed per page.</dd><dt>Sorting data</dt><dd>Simply by clicking the column header. This will fetch data from backend again. <em>Unfortunately not from relation columns... yet.</em></dd><dt>Live updates</dt><dd>GUI is automatically updated if changes are made to the data.</dd><dt>Navigation</dt><dd>Access to a single author and book pages simply by clicking the author or book name.</dd></dl><page-info-files data-files="{{files}}"></page-info-files>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/territory/list.html',
    '<div data-ng-if="user.admin" class="row"><div class="col-xs-12"><ul class="list-inline pull-right"><li><a data-ui-sref="examples.territories.s13" data-tooltip="S-13">S-13</a></li><li><a data-ui-sref="examples.territories.map" data-tooltip="Map">Map</a></li><li><a data-ui-sref="examples.territories.quickview" data-tooltip="Quick view">Quick view</a></li></ul></div></div><h3>Territories ({{itemCount}})<div class="col-xs-6 pull-right list-search"><a data-ng-if="user.admin" data-ui-sref="examples.territory.add" data-tooltip="Add new territory"><i class="fa fa-plus-circle"></i></a><list-search data-filters="filters" data-options="itemsPerPageOptions" data-items="itemsPerPage"></list-search><pagination class="pagination-sm" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="10" data-boundary-links="true" data-rotate="false"></pagination></div></h3><div class="row"><div class="col-sm-12"><table class="table"><thead class="noSelect"><tr><th class="text-nowrap {{item.class}}" data-ng-repeat="item in titleItems | filter:titleFilter"><a data-ng-show="item.column" data-ng-click="changeSort(item)" data-ng-bind-html="item.title"></a> <span data-ng-show="!item.column" data-ng-bind-html="item.title"></span> <i class="fa" data-ng-show="sort.column == item.column" data-ng-class="{\'fa-angle-down\': !sort.direction, \'fa-angle-up\': sort.direction}"></i></th></tr></thead><tbody data-ng-repeat="territory in items"><tr data-ng-class="territory.checked ? \'bg-info\' : \'\'"><td class="col-md-1 valign"><a data-ui-sref="examples.territory({id: territory.id})"><h4><strong>{{territory.territoryCode || territory.id}}</strong></h4></a></td><td class="col-md-1 valign">{{territory.type}}</td><td data-ng-class="isNotCoveredLimitExeeded(territory, app) ? \'bg-danger col-md-1 valign\' : \'col-md-1 valign\'"><a data-tooltip="{{territory.covered | amTimeAgo}}">{{territory.covered | date : \'dd.MM.yyyy\'}}</a></td><td data-ng-class="isHolderNotChangedLimitExeeded(territory, app) ? \'bg-danger col-md-1 valign\': \'col-md-1 valign\'"><a data-tooltip="{{territory.taken | amTimeAgo}}">{{territory.taken | date : \'dd.MM.yyyy\'}}</a></td><td class="col-md-1 valign"><ul class="list-inline"><li data-ng-repeat="tla in territory.territoryLinkAttribute"><span class="fa fa-{{getAttributeWithId(attributes, tla.attribute).icon}}" data-tooltip="{{getAttributeWithId(attributes, tla.attribute).description}}"></span></li></ul></td><td class="col-md-3 valign">{{territory.description | limitTo : 40}} {{territory.description.length > 40 ? \'...\' : \'\'}}</td><td class="col-md-1 valign">{{territory.territoryHolderHistory[territory.territoryHolderHistory.length - 1].description | limitTo : 20}} {{territory.territoryHolderHistory[territory.territoryHolderHistory.length - 1].description.length > 20 ? \'...\' : \'\'}}</td><td data-ng-class="!isDefaultHolder(territory.holder.id) ? \'bg-tuned-down col-md-2 valign\' : \'col-md-2 valign\'"><a data-ui-sref="examples.holder({id: territory.holder.id})">{{territory.holder.name}}</a></td><td data-ng-class="!isDefaultHolder(territory.holder.id) ? \'bg-tuned-down col-md-1 valign text-center\' : \'col-md-1 valign text-center\'"><label class="whitespace-label"><input type="checkbox" class="big-checkbox" id="checkbox_{{territory.id}}" data-ng-model="territory.checked" data-ng-change="territoryChecked(territory)"></label></td></tr><tr data-ng-if="items.length === 0"><td colspan="100%" class="text-center text-muted"><em>no data found...</em></td></tr></tbody></table></div></div><div class="row"><div class="col-sm-12"><pagination class="pagination-sm pull-right" data-total-items="itemCount" data-ng-model="currentPage" data-items-per-page="itemsPerPage" data-max-size="10" data-boundary-links="true" data-rotate="false"></pagination></div></div><div class="row top-buffer"><div class="col-sm-12"><div class="panel panel-primary" data-ng-show="filteredItems.length > 0"><div class="panel-heading">Operations for {{filteredItems.length}} selected territories <button class="btn btn-xs btn-primary pull-right" data-ng-click="clearSelected(items)">Clear selection</button></div><div class="panel-body"><ul class="list-inline"><li class="vertical-list" data-ng-repeat="t in filteredItems = (items | filter : onlyCheckedTerritories)"><a data-ui-sref="examples.territory({id: t.id})"><h3>{{t.territoryCode || t.id}}</h3></a></li></ul><hr><form><div class="row"><div class="col-md-6 col-md-offset-1"><label>Additional info:</label><textarea class="form-control" type="text" maxlength="300" rows="3" data-ng-model="territoryChangeComment" placeholder="Additional comment"></textarea></div><div class="col-md-4 bg-info"><p>To complete the operation you may want to add an additional comment regarding the change. For example, it might be useful to comment about territories covered in memorial invitation campaign etc. Please, write your comment in the input below. Commenting is optional.</p></div></div><div class="row top-buffer"><div class="col-md-6 col-md-offset-1"><button class="btn btn-primary btn-sm" data-ng-click="markTerritoriesAsCovered(filteredItems, territoryChangeComment)">Mark as covered without changing holder</button></div><div class="col-md-4 bg-info"><p>You might want to just mark the territories as covered without changing their holders. Do so, by clicking the "Mark as covered without changing holder" button.</p></div></div><div class="row top-buffer"><div class="col-md-6 col-md-offset-1"><label>Select new holder:</label><select class="form-control" data-ng-model="selectedHolder" data-ng-options="holder.id as holder.name for holder in holders | filter : onlyActiveHolders"></select><button class="btn btn-primary btn-sm top-buffer" data-ng-disable="!selectedHolder" data-ng-click="changeHolder(filteredItems, true, selectedHolder, territoryChangeComment)">Change holder and mark as coverd</button> <button class="btn btn-primary btn-sm top-buffer" data-ng-disable="!selectedHolder" data-ng-click="changeHolder(filteredItems, false, selectedHolder, territoryChangeComment)">Change holder without marking as covered</button></div><div class="col-md-4 bg-info"><p>To change territory holder, continue as follows:<ol><li>Select the new holder from the dropdown.</li><li>Change the holder and mark the territories as covered by clicking "Change holder and mark as coverd" button. If you do not want to mark the territories as covered, you should click the "Change holder without marking as covered" button.</li></ol></p></div></div></form></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/territory/map.html',
    '<style>.angular-google-map-container { height: 800px; }</style><ui-gmap-google-map class="bigMap" center="map.center" zoom="map.zoom"><ui-gmap-marker data-ng-repeat="t in territories" coords="t.center" idkey="t.center.id" icon="t.markerOptions.icon"><ui-gmap-window coords="t.center" show="windowOptions.show" closeclick="closeClick()"><div><h4><a href="/examples/territory/{{t.id}}">{{t.territoryCode}}</a></h4><p>Covered <span data-am-time-ago="t.covered"></span></p></div></ui-gmap-window></ui-gmap-marker></ui-gmap-google-map>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/territory/quickview.html',
    '<div class="content top-buffer"><ul class="list-inline"><li class="vertical-list" data-ng-repeat="t in territories | orderBy  : \'territoryCode\'"><h4><a data-ui-sref="examples.territory({id: t.id})" data-ng-class="isDefaultHolder(t.holder.id) ? \'strong-text\':\'\'"><span data-tooltip="{{t.holder.name}} / {{t.covered | amTimeAgo}}" data-ng-class="isNotCoveredRecently(t, app) ? \'text-danger\' : \'\'">{{t.territoryCode}}</span></a></h4></li></ul></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/territory/s13.html',
    '<div data-ng-repeat="t in territories"><div data-ng-if="$index !== 0 && $index % 5 === 0" style="page-break-after: always"></div><h3 data-ng-if="$index === 0 || $index % 5 === 0" class="col-xs-12">Territory list</h3><table border="1px" class="s13"><thead><tr><th colspan="2" width="124px" class="text-center">{{t.territoryCode}}</th></tr></thead><tbody data-ng-repeat="thh in t.territoryHolderHistory"><tr style="height: 21px"><td colspan="2">{{getHolderNameWithId(thh.holder)}}</td></tr><tr style="height: 21px"><td class="small">{{thh.startDate | date: \'dd.MM.yyyy\'}}</td><td class="small">{{thh.endDate | date: \'dd.MM.yyyy\'}}</td></tr></tbody><tbody data-ng-repeat="x in t.emptyArray"><tr style="height: 21px"><td colspan="2">&emsp;</td></tr><tr style="height: 21px"><td>&emsp;</td><td>&emsp;</td></tr></tbody></table></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/examples/territory/territory.html',
    '<div data-ng-show="!territory"><h3>Requested territory not found</h3></div><div class="row"><div class="col-sm-6"><div data-ng-show="territory"><form class="form-vertical" role="form" data-editable-form name="editableForm" data-onaftersave="saveTerritory()"><h3><span style="width: 100%" data-editable-text="territory.territoryCode" data-e-name="territory.territoryCode" data-e-required>{{territory.territoryCode}}</span> <span class="pull-right" data-ng-show="!editableForm.$visible && user.admin"><a href="#" data-ng-click="editableForm.$show()" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h3><dl><dt>Holder</dt><dd><span data-editable-select="territory.holder.id" data-e-name="holder.id" data-e-ng-options="holder.id as holder.name for holder in holders | filter : onlyActiveHolders" data-e-required>{{territory.holder.name}}</span></dd><dt>Covered</dt><dd><span data-editable-bsdate="territory.covered" data-e-ng-click="coveredDateOpened = !coveredDateOpened" data-e-is-open="coveredDateOpened" data-e-datepicker-popup="dd.MM.yyyy" data-e-name="date">{{territory.covered | date : \'dd.MM.yyyy\'}}</span></dd><dt>Taken</dt><dd><span data-editable-bsdate="territory.taken" data-e-ng-click="takenDateOpened = !takenDateOpened" data-e-is-open="takenDateOpened" data-e-datepicker-popup="dd.MM.yyyy" data-e-name="date">{{territory.taken | date : \'dd.MM.yyyy\'}}</span></dd><dt>Type</dt><dd><span data-editable-text="territory.type" data-e-name="territory.type" data-e-required>{{territory.type}}</span></dd><dt>Number of apartments</dt><dd><span data-editable-number="territory.apartmentCount" data-e-name="territory.apartmentCount" data-e-required>{{territory.apartmentCount}}</span></dd><dt>Archived</dt><dd><span data-editable-checkbox="territory.archived" data-e-title="is archived?">{{territory.archived ? \'Yes\' : \'No\'}}</span></dd><dt>Not counted in when calculating territories that are not covered recently</dt><dd><span data-editable-checkbox="territory.notCountedWhenCalculatingCoveredDuringLastYearTotal" data-e-title="is not counted in when calculating territories that are not covered recently?">{{territory.notCountedWhenCalculatingCoveredDuringLastYearTotal ? \'Yes\' : \'No\'}}</span></dd><dt>Description</dt><dd><pre style="white-space: pre-line" data-editable-textarea="territory.description" data-e-name="territory.description" data-e-required>\n' +
    '                            {{territory.description}}\n' +
    '                        </pre></dd></dl><div><div data-ng-show="editableForm.$visible"><button type="submit" class="btn btn-primary" data-ng-disabled="editableForm.$waiting">Save</button> <button type="button" class="btn btn-default" data-ng-disabled="editableForm.$waiting" data-ng-click="editableForm.$cancel(); editableMap = false;">Cancel</button> <button type="button" class="btn btn-danger pull-right" data-ng-bootbox-title="Danger - Danger - Danger" data-ng-bootbox-custom-dialog="Are you sure about the <strong>{{territory.name}}</strong> territory delete?" data-ng-bootbox-buttons="confirmButtonsDelete">Delete</button></div></div></form></div></div><div class="col-sm-6 no-print" data-ng-if="territory.territoryHolderHistory.length === 0"><h4>Holder history is not available</h4></div><div class="col-sm-6 no-print" data-ng-if="territory.territoryHolderHistory.length > 0"><h4>History ({{territory.territoryHolderHistory.length}}) <span class="pull-right" data-ng-show="!deleteTerritoryHolderHistoryItemVisible && user.admin"><a href="#" data-ng-click="deleteTerritoryHolderHistoryItemVisible = true" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h4><table class="table table-condensed table-hover"><thead><tr><th class="col-xs-3">Holder</th><th class="col-xs-2 text-nowrap">Start date</th><th class="col-xs-2 text-nowrap">End date</th><th class="col-xs-4 text-nowrap">Additional info</th><th class="col-xs-1 text-nowrap"></th></tr></thead><tbody data-ng-repeat="thh in territory.territoryHolderHistory"><tr><td><span data-ng-if="user.admin" data-editable-select="thh.holder" data-e-name="thh.holder.id" data-e-ng-options="holder.id as holder.name for holder in holders" data-e-required data-onaftersave="saveTerritoryHistoryItem(thh)">{{getHolderNameWithId(thh.holder)}}</span> <span data-ng-if="!user.admin"><a data-ui-sref="examples.holder({id: thh.holder.id})">{{getHolderNameWithId(thh.holder)}}</a></span></td><td><span data-ng-if="user.admin" data-editable-bsdate="thh.startDate" data-e-ng-click="thhStartDateOpened = !thhStartDateOpened" data-e-is-open="thhStartDateOpened" data-e-datepicker-popup="dd.MM.yyyy" data-e-name="date" data-onaftersave="saveTerritoryHistoryItem(thh)">{{thh.startDate |date: \'dd.MM.yyyy\'}}</span> <span data-ng-if="!user.admin">{{thh.startDate |date: \'dd.MM.yyyy\'}}</span></td><td><span data-ng-if="user.admin" data-editable-bsdate="thh.endDate" data-e-ng-click="thhEndDateOpened = !thhEndDateOpened" data-e-is-open="thhEndDateOpened" data-e-datepicker-popup="dd.MM.yyyy" data-onaftersave="saveTerritoryHistoryItem(thh)" data-e-name="date">{{thh.endDate |date: \'dd.MM.yyyy\'}}</span> <span data-ng-if="!user.admin">{{thh.endDate |date: \'dd.MM.yyyy\'}}</span></td><td><span data-ng-if="user.admin" data-editable-text="thh.description" data-e-name="thh.description" data-onaftersave="saveTerritoryHistoryItem(thh)">{{thh.description || \'No description\'}}</span> <span data-ng-if="!user.admin">{{thh.description}}</span></td><td><a data-ng-show="deleteTerritoryHolderHistoryItemVisible" data-ng-click="setTerritoryHolderHistoryToBeDeleted(thh)" data-ng-bootbox-title="You are about to delete a territory history row" data-ng-bootbox-custom-dialog="Are you sure about the territory history row delete?" data-ng-bootbox-buttons="confirmHistoryButtonsDelete"><span class="fa fa-trash fa-2x"></span></a></td></tr></tbody></table></div><div class="col-sm-6" data-ng-if="territory.territoryLinkAttribute.length === 0"><h4>No attributes has been set for this territory <span class="pull-right" data-ng-show="!deleteTerritoryLinkAttributeItemVisible && user.admin"><a href="#" data-ng-click="deleteTerritoryLinkAttributeItemVisible = true" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h4><div data-ng-if="user.admin && deleteTerritoryLinkAttributeItemVisible"><label>Add new Attribute:<select ng-model="newAttribute" ng-options="a.name for a in attributes"></select></label><a class="btn btn-primary btn-xs" data-ng-click="addNewAttribute(newAttribute);">Add</a></div></div><div class="col-sm-6" data-ng-if="territory.territoryLinkAttribute.length > 0"><h4>Attributes ({{territory.territoryLinkAttribute.length}}) <span class="pull-right" data-ng-show="!deleteTerritoryLinkAttributeItemVisible && user.admin"><a href="#" data-ng-click="deleteTerritoryLinkAttributeItemVisible = true" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h4><table class="table table-condensed table-hover"><thead><tr><th class="col-xs-1"></th><th class="col-xs-3 text-nowrap">Name</th><th class="col-xs-7 text-nowrap">Description</th><th class="col-xs-1 text-nowrap"></th></tr></thead><tbody data-ng-repeat="tla in territory.territoryLinkAttribute"><tr><td><span class="fa fa-{{getAttributeWithId(attributes, tla.attribute).icon}}"></span></td><td>{{getAttributeWithId(attributes, tla.attribute).name}}</td><td>{{getAttributeWithId(attributes, tla.attribute).description}}</td><td><a data-ng-show="deleteTerritoryLinkAttributeItemVisible" data-ng-click="setTerritoryLinkAttributeToBeDeleted(tla)" data-ng-bootbox-title="You are about to delete a territory attribute" data-ng-bootbox-custom-dialog="Are you sure about the territory attribute delete?" data-ng-bootbox-buttons="confirmAttributeButtonsDelete"><span class="fa fa-trash fa-2x"></span></a></td></tr></tbody></table><div data-ng-if="user.admin && deleteTerritoryLinkAttributeItemVisible"><label>Add new Attribute:<select ng-model="newAttribute" ng-options="a.name for a in attributes"></select></label><a class="btn btn-primary btn-xs" data-ng-click="addNewAttribute(newAttribute);">Add</a></div></div></div><div data-ng-if="territory"><h4>Map <span class="pull-right" data-ng-show="!editableMap && user.admin"><a href="#" data-ng-click="toggleMapEditable()" data-tooltip="Toggle edit mode"><i class="fa fa-wrench"></i></a></span></h4><a data-ng-show="editableMap" class="btn btn-danger pull-right" data-ng-click="replacePolylineWithDefault()">Delete border</a> <a data-ng-show="editableMap" class="btn btn-primary" data-ng-click="saveMap(map)">Save map</a><ui-gmap-google-map center="map.center" zoom="map.zoom"><ui-gmap-marker coords="map.territoryCenterMarker.coords" idkey="map.territoryCenterMarker.id" options="map.territoryCenterMarker.options" events="map.territoryCenterMarker.events"></ui-gmap-marker><ui-gmap-polygon editable="editableMap" static="false" ng-repeat="p in map.polygons track by p.id" path="p.path" stroke="p.stroke" visible geodesic="p.geodesic" fill="p.fill" fit="false" draggable events="map.polygonEvents"></ui-gmap-polygon></ui-gmap-google-map></div>');
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
    '<div class="form-login"><form name="loginForm" method="post" novalidate><h2 class="title">Please login</h2><div class="form-group" data-show-errors><input name="username" class="form-control username" placeholder="enter username or email" autofocus autocomplete="off" required data-focus-on="username" data-ng-model="credentials.identifier"></div><div class="form-group" data-show-errors><input type="password" name="password" class="form-control password" placeholder="enter password" required data-ng-model="credentials.password"></div><button class="btn btn-primary btn-block" data-ng-click="login()" data-ng-disabled="!loginForm.$valid">Login</button></form></div>');
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
    '<h3>Error occurred</h3><p>Damn gerbils have stopped running again! Someone has been dispatched to poke them with a sharp stick.</p><p data-ng-show="error.fromState.name"><a href="#" data-ng-click="goToPrevious()">Back to previous page</a></p>');
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
    '<div class="list-search-filters"><form class="form-inline" role="form"><div class="form-group"><div class="input-group" dropdown><input class="form-control input-sm col-sm-10" placeholder="search filter" data-ng-model="filters.searchWord"> <span data-ng-click="filters.searchWord = \'\'" class="input-group-addon search dropdown-toggle" data-tooltip="Click to select columns where search filter affects."><i class="fa fa-times text-info"></i></span></div><select class="form-control input-sm" data-ng-model="items" data-ng-options="page for page in options"></select></div></form></div>');
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
    '<footer class="no-print"><div class="navbar navbar-default navbar-fixed-bottom"><div class="container"><ul class="nav navbar-nav"><li><a href="https://github.com/slmnn/tman2" target="_blank"><i class="fa fa-github"></i>GitHub</a></li><li><a href="https://github.com/slmnn/tman2/issues" target="_blank"><i class="fa fa-bug"></i>Issues</a></li><li><a href="https://github.com/slmnn/" target="_blank"><i class="fa fa-user"></i>Arto Salminen</a></li></ul></div></div></footer>');
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
    '<header><div class="navbar navbar-default navbar-fixed-top no-print"><div class="container"><div class="navbar-header"><a href="/" class="navbar-brand">Aluesovellus</a> <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button></div><ul class="nav navbar-nav"><li class="{{item.class}}" data-ng-repeat="item in navigationItems" data-ng-show="auth.authorize(item.access)" data-ng-class="{\'not-active\': isNotActive(item), \'active\': isActive(item)}" data-ui-sref-active="active"><a href="#" data-ui-sref="{{item.state}}">{{item.title}}</a></li><li class="pull-right" data-ui-sref-active="active" data-ng-show="!auth.isAuthenticated()"><a href="#" data-ui-sref="auth.login">Login</a></li><li class="pull-right" data-ng-show="auth.isAuthenticated()"><a href="#" data-ng-click="logout()">Logout</a></li><li class="pull-right" data-ui-sref-active="active" data-ng-show="auth.isAuthenticated()"><a href="#" data-ui-sref="profile.edit({id: user().id})">{{user().username}}</a></li></ul></div></div></header>');
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
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" data-ng-click="dismiss()"><span aria-hidden="true">&times;</span> <span class="sr-only">Close</span></button><h3 class="modal-title">{{title}}</h3></div><div class="modal-body modal-help"><div data-ng-include="template"></div></div><div class="modal-footer"><button class="btn btn-primary" data-ng-click="dismiss()">Close</button></div>');
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
    '<ul class="nav nav-tabs no-print"><li data-ng-repeat="item in navigationItems" data-ui-sref-active="active"><a data-ng-if="item.state" data-ui-sref="{{item.state}}">{{item.title}}</a> <a style="text-decoration: line-through" data-ng-if="!item.state">{{item.title}}</a></li><li class="pull-right"><a href="#" class="help" data-ng-click="openInformation()">Show help <i class="fa fa-info-circle"></i></a></li></ul>');
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
        }
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
      '_app',
      'MessageService',
      function controller(
        $scope, $state,
        UserModel, 
        _app,
        MessageService
      ) {
        $scope.app = _app[0];

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
          UserModel
            .create(data)
            .then(
              function onSuccess() {
                MessageService.success('New user added successfully');

                $state.go('admin.user', {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single holder on GUI.
  angular.module('frontend.examples.holder')
    .controller('UserController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'UserModel',
      '_user',
      function controller(
        $scope, $state,
        UserService, MessageService,
        UserModel, _user
      ) {
        // Set current scope reference to model
        UserModel.setScope($scope, 'user');

        // Initialize scope data
        $scope.currentUser = UserService.user();
        $scope.user = _user;

        /**
         * Scope function to save the modified holder. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveUser = function saveUser() {
          var data = angular.copy($scope.user);

          // Make actual data update
          UserModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('User "' + $scope.user.username + '" updated successfully');
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
      'UserModel',
      '_items',
      function controller(
        $scope, $timeout, $q, $filter,
        _,
        ListConfig,
        SocketHelperService,
        MessageService,
        UserModel,
        _items
      ) {
        // Set current scope reference to models
        UserModel.setScope($scope, false, 'items', 'itemCount');

        // Set initial data
        $scope.items = _items;

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
        // Already authenticated so redirect back to holders list
        if (AuthService.isAuthenticated()) {
          $state.go('examples.holders');
        }

        // Scope function to perform actual login request to server
        $scope.login = function login() {
          AuthService
            .login($scope.credentials)
            .then(
              function successCallback() {
                $state.go('examples.holders');
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
                  MessageService.success('You have been logged in.');

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

            MessageService.success('You have been logged out.');

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
      function controller(
        $scope, $state, $modal,
        _items
      ) {
        $scope.navigationItems = _items;

        // Helper function to open information modal about current GUI.
        $scope.openInformation = function openInformation() {
          $modal.open({
            templateUrl: '/frontend/core/layout/partials/help.html',
            controller: 'NavigationModalController',
            size: 'lg',
            resolve: {
              '_title': function resolve() {
                return $state.current.name.toString();
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
            state: 'examples.about',
            title: 'About',
            access: AccessLevels.anon
          },
          {
            state: 'examples',
            title: 'Examples',
            access: AccessLevels.user
          },
          {
            state: 'admin',
            title: 'Admin',
            access: AccessLevels.admin
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
          'examples': [
            {
              state: 'examples.territories',
              title: 'Territories',
              access: AccessLevels.user
            },
            {
              state: 'examples.holders',
              title: 'Holders',
              access: AccessLevels.user
            },
            {
              state: 'examples.attributes',
              title: 'Attributes',
              access: AccessLevels.admin
            },
            {
              state: 'examples.app',
              title: 'App',
              access: AccessLevels.admin
            },
            {
              state: 'examples.messages',
              title: 'Messages',
              access: AccessLevels.user
            },
            {
              state: 'examples.chat',
              title: 'Chat',
              access: AccessLevels.user
            }
          ],
          'admin': [
            {
              state: 'admin.users',
              title: 'Users',
              access: AccessLevels.admin
            },
            {
              state: '',
              title: 'Request log',
              access: AccessLevels.admin
            },
            {
              state: 'admin.login-history',
              title: 'Login history',
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
          'examples.holders': {
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
                url: repository + 'frontend/src/app/examples/holder/holder.js',
                title: 'holder.js',
                info: types.frontend.module
              },
              {
                url: repository + 'frontend/src/app/examples/holder/holder-controllers.js',
                title: 'holder-controllers.js',
                info: types.generic.controller
              },
              {
                url: repository + 'frontend/src/app/examples/holder/holder-models.js',
                title: 'holder-models.js',
                info: types.generic.model
              },
              {
                url: repository + 'frontend/src/app/examples/holder/list.html',
                title: 'list.html',
                info: types.generic.template
              }
            ]
          },
          'examples.territories': {
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
                url: repository + 'frontend/src/app/examples/territory/territory.js',
                title: 'territory.js',
                info: types.frontend.module
              },
              {
                url: repository + 'frontend/src/app/examples/territory/territory-controllers.js',
                title: 'territory-controllers.js',
                info: types.generic.controller
              },
              {
                url: repository + 'frontend/src/app/examples/territory/territory-models.js',
                title: 'territory-models.js',
                info: types.generic.model
              },
              {
                url: repository + 'frontend/src/app/examples/territory/list.html',
                title: 'list.html',
                info: types.generic.template
              }
            ]
          },
          'examples.messages': {
            'Frontend': [
              {
                url: repository + 'frontend/src/app/examples/messages/messages.js',
                title: 'messages.js',
                info: types.frontend.module
              },
              {
                url: repository + 'frontend/src/app/examples/messages/messages-controllers.js',
                title: 'messages-controllers.js',
                info: types.generic.controller
              },
              {
                url: repository + 'frontend/src/app/examples/messages/messages.html',
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
          'examples.chat': {
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
                url: repository + 'frontend/src/app/examples/chat/chat.js',
                title: 'chat.js',
                info: types.frontend.module
              },
              {
                url: repository + 'frontend/src/app/examples/chat/chat-controllers.js',
                title: 'chat-controllers.js',
                info: types.generic.controller
              },
              {
                url: repository + 'frontend/src/app/examples/chat/chat-directives.js',
                title: 'chat-directives.js',
                info: types.frontend.directive
              },
              {
                url: repository + 'frontend/src/app/examples/chat/chat-models.js',
                title: 'chat-models.js',
                info: types.generic.model
              },
              {
                url: repository + 'frontend/src/app/examples/chat/chat.html',
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
              case 'examples.holders':
              case 'examples.territories':
              case 'examples.chat':
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
              title: 'Territory',
              column: 'territoryCode',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Type',
              column: 'type',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Covered',
              column: 'covered',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Taken',
              column: 'taken',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Attributes',
              column: 'territoryLinkAttributes',
              class: 'col-xs-1',
              searchable: true,
              sortable: false,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Description',
              column: 'description',
              class: 'col-xs-3',
              searchable: true,
              sortable: false,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Comment',
              column: false,
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Holder',
              column: false,
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Select',
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
              title: 'Name',
              column: 'name',
              class: 'col-xs-3',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Email',
              column: 'email',
              class: 'col-xs-3',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Phone',
              column: 'telephone',
              class: 'col-xs-2',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Description',
              column: false,
              class: 'col-xs-4 text-left',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Territory Count',
              column: false,
              class: 'col-xs-1 text-left',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            }
          ],
          userlogin: [
            {
              title: 'IP-address',
              column: 'ip',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Browser',
              column: 'browser',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Operating System',
              column: 'os',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Username',
              column: false,
              class: 'col-xs-2',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Login time',
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
              title: 'First name',
              column: 'firstName',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Last name',
              column: 'lastName',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Username',
              column: 'username',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Email',
              column: 'email',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Type',
              column: 'admin',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Created',
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
            var words = _.filter(filters.searchWord.split(' '));

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
/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.app' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller to show single app on GUI.
  angular.module('frontend.examples.app')
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
            }
          )
          .then(
            function onSuccess() {
              MessageService.success('App settings created successfully');
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
              function onSuccess() {
                MessageService.success('App settings updated successfully');
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
 * This file contains all necessary Angular model definitions for 'frontend.examples.app
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
  angular.module('frontend.examples.app')
    .service('AppModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('app');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.examples.attribute
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
  angular.module('frontend.examples.attribute')
    .service('AttributeModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('attribute');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.attribute' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller to show single attribute on GUI.
  angular.module('frontend.examples.attribute')
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
                MessageService.success('Attribute removed successfully');
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
              function onSuccess() {
                MessageService.success('Attribute created successfully');
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
              function onSuccess() {
                MessageService.success('Attribute updated successfully');
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
 * This file contains all necessary Angular controller definitions for 'frontend.examples.chat' module.
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
  angular.module('frontend.examples.chat')
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
 * This file contains all necessary Angular directive definitions for 'frontend.examples.chat' module.
 *
 * Note that this file should only contain directives and nothing else.
 */
(function() {
  'use strict';

  /**
   * Directive to resize "chat" screen to take all "possible" space on browser screen. This is just cruel thing to
   * do, but it works like a charm.
   */
  angular.module('frontend.examples.chat')
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
 * This file contains all necessary Angular model definitions for 'frontend.examples.chat' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
  'use strict';

  /**
   * Model for Message API, this is used to wrap all Message objects specified actions and data change actions.
   */
  angular.module('frontend.examples.chat')
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
 * This file contains all necessary Angular controller definitions for 'frontend.examples.holder' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new holder creation.
  angular.module('frontend.examples.holder')
    .controller('HolderAddController', [
      '$scope', '$state',
      'MessageService',
      'HolderModel',
      '_territories',
      function controller(
        $scope, $state,
        MessageService,
        HolderModel,
        _territories
      ) {
        // Store territorys
        $scope.territories = _territories;

        // Initialize holder model
        var initScope = function() {
          $scope.holder = {
            name: '',
            email: '',
            emailValid: true,
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
              function onSuccess() {
                MessageService.success('New holder added successfully');
                initScope();
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single holder on GUI.
  angular.module('frontend.examples.holder')
    .controller('HolderController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'TerritoryHelper',
      'HolderModel', 'TerritoryModel',
      '_holder', '_territories', '_app',
      function controller(
        $scope, $state,
        UserService, MessageService,
        TerritoryHelper,
        HolderModel, TerritoryModel,
        _holder, _territories, _app
      ) {
        // Set current scope reference to model
        HolderModel.setScope($scope, 'holder');

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
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteHolder();
            }
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default pull-left'
          }
        };

        /**
         * Scope function to save the modified holder. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveHolder = function saveHolder() {
          var data = angular.copy($scope.holder);

          // Set territory id to update data
          data.territory = $scope.selectTerritory;

          // Make actual data update
          HolderModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('Holder "' + $scope.holder.title + '" updated successfully');
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
                MessageService.success('holder "' + $scope.holder.title + '" deleted successfully');

                $state.go('examples.holders');
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
  angular.module('frontend.examples.holder')
    .controller('HolderListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig', 'SocketHelperService',
      'UserService', 'HolderModel', 'TerritoryModel',
      '_items', '_count', '_territories',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig, SocketHelperService,
        UserService, HolderModel, TerritoryModel,
        _items, _count, _territories
      ) {
        // Set current scope reference to models
        HolderModel.setScope($scope, false, 'items', 'itemCount');
        TerritoryModel.setScope($scope, false, 'territories');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.territories = _territories;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(HolderModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'name',
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
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.examples.holder' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function () {
  'use strict';

  /**
   * Model for Holder API, this is used to wrap all Holder objects specified actions and data change actions.
   */
  angular.module('frontend.examples.holder')
    .factory('HolderModel', [
      'DataModel',
      function factory(DataModel) {
        return new DataModel('holder');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.messages' module.
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
  angular.module('frontend.examples.messages')
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
 * This file contains all necessary Angular controller definitions for 'frontend.examples.territory
' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new territory creation.
  angular.module('frontend.examples.territoryHolderHistory')
    .controller('TerritoryHolderHistoryAddController', [
      '$scope', '$state',
      'MessageService', 'TerritoryHolderHistoryModel',
      function controller(
        $scope, $state,
        MessageService, TerritoryHolderHistoryModel
      ) {

        // Initialize territory model
        $scope.territoryHolderHistory = {
          name: '',
          description: ''
        };

        /**
         * Scope function to store new territory to database. After successfully save user will be redirected
         * to view that new created territory Holder History.
         */
        $scope.addTerritoryHolderHistory = function addTerritoryHolderHistory() {
          TerritoryHolderHistoryModel
            .create(angular.copy($scope.territory))
            .then(
              function onSuccess(result) {
                MessageService.success('New territory holder history added successfully');

                $state.go('examples.territoryHolderHistories', {id: result.data.id});
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single territory on GUI.
  angular.module('frontend.examples.territoryHolderHistory')
    .controller('TerritoryHolderHistoryController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'TerritoryHolderHistoryModel', 'HolderModel',
      '_territoryHolderHistory', '_holders', '_holdersCount',
      function controller(
        $scope, $state,
        UserService, MessageService,
        TerritoryHolderHistoryModel, HolderModel,
        _territoryHolderHistory, _holders, _holdersCount
      ) {

        // Set current scope reference to models
        TerritoryHolderHistoryModel.setScope($scope, 'territoryHolderHistory');
        HolderModel.setScope($scope, false, 'holders', 'holdersCount');

        // Expose necessary data
        $scope.user = UserService.user();
        $scope.territoryHolderHistory = _territoryHolderHistory;
        $scope.holders = _holders;
        $scope.holdersCount = _holdersCount.count;

        // Territory delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteTerritoryHolderHistory();
            }
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default pull-left'
          }
        };

        // Scope function to save modified territory.
        $scope.saveTerritoryHolderHistory = function saveTerritoryHolderHistory() {
          var data = angular.copy($scope.territoryHolderHistory);

          //data.holder = $scope.selectHolder;

          console.log(data);

          // Make actual data update
          TerritoryHolderHistoryModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('Territory holder history "' + $scope.territoryHolderHistory.name + '" updated successfully');
              }
            )
          ;
        };

        // Scope function to delete territory

        $scope.deleteTerritoryHolderHistory = function deleteTerritoryHolderHistory() {
          TerritoryHolderHistoryModel
            .delete($scope.territory.id)
            .then(
              function onSuccess() {
                MessageService.success('Territory Holder History "' + $scope.territoryHolderHistory.name + '" deleted successfully');

                $state.go('examples.territories');
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for territory list GUI on boilerplate application.
  angular.module('frontend.examples.territoryHolderHistory')
    .controller('TerritoryHolderHistoryListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig',
      'SocketHelperService', 'UserService', 'TerritoryHolderHistoryModel',
      '_items', '_count', 
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig,
        SocketHelperService, UserService, TerritoryHolderHistoryModel,
        _items, _count
      ) {
        // Set current scope reference to model
        TerritoryHolderHistoryModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(TerritoryHolderHistoryModel.endpoint);

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

          // Data query specified parameters
          var parameters = {
            populate: 'holders',
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = TerritoryHolderHistoryModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = TerritoryHolderHistoryModel
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
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.examples.territoryHolderHistory
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
  angular.module('frontend.examples.territoryHolderHistory')
    .service('TerritoryHolderHistoryModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('territoryHolderHistory');
      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.territory
' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new territory creation.
  angular.module('frontend.examples.territory')
    .controller('TerritoryAddController', [
      '$scope', '$state', 
      'HolderModel', 
      '_holders',
      '_app',
      'MessageService', 'TerritoryModel',
      function controller(
        $scope, $state,
        HolderModel, 
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
              function onSuccess() {
                MessageService.success('New territory added successfully');
                $state.go($state.current, {reload: true});
                initModel();
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single territory on GUI.
  angular.module('frontend.examples.territory')
    .controller('TerritoryController', [
      '$scope', '$state', '_', '$timeout',
      'UserService', 'MessageService',
      'TerritoryModel', 'HolderModel',
      '_territory', '_holders', '_app', '_attributes',
      'TerritoryHolderHistoryModel',
      'TerritoryLinkAttributeModel',
      'CoordinateModel', 'uiGmapGoogleMapApi',
      function controller(
        $scope, $state, _, $timeout,
        UserService, MessageService,
        TerritoryModel, HolderModel,
        _territory, _holders, _app, _attributes,
        TerritoryHolderHistoryModel,
        TerritoryLinkAttributeModel,
        CoordinateModel, uiGmapGoogleMapApi
      ) {
        // Set current scope reference to models
        TerritoryModel.setScope($scope, 'territory');
        HolderModel.setScope($scope, false, 'holders', 'holdersCount');

        // Expose necessary data to the scope.
        $scope.user = UserService.user();
        $scope.territory = angular.copy(_territory);
        $scope.holders = _holders;
        $scope.attributes = _attributes;
        $scope.app = _app[0];

        // Create Google Map settings for showing the center and border of the territory.
        // Copy the border path from territory.
        var path = [];
        _.each(_territory.coordinates, function(c) {
          path.push(c);
        });

        // Describe the map.
        $scope.map = { 
          center: $scope.territory.center || { latitude: 61, longitude: 23},
          zoom: 12, 
          territoryCenterMarker : { 
            id: $scope.territory.center ? $scope.territory.center.id : 0,
            options: {
              draggable: false
            },
            coords: $scope.territory.center || { latitude: 61, longitude: 23},
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
            latitude: $scope.map.center.latitude + 0.005,
            longitude: $scope.map.center.longitude + 0.005
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude + 0.005,
            longitude: $scope.map.center.longitude - 0.005
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude - 0.005,
            longitude: $scope.map.center.longitude - 0.005
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude - 0.005,
            longitude: $scope.map.center.longitude + 0.005
          });

          // Save to the backend.
          $scope.saveMap($scope.map);
        };

        // Delete set of coordinates with ids;
        var deletePolylineCoordinates = function deletePolylineCoordinates(polyline) {
            _.each(polyline, function(p){
              if(p.id) {
                CoordinateModel.delete(p.id);
              }
            });
        };

        // Save the map to the backend.
        $scope.saveMap = function saveMap() {

          // Save the marker either by updating or creating a new one.
          var coords = $scope.map.territoryCenterMarker.coords;
          if($scope.map.territoryCenterMarker && 
            $scope.map.territoryCenterMarker.id && 
            $scope.map.territoryCenterMarker.id !== 0) {
            coords.type = 'center';
            CoordinateModel.update($scope.map.territoryCenterMarker.id, coords);
          } else {
            coords.type = 'center';
            CoordinateModel.create(coords)
            .then(function onSuccess(response){
              TerritoryModel
                .update($scope.territory.id, { center : response.data.id })
                .then(
                  function onSuccess() {
                    MessageService.success('Territory "' + $scope.territory.territoryCode + '" updated successfully');
                    $state.go($state.current, {id: _territory.id}, {reload: true});
                  }
                )
              ;
            });
          }

          // Save the polyline.
          if($scope.map.polygons[0]) {

            // Convert coordinates to backend compatible form.
            var path = [];
            var oldPathIds = [];
            _.each($scope.map.polygons[0].path, function(p) {
              p.type = 'border';
              p.territory = { id: $scope.territory.id };
              path.push(p);
              if(p.id) {
                oldPathIds.push(p.id);
              }
            });
            _.each(oldPathIds, function(oldId){
              CoordinateModel.delete(oldId);
            });
            _.each(path, function(p){
              CoordinateModel.create(p);
            });
          }

          $scope.toggleMapEditable();
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
            function onSuccess() {
              MessageService.success('Territory history item updated.');
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
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              TerritoryHolderHistoryModel
              .delete(territoryHolderHistoryItemToBeDeletedId)            
              .then(
                function onSuccess() {
                  MessageService.success('Territory holder history row deleted successfully');
                  territoryHolderHistoryItemToBeDeletedId = null;
                  $scope.deleteTerritoryHolderHistoryItemVisible = false;
                  $state.go($state.current, {id: _territory.id}, {reload: true});
                }
              );
            }
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default pull-left',
            callback: function callback() {
              territoryHolderHistoryItemToBeDeletedId = null;
            }
          }
        };

        // Territory delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteTerritory();
            }
          },
          cancel: {
            label: 'Cancel',
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
            if(data.territoryHolderHistory && 
              data.territoryHolderHistory.length > 0 && 
              !_.last(data.territoryHolderHistory).endTime) {
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
                  function onSuccess() {
                    MessageService.success('Territory history for "' + $scope.territory.territoryCode + '" created successfully');
                  }
                )
              ;  
            }          
          }

          data.territoryHolderHistory = null;

          // Make territory data update
          TerritoryModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('Territory "' + $scope.territory.territoryCode + '" updated successfully');
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
                MessageService.success('Territory "' + $scope.territory.territoryCode + '" deleted successfully');

                $state.go('examples.territories');
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
            MessageService.success('Attribute "' + attribute.name + '" added successfully');
            $scope.deleteTerritoryLinkAttributeItemVisible = false;
            $state.go($state.current, {id: _territory.id}, {reload: true});
          });
        };

        var territoryLinkAttributeItemToBeDeletedId = null;
        $scope.setTerritoryLinkAttributeToBeDeleted = function setTerritoryLinkAttributeToBeDeleted(item) {
          territoryLinkAttributeItemToBeDeletedId = item.id;
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
                  MessageService.success('Territory attribute deleted successfully');
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
  angular.module('frontend.examples.territory')
    .controller('TerritoryListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig',
      'TerritoryHelper',
      'TerritoryHolderHistoryModel',
      'SocketHelperService', 'UserService', 'TerritoryModel',
      '_items', '_count', '_holders', '_app', '_attributes',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig,
        TerritoryHelper,
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

        // Initialize checked rows data.
        $scope.onlyCheckedTerritories = function onlyCheckedTerritories(territory) {
          return territory.checked;
        };

        $scope.onlyActiveHolders = function onlyActiveHolders(holder) {
          return holder.isArchived ? false : true;
        };

        $scope.isDefaultHolder = function isDefaultHolder(holderId) {
          return holderId === $scope.app.defaultHolder;
        };

        $scope.selectedHolder = null; // Add default holder ID when available

        // Callback that is evaluated when user toggles a territory checkbox.
        $scope.territoryChecked = function territoryChecked(changedTerritoryId) {
          //$scope.checkedTerritories.push(changedTerritoryId);
        };

        $scope.clearSelected = function clearSelected(territories) {
          _.each(territories, function(t) {
            t.checked = false;
          });
        };

        $scope.getAttributeWithId = function getAttributeWithId(attributes, id) {
          return _.find(attributes, function(a) {
            return a.id === id;
          });
        };

        var makeHolderHistoryUpdate = function(territory, comment, newHolderId) {

          // If the holder change was anything else but return to the default
          // holder, add also row into history.
          if(newHolderId !== $scope.app.defaultHolder) {
            TerritoryHolderHistoryModel
            .create(
              {
                startDate: new Date(),
                holder: newHolderId,
                territory: territory.id,
                description: comment
              }
            );
          }

          // If there was a row in history, update the end time if it is not already defined.
          if(
            territory.territoryHolderHistory && 
            territory.territoryHolderHistory.length > 0 && 
            !_.last(territory.territoryHolderHistory).endTime
          ) {
            TerritoryHolderHistoryModel
            .update(
              _.last(territory.territoryHolderHistory).id,
              {
                endDate: new Date()
              }
            );
          }
        };

        $scope.markTerritoriesAsCovered = function markTerritoriesAsCovered(territories, comment) {
          _.each(territories, function(t) {
            TerritoryModel
            .update(t.id, 
              {
                covered: new Date()
              }
            );

            makeHolderHistoryUpdate(t, comment, t.holder.id);
          });
        };

        $scope.changeHolder = function changeHolder(territories, markAsCovered, newHolderId, comment) {
          _.each(territories, function(t) {
            var data = {
              taken: new Date(),
              holder: newHolderId
            };
            if(markAsCovered) {
              data.covered = new Date();
            }
            TerritoryModel
            .update(t.id, data);

            makeHolderHistoryUpdate(t, comment, newHolderId);
          });
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

          // Data query specified parameters
          var parameters = {
            populate: ['holder', 'territoryHolderHistory'],
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
      }
    ])
  ;

    // Controller which contains all necessary logic for territory list GUI on boilerplate application.
  angular.module('frontend.examples.territory')
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
        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.territories = _items;
        $scope.holders = _holders;
        $scope.user = UserService.user();

        _.each($scope.territories, function(t) {
          t.emptyArray = Array.apply(null, Array(20 - t.territoryHolderHistory.length)).map(function (x, i) { return i; });
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

    // Controller which contains all necessary logic for territory list GUI on boilerplate application.
  angular.module('frontend.examples.territory')
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
  angular.module('frontend.examples.territory')
    .controller('TerritoryMapController', [
      '$scope', '$q', '$filter',
      '_',
      'ListConfig',
      'TerritoryHelper',
      'SocketHelperService', 'UserService',
      '_items', '_holders', '_app',
      function controller(
        $scope, $q, $filter,
        _,
        ListConfig,
        TerritoryHelper,
        SocketHelperService, UserService,
        _items, _holders, _app
      ) {
        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        $scope.territories = _items;
        $scope.holders = _holders;
        $scope.app = _app[0];
        $scope.user = UserService.user();

        // Set initial data
        $scope.map = {
          center: {
            latitude: $scope.app.defaultLatitude || 61,
            longitude: $scope.app.defaultLongitude || 23
          },
          zoom: 10
        }

        $scope.getHolderNameWithId = function getHolderNameWithId(holderId) {
          return  _.result(
              _.find(_holders, function(h) {
                return h.id === holderId;
              }), 
              'name'
            );
        };

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
              return '/assets/images/green-dot.png';
            }
            return '/assets/images/green.png';           
          } catch(err) {
            return '/assets/images/yellow.png';
          }

        };

        _.each($scope.territories, function(t) {
          t.markerOptions = {
            icon: { url: getIconUrl(t) }
          }
        })


      }
    ])
  ;
}());

/**
 * This file contains all necessary Angular model definitions for 'frontend.examples.territory
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
  angular.module('frontend.examples.territory')
    .service('TerritoryModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('territory');
      }
    ])
  ;
}());

angular.module('frontend.examples.territory')
.factory('TerritoryHelper', ['$filter', function ($filter) {

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
              function onSuccess() {
                MessageService.success('User "' + $scope.user.username + '" updated successfully');
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
              MessageService.success('User "' + $scope.user.username + '" password is now set!');
              $scope.password2 = '';
            },
            function onError(error) {
              MessageService.error('User "' + $scope.user.username + '" password was not updated!');
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
    'frontend.admin.user'
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
    'frontend.core.services'
  ]);
}());

/**
 * Angular module for examples component. This component is divided to following logical components:
 *
 *  frontend.examples.about
 *  frontend.examples.author
 *  frontend.examples.holder
 *  frontend.examples.chat
 *  frontend.examples.messages
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
  'use strict';

  // Define frontend.admin module
  angular.module('frontend.examples', [
    'frontend.examples.about',
    'frontend.examples.territory',
    'frontend.examples.territoryHolderHistory',
    'frontend.examples.holder',
    'frontend.examples.coordinate',
    'frontend.examples.territoryLinkAttribute',
    'frontend.examples.attribute',
    'frontend.examples.app',
    'frontend.examples.chat',
    'frontend.examples.messages'
  ]);

  // Module configuration
  angular.module('frontend.examples')
    .config([
      '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('examples', {
            parent: 'frontend',
            data: {
              access: 1
            },
            views: {
              'content@': {
                controller: [
                  '$state',
                  function($state) {
                    $state.go('examples.holders');
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
                      return ContentNavigationItems.getItems('examples');
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
    'frontend.examples',
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
        $urlRouterProvider.otherwise('/about');
      }
    ]
  )
  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          //    key: 'your api key',
          v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  })
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
            .error('Error loading the page');

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
