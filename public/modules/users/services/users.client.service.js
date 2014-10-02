'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return {
			user: $resource('users/', {}, { update: { method: 'PUT'}}),
			users: $resource('users/:userId', { userId: '@_id'})
		}

	}
]);