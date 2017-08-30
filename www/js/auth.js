// mapmeld
const passport = require('koa-passport')
//////const mongoose = require('mongoose');
/////const dbUrl = "mongodb://user:555777@192.168.1.2:27017/kyxtree";
//mongoose.connect(dbUrl);  //  && npm install --save mongoose@4.10.8 else 2Warnings: `open()` is deprecated & Db.prototype.authenticate
//mongoose.createConnection(dbUrl); // Db.prototype.authenticate method will no longer be available
//mongoose.connect(config.get('mongo'), {useMongoClient: true});  // no updates
/////mongoose.connection.openUri(dbUrl);
const User = require('./user.js');    //('./models/user.js')


///////////////const fetchUser = (() => {
  // This is an example! Use password hashing in your
//  const user = { id: 1, username: 'test', password: 'test' }
  return async function() {
const user = User.findOne({ username: 'user1' }, function (err, testUser) {
  console.log("testuser", testUser);
  if (!testUser) {
    console.log('test user did not exist; creating test user...')
    testUser = new User({
      username: 'user1',
      password: '555777'
    })
    testUser.save()
  }
});
    return user;
  }
////////////////////})()

passport.serializeUser(function(user, done) {
  //user = fetchUser();
  done(null, user._id)
});
passport.deserializeUser(function(id, done) {
  var usuario = User.findById(id, done);
  console.log("usuario", usuario);

});
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username, password: password }, done);
}));
/*
const passport = require('koa-passport')
const abb = require('async-busboy');

const fetchUser = (async () => {
  try {

  // This is an example! Use password hashing in your
  const {fields} = await abb(ctx.req, {});
    console.log(util.inspect({fields}));
  ctx.state.user = {};
  ctx.state.user.username = fields.userlogin;
  ctx.state.user.password = fields.userpwd;
  console.log("loginx:"+util.inspect(ctx.state.user));
//  const user = { id: 1, username: 'test', password: 'test' }
  var user = {};
  user.username = fields.userlogin;
  user.password = fields.userpwd;
} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
return user;

};

//  return async function() {
//    return user;

//  }
})//()

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch(err) {
    done(err);
  }
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  fetchUser()
    .then(user => {
//      if (username === user.username && password === user.password) {
      if (user.username == "yones") {console.log("yones online");
        done(null, user);
      } else {console.log("yones offline");
        done(null, false);
      }
    })
    .catch(err => done(err))
}))
*/

const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user
    User.findOne({ facebook_id: profile.id }, done);
//  fetchUser().then(user => done(null, user))
  }
))
const TwitterStrategy = require('passport-twitter').Strategy
passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user
    User.findOne({ twitter_id: profile.id }, done);
    //  fetchUser().then(user => done(null, user))
  }
))
const GoogleStrategy = require('passport-google-auth').Strategy
passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user
    User.findOne({ google_id: profile.id }, done);
//  fetchUser().then(user => done(null, user))
  }
))
