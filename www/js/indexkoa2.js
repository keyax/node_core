//  const modul = require('builtin-modules');
//  console.log(modul); // => []
//[ 'assert','buffer','child_process','cluster','console','constants','crypto','dgram','dns','domain','events',
//  'fs','http','https','module','net','os','path','process','punycode','querystring','readline','repl',
//  'stream','string_decoder','timers','tls','tty','url','util','v8','vm','zlib' ]
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const url = require('url');
const URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');
const util = require('util');
//const parser = require('body-parser');
const https = require('https');
const xhr2 = require('xhr2');

const sqlconnect = require('./sqlconnect.js');   // pool or single

///const express = require('express');
///const appx = express();
//const app = require('express')();
const http = require('http');
///const server  = http.createServer(appx);
//const serverh  = http.createServer(handler);
// 1*) get an instance of router
///const routerx = express.Router();

const Koa = require('koa');
const appk = new Koa();  // const app = Koa();
const Routerk = require('koa-router');
const routerk = new Routerk(); // new{prefix: '/'}
//const serverhk  = http.createServer(appk.callback());

const app = new Koa();  // const app = Koa();
const routek = require('koa-route');

const Mount = require('koa-mount');
const Static = require('koa-static');
//const Cors = require('koa2-cors');
const Parser = require('koa-body');
const Valid = require('koa-validate');
const Formis = require('koa-formidable');
const Multer = require('koa-multer');
//const Session = require('koa.session');
const Logger = require('koa-logger');


const socketio = require('socket.io');
///const sio = socketio(server);
//const sio = require('socket.io')(server);
//const sio = require('socket.io')(app);
//const sio = socketio(server, {origins:'kyx.dynu.com:* ws://kyx.dynu.com:*'});
//const sio = socketio(server, {origins:'domain.com:* http://domain.com:* http://www.domain.com:*'});
///const sio = socketio.listen(server);
///const sios = socketio(servers);

///const Promise = require('bluebird');
//const mongo = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;
//const Serverdb = require('mongodb').Server;
//const mongoose = require('mongoose');
//const formidable = require('formidable');

//var fetch = require('node-fetch');
var jwt = require('jsonwebtoken');

/*
//const appi = new Koa();  // const app = Koa();
const a = new Koa();
a.use(async function (ctx, next){
  await next();
  ctx.response.body = 'Hello friends!!';
});
appk.use(Mount('/helo', a));
routerk.get('/hi', function (ctx) {
// hello
  // ctx.router available
//const res = await ctx.response;
  console.log("ctx.params:"+ctx.response);
});
*/
var dbconn = require('./dbconnect.js');
//var conexion = null;
var resultado = "";
/*
//koa-route
const dbx = {
  tobi: { name: 'tobi', species: 'ferret' },
  loki: { name: 'loki', species: 'ferret' },
  jane: { name: 'jane', species: 'ferret' }
};
const pets = {
  list: (ctx) => {
    const names = Object.keys(dbx);
    ctx.body = 'pets: ' + names.join(', ');
  },
  show: (ctx, name) => {
    const pet = dbx[name];
    if (!pet) return ctx.throw(404, 'cannot find that pet');
    ctx.body = pet.name + ' is a ' + pet.species;
    return;
  },
  hi: async function (ctx, next) {
    await next();
    ctx.response.body = 'Hello';
  },
  listado: async function (ctx, next) {
    try {
         ctx.status = 200;
         ctx.set("Access-Control-Allow-Origin", "*");
         ctx.set("Access-Control-Allow-Credentials", "true");
         ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
         ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  //     ctx.set("Content-Type", "application/json");
         ctx.type="application/json";
//         ctx.flushHeaders();
         ctx.body = {"respuesta":"Hola amigos de Keyax"};  /// first step  >> who
    /*       const start = new Date();
           return next().then(() => {const ms = new Date() - start;
                          console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
                          console.log(`hi${JSON.stringify(ctx.response.body)}`);
            });
  */

  //        await next();
  //      ctx.state.rec = list(ctx, next);
    var dbconn = require('./dbconnect.js');
    let database = null;
    await dbconn.open()
      .then((db)=>{
          database = db;
          console.log("db: "+db);
          return db.collection('users')
      })
      .then((users)=>{
          return users.findOne({age: {$eq: 22}})
  //        return users.find({}).toArray(function(err, results){console.log(results);return results;}); // output all records
      })
      .then((resul)=>{//return result;
//          resujs = JSON.stringify(resul);
          resujs = resul;

  //      await next();
      ////  ctx.response.body = resul;
      ////  ctx.state.resul = resujs;
  //        console.log("then:"+JSON.stringify(result));
  //      setTimeout(function () {
          console.log("listado:xqr"+JSON.stringify(resujs)+"xqr");
  //      }, 500)
          database.close();
  //        ctx.body = resujs;
//          ctx.state.resul = resujs;
  //        resultado = resul;

        return resujs;
        })
      .catch((err)=>{
          console.error(err);
      })
 } catch (err) {
   ctx.body = { message: err.message }
   ctx.status = err.status || 500
 }
//ctx.body = JSON.stringify({ status: 200, body: `${resujs}` });
//ctx.status = 200;
await next();
ctx.state.dbs = resujs;
  } // end list()
};

app.use(Mount('/pets/hi', pets.hi));
app.use(routek.get('/peth', pets.hi))
app.use(routek.get('/pets/hello', pets.hi));
app.use(routek.get('/pets/pets', pets.list));
app.use(routek.get('/pets/pets/:name', pets.show));
app.use(routek.get('/pets/listado', pets.listado));

app.listen(9100);
console.log('listening on port 9100');
/*
routerk.use((ctx,next) => {
  ctx.body = {"respuesta":"Hola amigos de Keyax router use"};  // second step
    next();
});
*/
routerk.get('/mongos', Parser, async function (ctx, next){
//  ctx.flushHeaders();
 ctx.body = {"respuesta":"Hola amigos de Keyax router get"};
  //                                    ctx.response.type = 'xml';
  //                                    ctx.response.body = ctx.body;
                                      next();});
//(ctx => { ctx.body =  'Hello world Keyax';});
/*
dbconn.conect()
    .then(() =>  {conexion = dbconn.get();
                  console.log(`mongodb conexion: ${conexion}`);})
//    .then(() => routerk.get('/mong', mongoquery))
    .catch((e) => {
        console.error(e);
        // Always hard exit on a database connection error
//        process.exit(1);
    });
console.log(`mongodb2 conexion: ${conexion}`);
//dbconn.test();
*/

/*
// uses async arrow functions
app.use(async (ctx, next) => {
  try {
    await next() // next is now a function
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
})
*/
///////////////routerk.get("/mongo", pets.listado);

//routerk.post("/mongo", async (ctx, next) => {await next();ctx.body = pets.listado(ctx, next);});

routerk.post("/mongos", async (ctx, next) => {
//   (function(){  //scoping fn
//   })();  // end scoping fn

//try {
//    await next();
    ctx.body = {"respuesta mongo":"Hola amigos de Keyax "};  /// first step  >> who
/*       const start = new Date();
       return next().then(() => {const ms = new Date() - start;
                      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
                      console.log(`hi${JSON.stringify(ctx.response.body)}`);
        });
*/

async function list(ctx, next) {
  var dbconn = require('./dbconnect.js');
    let database = null;
//    yield next;
    await dbconn.open()
    .then((db)=>{
        database = db;
        return db.collection('users')
    })
    .then((users)=>{
        return users.findOne({age: {$eq: 22}})
//        return users.find({}).toArray(function(err, results){console.log(results);return results;}); // output all records
    })
    .then((resul)=>{//return result;
        resujs = JSON.stringify(resul);
  //      ctx.body = resujs;
//        console.log("then:"+JSON.stringify(result));
//      setTimeout(function () {
        console.log("xqr"+resujs+"xqr2");
//      }, 500)
        database.close();
        ctx.state.resul = resujs;
//        resultado = resul;
      return resujs;
      })
    .catch((err)=>{
        console.error(err);
    })
    await next();
   ctx.response.body = resujs;
}; // end list()
list(ctx, next);
console.log("state:"+ctx.state.resul);
  //    next();
  //    ctx.body = result;
/*          } catch (err) {
      ctx.body = { message: err.message }
      ctx.status = err.status || 500
    }*/

// runs in boot.js or what ever file your application starts with
// 4* apply the routes to our application  app.use('/', router);
//    app.use(function(err, req, res, next) {
//      res.status(err.status || 500);
//});

function insert(object){
    let database = null;
    dbconn.open()
    .then((db)=>{
        database = db;
        return db.collection('users')
    })
    .then((users)=>{
        return users.insert(object)
    })
    .then((result)=>{
        console.log(result);
        database.close();
    })
    .catch((err)=>{
        console.error(err)
    })
};
//insert({name: 'Gary Oblanka', age: 22});

/*
try {xqr = list(ctx, next);
     console.log("xqr1"+xqr);
     ctx.body = xqr;
     await next() // next is now a function
} catch (err) {
  ctx.body = { message: err.message }
  ctx.status = err.status || 500
}
*/

//while (xqr == null){ctx.body =JSON.stringify(result);};
///setTimeout(function () {
console.log("xqr2"+result+"xqr");
//  ctx.body=result;
//  ctx.res.end();
///}, 5000)
///var end = Date.now() + 5000
///while (Date.now() < end) ;
//console.log('imma let you finish but blocking the event loop is the best bug of all TIME')
/*
var conexion = dbconn.conect().then(cnx => {resolve(cnx);})
                     .catch((err) => {console.error(err);});
ctx.body = dbconn.finds(conexion).then((rest) => {console.log("rest"+JSON.stringify(rest));return rest;})
                //                  .then((rx) => {console.log("resix"+resix);})
                            //      .then((resix) => {ctx.body = JSON.stringify(resix);console.log('resx'+ctx.body);})
                                  .catch((err) => {console.error(err);});
console.log(`routed db connexion: ${conexion}`);
//console.log("MONGODBpost");*/

//next();
//};
});

routerk.post("/sqldb/:langs", async function(ctx, next) {


         console.log("ctx.request"+ JSON.stringify(ctx.request));
/*       ctx.status = 200;
         ctx.set("Access-Control-Allow-Origin", "*");
         ctx.set("Access-Control-Allow-Credentials", "true");
         ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
         ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//       ctx.set("Content-Type", "application/json");
         ctx.type="application/json";
         ctx.flushHeaders();*/
  ///////       ctx.body = {"respuesta":"Hola amigos de Keyax router post!!!"};  // third step
  //            const res = await ctx.routerk.body;   // ctx.routerk.body
/////              console.log("ctx.params:" + JSON.stringify(ctx.response));

// ling='%'+req.params.langs+'%';
// var ask =`SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE '%${ling}%'`;
var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE ?`,
                'values' :  ['%'+ctx.params.langs.substring(1)+'%'], 'timeout' : 40000 }; // '%_%'   40s
   console.log("sp?" + ctx.params.langs);
// var params = [req.params.langs];
//  console.log("sp?" + req.params.langs);
// const respo[rows, fields] = await sqlconn.execute(env_sql.options.sql)

  //             await next();
      sqlconnect.querypr(sqlopts)
            .then(rows => {console.log("rowssqlpre:"+JSON.stringify(ctx.body));
      //              ctx.flushHeaders();
                //    appk.context.db = rows;
                    ctx.send(rows);
                    console.log("rowssql:"+JSON.stringify(ctx.body));
              ctx.body = {"respuesta":"Hola amigos de Keyax nnnnxxxxxnnn"};  /// first step  >> who

          /*          // temporary data holder
                    const body = [];
                    // on every content chunk, push it to the data array
                    response.on('data', (chunk) => body.push(chunk));
                    // we are done, resolve promise with those joined chunks
                    response.on('end', () => resolve(body.join('')));
     */
              return rows;
      //        next();
            })
             .then((rows) => {ctx.body = rows;})
//                    console.log("rows:"+JSON.stringify(rows[0]));})
//     .then(JSON.stringify)
///     .then(console.log("rows*sql:"+ctx.body))
     .catch(err => function (err) {console.log("Promise Rejected");});
///console.log("rows******sql:"+JSON.stringify(ctx.body));
///////ctx.body = {"respuesta":"Hola amigos de Keyax nnnnxxxxxnnn"};  /// first step  >> who

/*    sqlconnect.queryp(sqlopts, function(err, rows, fields){
    var temp=JSON.stringify(rows);
    var manager = JSON.parse(temp)[0];
    console.log(rows);
    ctx.body = temp;
//   res.send(manager);
   });*/
   next();
});
/*
// uses async arrow functions
app.use(async (ctx, next) => {
  try {
    await next() // next is now a function
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
})
*/

// 3*) home page route (http://localhost:8080)
//router.get('/', function (req, res, next) {....});
/*
routerk.post('/xform', function (req, res, next) {
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

async function respond(next) {
  this.body = 'OK';
  await next;
};

async function process(next) {
  await next;
  await function (done) { setTimeout(done, 5000); };
  console.log('processed');
};

appk.use(require('koa-body')({ multipart: true }));
appk.use((ctx, next) => {
  try {
       ctx.status = 200;
       ctx.set("Access-Control-Allow-Origin", "*");
       ctx.set("Access-Control-Allow-Credentials", "true");
       ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
       ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     ctx.set("Content-Type", "application/json");
       ctx.type="application/json";
//       ctx.flushHeaders();
////     ctx.body = {"respuesta":"Hola amigos de Keyax"};  /// first step  >> who
  /*       const start = new Date();
         return next().then(() => {const ms = new Date() - start;
                        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
                        console.log(`hi${JSON.stringify(ctx.response.body)}`);
          });
*/

//        await next();
//      ctx.state.rec = list(ctx, next);
      } catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
      }
     next();
});
// response
/*
appk.use((ctx) => {
  //ctx.body = ctx.db;
console.log('业务逻辑处理'+JSON.stringify(ctx.state.resul));
});*/
appk.use(respond);
appk.use(process);
appk.use(routerk.routes());
appk.use(routerk.allowedMethods());
//appk
//  .use(routerk.routes())
//  .use(routerk.allowedMethods());


// Response
/////////////appk.use(ctx => { ctx.body =  'Hello world Keyax';});
/*    //  ctx.body.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers'); //Methods, Origin, Accept, Content-Type');
    //  ctx.body.set('Access-Control-Allow-Origin', '*');
    //     ctx.body = "Helloo!!!"; //"set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');";*/
/*
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
var Readable = require('stream').Readable
var s = new Readable
s.push('beep')    // the string you want
s.push(null)      // indicates end-of-file basically - the end of the stream
*/

/////                    apx.use("/", routerx);

// var htmls = require('./htmls.js');


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

///routerx.post("/sqldb/::langs", function(req, res) {
/*
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
  // send your xhr response here
} else {
  // send your normal response here
}
*/
/* ***********************
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Content-Type", "application/json");
//  res.setHeader("Content-Type", "text/html");
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
   res.send(manager);
   });
});
*************************  */
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




// app.use('/', router);
/*
// 2*) route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next();
});       */

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
function callback (req, res) {res = "HOyolanokati";

/*  if (parseInt(req.headers['content-length']) > 1375347) {
    res.end('to large')
  }
  res.end('done in full')*/
}



var serverk = http.createServer(appk.callback());
var siok = require('socket.io')(serverk);
siok.on('connection', function (socket){
    socket.emit('news', { hello: 'world baby' });
    socket.on('myevent', function (data) {
       console.log('data:'+data);
       console.log(`connected socket news FF!${JSON.stringify(data)}`);
    });
  });
////      socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
// you can pass the parameter in the command line. e.g. node static_server.js 3000
// var port = process.argv[2] || 9000;
var port = 9000;
serverk.listen(parseInt(`${port}`), (err) => {
  if (err) {return console.log('something bad happened', err)}
  console.log(`server is listening on port: ${port}`)
});
