// dbconnect.js   myAwesomeDbModule.js
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://user:555777@192.168.1.2:27017/kyxtree";
//var dburl = "mongodb://user:555777@mongo.kyx:27017/kyxtree?";
var conexion = null;
  
/*
the server/replset/mongos options are deprecated,
all their options are supported at the top level of the options object
[poolSize,ssl,sslValidate,sslCA,sslCert,sslKey,sslPass,autoReconnect,noDelay,keepAlive,
connectTimeoutMS,socketTimeoutMS,reconnectTries,reconnectInterval,ha,haInterval,replicaSet,
secondaryAcceptableLatencyMS,acceptableLatencyMS,connectWithNoPrimary,authSource,w,wtimeout,j,
forceServerObjectId,serializeFunctions,ignoreUndefined,raw,promoteLongs,bufferMaxEntries,
readPreference,pkFactory,promiseLibrary,readConcern,maxStalenessSeconds,loggerLevel,logger,
promoteValues,promoteBuffers,promoteLongs,domainsEnabled,keepAliveInitialDelay,checkServerIdentity,validateOptions]
*/

var options = {
//    db: {
      authSource: "kyxtree" //,
//>>      native_parser: true,
//      },
//    server: {
//>>      poolSize: 10,
///   socketOptions: {
//>>        connectTimeoutMS: 500
///   }
//        }
//    replSet: {},
//    mongos: {}
    };
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

module.exports.conect = () => new Promise((resolve, reject) => {
  MongoClient.connect(dburl,  options, function(err, dbs) {
        if (err) { console.log("error mongopen:" + err); reject(err); return; };
        resolve(dbs);
        conexion = dbs;
    });
});

module.exports.get = () => {
    if(!conexion) {
        throw new Error('Call connect first....!');
    }
    console.log(`db conexion: ${conexion}`);
    return conexion;
}

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
// runs in boot.js or what ever file your application starts with
dbconn.connect()
    .then(() => console.log('database connected'))
    .then(() => app())
    .catch((e) => {
        console.error(e);
        // Always hard exit on a database connection error
        process.exit(1);
    });
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
