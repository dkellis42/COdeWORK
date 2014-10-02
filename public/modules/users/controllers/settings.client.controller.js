'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$stateParams','$http', '$location', 'Users', 'Authentication', 'Terminal',
	function($scope, $stateParams, $http, $location, Users, Authentication, Terminal) {
		$scope.user = Authentication.user;
		$scope.terminal = Terminal;
    $scope.alerts = [];
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};
    $scope.getTimes = function(begin, end){
      var now = new Date();
        now = now.toTimeString();
      var strBegin = new Date(begin);
        strBegin = strBegin.toTimeString();
      var strEnd = new Date(end);
        strEnd = strEnd.toTimeString();
        console.log('now',now);

      if (now > strBegin) {
      	if (strEnd > now) {
      		return true;
      	} else {
      		return false
      	}
      }
      else if ((now < strBegin) && (strEnd > now)) {
      	return true;
      } else {
      	return false;
      };

    };

    if (!$scope.user.workingOn){
      $scope.alerts.push({type:'danger',msg: "Write about what you're currently working on to help you connect with other coders."});
    }

	    $scope.getUser = function() {
	    	console.log($stateParams.userId);
	    	$scope.user = Users.users.get({
	    		userId: $stateParams.userId
	    	}, function(data) {
		    	$scope.user = data;
	    	});
 		};
		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// $scope.listUserAccounts = function() { 
		// 	$scope.users = Users.query();
		// 	// console.log(user, $scope.users);
		// };

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success = $scope.error = null;
				var user = new Users.user($scope.user);
				console.log('user',user);
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};
    Users.user.query(function(response){
    	$scope.allUsers = response;
    });
		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};


		$scope.codeWorkerTypes = [
			'study buddy',
			'collaborator',
			'ping pong champ',
			'conversationalist',
			'mentor'
		];
	}
])

.directive('clickToEdit', function() {
    var editorTemplate = '<div class="click-to-edit" ng-enter="save()">' +
        '<div ng-hide="view.editorEnabled">' +
            '{{value}} ' +
            '<a ng-click="enableEditor()">Edit</a>' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
            '<textarea class="col-sm-12" type="textarea" ng-model="view.editableValue"></textarea>' +
            '<p class="col-sm-12">' +
            '<a ng-click="save(); updateUserProfile(true)">Save</a>' +
            ' or ' +
            '<a ng-click="disableEditor()">cancel</a>.' +
            '</p>' +
        '</div>' +
    '</div>';

    return {
        restrict: 'A',
        replace: true,
        template: editorTemplate,
        scope: {
            value: '=clickToEdit',
            toSave: '@clickToEdit',
            user: '=user'
        },
        controller: function($scope, Users, Authentication) {
            $scope.view = {
                editableValue: $scope.value,
                editorEnabled: false
            };

            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.value;
            };

            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };
            $scope.save = function() {
                $scope.value = $scope.view.editableValue;
                $scope.toSave = $scope.view.editableValue;
                $scope.updateUserProfile(true);
                $scope.disableEditor();
            };
            $scope.updateUserProfile = function(isValid) {
							if (isValid){
								$scope.success = $scope.error = null;
								var user = new Users.user($scope.user);
								console.log('user',user);
								user.$update(function(response) {
									$scope.success = true;
									Authentication.user = response;
								}, function(response) {
									$scope.error = response.data.message;
								});
							} else {
								$scope.submitted = true;
							}
						};
        }
    };
})

.directive('ngEnter', 
  function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                }); 
                event.preventDefault();
            }
        });
    };
});