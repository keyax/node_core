//  const modul = require('builtin-modules');
//  console.log(modul); // => []
//[ 'assert','buffer','child_process','cluster','console','constants','crypto','dgram','dns','domain','events',
//  'fs','http','https','module','net','os','path','process','punycode','querystring','readline','repl',
//  'stream','string_decoder','timers','tls','tty','url','util','v8','vm','zlib' ]
//const bluebird = require('bluebird');
//global.Promise = require('bluebird');
//const co = require("bluebird").coroutine;
const co = require("co");
//const { spawn } = require('child_process')  // execute shell commands
//var fs = Promise.promisifyAll(require("fs"));  // readFileAsync
/**
var cluster = require('cluster');
const Cores = require('os').cpus();
if (cluster.isMaster &&  Cores.length > 1) { Cores.forEach((core,idx)=>{cluster.fork(); console.log("CPU core #",idx,core,"\n"); })// Create a worker
                      } else { console.log("var appx= Koa; ... appx.listen(80xx);"); };
//  Error: bind EADDRINUSE null:8000
*/
const fs = require('fs');
const mzfs = require('mz/fs');
const assert = require('assert');
const path = require('path');
var util = require('util');
//characters allowed in a URI are either reserved !*'();:@&=+$,/?#[] or unreserved A-Za-z0-9_.~- (% in percent-encoding)
//REGEXP '[^]A-Za-z0-9_.~!*''();:@&=+$,/?#[%-]+' to find URL string with bad characters
const url = require('url');
const URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');
const qs = require('querystring');
//var fetch = require('node-fetch');
//const Cors = require('koa2-cors');
const xhr2 = require('xhr2');
const http = require('http');
// const https = require('https');

const Koa = require('koa');
const appk = new Koa();  // const appk = Koa();
const serverk  = http.createServer(appk.callback());  // can mount (express.app) // serverk.listen(8000);
// const serverks  = https.createServer(appk.callback()); // serverks.listen(8443);
const app = new Koa();  // const app = Koa();
const server  = http.createServer(app.callback());  // can mount (express.app) // server.listen(8000);
const Compose = require('koa-compose');
const Convert = require('koa-convert');  // appk.use(Convert(legacyMiddleware))
// appk.use(Convert.compose(legacyMiddleware, modernMiddleware))
// koa deprecated Support for generators will be removed in v3.
// ---------- override app.use method ----------convert generator to promise & back ?
const _use = appk.use   // Application.appk.use.x [as use] >> appk.use(require('./routes/pass.js')(routerk, passport)); // Object.<anonymous>
appk.use = x => _use.call(appk, Convert(x))
// ---------- end ----------
const Routerk = require('koa-router');
const routerk = new Routerk(); // new{prefix: '/'}
///routerk.prefix('/');
const Combine = require('koa-combine-routers');

const send = require('koa-send'); //  ctx.send(201, { message: 'new beginnings!' });
const respond = require('koa-respond');  // ctx.ok({ id: 123, name: 'Dat Boi' });  ctx.notFound({ message: 'Not found, boii' });
const Static = require('koa-static');
const Mount = require('koa-mount');
const routek = require('koa-route');

//const bodyParse = require('body-parser');     // get information from html forms
//const jsbody = require('koa-json-body');  // only JSON in POST, PUT, PATCH
//parse in every route -> app.use(jsbody({limit:'10kb',fallback:true})); app.use((ctx,next)=>{console.log(ctx.request.body)})
//parse in users route -> app.post('/users', jsbody, (ctx, next) => { console.log(ctx.request.body) })
const bodyParser = require('koa-bodyparser');
const Parser = require('koa-body');
const Valid = require('koa-validate');

const kbb = require('koa-busboy');
// const abb = require('async-busboy');
const progress = require('progress-stream');
const jwt = require('jsonwebtoken');
const jsparse = require('json-parse-async');
const jsonref = require('json-schema-ref-parser');
var Formis = require('koa-formidable');
const Multer = require('koa-multer');
const Logger = require('koa-logger');

const CSRF = require('koa-csrf');
var passport = require('koa-passport');

const flash = require('koa-connect-flash'); // +koa-generic-session > this.flash()
//const flash = require('koa-flash'); // +koa-session > this.session['koa-flash']
//////const cookieParser = require('cookie-parser'); // read cookies (needed for auth)
// const cookieParser = require('koa-cookie'); // only parser ctx.cookie <- {name:'abc',age:'20',token:'xyz'}
//var Cookie = Cookiek(); // Cookiek is not a function
const Cookies = require('cookies');

const socketio = require('socket.io');
const siokAuth = require('socketio-auth');
//const siok = socketio(serverk, {origins:'keyax.org:* http://www.keyax.org:* ws://keyax.org:*'}); // socketio(appk);
//const siok = socketio.listen(serverk);
//const IO = require('koa-socket.io');
//const io = new IO({namespace: '/uploadz'});
const IO = require('koa-socket-2');
const io = new IO();  // const ks = new KS({namespace: '/uploadz'});
//io.attach(appk);
//const mongoAdapter = require('socket.io-mongodb'); // siok.adapter(mongoAdapter('mongodb://localhost:27017/socket-io'));
//const mubsub = require('mubsub');
const render = require('koa-ejs');
render(appk, {
  root: path.join(__dirname, 'views'),
  layout: 'layout.html',  // template
  viewExt: '',
  cache: false,
  debug: false,
});

 const mongoose = require('mongoose');
 mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
/*
 const Mongoose = mongoose.Mongoose;
 // const Mongo = mongoose.mongo;
 const Mongo = require('mongodb');
 const mongoServer = Mongo.Server;
 const mongoClient = Mongo.MongoClient;
 // import { MongoClient } from 'mongodb';  //.mjs
 //MongoClient.connect(dbUrl, function (err, conn) {});
 const Db = Mongo.Db;
 const Bson = Mongo.BSON;  //var Bson = new bson.serialize();
*/
// const sqlconnect = require('./sqlconnect.js');   // pool or single
//var User      = require('./models/user');  // ../app/models/user   default  .js
var dbconx = require('./models/dbconnect.js');
var dbenv = dbconx.dbenv();
var dbadmin = dbconx.dbadmin();
appk.keys = dbadmin.session.secrets; // ["keyax57secretos"];  //salt key needed for cookie-signing
const nodeport =  parseInt(`${dbadmin.nodeport}`) || process.argv[2] || 8000; // node server.js 8000 // pass parameter in command line
//const dbsroot = dbadmin.dbsroot.createUser;  // dbsroot dbsuser dbsdemo
//const dbsrootpwd = dbadmin.dbsroot.pwd;

// var date = new Date( parseInt( _id.toString().substring(0,8), 16 ) * 1000 ); // extract Timestamp from mongodb _id

var dbinit = require('./models/dbinit.js');
var tosave = dbinit.tosave();
//console.log("lngnat: ",dbinit.lngnat());console.log("lngeng: ",dbinit.lngeng()); console.log("lngfra: ",dbinit.lngfra());
//console.log("ccslng: ",dbinit.ccslng());//console.log("lngccs: ",dbinit.lngccs());

/////dbconx.insert([dbinit.lngnat(),dbinit.lngeng(),dbinit.lngfra(),dbinit.lngccs(),dbinit.ccslng()]);
//dbconx.insert([dbinit.lngccs(),dbinit.ccslng()]);
/*
(async (tree) => {
try { if(!dbenv.dbcon) dbenv.dbcon = await dbconx.openasync();
      let colgeo = dbenv.dbcon.db("kyxtree").collection("geo");
      let result = await colgeo.insert(tree);
      console.log("resul>",result,"<resul"); dbconx.close();
    } catch(err){ console.log("error open db: ",err) }
})(lngnat);
*/
/*
(function insert(tree){
    let dbcon = null, coll = null;
    dbconx.openclip()  //      dbconx.opencli()
    .then((dbx)=>{ return dbx; })
    .then((dbco)=>{ return dbco.db("kyxtree") })
    .then((dbase)=>{ return dbase.collection("geo"); })
    .then((geos)=>{ return geos.insert(tree) })
    .then((result)=>{ console.log("resul>",result,"<resul"); dbconx.close(); })
    .catch((err)=>{ console.error(err) })
})(lngnat);
*/

function resolveAfter2Seconds() { return new Promise(resolve => { setTimeout(() => { resolve('resolved'); }, 2000); });
                                }
async function asyncCall() { console.log('calling');
                             var result = await resolveAfter2Seconds();
                             console.log(result);  // expected output: "resolved"
                            }
asyncCall();

var dbo = dbconx.dbgoosep();  //  needs to be opened for passport authentication
const sessionkmongoose = require('koa-session-mongoose'); // Schema is not a constructor (if after store)
const    sessionkstore = require('koa-session-store');  //  fn* generator  or koa-generic-session
const    sessionkmongo = require('koa-session-mongo');
//const    sessionkstore = require('koa-generic-session');  //  fn* generator  or koa-generic-session
//const    sessionkmongo = require('koa-generic-session-mongo');
const koaSession = require('koa-session'); // instead koa-generic-session
// const KSsession = require('koa-socket-session');

//=====================DATA HANDLING /models/dbconnect.js=======================
//=================END DATA HANDLING /models/dbconnect.js=======================
process.setMaxListeners(20); //eventemitter.setMaxListeners(75);
appk.proxy = true;  // koa passport trust proxy
let expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
var filesize = 0;

// Using a single function to handle multiple signals
function exiting(signal) { console.log(`Received ${signal}`);
                           if (signal === 'SIGINT')  { console.log( '\nGracefully shutting down from  SIGINT (Crtl-C)' ) }
                           if (signal === 'SIGTERM') { console.log( 'Parent SIGTERM detected (kill)'); }
                        // If the Node process ends, close the Mongoose connection
                           if (dbenv.dbcon != null) { dbenv.dbcon.close(function () {
                                                      console.log('Mongoose disconnected on app termination');
                                                    } ); }
                        // close other resources here
                           setTimeout(() => { console.log('About to exit....bye');
                                              process.exit(0);  //  exit cleanly
                                            }, 100);
                           process.kill(process.pid, 'SIGHUP');
                           console.log("process.kill 'SIGHUP'...bye");
}
// Improve debugging
 process.on('unhandledRejection', (reason, p) => { console.log('Unhandled Rejection at:', p, 'reason:', reason) })
// Execute commands in clean exit
 process.on('exit', function () { console.log('Exiting ...'); });
 process.on('SIGINT', exiting);  // happens when you press Ctrl+C
 process.on('SIGTERM', exiting); // usually called with kill // ps aux | grep node >> kill pid
 process.on('SIGHUP', exiting);  // SIGHUP,  SIGKILL,  SIGABORT >> 6+128 >> 134 exit code

/*
//var langs=["eng","spa","arb"];var sysmsgs={};langs.forEach((x)=>{sysmsgs[x]=kyxtree.lng.findOne({"lang":x,"id":"sysmsgs"}));
var sysmsgs = {
  eng:{"FileNotFound":"File not found"},
  spa:{"FileNotFound":"Archivo no encontrado"},
  arb:{"FileNotFound": "ملف غير موجود"}
};
var applbls = {
  eng:{"Country": "country",
       "Name": "name"},
  spa:{"Country": "país",
       "Name": "nombre" },
  arb:{"Country": "دولة",
       "Name": "إسم"}
};
*/
var keyaxapp = require('./keyaxapp');
appk.use(Mount('/', keyaxapp));

//var conexion = null;
var resultado = "";
//=================ERROR HANDLING START KOA=======================
appk.use(async (ctx, next) => {  // koa error handling
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
//    ctx.emit('error', err, ctx);
    console.log('ErrorKoa: ', err);
// (node:1075) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 timeout listeners added. Use emitter.setMaxListeners() to increase limit
// process.setMaxListeners(15); // require('events').EventEmitter.defaultMaxListeners = 15; // default 10 unlimited 0
  }
});  //  end error middleware

// uid-safe vs uid2 vs node-uuid >>>> base64url.encode(crypto.randomBytes(length).toString('base64'))
// sessionkstore = require('koa-session-store') + sessionkmongo ose = ('koa-session-mongo ose')
console.log("dbadmin.dbUrl",dbadmin.dbUrl)

const CONFIGS = {
    name: 'kyx:sessiongo',    // cookie name  //  TypeError: this._store.load is not a function
    saveUninitialized: true, // false>needs set ctx.session.something=<something> /true>sets session any visitor
    resave: true, // true>updates session as active even if not modified in request/false>in session store with touch
//  secret: "mysecretcode", //koa2-session-store
//  store: "cookie",   // session storage layer - see below
    store: sessionkmongo.create({
//    url: dbadmin.dbUrl,
//    url: `mongodb://${dbsroot}:${dbsrootpwd}@172.17.0.1:10017/admin`, // auth in admin -> sessions in admin
      host: "172.17.0.1", //"10.255.0.3",
      port: 10017,
      db: "kyxtree",
//    collection: 'sessions',
//    mongoose: mongooseConn, //.connection, //dbgoosep, //.connection, //mongooseConn, //  dbm, // without .connection   Schema is not a constructor
//     model: 'KoaSession',
       expires: 60 * 60 * 24 * 14 // 2 weeks is the default
    }),
    cookie: {
      key: 'kyx:sessiongo', // (string) cookie key (default is koa:sess)
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
appk.use(Convert(sessionkstore(CONFIGS)));
/*
const CONFIGS = {
    name: 'kyx:sesgoose',    // cookie name
//  TypeError: this._store.load is not a function
    saveUninitialized: true, // false>needs set ctx.session.something=<something> /true>sets session any visitor
    resave: true, // true>updates session as active even if not modified in request/false>in session store with touch
//  secret: "mysecretcode", //koa2-session-store
//  store: "cookie",   // session storage layer - see below
    store: new sessionkmongoose({
      connection: dbo.connection, // without .connection   Schema is not a constructor
//    connection: mongoose.connect(dbadmin.dbUrl, dbenv.optodm, dbenv.dbback), //dbm, //mongooseConn, //appk.context.kyxoose, //mongooseConn,
//    collection: 'sessions',
//      model: "KoaSession",  // User,
      expires: 60 * 60 * 24 * 14 // 2 weeks is the default
    }),
    cookie: {
      key: 'kyx:sesgoosecookie', // (string) cookie key (default is koa:sess)
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
appk.use(koaSession(CONFIGS, appk));
//appk.use(Convert(sessionkstore(CONFIGS)));
*/
////appk.use(require('cookie-parser')());  // read cookies (needed for auth)
//appk.use(require('body-parser')());    // get information from html forms  // deprecated undefined extended
////appk.use(require('body-parser').urlencoded({ extended: true }));
//appk.use(cookiek("keyax57secretos")); // not a function
//appk.use(Cookies); // read cookies (needed for auth) // error : next is not a function // not found

//appk.use(bodyParser({//enableTypes: ['form', 'json'],
//         onerror: function (err, ctx) {ctx.throw('body parse error', 422);}
//     }));
//enableTypes: parser will only parse when request type hits enableTypes, default is ['json', 'form']
// 'json' <-> myHeaders.append('Content-Type', 'application/x-javascript');
// 'form' 'urlencoded' <-> myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
// 'text' <-> myHeaders.append('Content-Type', 'text/plain');
// 'raw'  <-> myHeaders.append('Content-Type', 'application/octet-stream');
appk.use(bodyParser({extendTypes: {json: ['application/x-javascript'] } } ) );
// will parse application/x-javascript type body as a JSON string
// appk.use(bodyParser({extendTypes: {form: ['application/x-www-form-urlencoded'] } } ) );
//appk.use(async (ctx) => {ctx.request.body = await qs.parse(ctx.request.rawBody); return ctx;}); // 404 not found routes
/*
appk.use(new CSRF({    // add the CSRF middleware
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'POST', 'HEAD', 'OPTIONS' ],
  disableQuery: false
}));
*/
///========================begin authpass.js
require('./models/authpass');
///========================end authpass.js
// route middleware to make sure a user is logged in
   function isLoggedIn(ctx, next) {
// if user is authenticated in the session, carry on
      if (ctx.isAuthenticated()) {console.log("AUTHENTICATED in isLoggedIn(ctx,next)"); return next();}
// if they aren't redirect them to the home page
      console.log("UNAUTHENTICATED in isLoggedIn(ctx,next)"); // res.redirect('/hy');
   };
appk.use(passport.initialize());
//appk.use(cookieParser(secret)); // Parse Cookie header and populate ctx.cookies with an object keyed by the cookie names.
appk.use(passport.session());  // needs de/serializeUser to store user in cookie
appk.use(Convert(flash())); // use connect-flash for flash messages stored in session // app. koa deprecated Support for generators

  /*
  async function process(next) {
    await next;
    await function (done) { setTimeout(done, 5000); };
    console.log('processed');
  };
  */

//appk.use((ctx) => {ctx.session.username="yones";console.log("sessionId:",JSON.stringify(ctx.session.username));});
//appk.use((ctx) => {ctx.cookies.set('sessiond', 123456); ctx.session.username="yones";console.log("sessionId:",JSON.stringify(x = ctx.cookies.get()));});
/*
app.use((ctx, next) => {  if(ctx.url == '/') { ctx.url = '/some/other/path' }
                          return next(); });
app.use((ctx, next) => {  ctx.body = 'ok' });
*/
appk.use(async (ctx, next) => {
  const btick = "`";
//process.stdout.write("\n"); // newline \n ,rewrite line \r = \x1B[0G in strict_mode = \033[0G in vt220 & windows
  console.log("REQ: %s %s >> %s request.body: %o",ctx.request.method,ctx.request.url,ctx.request.type,ctx.request.body);
  console.log("USR: email: %s > %s: %o",ctx.request.body.email,"ctx.session",ctx.session);
  console.log("CSRF: %s",ctx.csrf);  console.log("CSRF: %s",ctx.csrf);
// ctx.request.body only if JSON sent from FormData >> {email:'test@kyax.info',password:'666999'}
///console.log('ctx.request.rawBody:> ',ctx.request.rawBody); // ctx.request.rawBody.email  -> undefined
/*  -----------------------------16766162041707294557720081075
  Content-Disposition: form-data; name="email"
  test@keyax.info
  -----------------------------16766162041707294557720081075
  Content-Disposition: form-data; name="password"
  555777
  -----------------------------16766162041707294557720081075--*/
//  console.log("qs.parse(ctx.request.rawBody)");
//  console.log(qs.parse(ctx.request.rawBody));
//{ '-----------------------------16766162041707294557720081075\r\nContent-Disposition: form-data; name': '"email"\r\n\r\ntest@keyax.info\r\n-----------------------------16766162041707294557720081075\r\nContent-Disposition: form-data; name="password"\r\n\r\n555777\r\n-----------------------------16766162041707294557720081075--\r\n' }
//{ '{"email": "test@kyax.info", "password": "555777"}': '' }
//=============================

//  if (ctx.path === '/favicon.ico') return;  // ignore favicon
    var n = ctx.session.views || 0;
    ctx.session.views = await ++n;
    ctx.body = await ctx.flash("signupMessage");
//    ctx.body = await ctx.session.views;
    ctx.state.filesize = filesize;   //  socket.io no ctx
    console.log("VU cokie._sid:"+ctx.cookies.get("kyx:sessiongo"));  // undefined
    console.log("VU ctx.socket:"+ctx.socket.id);  // {}
///ctx.session = null;  //destroy session
////
  if (ctx.isAuthenticated()) {console.log("AUTHENTICATED in async views");}
  else {console.log("UNAUTHENTICATED in async views");} //ctx.redirect('/hy');
  await next();  // next() corrects Not Found, await corrects OK
  return ctx;
}); // end async views

/*
// logger
appk.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
appk.use(ctx => {
  ctx.session.filesize = filesize; //body = 'Hello World';
  return ctx;
});*/

//===========================routerk===================
//app.use(route.delete('/:id', mountDoom));
  /*
  appk.use(route.get('/app', function(ctx) {
    ctx.type = 'html'
    ctx.body = fs.createReadStream('views/app.html')
  }))
  */

/*
    // HOME PAGE (with login links) ========
    routerk.get('/', async function (ctx, next) { // function(req, res)
        res.render('index.ejs'); // load the index.ejs file
    });
*/
// LOGIN ===============================
// show the login form
//   routerk.get('/logito', console.log('logito ok'));
     routerk.get('/loginp', async function (ctx, next) { // function(req, res)
// render the page and pass in any flash data if it exists
//   res.render('login.ejs', { message: req.flash('loginMessage') });
     console.log("msg from pass.js /login");
    });
// process the login form
// app.post('/login', do all our passport stuff here);
// SIGNUP ==============================
// show the signup form
   routerk.get('/signup', function(ctx) {
// render the page and pass in any flash data if it exists
   ctx.render('signup.ejs', { message: ctx.flash('signupMessage') })
           .catch(err => console.error(err)); // Unhandled promise rejection
   });
// process the signup form
// app.post('/signup', do all our passport stuff here);
// process the signup form
// routerk.post('/signup', passport.authenticate('local', { badRequestMessage: 'insert message here' }));
   routerk.post('/signupass', passport.authenticate('local-signup', {
         successRedirect : '/profile', // redirect to the secure profile section
         failureRedirect : '/logout', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
   }));
// process the login form
routerk.post('/loginpass', passport.authenticate('local-login', {
         successRedirect : '/profile', // redirect to the secure profile section
         failureRedirect : '/logout', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
}));  //  end POST loginpass
// LOGOUT ==============================
routerk.post('/logout',isLoggedIn, function(ctx, next) {
 ctx.body = "LOGOUT";
       ctx.session.passport= {};
//     ctx.session = "";   // ctx.session.destroy();  // is not a function
//     ctx.state.user = {};  // used to share data btw midwares , nologout
//     ctx.isAuthenticated = false;
//     ctx.redirect('/');
      next();
},isLoggedIn);

    // PROFILE SECTION =====================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
       routerk.get('/profile', isLoggedIn, function(ctx, next) { ctx.body = "PROFILE" ;
      //   console.log("ctx.isAuthenticated"+ctx.isAuthenticated);
          //  ctx.render('profile.ejs', {
          //      user : req.user // get the user out of session and pass to template
          //  });
          next();
        });
    routerk.post("/who", async function (ctx,next) {  //  , isLoggedIn,
         try {
              if (ctx.isAuthenticated()){ console.log("passport authenticated in who !!");}
              if (ctx.isUnauthenticated()){console.log("passport not authenticated in who !!")}
              ctx.body = await ctx.session; //ctx.state.user;
              //if (ctx.session){console.log("New session", ctx.session);}
              //ctx.cookies.set("kyx:user", email);// = {resp: "login eureka!!"};  // email is not defined
  //      await next(); return ctx;
        } catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
        };
        ctx.body = await ctx.session; //ctx.state.user;
  //      await next(); return ctx;
        });

routerk.get('/hi', async (ctx, next) => {
  ctx.body = 'Hello';
  next();
})
// Require authentication for now  // requireLogin
routerk.use(function(ctx, next) {
    if (ctx.isAuthenticated()) { console.log("login ok user:",ctx.session.passport.user);
       return next(); // await next();
    } else {
       ctx.status = 401
       ctx.body = {errors: [{ title: 'Login required', status: 401 }]};
//     ctx.redirect('/');
     }});

routerk.get('/hola', async (ctx, next) => {
  ctx.body = await 'Hello from Private Zone';
  next();
})

//=========================== routerk===================

//var rooter = require('./routes/index');
//      rooter.use('/', rooter.routes(), rooter.allowedMethods());
//      var api2 = require('./methods/api2');
//      routerk.use('/api2/v0/', api2.routes(), api2.allowedMethods());
//appk.use(rooter);

//console.log("who.......................");
//console.log(require('./routes/index.js')); //(routerk, passport); // ./routes/index.js  default // module.exports = routerk.routes();

////////require('./routes/pass.js')(appk, passport); //
//appk.use(require('./routes/pass.js').pass(routerk, passport));  // Object.<anonymous> // require is not a function
// require('./app/routes.js')(app, passport); // Express: load our routes and pass in our app and fully configured passport
/*
var router10 = require('./routes')(appk); // OK1
var router11 = require('./routes/pass')(appk, passport); // OK1P
Combine([router10, router11]);
**/
//routerc = Combine([require('./routes')(appk)]);
//appk.use(routerc);
//appk.use(routerc.allowedMethods());

// independent routes + module.exports = routerk.routes();
// appk.use(require('./routes')); // ./routes/index.js  default  // OK2

///require('./routes')(appk, passport); //
//require('./routes/pass')(appk, passport); //

//const routek2 = require('koa-route');
//appk.use(routek2.post('/login', appone.login));

//var routerk2 = require('./routes/index.js')(passport);
/*
appk.use(async (ctx, next) => {
       await next();
//       ctx.body = ctx.req;
       console.log("ctx.req:"+ctx.req.email);});  // {}
*/
/*
appk.use(routerk2.routes());
appk.use(routerk2.allowedMethods());
//appk
//  .use(routerk2.routes())
//  .use(routerk2.allowedMethods());
*/


// https://segmentfault.com/q/1010000009716118
appk
//  .use(bodyParser)
  .use(routerk.routes())
  .use(routerk.allowedMethods());
//  .on('error', console.error)
///appk.onerror = console.error
//routerk2.prefix('/w3');

// catch all middleware, only land here if no other routing rules match
// make sure it is added after everything else
/*
appk.use(function *(){
  this.body = 'Invalid URL!!!';
  // this.redirect('/someotherspot');  // or redirect etc
});
*/
//=======================END ROUTERK =================================================
///function callback(req, res) {
  //res = "HOyolanokati";
/*  if (parseInt(req.headers['content-length']) > 1375347) {
    res.end('to large')
  }
  res.end('done in full')
  function ( req, res ) {
    var cookies = new Cookies( ctx.req, ctx.res, { "keys": keys } )
      , unsigned, signed, tampered
console.log("cb req.url:"+ctx.url);
    if ( ctx.req.url == "/" ) {
      cookies
        // set a regular cookie
        .set( "unsigned", "foo", { httpOnly: false } )

        // set a signed cookie
        .set( "signed", "bar", { signed: true } )

        // mimic a signed cookie, but with a bogus signature
        .set( "tampered", "baz" )
        .set( "tampered.sig", "bogus" )

      ctx.res.writeHead( 302, { "Location": "/" } )
      return ctx.res.end( "Now let's check." )
    }

    unsigned = cookies.get( "unsigned" )
    signed = cookies.get( "signed", { signed: true } )
    tampered = cookies.get( "tampered", { signed: true } )

    assert.equal( unsigned, "foo" )
    assert.equal( signed, "bar" )
    assert.notEqual( tampered, "baz" )
    assert.equal( tampered, undefined )

    ctx.res.writeHead( 200, { "Content-Type": "text/plain" } )
    ctx.res.end(
      "unsigned expected: foo\n\n" +
      "unsigned actual: " + unsigned + "\n\n" +
      "signed expected: bar\n\n" +
      "signed actual: " + signed + "\n\n" +
      "tampered expected: undefined\n\n"+
      "tampered: " + tampered + "\n\n"
    )
  };*/
///};
//======================================================================================
//io.attach(appk); //, {origins:'keyax.org:* http://www.keyax.org:* ws://keyax.org:*'} // socketio(appk);
//appk._io.set('origins', 'http://www.keyax.org:8000');
/*
appk._io.on( 'join', ( ctx, data ) => {
  console.log( 'join event fired', data )
})
io.broadcast( 'hiserver', 'Hola red ' );
io.on( 'join', function *( next)  {
  console.log( this.data )
  console.log( this.event)
})
*/
/*
appk._io.on( 'message', ( ctx, data ) => {
  // get username from session
  let username = ctx.session.username;
  // print the message received and username in session
  console.log( `message: ${ data }, username: ${username}` )
});
*/
/*
// koa-session + koa-socket-session + koa-socket.io
// koa-session-store + koa-session-mongo + koa-socket.io
//const opts = {host: 'http://kyx.dynu.net', port: '8000'};
const opts = {host: 'http://keyax.org', port: '8000'};
io.start(serverk, opts);
io.use((ctx, next) => {console.log("hola socketes");});
io.use(co.wrap(function* (next){
  let start = new Date();
  yield next;
  console.log( `response time: ${ new Date() - start }ms` );
}));
*/
// init koa-socket-session as koa-socket's middleware
//io.use(KSsession(appk, koasession));
///io.use(KSsession(appk, sessionkstore)); // fails routes
//????ksio.attach(appk); //koa-socket
/*
io.on('join', (ctx, next) => {
  ctx.socket.emit('hiserver', { hello: 'world baby koa-socket.io >>>'+ctx.socket.id });
  ctx.socket.on('upload', (ctx, next) => {    filesize = ctx.data;
 // console.log( JSON.stringify(ctx) );// {"packet":null,"event":"upload","data":302400}
 // let username = ctx.session.username;// get username from session
 // print the message received and username in session
 // console.log( `message: ${ ctx.data }, username: ${username}` );
 //   socket.broadcast.emit('progress', bytesReceived);
  });
});
*/
/*
// require : http url fs util
var onRequest = function(request, response){
    var urlpath = request.url; // var urlpath = url.parse(request.url).pathname;
    switch (urlpath){
        case "/":
            res.redirect("/www");
            break;
        case "/www":
            res.writeHead(200, {'content-type': 'text/html'});
            fs.createReadStream("/www/index.html").pipe(response);
//          var rs = fs.createReadStream('/www/index.html'); util.pump(rs, response);
            break;
        default:
//          response.writeHead(302, {'Location': '404.html'}); // add other headers here...
            response.writeHead(404, {"Content-Type": "text/html"});
            fs.createReadStream("/www/404.html").pipe(response);
//          var rs = fs.createReadStream('/www/404.html'); util.pump(rs, response);
            break;
    } // end switch
}

serverk.listen(parseInt(`${nodeport}`), onRequest);
serverk.on('error', function (err) {
  // Handle your error here
  console.log(err);
});
process.on('uncaughtException', function(e){
    console.log(e);
});
*/
//===========================================================================
serverk.listen(parseInt(`${nodeport}`), (err) => {
      if (err) {return console.log('something bad happened', err)}
      console.log(`server is listening on port: ${nodeport}`)
});

// koa + socket.io first style
//var siok = require('socket.io')(8200);  // note, io(<port>) will create a http server for you
var siok = require('socket.io')(serverk);
siok  //.of('/uploadz');    //, {path: '/uploadz'};
.on('connection', function (socket){
//  socket.join('room1');  //  socket.leave('room1');  // default Socket#id
//  socket.broadcast.in('room1').emit('hiserver', { hello: 'world baby '+socket.id });
    console.log(`what ip ${socket.handshake.address}`);  //  what ip ::ffff:10.255.0.2
    console.log(`remote ip ${JSON.stringify(socket.request.headers)}`);  //

    socket.emit('hiserver', { hello: ` world baby: ${socket.id}` });
    socket.on('hiclient', function (data) {
       console.log(`connected socket ${socket.id} event hiclient received: ${JSON.stringify(data)}`);

       console.log(`with socket cookie: ${socket.request.headers.cookie}`); // socket.handshake.query.token;
       console.log(`with socket cookie handshake: ${socket.handshake.headers.cookie}`); // previous socket.id
       var date = new Date();
           date.setTime(date.getTime()+(1*24*60*60*1000)); // set 1 day value to expiry
           var expires = "; expires="+date.toGMTString();
       var name = "kyx:socket"; var value = socket.id;
// Not a function         socket.handshake.headers.cookie.kyxsoket = name+"="+value+expires+"; path=/";
// socket.handshake.headers.cookie.set("kyx:socket", socket.id);// = {resp: "login eureka!!"};
    }); //  end on hiclient
    socket.on('upload', function (msg) { console.log("msg?????????:"+msg); });
//  socket.on('upload', async function (msg) {ctx.session.filesize = msg; console.log("msg:",msg);
//  socket.broadcast.emit('progress', bytesReceived);
//  });
});  // end siok.on connection
//    socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
//module.exports.appk = appk;
//module.exports.app = app;
/*var siok = require('socket.io')(serverkio);
siok.on('connection', function (socket){
    socket.emit('news', { hello: 'world baby'+socket.id });
    socket.on('myevent', function (data) {
       console.log('data:'+data);
       console.log(`connected socket news FF!${JSON.stringify(data)}`);
    });
     socket.emit('news',socket.id);
     socket.on('upload', function (msg) {filesize=msg; console.log("msg:",msg);
//         socket.broadcast.emit('progress', bytesReceived);
     });
  });
////      socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
*/
