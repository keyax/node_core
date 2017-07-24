//  var modul = require('builtin-modules');
//  console.log(modul); // => []
//[ 'assert','buffer','child_process','cluster','console','constants','crypto','dgram','dns','domain','events',
//  'fs','http','https','module','net','os','path','process','punycode','querystring','readline','repl',
//  'stream','string_decoder','timers','tls','tty','url','util','v8','vm','zlib' ]
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var url = require('url');
var URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');
var util = require('util');
var parser = require('body-parser');
var xhr2 = require('xhr2');
//var fetch = require('node-fetch');
var jwt = require('jsonwebtoken');
var express = require('express');
var appx = express();
//var https = require('https');
var http = require('http');
var serverx  = http.createServer(appx);

var socketio = require('socket.io');
var siox = socketio.listen(serverx);
//var siox = socketio(serverx);
//var sio = require('socket.io')(server);
//var sio = require('socket.io')(app);
//var sio = socketio(server, {origins:'kyx.dynu.com:* ws://kyx.dynu.com:*'});
//var sio = socketio(server, {origins:'domain.com:* http://domain.com:* http://www.domain.com:*'});

// 1*) get an instance of router
var routerx = express.Router();
///var Promise = require('bluebird');
//var mongo = require('mongodb');
//var MongoClient = require('mongodb').MongoClient;
//var Serverdb = require('mongodb').Server;
//var mongoose = require('mongoose');
var formidable = require('formidable');

/*
appx.use(function(err, req, res, next) {
      res.status(err.status || 500);
});
*/

// 2*) route middleware that will happen on every request
routerx.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "Origin, Methods, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Content-Type", "application/json");
//  res.setHeader("Content-Type", "text/html; charset=utf-8");
    console.log("requs:" + req.method + req.url);
    next();
});

//routerx.get('/db', function (req, res, next) {});

routerx.post("/sqldb/::langs", function(req, res, next) {
/*
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
  // send your xhr response here
} else {
  // send your normal response here
}
*/
var sqlconnect = require('./sqlconnect.js');  // pool or single
// ling='%'+req.params.langs+'%';
// var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%${ling}%'`;
var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE ?`,
                'values' :  ['%'+req.params.langs+'%'], 'timeout' : 40000 }; // '%_%'   40s
// var params = [req.params.langs];
  console.log("sp?" + req.params.langs);
    sqlconnect.queryp(sqlopts, function(err, rows, fields){
    var temp=JSON.stringify(rows);
    var manager = JSON.parse(temp)[0];
    res.send(rows);
    next();
   });
});
/*
routerx.post('/xform', function (req, res, next) {
//  function processAllFieldsOfTheForm(req, res) {
      var form = new formidable.IncomingForm();

     form.parse(req, function (err, fields, files) {
      //Store the data from the fields in your data store.
     //The data store could be a file or database or any other store based
     //on your application.
        res.writeHead(201, {'content-type': 'text/plain'} );
        res.write('received the data:\n\n');
        res.end(util.inspect({ fields: fields, files: files
        }));
      });
//  }
});
*/

appx.set('superSecret', "keyaxsecretcode"); // secret variable

// use body parser so we can get info from POST and/or URL parameters
appx.use(parser.urlencoded({ extended: false }));
appx.use(parser.json());


// runs in boot.js or what ever file your application starts with
// 4*) apply the routes to our application  app.use('/', router);
appx.use('/', routerx);

// you can pass the parameter in the command line. e.g. node static_server.js 3000
var port = process.argv[2] || 9000;
serverx.listen(parseInt(`${port}`), function(){
console.log(`Server is listening port ${port}`);
});
siox.on('connection', function (socketo){
    socketo.emit('news', { hello: 'world baby' });
    socketo.on('myevent', function (data) {
       console.log(data);
       console.log(`connected socket news FF!${JSON.stringify(data)}`);
    });
  });
////      socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();



/*
// 2*) route middleware that will happen on every request
routerx.use(function(req, res, next) {
    // log each request to the console
  console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next();
});
*/
/*
router.post("/sqldb/::langs", function(req, res) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Content-Type", "application/json");
//  res.setHeader("Content-Type", "text/html");
var query = require('./sqlconnect.js');  // pool
//var sqlc = require('./sqlconnect.js'); //s
ling=req.params.langs;
var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%${ling}%'`;

    console.log("sp?" + req.params.langs);

    query(ask,function(err, rows, fields){



        var temp=JSON.stringify(rows);

        var manager = JSON.parse(temp)[0];

       res.send(rows);
     });
});
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

// 3*) home page route (http://localhost:8080)
/////routerx.get('/db', function (req, res, next) {});
///routerx.post("/sql/::langs", function(req, res) {
/*
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
  // send your xhr response here
} else {
  // send your normal response here
}
*/
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.setHeader("Access-Control-Allow-Headers", "*");
/* res.setHeader("Access-Control-Allow-Headers", "Methods, Origin, Accept, Content-Type");
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Content-Type", "application/json");
*/
/*
var sqlconnect = require('./sqlconnect.js');  // pool or single
// ling='%'+req.params.langs+'%';
// var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%${ling}%'`;
var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE ?`,
                'values' :  ['%'+req.params.langs+'%'], 'timeout' : 40000 }; // '%_%'   40s
// var params = [req.params.langs];
  console.log("sp?" + req.params.langs);
    sqlconnect.querys(sqlopts, function(err, rows, fields){
    var temp=JSON.stringify(rows);
    var manager = JSON.parse(temp)[0];

    res.setHeader("Access-Control-Allow-Headers", "Origin, Methods, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send("rows");


    res.send(rows);
*/
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//no    res.setHeader("Access-Control-Allow-Headers", "*");
//  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Origin, Accept, Content-Type");
//  res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//    res.setHeader("Content-Type", "application/json");
//    res.setHeader("Content-Type", "text/html");
/*let status = 200; //OK
let headers = {'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Content-Length', // , Authorization
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', //  , PUT, DELETE, PATCH
    'Content-Type': 'application/json',
//  'Content-Type': 'text/html; charset=utf-8',
//    'Set-Cookie': 'session=yones.lebady@gmail.com, user=kyxuser',
    'Content-Length': 'xbody.length'};
//  "X-Content-Type-Options": "nosniff",   // blocks style not text/css
    res.writeHead(status, headers);*/
//   });
// });

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


/*
var Koa = require('koa');
var Routerk = require('koa-router');
var Parser = require('koa-bodyparser');
var Cors = require('koa2-cors');
var Mount = require('koa-mount');
var Static = require('koa-static');
var Valid = require('koa-validate');
var Formis = require('koa-formidable');
var Multer = require('koa-multer');
var Session = require('koa.session');
var Logger = require('koa-logger');

var appk = new Koa();  // var app = Koa();
var routerk = new Routerk(); // new

var appi = new Koa();  // var app = Koa();
const a = new Koa();

a.use(async function (ctx, next){
  await next();
  ctx.response.body = 'Hello';
});

appk.use(Mount('/helo', a));

routerk.get('/hi', function (ctx) {
// hello
  // ctx.router available
//const res = await ctx.response;
  console.log("ctx.params:"+ctx.response);
});

routerk.get('/sqldb', function(ctx, next){ctx.body="Holitas del mar";
                                      ctx.response.type = 'xml';
                                      ctx.response.body = ctx.body;})
       .post("/sqldb/:langs", async function(ctx) {
const res = await ctx.routerk.body;
console.log("ctx.params:" + res);
/*
let url = new URL('https://example.com?foo=1&bar=2');
let params = new URLSearchParams(url.search.slice(1));

//Add a second foo parameter.
params.append('foo', 4);
//Query string is now: 'foo=1&bar=2&foo=4'
*/

/*
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
  // send your xhr response here
} else {
  // send your normal response here
}
*/
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.setHeader("Access-Control-Allow-Headers", "*");
///    res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type");
///    res.setHeader("Access-Control-Allow-Origin", "*");
///    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
///    res.setHeader("Content-Type", "application/json");*/
//  res.setHeader("Content-Type", "text/html");
/*  var sqlconnect = require('./sqlconnect.js');  // pool or single
// ling='%'+req.params.langs+'%';
// var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%${ling}%'`;
var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE ?`,
                'values' :  ['%'+'s'+'%'], 'timeout' : 40000 }; // '%_%'   40s
// var params = [req.params.langs];
//  console.log("sp?" + req.params.langs);
    sqlconnect.querys(sqlopts, function(err, rows, fields){
    var temp=JSON.stringify(rows);
    var manager = JSON.parse(temp)[0];
    console.log(manager);

//   res.send(manager);
   });
});

// Error 502 Bad Gateway appk.use before routerk
appk.use(routerk.routes())
    .use(routerk.allowedMethods());

appk.use((ctx, next) => {
       ctx.status = 200;
       ctx.set("Access-Control-Allow-Origin", "*");
       ctx.set("Access-Control-Allow-Credentials", "true");
       ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
       ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
       ctx.set("Content-Type", "application/json");
       ctx.flushHeaders();
       ctx.body = "Hola amigos de Keyax";
         const start = new Date();
         return next().then(() => {const ms = new Date() - start;
                        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
                        console.log(`${ctx.response.body}`);

          });
});
// Response
appk.use(ctx => { ctx.body =  'Hello world Keyax';});
/*    //  ctx.body.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers'); //Methods, Origin, Accept, Content-Type');
    //  ctx.body.set('Access-Control-Allow-Origin', '*');
    //     ctx.body = "Helloo!!!"; //"set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');";*/



/*
appk.use(Parser());
/*appk.use(ctx => {
  // the parsed body will store in this.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
});
appk.use(Cors({
           allowHeaders: ['Headears', 'Origin', 'Methods', 'Content-Type', 'Accept'], //'Authorization'
           origin: '*',
           allowMethods: ['GET', 'POST', 'OPTIONS']
             /*function(ctx) {console.log("ctx.req.body:" +ctx.request.body);
                //      if (ctx.url === '^/socket.io/') {console.log("ctx.url2:" +ctx.url);return '*';}
                      return '*';
                    },*/
//            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//            maxAge: 5,
//            credentials: false,
  //        }));


//appk
//  .use(routerk.routes())
//  .use(routerk.allowedMethods());


// Start the application after the database connection is ready
/*>>>>>  server.listen(parseInt(`${port}}`), function(){
  console.log(`Server is listening port ${port}`);
});  <<<<< */
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
router.get('/', function (ctx, next) {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());
*/

/*
var Readable = require('stream').Readable
var s = new Readable
s.push('beep')    // the string you want
s.push(null)      // indicates end-of-file basically - the end of the stream
*/

/////                    apx.use("/", routerx);

// var htmls = require('./htmls.js');

var dbconn = require('./dbconnect.js');
var conexion = null;

dbconn.test();

dbconn.conect()
    .then(() =>  {conexion = dbconn.get();
                  console.log(`mongodb conexion: ${conexion}`);})
    .then(() => routerx.get('/mongo', mongoquery))
    .catch((e) => {
        console.error(e);
        // Always hard exit on a database connection error
//        process.exit(1);
    });
console.log(`mongodb2 conexion: ${conexion}`);

function mongoquery(req, res, next) {
  console.log("MONGODBpre");
  var result = '{"matrix": [';
//  conexion = dbconn.get();
  conexion.collection("geo").find({}, function(err, docs)  {
            docs.each(function(err, doc) {
              if(doc) {
                result = result.concat(JSON.stringify(doc));
                }
              else {
                console.log("MONGODBniet");
        //        res.end();
                } //else
             }); //each(function..
             result = result + ' {"yo": "157"} ] }';
  //           console.log(eval(result));
             res.send(result);
//           res.redirect('back');
          })  //find
console.log(`routed db connexion: ${conexion}`);
console.log("MONGODBpost");
//  next();
};


////var sqlconnect = require('./sqlconnect.js');
//var sqlconex = sqlconnect.conect();
// sqlconex = sqlconnect.get();
///////var lings = "";
//sqlconn.qwry("spa");
/*
router.post('/login',function(req,res){
    var query = require('../modules/database');
    query("select * from managers where ManagerID =10001",function(err,vals,fields){
        var temp=JSON.stringify(vals);

        var manager = JSON.parse(temp)[0];

        if(req.body.password===manager.password){
           req.session.manager = manager;


           //You are redirecting user to home
           res.redirect('/home');

           //You should add 'return'
           return;
        }

        //This will only accessible if password is not match
        res.send('ID or password wrong!');
    });
});
*/

////////    var sqlconex = sqlconnect.get();
//    console.log("language:" + ling +":"+ Object.prototype.toString.call(sqlconex));
/////////    sqlconex.query(ling);
/////////    res.send("res");
//    console.log("xhr:" + res.xhr);
/*  if (req.xhr) {  // || req.headers.accept.indexOf('json') > -1) -c
    // send your xhr response here
//    var sqlconn = sqlconnect.conect();
    sqlconn.query(lang);
    console.log("xhr:"+ req.xhr);
  } else {
    // send your normal response here
    sqlconn.query(lang);
    console.log("normal");
  }*/
/////////  next();
///});





///router.use('/htm', htmls);
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


/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
/*
  var isAjaxRequest = req.xhr;
  var lang=req.params.lang;
   console.log("mysql :lang :" + lang );
///    var sqlconex = null;
    var sqlconn = require('./sqlconnect.js');
    sqlconn.conect();
    sqlconex = sqlconn.get();
    res = sqlconn.query(lang);
    console.log("result:" + isAjaxRequest);
*/
//    sqlconn.end();
/*let status = 200; //OK
let headers = {'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Content-Length',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Content-Type': 'text/html; charset=utf-8',
    'Set-Cookie': 'session=yones.lebady@gmail.com, user=kyxuser',
    'Content-Length': 'xbody.length'
  };*/
//  "X-Content-Type-Options": "nosniff",   // blocks style not text/css
//     res.writeHead(status, headers);
/*    res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");*/
////    res.setHeader("Content-Type", "text/html");
//    res.setHeader("Content-Type", "application/json");
/*xhr.setRequestHeader("Content-Type","application/json");
 xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
 //supported in new browsers...do JSONP based stuff in older browsers...figure out how
 xhr.setRequestHeader("Access-Control-Allow-Origin","http://geojsonlint.com/");
 xhr.setRequestHeader("Accept","application/json");
 xhr.send(JSON.stringify(data));
*/

//    res.send('<p>Thank you</p>');
//    res.redirect('back');
//    res.send(resp);
//    return resp;
//    next();

///    var xhrUpload = XMLHttpRequest.XMLHttpRequestUpload;
  //   form.parse(req, function (err, fields, files) {
      //Store the data from the fields in your data store.
     //The data store could be a file or database or any other store based
     //on your application.
  ////      res.writeHead(201, {'content-type': 'text/plain'} );
/////        res.write('received the data:\n\n'+ res);
  //      res.end(util.inspect(xhrUpload));
//     return res;
//      });
//});

//console.log(`req.headers>>>${JSON.stringify(req.headers, null, 2)}<<<`);
/*router.use('/db/', function(req, res) {
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
});*/

/*
//var httpk = require('http');
//var serverk = httpk.createServer(appk.callback());
//var siok = require('socket.io').listen(serverk);
var serverk = require('http').createServer(appk.callback()).listen(9500);
var siok = require('socket.io')(serverk);
siok.on('connection', function (socket){
    socket.emit('news', { hello: 'world baby' });
    socket.on('myevent', function (data) {
       console.log(data);
       console.log(`connected socket news FF!${JSON.stringify(data)}`);
    });
  });
////      socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
*/
