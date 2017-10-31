//  const modul = require('builtin-modules');
//  console.log(modul); // => []
//[ 'assert','buffer','child_process','cluster','console','constants','crypto','dgram','dns','domain','events',
//  'fs','http','https','module','net','os','path','process','punycode','querystring','readline','repl',
//  'stream','string_decoder','timers','tls','tty','url','util','v8','vm','zlib' ]
const assert = require('assert');
const path = require('path');
// const fs = require('fs');
const fs = require('mz/fs');
const url = require('url');
const URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');
const util = require('util');
var progress = require('progress-stream');
//var fetch = require('node-fetch');
const xhr2 = require('xhr2');

const https = require('https');
const http = require('http');

///const express = require('express');
///const appx = express();
//const app = require('express')();
///const server  = http.createServer(appx);
//const serverh  = http.createServer(handler);
// 1*) get an instance of router
///const routerx = express.Router();
//const formidable = require('formidable');
const cookieParse = require('cookie-parser');
const bodyParse = require('body-parser');

const Koa = require('koa');
const appk = new Koa();  // const appk = Koa();
//const serverhk  = http.createServer(appk.callback());
//const Routerk = require('koa-router');
//const routerk = new Routerk(); // new{prefix: '/'}
const app = new Koa();  // const app = Koa();
const routek = require('koa-route');
const Mount = require('koa-mount');
const Static = require('koa-static');
//const Cors = require('koa2-cors');
const abb = require('async-busboy');
const bodyParser = require('koa-bodyparser');
const Parser = require('koa-body');
const Valid = require('koa-validate');
var Formis = require('koa-formidable');
const Multer = require('koa-multer');
const Logger = require('koa-logger');
const respond = require('koa-respond');
const send = require('koa-send');


//fs.readFile('./Index.html').then(contents => console.log(contents))
//  .catch(err => console.error(err));
async function Readfile (file) {
  try {
    const data = await fs.readFile(file);
    return data;
  }
  catch (err) { console.error( err ) }
};
var dbadmin = readFile(process.env.DBADMIN);

// var dbadmin = fs.readFileSync(process.env.DBADMIN, 'utf8');
var dbadminq = dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');  // quoted correct JSON
var dbadminqp = JSON.parse(dbadminq);
console.log("DBADMIN:"+process.env.DBADMIN+'\n '+JSON.stringify(dbadminqp[0]));
//fs.readFile(process.env.DBADMIN , function(err,data) { if(err) console.log(err)
//                                                       else console.log(data.toString()); }  );
//const socketio = require('socket.io');
//let serverk = http.createServer(appk.callback());// callback for http.createServer or express.app

//var siok = require('socket.io')(serverk);

//const sio = require('socket.io')(server);
//const sio = socketio(server, {origins:'kyx.dynu.com:* ws://kyx.dynu.com:*'});
//const sio = socketio(server, {origins:'domain.com:* http://domain.com:* http://www.domain.com:*'});
///const sio = socketio.listen(server);
//const sio = require('socket.io')(app);
const IO = require('koa-socket.io');
const io = new IO({namespace: '/uploadz'});
//const KSIO = require('koa-socket');
//const ksio = new KSIO({namespace: '/uploadz'});

//const mongo = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;
//const Serverdb = require('mongodb').Server;
// const sqlconnect = require('./sqlconnect.js');   // pool or single

const co = require("co");
///const Promise = require('bluebird');
//koa deprecated Support for generators will be removed in v3.
const convert = require('koa-convert');
// ---------- override app.use method ----------
const _use = appk.use
appk.use = x => _use.call(appk, convert(x))
// ---------- end ----------
const Cookies = require('cookies');
const cookiek = require('koa-cookie'); // only parser
//var cookie = cookiek();
var jwt = require('jsonwebtoken');
//const Session = require('koa.session');
const koasession = require('koa-session');
const KSsession = require('koa-socket-session');
const sessionkstore = require('koa-session-store');
const sessionkmongo = require('koa-session-mongo');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const sessionkmongoose = require('koa-session-mongoose');
const dbUrl = "mongodb://kyxuser:555777@172.17.0.1:27017/kyxtree?authSource=admin";
const mongooseConn = mongoose.connection.openUri(dbUrl);
//const mongooseConn = mongoose.connect(dbUrl);//&& npm install --save mongoose@4.10.8 else 2Warnings: `open()` is deprecated & Db.prototype.authenticate
//const mongooseConn = mongoose.createConnection(dbUrl); // Db.prototype.authenticate method will no longer be available

appk.proxy = true;  // koa passport trust proxy
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const LocalMongoose = require('passport-local-mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-auth').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

var filesize = 0;

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
var rte= '/pets/pets'; var unit = pets.list;
//var uploadm = Multer({dest: '/img'});
app.use(Mount('/pets/hi', pets.hi));
app.use(routek.get('/pets/hello', pets.hi));
app.use(routek.get(rte, unit));
app.use(routek.get('/pets/pets/:name', pets.show));
app.use(routek.get('/pets/listad', pets.listados));
app.use(routek.get('/pets/sqlang/:langs', pets.sqlang));
//app.use(routek.post('/pets/uploadm', uploadm.single('avatar')));

app.listen(8100);
console.log('listening on port 8100');

////appk.use(require('cookie-parser')());  // read cookies (needed for auth)
//appk.use(require('body-parser')());    // get information from html forms  // deprecated undefined extended
////appk.use(require('body-parser').urlencoded({ extended: true }));

//appk.use(cookiek("keyax57secretos")); // not a function

// uid-safe vs uid2 vs node-uuid >>>> base64url.encode(crypto.randomBytes(length).toString('base64'))
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

// koa-session-store + koa-session-mongoose
appk.keys = ["keyax57secretos"];  //salt key
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
      key: 'kyx:sesgoosec', // (string) cookie key (default is koa:sess)
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
appk.use(sessionkstore(CONFIGS)); //{store: new sessionkmongoose()}

/*
//  koa-session + koa-socket-session + koa-socket.io
const CONFIG = {
  key: 'koa:session', // (string) cookie key (default is koa:sess)
  // (number || 'session') maxAge in ms (default is 1 days)
  // 'session' will result in a cookie that expires when session/browser is closed
  // Warning: If a session cookie is stolen, this cookie will never expire
  maxAge: 86400000,
  overwrite: true, // (boolean) can overwrite or not (default true)
  httpOnly: true, // (boolean) httpOnly or not (default true)
  signed: true, // (boolean) signed or not (default true)
  rolling: false, // (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
};
appk.keys = ["keyax57secretos"];

// init session
//var session = koaSession({
//    secret: '...',
//    resave: true,
//    saveUninitialized: true
//});
// const session = KoaSession(CONFIG, app);
//app.use(session);
appk.use(koasession(CONFIG, appk));
// or if you prefer all default config, just use => appk.use(koasession(appk));
///////appk.use( ... );  from koa-socket-session
*/

// authentication
//require('./auth.js');
// const passport = require('koa-passport')
//appk.use(abb(ctx.req));
appk.use(passport.initialize());
appk.use(passport.session());

appk.use(async (ctx,next) => {
  //ctx.state.varyin = 'vary';
  //  ctx.state.varyin.name = ctx.session.name;
  //   ctx.cookies.set()

  //  if (ctx.path === '/favicon.ico') return;  // ignore favicon
  let n = ctx.session.views || 0;
    ctx.session.views = await ++n;
    ctx.session.username = 'socketmetro';
    ctx.state.filesize = filesize;   //  socket.io no ctx
  console.log("cokie._sid:"+ctx.cookies.get("kyx:sesgoose"));  // undefined
  console.log("session.blob:"+JSON.stringify(ctx.session));  // {}
//???  console.log("ctx.socket:"+JSON.stringify(ctx.socket));  // {}
  //appk.context.vary =  n + 'views'; //'varyin';
  //ctx.session = null;  //destroy session
  await next();  // next() corrects Not Found, await corrects OK
  return ctx;
});

  /*
  async function process(next) {
    await next;
    await function (done) { setTimeout(done, 5000); };
    console.log('processed');
  };
  */


// passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
//  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
/*
  passport.serializeUser(function(user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, done);
  })
*/
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
appk.use(ctx => {
  ctx.session.filesize = filesize; //body = 'Hello World';
  return ctx;
});*/

//var rooter = require('./routes/index');
//      rooter.use('/', rooter.routes(), rooter.allowedMethods());
//      var api2 = require('./methods/api2');
//      routerk.use('/api2/v0/', api2.routes(), api2.allowedMethods());
//appk.use(rooter);

// require('./app/routes.js')(app, passport); // Express: load our routes and pass in our app and fully configured passport
appk.use(require('./routes/index.js')); // ./routes/index.js  default
//appk.use(routerk.routes());
//appk.use(routerk.allowedMethods());
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
let serverk = http.createServer(appk.callback());// callback for http.createServer or express.app

var siok = require('socket.io')(serverk);
//var siokups = siok.of('/uploadz');    //, {path: '/uploadz'});

siok.on('connection', function (socket){
   socket.emit('hiserver', { hello: 'world baby>>>'+socket.id });
   socket.on('hiclient', function (data) {
     console.log(`connected socket ${socket.id} event hiclient received: ${JSON.stringify(data)}`);
     console.log(`with socket cookie: ${socket.request.headers.cookie}`);
     console.log(`with socket cookie handshake: ${socket.handshake.headers.cookie}`);
     var date = new Date();
         date.setTime(date.getTime()+(1*24*60*60*1000)); // set 1 day value to expiry
         var expires = "; expires="+date.toGMTString();
     var name = "kyx:socket"; var value = socket.id;
//Not a function         socket.handshake.headers.cookie.kyxsoket = name+"="+value+expires+"; path=/";
//   socket.handshake.headers.cookie.set("kyx:socket", socket.id);// = {resp: "login eureka!!"};
   });
   socket.on('upload', function (msg) { console.log("msg?????????:"+msg); filesize = msg;
   // socket.broadcast.emit('progress', bytesReceived);
   });
});

/*
// koa-session + koa-socket-session + koa-socket.io
// koa-session-store + koa-session-mongo + koa-socket.io
//const opts = {host: 'http://kyx.dynu.net', port: '8000'};
//io.start(serverk, opts);
io.start(serverk);  // koa-socket.io
//io.use(async (ctx, next) => {   });
io.use(co.wrap(function* (next){
  let start = new Date();
  yield next;
  console.log( `response time: ${ new Date() - start }ms` );
}));
// init koa-socket-session as koa-socket's middleware
//io.use(KSsession(appk, koasession));
///io.use(KSsession(appk, sessionkstore)); // fails routes
//????ksio.attach(appk); //koa-socket

io.on('connect', (ctx, next) => {
  ctx.socket.emit('hiserver', { hello: 'world baby koa-socket.io >>>'+ctx.socket.id });
  ctx.socket.on('upload', (ctx, next) => {    filesize = ctx.data;
 // console.log( JSON.stringify(ctx) );// {"packet":null,"event":"upload","data":302400}
 // let username = ctx.session.username;// get username from session
 // print the message received and username in session
 // console.log( `message: ${ ctx.data }, username: ${username}` );
 //   socket.broadcast.emit('progress', bytesReceived);
  });
});
*/
/*
io.broadcast( 'hiserver', 'Hola red ' );
io.on( 'join', function *( next)  {
  console.log( this.data )
  console.log( this.event)
})
io.on( 'message', ( ctx, data ) => {
  // get username from session
  let username = ctx.session.username;
  // print the message received and username in session
  console.log( `message: ${ data }, username: ${username}` )
});
*/

// you can pass the parameter in the command line. e.g. node static_server.js 3000
// var port = process.argv[2] || 8000;
var port = 8000;
serverk.listen(parseInt(`${port}`), (err) => {
      if (err) {return console.log('something bad happened', err)}
      console.log(`server is listening on port: ${port}`)
});

/*
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
     socket.on('upload', async function (msg) {ctx.session.filesize = msg; console.log("msg:",msg);
//   socket.broadcast.emit('progress', bytesReceived);
     });
  });
//    socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
*/
