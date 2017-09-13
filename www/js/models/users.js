const mongoose = require('mongoose')
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const userSchema = {
  username: String,
  password: String,
  facebook_id: String,
  twitter_id: String,
  google_id: String
}

module.exports = mongoose.model('User', userSchema)
