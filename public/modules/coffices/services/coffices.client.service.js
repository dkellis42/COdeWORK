'use strict';

angular.module('coffices')
  .service('cofficeLookup', [
    function(){
      this.getCoffices = function(client_id, client_secret, near, query){
        return "https://api.foursquare.com/v2/venues/explore?client_id=" + client_id + "&client_secret=" + client_secret + "&v=20140910&near=" + near +"&query=" + query;
      };
    }
  ]);
