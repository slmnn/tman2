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
