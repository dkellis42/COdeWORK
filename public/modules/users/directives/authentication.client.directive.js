'use strict';

angular.module('core')
  .directive('signin', 
    function(){
      return {
        templateUrl: 'modules/users/views/authentication/signin.client.view.html',
        restrict: 'E',
        controller: 'AuthenticationController'
      };
  });