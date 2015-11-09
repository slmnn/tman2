/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.territory
' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new territory creation.
  angular.module('frontend.examples.territoryHolderHistory')
    .controller('TerritoryHolderHistoryAddController', [
      '$scope', '$state', '$translate',
      'MessageService', 'TerritoryHolderHistoryModel',
      function controller(
        $scope, $state, $translate,
        MessageService, TerritoryHolderHistoryModel
      ) {

        $translate(['NEW_HOLDER_HISTORY_ADDED_SUCCESS']).then(function (translations) {
          $scope.NEW_HOLDER_HISTORY_ADDED_SUCCESS = translations.NEW_HOLDER_HISTORY_ADDED_SUCCESS;
        });

        // Initialize territory model
        $scope.territoryHolderHistory = {
          name: '',
          description: ''
        };

        /**
         * Scope function to store new territory to database. After successfully save user will be redirected
         * to view that new created territory Holder History.
         */
        $scope.addTerritoryHolderHistory = function addTerritoryHolderHistory() {
          TerritoryHolderHistoryModel
            .create(angular.copy($scope.territory))
            .then(
              function onSuccess(result) {
                MessageService.success($scope.NEW_HOLDER_HISTORY_ADDED_SUCCESS);

                $state.go('examples.territoryHolderHistories', {id: result.data.id});
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single territory on GUI.
  angular.module('frontend.examples.territoryHolderHistory')
    .controller('TerritoryHolderHistoryController', [
      '$scope', '$state', '$translate',
      'UserService', 'MessageService',
      'TerritoryHolderHistoryModel', 'HolderModel',
      '_territoryHolderHistory', '_holders', '_holdersCount',
      function controller(
        $scope, $state, $translate,
        UserService, MessageService,
        TerritoryHolderHistoryModel, HolderModel,
        _territoryHolderHistory, _holders, _holdersCount
      ) {

        // Set current scope reference to models
        TerritoryHolderHistoryModel.setScope($scope, 'territoryHolderHistory');
        HolderModel.setScope($scope, false, 'holders', 'holdersCount');

        // Expose necessary data
        $scope.user = UserService.user();
        $scope.territoryHolderHistory = _territoryHolderHistory;
        $scope.holders = _holders;
        $scope.holdersCount = _holdersCount.count;

        // Territory delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: $translate.instant('SAVE'),
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteTerritoryHolderHistory();
            }
          },
          cancel: {
            label: $translate.instant('CANCEL'),
            className: 'btn-default pull-left'
          }
        };

        // Scope function to save modified territory.
        $scope.saveTerritoryHolderHistory = function saveTerritoryHolderHistory() {
          var data = angular.copy($scope.territoryHolderHistory);

          //data.holder = $scope.selectHolder;

          console.log(data);

          // Make actual data update
          TerritoryHolderHistoryModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success(
                  $translate.instant('HOLDER_HISTORY_UPDATED_SUCCESS_1') + 
                  $scope.territoryHolderHistory.name + 
                  $translate.instant('HOLDER_HISTORY_UPDATED_SUCCESS_2'));
              }
            )
          ;
        };

        // Scope function to delete territory

        $scope.deleteTerritoryHolderHistory = function deleteTerritoryHolderHistory() {
          TerritoryHolderHistoryModel
            .delete($scope.territory.id)
            .then(
              function onSuccess() {
                MessageService.success(
                  $translate.instant('HOLDER_HISTORY_UPDATED_SUCCESS_1') + 
                  $scope.territoryHolderHistory.name + 
                  $translate.instant('HOLDER_HISTORY_REMOVED_SUCCESS_2'));

                $state.go('examples.territories');
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for territory list GUI on boilerplate application.
  angular.module('frontend.examples.territoryHolderHistory')
    .controller('TerritoryHolderHistoryListController', [
      '$scope', '$q', '$timeout', '$translate',
      '_',
      'ListConfig',
      'SocketHelperService', 'UserService', 'TerritoryHolderHistoryModel',
      '_items', '_count', 
      function controller(
        $scope, $q, $timeout, $translate,
        _,
        ListConfig,
        SocketHelperService, UserService, TerritoryHolderHistoryModel,
        _items, _count
      ) {
        // Set current scope reference to model
        TerritoryHolderHistoryModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(TerritoryHolderHistoryModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'name',
          direction: true
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
         * Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch territory data
         * from server.
         */
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        /**
         * Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch territory data
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
         * These are fetched via 'TerritoryModel' service with promises.
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
            populate: 'holders',
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = TerritoryHolderHistoryModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = TerritoryHolderHistoryModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // And wrap those all to promise loading
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
