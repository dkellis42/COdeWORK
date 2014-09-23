'use strict';

// Setting up route
angular.module('coffices').config(['$stateProvider',
  function($stateProvider) {
    // Home state routing
    $stateProvider.
    state('coffices', {
      url: '/coffices',
      templateUrl: 'modules/coffices/views/find-coffice.client.view.html'
    });
  }
]);