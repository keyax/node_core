var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
  local: {
//  username: {type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    certificate: String
  },
  facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  twitter          : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  }
});

User.plugin(passportLocalMongoose);

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

/*
var Schema = mongoose.Schema;
var User = new Schema({
//  username: {type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    certificate: String,
    facebook_id: String,
    twitter_id: String,
    google_id: String
});
*/
