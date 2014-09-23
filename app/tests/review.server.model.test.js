'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Review = mongoose.model('Review');

/**
 * Globals
 */
var user, review;

/**
 * Unit tests
 */
describe('Review Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			review = new Review({
				content: 'Review Content',
				wifiRating: 10,
				vibeRating: 8,
				coffeeRating: 5,
				coffice: 203834,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return review.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without review content', function(done) {
			review.content = '';

			return review.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Review.remove().exec();
		User.remove().exec();
		done();
	});
});