// mapmeld
const util = require('util');
const kbb = require('koa-busboy');
// config/passport.js  // load all the things we need
const passport = require('koa-passport');
//const LocalMongoose = require('passport-local-mongoose');
//const JwtStrategy = require('passport-jwt').Strategy;
    // expose this function to our app using module.exports
    //module.exports = function(appk, passport) {   ...  }
// load up the user model
var User = require('./models/user');  // ../app/models/user   default  .js
/*
User.findOne({ 'local.email': 'test@keyax.info' }, function (err, testUser) {
  if (!testUser) {
    console.log('test@keyax.info user did not exist; creating test user...')
    testUser = new User({
      'local.email': 'test@keyax.info',
      'local.password': '555777'
    })
    testUser.save()
  }
  console.log("user found"+testUser);
})
*/
// passport session setup ==================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
// used to serialize the user for the session
/*
passport.serializeUser(function(user, done) {
  done(null, user._id)
})*/
   passport.serializeUser(function(User, done) {
     done(null, { email: User.local.email });
  // done(null, user.id);
});
// used to deserialize the user
//passport.deserializeUser(function(id, done) {
//  User.findById(id, done);
//})
   passport.deserializeUser(async function(email, done) {
      console.log("user deserialize"+user);
      await User.findOne({'local.email': 'test@keyax.info'} , function(err, user) {
      console.log("user deserialize"+user);
      done(err, user);  //     done(null, user);
      //return user;
      });
   })

const LocalStrategy = require('passport-local').Strategy;
// LOCAL SIGNUP ============================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
//passport.use(new LocalStrategy(function(username, password, done) {
//  User.findOne({ username: username, password: password }, done);
//}))
/*
passport.use('local-login', new LocalStrategy(function(email, password, done) {
  console.log("user search: "+email);
  User.findOne({ 'local.email': email, 'local.password': password }, done);
}))
*/

// LOCAL LOGIN =============================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use('local', new LocalStrategy(     // 'local',  'local-login',
  {
// by default, local strategy uses username and password, we will override with email
   usernameField : 'email',
   passwordField : 'password',
   passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(email, password, done) { // callback with email and password from our form
// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
    console.log('emailz1:'+email+'password1'+password);

try {
      console.log('emailz:'+email+'password'+password);
//const {fields} = await kbb(ctx.req);  console.log("MONGOOSE LOGIN: "); console.log(util.inspect({fields}));
//var email = fields.email;
//var password = fields.password;
    User.findOne({ 'local.email' :  'test@keyax.info' }, function(err, user) {
        console.log("pass login:");
        console.log(util.inspect(user));
// if there are any errors, return the error before anything else
          if (err) return done(err);
// if no user is found, return the message
          if (!user) {  console.log("pass login:"+util.inspect(user));
              return done(null, false, console.log('loginMessage'+'No user found.')); // routerkp is the way to set flashdata using connect-flash
            }
// if the user is found but the password is wrong
          if (!user.validPassword(password))
              return done(null, false, console.log('loginMessage'+'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
// all is well, return successful user
      done(null, user);
      }); // User.findOne

    } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
    };
}
)); // 'local-login', new LocalStrategy


passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(email, password, done) {
          try {
          const {fields} = await kbb(ctx.req);
            console.log(util.inspect({fields}));
            console.log("pass email:"+email);
// asynchronous // User.findOne wont fire unless data is sent back
  ////      process.nextTick(function() {
// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
  console.log("MONGOOSE SIGNUP: ");console.log("pass login:"+util.inspect(user));
// if there are any errors, return the error
        if (err) return done(err);
// check to see if theres already a user with that email
        if (user) {
          return console.log('signupMessage'+'That email is already taken.');
//        return done(null, false, console.log('signupMessage'+'That email is already taken.'));
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
///  });    // process.nextTick
} catch (err) {
ctx.body = { message: err.message };
ctx.status = err.status || 500;
};
})); // 'local-signup', new LocalStrategy


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

module.exports = passport;

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
