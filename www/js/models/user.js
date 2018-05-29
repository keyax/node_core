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
//const passport = require('koa-passport');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt   = require('bcrypt-nodejs');
// define the schema for our user model
// var Schema = mongoose.Schema;  //  TypeError: Schema is not a constructor at new MongooseStore
//var Schema = mongoose.Schema(); // remove new
//var userSchema = new mongoose.Schema({    // NO

var userSchema = Schema({
  local: {
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    username: {type: String, index: false, unique: false}
  }/*,
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
      name         : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  }*/
},{ autoIndex: false });

userSchema.plugin(passportLocalMongoose);

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
userSchema.set('autoIndex', false);

// create the model for users and expose it to our app
//return appk.context.kyxoose().model('User', userSchem);
//module.exports = appk.context.kyxoose.model('User', userSchem, "usersm");
module.exports = mongoose.model('User', userSchema, "users");  // , 'usuarios'
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
