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
    'frontend.examples.specialAddress',
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
