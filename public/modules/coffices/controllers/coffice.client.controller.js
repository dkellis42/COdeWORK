'use strict';


angular.module('coffices').controller('CofficeController', ['$scope', 'distance', 'cofficeLookup', '$http', 'geolocation',
  function($scope, distance, cofficeLookup, $http, geolocation) {
    $scope.clientID = '03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG';
    $scope.clientSecret = '15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H';
    $scope.testCoffices  = {'list':[]};
    $scope.favoriteCofficeList = [];
    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });
    $scope.favoriteCoffices = function(coffice, inFavorites) {
      if(inFavorites){
        $scope.favoriteCofficeList.push(coffice.venue.id);
      } else {
        console.log('nope');
      }
      console.log('favorites', $scope.favoriteCofficeList);
    };
    $scope.initUp = function(near, query, radius) {
      // near = near || "78702";
      $scope.noresult = '';
      var foursquareQuery = $http.get("https://api.foursquare.com/v2/venues/explore?client_id=" + $scope.clientID + "&client_secret=" + $scope.clientSecret + "&venuePhotos=1&v=20140910&near=austin&query=coffee,wifi");
      foursquareQuery.success(function(data, status, headers, config) {
          var returnedData = data.response.groups[0].items;
          for(var i in returnedData){
            if (returnedData[i].venue.photos.count > 0 ){
              $scope.testCoffices.list.push(returnedData[i]);
            }
          }
           console.log('data',$scope.testCoffices.list);
           $scope.hoveredCoffice = $scope.testCoffices.list[0];
           $scope.hoverOnCoffice($scope.hoveredCoffice);
      });
      
    };

    $scope.lookup = function(near, query, radius){ 
      near = near || "78702";
      $scope.testCoffices  = {'list':[]};
      var foursquareQuery = $http.get("https://api.foursquare.com/v2/venues/explore?client_id=" + $scope.clientID + "&client_secret=" + $scope.clientSecret + "&venuePhotos=1&v=20140910&near=" + near +"&query=coffee,wifi" + query, {cache: true});
      foursquareQuery.success(function(data, status, headers, config) {
          var returnedData = data.response.groups[0].items;
          if (returnedData.length > 0){
            for(var i in returnedData){
              if (returnedData[i].venue.photos.count > 0 ){
                $scope.testCoffices.list.push(returnedData[i]);
              }
            }
          }
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
      $scope.reviews = false;
		  $scope.hoveredCoffice = coffice;
      $scope.map.center	= {
        latitude: $scope.hoveredCoffice.venue.location.lat,
        longitude: $scope.hoveredCoffice.venue.location.lng
      };
      $scope.details.getHours(coffice, function(data) {
        $scope.hoveredCoffice.hours = data;
      });
      $scope.details.getTips(coffice, function(data){
        $scope.hoveredCoffice.tips = data;
      });
    };
    $scope.distance = distance;

    $scope.details = cofficeLookup;
    $scope.map = {
        center: {
            latitude: 50,
            longitude:-60
        },
        zoom: 14,
        disableDefaultUI: true,
        styles: [
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { color: "#32cd32" }
            ]
          },{
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              { visibility: "off" }
            ]
          },{
            "elementType": "labels",
            "stylers": [
              { "lightness": -100 },
              { "saturation": -48 },
              { "gamma": 9.99 },
              { "visibility": "simplified" },
              { "color": "#333333" }
            ]
          },{
            "elementType": "labels.icon",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { "visibility": "on" },
              { "color": "#333333" }
            ]
          },{
            "featureType": "poi",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              { "visibility": "simplified" },
              { "lightness": -100 }
            ]
          },{
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              { "lightness": -100 }
            ]
          }
        ]
    };
  }
]);