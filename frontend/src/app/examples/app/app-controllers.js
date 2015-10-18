/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.app' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller to show single app on GUI.
  angular.module('frontend.examples.app')
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
            }
          )
          .then(
            function onSuccess() {
              MessageService.success('App settings created successfully');
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
              function onSuccess() {
                MessageService.success('App settings updated successfully');
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;
}());
