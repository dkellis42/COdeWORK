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
  ]);
