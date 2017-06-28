var mysql = require('mysql');

// Create connection pool
var env_sql = {
    options: {// timeout: 40000, // 40s
      connectTimeout: 60000, // default 10000 > 10s
      acquireTimeout: 30000, //30 secs
      minConnections: 1,
      connectionLimit: 50,
      host: "23.229.191.137",
      database: "lebady_kyx",
      user: "yones_kyx",
      password: "Euro5577",
//    nestTables: true,  // [{Table1:{fieldA: '',fieldB: ''}, {Table2:{fieldA: '',fieldB: ''}]
//    nestTables: "_",  // [{table1_fieldA: '...', table1_fieldB: '...', table2_fieldA: '...', table2_fieldB: '...',  }, ...]
//    typeCast: false, // don't cast data types to native javascript types
//    typeCast: function (field, next) {if (field.type == 'TINY' && field.length == 1) {
//                                          return (field.string() == '1'); } // 1 = true, 0 = false
//                                      return next(); },
//    sql: ""
      },
    port: 80
};

env_sql.pool = mysql.createPool(env_sql.options);
console.log("env_sql.pool" + env_sql.pool);
exports.queryp=function(sqlopt, callback){
    env_sql.pool.getConnection(function(err,conn){
      //POOL ==> Error: connect ETIMEDOUT  in Nodejs Net
        if(err) {console.log("Error POOL connecting to Mysql Godaddy: " + err);return;}
        else{
            conn.query(sqlopt, function(qerr,vals,fields){
                console.log('Pool Connection established Mysql Godaddy');
                conn.release();  //release connection
                callback(qerr,vals,fields);
            });
        }
    });
};

// Create single connection
var options = {
  host: "23.229.191.137",
  database: "lebady_kyx",
  user: "yones_kyx",
  password: "Euro5577"
  }

var sqlcon = "";  // if set inside exports => Error: connect ETIMEDOUT
var retRow = "";  // event driven var
exports.querys = function(sqlopt, callback){
    if(!sqlcon) {sqlcon = mysql.createConnection(options);
          //     if(err){throw new Error("Can't create connection!");return;};
                };
    if(sqlcon.state === 'disconnected'){
//     return respond(null, { status: 'fail', message: 'server down'});
       sqlcon.connect(function(err){
          if(err){console.log('Error single connecting to Mysql Godaddy'+err);return;};
          console.log('Single Connection established Mysql Godaddy');
//        On reload page => Error: Connection lost: The server closed the connection.
//        events.js:182 throw er; // Unhandled 'error' event
          });
          setInterval(function () { sqlcon.query('SELECT 1');}, 5000);
          console.log(`db conexion get: ${sqlcon}`);
    };
// callback driven driver
    sqlcon.query(sqlopt, function(err, rows, fields){
          callback(err, rows, fields);
        });
}; // end exports.querys

/* // event driven driver
    sqlcon.query(sql)
          .on('err', function(err) {
              throw err;
            })
          .on('fields', function(fields) {
              console.log("fields:" + fields);
            })
          .on('result', function(row) {
                console.log("row: " + row.LEXIC);
                processRow(row);
                console.log("onres:" + retRow);
                return row.LEXIC;
             })
           .on('end', function() {
              // all rows have been received
              //sqlcon.end();  //close connection
             });
      function processRow(rowx){
        sqlcon.pause();
        retRow = rowx;
        sqlcon.resume();
      };
}; // end exports.querys
*/
