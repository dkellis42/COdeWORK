'use strict';

angular.module('core')
  .directive('signin', 
    function(){
      return {
        templateUrl: 'modules/users/view/authentication/signin.client.view.html',
        restrict: 'E',
        controller: 'AuthenticationController'
      };
  });