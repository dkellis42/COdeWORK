'use strict';

//Add an interactive terminal-like window
angular.module('core').service('Terminal', [ 'Users', 'Authentication',

  function(Users, Authentication) {
    var theUser = {};
    this.createView = function(){
      var $view = '<div></div>';
      for(var i in commands){
        $view.append('<p>'+commands[i]+'</p>');
      }
    };
    this.updateUserProfile = function(isValid) {
      if (isValid){
        var success, error = null;
        var user = new Users(theUser);
        theUser.$update(function(response) {
          success = true;
          Authentication.user = response;
        }, function(response) {
          error = response.data.message;
        });
      }
    };
    var commands = [ 
      'Edit glimpse',
      'View glimpse'
    ];
    this.createTerminal = function(user) {
        theUser = user;
        $('#terminal').wterm(user);
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
         'editname': function(tokens) {
            tokens.shift();
            theUser.displayName = tokens.join( ' ' );
            this.updateUserProfile(true);
         },
         'myinfo': function(tokens){
            
          return document.getElementById('display-name').innerHTML;
         }
      };

      for( var j in this.command_directory ) {
        $.register_command( j, this.command_directory[j] );
      }

      $.register_command( 'help', function() {
        return 'Co(de)work terminal' + '<br>' +
          'eval - Usage eval &lt;any javascript exression&gt;<br>' +
          'date - Returns Current Date<br>' + 
          'go - Usage go &lt;url&gt; - Sets the browser location to URL<br>' +
          'add - Usage add &lt;string&gt; adds a coworker type to the options' +
          'editname - Usage editname &lt;string&gt; changes your display name'

      });

  }
]);