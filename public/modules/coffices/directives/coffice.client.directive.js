'use strict';


angular.module('coffices')
  .directive('cofficeExcerpt', 
    function () {
      return {
        templateUrl: 'modules/coffices/views/templates/coffice-excerpt.client.template.html',
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