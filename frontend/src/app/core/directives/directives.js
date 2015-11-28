// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.directives', []);

  // Fixes datepicker showing ISO date instead of nicely formatted date.
  angular.module('frontend.core.directives')
	.directive('datepickerPopup', function (){
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function(scope, element, attr, controller) {

	      //remove the default formatter from the input directive to prevent conflict
	      controller.$formatters.shift();
  		}
		}
	})
	.directive('territorySubPages', function (){
	  return {
	  	templateUrl: '/frontend/core/directives/partials/territorySubPages.html'
	  }
	});
}());
