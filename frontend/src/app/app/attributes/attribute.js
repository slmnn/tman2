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
