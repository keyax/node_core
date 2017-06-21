var mysql = require('mysql');

var env_sql = {
    options: {
  //    connectTimeout: 60000; // default 10000 > 10s
  //    acquireTimeout: 30000, //30 secs
  //    minConnections: 1,
  //    connectionLimit: 50,
      host: "23.229.191.137",
      database: "lebady_kyx",
      user: "yones_kyx",
      password: "Euro5577"
      },
    port: 80
};

var options = {
  host: "23.229.191.137",
  database: "lebady_kyx",
  user: "yones_kyx",
  password: "Euro5577"
  }

/*
// Create connection pool
env_sql.pool = mysql.createPool(env_sql.options);
console.log("env_sql.pool" + env_sql.pool);
var query=function(sql,callback){
    env_sql.pool.getConnection(function(err,conn){
      //POOL ==> Error: connect ETIMEDOUT  in Nodejs Net
        if(err) console.log("POOL ==> " + err);
        else{
            conn.query(sql,function(qerr,vals,fields){
                //release connection
                conn.release();
                callback(qerr,vals,fields);
            });
        }
    });
};
module.exports=query;
*/
// Create single connection
var sqlcon = mysql.createConnection(env_sql.options);
var sqlconx = "";
var query = function(sql, callback) {
//    if(!env_sql.sqlconx) {env_sql.sqlconx = env_sql.sqlcon.connect();}
    if(!sqlconx) {
        sqlconx = sqlcon.connect(function(err){
         if(err) console.log("POOL ==> " + err);
         else{
         setInterval(function () { sqlcon.query('SELECT 1');}, 5000);
          sqlcon.query(sql,function(err, row, fields){
              callback(err, row, fields);
          })
/*          .on('err', function(err) {
              throw err;
          })
          .on('fields', function(fields) {
              console.log("fields:" + fields);
          })
          .on('row', function(row) {
              console.log("row: " + row.LEXIC);
          //    return row.LEXIC;
        })*/
        }  //else
  }); //connect
}  // if !sqlconx
};
module.exports=query;
