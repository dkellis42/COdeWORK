'use strict';


angular.module('coffices').controller('CofficeController', ['$scope', 'distance', '$http',
  function($scope, distance, $http) {
    $scope.clientID = "03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG";
    $scope.clientSecret = "15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H";
    $scope.testCoffices  = {'list':[]};
    $scope.lookup = function(near, query){ 
      near = near || "78702";
      var foursquareQuery = $http.get("https://api.foursquare.com/v2/venues/explore?client_id=" + $scope.clientID + "&client_secret=" + $scope.clientSecret + "&venuePhotos=1&v=20140910&near=" + near +"&query=coffee,wifi" + query);
      foursquareQuery.success(function(data, status, headers, config) {
          var returnedData = data.response.groups[0].items;
          for(var i in returnedData){
            if (returnedData[i].venue.photos.count > 0 ){
              $scope.testCoffices.list.push(returnedData[i]);
            }
          }
           console.log('data',$scope.testCoffices.list);
      });
    };
    $scope.getCofficePhoto = function(coffice, size){
      var cPrefix = coffice.venue.featuredPhotos.items[0].prefix;
      var cSuffix = coffice.venue.featuredPhotos.items[0].suffix;
      return cPrefix + size +cSuffix;
    };


    $scope.hoverOnCoffice = function(coffice) {
		$scope.hoveredCoffice = coffice;	
    };

    $scope.getDistance = function(coffice){
      return distance.getDistance(coffice);
    };
    $scope.getWifi = function(venue){ 
      var wifiq = $http.get("https://api.foursquare.com/v2/venues/" + venue + "?client_id=" + $scope.clientID + "&client_secret=" + $scope.clientSecret + "&v=20140910");
      wifiq.success(function(data, status, headers, config) {
           console.log('data', data);
      });
    };
  }
]);