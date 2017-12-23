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
var sqlconx = null;
var query = function(sql, callback) {
    if(!env_sql.sqlcon) {env_sql.sqlcon = mysql.createConnection(env_sql.options);}
    if(!env_sql.sqlconx) {env_sql.sqlconx.connect(function(err, conn){
         if(err) console.log("POOL ==> " + err);
         else{
          conn.query(sql,function(qerr,vals,fields){
              //release connection
          //    conn.release();
              callback(qerr,vals,fields);
          })
          .on('err', function(err) {
              throw err;
          })
          .on('fields', function(fields) {
              console.log("fields:" + fields);
          })
          .on('row', function(row) {
              console.log("row: " + row.LEXIC);
          //    return row.LEXIC;
          })
      }

    })
};
/*
//        throw new Error('Call connect first....!');
//    console.log(`db conexion get: ${sqlcon}`);
    query(sql,function(qerr, row, fields){
       //   if (err) throw err;
      for (var i in row) {
          console.log('ROW: ', row[i]);
          }
      callback(qerr, row, fields);
    })
    .on('err', function(err) {
        throw err;
    })
    .on('fields', function(fields) {
        console.log("fields:" + fields);
    })
    .on('row', function(row) {
        console.log("row: " + row.LEXIC);
    //    return row.LEXIC;
    })
};

module.exports=query;
*/
/*

console.log("env_sql_conx" + env_sql_conx);
var querys=function(sql,callback){
    if(!env_sql_conx) {
       env_sql_conx.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
       });};
      query(sql,function(qerr, vals,fields){
        //   if (err) throw err;
          for (var i in row) {
                console.log('ROW: ', row[i]);
            }
        callback(qerr,vals,fields);
      });
      };
*/
/*
  con.connect(function(err) {
       if (err) throw err;
       console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
      });
  });
module.exports=querys;
*/
/*

var ling = "spa";



module.exports.conect = function() {
   sqlcon.connect(function(err){
      if(err){ // throw err
         console.log('Error connecting to Mysql Godaddy'+err);
         return;
         }
    console.log('Connection established Mysql Godaddy');

//  Error: Connection lost: The server closed the connection.
//  events.js:182 throw er; // Unhandled 'error' event
    setInterval(function () { sqlcon.query('SELECT 1');}, 5000);
  });
};
module.exports.get = function() {
    if(!sqlcon) {conect();
        throw new Error('Call connect first....!');
    }
    console.log(`db conexion get: ${sqlcon}`);
    return sqlcon;
};
*/
/*
function insertData(name,id) {
  connection.query('INSERT INTO members (name, id) VALUES (?, ?)', [name,id], function(err,result) {
	  if(err) throw err
  });
}
*/
/*
var query=function(sql,callback){
    pool.getConnection(function(err,conn){
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
/*
module.exports.query = function(sql, callback) {

 ling = "sp";
//  sqlcons = sqlconnect.get();
 var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE "%${ling}%"`;
//   var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%sp%'`;
  sqlcon.
  sqlcon.query(sql, function (err, row, fields) {
    //   if (err) throw err;
      for (var i in row) {
            console.log('ROW: ', row[i]);
        }
    //    return row;

//  console.log('The solution is: ' + row);
  })
  .on('err', function(err) {
      throw err;
  })
  .on('fields', function(fields) {
      console.log("fields:" + fields);
  })
  .on('row', function(row) {
      console.log("row: " + row.LEXIC);
  //    return row.LEXIC;
  })
};

module.exports.end = function() {
    if(!sqlcon) {
          throw new Error('Not connected, connect first....!');
  }
  console.log(`db conexion: ${sqlcon} closed`);
     sqlcon.end();
     return;
};
*/
/*
sqlcon.on('error', function(err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR'
});
*/
