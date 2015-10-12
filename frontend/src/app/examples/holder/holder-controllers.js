/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.holder' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new holder creation.
  angular.module('frontend.examples.holder')
    .controller('HolderAddController', [
      '$scope', '$state',
      'MessageService',
      'HolderModel',
      '_territories',
      function controller(
        $scope, $state,
        MessageService,
        HolderModel,
        _territories
      ) {
        // Store authors
        $scope.territories = _territories;

        // Initialize holder model
        $scope.holder = {
          name: '',
          email: '',
          territories: []
        };

        /**
         * Scope function to store new holder to database. After successfully save user will be redirected
         * to view that new created holder.
         */
        $scope.addHolder = function addHolder() {
          HolderModel
            .create(angular.copy($scope.holder))
            .then(
              function onSuccess(result) {
                MessageService.success('New holder added successfully');

                $state.go('examples.holder', {id: result.data.id});
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single holder on GUI.
  angular.module('frontend.examples.holder')
    .controller('HolderController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'HolderModel', 'AuthorModel',
      '_holder',
      function controller(
        $scope, $state,
        UserService, MessageService,
        HolderModel, AuthorModel,
        _holder
      ) {
        // Set current scope reference to model
        HolderModel.setScope($scope, 'holder');

        // Initialize scope data
        $scope.user = UserService.user();
        $scope.holder = _holder;
        $scope.territories = [];

        // Holder delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteHolder();
            }
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default pull-left'
          }
        };

        /**
         * Scope function to save the modified holder. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveHolder = function saveHolder() {
          var data = angular.copy($scope.holder);

          // Set author id to update data
          data.author = $scope.selectAuthor;

          // Make actual data update
          HolderModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('Holder "' + $scope.holder.title + '" updated successfully');
              }
            )
          ;
        };

        /**
         * Scope function to delete current holder. This will send DELETE query to backend via web socket
         * query and after successfully delete redirect user back to holder list.
         */
        $scope.deleteHolder = function deleteHolder() {
          HolderModel
            .delete($scope.holder.id)
            .then(
              function onSuccess() {
                MessageService.success('holder "' + $scope.holder.title + '" deleted successfully');

                $state.go('examples.holders');
              }
            )
          ;
        };

        /**
         * Scope function to fetch author data when needed, this is triggered whenever user starts to edit
         * current holder.
         *
         * @returns {null|promise}
         */
        $scope.loadAuthors = function loadAuthors() {
          if ($scope.authors.length) {
            return null;
          } else {
            return AuthorModel
              .load()
              .then(
                function onSuccess(data) {
                  $scope.authors = data;
                }
              )
            ;
          }
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for holder list GUI on boilerplate application.
  angular.module('frontend.examples.holder')
    .controller('HolderListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig', 'SocketHelperService',
      'UserService', 'HolderModel', 'AuthorModel',
      '_items', '_count', '_authors',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig, SocketHelperService,
        UserService, HolderModel, AuthorModel,
        _items, _count, _authors
      ) {
        // Set current scope reference to models
        HolderModel.setScope($scope, false, 'items', 'itemCount');
        AuthorModel.setScope($scope, false, 'authors');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.authors = _authors;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(HolderModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'releaseDate',
          direction: false
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        // Function to change sort column / direction on list
        $scope.changeSort = function changeSort(item) {
          var sort = $scope.sort;

          if (sort.column === item.column) {
            sort.direction = !sort.direction;
          } else {
            sort.column = item.column;
            sort.direction = true;
          }

          _triggerFetchData();
        };

        /**
         * Helper function to fetch specified author property.
         *
         * @param   {Number}    authorId        Author id to search
         * @param   {String}    [property]      Property to return, if not given returns whole author object
         * @param   {String}    [defaultValue]  Default value if author or property is not founded
         *
         * @returns {*}
         */
        $scope.getAuthor = function getAuthor(authorId, property, defaultValue) {
          defaultValue = defaultValue || 'Unknown';
          property = property || true;

          // Find author
          var author = _.find($scope.authors, function iterator(author) {
            return parseInt(author.id, 10) === parseInt(authorId.toString(), 10);
          });

          return author ? (property === true ? author : author[property]) : defaultValue;
        };

        /**
         * Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch holder data
         * from server.
         */
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        /**
         * Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch holder data
         * from server.
         */
        $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _triggerFetchData();
          }
        });

        var searchWordTimer;

        /**
         * Watcher for 'filter' scope variable, which contains multiple values that we're interested
         * within actual GUI. This will trigger new data fetch query to server if following conditions
         * have been met:
         *
         *  1) Actual filter variable is different than old one
         *  2) Search word have not been changed in 400ms
         *
         * If those are ok, then watcher will call 'fetchData' function.
         */
        $scope.$watch('filters', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            if (searchWordTimer) {
              $timeout.cancel(searchWordTimer);
            }

            searchWordTimer = $timeout(_triggerFetchData, 400);
          }
        }, true);

        /**
         * Helper function to trigger actual data fetch from backend. This will just check current page
         * scope variable and if it is 1 call 'fetchData' function right away. Any other case just set
         * 'currentPage' scope variable to 1, which will trigger watcher to fetch data.
         *
         * @private
         */
        function _triggerFetchData() {
          if ($scope.currentPage === 1) {
            _fetchData();
          } else {
            $scope.currentPage = 1;
          }
        }

        /**
         * Helper function to fetch actual data for GUI from backend server with current parameters:
         *  1) Current page
         *  2) Search word
         *  3) Sort order
         *  4) Items per page
         *
         * Actually this function is doing two request to backend:
         *  1) Data count by given filter parameters
         *  2) Actual data fetch for current page with filter parameters
         *
         * These are fetched via 'HolderModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters)
          };

          // Data query specified parameters
          var parameters = {
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = HolderModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = HolderModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // Load all needed data
          $q
            .all([count, load])
            .finally(
              function onFinally() {
                $scope.loaded = true;
                $scope.loading = false;
              }
            )
          ;
        }
      }
    ])
  ;
}());
