'use strict';

//Add an interactive terminal-like window
angular.module('core').service('Terminal', [ 'Users', 'Authentication', '$http',

  function(Users, Authentication, $http) {
    var theUser = {};
    this.createView = function(){
      var $view = '<div></div>';
      for(var i in commands){
        $view.append('<p>'+commands[i]+'</p>');
      }
    };
    var updateUserProfile = function(isValid) {
      if (isValid){
        var success, error = null;
        var user = new Users.user(theUser);
        console.log(user);
        user.$update(function(response) {
          success = true;
          Authentication.user = response;
        }, function(response) {
          error = response.data.message;
        });
      }
    };
    var getLocation = function(callback){
      var locationQuery = $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+theUser.location.latitude+','+ theUser.location.longitude +'&sensor=true');
        locationQuery.success(function(data, status, headers, config) {
          location = data.results[0].formatted_address;
          returnVal = returnThings(location);
        });
        callback(data);
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
         'edit-name': function(tokens) {
            tokens.shift();
            theUser.displayName = tokens.join( ' ' );
            updateUserProfile(true);
            if (theUser.displayName != ''){
              return 'Thanks for setting your name, ' + theUser.displayName + '!<br><br>'+
              'Type <strong>help</strong> to see a list of commands.';
            }
         },
         'myinfo': function(tokens){
            var cofficeNames = [],
            location = theUser.location.latitude + ', '+theUser.location.longitude;

            for (var i in theUser.favoriteCoffices){
              cofficeNames.push(theUser.favoriteCoffices[i].venue.name + ', ' + theUser.favoriteCoffices[i].venue.location.city);
            }
            return '<br>name: ' + theUser.displayName + '<br><br/>'+
                '<strong>location</strong>: ' + location+'<br/><br/>' +
                '<strong>skills</strong>:<br>'+ theUser.skills.join('<br>') + '<br/><br/>' +
                '<strong>goals</strong>:<br>' + theUser.goals.join('<br>') + '<br/><br/>' +
                '<strong>email</strong>: ' + theUser.email + '<br><br/>' +
                '<strong>favorite coffices</strong>:<br>' + cofficeNames.join('<br>'); + '<br>';
            
         },
         'add-skill': function(tokens){
          tokens.shift();
          var newSkill = tokens.join(' ');
          theUser.skills.push(newSkill);
          updateUserProfile(true);
          return newSkill + ' added to skills!'
         },
         'remove-skill': function(tokens){
          tokens.shift();
          if (parseInt(tokens) == (NaN||0)){
            var skillIndex = parseInt(tokens);
            if ( 0 < skillIndex > (theUser.skills.length)){
              var removed = theUser.skills[skillIndex];
              theUser.skills.splice(skillIndex, 1);
              updateUserProfile(true);
              return removed + ' removed from skills.';
            } else {
              return 'invalid input';
            } 
          } else {
            var skill = tokens.join(' ');
            var skillIndex = theUser.skills.indexOf(skill);
            if (skillIndex > -1){
              theUser.skills.splice(skillIndex, 1);
              updateUserProfile(true);
              return skill + ' removed from skills.';
            } else {
              return skill + ' not found in skills.';
            }
          }
         },
         'add-goal': function(tokens){
          tokens.shift();
          var newGoal = tokens.join(' ');
          theUser.goals.push(newGoal);
          updateUserProfile(true);
          return newGoal + ' added to goals!'
         },
         'remove-goal': function(tokens){
          tokens.shift();
          var goal = tokens.join(' ');
          var goalIndex = theUser.goals.indexOf(goal);
          if (goalIndex > -1){
            theUser.goals.splice(goalIndex, 1);
            updateUserProfile(true);
            return goal + ' removed from goals.';
          } else {
            return goal + ' not found in goals.';
          }
          
         }
      };

      for( var j in this.command_directory ) {
        $.register_command( j, this.command_directory[j] );
      }

      $.register_command( 'help', function() {
        return 'Co(de)work terminal' + '<br>' +
          'go - Usage go &lt;url&gt; - Sets the browser location to URL<br><br>' +
          'add - Usage add &lt;string&gt; adds a coworker type to the options<br><br>' +
          'myinfo - Displays all of your profile information<br><br>' +
          'edit-name - Usage edit-name &lt;string&gt; changes your display name<br><br>' +
          'add-skill - Usage add-skill &lt;string&gt; adds a skill to your profile<br><br>' +
          'remove-skill - Usage remove-skill &lt;string&gt; removes a skill from your profile<br><br>' +
          'add-goal - Usage add-goal &lt;string&gt; adds a goal to your profile<br><br>' +
          'remove-goal - Usage remove-goal &lt;string&gt; removes a goal from your profile<br><br>'

      });

  }
]);