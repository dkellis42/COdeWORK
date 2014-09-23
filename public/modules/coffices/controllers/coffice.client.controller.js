'use strict';


angular.module('coffices').controller('CofficeController', ['$scope', 'cofficeLookup', '$http',
  function($scope, cofficeLookup, $http) {
    $scope.clientID = "03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG";
    $scope.clientSecret = "15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H";
    $scope.near = "78704";
    $scope.query = "coffee,wifi";
    $scope.testCoffices  = {};
    $scope.lookup = function(){ 
      var foursquareQuery = $http.get("https://api.foursquare.com/v2/venues/explore?client_id=" + $scope.clientID + "&client_secret=" + $scope.clientSecret + "&sortByDistance=1&venuePhotos=1&v=20140910&near=" + $scope.near +"&query=" + $scope.query);
      foursquareQuery.success(function(data, status, headers, config) {
           $scope.testCoffices.list = data.response.groups[0].items;
           console.log('data',$scope.testCoffices.list);
      });
    };
    $scope.getCofficePhoto = function(coffice, size){
      var cPrefix = coffice.venue.photos.groups[0].items[0].prefix;
      var cSuffix = coffice.venue.photos.groups[0].items[0].suffix;
      return cPrefix + size +cSuffix;
    };
  }
]);