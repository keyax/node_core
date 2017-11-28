/*  
const mongoose = require('mongoose')
const userSchema = {
  username: String,
  password: String,
  facebook_id: String,
  twitter_id: String,
  google_id: String
}
module.exports = mongoose.model('User', userSchema)
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchem = mongoose.Schema({
  local: {
    email: {type: String, required: true },
    password: {type: String, required: true },
    username: {type: String} //, required: true },
//    certificate: String
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

// userSchem.plugin(passportLocalMongoose);

// methods ======================
// generating a hash
userSchem.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchem.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchem);

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
