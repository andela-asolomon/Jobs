'use strict';

(function() {
	// Jobfinders Controller Spec
	describe('Jobfinders Controller Tests', function() {
		// Initialize global variables
		var JobfindersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Jobfinders controller.
			JobfindersController = $controller('JobfindersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Jobfinder object fetched from XHR', inject(function(Jobfinders) {
			// Create sample Jobfinder using the Jobfinders service
			var sampleJobfinder = new Jobfinders({
				name: 'New Jobfinder'
			});

			// Create a sample Jobfinders array that includes the new Jobfinder
			var sampleJobfinders = [sampleJobfinder];

			// Set GET response
			$httpBackend.expectGET('jobfinders').respond(sampleJobfinders);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jobfinders).toEqualData(sampleJobfinders);
		}));

		it('$scope.findOne() should create an array with one Jobfinder object fetched from XHR using a jobfinderId URL parameter', inject(function(Jobfinders) {
			// Define a sample Jobfinder object
			var sampleJobfinder = new Jobfinders({
				name: 'New Jobfinder'
			});

			// Set the URL parameter
			$stateParams.jobfinderId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/jobfinders\/([0-9a-fA-F]{24})$/).respond(sampleJobfinder);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jobfinder).toEqualData(sampleJobfinder);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Jobfinders) {
			// Create a sample Jobfinder object
			var sampleJobfinderPostData = new Jobfinders({
				name: 'New Jobfinder'
			});

			// Create a sample Jobfinder response
			var sampleJobfinderResponse = new Jobfinders({
				_id: '525cf20451979dea2c000001',
				name: 'New Jobfinder'
			});

			// Fixture mock form input values
			scope.name = 'New Jobfinder';

			// Set POST response
			$httpBackend.expectPOST('jobfinders', sampleJobfinderPostData).respond(sampleJobfinderResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Jobfinder was created
			expect($location.path()).toBe('/jobfinders/' + sampleJobfinderResponse._id);
		}));

		it('$scope.update() should update a valid Jobfinder', inject(function(Jobfinders) {
			// Define a sample Jobfinder put data
			var sampleJobfinderPutData = new Jobfinders({
				_id: '525cf20451979dea2c000001',
				name: 'New Jobfinder'
			});

			// Mock Jobfinder in scope
			scope.jobfinder = sampleJobfinderPutData;

			// Set PUT response
			$httpBackend.expectPUT(/jobfinders\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/jobfinders/' + sampleJobfinderPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid jobfinderId and remove the Jobfinder from the scope', inject(function(Jobfinders) {
			// Create new Jobfinder object
			var sampleJobfinder = new Jobfinders({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Jobfinders array and include the Jobfinder
			scope.jobfinders = [sampleJobfinder];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/jobfinders\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleJobfinder);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.jobfinders.length).toBe(0);
		}));
	});
}());