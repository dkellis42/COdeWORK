'use strict';
module.exports = function(app){
  app.get('/login', function(req, res) {
    res.writeHead(303, { 'location': foursquare.getAuthClientRedirectUrl() });
    res.end();
  });


  app.get('/callback', function (req, res) {
    foursquare.getAccessToken({
      code: req.query.code
    }, function (error, accessToken) {
      if(error) {
        res.send('An error was thrown: ' + error.message);
      }
      else {
        // Save the accessToken and redirect.
      }
    });
  });
};