'use strict';


angular.module('coffices').controller('CofficeController', ['$scope',
  function($scope) {
    $scope.defaultSearch = function(){
        $.ajax({
          url: "https://api.foursquare.com/v2/venues/explore?client_id=03YGRUTGE1CNGSV5BZA2JFMUCKZBJEP1YKHPOEGYSRTGU2VG&client_secret=15ULA34FN42K3XKHORE4K2CU0Y4CHBHSAIHJ1G01QRPG5Z1H&&v=20140910&near=78704&query=coffee,wifi",
          success: function(result){
            var query = result.response.groups[0].items;
            $scope.testCoffices = query;
          }
        });
      };
    // $scope.testCoffices = [
    //   {
    //     "name": "Mozart's",
    //     "image": "modules/coffices/img/mozarts.jpg",
    //     "distance": 3.8
    //   },
    //   {
    //     "name": "Houndstooth",
    //     "image": "modules/coffices/img/houndstooth.jpg",
    //     "distance": 0.8
    //   }
    // ];
  }
]);