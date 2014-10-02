'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Review = mongoose.model('Review'),
	nodemailer = require('nodemailer'),
	config = require('../../config/config'),
	crypto = require('crypto'),
	User = mongoose.model('User'),
	async = require('async'),
	_ = require('lodash');



/**
 * Create a review
 */
exports.create = function(req, res) {
	var review = new Review(req.body);
	review.user = req.user;

	review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(review);
		}
	});
};

/**
 * Show the current review
 */
exports.read = function(req, res) {
	res.jsonp(req.review);
};

/**
 * Update a review
 */
exports.update = function(req, res) {
	var review = req.review;

	console.log(review.status);

	review = _.extend(review, req.body);

	review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(review);
		}
	});
};

/**
 * Delete a review
 */
exports.delete = function(req, res) {
	var review = req.review;

	review.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(review);
		}
	});
};

/**
 * List of reviews
 */
exports.list = function(req, res) {
	Review.find().sort('-created').populate('user', 'displayName').exec(function(err, reviews) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reviews);
		}
	});
};

/**
 * review middleware
 */
exports.reviewByID = function(req, res, next, id) {
	Review.findById(id).populate('user', 'roles').exec(function(err, review) {
		if (err) return next(err);
		if (!review) return next(new Error('Failed to load review ' + id));
		req.review = review;
		next();
	});
};

/**
 * review authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.user.roles[0] === 'admin') {
		return next();
	}

	if (req.review.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};