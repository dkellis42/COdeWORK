'use strict';

//Add an interactive terminal-like window
angular.module('core').service('Terminal', [ 

  function() {

    this.createView = function(){
      var $view = "<div></div>";
      for(var i in commands){
        $view.append('<p>'+commands[i]+'</p>');
      }
    };
    
    var commands = [ 
      'Edit glimpse',
      'View glimpse'
    ];
    this.createTerminal = function() {
        $('#terminal').wterm()
    };
    this.command_directory = {
        'eval': function( tokens ) {
           tokens.shift();
           var expression = tokens.join( ' ' );
           var result = '';
           try {
             result = eval( expression ); 
           } catch( e ) {
             result = 'Error: ' + e.message;
           }
           return result;
         },

        'date': function( tokens ) {
          var now = new Date();
          return now.getDate() + '-' +
                 now.getMonth() + '-' +
                 ( 1900 + now.getYear() )
        },
     
        'cap': function( tokens ) {
          tokens.shift();
          return tokens.join( ' ' ).toUpperCase();
        },

        'go': function( tokens ) {
           var url = tokens[1];
           document.location.href = url;
         },
         'add': function( tokens ) {
          tokens.shift();
           var workerType = tokens.join( ' ' );
           var newLabel =  '<label for="'+ workerType +'">' +
              '<input type="checkbox" id='+ workerType +' value='+ workerType +'/>' +
              '<p>'+workerType+'</p></label>';
           var div = document.getElementById('worker-types');
           div.innerHTML += newLabel;
           return 'added ' + workerType + '!';
         },
 
         'strrev': {
           PS1: 'strrev $',
 
           EXIT_HOOK: function() {
             return 'exit hook dispatch';
           },

           START_HOOK: function() {
             return 'start hook dispatch';
           },
 
           DISPATCH: '/strrev'
           
         }
      };

      for( var j in this.command_directory ) {
        $.register_command( j, this.command_directory[j] );
      }

      $.register_command( 'help', function() {
        return 'Wterminal' + '<br>' +
          'eval - Usage eval &lt;any javascript exression&gt;<br>' +
          'date - Returns Current Date<br>' + 
          'cap  - Usage cap &lt;string&gt; - Turns the string to upcase<br>' +
          'go - Usage go &lt;url&gt; - Sets the browser location to URL<br>' +
          'strrev - A Sub-Terminal, Takes any input reverses the string and spits it out<br>' +
          'add - Usage add &lt;string&gt; adds a coworker type to the options'

      });

  }
]);