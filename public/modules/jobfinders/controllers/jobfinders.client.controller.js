'use strict';

// Jobfinders controller
angular.module('jobfinders').controller('JobfindersController', ['$scope', '$rootScope', '$http', '$stateParams', '$location', 'Authentication', 'Jobfinders',
	function($scope, $rootScope, $http, $stateParams, $location, Authentication, Jobfinders ) {
		$scope.authentication = Authentication;

		// if ($scope.authentication.user) $location.path('http://localhost:3000/#!/jobfinders/:jobfinderId/apply');


		// Create new Jobfinder
		$scope.create = function() {
			// Create new Jobfinder object
			var jobfinder = new Jobfinders ({
				title: this.title,
				description: this.description,
				company: this.company,
				location: this.location,
				industry: this.industry	
			});

			// Redirect after save
			jobfinder.$save(function(response) {
				$location.path('jobfinders/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.title = '';
			this.description = '';
			this.company = '';
			this.location = '';
			this.industry = '';
		};

		// $scope.apply = function() {
		// 	// $scope.url = 'http://localhost:3000/#!/jobfinders/:jobfinderId/apply';
		// 	$location.path('http://localhost:3000/#!/signin');
		// };

		// $scope.apply = function() {
		// 	console.log('Checking');
		// 	$http.get('/#!/jobfinders/:jobfinderId/apply', $scope.credentials).success(function(response) {
		// 		console.log(response);
		// 		//If successful we assign the response to the global user model
		// 		$scope.authentication.user = response;
		// 		//And redirect to the index page
		// 		$location.path('/');
		// 	}).error(function(response) {
		// 		$scope.error = response.message;
		// 	});
		// };
		// Remove existing Jobfinder
		$scope.remove = function( jobfinder ) {
			if ( jobfinder ) { jobfinder.$remove();

				for (var i in $scope.jobfinders ) {
					if ($scope.jobfinders [i] === jobfinder ) {
						$scope.jobfinders.splice(i, 1);
					}
				}
			} else {
				$scope.jobfinder.$remove(function() {
					$location.path('jobfinders');
				});
			}
		};

		// Update existing Jobfinder
		$scope.update = function() {
			var jobfinder = $scope.jobfinder;

			jobfinder.$update(function() {
				$location.path('jobfinders/' + jobfinder._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Jobfinders
		$scope.find = function() {
			$scope.jobfinders = Jobfinders.query();
		};

		// Find existing Jobfinder
		$scope.findOne = function() {
			$rootScope.jobfinder = Jobfinders.get({ 
				jobfinderId: $stateParams.jobfinderId
			});
			console.log($rootScope.jobfinder);
		};
	}
]);