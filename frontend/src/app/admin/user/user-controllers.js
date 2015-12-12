/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.user' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.admin.user')
    .controller('UserAddController', [
      '$scope', '$state', 
      'UserModel', 
      '_app', '_holders',
      'MessageService',
      function controller(
        $scope, $state,
        UserModel, 
        _app, _holders,
        MessageService
      ) {

        // Set current scope reference to model
        UserModel.setScope($scope, 'user');

        $scope.app = _app[0];
        $scope.holders = _holders;

        // Initialize territory model
        var initModel = function() {
          $scope.user = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            archived: false,
            admin: false
          };
        };
        initModel();

        /**
         * Scope function to store new user to database. After successfully save user will be redirected
         * to view users list.
         */
        $scope.addUser = function addUser() {
          var data = angular.copy($scope.user);
          if($scope.selectedHolderId) {
            data.holder = $scope.selectedHolderId;
          }
          UserModel
            .create(data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Uusi käyttäjä lisättiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }

                $state.go('admin.user', {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single user on GUI.
  angular.module('frontend.admin.user')
    .controller('UserController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'UserModel',
      '_user', '_holders', '_app',
      function controller(
        $scope, $state,
        UserService, MessageService,
        UserModel, _user, _holders, _app
      ) {

        // Initialize scope data
        $scope.currentUser = UserService.user();
        $scope.user = _user;
        $scope.holders = _holders;

        /**
         * Scope function to save the modified holder. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveUser = function saveUser() {
          var data = angular.copy($scope.user);
          if(data.holder != null && data.holder.id !== _app[0].defaultHolder.id) {
            data.holder = data.holder.id;
          } 
          else if(data.holder != null && data.holder.id === _app[0].defaultHolder.id) {
            data.holder = null;
          }
          else {
            data.holder = null;
          }

          // Make actual data update
          UserModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Käyttäjän "' + $scope.user.username + '" tiedot päivitettiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
                $state.go($state.current, {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;

  angular.module('frontend.admin.user')
    .controller('UsersController', [
      '$scope', '$timeout', '$q', '$filter',
      '_',
      'ListConfig',
      'SocketHelperService',
      'MessageService',
      'UserService',
      'UserModel',
      '_items', '_count',
      function controller(
        $scope, $timeout, $q, $filter,
        _,
        ListConfig,
        SocketHelperService,
        MessageService,
        UserService,
        UserModel,
        _items, _count
      ) {
        // Set current scope reference to models
        UserModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(UserModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'createdAt',
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

        // Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        // Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch book data from server.
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
         * These are fetched via 'UserModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters),
            populate: 'user'
          };

          // Data query specified parameters
          var parameters = {
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = UserModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = UserModel
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

        _triggerFetchData();
      }
    ])
  ;
}());
