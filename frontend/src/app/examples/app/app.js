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
