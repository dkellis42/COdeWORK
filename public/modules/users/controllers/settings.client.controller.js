'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$stateParams','$http', '$location', 'Users', 'Authentication', 'Terminal',
	function($scope, $stateParams, $http, $location, Users, Authentication, Terminal) {
		$scope.user = Authentication.user;
		$scope.terminal = Terminal;
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

	    $scope.getUser = function() {
	    	console.log($stateParams.userId)
	    	$scope.user = Users.get({
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
				var user = new Users($scope.user);
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
    Users.query(function(response){
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
		$scope.stubHelp = "I'm a little stuck with setting up node, so it would be great if someone experienced with it could help me out.";
	}
])
.directive("clickToEdit", function() {
    var editorTemplate = '<div class="click-to-edit" ng-enter="save()">' +
        '<div ng-hide="view.editorEnabled">' +
            '{{value}} ' +
            '<a ng-click="enableEditor()">Edit</a>' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
            '<input ng-model="view.editableValue">' +
            '<a ng-click="save(); updateUserProfile(true)">Save</a>' +
            ' or ' +
            '<a ng-click="disableEditor()">cancel</a>.' +
        '</div>' +
    '</div>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit",
            toSave: "@clickToEdit",
            user: "=user"
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
                console.log('click save', $scope.value)
                $scope.disableEditor();
            };
            $scope.updateUserProfile = function(isValid) {
							if (isValid){
								$scope.success = $scope.error = null;
								var user = new Users($scope.user);
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
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                }); 
                event.preventDefault();
            }
        });
    };
});