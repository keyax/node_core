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

// const sqlconnect = require('./sqlconnect.js');   // pool or single

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
const convert = require('koa-convert');
// ---------- override app.use method ----------
const _use = appk.use
appk.use = x => _use.call(appk, convert(x))
// ---------- end ----------

const sessionk = require('koa-session');
const sessionkstore = require('koa-session-store');
const sessionkmongo = require('koa-session-mongo');
const sessionkmongoose = require('koa-session-mongoose');

const Routerk = require('koa-router');
const routerk = new Routerk(); // new{prefix: '/'}
//const serverhk  = http.createServer(appk.callback());
const abb = require('async-busboy');
var progress = require('progress-stream');
const app = new Koa();  // const app = Koa();
const routek = require('koa-route');
const Mount = require('koa-mount');
const Static = require('koa-static');
//const Cors = require('koa2-cors');
const Parser = require('koa-body');
const Valid = require('koa-validate');
var Formis = require('koa-formidable');
const Multer = require('koa-multer');
//const Session = require('koa.session');
const Logger = require('koa-logger');
const respond = require('koa-respond');
const send = require('koa-send');

const koasocket = require('koa-socket');
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
const formidable = require('formidable');

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
//var dbconn = require('./dbconnect.js');
//var conexion = null;
var resultado = "";

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
  dbc: async function (ctx, next) {
    try {
  var dbconn = require('./dbconnect.js');
  let database = null;
  await dbconn.open()
    .then((db)=>{
        database = db;
        console.log("db: "+stringify(db));
        return db; //.collection('users');
    })
    .catch((err)=>{
        console.error(err);
    });
    ctx.body = await resujs;
} catch (err) {
 ctx.body = { message: err.message }
 ctx.status = err.status || 500
};
},
  listados: async function (ctx, next) {
    try {
         ctx.status = 200;
         ctx.set("Access-Control-Allow-Origin", "*");
         ctx.set("Access-Control-Allow-Credentials", "true");
         ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
         ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  //     ctx.set("Content-Type", "application/json");
         ctx.type="application/json";
         ctx.flushHeaders();
      ////   ctx.body = {"respuesta":"Hola amigos de Keyax"};  /// first step  >> who
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
          return db.collection('users');
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
          console.log("listad:xqr"+JSON.stringify(resujs)+"xqr");
  //      }, 500)
          database.close();
          ctx.body = resujs;
//          ctx.state.resul = resujs;
  //        resultado = resul;

        return resujs;
        })
      .catch((err)=>{
          console.error(err);
      });
      ctx.body = await resujs;
 } catch (err) {
   ctx.body = { message: err.message }
   ctx.status = err.status || 500
 };
//ctx.body = JSON.stringify({ status: 200, body: `${resujs}` });
//ctx.status = 200;
await next();
ctx.body = resujs;
//ctx.state.dbs = resujs;
  }, // end listados()

sqlang: async function (ctx, langs, next) {
  try {
       ctx.status = 200;
       ctx.set("Access-Control-Allow-Origin", "*");
       ctx.set("Access-Control-Allow-Credentials", "true");
       ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
       ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     ctx.set("Content-Type", "application/json");
       ctx.type="application/json";
       ctx.flushHeaders();

console.log("ctx.response"+ JSON.stringify(ctx.request.url));
//ctx.body = {"respuesta sqlang":"Hola amigos de Keyax"};  /// first step  >> who
const sqlconnect = require('./sqlconnect.js');   // pool or single
//  var dbconn = require('./dbconnect.js');
var ling = ctx.request.url.slice(ctx.request.url.lastIndexOf('/')+1);
console.log('%'+ling+'%');
  var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE ?`,
                  'values' :  ['%'+langs+'%'], 'timeout' : 40000 }; // '%_%'   40s
  // const respo[rows, fields] = await sqlconn.execute(env_sql.options.sql)
ctx.body = await sqlconnect.querypr(sqlopts)
                 .then(rows => {//console.log("rowssqlpre:"+rows);  //undefined
                    //////  ctx.body = rows; //JSON.stringify(rows);
              //      ctx.send(rows);
                      console.log("rowssql:"+JSON.stringify(ctx.body));   //OOOOOOOKKKKKK
            /*          // temporary data holder
                      const body = [];
                      // on every content chunk, push it to the data array
                      response.on('data', (chunk) => body.push(chunk));
                      // we are done, resolve promise with those joined chunks
                      response.on('end', () => resolve(body.join('')));
       */
    //            return ctx;
                return rows;
              //  next();
              })
//             .then((ctx) => {ctx.body = rows;})
      // .then(JSON.stringify)
           .catch(err => function (err) {console.log("Promise Rejected");});
  /*    sqlconnect.queryp(sqlopts, function(err, rows, fields){
      var temp=JSON.stringify(rows);
      var manager = JSON.parse(temp)[0];
      console.log(rows);
      ctx.body = temp;
  //   res.send(manager);
     });*/
// await next();

} catch (err) {
  ctx.body = { message: err.message }
  ctx.status = err.status || 500
};

  }  // end sqlang()
};  // end pets

var uploadm = Multer({dest: '/img'});
app.use(Mount('/pets/hi', pets.hi));
app.use(routek.get('/pets/hello', pets.hi));
app.use(routek.get('/pets/pets', pets.list));
app.use(routek.get('/pets/pets/:name', pets.show));
app.use(routek.get('/pets/listad', pets.listados));
app.use(routek.get('/pets/sqlang/:langs', pets.sqlang));
app.use(routek.post('/pets/uploadm', uploadm.single('avatar')));

app.listen(9100);
console.log('listening on port 9100');
/*
routerk.use((ctx,next) => {
//  ctx.body = {"respuesta":"Hola amigos de Keyax router use"};  // second step
    next();
});
*/
///routerk.use("/uploads", Formis());

routerk.post("/uploadf", async function (ctx, next) {
 try {
  //  var form = await Formis.parse(this);
   var form = new formidable.IncomingForm();

const {fields, files} = form.parse(ctx.req, function(err, fields, files) {
//      if (err) return done(err)
//      done(null,
        return { fields: fields, files: files }//)
    });
console.log('fields: '+fields);
/*      form.addListener('progress', function(bytesReceived, bytesExpected){
        //Socket.io interaction here??
//        io.sockets.on('connection', function (socket) {
          sockets.emit('uploadProgress', ((bytesReceived * 100)/bytesExpected));
//         });


      });*/
      //form.uploadDir = __dirname + '/../img/';
      form.uploadDir = path.join(__dirname,'/../img');
      console.log("destinationDir: "+form);
//      form.on('field', )
      form.on('file', function(field, file) {
         //rename the incoming file to the file's name
         fs.rename(file.path, form.uploadDir + "/" + file.name);
         console.log("destination: "+form.uploadDir + "/" + file.name);
      });
       form.on('progress' , function (bytesReceived , bytesExpected) {
    console.log('received: ' + bytesReceived);
/////  socket.emit('uploadProgress', (bytesReceived * 100) / bytesExpected);
  //  io.sockets.in('sessionId').emit('uploadProgress', (bytesReceived * 100) / bytesExpected);

  });

var result = await Formis.parse(this);
console.log('uploadf: '+result);

  //socket.io code
//  io.sockets.on('connection', function (socket) {
/*      socket.on('upload', function (msg) {
          socket.broadcast.emit('progress', bytesReceived);
      });*/
//    });

//  console.log(fields.filelist.length);
//  console.log(util.inspect({fields}));
  ctx.body = {resp: "formidable!!"};

} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};
});


routerk.post("/uploads", async function (ctx, next) {
 try {
const {fields} = await abb(ctx.req, {
    onFile: function(fieldname, file, filename, encoding, mimetype) {
            //uploadFilesToS3(file);
          //  console.log("ctx.req:"+ctx.request.get);
      ///      console.log("filesinctx:"+ctx.req.files);
            console.log("abb:fieldname "+fieldname+" file** "+JSON.stringify(file)+"** filename "+filename+" encoding "+encoding+" mime "+mimetype);
            var upfile = `img/${filename}`;
            fs.closeSync(fs.openSync(upfile, 'w'));
/*            fs.open(upfile,'w', function(err,fd){
                  if(err)console.log('cant open: '+upfile+err);//handle error
                      console.log('open: '+upfile);
                  fs.close(fd, function(err){
                    if(err)console.log('cant close: '+upfile+err);//handle error
                      console.log('close: '+upfile);
              });
            });*/
//        var stat = fs.statSync(upfile);
          var strm = progress({
                  length: filesize, //stat.size,
                  time: 1 // ms
            });
            wstream = fs.createWriteStream(upfile);
            file.pipe(strm).pipe(wstream);

            strm.on('progress', function(progress) {
                console.log('progreso:',progress);
                /*
                {
                    percentage: 9.05,
                    transferred: 949624,
                    length: 10485760,
                    remaining: 9536136,
                    eta: 42,
                    runtime: 3,
                    delta: 295396,
                    speed: 949624
                }
                */
            });
          }  // onFile:  end
    }); // await abb(ctx.req,
/*
function checkFile(files) {var filename = files[0].filename;
           console.log("filename+check:"+filename);
           if(path.extname(filename) !== 'jpg'){
          var err = new Error('not jpg image');
          err.status = 400;
          return err;
          }
        }; // end checkFile()
const {files, fields} = await abb(ctx.req, {});
checkFile(files);
console.log(util.inspect({files, fields}));
*/

//  console.log("filelist:"+fields.filelist);
  ctx.body = {resp: "eureka!!"};

} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};

});

routerk.get("/sqldb/:langs", async function (ctx, next) {
  try {
       ctx.status = 200;
       ctx.set("Access-Control-Allow-Origin", "*");
       ctx.set("Access-Control-Allow-Credentials", "true");
       ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
       ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     ctx.set("Content-Type", "application/json");
       ctx.type="application/json";
       ctx.flushHeaders();
       var ling = ctx.params.langs;
//     var ling = ctx.request.url.slice(ctx.request.url.lastIndexOf('/')+1);
       console.log('%'+ling+'%');
//  var dbconn = require('./dbconnect.js');
  const sqlconnect = require('./sqlconnect.js');   // pool or single
  var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE ?`,
                 'values' :  ['%'+ling+'%'], 'timeout' : 40000 }; // '%_%'   40s
                  console.log("ctx.response"+ JSON.stringify(ctx.request.url));
  // const respo[rows, fields] = await sqlconn.execute(env_sql.options.sql)
//      await next();
  ctx.body = await sqlconnect.querypr(sqlopts)
              .then(rows => {//console.log("rowssqlpre:"+rows);  //undefined
            //          ctx.body = rows; //JSON.stringify(rows);
              //      ctx.send(rows);
                      console.log("rowssql:"+JSON.stringify(rows));   //OOOOOOOKKKKKK
            /*          // temporary data holder
                      const body = [];
                      // on every content chunk, push it to the data array
                      response.on('data', (chunk) => body.push(chunk));
                      // we are done, resolve promise with those joined chunks
                      response.on('end', () => resolve(body.join('')));
       */
    //            return ctx;
                return rows;
              //  next();
              })
//             .then((ctx) => {ctx.body = rows;})
//       .then(JSON.stringify)
//       .then(rowx => function (rowx) {ctx.body = rowx; console.log("rows*sql:"+ctx.body);})
       .catch(err => function (err) {console.log("Promise Rejected");});
  /*    sqlconnect.queryp(sqlopts, function(err, rows, fields){
      var temp=JSON.stringify(rows);
      var manager = JSON.parse(temp)[0];
      console.log(rows);
      ctx.body = temp;
  //   res.send(manager);
     });*/
// await next();

} catch (err) {
  ctx.body = { message: err.message }
  ctx.status = err.status || 500
};

});  // end sqlang()




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

/*
async function respond(next) {
  this.body = 'OK';
  await next;
};

async function process(next) {
  await next;
  await function (done) { setTimeout(done, 5000); };
  console.log('processed');
};
*/

//appk
//    .use(process)
/////////appk.use(respond);
////////appk.use(require('koa-body')({ multipart: true }));
/*appk.use(function*(next){  //loop
  yield next;
  console.log('after response');
});
*/
/*
appk.use((ctx, next) => {
  try {
       ctx.status = 200;
       ctx.set("Access-Control-Allow-Origin", "*");
       ctx.set("Access-Control-Allow-Credentials", "true");
       ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
       ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  //     ctx.set("Content-Type", "application/json");
       ctx.type="application/json";
  //     ctx.flushHeaders();
       ctx.body = {"respuesta2":"Hola amigos de Keyax"};  /// first step  >> who
*/
  /*       const start = new Date();
         return next().then(() => {const ms = new Date() - start;
                        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
                        console.log(`hi${JSON.stringify(ctx.response.body)}`);
          });
*/

//        await next();
//      ctx.state.rec = list(ctx, next);
/*      } catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
      }
     next();
});
*/
// response
/*
appk.use((ctx) => {
  //ctx.body = ctx.db;
console.log('业务逻辑处理'+JSON.stringify(ctx.state.resul));
});*/
//appk.use(Parser());
//appk.use(Formis());
//appk.use(async function (ctx) {ctx.body = await ctx.request.body;});
appk.keys = ["keyax57secretkey"];

appk.use(sessionkstore(
  {store: sessionkmongo.create({
//  db: kyxtree", //"mongodb://user:555777@192.168.1.2:27017/kyxtree", //pets.dbc, // sessions,
   url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions", //pets.dbc, // sessions,
//   db: "kyxtree",  //pets.dbc,
//   collection: "sessions",
//   username: "yones",
//   password: "555777",
   expires: 60*60*1})
 }
// ,appk
));
appk.use((ctx) => {ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(ctx.session.username));});
//appk.use((ctx) => {ctx.cookies.set('sessiond', 123456); ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(x = ctx.cookies.get()));});
//appk.use(sessionk(appk));
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

function callback (req, res) {res = "HOyolanokati";

/*  if (parseInt(req.headers['content-length']) > 1375347) {
    res.end('to large')
  }
  res.end('done in full')*/
}

var serverk = http.createServer(appk.callback());// callback for http.createServer or express.app

// you can pass the parameter in the command line. e.g. node static_server.js 3000
// var port = process.argv[2] || 9000;
var port = 9000;
var filesize = 0;
var serverkio = serverk.listen(parseInt(`${port}`), (err) => {
  if (err) {return console.log('something bad happened', err)}
  console.log(`server is listening on port: ${port}`)
});

var siok = require('socket.io')(serverkio);
siok.on('connection', function (socket){
    socket.emit('news', { hello: 'world baby'+socket.id });
    socket.on('myevent', function (data) {
       console.log('data:'+data);
       console.log(`connected socket news FF!${JSON.stringify(data)}`);
    });
     socket.emit('news',socket.id);
     socket.on('upload', function (msg) {filesize=msg; console.log("msg:",msg);
//         socket.broadcast.emit('progress', bytesReceived);
     });

  });
////      socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
