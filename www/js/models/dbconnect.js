/*
const mzfs = require('mz/fs');
console.time("fileread");  //  1173.343ms
mzfs.readFile(process.env.DBADMIN, 'utf8')  // 1150.706ms
.then(function(dbadmin){return dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');}) // 0.252ms
.then(function(dbadminq){return JSON.parse(dbadminq);}) // 0.191ms
.then(function(dbadminqp){return JSON.stringify(dbadminqp[0]);}) // 0.149ms
.then(function(record){console.log("DBADMIN:"+process.env.DBADMIN+'\n '+record);}) // 7.609ms
.then(()=>{console.timeEnd("fileread");})  //  1173.343ms
.catch(error => console.error(error));
//console.timeEnd("fileread");  //0.714ms
// console.log("DBADMIN:"+process.env.DBADMIN+'\n '+JSON.stringify(dbadminqp[0])); // 2.541ms
*/
const fs = require('fs');
const path = require('path');

console.time("fileread");   // mzfs. 0.342ms fs. 0.396ms  (0.111ms console.timeEnd)
var dbadmin = fs.readFileSync(process.env.DBADMIN, 'utf8');  // mzfs. 0.212ms fs. 0.202ms
var dbadminq = dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');  // quoted correct JSON 0.245ms
var dbadminqp = JSON.parse(dbadminq); // 0.150ms
var record = JSON.stringify(dbadminqp.session); // 0.140ms
console.timeEnd("fileread");
console.log("DBADMIN:"+process.env.DBADMIN+'\n '+record); // 2.810ms

const dbsroot = dbadminqp.dbsroot.createUser;  // dbsroot dbsuser dbsdemo
const dbsrootpwd = dbadminqp.dbsroot.pwd;
const kyxown = dbadminqp.dbowner.createUser;  // dbowner(adm) dbuser(rw) in kyxtree
const kyxownpwd = dbadminqp.dbowner.pwd;
const nodeport =  parseInt(`${dbadminqp.nodeport}`) || process.argv[2]; // node server.js 8000 // pass parameter in command line
const mongoport =  parseInt(`${dbadminqp.mongoport}`) || process.argv[3]; // node server.js 8000 // pass parameter in command line
dbadminqp.dbUrl = `mongodb://${dbsroot}:${dbsrootpwd}@172.17.0.1:${mongoport}`; // /admin?authSource=admin`; // default /admin
//dbadminqp.dbUrl = `mongodb%3A%2F%2F${dbsroot}%3A${dbsrootpwd}%40172.17.0.1:${mongoport}%2Fkyxtree%3FauthSource%3Dadmin`; // default /admin

var countries = fs.readFileSync(path.join(__dirname,'./')+'countriesunescaped.json', 'utf8');  // mzfs. 0.212ms fs. 0.202ms
//var countriesq = countries.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');  // quoted correct JSON 0.245ms
var countriesqp = JSON.parse(countries); // 0.150ms
var recs = JSON.stringify(countriesqp[0]); // 0.140ms
////console.timeEnd("fileread");
console.log("country:",recs); // 2.810ms

// mongodb container service name instead ip 172.17.0.1, ? 10.0.0.3
/*
the server/replSet/mongos options are deprecated,
// options.server.socketOptions = options.replset.socketOptions = { keepAlive: 120 };
all their options are supported at the top level of the options object
[poolSize,ssl,sslValidate,sslCA,sslCert,sslKey,sslPass,autoReconnect,noDelay,keepAlive,
connectTimeoutMS,socketTimeoutMS,reconnectTries,reconnectInterval,ha,haInterval,replicaSet,
secondaryAcceptableLatencyMS,acceptableLatencyMS,connectWithNoPrimary,authSource,w,wtimeout,j,
forceServerObjectId,serializeFunctions,ignoreUndefined,raw,promoteLongs,bufferMaxEntries,
readPreference,pkFactory,promiseLibrary,readConcern,maxStalenessSeconds,loggerLevel,logger,
promoteValues,promoteBuffers,promoteLongs,domainsEnabled,keepAliveInitialDelay,checkServerIdentity,validateOptions]
*/
// https://docs.mongodb.com/v3.2/reference/configuration-options/#storage.wiredTiger.engineConfig.cacheSizeGB
// in Mongo 3.2, seems the config value name is: storage.wiredTiger.engineConfig.cacheSizeGB
// wiredTigerCacheSizeGB = 1  in .config file  // by default 60% RAM minimum 1GB
// db.runCommand( { serverStatus: 1, workingSet: 1 } )"  //  needs to fit in memory for performance
// serverStatus.workingSet.pagesInMemory × 4KB
// serverStatus.backgroundFlushing
// { fsync: 1, async: <Boolean>, lock: <Boolean> }  // flushes data to disk // db.fsyncLock db.fsyncUnlock
// https://serverfault.com/questions/654699/how-to-use-fsynclock-safely-in-backing-up-a-single-mongod
// mongodump --opslog
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const Mongoose = mongoose.Mongoose;
// const Mongo = mongoose.mongo;
const Mongo = require('mongodb');
const mongoServer = Mongo.Server;
const mongoClient = Mongo.MongoClient;
// import { MongoClient } from 'mongodb';  //.mjs
//MongoClient.connect(dbUrl, function (err, conn) {});
const Db = Mongo.Db;
const Bson = Mongo.BSON;  //var Bson = new bson.serialize();
const sessionkmongoose = require('koa-session-mongoose'); // Schema is not a constructor (if after store)
const sessionkstore    = require('koa-session-store');  //  fn* generator  or koa-generic-session
const sessionkmongo    = require('koa-session-mongo');
const koaSession = require('koa-session');
// const KSsession = require('koa-socket-session');

var dbenv = {
  optcli: {
//  useMongoClient: true,  // nooot supported, only use in mongoose-session-store
    promiseLibrary: global.Promise,
//  promiseLibrary: bluebird // deprecated
    authSource: "admin",
    poolSize: 2,  // default 5  maxPoolSize
//    socketOptions: {
       keepAlive: 1,
       connectTimeoutMS: 2000, // 500
//       },
    autoReconnect: true,
    native_parser: true
//  uri_decode_auth:true, // username password
//  ssl: true
  },  // end optcli
  optodm: {  // ODM object data modeling with mongoose.js
    useMongoClient: true,
//  promiseLibrary: global.Promise,  // not applicable
//  promiseLibrary: bluebird // deprecated
    authSource: "admin",
    poolSize: 2,  // default 5  maxPoolSize
//    socketOptions: {
       keepAlive: 1, // 120
       connectTimeoutMS: 2000, // 500
//       },
    autoReconnect: true,
//  native_parser: true
//  uri_decode_auth:true, // username password
//  ssl: true
    config: {
      autoIndex: false
    }
  },  // end optodm
  dbback: (err, db) => { //assert.equal(null, err);
        if (err) {
          console.log("MongoDb is not connected");
          }
        if (db) {dbenv.dbs.kyxtree = {} = db;
          console.log("MongoDb is connected to database: "+db);
          }
        return;
      },
  dboback: (err) => { //assert.equal(null, err);
        if (err) {
          console.log("Mongoose Db is not connected", err);
          }
/*        if (db) {dbenv.dbs.kyxtree = {} = db;
          console.log("MongoDb is connected to database: "+db);
        }*/
        return;
      },

  collback: (err, db) => { //assert.equal(null, err);
            if (err) {
              console.log("MongoDb coll is not connected");
              }
            if (db) {dbenv.dbs.kyxtree = db;
                    console.log("count!!!!!!!", dbenv.dbs.kyxtree.collection('geo').findMany({}).count());
                  //   insert({"comment":"comentario de texto"});
              console.log("MongoDb coll is connected to database: ",db);
              }
            return;
          },
  dbs: {},
  colls: {}     // end cback
}; // end dbenv

//https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
/*
dbenv.dbs.applix = dbenv.dbs.kyxtree.db("applix");
var applixsys = dbenv.dbs.applix.collection('system.js');  // Functions alias system.js collection
//new Mongo.Code(); // Code { _bsontype: 'Code', code: undefined, scope: undefined }
////applixsys.insertOne({_id : "Adder", value : function (x, y){ return x + y; } },{'serializeFunctions':true} );
var funy = await applixsys.findOne({_id:"Adder"}); //,{'evalFunctions':true});
//var funy = await applixsys.findOne({_id: "Adders", value: {$type: 13}},{_id: 0,value:1},{'needParse': true, 'evalFunctions': true});
//result = await dbenv.dbs.applix.eval("Adder(50,7)"); // MongoError: not authorized execute command $eval
///{ _id: 'Adder',
///  value: Code { _bsontype: 'Code',
///                code: 'function (x, y){ return x + y; }',
///                scope: undefined } }
let Adder = new Function('return ' + funy.value.code)();
//let Adder = eval("(()=>{return " + funy.value.code+"})()");
//var Adder = eval("var f = function(){ return "+funy.value.code+";}; f() ;") ;
//var Adder = function (x, y){ return x + y; }; // const btick = "`";
await console.log(Adder(50,7));
*/

module.exports = {
dbenv: () => {return dbenv;},
dbadmin: () => {return dbadminqp;},
countries: () => {return countries;},
openasync: async function () {
      return await mongoClient.connect(dbadminqp.dbUrl, dbenv.optcli);
    },
openclip: () => new Promise((resolve, reject) => {
        mongoClient.connect(dbadminqp.dbUrl, dbenv.optcli)
        .then((dbm) => {resolve(dbm);
              console.log("connected mongodb openclip:", dbm);
               dbx = dbenv.dbs.kyxtree = dbm.db("kyxtree");
               dbx.createCollection("geo");
               dbx.createCollection("lng");  
              console.log(">>dbenv.dbs.kyxtree: ",dbenv.dbs.kyxtree);
              return dbx;
        })
        .catch((err)=>{console.log("error mongodb opencli:" + err); reject(err);
        });
      }),  // end Promise
opencli: () => {
//  Connection URL. This is where your mongodb server is running.
//  let url = dbUrl; //constants.MONGODB_URI;
    return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
        mongoClient.connect(dbadminqp.dbUrl, dbenv.optcli, (err, dbm) => {
            if (err) { console.log("error mongodb opencli:" + err);
                reject(err); // return;
            } else { resolve(dbm);
                console.log("connected mongodb opencli:", dbm.Db);
                dbenv.dbs.kyxtree = dbm;
                console.log(">>dbenv.dbs.kyxtree: ",dbenv.dbs.kyxtree);
                return dbm;
            }
        }); //  end connect
    });  // end Promise
}, // end opencli

//opengoose: () => {return mongoose.connect(dbadminqp.dbUrl, dbenv.optodm); },
dbgoose: () => {var conn = mongoose.connect(dbadminqp.dbUrl, dbenv.optodm, dbenv.dboback);
//               Check error in initial connection. There is no 2nd param to the callback.
                 return conn;},
// Or using promises
dbgoosep: async () => { try {
                            var conn = await mongoose.connect(dbadminqp.dbUrl, dbenv.optodm);
                            console.log("Mongoose Db is ready to use", conn.user);
                            } catch(err) { console.log("Mongoose Db is not connected", err); };
                        return conn;
                      },
/*dbgoosep: () => {var conn = mongoose.createConnection(dbadminqp.dbUrl, dbenv.optodm)
                 .then(() => { console.log("Mongoose Db is ready to use");})
                 .catch(err => { console.log("Mongoose Db is not connected", err); });
                 return conn;},
*/
/*
                 .then(() => { console.log("Mongoose Db is ready to use");},//`mongoose.connect()` promise resolves to undefined
                        err => { console.log("Mongoose Db is not connected", err); }
                      ); return conn;},
*/
/*  https://github.com/Automattic/mongoose/issues/4413 Please update docs for createConnection
                  mongoose.connect(connectionString)
                        .then(() => logger.info("Successfully connected to MongoDB. Starting web server..."))
                        .catch(err => logger.error("Unable to connect to MongoDB: ", err))
                        .then(() => server.start())
                        .then(() => logger.info("Successfully started web server. Waiting for incoming connections..."))
                        .catch((err) => logger.error(err));
*/
close: function (db){
    //Close connection
    if(db){
//        db.close();
        db.disconnect();
    }
}
} // end export


//module.export.dbinit = function () {

/*
  // runs in boot.js or what ever file your application starts with
  dbconn.connect()
      .then(() => console.log('database connected'))
      .then(() => app())
      .catch((e) => {
          console.error(e);
          // Always hard exit on a database connection error
          process.exit(1);
      });

  appk.context.kyxtree = dbenv.dbs.kyxtree = {} = async function () {
        return await MongoClient.connect(dbUrl, dbenv.optcli);
      }

//appk.context.kyxoose = dbenv.dbs.kyxoose = {}

//const mongooseConn = mongoose.createConnection(dbUrl, dbenv.optodm, dbenv.dbback);
  var dbms = mongoose.connect(dbUrl, dbenv.optodm);
}

var mygoose = async function () {
      return await MongoClient.connect(dbUrl, dbenv.optcli);
    }();
*/
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
**************/
////////////////////////////////
/* share connection multiple databases
var mongodb = require("mongodb"),
mongoClient = require('mongodb').MongoClient;

mongoserver = new mongodb.Server(host, port, server_options),
db_connector = new mongodb.Db(name, mongoserver, db_options);
db_connector.open(callback);
*/
/*
//const dbadmin = process.env.DBADMIN;  // already declared
//console.log(dbadmin);
const mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://user:555777@mongo.kyx:27017/kyxtree?";
//const dburl = "mongodb://kyxuser:555777@172.17.0.1:27017/kyxtree?authSource=admin";
//var dburl = "mongodb://user:555777@mongo.kyx:27017/kyxtree?";
//var conexion = null;
var result = null;
*/
/*
mongoose.connect(dbUrl, options);
function opens(){
    // Connection URL. This is where your mongodb server is running.
    let url = dburl; //constants.MONGODB_URI;
    return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
        mongoClient.connect(url, (err, db) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

function close(db){
    //Close connection
    if(db){
        db.close();
    }
}

let db = {
    opens : opens,
    close: close
}
*/
// module.exports = db;
/*
// exports.test = async function () {
      return await MongoClient.connect(dburl, options);
    }
*/
/*
module.exports.conect = () => new Promise((resolve, reject) => {
   MongoClient.connect(dburl, options)
      .then(function (dbs) { // <- db as first argument
        resolve(dbs);
        conexion = dbs;
    //    console.log(dbs)
      })
      .catch(function (err) {})
   });
*/
//console.log(url);
/*
module.exports.conect = () => new Promise((resolve, reject) =>
                              {MongoClient.connect(dburl,  options, function(err, dbs) {
                                 if (err) { console.log("error mongopen:" + err); reject(err); return; };
                                 resolve(dbs);
                                 conexion = dbs;
                                 return conexion;
                                 });
                            });
*/
//let conexion = conect();
//module.exports.conect();
/*
module.exports.finds = (conexion) => new Promise((resolve, reject) =>
                {console.log("conexion"+conexion);
                  conexion.collection("geo").find({}, function(err, docs)  {
                 resolve(docs);
                 result = docs;
  //               console.log("resujs"+JSON.stringify(docs));
                });
             });

*/
/*
module.exports.get = () => {
    if(!conexion) {
      conect()
      .then(conexion)
      .catch((err) => {throw new Error('Call connect first....!'+err);});
    }
    console.log(`db conexion: ${conexion}`);
    return conexion;
}
*/
/*
var dburl = "mongodb://user:555777@mongo.kyx";
var dbport = 27017;
var dbmongo = new MongoClient(new Serverdb(dburl, dbport));
dbmongo.open(function(err, dbmongo) {
  if (!dbmongo) {
      console.error("Error! Exiting... Must start MongoDB first");
      process.exit(1);
  }
  var db = dbmongo.db("kyxtree");
//  fileDriver = new FileDriver(db); //<--
//  collectionDriver = new CollectionDriver(db);
});
*/

/*
// Connection URL
//var dburl = 'mongodb://user:555777@mongo.kyx:27017/kyxtree?';
// Use connect method to connect to the Server
MongoClient.connect(dburl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to mongodb server");
  db.close();
});
*/

/*
// Reuse database object in request handlers
app.get("/g", function(req, res) {
  db.collection("geo").find({}, function(err, docs)  {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }
      else {
        res.end();
      }
    });
  });
});
*/
/*
// shell script create function
use applix
db.system.js.save({ _id : "Addery" , value : function (x, y){ return x + y; } } );
// shell script execute function
use applix
db.loadServerScripts(); Addery(70,6);
*/
/*
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
*/

/*  // koa async/await example
appk.use(async (ctx, next) => {
  await next();
  someSeriousBackgroundOperation(); // don't await, so the response will be sent immediately \o/
});
async function someSeriousBackgroundOperation() {
  await verySlowDBQuery();
  await someOutOfProcessImageProcessingWithCUDA();
}
*/
//=================DATA HANDLING /models/dbconnect.js=======================
/*
appk.context.kyxtree = dbenv.dbs.kyxtree = {} = async function () {
      return await MongoClient.connect(dbUrl, dbenv.optcli);
    }
var insread = async function (ctx, next){
try {
//  appk.context.kyxoose = dbenv.dbs.kyxoose = await Mongoose.connect(dbUrl, dbenv.optodm);
  //appk.context.kyxtree = dbenv.dbs.kyxtree =
//  MongoClient.connect(dbUrl, dbenv.optcli, dbback);
//appk.context.srvtree = dbenv.dbs.srvtree = await new MongoServer("172.17.0.1", mongoport, dbenv.optcli);
//appk.context.clitree = dbenv.dbs.clitree = await new MongoClient(MongoServer);
//   appk.context.admin = dbenv.dbs.admin = await dbenv.dbs.server.open(dbUrl, dbenv.optcli, dbenv.dbback);
//   appk.context.admin = dbenv.dbs.admin = await new MongoClient.connect(dbUrl, dbenv.optcli);
//   appk.context.kyxtree = dbenv.dbs.kyxtree = await MongoClient.db("kyxtree");

//   appk.context.kyxtree = dbenv.dbs.kyxtree = await dbenv.dbs.clitree.connect("admin", dbenv.dbback);
// appk.context.kyxtree = dbenv.dbs.kyxtree = await MongoClient.connect(dbUrl, dbenv.optcli); //,dbenv.collback
//   var resins = await dbenv.dbs.kyxtree.collection('geo').insertOne({geoid: "es/an/se/se"});
//   var resfind = await dbenv.dbs.kyxtree.collection('geo').findOne({"geoid": "es/an/se/se"});
//      console.log("resins: ", resins, "\n>> resfind: ", resfind);


//let appkoose = await mongoose.connect(dbUrl, dbenv.optodm);
///mongooseConn = await mongoose.connect(dbadmin.dbUrl, dbenv.optodm);
  //dbenv.dbs.kyxtree.command({ dropIndexes: "users", index: "*" });

//dbenv.dbs.kyxtree.close();
//dbenv.dbs.applix.close();
} catch (err) {
console.log("Error try catch: ",err);
// ctx.body = { messagedb: err.message } // ctx not defined
// ctx.status = err.status || 500
}
}();
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


/*
mongooseConn.then(db => {   //db.createUser(dbadminqp.superadmin);
                         console.log('Mongoose has been connected'+db);})
       .catch(err => {console.log('Error while trying to connect with mongodb: '+err); });  // throw err;
*/
// var mongooseConn = MongoClient.connect(dbUrl, dbenv.optcli); // ,{poolSize:10,ssl:true,uri_decode_auth:true},
//var mongooseConn = mongoose.createConnection(dbadmin.dbUrl, dbenv.optodm);
//mongooseConn.then(db => {appgoose=db;console.log('Mongoose has been connected');})
//       .catch(err => {console.log('Error while trying to connect with mongodb: '+err); });  // throw err;

// Even though it's a promise, no need to worry about creating models immediately, as mongoose buffers requests until a connection is made
//    return mongoDB
//};

/*
async function startApp() {
  await next();
  return sessionkstore.setup();
}
*/
//=================END DATA HANDLING /models/dbconnect.js=======================
