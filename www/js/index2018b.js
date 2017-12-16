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
const assert = require('assert');
const fs = require('fs');
const mzfs = require('mz/fs');
const path = require('path');
const util = require('util');
console.time("fileread");   // mzfs. 0.342ms fs. 0.396ms  (0.111ms console.timeEnd)
var dbadmin = fs.readFileSync(process.env.DBADMIN, 'utf8');  // mzfs. 0.212ms fs. 0.202ms
var dbadminq = dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');  // quoted correct JSON 0.245ms
var dbadminqp = JSON.parse(dbadminq); // 0.150ms
var record = JSON.stringify(dbadminqp.session); // 0.140ms
console.timeEnd("fileread");
console.log("DBADMIN:"+process.env.DBADMIN+'\n '+record); // 2.810ms
const dbusr = dbadminqp.dbsroot.createUser;  // dbsroot dbsuser dbsdemo
const dbpwd = dbadminqp.dbsroot.pwd;
const nodeport =  parseInt(`${dbadminqp.nodeport}`) || process.argv[2] || 8000; // node server.js 8000 // pass parameter in command line
const mongoport =  parseInt(`${dbadminqp.mongoport}`) || process.argv[3] || 27017; // node server.js 8000 // pass parameter in command line

// console.log("DBADMIN:"+process.env.DBADMIN+'\n '+JSON.stringify(dbadminqp[0])); // 2.541ms
/*
console.time("fileread");  //  1173.343ms
mzfs.readFile(process.env.DBADMIN, 'utf8')  // 1150.706ms
.then(function(dbadmin){return dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');}) // 0.252ms
.then(function(dbadminq){return JSON.parse(dbadminq);}) // 0.191ms
.then(function(dbadminqp){return JSON.stringify(dbadminqp[0]);}) // 0.149ms
.then(function(record){console.log("DBADMIN:"+process.env.DBADMIN+'\n '+record);}) // 7.609ms
.then(()=>{console.timeEnd("fileread");})  //  1173.343ms
.catch(error => console.error(error));
//console.timeEnd("fileread");  //0.714ms
*/
const http = require('http');
// const https = require('https');
const Koa = require('koa');
const appk = new Koa();  // const appk = Koa();
var serverk  = http.createServer(appk.callback());  // can mount (express.app) // serverk.listen(8000);
// const serverks  = https.createServer(appk.callback()); // serverks.listen(8443);

//characters allowed in a URI are either reserved !*'();:@&=+$,/?#[] or unreserved A-Za-z0-9_.~- (% in percent-encoding)
//REGEXP '[^]A-Za-z0-9_.~!*''();:@&=+$,/?#[%-]+' to find URL string with bad characters
const url = require('url');
const URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');
//var fetch = require('node-fetch');
//const Cors = require('koa2-cors');
const xhr2 = require('xhr2');

const app = new Koa();  // const app = Koa();
const server  = http.createServer(app.callback());  // can mount (express.app) // server.listen(8000);

const Compose = require('koa-compose');
const Convert = require('koa-convert');  // appk.use(Convert(legacyMiddleware))
// appk.use(Convert.compose(legacyMiddleware, modernMiddleware))
// koa deprecated Support for generators will be removed in v3.

// ---------- override app.use method ----------Convert generator to promise & back ?
const _use = appk.use   // Application.appk.use.x [as use] >> appk.use(require('./routes/pass.js')(routerk, passport)); // Object.<anonymous>
appk.use = x => _use.call(appk, Convert(x))
// ---------- end ----------

//const Koaif = require('koa-if'); // Error: Cannot find module 'lodash/lang/isFunction'
const send = require('koa-send'); //  ctx.send(201, { message: 'new beginnings!' });
const respond = require('koa-respond');  // ctx.ok({ id: 123, name: 'Dat Boi' });  ctx.notFound({ message: 'Not found, boii' });
const Static = require('koa-static');
const Mount = require('koa-mount');
const routek = require('koa-route');

const Routerk = require('koa-router');
const routerk = new Routerk(); // new{prefix: '/'}
const Combine = require('koa-combine-routers');

const Cookiek = require('koa-cookie'); // only parser
//var Cookie = Cookiek(); // Cookiek is not a function
const Cookies = require('cookies');
//const cookieParse = require('cookie-parser'); // read cookies (needed for auth)
//const bodyParse = require('body-parser');     // get information from html forms
const bodyParser = require('koa-bodyparser');
const Parser = require('koa-body');
const Valid = require('koa-validate');
const render = require('koa-ejs');
render(appk, {
  root: path.join(__dirname, 'views'),
  layout: 'layout.html',  // template
  viewExt: '',
  cache: false,
  debug: false,
});

const kbb = require('koa-busboy');
// const abb = require('async-busboy');
const progress = require('progress-stream');
const jwt = require('jsonwebtoken');
const jsparse = require('json-parse-async');
const jsonref = require('json-schema-ref-parser');
var Formis = require('koa-formidable');
const Multer = require('koa-multer');
const Logger = require('koa-logger');
//const flash = require('koa-connect-flash'); // +koa-generic-session > this.flash()
const flash = require('koa-flash'); // +koa-session > this.session['koa-flash']

const koasession = require('koa-session');
const KSsession = require('koa-socket-session');
const sessionkstore = require('koa-session-store');  //  fn* generator  or koa-generic-session
const sessionkmongo = require('koa-session-mongo');
const sessionkmongoose = require('koa-session-mongoose');

const CSRF = require('koa-csrf');
//const passport = require('koa-passport');
//var User = require('./models/user');
//appk.proxy = true;  // koa passport trust proxy
//require('./auth0.js')(appk, passport); // require('./config/passport')(passport); // pass passport for configuration

const socketio = require('socket.io');
const siokAuth = require('socketio-auth');
//const siok = socketio(serverk, {origins:'keyax.org:* http://www.keyax.org:* ws://keyax.org:*'}); // socketio(appk);
//const siok = socketio.listen(serverk);
//const IO = require('koa-socket.io');
//const io = new IO({namespace: '/uploadz'});
const IO = require('koa-socket-2');
const io = new IO();  // const ks = new KS({namespace: '/uploadz'});
//io.attach(appk);

var dbenv = {
  optodm: {  // ODM object data modeling with mongoose.js
    promiseLibrary: global.Promise,
//  promiseLibrary: bluebird // deprecated
    useMongoClient: true,
    authSource: "admin",
    poolSize: 1,  // default 5  maxPoolSize
//  socketOptions: {
    keepAlive: 120,
    connectTimeoutMS: 500 //,
//  } //,
//  uri_decode_auth:true,
//  ssl: true,
  },  // end optodm
  optcli: {
    promiseLibrary: global.Promise,
//  promiseLibrary: bluebird // deprecated
//  useMongoClient: true,
    authSource: "admin",
    poolSize: 1,  // default 5  maxPoolSize
//  socketOptions: {
    keepAlive: 120,
    connectTimeoutMS: 500 //,
//  } //,
//  uri_decode_auth:true,
//  ssl: true,
  },  // end opts
  dbback: (err, db) => { //assert.equal(null, err);
        if (err) {
          console.log("MongoDb is not connected");
          }
        if (db) {dbenv.dbs.kyxtree = {} = db;
          console.log("MongoDb is connected to database: "+db);
          }
        return;
      },
  collback: (err, db) => { assert.equal(null, err);
            if (err) {
              console.log("MongoDb coll is not connected");
              }
            if (db) {dbenv.colls.geo = {} = db.collection('geo');
                    console.log("count!!!!!!!"+ dbenv.dbs.geo.find({}).count());
                  //   insert({"comment":"comentario de texto"});
              console.log("MongoDb coll is connected to database: "+db);
              }
            return;
          }, // end cback
  dbs: {},
  colls: {}
}; // end dbenv

const dbUrl = `mongodb://${dbusr}:${dbpwd}@172.17.0.1:${mongoport}/kyxtree`; // ?authSource=admin`;  //  default /admin
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
//const mongooseConn = mongoose.connect(dbUrl, dbenv.optodm, dbenv.dbback);
const Mongo = mongoose.mongo;  //const mongo =  require('mongodb');
const MongoServer = Mongo.Server;
const MongoClient = Mongo.MongoClient;
//MongoClient.connect(uri, function (err, conn) {});
const Db = Mongo.Db;
const Bson = Mongo.BSON;  //var Bson = new bson.serialize();
/*
// shell script create function
use applix
db.system.js.save({ _id : "Addery" , value : function (x, y){ return x + y; } } );
// shell script execute function
use applix
db.loadServerScripts(); Addery(70,6);
*/
/*
try {
var insread = async function (){
dbenv.dbs.kyxtree = {};dbenv.dbs.geo = {};
dbenv.dbs.kyxoose = mongoose.connect(dbUrl, dbenv.optodm);
//const mongoConn = MongoClient.connect(dbUrl, dbenv.opts, dbenv.collback);
dbenv.dbs.kyxtree = await MongoClient.connect(dbUrl, dbenv.optcli); //const dbtree = dbenv.dbs.kyxtree;
dbenv.dbs.applix = dbenv.dbs.kyxtree.db("applix");
var applixsys = dbenv.dbs.applix.collection('system.js');  // Functions alias system.js collection
//new Mongo.Code(); // Code { _bsontype: 'Code', code: undefined, scope: undefined }
////applixsys.insertOne({_id : "Adder", value : function (x, y){ return x + y; } },{'serializeFunctions':true} );
var funy = await applixsys.findOne({_id:"Adder"}); //,{'evalFunctions':true});
//var funy = await applixsys.findOne({_id: "Adders", value: {$type: 13}},{_id: 0,value:1},{'needParse': true, 'evalFunctions': true});
//result = await dbenv.dbs.applix.eval("Adder(50,7)"); // MongoError: not authorized execute command $eval
//{ _id: 'Adder',
//value: Code { _bsontype: 'Code',
//              code: 'function (x, y){ return x + y; }',
//              scope: undefined } }
let Adder = new Function('return ' + funy.value.code)();
//let Adder = eval("(()=>{return " + funy.value.code+"})()");
//var Adder = eval("var f = function(){ return "+funy.value.code+";}; f() ;") ;
//var Adder = function (x, y){ return x + y; }; // const btick = "`";
await console.log(Adder(50,7));

dbenv.dbs.geo = await dbenv.dbs.applix.createCollection("geo");
var resins = await dbenv.dbs.geo.insert({geoid: "es/an/se/se"});
var resfind = await dbenv.dbs.geo.findOne({"geoid": "es/an/se/se"});
console.log("resins: ");console.log(resins);
console.log("resfind: ");console.log(resfind);
//dbenv.dbs.kyxtree.close();
//dbenv.dbs.applix.close();
}();
} catch (err) {
 ctx.body = { messagedb: err.message }
 ctx.status = err.status || 500
};
*/
/*
var coll = dbenv.colls.geo;
coll.find({}, function(err, docs) {
   docs.each(function(err, doc) {
     if(doc) {
       res.write(JSON.stringify(doc) + "\n");
     }
     else {
       res.end();
     }
   });
});*/
//var geo = dbenv.colls.geo; //  dbtree.createCollection("geo");
//geo.insert({"comment":"comentario de texto"});
//&& npm install --save mongoose@4.10.8 else 2Warnings: `open()` is deprecated & Db.prototype.authenticate
//const mongooseConn = mongoose.connection.openUri(dbUrl, dbenv.opts);  // goto line 389 // specify Shard or replSet
//const mongooseConn = mongoose.createConnection(dbUrl, dbenv.opts); // Db.prototype.authenticate method will no longer be available
// Even though it's a promise, no need to worry about creating models immediately, as mongoose buffers requests until a connection is made
//(node:118) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): MongoError: Authentication failed.
//(node:118) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
//(node:118) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): MongoError: Authentication failed.
//var dbtree = mongooseConn.openNewDB('applics');
//console.log('dbtree'+dbtree);
/**************
MongoClient.connect(dbUrl, // ,{poolSize:10,ssl:true,uri_decode_auth:true},
  function(err, dbx) { // assert.equal(null, err);
  console.log("Connected correctly to mongodb server");
// dbx.command(dbadminqp.dbuser);   // superadmin, dbadmin, dbuser
//dbAdmin = dbx.admin();
//================
dbAdmin.addUser(dbadminqp.superadmin.createUser,dbadminqp.superadmin.pwd,{roles: dbadminqp.superadmin.roles})
       .catch(err => {console.log('Error while trying to create user superadmin mongodb: '+err); });  // throw err;
dbAdmin.addUser(dbadminqp.dbadmin.createUser,dbadminqp.dbadmin.pwd,{roles: dbadminqp.dbadmin.roles})
       .catch(err => {console.log('Error while trying to create user dbadmin mongodb: '+err); });  // throw err;
dbAdmin.addUser(dbadminqp.dbuser.createUser,dbadminqp.dbuser.pwd,{roles: dbadminqp.dbuser.roles})
       .then(usr => console.log('Mongodb has been created:'+JSON.stringify(usr)))
       .catch(err => {console.log('Error while trying to create user dbuser mongodb: '+err); });  // throw err;
//====================
//var geo = dbx.collection("geo");
//console.log("geo: "+geo);
//dbx.close();
});
**************/

//const dbUrl = `mongodb://${dbadminqp.dbuser.createUser}:${dbadminqp.dbuser.pwd}@172.17.0.1:27017/kyxtree?authSource=admin`;
//console.log("uri: "+dbUrl);  //mongoUri should be in the form of "mongodb://user:pass@url:port/dbname"

//module.exports.connect = function(mongoUri, promiseLib){
/*
mongooseConn.then(db => {   //db.createUser(dbadminqp.superadmin);
                     console.log('Mongoose has been connected'+db);})
       .catch(err => {console.log('Error while trying to connect with mongodb: '+err); });  // throw err;
*/
//const mongoAdapter = require('socket.io-mongodb'); // siok.adapter(mongoAdapter('mongodb://localhost:27017/socket-io'));
//const mubsub = require('mubsub');
// const sqlconnect = require('./sqlconnect.js');   // pool or single

var filesize = 0;
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
/*
var appa =
`var a=new Koa();
funa = async function(ctx, next){
   ctx.response.body='Hello friendys backtick req!!';await next();};
a.use(funa);
appk.use(Mount('/helo',a));
var b=new Koa();
funb = async function(ctx, next){await next();
  ctx.response.body='Hello friendys b koa app!!';};
b.use(funb);
appk.use(Mount('/helos', funb));
`
eval(appa);
//new Function(appa);
//require(appa); // Cannot find module 'const a=new Koa()
*/
/*
//const appi = new Koa();  // const app = Koa();
const a = new Koa();
a.use(async function (ctx, next){
  await next();
  ctx.response.body = 'Hello friends!!';
});
appk.use(Mount('/helo', a));
routerk.get('/hi', function (ctx) {
// hello
  // ctx.router available
//const res = await ctx.response;
  console.log('ctx.params:'+ctx.response);
});
*/
//var dbconn = require('./dbconnect.js');
//var conexion = null;
var resultado =   "";
/*
var rte= '/pets/pets'; var unit = pets.app1.list;
//var uploadm = Multer({dest: '/img'});
app.use(Mount('/pets/hi', pets.app1.hi)); // Internal Serve Error>TypeError:Cannot read property 'middleware' of undefined
app.use(routek.get('/pets/hello', pets.app1.hi)); // Not Found
app.use(routek.get(rte, unit));
app.use(routek.get('/pets/pets/:name', pets.app1.show));
unit = pets.app1.hi;
///app.use(routek.get(rte, pets.hi));
app.use(routek.get('/pets/listad', pets.listados));
app.use(routek.get('/pets/sqlang/:langs', pets.sqlang));
//app.use(routek.post('/pets/uploadm', uploadm.single('avatar')));

server.listen(nodeport+100); // app.listen(8100);
console.log('listening on port 8100');

*/
/*
var appone = {login: async function (ctx, next) {
  var User            = require('./models/user');  // ../app/models/user   default  .js
 try {
      var {fields} = await abb(ctx.req);  console.log(util.inspect({fields}));
      var email = fields.email;
      var password = fields.password;
  var userdoc = await User.findOne({'local.email': email}, function (err, userdok) {
                 if (err) {console.log("error find:", err);
                           ctx.throw(400, 'name required', { user: user });}
                 else {console.log('user found:',userdok);}
                 return userdok;
                 });
  if (!userdoc || userdoc === null){userdoc = {};
   userdoc.local = {email: email, password: password};
   var newuser = new User(userdoc);
   await newuser.save(function (err) { if (err) return handleError(err);});
// .save client side read full doc,write atomic diff => find+insert/update => .pre .post middleware
// userdox = await User.create(userdoc_array,   // call n times .save with validators,hooks
// userdox = await User.update({age:{$gt:18}},{multi:true,upsert: true} // mongoose => mongodb
// userdox = await User.users.insert(userdoc_array, // bulk faster native driver
//                      function(err,userdoq_array){if(err) return handleError(err);});
//   await User.register(userdoc, 'userid.local.password', function(err, userdoq) {
//                     if (err) {console.log("error register", err);}
//                     return ctx.render('register', { user : user });
//                     });
}

if (userdoc && userdoc.local.email === email && userdoc.local.password === password) {
         ctx.state.user = {};
         ctx.state.user.email = email;
         ctx.state.user.password = password;
         console.log('logos',ctx.state.user);
         }
//if (ctx.isAuthenticated()){ console.log("passport authenticated!!");}
//if (ctx.isUnauthenticated()){console.log("passport not authenticated!!")}
if (ctx.session){console.log("New session", ctx.session);}
ctx.cookies.set("kyx:user",JSON.stringify({"email": email,"passhoosh": password}));// = {resp: "login eureka!!"};
console.log("kyx:user"+JSON.parse(ctx.cookies.get("kyx:user")));
ctx.body = ctx.state.user;  // response to browser
// return email;
  } catch (err) {
  ctx.body = { messagelogin: err.message };
  ctx.status = err.status || 500;
  };
}  // end /login
}  // end appone
*/

//const mount2 = require('koa-mount');
//appk.use(mount2('/login', appone.login));
/*
appk.use(async (ctx, next) => {  // koa error handling
  try {//if(ctx.url == '/who') ctx.redirect('/kyx/who');
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
//    ctx.emit('error', err, ctx);
    console.log('ErrorKoaMaster: ', err);
// (node:1075) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 timeout listeners added. Use emitter.setMaxListeners() to increase limit
// process.setMaxListeners(15); // require('events').EventEmitter.defaultMaxListeners = 15; // default 10 unlimited 0
  }
});
*/
////appk.use(require('cookie-parser')());  // read cookies (needed for auth)
//appk.use(require('body-parser')());    // get information from html forms  // deprecated undefined extended
////appk.use(require('body-parser').urlencoded({ extended: true }));

//appk.use(cookiek("keyax57secretos")); // not a function

// uid-safe vs uid2 vs node-uuid >>>> base64url.encode(crypto.randomBytes(length).toString('base64'))
// comment-star
// koa-session-store + koa-session-mongo
appk.keys = dbadminqp.session.secrets; //["keyax57secretos"];  //salt key needed for cookie-signing
/*
//appk.use(sessionkstore({store: sessionkmongo.create({url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions"})}));
const CONFIGS = {
    name: 'kyx:sess1',    // cookie name
    secret: "mysecretcode", //koa2-session-store
//    store: "cookie",   // session storage layer - see below
      store: sessionkmongo.create({
//          db: "kyxtree", //"mongodb://user:555777@192.168.1.2:27017/kyxtree", //pets.dbc, // sessions,
            url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions", //pets.dbc, // sessions,
//          url: "mongodb://172.17.0.1:27017/kyxtree/sessions", //pets.dbc, // sessions,
            db: "kyxtree",  //pets.dbc,
            collection: "sessions",
//          username: "yones",
//          password: "555777",
            expirationTime: 60}),   // expires: 60*60*1
    cookie: {
      key: 'kyx:sess1', // (string) cookie key (default is koa:sess)
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
const sesion = sessionkstore(CONFIGS);
appk.use(sesion); //, appk));   //cokiesz:{"views":16,"_sid":"AraFxFnUgS2skFR"}
  // or if you prefer all default config, just use => app.use(session(appk));
*/// end comment-star
/*
// koa-session-store + koa-session-mongoose
appk.keys = dbadminqp.session.secrets; // ["keyax57secretos"];  //salt key needed for cookie-signing

const CONFIGS = {
    name: 'kyxmaster:sesgoose',    // cookie name
//  secret: "mysecretcode", //koa2-session-store
//  store: "cookie",   // session storage layer - see below
    store: new sessionkmongoose({
      collection: 'sessions',
      connection: dbenv.dbs.kyxoose,
      expires: 60 * 60 * 24 * 14, // 2 weeks is the default
      model: 'KoaSession'
    }),
    cookie: {
//    key: 'kyx:sesgoosec', // (string) cookie key (default is koa:sess)
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
appk.use(Convert(sessionkstore(CONFIGS))); //{store: new sessionkmongoose()}
*/
/*
appk.proxy = true;  // koa passport trust proxy

//  koa-session + koa-socket-session + koa-socket.io
const CONFIG = {
  key: 'koa:session', // (string) cookie key (default is koa:sess)
  // (number || 'session') maxAge in ms (default is 1 days)
  // 'session' will result in a cookie that expires when session/browser is closed
  // Warning: If a session cookie is stolen, this cookie will never expire
  maxAge: 86400000,
  overwrite: true, // (boolean) can overwrite or not (default true)
  httpOnly: true, // (boolean) httpOnly or not (default true)
  signed: true, // (boolean) signed or not (default true)
  rolling: false, // (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
};
appk.keys = ["keyax57secretos"];

// init session
//var session = koaSession({
//    secret: '...',
//    resave: true,
//    saveUninitialized: true
//});
// const session = KoaSession(CONFIG, app);
//app.use(session);
appk.use(koasession(CONFIG, appk));
// or if you prefer all default config, just use => appk.use(koasession(appk));
///////appk.use( ... );  from koa-socket-session
*/

// authentication
//require('./auth.js');
// const passport = require('koa-passport')
//appk.use(abb(ctx.req));
/*
async function startApp() {
  await next();
  return sessionkstore.setup();
}
*/

//appk.use(Cookies); // read cookies (needed for auth) // error : next is not a function // not found
////appk.use(bodyParser()); // get information from html forms // error : next is not a function // not found
// appk.use(bodyParser);// ctx.onerror is not a function ... process._tickCallback
/*
appk.use(bodyParser({
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }
}));

appk.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  console.log("ctx.request.body =");
  console.log(ctx.request.body);
});
*/
/*
app.use(new CSRF({    // add the CSRF middleware
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  disableQuery: false
}));
*/
/*
///require('./auth')
require('./auth0.js')(appk, passport); // require('./config/passport')(passport); // pass passport for configuration
appk.use(flash()); // use connect-flash for flash messages stored in session // app. koa deprecated Support for generators
appk.use(passport.initialize());
appk.use(passport.session());
//require('./auth0.js')(appk, passport); // require('./config/passport')(passport); // pass passport for configuration
*/
/*
appk.use(async (ctx, next) => {
//ctx.state.varyin = 'vary';
//  ctx.state.varyin.name = ctx.session.name;
//   ctx.cookies.set()
///  ctx.body = await ctx.request.rawBody;

  //  if (ctx.path === '/favicon.ico') return;  // ignore favicon
  let n = ctx.session.views || 0;
    ctx.session.views = await ++n;
//   console.log("userview: "+ctx.request.rawBody); // ctx.session.username = 'socketmetro';
    ctx.state.filesize = filesize;   //  socket.io no ctx
  console.log("cokie._sid:"+ctx.cookies.get("kyx:sesgoose"));  // undefined
  console.log("session.blob:"+JSON.stringify(ctx.session));  // {}
//???  console.log("ctx.socket:"+JSON.stringify(ctx.socket));  // {}
  //appk.context.vary =  n + 'views'; //'varyin';
  //ctx.session = null;  //destroy session
  await next();  // next() corrects Not Found, await corrects OK
  return ctx;
});
*/
  /*
  async function process(next) {
    await next;
    await function (done) { setTimeout(done, 5000); };
    console.log('processed');
  };
  */

/*
// passport config
passport.use(new LocalStrategy(User.authenticate()));
//  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


  passport.serializeUser(function(user, done) {
    done(null, user._id)
  })
  passport.deserializeUser(function(id, done) {
    User.findById(id, done);
  })
*/
/*  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // Require authentication for now  // requireLogin
  appk.use(function(ctx, next) {
    if (ctx.isAuthenticated()) {
       return next(); // await next();
    } else {
       ctx.status = 401
       ctx.body = {
       errors: [{ title: 'Login required', status: 401 }]
//     ctx.body = "ctx.redirect('/')";
       }
     }});
*/
/*
appk.use(async function(ctx, next) {  // requireLogin
  if (ctx.isAuthenticated()) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      errors: [{ title: 'Login required', status: 401 }]
    }
  }
});
*/
//app.use(route.delete('/:id', mountDoom));


  /*
  appk.use(route.get('/app', function(ctx) {
    ctx.type = 'html'
    ctx.body = fs.createReadStream('views/app.html')
  }))
  */
//appk.use((ctx) => {ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(ctx.session.username));});
//appk.use((ctx) => {ctx.cookies.set('sessiond', 123456); ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(x = ctx.cookies.get()));});
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

//var rooter = require('./routes/index');
//      rooter.use('/', rooter.routes(), rooter.allowedMethods());
//      var api2 = require('./methods/api2');
//      routerk.use('/api2/v0/', api2.routes(), api2.allowedMethods());
//appk.use(rooter);


//console.log("who.......................");
//console.log(require('./routes/index.js')); //(routerk, passport); // ./routes/index.js  default // module.exports = routerk.routes();

/////////////////////////////////////////////require('./routes/pass.js')(appk, passport); //
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

/*
appk.use(routerk2.routes());
appk.use(routerk2.allowedMethods());
//appk
//  .use(routerk2.routes())
//  .use(routerk2.allowedMethods());
*/
// https://segmentfault.com/q/1010000009716118
/*
var routerk2 = require('./routes/index.js');
appk
//  .use(bodyParser)
  .use(routerk2.routes())
  .use(routerk2.allowedMethods())
//  .on('error', console.error)
///appk.onerror = console.error
*/
//appk.use(Mount('/pets/hi', pets.app1.hi)); // Internal Serve Error>TypeError:Cannot read property 'middleware' of undefined
////require('./auth0.js')(appk, passport); // require('./config/passport')(passport); // pass passport for configuration
serverk  = http.createServer(appk.callback());  // can mount (express.app) // serverk.listen(8000);

require('./index2017b');

//var appx = require('./index2017b');

///appk.use(bodyParser())
/*
require('./auth0');
///appk.use(flash2()); // use connect-flash for flash messages stored in session // app. koa deprecated Support for generators
appk.use(passport.initialize());
appk.use(passport.session());
*/
//appk.use(Mount('/w2', appx.app));
//appk.use(Mount('/', appx.appk));

appk.use(async (ctx) => {
       console.log("index ctx.request:");
       console.log(ctx.request);
     });  // {}

// catch all middleware, only land here if no other routing rules match
// make sure it is added after everything else

/*
appk.use(async (ctx, next) => {
   ctx.body = 'Invalid URL for virtual server in master app !!!';
// console.log("router stack:");console.log(appk.routerkx.routes);
//  ctx.redirect('/');  // 'login' loops
await next();
return;
});

*/
// suppress stderr output if you want
////appk.outputErrors = false;
// errors will propagate to the upstream app,
// however you can still use the "error" listener
// in subapps more specific behaviour, just keep
// in mind that it should be used in an unobtrusive way,
// since most decisions should be made by the parent app.
/*
appk.on('error', function (err, ctx) {
  console.log('%s %s: sending error "%s" to alert service',
    ctx.method,
    ctx.path,
    err.message)
})
*/
/*
serverk.listen(parseInt(`${nodeport}`), onRequest);
serverk.on('error', function (err) {
  // Handle your error here
  console.log(err);
});
process.on('uncaughtException', function(e){
    console.log(e);
});


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
*/
//===========================================================================

serverk.listen(parseInt(`${nodeport}`), (err) => {
      if (err) {return console.log('something bad happened', err)}
      console.log(`server is listening on port: ${nodeport}`)
});

// koa + socket.io first style
//var siok = require('socket.io')(8200);  // note, io(<port>) will create a http server for you
var siok = require('socket.io')(serverk);
siok  //.of('/uploadz');    //, {path: '/uploadz'});
.on('connection', function (socket){
//  socket.join('room1');  //  socket.leave('room1');  // default Socket#id
//  socket.broadcast.in('room1').emit('hiserver', { hello: 'world baby '+socket.id });
    socket.emit('hiserver', { hello: 'world baby server loader'+socket.id });
    socket.on('hiclient', function (data) {
       console.log(`connected socket ${socket.id} event hiclient received: ${JSON.stringify(data)}`);
       console.log(`with socket cookie: ${socket.request.headers.cookie}`); // previous socket.id
       console.log(`with socket cookie handshake: ${socket.handshake.headers.cookie}`); // previous socket.id
       var date = new Date();
           date.setTime(date.getTime()+(1*24*60*60*1000)); // set 1 day value to expiry
           var expires = "; expires="+date.toGMTString();
       var name = "kyx:socket"; var value = socket.id;
// Not a function         socket.handshake.headers.cookie.kyxsoket = name+"="+value+expires+"; path=/";
// socket.handshake.headers.cookie.set("kyx:socket", socket.id);// = {resp: "login eureka!!"};
    });
    socket.on('upload', function (msg) { console.log("msg?????????:"+msg); filesize = msg;
//  socket.on('upload', async function (msg) {ctx.session.filesize = msg; console.log("msg:",msg);
//  socket.broadcast.emit('progress', bytesReceived);
//  });
  });
});  // end siok.on
//    socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
