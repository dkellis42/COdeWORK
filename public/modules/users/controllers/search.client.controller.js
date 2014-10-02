'use strict';

angular.module('users').controller('SearchController', ['$scope', '$stateParams', 'geolocation', 'Users', 'Authentication', '$modal', 'socket',
  function($scope, $stateParams, geolocation, Users, Authentication, $modal, socket) {
    $scope.user = Authentication.user;
    $scope.selfie = Authentication.user;

        // Update a user profile
    $scope.updateUserProfile = function(isValid) {
      if (isValid){
        $scope.success = $scope.error = null;
        var user = new Users.user($scope.user);

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
    $scope.markers = [];
    geolocation.getLocation().then(function(data){
      $scope.map.center = {latitude:data.coords.latitude, longitude:data.coords.longitude};
    });

    $scope.find = function() {
      $scope.users = Users.user.query();
    };

    $scope.map = {
      center: {
          latitude: 60,
          longitude: -90
      },
      zoom: 8,
      disableDefaultUI: true,
      styles: [
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [
            { color: '#32cd32' }
          ]
        },{
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            { visibility: 'off' }
          ]
        },{
          'elementType': 'labels',
          'stylers': [
            { 'lightness': -100 },
            { 'saturation': -48 },
            { 'gamma': 9.99 },
            { 'visibility': 'simplified' },
            { 'color': '#333333' }
          ]
        },{
          'elementType': 'labels.icon',
          'stylers': [
            { 'visibility': 'off' }
          ]
        },{
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            { 'visibility': 'on' },
            { 'color': '#333333' }
          ]
        },{
          'featureType': 'poi',
          'stylers': [
            { 'visibility': 'off' }
          ]
        },{
          'featureType': 'landscape',
          'elementType': 'geometry',
          'stylers': [
            { 'visibility': 'simplified' },
            { 'lightness': -100 }
          ]
        },{
          'featureType': 'administrative',
          'elementType': 'geometry.stroke',
          'stylers': [
            { 'lightness': -100 }
          ]
        }
      ]
    };
    var markers = [];
    Users.user.query(function(response){
        var size = response.length;
        var allUsers = response.slice(0,size);
        for (var i in allUsers){

            var args = {
              'name': allUsers[i].displayName,
              'coords': {
                'latitude': parseFloat(allUsers[i].location.latitude), 
                'longitude': parseFloat(allUsers[i].location.longitude)
              }, 
              '_id': allUsers[i]._id,
              'workingOn': allUsers[i].workingOn, 
              'options': {
                'labelContent': allUsers[i].displayName
              },
              'icon': 'http://i.picresize.com/images/2014/09/30/Ju5dG.png'
            };
            markers.push(args);
        }
      $scope.markers = markers;

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

