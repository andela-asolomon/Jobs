'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Jobfinder Schema
 */
var JobfinderSchema = new Schema({
	job_title: {
		type: String,
		default: '',
		required: 'Please fill Jobfinder job_title',
		trim: true
	},
	job_description: {
		type: String,
		default: '',
		required: 'Please fill Jobfinder job description',
		trim: true
	},
	company_name: {
		type: String,
		default: '',
		required: 'Please fill Jobfinder company name',
		trim: true
	},
	company_location: {
		type: String,
		default: '',
		required: 'Please fill Jobfinder comopany loaction',
		trim: true
	},
	industry: {
		type: String,
		default: '',
		required: 'Please fill Jobfinder industry',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Jobfinder', JobfinderSchema);