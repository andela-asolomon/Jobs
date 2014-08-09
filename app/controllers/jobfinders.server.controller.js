'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Jobfinder = mongoose.model('Jobfinder'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Jobfinder already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Jobfinder
 */
exports.create = function(req, res) {
	var jobfinder = new Jobfinder(req.body);
	jobfinder.user = req.user;
	
	jobfinder.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobfinder);
		}
	});
};

/**
 * Show the current Jobfinder
 */
exports.read = function(req, res) {
	res.jsonp(req.jobfinder);
};

/**
 * Update a Jobfinder
 */
exports.update = function(req, res, next) {
	var jobfinder = req.jobfinder ;

	jobfinder = _.extend(jobfinder , req.body);

	jobfinder.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobfinder);
		}
	});

	next();
};

/**
 * Delete an Jobfinder
 */
exports.delete = function(req, res) {
	var jobfinder = req.jobfinder ;

	jobfinder.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobfinder);
		}
	});
};

/**
 * List of Jobfinders
 */
exports.list = function(req, res) { Jobfinder.find().sort('-created').populate('user', 'displayName').exec(function(err, jobfinders) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobfinders);
		}
	});
};

/**
 * Jobfinder middleware
 */
exports.jobfinderByID = function(req, res, next, id) { 
	Jobfinder.findById(id).populate('user', 'displayName').exec(function(err, jobfinder) {
		if (err) return next(err);
		if (! jobfinder) return next(new Error('Failed to load Jobfinder ' + id));
		req.jobfinder = jobfinder ;
		next();
	});
};

/**
 * Jobfinder authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.jobfinder.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};