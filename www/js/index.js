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
const co = require("co");
const Koa = require('koa');
const appk = new Koa();  // const app = Koa();
appk.proxy = true;  // koa passport trust proxy
//const serverhk  = http.createServer(appk.callback());
//koa deprecated Support for generators will be removed in v3.
const convert = require('koa-convert');
// ---------- override app.use method ----------
const _use = appk.use
appk.use = x => _use.call(appk, convert(x))
// ---------- end ----------
const Cookies = require('cookies');
const cookiek = require('koa-cookie'); // only parser
//var cookie = cookiek();
//const Session = require('koa.session');
const koasession = require('koa-session');
const sessionkstore = require('koa-session-store');
const sessionkmongo = require('koa-session-mongo');
const mongoose = require('mongoose');
const sessionkmongoose = require('koa-session-mongoose');
const dbUrl = "mongodb://user:555777@192.168.1.2:27017/kyxtree";
const mongooseConn = mongoose.connection.openUri(dbUrl);
//mongoose.connect(dburl);
//mongoose.createConnection(dbUrl); // Db.prototype.authenticate method will no longer be available

const Routerk = require('koa-router');
const routerk = new Routerk(); // new{prefix: '/'}
const abb = require('async-busboy');
const auth = require('./auth.js');
const passport = require('koa-passport');
//auth(passport);
const local = require('passport-local').Strategy;
const facebook = require('passport-facebook').Strategy;
const twitter = require('passport-twitter').Strategy;
const google = require('passport-google-auth').Strategy;
const jwt = require('passport-jwt').Strategy;

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
const Logger = require('koa-logger');
const respond = require('koa-respond');
const send = require('koa-send');

const KSsession = require('koa-socket-session');
const KSIO = require('koa-socket.io');
const ksio = new KSIO({namespace: '/'});
const IO = require('koa-socket');
const io = new IO();  //({namespace: 'kyx', hidden: true});

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

const formidable = require('formidable');

//var fetch = require('node-fetch');
var jwt0 = require('jsonwebtoken');

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


// koa-session-store + koa-session-mongoose
appk.keys = ["keyax57secretos"];
const CONFIGS = {
    name: 'kyx:sesgoose',    // cookie name
    secret: "mysecretcode", //koa2-session-store
//  store: "cookie",   // session storage layer - see below
    store: new sessionkmongoose({
      collection: 'sessions',
      connection: mongooseConn,
      expires: 60 * 60 * 24 * 14, // 2 weeks is the default
      model: 'KoaSession'
    }),
    cookie: {
      key: 'kyx:sesgoose', // (string) cookie key (default is koa:sess)
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
  appk.use(sessionkstore(CONFIGS)); //{store: new sessionkmongoose()}

/*
// koa-session-store + koa-session-mongo
appk.keys = ["keyax57secretos"];
//appk.use(sessionkstore({store: sessionkmongo.create({url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions"})}));
const CONFIGS = {
    name: 'kyx:sess1',    // cookie name
    secret: "mysecretcode", //koa2-session-store
//    store: "cookie",   // session storage layer - see below
      store: sessionkmongo.create({
//          db: kyxtree", //"mongodb://user:555777@192.168.1.2:27017/kyxtree", //pets.dbc, // sessions,
            url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions", //pets.dbc, // sessions,
//          db: "kyxtree",  //pets.dbc,
//          collection: "sessions",
//          username: "yones",
//          password: "555777",
            expirationTime: 60}),   // expires: 60*60*1
    cookie: {
      key: 'kyx:sess1', // (string) cookie key (default is koa:sess)
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
const sesion = sessionkstore(CONFIGS);
appk.use(sesion); //, appk));   //cokiesz:{"views":16,"_sid":"AraFxFnUgS2skFR"}
  // or if you prefer all default config, just use => app.use(session(appk));
*/
/*
//  koa-session + koa-socket-session + koa-socket.io
appk.keys = ["keyax57secretos"];
const CONFIG = {
  key: 'koa:sess', // (string) cookie key (default is koa:sess)
  // (number || 'session') maxAge in ms (default is 1 days)
  // 'session' will result in a cookie that expires when session/browser is closed
  // Warning: If a session cookie is stolen, this cookie will never expire
  maxAge: 86400000,
  overwrite: true, // (boolean) can overwrite or not (default true)
  httpOnly: true, // (boolean) httpOnly or not (default true)
  signed: true, // (boolean) signed or not (default true)
  rolling: false, // (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
};
appk.use(koasession(CONFIG, appk));
// or if you prefer all default config, just use => app.use(koasession(app));
// init koa-socket-session as koa-socket's middleware
ksio.use(KSsession(appk, koasession));
*/

appk.use(async (ctx,next) => {
  //ctx.state.varyin = 'vary';
  //  ctx.state.varyin.name = ctx.session.name;
  //   ctx.cookies.set()

  //  if (ctx.path === '/favicon.ico') return;  // ignore favicon
  let n = ctx.session.views || 0;
    ctx.session.views = await ++n;
    ctx.session.username = 'socketmero';

  //  ctx.body = n + ' views';
  //  ctx.session.socketo = await ctx.socket.id;
  // use current socket send a broadcast
  ///ctx.socket.broadcast('msg', '[All]: Hello guys, I\'m ' + this.data + '.'); //broadcast not a function
   // just send to current user
//////  ctx.socket.emit('msg', '[' + this.data + ']' + " Welcome to koa-socket.io !");
  //  await next();
  console.log("cokie._sid:"+ctx.cookies.get("kyx:sesgoose"));  // undefined
  console.log("session.blob:"+JSON.stringify(ctx.session));  // {}
////////////////???????????????????  console.log("ctx.socket:"+JSON.stringify(ctx.socket));  // {}
  //appk.context.vary =  n + 'views'; //'varyin';
  //ctx.session = null;  //destroy session
  await next();
  return ctx;
});

// koa-session-store + koa-session-mongo + koa-socket
///////  io.attach(appk);  // koa-socket
  /*  appk.io.use( async ( ctx, next ) => {
    ctx.cookies.set("koala", "koalas");
    console.log( 'Upstream'+ ctx.cookies.get("koala") );
    await next();
    console.log( 'Downstream' );
  });**/
/*  appk._io.on('connection', (sock) =>  {     //  no * generator
      console.log('join event received, new user: '+sock.id);

      //  ctx.session.socketo = "socket.id";
  //    socket.emit('hiserver', { hello: 'world baby '+socket.id });
  //    socket.on('hiclient', function (data) {
  //       console.log(`connected socket ${socket.id} event hiclient received: ${JSON.stringify(data)}`);
  //    });
        appk._io.emit('hiserver', { hello: 'world baby'+sock.id });
  //   socket.broadcast.emit('progress', bytesReceived);
      // use global io send borad cast
  //////  appk._io.emit('msg', '[All]: ' + this.data + ' joind');
      // use current socket send a broadcast
  //   appk._io.broadcast('msg', '[All]: Hello guys, I\'m ' + this.data + '.');   //broadcast not a function
       // just send to current user
  //////  appk._io.emit('msg', '[' + this.data + ']' + " Welcome to koa-socket.io !");
  //  await next();
  //  return ctx;
  });
  appk._io.on('hiclient', function (data) {
    console.log(`connected socket ${sock.id} event hiclient received: ${JSON.stringify(data)}`);
  });
   appk._io.on('upload', function (msg) { console.log("msg:",msg);});
*/


/*
  appk.use(function *() {
      // set username in session to 'LnsooXD'
      this.session.userapp = 'LnsooXD';
    //  console.log('ctx.session.socketo'+this.session.socketo);
  });
*/
  /*
  async function process(next) {
    await next;
    await function (done) { setTimeout(done, 5000); };
    console.log('processed');
  };
  */
  //appk.use(process)
  //////appk.context.vary =  'varyin';
  //appk.use(require('koa-body')({ multipart: true }));
  //appk.use(Parser());  // koa-body
  //appk.use(Formis());
  //appk.use(Cookies());  // TypeError: cookiek is not a function
//  require('./auth.js');

  appk.use(Parser());
  appk.use(passport.initialize());
  appk.use(passport.session());

/*
  // Require authentication for now
  appk.use(function(ctx, next) {
    if (ctx.isAuthenticated()) {
      return next()
    } else {
//    ctx.body = "ctx.redirect('/')";
    }
  })
  */
  /*
  appk.use(route.get('/app', function(ctx) {
    ctx.type = 'html'
    ctx.body = fs.createReadStream('views/app.html')
  }))

  */


//appk.use((ctx) => {ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(ctx.session.username));});
//appk.use((ctx) => {ctx.cookies.set('sessiond', 123456); ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(x = ctx.cookies.get()));});
/*
// logger
appk.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
appk.use(async ctx => {
//  ctx.body = 'Hello World';
});
*/





/*
routerk.use((ctx,next) => {
//  ctx.body = {"respuesta":"Hola amigos de Keyax router use"};  // second step
    next();
});
*/
///routerk.use("/uploads", Formis());
/*
routerk.use(//"/login",
(ctx) => {
      sessionkstore(
    {store: sessionkmongo.create({
  //  db: kyxtree", //"mongodb://user:555777@192.168.1.2:27017/kyxtree", //pets.dbc, // sessions,
     url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions", //pets.dbc, // sessions,
  //   db: "kyxtree",  //pets.dbc,
  //   collection: "sessions",
  //   username: "yones",
  //   password: "555777",
     expires: 10000*60*60*1})
   }
  // ,appk
)
//  await next();
//ctx.cookies.set('sessiond', 123456);
//ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(ctx.session.username));
//appk.use(sessionk(appk));
}
);

routerk.use((ctx) => {ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(ctx.session.username));});
*/
/////routerk.use(async (ctx) => {console.log("cookies:"+ cookiek(ctx));}); //cookie parser

routerk.post("/who", async function (ctx, next) {
 try {
///////const cokie = ctx.cookie; console.log("routerk.use(cookiek());:"+cokie);
//if (ctx.sessions){console.log("New session");}
ctx.body = ctx.session;
//const {fields} = await abb(ctx.req, {});
//  console.log(util.inspect("who:"+ctx.cookies.get("kyx:sess1")));
//await next();
//  ctx.cookies.set("sesiones", "fantasticas");// = {resp: "login eureka!!"};
return ctx;
} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};

});

routerk.post("/login", async function (ctx, next) {
 try {
//   const auth = require('./auth.js');
//   const passport = require('koa-passport');



///////const cokie = ctx.cookie; console.log("routerk.use(cookiek());:"+cokie);
//if (ctx.sessions){console.log("New session");}
const {fields} = await abb(ctx.req, {});
  console.log(util.inspect({fields}));
ctx.state.user = {};
ctx.state.user.username = fields.username;
ctx.state.user.password = fields.password;
console.log("loginx:"+util.inspect(ctx.state.user));
//  await next();
//  ctx.cookies.set("sesiones", "fantasticas");// = {resp: "login eureka!!"};
/*
passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/pets/pets'
});
*/
//ctx.body = ctx.state.user;

  return ctx;
  } catch (err) {
  ctx.body = { message: err.message };
  ctx.status = err.status || 500;
  };
});

routerk.post('/loginy', function(ctx, next) {  //'/custom'
  return passport.authenticate('local', function(user, info, status) {
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
//      ctx.throw(401)
    } else {
      ctx.body = { success: true };
      return ctx.login(user);
    }
  })(ctx, next)

//console.log("auth:", ctx.isAuthenticated);
});

// POST /login
routerk.post('/loginz',
  passport.authenticate('local', {
    successRedirect: '/pets/pets',
    failureRedirect: '/'
  })
);

routerk.get('/logout', function(ctx) {
  ctx.logout();
  ctx.redirect('/');
});
/*
routerk.get('/auth/facebook',
  passport.authenticate('facebook')
)
routerk.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)
routerk.get('/auth/twitter',
  passport.authenticate('twitter')
)
routerk.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)
routerk.get('/auth/google',
  passport.authenticate('google')
)
routerk.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)
// Require authentication for now
appk.use(function(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
})
routerk.get('/app', function(ctx) {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('views/app.html')
})
*/


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
                  length: ctx.state.filesize, //stat.size,
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
    }); // await abb ctx.req,
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
return ctx;
} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};

});
//appk.context.lista = {};  //  ctx.lista = f();
routerk.post("/sqldb/:langs", async function (ctx, next) {
//  const cokie = ctx.cookie; console.log("routerk.use(cookiek());:"+cokie);  // undefined

  /// ctx.state.varyin = 'vary';
  try {
      //console.log("cokie:"+ ctx.cookies.get("koa:sess"));
  //     console.log("cokie:"+ ctx.varyin);
       ctx.status = 200;
       ctx.set("Access-Control-Allow-Origin", "*");
       ctx.set("Access-Control-Allow-Credentials", "true");
       ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
       ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     ctx.set("Content-Type", "application/json");
       ctx.type="application/json";
  //     ctx.flushHeaders();
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
//await next();
return ctx;

} catch (err) {
  ctx.body = { message: err.message }
  ctx.status = err.status || 500
};
//console.log("sqlcokie._sid:"+ctx.cookies.get("kyx:sess1"));  // undefined
//console.log("sqlsession.blob:"+JSON.stringify(ctx.session));  // {}

//console.log("ctx.session"+ JSON.stringify(ctx.session.isNew));
//await next();
//return ctx;

});  // end sqlang()

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

appk.use(routerk.routes());
appk.use(routerk.allowedMethods());
//appk
//  .use(routerk.routes())
//  .use(routerk.allowedMethods());


function callback(req, res) {
  //res = "HOyolanokati";
/*  if (parseInt(req.headers['content-length']) > 1375347) {
    res.end('to large')
  }
  res.end('done in full')
  function ( req, res ) {
    var cookies = new Cookies( ctx.req, ctx.res, { "keys": keys } )
      , unsigned, signed, tampered
console.log("cb req.url:"+ctx.url);
    if ( ctx.req.url == "/" ) {
      cookies
        // set a regular cookie
        .set( "unsigned", "foo", { httpOnly: false } )

        // set a signed cookie
        .set( "signed", "bar", { signed: true } )

        // mimic a signed cookie, but with a bogus signature
        .set( "tampered", "baz" )
        .set( "tampered.sig", "bogus" )

      ctx.res.writeHead( 302, { "Location": "/" } )
      return ctx.res.end( "Now let's check." )
    }

    unsigned = cookies.get( "unsigned" )
    signed = cookies.get( "signed", { signed: true } )
    tampered = cookies.get( "tampered", { signed: true } )

    assert.equal( unsigned, "foo" )
    assert.equal( signed, "bar" )
    assert.notEqual( tampered, "baz" )
    assert.equal( tampered, undefined )

    ctx.res.writeHead( 200, { "Content-Type": "text/plain" } )
    ctx.res.end(
      "unsigned expected: foo\n\n" +
      "unsigned actual: " + unsigned + "\n\n" +
      "signed expected: bar\n\n" +
      "signed actual: " + signed + "\n\n" +
      "tampered expected: undefined\n\n"+
      "tampered: " + tampered + "\n\n"
    )
  };*/
};

var serverk = http.createServer(appk.callback());// callback for http.createServer or express.app
// you can pass the parameter in the command line. e.g. node static_server.js 3000
// var port = process.argv[2] || 9000;
var port = 9000;
var filesize = 0;

// koa + socket.io first style
var serverkl = serverk.listen(parseInt(`${port}`), (err) => {
  if (err) {return console.log('something bad happened', err)}
  console.log(`server is listening on port: ${port}`)
  });
var siok = require('socket.io')(serverkl);

siok.on('connection', function (socket){
    socket.emit('hiserver', { hello: 'world baby '+socket.id });
    socket.on('hiclient', function (data) {
       console.log(`connected socket ${socket.id} event hiclient received: ${JSON.stringify(data)}`);
       console.log(`with socket cookie: ${socket.request.headers.cookie}`);
       console.log(`with socket cookie handshake: ${socket.handshake.headers.cookie}`);

    });
     socket.on('upload', function (msg) {filesize=msg; console.log("msg:",msg);
//   socket.broadcast.emit('progress', bytesReceived);
     });
  });
//    socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();

/*
var siok = require('socket.io')(serverk);
siok.on('connection', function (socket){
      socket.emit('news', { hello: 'world baby'+socket.id });
      socket.on('message', function (data) {
         console.log('data:'+data);
         console.log(`connected socket news FF!${JSON.stringify(data)} ,socket: `+socket.id);
      });
       socket.emit('news',socket.id);
       socket.on('upload', function (msg) {filesize=msg; console.log("msg:",msg);
  //         socket.broadcast.emit('progress', bytesReceived);
       });
    });
serverk.listen(parseInt(`${port}`), (err) => {
      if (err) {return console.log('something bad happened', err)}
      console.log(`server is listening on port: ${port}`)
});
*/

/*
// koa-session + koa-socket-session + koa-socket.io
// koa-session-store + koa-session-mongo + koa-socket.io
//const opts = {host: 'http://kyx.dynu.net', port: '9000'};
//ksio.start(serverk, opts);
ksio.start(serverk);  //  koa-socket.io
ksio.use(co.wrap(function* (next){
  let start = new Date();
  yield next;
  console.log( `response time: ${ new Date() - start }ms` );
}));
ksio.on('connect', function (ctx, next) {   //  no * generator
    ksio.emit('hiserver', { hello: 'world baby '+ctx.socket.id });
     ksio.on('upload', function (msg) {filesize=msg; console.log("msg:",msg);
//   socket.broadcast.emit('progress', bytesReceived);
     });
  });
  ksio.on('hiclient', function (ctx) {
     console.log(`connected socket ${ctx.socket.id} event hiclient received: `);
  });
    // use global io send borad cast
//    ksio.emit('msg', '[All]: ' + this.data + ' joind');
    // use current socket send a broadcast
//    this.socket.broadcast('msg', '[All]: Hello guys, I\'m ' + this.data + '.');
     // just send to current user
//    this.socket.emit('msg', '[' + this.data + ']' + " Welcome to koa-socket.io !");
//   await next();
//   return ctx;
//});
serverk.listen(parseInt(`${port}`), (err) => {
      if (err) {return console.log('something bad happened', err)}
      console.log(`server is listening on port: ${port}`)
});
*/
/*
///  koa-socket
var port = process.argv[2] || 9000;
appk.listen(parseInt(`${port}`), (err) => {
    if (err) {return console.log('something bad happened', err)}
    console.log(`socket server is listening on port: ${port}`)
});
*/
