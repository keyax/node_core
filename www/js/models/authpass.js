  //require('./authpass');
///========================begin authpass.js
var util = require('util');
var passport = require('passport');
//var jwtStrategy = require('passport-jwt').Strategy;

var User = require('./user');  // ../app/models/user   default  .js

User.findOne({ 'local.email': 'test@keyax.info' }, function (err, testUser) {
  if (!testUser) {
    console.log('test@keyax.info user did not exist; creating test user...')
    let pwd = "555777";
    testUser = new User({
      'local.email': 'test@keyax.info',
      'local.username': 'test@keyax.info',
      'local.password': ''
      });
    testUser.local.password = testUser.generateHash(pwd);
    testUser.save();
  }
  console.log("user found"+testUser);
});

// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
// user.id is saved in the session and is later used to retrieve the whole object via the deserializeUser
// The result of the serializeUser method is attached to the session as ctx.session.passport.user = {}
});
// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
// The fetched object is attached to the request object as ctx.req.user or ctx.passport.user
    });
});

let LocalStrategy = require('passport-local').Strategy;
// LOCAL LOGIN =============================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use('local-login', new LocalStrategy(     // 'local',  'local-login',
  {
// by default, local strategy uses username and password, we will override with email
   usernameField : 'email',
   passwordField : 'password',
   passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function verifyCallback(ctx,email,password,done) {
// let email = ctx.body.email; let password = ctx.body.password;
// needs verify callback. with email and password parsed in ctx.body from our form
// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
    console.log('LocalStrategy email:',email);
try {
  User.findOne({ "local.email" : email }, function(err, passUser) {
    console.log("pass local login findOne:",util.inspect(passUser));
//     if there are any errors, return the error before anything else
    if (err) return done(err);
//     if no user is found, return the message
     if (!passUser) {ctx.logout(); //  console.log("pass local login !user:"+util.inspect(passUser));
        return done(null, false, ctx.flash('loginMessage','No user found.'));
    }
//     if the user is found but the password is wrong
    if (!passUser.validPassword(password)){ctx.logout();
       return done(null, false, ctx.flash('loginMessage','Oops! Wrong password:'+passUser.validPassword(password))); // create the loginMessage and save it to session as flashdata
}
//      all is well, return successful user
console.log("Found user: ",passUser.local.email);
    ctx.session.passport["email"]=passUser.local.email;
    done(null, passUser);
  }); // end User.findOne
    } catch (err) { // email not found -> RangeError: Maximum call stack size exceeded -> browser url: 404 Not Found
     console.log("pass local login catch error"+err);
     ctx.body = { message: err.message };
     ctx.status = err.status || 500;
  };
}  // end verify callback function
)); // 'local-login', new LocalStrategy

passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
},
function verifyCallback(ctx,email,password,done) {
  console.log('LocalStrategy signup email:',email);
  try { // ctx.session = "";
    User.findOne({ "local.email" : email }, function(err, passUser) {
// if there are any errors, return the error before anything else
///     if (err) return done(err);
       if (err) {
         if(err.code == 11000) console.log("ERROR#: ",err);
         res.send(err);
       }
// check to see if theres already a user with that email
       if (passUser) {
          return done(null, false, ctx.flash('signupMessage','That email is already taken.'));
       } else {  // if there is no user with that email // create the user
       var newUser            = new User();
// set the user's local credentials
        newUser.local.email    = email;
        newUser.local.username = email;
        newUser.local.password = newUser.generateHash(password);
// save the user
        newUser.save(function(err) {
             if (err) throw err;
             return done(null, newUser);
           }); // end save
        }  // end else
    });   // end callback function & User.findOne
        //  process.nextTick
   } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
   };
}  // end verifyCallback
)); // end new LocalStrategy 'local-signup'

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
)); // end FacebookStrategy
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
)); // end TwitterStrategy
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
)); // end GoogleStrategy

///========================end authpass.js
