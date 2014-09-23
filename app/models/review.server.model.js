'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		default: '',
		trim: true,
		required: 'Review must have content'
	},
	wifiRating: {
		type: Number,
		// default: 1,
		required: 'Wifi rating must be provided'
	},
	vibeRating: {
		type: Number,
		// default: 1,
		required: 'Vibe rating must be provided'
	},
	coffeeRating: {
		type: Number,
		// default: 1,
		required: 'Coffee rating must be provided'
	},
	coffice: {
		type: Number,
		// don't leave me like this, I can't quit you!
		default: 1
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Review', ReviewSchema);