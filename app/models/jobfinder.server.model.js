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
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		required: 'Please fill Jobfinder job title',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	company: {
		type: String,
		default: '',
		trim: true
	},
	location: {
		type: String,
		default: '',
		trim: true
	},
	industry: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'Employer'
	}
});

mongoose.model('Jobfinder', JobfinderSchema);