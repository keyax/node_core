// dbconnect.js   myAwesomeDbModule.js

let connection = null;
var dburl = "mongodb://user:555777@mongo.kyx:27017/kyxtree?";
/*
var option = {
    db: { authSource: "kyxtree",
//      native_parser: false
      },
    server: {
      poolSize: 10,
      socketOptions: {
        connectTimeoutMS: 500
        }
        },
//    replSet: {},
//    mongos: {}
    };
*/
//console.log(url);
module.exports.connect = () => new Promise((resolve, reject) => {
  var dburl = "mongodb://user:555777@mongo.kyx:27017/kyxtree?";
  var mongo = require('mongodb');
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(dburl, function(err, dbs) {
        if (err) { reject(err); return; };
        resolve(dbs);
        connection = dbs;
    });
});

module.exports.get = () => {
    if(!connection) {
        throw new Error('Call connect first!');
    }
    return connection;
}
/*
module.exports.myapp = () => {
    if(!connection) {
        throw new Error('Call connect first!');
    }
var data = {};
//    const db = require('./myAwesomeDbModule');
data = db.get().find(...)... // I have excluded code here to keep the example  simple


    return data;
}
*/
