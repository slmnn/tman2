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
            url: '/app/user/:id',
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
