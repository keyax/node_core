// dbconnect.js   myAwesomeDbModule.js
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://user:555777@172.17.0.4:27017/kyxtree";
//var dburl = "mongodb://user:555777@mongo.kyx:27017/kyxtree?";
var conexion = null;
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
module.exports.conect = () => new Promise((resolve, reject) => {
  MongoClient.connect(dburl,  {native_parser:true}, function(err, dbs) {
        if (err) { reject(err); return; };
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
