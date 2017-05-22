//[ 'assert','buffer','child_process','cluster','console','constants','crypto','dgram','dns','domain','events',
//  'fs','http','https','module','net','os','path','process','punycode','querystring','readline','repl',
//  'stream','string_decoder','timers','tls','tty','url','util','v8','vm','zlib' ]
//var modul = require('builtin-modules');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var url = require('url');
var URL = require('url').URL;
var util = require('util');
var express = require('express');
var app = express();
// 1*) get an instance of router
var router = express.Router()
var http = require('http');
var server  = http.createServer(app);
//var server  = require('http').createServer(app);
//???var serverh  = http.createServer(handler);
var socketio = require('socket.io');
var sio = socketio.listen(server);
//var sio = socketio(server);
//var sio = require('socket.io').listen(server);
var https = require('https');
/* var options = {
   key: fs.readFileSync('keys/kyx-key.pem'),
   cert: fs.readFileSync('keys/kyx-cert.pem')
   };
   var servers  = https.createServer(options, app);  */
var servers  = https.createServer(app);
var sios = socketio(servers);
var Promise = require('bluebird');
//var mongo = require('mongodb');
//var MongoClient = require('mongodb').MongoClient;
//var Serverdb = require('mongodb').Server;
var mongoose = require('mongoose');
var dbconn = require('./dbconnect.js');
//var dburl = "mongodb://user:555777@172.17.0.4:27017/kyxtree";
var conexion = null;
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
// maps file extention to MIME typere
//let mimeType = {
const mime = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.json': 'application/json',
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
  'furl' : 'application/x-www-form-urlencoded'
// is inefficient for sending large quantities of binary data or text containing non-ASCII characters
};

//console.log(modul);

// you can pass the parameter in the command line. e.g. node static_server.js 3000
var port = process.argv[2] || 8080;

function handler(req, res) {
    res.writeHead(200);
    res.end('Hello Http handler');
}

sio.on('connection', function (socket){
    socket.emit('news', { hello: 'world' });
    socket.on('myevent', function (data) {
    console.log('connected socket news!');
  });
});

/*
var Readable = require('stream').Readable
var s = new Readable
s.push('beep')    // the string you want
s.push(null)      // indicates end-of-file basically - the end of the stream
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

/* Creating file server */
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


// 2*) route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

// 3*) home page route (http://localhost:8080)
router.get('/', function (req, res) {
//  res.sendfile(__dirname + '/index.html');
//});
//var server = http.createServer(function (req, res) {
// The headers are stored in a JavaScript object, with the header strings as object keys.
     console.log(req.headers);  //   JSON.stringify(req.headers)

  // Website you wish to allow to connect
//  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
//  res.setHeader('Access-Control-Allow-Credentials', true);
//  console.log(`body html... ${xbody}`);
  res.writeHead(200, {  //only one time per page
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS,',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
//    "Content-Length": xbody.length,
//    "Set-Cookie": "type=ninja",
//    "X-Content-Type-Options": "nosniff",   // blocks style not text/css
    "Content-Type": "text/html; charset=utf-8"
  });

  var html1 = '<!DOCTYPE html>' + '<html>' + '<head>'
              + '<title>Keyax Multilingual Webserver</title>'
  //  Nodejs static server on port 8090 needs specify src="pix/linux.jpg"/
              + `<base href="http://${req.headers['host'].replace(':8080','')}:8090"  target="_self">`
  //                 + `<base href="http://${req.headers['host']}/"  target="_self">`
  //                 + '<link rel="icon" href="data:,">'
              + '<script type= "text/javascript" src="js/socket.io.js"></script>'
              + '<script>  var socket = io.connect("http://nodejs.kyx:8080"); socket.on("news", function (data) {console.log(data);'
              + 'socket.emit("myevent", { my: "data" });});</script>'
              + '<script>function viewsize(){document.getElementById("kyx").innerHTML = "Keyax Multilingual Insert DOM"}</script>'
              + '</head>' + '<body onload="viewsize()" onresize="viewsize()">'
              + '<p id="kyx" class="pipo">Hello World Keyax planet!</p>'
              + '<img id="px1" src="img/linux.jpg" alt="Tuxy" width="42" height="42" enctype="image/jpg" />'
              + '<div id="div1" class="div1"></div>'
  var htmlc = '</body>' + '</html>'
  let xbody= html1.concat(htmlc);
  res.write(`${html1}`);
  res.write(`${htmlc}`);
  res.write('<img id="px2" src="img/linux.jpg" alt="Tuxy" width="42" height="42" enctype="image/jpg" />');
  res.write('<script>var xx = document.getElementById("div1")\;xx.innerHTML += "<u>Keyax Multilingual Computers:</u><br>";</script>');
  res.write('<style>.pipo {color: orange; font-size: 5em;}</style>');
//  res.end();

});

router.get('/db', function (req, res, next) {

  res.writeHead(200, {  //only one time per page
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS,',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
//    "Content-Length": xbody.length,
//    "Set-Cookie": "type=ninja",
//    "X-Content-Type-Options": "nosniff",   // blocks style not text/css
    "Content-Type": "text/html; charset=utf-8"
  });
  var html1 = '<!DOCTYPE html>' + '<html>' + '<head>'
              + '<title>Keyax Multilingual Webserver</title>'
  //  Nodejs static server on port 8090 needs specify src="pix/linux.jpg"/
              + `<base href="http://${req.headers['host'].replace(':8080','')}:8090"  target="_self">`
  //                 + `<base href="http://${req.headers['host']}/"  target="_self">`
  //                 + '<link rel="icon" href="data:,">'
              + '<script type= "text/javascript" src="js/socket.io.js"></script>'
              + '<script>  var socket = io.connect("http://nodejs.kyx:8080"); socket.on("news", function (data) {console.log(data);'
              + 'socket.emit("myevent", { my: "data" });});</script>'
              + '<script>function viewsize(){document.getElementById("kyx").innerHTML = "Keyax Multilingual Insert DOM"}</script>'
              + '</head>' + '<body onload="viewsize()" onresize="viewsize()">'
              + '<p id="kyx" class="pipo">Hello World Keyax planet!</p>'
              + '<img id="px1" src="img/linux.jpg" alt="Tuxy" width="42" height="42" enctype="image/jpg" />'
              + '<div id="div1" class="div1"></div>'
  var htmlc = '</body>' + '</html>'
  let xbody= html1.concat(htmlc);

  res.write(`${html1}`);
  res.write(`${htmlc}`);
  res.write('<img id="px2" src="img/linux.jpg" alt="Tuxy" width="42" height="42" enctype="image/jpg" />');
  res.write('<script>var xx = document.getElementById("div1")\;xx.innerHTML += "<u>Keyax Multilingual Computers:</u><br>";</script>');
  res.write('<style>.pipo {color: orange; font-size: 5em;}</style>');

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
res.end();
});

// 4*) apply the routes to our application
//app.use('/', router);

// runs in boot.js or what ever file your application starts with
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

  // Start the application after the database connection is ready
    server.listen(parseInt(port));
    filer.listen(8090, function(){
    console.log(`Server is listening port ${port}   & fileserver 8090`);
    });
/*  app.listen = function() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
  };  */
/* var tlserver = https.createServer(options, function (req, res) {
   res.writeHead(200);
  res.end("https secure server: Hello world  \n");
  });
 tlserver.listen(443);  */
/* servers.listen(config.port, function() {
     console.log('Https App started');
 }); */
/* //same as above with express
  var sslserver = https.createServer(options, app).listen(config.port, function() {
      console.log('Https App started');
  }); */
