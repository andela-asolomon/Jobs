'use strict';

//Jobfinders service used to communicate Jobfinders REST endpoints
angular.module('jobfinders').factory('Jobfinders', ['$resource',
	function($resource) {
		return $resource('jobfinders/:jobfinderId', { jobfinderId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);