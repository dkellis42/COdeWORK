'use strict';

angular.module('users').controller('SearchController', ['$scope', 'geolocation', 'Users', 'Authentication', '$modal',
  function($scope, geolocation, Users, Authentication, $modal) {
    $scope.user = Authentication.user;
    $scope.markers = [];
    geolocation.getLocation().then(function(data){
      $scope.map.center = {latitude:data.coords.latitude, longitude:data.coords.longitude};
      $scope.user.location.latitude = data.coords.latitude;
      //And this is where the location updating would happen...IF IT WORKED!  
        //   user.$update(function(response) {
        //   $scope.success = true;
        //   Authentication.user = response;
        // }, function(response) {
        //   $scope.error = response.data.message;
        // });
    });
    
    $scope.map = {
      center: {
          latitude: 60,
          longitude: -90
      },
      zoom: 8,
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
    var markers = [];
    Users.query(function(response){
        var size = response.length;
        var allUsers = response.slice(0,size);
        for (var i in allUsers){
            console.log(i);
            var args = {
              'name': allUsers[i].displayName,
              'coords': {
                'latitude': parseFloat(allUsers[i].location.latitude), 
                'longitude': parseFloat(allUsers[i].location.longitude)
              }, 
              'id': allUsers[i]._id, 
              'workingOn': allUsers[i].workingOn, 
              'options': {
                'labelContent': allUsers[i].displayName
              }
            };
            markers.push(args);
        }
      $scope.markers = markers;
      console.log('markers', $scope.markers);
      console.log('users', allUsers);
    });
    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'modules/users/views/chat-modal.client.view.html',
        controller: 'SearchController',
        size: size
      });
    };
    
  }
]);

