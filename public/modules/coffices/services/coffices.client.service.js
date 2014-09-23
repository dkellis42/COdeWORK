'use strict';

angular.module('coffices')
  .service('defaultTest', [
    function(){
      
      var
        client_id = "03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG",
        client_secret = "15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H",
        near = "78702",
        query = "coffee,wifi";

      $.ajax({
        url: "https://api.foursquare.com/v2/venues/explore?client_id=" + client_id + "&client_secret=" + client_secret + "&v=20140910&near=" + near +"&query=" + query,
        success: function(result){
          var query = result.response.groups[0].items;
          $scope.testCoffices = query;
        }
      });
    };
  ]);
