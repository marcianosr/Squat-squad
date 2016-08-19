var excerciseSchema = mongoose.Schema({
    name: String,
    bodyparts: String,
});

var Excercise = mongoose.model('Excercise', excerciseSchema);

var excercise = new Excercise({
  name: 'Squat',
  bodyparts: 'legs'
});

// excercise.save(function (err, excercise) {
//   if (err) return console.error(err);
// });

Excercise.find({ name: 'Squat' }, function(err, success){
    //console.log(success)
});
