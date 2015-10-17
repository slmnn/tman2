/**
 * Territory component to wrap all territory specified stuff together. This component is divided to following logical
 * components:
 *
 *  Controllers
 *  Models
 *
 * All of these are wrapped to 'frontend.examples.coordinate' angular module.
 */
(function() {
  'use strict';

  // Define frontend.examples.coordinate angular module
  angular.module('frontend.examples.coordinate', []);

  // Module configuration
  angular.module('frontend.examples.coordinate')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider

          // Single coordinate
          .state('examples.coordinate', {
            url: '/examples/coordinate/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/coordinate/coordinate.html',
                controller: 'coordinateController',
                resolve: {
                  _coordinate: [
                    '$stateParams',
                    'coordinateModel',
                    function resolve(
                      $stateParams,
                      coordinateModel
                    ) {
                      return coordinateModel.fetch($stateParams.id, {populate: ['territory']});
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
        ;
      }
    ])
  ;
}());
