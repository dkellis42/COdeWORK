'use strict';


angular.module('coffices').controller('CofficeController', ['$scope', 'distance', 'cofficeLookup', '$http', 'geolocation', 'Users', 'Authentication',
  function($scope, distance, cofficeLookup, $http, geolocation, Users, Authentication) {
    $scope.user = Authentication.user;
    $scope.clientID = '03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG';
    $scope.clientSecret = '15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H';
    $scope.testCoffices  = {'list':[]};
    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });
    $scope.favoriteCoffices = function(coffice) {
      var inFavorites = coffice.favorite;
      if(inFavorites){
        coffice.favorite = true;
        console.log('favorited', coffice);
        $scope.user.favoriteCoffices.push(coffice);
      } else {
        coffice.favorite = false;
        console.log('removed', coffice);
        coffice = $scope.containsObject(coffice, $scope.user.favoriteCoffices)
        $scope.user.favoriteCoffices = $scope.user.favoriteCoffices.splice(coffice, 1);
      }
      $scope.updateUserProfile(true);
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
    $scope.containsObject = function (obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return {'result':true, 'index': i};
            }
        }
        return {'result':false, 'index': i};
    };
    $scope.initUp = function(near, query, radius) {
      // near = near || "78702";
      $scope.noresult = '';
      var foursquareQuery = $http.get("https://api.foursquare.com/v2/venues/explore?client_id=" + $scope.clientID + "&client_secret=" + $scope.clientSecret + "&venuePhotos=1&v=20140910&near=austin&query=coffee,wifi");
      foursquareQuery.success(function(data, status, headers, config) {
          var returnedData = data.response.groups[0].items;
          for(var i in returnedData){
            if (returnedData[i].venue.photos.count > 0 ){
              var inFavorites = $scope.containsObject(returnedData[i], $scope.user.favoriteCoffices);
              console.log('in fav', inFavorites);
              if(inFavorites.result){
                  returnedData[i].favorite = true;
                } else {
                  returnedData[i].favorite = false;
                }
              $scope.testCoffices.list.push(returnedData[i]);
            }
          }
          console.log('data', $scope.testCoffices);
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
                if($scope.user.favoriteCoffices.indexOf(returnedData[i]) != -1){
                  returnedData[i].favorite = true;
                }
                $scope.testCoffices.list.push(returnedData[i]);
              }
            }
          }
      });
    };
    $scope.getFavorites = function(){
      for(var i in $scope.user.favoriteCoffices){
        $scope.user.favoriteCoffices[i].favorite = true;
      }
      $scope.testCoffices  = {'list':$scope.user.favoriteCoffices};
    };
    $scope.getCofficePhoto = function(coffice, size){
      var cPrefix = coffice.venue.featuredPhotos.items[0].prefix;
      var cSuffix = coffice.venue.featuredPhotos.items[0].suffix;
      return cPrefix + size +cSuffix;
    };

    $scope.testme = function () {
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