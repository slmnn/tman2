(function() {
  'use strict';

  // Define frontend.admin module.request-log
  angular.module('frontend.admin.request-log', []);

  // Module configuration
  angular.module('frontend.admin.request-log')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('admin.request-log', {
            url: '/admin/requestlog',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/requestlog/index.html',
                controller: 'RequestLogController',
                resolve: {
                  _items: [
                    'ListConfig',
                    'RequestLogModel',
                    function resolve(
                      ListConfig,
                      RequestLogModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        limit: config.itemsPerPage,
                        sort: 'createdAt DESC',
                        populate: 'user'
                      };

                      return RequestLogModel.load(parameters);
                    }
                  ],
                  _count: [
                    'RequestLogModel',
                    function resolve(RequestLogModel) {
                      return RequestLogModel.count();
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
