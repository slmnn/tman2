/**
 * This file contains all necessary Angular controller definitions for 'frontend.app.attribute' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller to show single attribute on GUI.
  angular.module('frontend.app.attribute')
    .controller('AttributesController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'AttributeModel',
      '_attributes',
      function controller(
        $scope, $state,
        UserService, MessageService,
        AttributeModel,
        _attributes
      ) {

        // Set current scope reference to model
        AttributeModel.setScope($scope, 'attribute');

        // Initialize scope data
        $scope.user = UserService.user();
        $scope.attributes = _attributes;

        /**
         * Scope function to delete an attribute. This will send a
         * socket request to the backend server with the new object.
         */
        $scope.deleteAttribute = function deleteAttribute(attribute) {

          // Make actual data update
          AttributeModel
            .delete(attribute.id)
            .then(
              function onSuccess() {
                MessageService.success('Attribute removed successfully');
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };

        /**
         * Scope function to create an attribute. This will send a
         * socket request to the backend server with the new object.
         */
        $scope.createAttribute = function createAttribute(attribute) {
          var data = angular.copy(attribute);

          // Make actual data update
          AttributeModel
            .create(data)
            .then(
              function onSuccess() {
                MessageService.success('Attribute created successfully');
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };

        /**
         * Scope function to save the modified attribute. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.updateAttribute = function updateAttribute(attribute) {
          var data = angular.copy(attribute);

          // Make actual data update
          AttributeModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('Attribute updated successfully');
                $state.go($state.current, {}, {reload: true});
              }
            )
          ;
        };
      }
    ])
  ;
}());
