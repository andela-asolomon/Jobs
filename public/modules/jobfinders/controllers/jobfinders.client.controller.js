'use strict';

// Jobfinders controller
angular.module('jobfinders').controller('JobfindersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobfinders',
	function($scope, $stateParams, $location, Authentication, Jobfinders ) {
		$scope.authentication = Authentication;

		// Create new Jobfinder
		$scope.create = function() {
			// Create new Jobfinder object
			var jobfinder = new Jobfinders ({
				name: this.name
			});

			// Redirect after save
			jobfinder.$save(function(response) {
				$location.path('jobfinders/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

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
			var jobfinder = $scope.jobfinder ;

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
			$scope.jobfinder = Jobfinders.get({ 
				jobfinderId: $stateParams.jobfinderId
			});
		};
	}
]);