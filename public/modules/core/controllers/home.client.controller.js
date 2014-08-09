'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$rootScope',
	function($scope, Authentication, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);