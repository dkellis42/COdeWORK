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
	.controller('ChatController', ['$scope', 'Authentication', '$animate',
    	function($scope, Authentication, $animate) {

	      		$scope.authentication = Authentication;
    			console.log($scope.authentication);
	      		$scope.user = Authentication.user;
	            $animate.addClass('.headline div','test-add');

	            $scope.messages = [];
	            $scope.realtimeStatus = 'Connecting...';
	            $scope.channel = 'pubnub_chat';
	            $scope.limit = 20;

	            $scope.publish = function(){
	            	$scope.message.user = Authentication.user.displayName;
	            	$scope.message.email = Authentication.user.email;
	            	$scope.message.avatar = Authentication.user.providerData.avatar_url;
	            	$scope.message.timestamp = Date.now();
	                
	                $('#progress_bar').slideToggle();
	                
	                 PUBNUB.publish({
	                        channel : $scope.channel,
	                        message : $scope.message
	                    }) 
	                     
	               $scope.message.text = '';
	            }
	                
	            $scope.history = function(){
	                PUBNUB.history( {
	                    channel : $scope.channel,
	                    limit   : $scope.limit
	                }, function(messages) {
	                    // Shows All Messages
	                    $scope.$apply(function(){
	                        $scope.messages = messages.reverse();          
	                        
	                    }); 
	                } );
	             }
	                 

	           PUBNUB.subscribe({
	                channel    : $scope.channel,
	                restore    : true, 
	            
	                callback   : function(message) { 
	                    
	                    $('#progress_bar').slideToggle();         
	                 
	                    $scope.$apply(function(){
	                        $scope.messages.unshift(message);          
	                        
	                    }); 
	                },
	            
	                disconnect : function() {   
	                    $scope.$apply(function(){
	                        $scope.realtimeStatus = 'Disconnected';
	                    });
	                },
	            
	                reconnect  : function() {   
	                    $scope.$apply(function(){
	                        $scope.realtimeStatus = 'Connected';
		                    $('#progress_bar').slideToggle();
		                    $scope.history();
	                    });
	                },
	            
	                connect    : function() {  
	                    $scope.$apply(function(){
	                        $scope.realtimeStatus = 'Connected';

	                        $('#progress_bar').slideToggle();
	                        $scope.history();
	                    });
	            
	                }
	            })
	         
	    }  
	]);
