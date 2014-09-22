'use strict';
 
angular.module('core')
	.factory('mySocket', function(socketFactory) {
    	return socketFactory();
})
	.controller('HomeController', ['$scope', 'Authentication', 'mySocket',
    	function($scope, Authentication, mySocket) {
        // This provides Authentication context.
	        $scope.authentication = Authentication;
	        mySocket.emit('message', 'Hello World !');
	        mySocket.on('broadcast', function(msg) {
	            console.log('Server response', msg);
        });
    }
]);