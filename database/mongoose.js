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

// 192.168.56.1

var excerciseSchema = mongoose.Schema({
    name: String,
    bodyparts: String,
});

var Excercise = mongoose.model('Excercise', excerciseSchema);

var excercise = new Excercise({
  name: 'Squat',
  bodyparts: 'legs'
});

excercise.save(function (err, excercise) {
  if (err) return console.error(err);
});

Excercise.find({ name: 'Squat' }, function(err, success){
    console.log(success)
});
