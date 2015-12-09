/**
 * Angular module for app component. This component is divided to following logical components:
 *
 *  frontend.app.about
 *  frontend.app.author
 *  frontend.app.holder
 *  frontend.app.chat
 *  frontend.app.messages
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
  'use strict';

  // Define frontend.admin module
  angular.module('frontend.app', [
    'frontend.app.about',
    'frontend.app.territory',
    'frontend.app.territoryHolderHistory',
    'frontend.app.holder',
    'frontend.app.coordinate',
    'frontend.app.territoryLinkAttribute',
    'frontend.app.specialAddress',
    'frontend.app.attribute',
    'frontend.app.app',
    'frontend.app.stat',
    'frontend.app.chat',
    'frontend.app.messages'
  ]);

  // Module configuration
  angular.module('frontend.app')
    .config([
      '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('app', {
            parent: 'frontend',
            data: {
              access: 1
            },
            views: {
              'content@': {
                controller: [
                  '$state',
                  function($state) {
                    $state.go('app.territories');
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
                      return ContentNavigationItems.getItems('app');
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
