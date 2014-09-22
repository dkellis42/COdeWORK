'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	reviews = require('../../app/controllers/reviews');

module.exports = function(app) {
	// review Routes
	app.route('/reviews')
		.get(reviews.list)
		.post(users.requiresLogin, reviews.create);

	app.route('/reviews/:reviewId')
		.get(reviews.read)
		.put(users.requiresLogin, reviews.hasAuthorization, reviews.update)
		.delete(users.requiresLogin, reviews.hasAuthorization, reviews.delete);

	// Finish by binding the review middleware
	app.param('reviewId', reviews.reviewByID);
};