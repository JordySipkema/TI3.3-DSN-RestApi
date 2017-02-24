require('dotenv').config();

var express         = require('express');
var path            = require('path');
var bodyParser      = require('body-parser');
var fs              = require('fs');
var moment          = require('moment');
var mysql           = require('mysql');
var tokenValidator  = require('./Controller/tokenvalidator');
var app             = express();

//
// Override default log to terminal and/or to file
//
var log_file = fs.createWriteStream(__dirname + '/logs/app.log', {flags : 'a'});
var log_stdout = process.stdout;
var now = function(){ return moment(new Date()).format('MMMM Do YYYY, h:mm:ss a') };
console.log = function(msg){
    log_file.write(require('util').format( '[' + now() +'] ' + msg) + '\n');
    // Uncomment als je ook naar scherm wilt loggen
    log_stdout.write(require('util').format( '[' + now() +'] ' + msg) + '\n');
};

//Vangt alle exceptions af, proces moet wel opnieuw gestart worden.
process.on('uncaughtException', function (err) {
    log_file.write(require('util').format( '[' + now() +'] '+ err.stack) + '\n');
    // Uncomment als je ook naar scherm wilt loggen
    log_stdout.write(require('util').format( '[' + now() +'] '+ err.stack) + '\n');
});

app.set('webPort', process.env.SERVER_PORT);
app.set('DB:pool', mysql.createPool(process.env.DATABASE_URL + '?dateStrings=true'));

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// Middleware, voor alle (/api/)* request
app.all('*', function(req, res, next)
{
    // Log alle request
    console.log( req.method + " " + req.url) ;
    next();
});

// Middleware, voor alle /api/* request
app.all('/api/*', function(req, res, next)
{
    // Set respons header (geen idee of dit compleet is)
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");

    res.contentType('application/json');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.get('/api/version', function(req,res) {
    res.status(200);
    res.send('{"version": '+ process.env.VERSION +'}');
});
app.post('/api/login', require('./Routes/auth.js').login);
app.get('/api/nest/fetch', require('./Routes/nest.js').fetch);

app.all('/api/*', tokenValidator);
app.use('/', require('./Routes/router.js'));

// Start server
var port = process.env.PORT || app.get('webPort');
var server = app.listen( port , function() {
    console.log('Listening server on port ' + server.address().port );
});