'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);

// angular.filter('searchJob', function(){

// 	return function(arr, searchString){

// 		if(!searchString){
// 			return arr;
// 		}

// 		var result = [];

// 		searchString = searchString.toLowerCase();

// 		angular.forEach(arr, function(item){

// 			if(item.title.toLowerCase().indexOf(searchString) !== -1){
// 				result.push(item);
// 			}

// 		});

// 		return result;
// 	};

// });