'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// console.log(user)
	console.log(req.body);
	// For security measurement we remove the roles from the req.body object
	// delete req.body.roles;
	console.log(req)
	console.log(user);
	if (user) {
		// Merge existing user
		// user = _.extend(user, req.body);
		// user.updated = Date.now();
		// user.displayName = user.firstName + ' ' + user.lastName;

		user = _.extend(user, req.body);
		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.jsonp(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * List of Users
 */
exports.list = function(req, res) {
	User.find().sort('-created').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};

exports.read = function(req, res) {
	User.findOne({
		_id: req.param('userId')
	}, function(err, user) {
		res.jsonp(user);
	});

	// console.log('blah', user._conditions.profile);
	// res.user._conditions.profile;
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.jsonp(req.user || null);
};