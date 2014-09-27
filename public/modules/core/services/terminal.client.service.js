'use strict';

//Add an interactive terminal-like window
angular.module('core').service('Terminal', [

  function() {
    this.createView(){
      var $view = "<div></div>";
      for(var i in commands){
        $view.append('<p>'+commands[i]+'</p>');
      }
    };
    
    var commands = [ 
      'Edit glimpse',
      'View glimpse'
    ];

  }
]);