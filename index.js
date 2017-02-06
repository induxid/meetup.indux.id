var express = require('express');
var app = express();
var fs = require('fs');
var appJsonFile = 'app.json';

app.set('port', (process.env.PORT || 5000));

var appJsonData = fs.readFileSync(appJsonFile);
var appData = JSON.parse(appJsonData);
var meetupData = appData.meetup;

app.get('/', function(request, response) {
  response.redirect(appData.default_url);
});

Object.keys(meetupData).forEach(function(key) {

  var slug = meetupData[key].slug;
  var url = meetupData[key].url;

  app.get( '/' + slug, function(request, response) {
    response.redirect(url);
  });

})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


