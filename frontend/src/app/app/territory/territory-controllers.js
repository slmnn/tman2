/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.territory
' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new territory creation.
  angular.module('frontend.app.territory')
    .controller('TerritoryAddController', [
      '$scope', '$state', 
      'HolderModel', 
      '_holders',
      '_app',
      'MessageService', 'TerritoryModel',
      function controller(
        $scope, $state,
        HolderModel, 
        _holders,
        _app,
        MessageService, TerritoryModel
      ) {
        $scope.holders = _holders;
        $scope.app = _app[0];

        // Initialize territory model
        var initModel = function() {
          $scope.territory = {
            name: '',
            description: '',
            type: '',
            covered: new Date(),
            taken: new Date()
          };
          $scope.selectedHolder = $scope.app.defaultHolder;
        };
        initModel();

        $scope.datePickerOpened = function datePickerOpened($event) {
          if ($event) {
              $event.preventDefault();
              $event.stopPropagation(); // This is the magic
          }
        };

        /**
         * Scope function to store new territory to database. After successfully save user will be redirected
         * to view that new created territory.
         */
        $scope.addTerritory = function addTerritory() {
          var data = angular.copy($scope.territory);
          if($scope.selectedHolder) {
            data.holder = {id: $scope.selectedHolder};
          } else {
            data.holder = $scope.app.defaultHolder;
          }
          TerritoryModel
            .create(data)
            .then(
              function onSuccess() {
                MessageService.success('New territory added successfully');
                $state.go($state.current, {reload: true});
                initModel();
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single territory on GUI.
  angular.module('frontend.app.territory')
    .controller('TerritoryController', [
      '$scope', '$state', '_', '$timeout',
      'UserService', 'MessageService',
      'TerritoryModel', 'HolderModel', 'SpecialAddressModel',
      '_territory', '_holders', '_app', '_attributes',
      'TerritoryHolderHistoryModel',
      'TerritoryLinkAttributeModel',
      'CoordinateModel', 'uiGmapGoogleMapApi',
      function controller(
        $scope, $state, _, $timeout,
        UserService, MessageService,
        TerritoryModel, HolderModel, SpecialAddressModel,
        _territory, _holders, _app, _attributes,
        TerritoryHolderHistoryModel,
        TerritoryLinkAttributeModel,
        CoordinateModel, uiGmapGoogleMapApi
      ) {
        // Set current scope reference to models
        TerritoryModel.setScope($scope, 'territory');
        HolderModel.setScope($scope, false, 'holders', 'holdersCount');

        // Expose necessary data to the scope.
        $scope.user = UserService.user();
        $scope.territory = angular.copy(_territory);
        $scope.holders = _holders;
        $scope.attributes = _attributes;
        $scope.app = _app[0];

        $scope.pickers = {};

        $scope.pickers.thhEndDateOpened = false;
        $scope.pickers.thhStartDateOpened = false;
        $scope.pickers.coveredDateOpened = false;
        $scope.pickers.takenDateOpened = false;

        $scope.openPickers = function openPickers(key) {
          $timeout(function() {
            $scope.pickers[key] = true;
          });
        };
        
        $scope.closePickers = function closePickers(key) {
          $timeout(function() {
            $scope.pickers[key] = true;
          });
        };

        // Create Google Map settings for showing the center and border of the territory.
        // Copy the border path from territory.
        var path = [];
        _.each(_territory.coordinates, function(c) {
          path.push(c);
        });

        // Describe the map.
        $scope.map = { 
          center: $scope.territory.center || { latitude: 61, longitude: 23},
          zoom: 12, 
          territoryCenterMarker : { 
            id: $scope.territory.center ? $scope.territory.center.id : 0,
            options: {
              draggable: false
            },
            coords: $scope.territory.center || { latitude: 61, longitude: 23},
            events: {
              dragend: function () {
                $scope.map.territoryCenterMarker.options = {
                  draggable: true,
                  labelContent: 'lat: ' + $scope.map.territoryCenterMarker.coords.latitude + ' ' + 'lon: ' + $scope.map.territoryCenterMarker.coords.longitude,
                  labelAnchor: '100 0',
                  labelClass: 'marker-labels'
                };
              }
            }
          },

          // Create a polygon from coordinate array attached to the territory.
          polygons: [
            {
              id: 1,
              path: path,
              stroke: {
                color: '#33CDDC',
                weight: 3
              },
              editable: true,
              draggable: false,
              geodesic: true,
              visible: true,
              fill: {
                color: '#33CCCC',
                opacity: 0.2
              },
            }
          ]
        };

        // Toggle the map status to be editable.
        $scope.editableMap = false;
        $scope.toggleMapEditable = function makeMapEditable() {
          $timeout(function() {
            $scope.editableMap = !$scope.editableMap;
            $scope.map.territoryCenterMarker.options.draggable = !$scope.map.territoryCenterMarker.options.draggable;
          });
        };

        // Replace the polyline with a new one with calculated coordinates.
        $scope.replacePolylineWithDefault = function replacePolylineWithDefault() {
          
          // Delete All
          deletePolylineCoordinates(angular.copy($scope.territory.coordinates));

          // Create simple rectangle          
          $scope.map.polygons[0].path = [];
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude + 0.005,
            longitude: $scope.map.center.longitude + 0.005
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude + 0.005,
            longitude: $scope.map.center.longitude - 0.005
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude - 0.005,
            longitude: $scope.map.center.longitude - 0.005
          });
          $scope.map.polygons[0].path.push({
            latitude: $scope.map.center.latitude - 0.005,
            longitude: $scope.map.center.longitude + 0.005
          });

          // Save to the backend.
          $scope.saveMap($scope.map);
        };

        // Delete set of coordinates with ids;
        var deletePolylineCoordinates = function deletePolylineCoordinates(polyline) {
            _.each(polyline, function(p){
              if(p.id) {
                CoordinateModel.delete(p.id);
              }
            });
        };

        // Save the map to the backend.
        $scope.saveMap = function saveMap() {

          // Save the marker either by updating or creating a new one.
          var coords = $scope.map.territoryCenterMarker.coords;
          if($scope.map.territoryCenterMarker && 
            $scope.map.territoryCenterMarker.id && 
            $scope.map.territoryCenterMarker.id !== 0) {
            coords.type = 'center';
            CoordinateModel.update($scope.map.territoryCenterMarker.id, coords);
          } else {
            coords.type = 'center';
            CoordinateModel.create(coords)
            .then(function onSuccess(response){
              TerritoryModel
                .update($scope.territory.id, { center : response.data.id })
                .then(
                  function onSuccess() {
                    MessageService.success('Territory "' + $scope.territory.territoryCode + '" updated successfully');
                    $state.go($state.current, {id: _territory.id}, {reload: true});
                  }
                )
              ;
            });
          }

          // Save the polyline.
          if($scope.map.polygons[0]) {

            // Convert coordinates to backend compatible form.
            var path = [];
            var oldPathIds = [];
            _.each($scope.map.polygons[0].path, function(p) {
              p.type = 'border';
              p.territory = { id: $scope.territory.id };
              path.push(p);
              if(p.id) {
                oldPathIds.push(p.id);
              }
            });
            _.each(oldPathIds, function(oldId){
              CoordinateModel.delete(oldId);
            });
            _.each(path, function(p){
              CoordinateModel.create(p);
            });
          }

          $scope.toggleMapEditable();
        };

        $scope.saveTerritoryHistory = function saveTerritoryHistory() {
          _.each($scope.territory.territoryHolderHistory, function(thh) {
            $scope.saveTerritoryHistoryItem(thh);
          });
          $timeout(function() {
              $state.go($state.current, {id: _territory.id}, {reload: true});
          }, 2000);
        };

        $scope.onlyActiveHolders = function onlyActiveHolders(holder) {
          return holder.isArchived ? false : true;
        };

        $scope.saveTerritoryHistoryItem = function saveTerritoryHistoryItem(historyItem) {
          TerritoryHolderHistoryModel
          .update(historyItem.id, {
            startDate: historyItem.startDate,
            endDate: historyItem.endDate,
            description: historyItem.description,
            holder: historyItem.holder
          })            
          .then(
            function onSuccess() {
              MessageService.success('Territory history item updated.');
            }
          );
        };

        var territoryHolderHistoryItemToBeDeletedId = null;
        $scope.setTerritoryHolderHistoryToBeDeleted = function setTerritoryHolderHistoryToBeDeleted(historyItem) {
          territoryHolderHistoryItemToBeDeletedId = historyItem.id;
        };

        // Territory delete dialog buttons configuration
        $scope.confirmHistoryButtonsDelete = {
          ok: {
            label: 'Poista',
            className: 'btn-danger',
            callback: function callback() {
              TerritoryHolderHistoryModel
              .delete(territoryHolderHistoryItemToBeDeletedId)            
              .then(
                function onSuccess() {
                  MessageService.success('Territory holder history row deleted successfully');
                  territoryHolderHistoryItemToBeDeletedId = null;
                  $scope.deleteTerritoryHolderHistoryItemVisible = false;
                  $state.go($state.current, {id: _territory.id}, {reload: true});
                }
              );
            }
          },
          cancel: {
            label: 'Peruuta',
            className: 'btn-default pull-left',
            callback: function callback() {
              territoryHolderHistoryItemToBeDeletedId = null;
            }
          }
        };

        // Territory delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Poista',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteTerritory();
            }
          },
          cancel: {
            label: 'Peruuta',
            className: 'btn-default pull-left'
          }
        };

        // Scope function to save modified territory.
        $scope.saveTerritory = function saveTerritory() {
          var data = angular.copy($scope.territory);

          data.holder = data.holder.id || $scope.app.defaultHolder;

          // Add holder history item
          if(!_territory.holder || data.holder !== _territory.holder.id) {
            var now = new Date();

            // Update the last row with end time
            if(data.territoryHolderHistory && 
              data.territoryHolderHistory.length > 0 && 
              !_.last(data.territoryHolderHistory).endTime) {
              TerritoryHolderHistoryModel
              .update(
                _.last(data.territoryHolderHistory).id,
                {
                  endDate: now
                }
              );
            }

            // If the new holder is not default holder, add new row.
            if(data.holder !== $scope.app.defaultHolder) {
              var holderHistoryData = {
                startDate: now,
                holder: data.holder,
                territory: data.id
              };

              TerritoryHolderHistoryModel
                .create(holderHistoryData)
                .then(
                  function onSuccess() {
                    MessageService.success('Territory history for "' + $scope.territory.territoryCode + '" created successfully');
                  }
                )
              ;  
            }          
          }

          data.territoryHolderHistory = null;

          // Make territory data update
          TerritoryModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('Territory "' + $scope.territory.territoryCode + '" updated successfully');
                $state.go($state.current, {id: _territory.id}, {reload: true});
              }
            )
          ;

        };

        // Scope function to delete territory

        $scope.deleteTerritory = function deleteTerritory() {
          TerritoryModel
            .delete($scope.territory.id)
            .then(
              function onSuccess() {
                MessageService.success('Territory "' + $scope.territory.territoryCode + '" deleted successfully');

                $state.go('app.territories');
              }
            )
          ;
        };

        $scope.getHolderNameWithId = function getHolderNameWithId(holderId) {
          return  _.result(
              _.find(_holders, function(h) {
                return h.id === holderId;
              }), 
              'name'
            );
        };

        $scope.getAttributeWithId = function getAttributeWithId(attributes, id) {
          return _.find(attributes, function(a) {
            return a.id === id;
          });
        };

        $scope.addNewAttribute = function addNewAttribute(attribute) {
          TerritoryLinkAttributeModel.create({
            attribute: attribute.id,
            territory: _territory.id
          })
          .then(function onSuccess(){
            MessageService.success('Attribuutti "' + attribute.name + '" lisättiin.');
            $scope.deleteTerritoryLinkAttributeItemVisible = false;
            $state.go($state.current, {id: _territory.id}, {reload: true});
          });
        };

        var specialAddressToBeDeletedId = null;
        $scope.setSpecialAddressToBeDeleted = function setSpecialAddressToBeDeleted(item) {
          specialAddressToBeDeletedId = item.id;
        };

        var territoryLinkAttributeItemToBeDeletedId = null;
        $scope.setTerritoryLinkAttributeToBeDeleted = function setTerritoryLinkAttributeToBeDeleted(item) {
          territoryLinkAttributeItemToBeDeletedId = item.id;
        };

        $scope.addSpecialAddress = function addSpecialAddress(specialAddress) {
          specialAddress.territory = _territory.id;
          specialAddress.added = new Date();
          SpecialAddressModel.create(specialAddress)
          .then(function onSuccess(){
            MessageService.success('Merkintä kieltopaikasta tai vieraskielisestä osoitteesta lisättiin.');
            $scope.deleteSpecialAddressItemVisible = false;
            $state.go($state.current, {id: _territory.id}, {reload: true});
          });
        };

        $scope.confirmSpecialAddressButtonsDelete = {
          ok: {
            label: 'Poista',
            className: 'btn-danger',
            callback: function callback() {
              SpecialAddressModel
              .delete(specialAddressToBeDeletedId)            
              .then(
                function onSuccess() {
                  MessageService.success('Merkintä poistettiin');
                  specialAddressToBeDeletedId = null;
                  $scope.deleteSpecialAddressItemVisible = false;
                  $state.go($state.current, {id: _territory.id}, {reload: true});
                }
              );
            }
          },
          cancel: {
            label: 'Peruuta',
            className: 'btn-default pull-left',
            callback: function callback() {
              specialAddressToBeDeletedId = null;
            }
          }
        };

        // Territory delete dialog buttons configuration
        $scope.confirmAttributeButtonsDelete = {
          ok: {
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              TerritoryLinkAttributeModel
              .delete(territoryLinkAttributeItemToBeDeletedId)            
              .then(
                function onSuccess() {
                  MessageService.success('Attribuutti poistettiin');
                  territoryLinkAttributeItemToBeDeletedId = null;
                  $scope.deleteTerritoryLinkAttributeItemVisible = false;
                  $state.go($state.current, {id: _territory.id}, {reload: true});
                }
              );
            }
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default pull-left',
            callback: function callback() {
              territoryLinkAttributeItemToBeDeletedId = null;
            }
          }
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for territory list GUI on boilerplate application.
  angular.module('frontend.app.territory')
    .controller('TerritoryListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig',
      'TerritoryHelper',
      'MessageService',
      'MailService',
      'TerritoryHolderHistoryModel',
      'SocketHelperService', 'UserService', 'TerritoryModel',
      '_items', '_count', '_holders', '_app', '_attributes',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig,
        TerritoryHelper,
        MessageService,
        MailService,
        TerritoryHolderHistoryModel,
        SocketHelperService, UserService, TerritoryModel,
        _items, _count, _holders, _app, _attributes
      ) {
        // Set current scope reference to model
        TerritoryModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.holders = _holders;
        $scope.attributes = _attributes;
        $scope.app = _app[0];
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(TerritoryModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'territoryCode',
          direction: true
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        // Check if backup should be suggested
        var updateBackupSuggestion = function updateBackupSuggestion() {
          var lastBackup = new Date($scope.app.lastBackup);
          var now = new Date();
          $scope.suggestBackup = false;
          if(now.getTime() - lastBackup.getTime() > $scope.app.backupInterval * 24 * 60 * 60 * 1000) {
            $scope.suggestBackup = true;
          }
        };
        $timeout(updateBackupSuggestion, 2500);

        $scope.runBackup = function runBackup() {
          MailService.backup().then(function() {
            MessageService.success('Tiedot varmuuskopioitiin.');
            updateBackupSuggestion();
          });
        };

        var updateMailCount = function updateMailCount() {
          MailService.count().then(function(data) {
            $scope.mails = data.data;
            $scope.mailsTotal = data.data.new_territory_taken_emails + data.data.territory_removed_emails + data.data.not_covered_territory_emails;
          });
        };
        $timeout(updateMailCount, 5000);

        $scope.sendNotificationEmails = function sendNotificationEmails() {
          MailService.send(null).then(function(data) {
            console.log(data);
            MessageService.success('Sähköpostiviestit lähetettiin.');
            updateMailCount();
          });
        };

        // Initialize checked rows data.
        $scope.onlyCheckedTerritories = function onlyCheckedTerritories(territory) {
          return territory.checked;
        };

        $scope.onlyActiveHolders = function onlyActiveHolders(holder) {
          return holder.isArchived ? false : true;
        };

        $scope.isDefaultHolder = function isDefaultHolder(holderId) {
          return holderId === $scope.app.defaultHolder;
        };

        $scope.selectedHolder = $scope.app.defaultHolder;

        // Callback that is evaluated when user toggles a territory checkbox.
        $scope.territoryChecked = function territoryChecked(changedTerritoryId) {
          $scope.territoryOperationChange();
        };

        $scope.clearSelected = function clearSelected(territories) {
          _.each(territories, function(t) {
            t.checked = false;
          });
        };

        $scope.getAttributeWithId = function getAttributeWithId(attributes, id) {
          return _.find(attributes, function(a) {
            return a.id === id;
          });
        };

        $scope.territoryOperationChange = function territoryOperationChange(operation) {
          $scope.selectedHolder = $scope.app.defaultHolder;
        };

        var makeHolderHistoryUpdate = function(territory, comment, newHolderId) {

          // If the holder change was anything else but return to the default
          // holder, add also row into history.
          if(newHolderId !== $scope.app.defaultHolder) {
            TerritoryHolderHistoryModel
            .create(
              {
                startDate: new Date(),
                holder: newHolderId,
                territory: territory.id,
                description: comment
              }
            );
          }

          // If there was a row in history, update the end time if it is not already defined.
          if(
            territory.territoryHolderHistory && 
            territory.territoryHolderHistory.length > 0 && 
            !_.last(territory.territoryHolderHistory).endTime
          ) {
            TerritoryHolderHistoryModel
            .update(
              _.last(territory.territoryHolderHistory).id,
              {
                endDate: new Date()
              }
            );
          }
        };

        $scope.markTerritoriesAsCovered = function markTerritoriesAsCovered(territories, comment) {
          _.each(territories, function(t) {
            TerritoryModel
            .update(t.id, 
              {
                covered: new Date()
              }
            );

            makeHolderHistoryUpdate(t, comment, t.holder.id);
          });
          updateMailCount();
        };

        $scope.changeHolder = function changeHolder(territories, markAsCovered, newHolderId, comment) {
          var errorSelection = false;
          _.each(territories, function(t) {
            if(t.holder && t.holder.id == newHolderId) {
              MessageService.error('Yksi valituista alueista, ' + t.territoryCode + ', on jo merkitty tälle omistajalle.');
              errorSelection = true;
            }
          });
          if(errorSelection) {
            return;
          }
          _.each(territories, function(t) {
            if(!t.holder || (t.holder != newHolderId && t.holder.id != newHolderId)) {
              var data = {
                taken: new Date(),
                holder: newHolderId
              };
              if(markAsCovered) {
                data.covered = new Date();
              }
              TerritoryModel
              .update(t.id, data);

              makeHolderHistoryUpdate(t, comment, newHolderId);
            }
          });
          updateMailCount();
        };

        $scope.isNotCoveredLimitExeeded = function(territory, app) {
          return TerritoryHelper.isNotCoveredRecently(territory, app);
        };

        $scope.isHolderNotChangedLimitExeeded = function(territory, app) {
          return TerritoryHelper.isHolderNotChangedLimitExeeded(territory, app);
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
            populate: ['holder', 'territoryHolderHistory', 'territoryLinkAttribute'],
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = TerritoryModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = TerritoryModel
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

  angular.module('frontend.app.territory')
    .controller('TerritoryStatsController', [
      '$scope', '$q',
      '_',
      'ListConfig',
      'SocketHelperService', 'UserService',
      'StatModel',
      '_items',
      '_app',
      function controller(
        $scope, $q,
        _,
        ListConfig,
        SocketHelperService, UserService,
        StatModel,
        _items,
        _app
      ) {

        var formDaysMonthsYearsObject = function(in_millisecs) {
          var millisecondsPerDay = 1000 * 60 * 60 * 24;
            var days = in_millisecs / millisecondsPerDay;
            var months = days / 30;
            var years = months / 12;
            days = days % 30;
            months = months % 12;
            return {'days':Math.floor(days), 'months':Math.floor(months), 'years': Math.floor(years)};
        }

        // Set initial data
        $scope.territories = _items;
        $scope.app = _app[0];
        $scope.user = UserService.user();

        $scope.totalCount = 0;
        $scope.notCoveredRecently = 0;
        $scope.totalWithoutNotCountedWhenCalculatingCoveredDuringLastYearTotal = 0;
        $scope.holderIsDefault = 0;
        $scope.totalNotCountedWhenCalculatingCoveredDuringLastYearTotal = 0;
        $scope.totalNotCountedWhenCalculatingCoveredDuringLastYearTotalNotCovered = 0;
        $scope.averageCoveredTime = 0;
        var totalCoveredTimeMs = 0;
        var totalTimeOnSameHolder = 0;
        var totalTimeOnSameHolderDivider = 0;
        $scope.averageTimeBetweenHolderChange = 0;
        $scope.holderChanges = 0;
        $scope.territoryTypeCounts = [];
        var now = new Date();
        var NOT_COVERED_LIMIT_MS = 1000 * 60 * 60 * 24 * ($scope.app.notCoveredLimit || 365);
        _.each($scope.territories, function(t) {

          $scope.holderChanges += t.territoryHolderHistory ? t.territoryHolderHistory.length : 0;
          _.each(t.territoryHolderHistory, function(thh) {
            var start = new Date(Date.parse(thh.startDate || now));
            var end = new Date(Date.parse(thh.endDate || now));
            totalCoveredTimeMs += (end.getTime() - start.getTime());
          });

          if(t.holder !== $scope.app.defaultHolder && !t.archived) {
            var taken = new Date(Date.parse(t.taken || now));
            totalTimeOnSameHolder += (now.getTime() - taken.getTime());
            totalTimeOnSameHolderDivider++;
          }

          var covered = new Date(Date.parse(t.covered));
          if(now.getTime() - covered.getTime() > NOT_COVERED_LIMIT_MS 
            && !t.notCountedWhenCalculatingCoveredDuringLastYearTotal
            && !t.archived) {
            $scope.notCoveredRecently++;
          }
           if(!t.archived) {
            $scope.totalCount++;
          }
          if(t.notCountedWhenCalculatingCoveredDuringLastYearTotal
            && !t.archived) {
            $scope.totalNotCountedWhenCalculatingCoveredDuringLastYearTotal++;
            if(now.getTime() - covered.getTime() > NOT_COVERED_LIMIT_MS) {
              $scope.totalNotCountedWhenCalculatingCoveredDuringLastYearTotalNotCovered++;
            }
          }
          if(t.holder === $scope.app.defaultHolder) {
            $scope.holderIsDefault++;
          }
        });
        var avCoveredTime = totalCoveredTimeMs / $scope.holderChanges;
        var avCoveredObject = formDaysMonthsYearsObject(avCoveredTime);
        $scope.averageCoveredTime = avCoveredObject.days + ' päivää, ' + avCoveredObject.months + ' kuukautta ja ' + avCoveredObject.years + ' vuotta.';

        var avTimeSameHolder = totalTimeOnSameHolder / totalTimeOnSameHolderDivider;
        var avTimeSameHolderObject = formDaysMonthsYearsObject(avTimeSameHolder);
        $scope.averageTimeSameHolder = avTimeSameHolderObject.days + ' päivää, ' + avTimeSameHolderObject.months + ' kuukautta ja ' + avTimeSameHolderObject.years + ' vuotta.';

        StatModel.create({
          statisticDate: new Date(),
          averageCoveredTime: avCoveredTime,
          averageHoldingTime: avTimeSameHolder,
          totalCount: $scope.totalCount,
          notCoveredCount: $scope.notCoveredRecently,
          availableCount: $scope.holderIsDefault,
        });
      }
    ])
  ;

  angular.module('frontend.app.territory')
    .controller('TerritoryS13Controller', [
      '$scope', '$q',
      '_',
      'ListConfig',
      'SocketHelperService', 'UserService',
      '_items', '_holders',
      function controller(
        $scope, $q,
        _,
        ListConfig,
        SocketHelperService, UserService,
        _items, _holders
      ) {

        // Set initial data
        $scope.territories = _items;
        $scope.holders = _holders;
        $scope.user = UserService.user();

        _.each($scope.territories, function(t) {
          t.emptyArray = Array.apply(null, Array(20 - t.territoryHolderHistory.length)).map(function (x, i) { return i; });
        });

        $scope.getHolderNameWithId = function getHolderNameWithId(holderId) {
          return  _.result(
              _.find(_holders, function(h) {
                return h.id === holderId;
              }), 
              'name'
            );
        };
      }
    ])
  ;

  angular.module('frontend.app.territory')
    .controller('TerritoryQuickViewController', [
      '$scope', '$q',
      '_',
      'ListConfig',
      'TerritoryHelper',
      'SocketHelperService', 'UserService',
      '_items', '_holders', '_app',
      function controller(
        $scope, $q,
        _,
        ListConfig,
        TerritoryHelper,
        SocketHelperService, UserService,
        _items, _holders, _app
      ) {
        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.territories = _items;
        $scope.holders = _holders;
        $scope.app = _app[0];
        $scope.user = UserService.user();

        $scope.isNotCoveredRecently = function isNotCoveredRecently(territory, app) {
          return TerritoryHelper.isNotCoveredRecently(territory, app);
        };

        $scope.isDefaultHolder = function isDefaultHolder(holderId) {
          return holderId === $scope.app.defaultHolder;
        };

        $scope.getHolderNameWithId = function getHolderNameWithId(holderId) {
          return  _.result(
              _.find(_holders, function(h) {
                return h.id === holderId;
              }), 
              'name'
            );
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for territory list GUI on boilerplate application.
  angular.module('frontend.app.territory')
    .controller('TerritoryMapController', [
      '$scope', '$q', '$filter',
      '_',
      'ListConfig',
      'TerritoryHelper',
      'SocketHelperService', 'UserService',
      '_items', '_app',
      function controller(
        $scope, $q, $filter,
        _,
        ListConfig,
        TerritoryHelper,
        SocketHelperService, UserService,
        _items, _app
      ) {
        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        $scope.territories = _items;
        $scope.app = _app[0];
        $scope.user = UserService.user();

        // Set initial data
        $scope.map = {
          center: {
            latitude: $scope.app.defaultLatitude || 61,
            longitude: $scope.app.defaultLongitude || 23
          },
          zoom: 10
        }

        $scope.onClick = function onClick(marker) {
          $scope.selectedMarker = marker.model;
        };

        var getIconUrl = function getIconUrl(territory) {
          try {
            if(TerritoryHelper.isNotCoveredRecently(territory, $scope.app)) {
              if(territory.holder.id !== $scope.app.defaultHolder) {
                return '/assets/images/red.png';
              }
              return '/assets/images/red-dot.png';
            }
            if(territory.holder.id !== $scope.app.defaultHolder) {
              return '/assets/images/green-dot.png';
            }
            return '/assets/images/green.png';           
          } catch(err) {
            return '/assets/images/yellow.png';
          }

        };

        _.each($scope.territories, function(t) {
          t.markerOptions = {
            icon: { url: getIconUrl(t) }
          }
        })


      }
    ])
  ;
}());