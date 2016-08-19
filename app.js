var express = require('express');
var path = require('path');

var mongoose = require('./database/mongoose');
var router = require('./routes/router');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var app = express();



//app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({ extended: true })); // https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.json());
app.use('/', router);
app.use(morgan('dev')); // Request logger

/*
 * Set CORS headers to allow GET and POST requests
*/

app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization');
   next();
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
