/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.app' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller to show single app on GUI.
  angular.module('frontend.app.app')
    .controller('AppController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'AppModel',
      '_app',
      '_holders',
      function controller(
        $scope, $state,
        UserService, MessageService,
        AppModel,
        _app,
        _holders
      ) {

        // Set current scope reference to model
        AppModel.setScope($scope, 'app');

        // Initialize scope data
        $scope.user = UserService.user();
        $scope.app = _app[0];
        $scope.holders = _holders;
        $scope.mapTypes = ["hybrid", "satellite", "roadmap", "terrain"];

        // If app is undefined, create one and reload.
        if(_app.length === 0) {
          AppModel
          .create(
            {
              lastBackup : new Date(),
              backupInterval : 7,
              backupEmail : 'example.email.address@example.com',
              lastStats : new Date(),
              notCoveredLimit : 365,
              notCoveredWarningEmailLimit : 100,  
              holderNotChangedWarningLimit : 200,
              holderChangePreventedIfLimitExeeded : false,
              holderChangeToDefaultIfLimitExeeded : false,
              printMapType: "hybrid",
              printMapLineColor: "0x00FF0066",
              printMapAreaFillColor: "0x00FF0022",
              printMapScale: 1
            }
          )
          .then(
            function onSuccess(value) {
              if(value.status == 201) {
                MessageService.success('Sovellusasetukset tallennettiin.');
              } else {
                MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
              }
              $state.go($state.current, {}, {reload: true});
            }
          );
        }

        /**
         * Scope function to save the modified app. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveApp = function saveApp() {
          var data = angular.copy($scope.app);

          data.defaultHolder = {
            id: data.defaultHolder.id
          };

          // Make actual data update
          AppModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
              if(value.status == 200) {
                MessageService.success('Sovellusasetukset päivitettiin.');
              } else {
                MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
              }
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;
}());
