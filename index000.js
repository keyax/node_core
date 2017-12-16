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
const nodeport =  parseInt(`${dbadminqp.nodeport}`) || process.argv[2]; // node server.js 8000 // pass parameter in command line
const mongoport =  parseInt(`${dbadminqp.mongoport}`) || process.argv[3]; // node server.js 8000 // pass parameter in command line

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
const serverk  = http.createServer(appk.callback());  // can mount (express.app) // serverk.listen(8000);
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
const convert = require('koa-convert');  // appk.use(convert(legacyMiddleware))
// appk.use(convert.compose(legacyMiddleware, modernMiddleware))
// koa deprecated Support for generators will be removed in v3.
// ---------- override app.use method ----------convert generator to promise & back ?
const _use = appk.use   // Application.appk.use.x [as use] >> appk.use(require('./routes/pass.js')(routerk, passport)); // Object.<anonymous>
appk.use = x => _use.call(appk, convert(x))
// ---------- end ----------

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
const flash = require('koa-connect-flash'); // +koa-generic-session > this.flash()
// const flash = require('koa-flash'); // +koa-session > this.session['koa-flash']

const koasession = require('koa-session');
const KSsession = require('koa-socket-session');
const sessionkstore = require('koa-session-store');  //  fn* generator  or koa-generic-session
const sessionkmongo = require('koa-session-mongo');
const sessionkmongoose = require('koa-session-mongoose');

const CSRF = require('koa-csrf');
const passport = require('koa-passport');
//var User = require('./models/user');
//appk.proxy = true;  // koa passport trust proxy
///require('./auth0.js')(appk, passport); // require('./config/passport')(passport); // pass passport for configuration

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
  dbback: (err, db) => { assert.equal(null, err);
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

// Robomongo shell
// db.getSiblingDB('admin').auth({user:'kyxuser',pwd:'ultra2017'})
// db.getSiblingDB('kyxtree').getCollectionNames()
              console.log("MongoDb coll is connected to database: "+db);
              }
            return;
          },

  dbs: {},
  colls: {}     // end cback
}; // end dbenv

const dbUrl = `mongodb://${dbusr}:${dbpwd}@172.17.0.1:${mongoport}/kyxtree`; // ?authSource=admin`;  //  default /admin
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const mongooseConn = mongoose.connect(dbUrl, dbenv.optodm, dbenv.dbback);
const mongo = mongoose.mongo;
//const mongo = require('mongodb');
const MongoServer = mongo.Server;
const MongoClient = mongo.MongoClient; //mongoose.mongo.MongoClient.connect(uri, function (err, conn) {});
const Db = mongo.Db;
//const mongoConn = MongoClient.connect(dbUrl, dbenv.opts, dbenv.collback);
//const dbtree = dbenv.dbs.kyxtree;
//console.log("geo comment: "+dbenv.colls.geo.find({"comment":"comentario de texto"}));
try {
var insread = async function (){
dbenv.dbs.kyxtree = {};dbenv.dbs.geo = {};
dbenv.dbs.kyxtree = await MongoClient.connect(dbUrl, dbenv.optcli);
dbenv.dbs.geo = await dbenv.dbs.kyxtree.createCollection("geo");
var resins = await dbenv.dbs.geo.insert({geoid: "es/an/se/se"});
var resfind = await dbenv.dbs.geo.findOne({"geoid": "es/an/se/se"});
console.log("resins: ");console.log(resins);
console.log("resfind: ");console.log(resfind);
}();
} catch (err) {
 ctx.body = { messagedb: err.message }
 ctx.status = err.status || 500
};

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
  console.log("ctx.params:"+ctx.response);
});
*/
//var dbconn = require('./dbconnect.js');
//var conexion = null;
var resultado = "";
