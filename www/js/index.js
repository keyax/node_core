//[ 'assert','buffer','child_process','cluster','console','constants','crypto','dgram','dns','domain','events',
//  'fs','http','https','module','net','os','path','process','punycode','querystring','readline','repl',
//  'stream','string_decoder','timers','tls','tty','url','util','v8','vm','zlib' ]
//  var modul = require('builtin-modules');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var url = require('url');
var URL = require('url').URL;
var util = require('util');
var https = require('https');
var express = require('express');
var app = express();
//var app = require('express')();
var http = require('http');
var server  = http.createServer(app);
//var serverh  = http.createServer(handler);
var socketio = require('socket.io');
var sio = socketio(server);
//var sio = require('socket.io')(server);
//var sio = require('socket.io')(app);
//var sio = socketio(server, {origins:'kyx.dynu.com:* ws://kyx.dynu.com:*'});
//var sio = socketio(server, {origins:'domain.com:* http://domain.com:* http://www.domain.com:*'});
///var sio = socketio.listen(server);
///var sios = socketio(servers);

// 1*) get an instance of router
var router = express.Router();

var Promise = require('bluebird');
//var mongo = require('mongodb');
//var MongoClient = require('mongodb').MongoClient;
//var Serverdb = require('mongodb').Server;
//var mongoose = require('mongoose');

var htmls = require('./htmls.js');

var dbconn = require('./dbconnect.js');
var conexion = null;
// runs in boot.js or what ever file your application starts with
// 4*) apply the routes to our application  app.use('/', router);
//    app.use(function(err, req, res, next) {
//      res.status(err.status || 500);
//});

dbconn.conect()
    .then(() =>  {conexion = dbconn.get();
                  console.log(`1 db conexion: ${conexion}`);})
    .then(() => app.use('/', router))
    .catch((e) => {
        console.error(e);
        // Always hard exit on a database connection error
//        process.exit(1);
    });
console.log(`2 db conexion: ${conexion}`);

/*
var sqlconex = null;
var sqlconn = require('./sqlconnect.js');
sqlconn.conect();
sqlconex = sqlconn.get();
sqlconn.query();
sqlconn.end();
*/
/*    .then(() =>  {sqlconex = sqlconn.get();
              console.log(`3 db conexion: ${sqlconex}`);})
    .then(() => sqlconn.query())
    .catch((e) => {
        console.error(e);
    // Always hard exit on a database connection error
//        process.exit(1);
});*/
//console.log(`sql db conexion: ${sqlconex}`);

sio.on('connection', function (socket){
    socket.emit('news', { hello: 'world baby' });
    socket.on('myevent', function (data) {
       console.log(data);
       console.log(`connected socket news FF!${JSON.stringify(data)}`);
    });
  });
////      socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();

// you can pass the parameter in the command line. e.g. node static_server.js 3000
var port = process.argv[2] || 9000;

// Start the application after the database connection is ready
  server.listen(parseInt(`${port}}`), function(){
  console.log(`Server is listening port ${port}`);
  });
//  app.listen(parseInt(`${port}}`), function(){
//  console.log(`Server is listening on port ${port}`);
//  });
/* app.listen = function() {
   var server = http.createServer(this);
   return server.listen.apply(server, arguments);
   };  */
//var server = app.listen(9000);

/* var options = {
   key: fs.readFileSync('keys/kyx-key.pem'),
   cert: fs.readFileSync('keys/kyx-cert.pem')
   };
   var sserver = https.createServer(options, app);  */
/* var sserver = https.createServer(options, function (req, res) {
     res.writeHead(200);
     res.end("https secure server: Hello world  \n");
   });
   sserver.listen(443);  */
// var sserver = https.createServer(app);
/* sserver.listen(config.port, function() {console.log('Https App started'); }); */

/* //same as above with express
var sserver = https.createServer(options, app).listen(config.port, function() {
    console.log('Https App started');
}); */
// app.listen(443);

/*
var Readable = require('stream').Readable
var s = new Readable
s.push('beep')    // the string you want
s.push(null)      // indicates end-of-file basically - the end of the stream
*/

// maps file extention to MIME typere
//let mimeType = {
const mime = {
  '.html': 'text/html',
  '.css':  'text/css',
//'.js':   'text/javascript',  // obsolete
  '.js':   'application/javascript',
  '.json': 'application/json',  // utf-8 for API
  '.svg':  'image/svg+xml',
  '.eot':  'appliaction/vnd.ms-fontobject',
  '.ttf':  'aplication/font-sfnt',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.mp3':  'audio/mpeg',
  '.wav':  'audio/wav',
  '.pdf':  'application/pdf',
  '.doc':  'application/msword',
// form containing non-Ascii data, binary data, files...
  'form' : 'multipart/form-data',
// furl is inefficient for sending large quantities of binary data or text containing non-ASCII characters
  'furl' : 'application/x-www-form-urlencoded'
};
 /*
//Creating file server
var filer = http.createServer(function (reqf, resf){
  console.log(`${reqf.method} ${reqf.url}`); // GET /pix/linux.jpg
// parse URL
var parsedUrl = url.parse(reqf.url);
//  console.log(`parsedUrl:${parsedUrl}`); // parsedUrl:[object Object]
// extract URL path
let pathname = `.${parsedUrl.pathname}`;
  console.log(`pathname: ${pathname}`); // pathname: ./pix/linux.jpg
// based on the URL path, extract the file extention. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
//  var pathname = './linux.jpg';
// read file from file system
  fs.readFile(pathname, function(err, data){
       if(err){
         resf.statusCode = 500;
         resf.end(`Error getting the file: ${err}.`);
       } else {
         // if the file is found, set Content-type and send data
         resf.setHeader('Content-type', mime[ext] || 'text/plain' );
         resf.end(data);
       }
     });
})
filer.listen(9100, function(){
console.log(`File Server is listening on port 9100`);
});
*/

// app.use('/', router);
/*
// 2*) route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next();
});       */
router.use('/htm', htmls);
//router.use('/', './index.html');
/*router.get('/htx', function (req, res, next) {
  let status = 200; //OK
  let headers = {'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Content-Length',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'session=yones.lebady@gmail.com, user=kyxuser',
      'Content-Length': 'xbody.length'};
  //  "X-Content-Type-Options": "nosniff",   // blocks style not text/css
  res.writeHead(status, headers);
  res.sendFile(path.join(__dirname+'/index.html'));
next();
});*/
// 3*) home page route (http://localhost:8080)
//router.get('/', function (req, res, next) {....});

//console.log(`req.headers>>>${JSON.stringify(req.headers, null, 2)}<<<`);
/*
console.log("MONGODBpre");
  conexion = dbconn.get();
  conexion.collection("geo").find({}, function(err, docs)  {
            docs.each(function(err, doc) {
              if(doc) {
                console.log(doc);
                }
              else {
                console.log("MONGODBniet");
                res.end();
                } //else
             }); //each(function...
          })  //find(
console.log(`routed db connexion: ${conexion}`);
console.log("MONGODBpost");
*/
/*
var mysql = require('mysql');
var sqlcon = mysql.createConnection({
  host: "23.229.191.137",
  database: "lebady_kyx",
  user: "yones_kyx",
  password: "Euro5577"
  });
sqlcon.connect(function(err){
  if(err){
    console.log('Error connecting to Mysql Godaddy');
    return;
    }
    console.log('Connection established Mysql Godaddy');
});
var lngs = "";
var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%${lngs}%'`;
sqlcon.query(ask, function (err, results, fields) {
//  if (err)  throw err;
  console.log('The solution is: ', results);
});

sqlcon.end();
*/
//});
