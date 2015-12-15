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
