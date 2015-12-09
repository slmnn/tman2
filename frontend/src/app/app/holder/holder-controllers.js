/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.holder' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new holder creation.
  angular.module('frontend.app.holder')
    .controller('HolderAddController', [
      '$scope', '$state',
      'MessageService',
      'HolderModel',
      function controller(
        $scope, $state,
        MessageService,
        HolderModel
      ) {

        // Initialize holder model
        var initScope = function() {
          $scope.holder = {
            name: '',
            email: '',
            emailValid: true,
            isArchived: false,
            territories: []
          };
        };
        initScope();

        /**
         * Scope function to store new holder to database. After successfully save user will be redirected
         * to view that new created holder.
         */
        $scope.addHolder = function addHolder() {
          var data = angular.copy($scope.holder)
          HolderModel
            .create(data)
            .then(
              function onSuccess(value) {
                if(value.status == 201) {
                  MessageService.success('Uusi alueomistaja luotiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
                initScope();
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single holder on GUI.
  angular.module('frontend.app.holder')
    .controller('HolderController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'TerritoryHelper',
      'HolderModel', 'TerritoryModel',
      '_holder', '_app',
      function controller(
        $scope, $state,
        UserService, MessageService,
        TerritoryHelper,
        HolderModel, TerritoryModel,
        _holder, _app
      ) {
        // Set current scope reference to model
        HolderModel.setScope($scope, 'holder');

        // Initialize scope data
        $scope.user = UserService.user();
        $scope.holder = _holder;
        $scope.app = _app[0];
        $scope.territories = [];

        $scope.isNotCoveredLimitExeeded = function(territory, app) {
          return TerritoryHelper.isNotCoveredRecently(territory, app);
        };

        $scope.isHolderNotChangedLimitExeeded = function(territory, app) {
          return TerritoryHelper.isHolderNotChangedLimitExeeded(territory, app);
        };

        // Holder delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Poista',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteHolder();
            }
          },
          cancel: {
            label: 'Peruuta',
            className: 'btn-default pull-left'
          }
        };

        /**
         * Scope function to save the modified holder. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveHolder = function saveHolder() {
          var data = angular.copy($scope.holder);
          data.isArchived = data.isArchived || false;
          data.emailValid = data.emailValid || true;

          // Make actual data update
          HolderModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Alueomistajan "' + $scope.holder.name + '" tiedot päivitettiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
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
                MessageService.success('Alueomistaja "' + $scope.holder.name + '" poistettiin.');

                $state.go('app.holders');
              }
            )
          ;
        };

        /**
         * Scope function to fetch territory data when needed, this is triggered whenever user starts to edit
         * current holder.
         *
         * @returns {null|promise}
         */
        $scope.loadTerritorys = function loadTerritorys() {
          if ($scope.territorys.length) {
            return null;
          } else {
            return TerritoryModel
              .load()
              .then(
                function onSuccess(data) {
                  $scope.territorys = data;
                }
              )
            ;
          }
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for holder list GUI on boilerplate application.
  angular.module('frontend.app.holder')
    .controller('HolderListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig', 'SocketHelperService',
      'UserService', 'HolderModel', 'TerritoryModel',
      '_items', '_count',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig, SocketHelperService,
        UserService, HolderModel, TerritoryModel,
        _items, _count
      ) {
        // Set current scope reference to models
        HolderModel.setScope($scope, false, 'items', 'itemCount');
        TerritoryModel.setScope($scope, false, 'territories');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(HolderModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'name',
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
         * Helper function to fetch specified territory property.
         *
         * @param   {Number}    territoryId     Territory id to search
         * @param   {String}    [property]      Property to return, if not given returns whole territory object
         * @param   {String}    [defaultValue]  Default value if territory or property is not founded
         *
         * @returns {*}
         */
        $scope.getTerritory = function getTerritory(territoryId, property, defaultValue) {
          defaultValue = defaultValue || 'Unknown';
          property = property || true;

          // Find territory
          var territory = _.find($scope.territorys, function iterator(territory) {
            return parseInt(territory.id, 10) === parseInt(territoryId.toString(), 10);
          });

          return territory ? (property === true ? territory : territory[property]) : defaultValue;
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
            populate: 'territories',
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
