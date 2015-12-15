'use strict';

/**
 * Sails APIAnalytics hook configuration.
 *
 * @see   https://github.com/mikermcneil/sails-hook-apianalytics
 *
 * @type  {{
 *          apianalytics: {
 *            routesToLog: string[],
 *            dontLogParams: string[],
 *            onRequest: Function,
 *            onResponse: Function
 *          }
 *        }}
 */
module.exports = {
  apianalytics: {
    /**
     * The types of requests to log
     * (e.g. ["get /foo/bar", "post /foo", "/*"])
     * Defaults to all routes.
     */
    routesToLog: [
      'POST /*',
      'PUT /*',
      'DELETE /*',
    ],

    /**
     * Parameters which should NEVER be logged
     * (e.g. "password")
     * If seen, they will be replaced with "*PROTECTED*"
     */
    dontLogParams: ['password1', 'password2', 'password', 'token'],

    // When request starts
    onRequest: function onRequest(log, req, res) {
      // Defaults to doing nothing
    },

    // When request is done
    onResponse: function onResponse(log, req, res) {
      sails.services.logger.request(log, req, res);
    }
  }
};
