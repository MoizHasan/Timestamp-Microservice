// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  var unixDate = Date.now();
  var utcDate = new Date().toUTCString();
  var dateString = req.params.date_string;
  if (dateString) {
      var dates = dateString.split("-");
      unixDate = Date.UTC(dates[0], dates[1]-1, dates[2]);
      utcDate = new Date(Date.UTC(dates[0], dates[1]-1, dates[2])).toUTCString();
  }
  if (unixDate) {
    res.json({unix: unixDate, utc: utcDate}); 
  } else {
     res.json({error: "Invalid Date"}); 
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});