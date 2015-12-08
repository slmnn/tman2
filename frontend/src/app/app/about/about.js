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
