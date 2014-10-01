'use strict';
 
angular.module('core')


	.directive('coolFade', function() {
	    return {
	      compile: function(elm) {
	        //console.log('compiling');
	        $(elm).css('opacity', 0);
	        return function(scope, elm, attrs) {
	         // console.log('animating');
	          $(elm).animate({ opacity : 1.0 }, 1000 );
	        };
	      }
	    };
	  })
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
