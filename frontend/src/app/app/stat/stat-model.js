(function() {
  'use strict';

  angular.module('frontend.app.stat', []);

  angular.module('frontend.app.stat')
    .service('StatModel', [
      'DataModel',
      function(DataModel) {
        return new DataModel('stat');
      }
    ])
  ;
}());
