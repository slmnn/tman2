(function() {
  'use strict';

  // Define frontend.admin module.user
  angular.module('frontend.profile', []);

  // Controller to edit single profile on GUI
  angular.module('frontend.profile')
    .controller('ProfileController', [
      '$scope', '$state', '$http',
      'UserService', 'MessageService', 'PasswordService',
      'UserModel',
      '_user',
      function controller(
        $scope, $state, $http,
        UserService, MessageService, PasswordService,
        UserModel, _user
      ) {
        // Set current scope reference to model
        UserModel.setScope($scope, 'user');

        // Initialize scope data
        $scope.currentUser = UserService.user();
        $scope.user = _user;

        $scope.saveUser = function saveUser() {
          var data = angular.copy($scope.user);

          // Make actual data update
          UserModel
            .update(data.id, data)
            .then(
              function onSuccess(value) {
                if(value.status == 200) {
                  MessageService.success('Käyttäjä "' + $scope.user.username + '" päivitettiin.');
                } else {
                  MessageService.info('Odottamaton tulos, toiminto saattoi epäonnistua (' + value.status + ')');
                }
              }
            )
          ;
        };

        $scope.saveNewPassword = function saveNewPassword() {
          var data = {
          	userid: _user.id,
          	password1: $scope.password1
          };

          PasswordService.updatePassword(data)
          .then(
            function onSuccess() {
              MessageService.success('Käyttäjän "' + $scope.user.username + '" salasana asetettiin.');
              $scope.password2 = '';
            },
            function onError(error) {
              MessageService.error('Käyttäjän "' + $scope.user.username + '" salasanan tallennus epäonnistui.');
            }
          );
        };
      }
    ])
  ;

}());
