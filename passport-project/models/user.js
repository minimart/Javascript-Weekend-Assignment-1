var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique:true}},
  password: {type:String, required:true}
});


UserSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')){
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt){
    if(error) {
      return next(error);
    }

    bcrypt.hash(user.password, salt, function(error, hash){
      if(error) {
        return next(error);
      }

      user.password = hash;
    });
  });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(error){
    if(error){
      return cb(error);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
