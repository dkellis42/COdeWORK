'use strict';
 
angular.module('core')

	.controller('HomeController', ['$scope', 'Authentication', '$animate',
    	function($scope, Authentication, $animate) {


	      		$scope.authentication = Authentication;
	      		$scope.user = Authentication.user;
	            $animate.addClass('.headline div','test-add');
	            $scope.route = function(){
	            	if($scope.user){
	            		document.location.href = '/#!/settings/profile';
	            	} else {
	            		$scope.signin = true;
	            	}
	            };
	         
	    }  
	]);
