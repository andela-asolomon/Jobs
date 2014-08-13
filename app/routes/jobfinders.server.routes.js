'use strict';

var users = require('../../app/controllers/users'),
	jobfinders = require('../../app/controllers/jobfinders');

module.exports = function(app) {
	// Jobfinders Routes
		app.route('/jobfinders')
			.get(jobfinders.list)
			.post(users.requiresLogin, jobfinders.create);

		app.route('/jobfinders/:jobfinderId')
			.get(jobfinders.read)
			.put(users.requiresLogin, jobfinders.hasAuthorization, jobfinders.update)
			.delete(users.requiresLogin, jobfinders.hasAuthorization, jobfinders.delete);

		// Finish by binding the Jobfinder middleware
		app.param('jobfinderId', jobfinders.jobfinderByID);
};