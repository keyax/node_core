var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
//    password: String,
    facebook_id: String,
    twitter_id: String,
    google_id: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
