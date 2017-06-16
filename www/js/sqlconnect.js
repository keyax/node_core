var mysql = require('mysql');
var options = {
  host: "23.229.191.137",
  database: "lebady_kyx",
  user: "yones_kyx",
  password: "Euro5577"
  };
var sqlcon = mysql.createConnection(options);

module.exports.conect = () => {
   sqlcon.connect(function(err){
      if(err){
         console.log('Error connecting to Mysql Godaddy');
         return;
         }
    console.log('Connection established Mysql Godaddy');
});
}
module.exports.get = () => {
    if(!sqlcon) {
        throw new Error('Call connect first....!');
    }
    console.log(`db conexion: ${sqlcon}`);
    return sqlcon;
};

module.exports.query = (lngs) => {
//  var lngs = "spa";
  var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%${lngs}%'`;
  sqlcon.query(ask, function (err, results, fields) {
  //  if (err)  throw err;
    console.log('The solution is: ', results);
  })
};

module.exports.end = () => {
    if(!sqlcon) {
          throw new Error('Not connected, connect first....!');
  }
  console.log(`db conexion: ${sqlcon} closed`);
     sqlcon.end();
     return;
};
