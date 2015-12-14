/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.migrate' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.admin.migrate')
    .controller('MigrateController', [
      '_',
      '$scope', '$state', 
      'UserModel', 
      'TerritoryModel',
      'HolderModel',
      'CoordinateModel',
      'TerritoryHolderHistoryModel',
      '_app',
      'MessageService',
      function controller(
        _,
        $scope, $state,
        UserModel, 
        TerritoryModel,
        HolderModel,
        CoordinateModel,
        TerritoryHolderHistoryModel,
        _app,
        MessageService
      ) {
        var app = _app[0];

        var _newTerritories;
        var _newHolders;

        var _newHolderIds = [];
        var _newTerritoryIds = [];
        var _newCoordinateIds = [];
        var _newHolderHistories = [];

        $scope.rollback = function rollback() {
          _.each(_newTerritoryIds, function(id) {
            TerritoryModel.delete(id);
          });
          _.each(_newHolderIds, function(id) {
            HolderModel.delete(id);
          });
          _.each(_newCoordinateIds, function(id) {
            CoordinateModel.delete(id);
          });
          _.each(_newHolderHistories, function(id) {
            TerritoryHolderHistoryModel.delete(id);
          });
        };

        $scope.parseMigrationHolders = function parseMigrationHolders(migration) {
          _newHolders = JSON.parse(migration.holders);

          _.each(_newHolders, function(h) {
            HolderModel.create(
              {
                name: h.name,
                email: h.email,
                emailValid: h.emailValid,
                isArchived: false,
              }
            )            
            .then(
              function onSuccess(result) {
                h.new_id = result.data.id;
                _newHolderIds.push(result.data.id);
              }
            );
          });
        };

        $scope.parseMigrationTerritories = function parseMigrationTerritories(migration) {
          _newTerritories = JSON.parse(migration.territories);

          _.each(_newTerritories, function(t) {

            var holder = _newHolders.filter(function(i) { return i.id == t.holder; })[0];
            var holderId = (holder && holder.new_id) ? holder.new_id : app.defaultHolder;

            CoordinateModel.create({
              latitude: t.lat,
              longitude: t.lng,
              type: 'center'
            }).then(
              function onSuccess(result) {
                var new_coordinateId = result.data.id;
                _newCoordinateIds.push(result.data.id);

                TerritoryModel.create(
                  {
                    territoryCode: t.territoryCode,
                    lastCoveredTime: t.lastCoveredTime,
                    notificationEmailDate: t.notificationEmailDate,
                    taken: t.reallyTaken,
                    covered: t.taken,
                    description: t.description,
                    holder: holderId,
                    center: new_coordinateId,
                    archived: false,
                    type: t.type == 'Normal' ? 'Tavallinen' : null,
                    notCountedWhenCalculatingCoveredDuringLastYearTotal: t.type == 'Normal' ? false : true
                  }
                )
                .then(
                  function onSuccess(result) {
                    t.new_id = result.data.id;
                    _newTerritoryIds.push(result.data.id);

                    if(holderId != app.defaultHolder) {
                      
                      TerritoryHolderHistoryModel.create({
                        holder: holderId,
                        territory: t.new_id,
                        startDate: t.reallyTaken
                      }).then(
                        function onSuccess(result) {
                          _newHolderHistories.push(result.data.id);
                        }
                      );                      
                    }
                  }
                );
              }
            );
          });
        };
      }
    ])
  ;

}());
