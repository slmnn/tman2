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
                templateUrl: '/frontend/app/about/about.html'
              },
              'pageNavigation@': false
            }
          })
        ;
      }
    ])
  ;
}());
