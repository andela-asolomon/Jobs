'use strict';

//Setting up route
angular.module('jobfinders').config(['$stateProvider',
	function($stateProvider) {
		// Jobfinders state routing
		$stateProvider.
		state('listJobfinders', {
			url: '/jobfinders',
			templateUrl: 'modules/jobfinders/views/list-jobfinders.client.view.html'
		}).
		state('createJobfinder', {
			url: '/jobfinders/create',
			templateUrl: 'modules/jobfinders/views/create-jobfinder.client.view.html'
		}).
		state('viewJobfinder', {
			url: '/jobfinders/:jobfinderId',
			templateUrl: 'modules/jobfinders/views/view-jobfinder.client.view.html'
		}).
		state('editJobfinder', {
			url: '/jobfinders/:jobfinderId/edit',
			templateUrl: 'modules/jobfinders/views/edit-jobfinder.client.view.html'
		});
	}
]);