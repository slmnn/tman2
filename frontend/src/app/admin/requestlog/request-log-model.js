(function () {
  'use strict';

  /**
   * Model for Book API, this is used to wrap all Book objects specified actions and data change actions.
   */
  angular.module('frontend.admin.request-log')
    .factory('RequestLogModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('requestLog');
      }
    ])
  ;
}());
