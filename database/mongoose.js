var mongoose = require('mongoose');

// mongod --dbpath /path/

console.log('setup database: mongoose')

mongoose.connect('mongodb://127.0.0.1/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Database connected!')
});
