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
    .factory('MailService', [
      '$sailsSocket',
      'BackendConfig',
      function factory(
        $sailsSocket,
        BackendConfig
      ) {
        return {
          count: function count() {
            return $sailsSocket
              .get(BackendConfig.url + '/api/mail/count');
          },
          send: function send(data) {
            return $sailsSocket
              .post(BackendConfig.url + '/api/mail/send', data);
          },
          backup: function backup() {
            return $sailsSocket
              .post(BackendConfig.url + '/api/mail/backup', null);
          }
        };
      }
    ])
  ;
}());
