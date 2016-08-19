var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

console.log('User model');


var UserSchema = new Schema({
  name:String,
  username: { type: String, required:true, index: { unique: true }},
  password: { type: String, required:true , select: false }

});


// Before saving a user to the db, crypt the password
UserSchema.pre('save', function(next){
    console.log('userSchema')
    // console.log(this);

    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash){
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);
