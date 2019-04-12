var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.listen(app.get('port'), function () {
    console.log('Server up and running on http://localhost:', app.get('port'),"\ntype Ctrl + C to quit.");
  });
