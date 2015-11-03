/**
 * Generic data service to interact with Sails.js backend. This will just
 * wrap $sailsSocket methods to a single service, that is used from application.
 *
 * This is needed because we need to make some common url handling for sails
 * endpoint.
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('PasswordService', [
      '$sailsSocket',
      'BackendConfig',
      function factory(
        $sailsSocket,
        BackendConfig
      ) {
        return {
          updatePassword: function updatePassword(data) {
            return $sailsSocket
              .post(BackendConfig.url + '/user/password', data);
          }
        };
      }
    ])
  ;
}());
