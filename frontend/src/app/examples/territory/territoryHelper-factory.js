
'use strict';

angular.module('frontend.examples.territory')
.factory('TerritoryHelper', [function () {

	var millisecondsInDay = 24 * 60 * 60 * 1000;

	return {
		isNotCoveredRecently : function(territory, appSettings) {
			var limitInMilliseconds = millisecondsInDay * appSettings.notCoveredLimit;
			var now = new Date();
			return Date.parse(territory.covered) < (now.getTime() - limitInMilliseconds);
		},
		isHolderNotChangedLimitExeeded : function(territory, appSettings) {
			var limitInMilliseconds = millisecondsInDay * appSettings.holderNotChangedWarningLimit;
			var now = new Date();
			return Date.parse(territory.taken) < (now.getTime() - limitInMilliseconds);
		}
	};

}]);
