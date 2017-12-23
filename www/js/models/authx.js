//const passport = require('koa-passport')
const User = require('./models/user.js')
/*
User.findOne({ username: 'test' }, function (err, testUser) {
  if (!testUser) {
    console.log('test user did not exist; creating test user...')
    testUser = new User({
      username: 'test',
      password: 'test'
    })
    testUser.save()
  }
})
*/
passport.serializeUser(function(user, done) {
  done(null, user._id)
})
//passport.deserializeUser(function(id, done) {
//  User.findById(id, done);
//})
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.findOne({ username: username, password: password }, done);));

/*
passport.use('local-login', new LocalStrategy( {
/  // by default, local strategy uses username and password, we will override with email
  usernameField : 'username', //'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(username, password, done) {
  User.findOne({ username: username, password: password }, done);
  }
)
)
*/
/*
// =========================================================================
   // LOCAL LOGIN =============================================================
   // =========================================================================
   // we are using named strategies since we have one for login and one for signup
   // by default, if there was no name, it would just be called 'local'
passport.use('local-login', new LocalStrategy({
       // by default, local strategy uses username and password, we will override with email
       usernameField : 'username', //'email',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
       },
 function(req, email, password, done) { // callback with email and password from our form
 // find a user whose email is the same as the forms email
 // we are checking to see if the user trying to login already exists
   User.findOne({ 'local.email' :  email }, function(err, user) {
   // if there are any errors, return the error before anything else
   if (err)
     return done(err);
   // if no user is found, return the message
   if (!user)
     return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
   // if the user is found but the password is wrong
   if (!user.validPassword(password))
         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
   // all is well, return successful user
   return done(null, user);
   });
 }
));
//};
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
  }
))
