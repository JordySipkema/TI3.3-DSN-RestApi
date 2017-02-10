require('dotenv').config();

var express = require('express');
var path = require('path');
//var logger = require('morgan');
var bodyParser = require('body-parser');


var app = express();

app.set('webPort', process.env.SERVER_PORT);

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.send('Hello World!')
})

// Start server
var port = process.env.PORT || app.get('webPort');
var server = app.listen( port , function() {
    console.log('Listening server on port ' + server.address().port );
});