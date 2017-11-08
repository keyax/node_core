// mapmeld
//////////////////const passport = require('koa-passport')
//////const mongoose = require('mongoose');
/*
const dbUrl = `mongodb://${dbadminqp.dbuser.createUser}:${dbadminqp.dbuser.pwd}@172.17.0.1:27017/kyxtree?authSource=admin`;
console.log("uri: "+dbUrl);  //mongoUri should be in the form of "mongodb://user:pass@url:port/dbname"
*/
/////const dbUrl = "mongodb://user:555777@192.168.1.2:27017/kyxtree";
//mongoose.connect(dbUrl);  //  && npm install --save mongoose@4.10.8 else 2Warnings: `open()` is deprecated & Db.prototype.authenticate
//mongoose.createConnection(dbUrl); // Db.prototype.authenticate method will no longer be available
//mongoose.connect(config.get('mongo'), {useMongoClient: true});  // no updates
/////mongoose.connection.openUri(dbUrl); //  mongoose@4.11
//const passport = require('koa-passport');

//const LocalStrategy = require('passport-local').Strategy;
/////const LocalMongoose = require('passport-local-mongoose');
/////const JwtStrategy = require('passport-jwt').Strategy;
//const FacebookStrategy = require('passport-facebook').Strategy;
//const TwitterStrategy = require('passport-twitter').Strategy;
//const GoogleStrategy = require('passport-google-auth').Strategy;

//var flash = require('koa-connect-flash'); // +koa-generic-session > this.flash()
// var flash = require('koa-flash'); // +koa-session > this.session['koa-flash']
// config/passport.js  // load all the things we need
// load up the user model
var User            = require('./models/user');  // ../app/models/user   default  .js
// expose this function to our app using module.exports
module.exports = function(passport) {
// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
// used to serialize the user for the session
   passport.serializeUser(function(user, done) {
      done(null, user.id);
      });
// used to deserialize the user
   passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
      done(err, user);
      });
   });

const LocalStrategy = require('passport-local').Strategy;
// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
   passport.use('local-signup', new LocalStrategy({
// by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
// asynchronous // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
// if there are any errors, return the error
        if (err) return done(err);
// check to see if theres already a user with that email
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
// if there is no user with that email // create the user
        var newUser            = new User();
// set the user's local credentials
        newUser.local.email    = email;
        newUser.local.password = newUser.generateHash(password);
// save the user
        newUser.save(function(err) {
             if (err) throw err;
             return done(null, newUser);
            });
        }  // else
    });   // User.findOne
  });    // process.nextTick
}));    // function // LocalStrategy // passport.use 'local-signup'

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use('local-login', new LocalStrategy({
// by default, local strategy uses username and password, we will override with email
   usernameField : 'email',
   passwordField : 'password',
   passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, email, password, done) { // callback with email and password from our form
// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email' :  email }, function(err, user) {
// if there are any errors, return the error before anything else
          if (err) return done(err);
// if no user is found, return the message
          if (!user)
              return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
// if the user is found but the password is wrong
          if (!user.validPassword(password))
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
// all is well, return successful user
          return done(null, user);
      }); // User.findOne
}));     // function // LocalStrategy // passport.use 'local-login'

const FacebookStrategy = require('passport-facebook').Strategy;
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
));
const TwitterStrategy = require('passport-twitter').Strategy;
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
));
const GoogleStrategy = require('passport-google-auth').Strategy;
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
));

};      // module.exports.pass = function

/*
const fetchUser = ((ctx, next) => {
  // This is an example! Use password hashing in your app
//  const user = { id: 1, username: 'test', password: 'test' }
const user = ctx.state.user;
  return async function() {
const user = User.findOne({ username: user.username }, function (err, testUser) {
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
})();
*/
/*
passport.serializeUser(function(user, done) {
  user = fetchUser();
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
*/
/*
const passport = require('koa-passport')
const abb = require('async-busboy');

const fetchUser = (async () => {
  try {

  // This is an example! Use password hashing in your
  const {fields} = await abb(ctx.req, {});
    console.log(util.inspect({fields}));
  ctx.state.user = {};                      // Cannot read property 'state' of undefined
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
