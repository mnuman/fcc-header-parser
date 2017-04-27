var express = require('express');
var app = express();

// Dynamic port for HEROKU, otherwise default to 8080
var port = process.env.PORT || 8080;

function stringBetween(theString, firstDelimiter, secondDelimiter){
  return (theString.split(secondDelimiter)[0]).split(firstDelimiter)[1];
}

app.get('/api/whoami/', (req, res) => {
  console.log(req.headers);
  var ipfrom = req.headers['x-forwarded-for'];
  var userAgent = stringBetween(req.headers['user-agent'], '(', ')');
  var lang = req.headers['accept-language'].split(',')[0];
  var result = { ipaddress: ipfrom, language: lang, software: userAgent};
  // console.log(ipfrom);
  // console.log(userAgent);
  // console.log(lang);
  res.send(result);
});


// set up listeren for application to start
app.listen(port, function() {
  console.log('Example app listening on port ', + port +'!');
})