var express = require('express');
var path = require('path');
var mongoose = require('./database/mongoose');
var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));





app.get('/', function (req, res) {
 console.log('get index'); 
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
