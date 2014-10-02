'use strict';


angular.module('users')
  .directive('favoriteCoffice', 
    function () {
      return {
        templateUrl: 'modules/users/views/templates/coffice-search-result.client.template.html',
        restrict: 'E'
      };
  });