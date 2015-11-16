/**
 * Messages component which is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.app.messages' angular module.
 */
(function() {
  'use strict';

  // Define frontend.app.messages angular module
  angular.module('frontend.app.messages', []);

  // Module configuration
  angular.module('frontend.app.messages')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Messages
          .state('app.messages', {
            url: '/app/messages',
            views: {
              'content@': {
                templateUrl: '/frontend/app/messages/messages.html',
                controller: 'MessagesController'
              }
            }
          })
        ;
      }
    ])
  ;
}());
