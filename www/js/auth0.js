// mapmeld
//////////////////const passport = require('koa-passport')
const util = require('util');  
const kbb = require('koa-busboy');

module.exports = function(appk, passport) {

  const LocalStrategy = require('passport-local').Strategy;

  var User            = require('./models/user');  // ../app/models/user   default  .js
/*
const fs = require('fs');
console.time("fileread");   // mzfs. 0.342ms fs. 0.396ms  (0.111ms console.timeEnd)
var dbadmin = fs.readFileSync(process.env.DBADMIN, 'utf8');  // mzfs. 0.212ms fs. 0.202ms
var dbadminq = dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');  // quoted correct JSON 0.245ms
var dbadminqp = JSON.parse(dbadminq); // 0.150ms
var record = JSON.stringify(dbadminqp.session); // 0.140ms
console.timeEnd("fileread");
console.log("DBADMIN_auth0:"+process.env.DBADMIN+'\n '+record); // 2.810ms

//const mongoose = require('mongoose');
const dbUrl = `mongodb://${dbadminqp.dbuser.createUser}:${dbadminqp.dbuser.pwd}@172.17.0.1:27017/kyxtree?authSource=admin`;
console.log("uri_auth0: "+dbUrl);  //mongoUri should be in the form of "mongodb://user:pass@url:port/dbname"
//???mongoose.connect(config.get('mongo'), {useMongoClient: true});  // no updates

//module.exports.connect = function(mongoUri, promiseLib){
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const mongooseConn = mongoose.connect(dbUrl, {
    useMongoClient: true//,
//  promiseLibrary: bluebird // Deprecation issue again
});
mongooseConn.then(db => {//db.createUser(dbadminqp.superadmin);// console.log('Mongoose has been connected');})
       .catch(err => {console.log('Error while trying to connect with mongodb: '+err); });  // throw err;
// Even though it's a promise, no need to worry about creating models immediately, as mongoose buffers requests until a connection is made
//    return mongoDB
//};
*/

/////const dbUrl = "mongodb://user:555777@192.168.1.2:27017/kyxtree";
//mongoose.connect(dbUrl);  //  && npm install --save mongoose@4.10.8 else 2Warnings: `open()` is deprecated & Db.prototype.authenticate
//mongoose.createConnection(dbUrl); // Db.prototype.authenticate method will no longer be available
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
//var User            = require('./models/user');  // ../app/models/user   default  .js
// expose this function to our app using module.exports


//module.exports = function(appk, passport) {
//var User            = require('./models/user');  // ../app/models/user   default  .js
// passport session setup ==================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
// used to serialize the user for the session
   passport.serializeUser(function(user, done) {
     done(null, { email: User.local.email });
  // done(null, user.id);
      });
// used to deserialize the user
   passport.deserializeUser(function(email, done) {
      User.findOne('local.email', function(err, user) {
      console.log("user deserialize"+user);
      done(err, user);  //     done(null, user);
//    User.findById(id, done);
      });
   });
/*
   const LocalStrategy = require('passport-local').Strategy
   passport.use(new LocalStrategy(function(username, password, done) {
     User.findOne({ username: username, password: password }, done);
   }))
**/

//const LocalStrategy = require('passport-local').Strategy;
// LOCAL SIGNUP ============================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
   passport.use('local-signup', new LocalStrategy({
// by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        async function(email, password, done) {
          try {
          const {fields} = await kbb(ctx.req);  console.log(util.inspect({fields}));


        console.log("pass email:"+email);
// asynchronous // User.findOne wont fire unless data is sent back
  ////      process.nextTick(function() {
// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
    //  console.log("pass login:"+util.inspect(user));
// if there are any errors, return the error
        if (err) return done(err);
// check to see if theres already a user with that email
        if (user) {
            return done(null, false, ctx.flash('signupMessage', 'That email is already taken.'));
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

}));    // function // LocalStrategy // passport.use 'local-signup'

// LOCAL LOGIN =============================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use('local-login', new LocalStrategy(
  {
// by default, local strategy uses username and password, we will override with email
   usernameField : 'email',
   passwordField : 'password',
   passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   async function(email, password, done) { // callback with email and password from our form
// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
try {
const {fields} = await kbb(ctx.req);  console.log(util.inspect({fields}));
var email = fields.email;
var password = fields.password;
      User.findOne({ 'local.email' :  email }, function(err, user) {
        console.log("pass login:"+util.inspect(user));
// if there are any errors, return the error before anything else
          if (err) return done(err);
// if no user is found, return the message
          if (!user) {  console.log("pass login:"+util.inspect(user));
              return done(null, false, ctx.flash('loginMessage', 'No user found.')); // routerkp is the way to set flashdata using connect-flash
            }
// if the user is found but the password is wrong
          if (!user.validPassword(password))
              return done(null, false, ctx.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
// all is well, return successful user
          return done(null, user);
      }); // User.findOne

    } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
    };



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
