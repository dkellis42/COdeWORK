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
	// .factory('socket', function ($rootScope) {
	//   var socket = io.connect();
	//   return {
	//     on: function (eventName, callback) {
	//       socket.on(eventName, function () {  
	//         var args = arguments;
	//         $rootScope.$apply(function () {
	//           callback.apply(socket, args);
	//         });
	//       });
	//     },
	//     emit: function (eventName, data, callback) {
	//       socket.emit(eventName, data, function () {
	//         var args = arguments;
	//         $rootScope.$apply(function () {
	//           if (callback) {
	//             callback.apply(socket, args);
	//           }
	//         });
	//       })
	//     }
	//   };
	// })

	// .controller('SocketCtrl', ['$log', 'Authentication', '$scope', 'chatSocket', 'messageFormatter',
	//   function ($log, Authentication, $scope, chatSocket, messageFormatter) {
	//     $scope.nickName = Authentication;
	// 	$scope.messageLog = 'Ready to chat!';
	// 	$scope.sendMessage = function() {
	// 	  var match = $scope.message.match('^\/nick (.*)');
		 
	// 	  if (angular.isDefined(match) && 
	// 	      angular.isArray(match) && match.length === 2) {
	// 	    var oldNick = nickName;
	// 	    nickName = match[1];
	// 	    $scope.message = '';
	// 	    $scope.messageLog = messageFormatter(new Date(), 
	// 	                    nickName, 'nickname changed - from ' + 
	// 	                    oldNick + ' to ' + nickName + '!') + 
	// 	                    $scope.messageLog;
	// 	    $scope.nickName = nickName;
	// 	  }
		 
	// 	  $log.debug('sending message', $scope.message);
	// 	  chatSocket.emit('message', nickName, $scope.message);
	// 	  $log.debug('message sent', $scope.message);
	// 	  $scope.message = '';
	// 	};s
	//   }
	// ])
	
	.controller('HomeController', ['$scope', 'Authentication',
    	function($scope, Authentication) {
        // This provides Authentication context.
	        $scope.authentication = Authentication;

	        //myApp.directive('myDirective', function() {});
	        //myApp.factory('myService', function() {});	            
	            $scope.messages = [];
	            $scope.realtimeStatus = "Connecting...";
	            $scope.channel = "pubnub_chat";
	            $scope.limit = 20;



	            $scope.init = function() {
	            	console.log("you're in me")
	            	PUBNUB.init({
	            	        publish_key   : 'pub-c-e4008405-6e19-4769-a475-9d581f8375c0',
	            	        subscribe_key : 'sub-c-f92c62aa-4691-11e4-91ee-02ee2ddab7fe'
	            	    })
	            }

	            //publish a chat message
	            $scope.publish = function(){
	                
	                //toggle the progress bar
	                $('#progress_bar').slideToggle();
	                
	                 PUBNUB.publish({
	                        channel : $scope.channel,
	                        message : $scope.message
	                    }) 
	                     
	                //reset the message text
	               $scope.message.text = "";
	            }
	                
	            //gets the messages history   
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
	                 

	           //we'll leave these ones as is so that pubnub can
	           //automagically trigger the events
	           PUBNUB.subscribe({
	                channel    : $scope.channel,
	                restore    : false, 
	            
	                callback   : function(message) { 
	                    
	                    //toggle the progress_bar
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
	                    });
	                },
	            
	                connect    : function() {  
	                    $scope.$apply(function(){
	                        $scope.realtimeStatus = 'Connected';
	                        //hide the progress bar
	                        $('#progress_bar').slideToggle();
	                        //load the message history from PubNub
	                        $scope.history();
	                    });
	            
	                }
	            })
	         
	            
	        

	           //  $scope.publish = function(){
	                
	           //      //toggle the progress bar
	           //      $('#progress_bar').slideToggle();
	                
	           //       PUBNUB.publish({
	           //              channel : $scope.channel,
	           //              message : $scope.message
	           //          }) 
	                     
	           //      //reset the message text
	           //     $scope.message.text = "";
	           //  }
	                
	           //  //gets the messages history   
	           //  $scope.history = function(){
	           //      PUBNUB.history( {
	           //          channel : $scope.channel,
	           //          limit   : $scope.limit
	           //      }, function(messages) {
	           //          // Shows All Messages
	           //          $scope.$apply(function(){
	           //              $scope.messages = messages.reverse();          
	                        
	           //          }); 
	           //      } );
	           //   }
	                 
	           // PUBNUB.subscribe({
	           //      channel    : $scope.channel,
	           //      restore    : false, 
	            
	           //      callback   : function(message) { 
	                    
	           //          //toggle the progress_bar
	           //          $('#progress_bar').slideToggle();         
	                 
	           //          $scope.$apply(function(){
	           //              $scope.messages.unshift(message);          
	                        
	           //          }); 
	           //      },
	            
	           //      disconnect : function() {   
	           //          $scope.$apply(function(){
	           //              $scope.realtimeStatus = 'Disconnected';
	           //          });
	           //      },
	            
	           //      reconnect  : function() {   
	           //          $scope.$apply(function(){
	           //              $scope.realtimeStatus = 'Connected';
	           //          });
	           //      },
	            
	           //      connect    : function() {  
	           //          $scope.$apply(function(){
	           //              $scope.realtimeStatus = 'Connected';
	           //              //hide the progress bar
	           //              $('#progress_bar').slideToggle();
	           //              //load the message history from PubNub
	           //              $scope.history();
	           //          });
	            
	           //      }
	           //  })
	    }  
	]);
