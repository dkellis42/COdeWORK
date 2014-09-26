'use strict';

angular.module('coffices')
  .service('distance', [ 
    function(){
      this.rad = function(x) { return x * Math.PI / 180 };

      this.haversine = function(p1, p2) {
        var R = 6371;
        var dLat  = this.rad(p2.lat - p1.lat);
        var dLong = this.rad(p2.lng - p1.lng);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return Math.round(d);
      };
      this.toMiles = function(km){
        return Math.round(km * 0.621371 * 100)/100;
      };
      this.getDistance = function(coffice,near) {
        var d = this.haversine(coffice.venue.location, {lat: 30.2463, lng:  -97.7609});
        return this.toMiles(d);
      };
    }
  ])
  .service('cofficeLookup', ['$http',
    function($http){
      this.getDetails = function(place, callback){ 
        var detailQuery = $http.get("https://api.foursquare.com/v2/venues/" + place.venue.id + "?client_id=03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG&client_secret=15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H&v=20140910");
        detailQuery.success(function(data, status, headers, config) {
             callback(data.response.venue);
        });
      };
      this.getHours = function(venue, callback){
        this.getDetails(venue, function(data){
          console.log(data.hours);
          callback(data.hours);
        });
      };
      this.getTips = function(place, callback){
        var detailQuery = $http.get("https://api.foursquare.com/v2/venues/" + place.venue.id + "/tips?client_id=03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG&client_secret=15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H&v=20140910");
        detailQuery.success(function(data, status, headers, config) {
            console.log(data.response);
             callback(data.response.tips);
        });
      };
    }
  ]);
