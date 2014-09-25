'use strict';


angular.module('coffices').controller('CofficeController', ['$scope', 'distance', 'cofficeLookup', '$http', 'geolocation',
  function($scope, distance, cofficeLookup, $http, geolocation) {
    $scope.clientID = "03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG";
    $scope.clientSecret = "15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H";
    $scope.testCoffices  = {'list':[]};
    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });

    $scope.initUp = function(near, query, radius) {
      // near = near || "78702";
      console.log($scope.coords)

      var foursquareQuery = $http.get("https://api.foursquare.com/v2/venues/explore?client_id=" + $scope.clientID + "&client_secret=" + $scope.clientSecret + "&venuePhotos=1&v=20140910&ll=" + 30 + ',' + -97 + "&query=coffee,wifi" + query);
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

    $scope.lookup = function(near, query, radius){ 
      near = near || "78702";

      $scope.testCoffices  = {'list':[]};

      // radius = "&radius=" + radius;
      var foursquareQuery = $http.get("https://api.foursquare.com/v2/venues/explore?client_id=" + $scope.clientID + "&client_secret=" + $scope.clientSecret + "&venuePhotos=1&v=20140910&near=" + near +"&query=coffee,wifi" + query, {cache: true});
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

    $scope.testme = function () {

      console.log('i work')
      console.log($scope.locationSearch)
      $scope.lookup($scope.locationSearch)
    };


    $scope.hoverOnCoffice = function(coffice) {
		  $scope.hoveredCoffice = coffice;	
      $scope.details.getHours(coffice, function(data) {
        $scope.hoveredCoffice.hours = data;
      });
    };

    $scope.distance = distance;

    $scope.details = cofficeLookup;
  }
]);