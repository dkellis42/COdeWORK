'use strict';


angular.module('coffices')
  .directive('cofficeExcerpt', 
    function () {
      return {
        templateUrl: 'modules/coffices/views/templates/coffice-excerpt.client.template.html',
        controller: 'CofficeController',
        restrict: 'E'
      };
  })
  .directive('searchResult', 
    function () {
      return {
        templateUrl: 'modules/coffices/views/templates/coffice-search-result.client.template.html',
        controller: 'CofficeController',
        restrict: 'E'
      };
  });