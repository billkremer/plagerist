var express = require('express');
require('dotenv').config();
var app = express();
var path = require('path');

var quotes = require('./data/quote-service');
app.use('/quotes', quotes);
var synonyms = require('./data/synonym-service');
app.use('/synonyms', synonyms);


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.listen(app.get('port'), function () {
    console.log('Server up and running on http://localhost:', app.get('port'),"\ntype Ctrl + C to quit.");
  });

  