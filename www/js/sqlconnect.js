var mysql = require('mysql');
var options = {
  host: "23.229.191.137",
  database: "lebady_kyx",
  user: "yones_kyx",
  password: "Euro5577"
  };
var sqlcon = mysql.createConnection(options);
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
    if(!sqlcon) {
        throw new Error('Call connect first....!');
    }
    console.log(`db conexion get: ${sqlcon}`);
    return sqlcon;
};

module.exports.query = function(ling, sqlcon) {
 //ling = "sp";
//  sqlcons = sqlconnect.get();
  var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%${ling}%'`;
  sqlcon.query(ask, function (err, row, fields) {
    //   if (err) throw err;
      for (var i in row) {
            console.log('ROW: ', row[i]);
        }
//  console.log('The solution is: ' + row);
  })
  .on('err', function(err) {
      throw err;
  })
  .on('fields', function(fields) {
      console.log(fields);
  })
  .on('row', function(row) {
      console.log(row);
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
/*
sqlcon.on('error', function(err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR'
});
*/
