/*
// remove route 2014 https://github.com/alexmingoia/koa-router/issues/88
var router = new koaRouter(app);
app.use(router.middleware()); // Note .middleware()
// Later
app.all(name, path, ...) // Make the route named for easier finding later
// And even later
var r = router.routes
for(var i in r) {
    if(r[i]['name'] == name) {
        r.splice(i, 1); // Don't use delete, as it leaves a hole in the array and system crashes during subsequent routing
        break;
    }
}

// nested routers ===========================================
sharedRouter.get('/hello', (ctx) => {
    ctx.body = 'Hello World!';
});
rootRouter.use(sharedRouter.routes());
rootRouter.use('/foo', sharedRouter.routes());
rootRouter.use('/bar', sharedRouter.routes());
app.use(rootRouter.routes());
//  The resulting path would then be /bar/foo/hello

//>>>>>>>>> add middleware ??? 2015 https://github.com/alexmingoia/koa-router/issues/106
// you'll need to loop through router.stack.routes, registering same route more than once would throw an error
var app = require('koa')(),
    router = require('koa-router')();
var Amiddleware = function*(){
    console.log('I am A middleware');
    this.body=42;
};
router.get('/test',one);
//============================
// eventual add middleware
var Bmiddleware = function*(next){ console.log('I sit on top'); yield next; };
//something like give me the koa-composed middleware for the verb V and path P
var oldMiddleware = router.getMiddleware('get', '/test');
router.get('/test', Bmiddleware, oldMiddleware);
//==============================
app.use(router.routes())
   .use(router.allowedMethods());
var server = require('http').Server(app.callback());
server.listen(8080);
// ================SAMPLES END ===================
*/

//module.exports = function(app, passport)   // express
//module.exports = function  (passport)
const assert = require('assert');
const path = require('path');
const url = require('url');
const URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');
var progress = require('progress-stream');
const abb = require('async-busboy');
const exif = require('exiftool');
const bodyParser = require('koa-bodyparser');
//const passport = require('koa-passport');
const Multer = require('koa-multer');

var Koa = require('koa');
var appk = new Koa();

const fs = require('fs');
const fse = require('fs-extra');
const util = require('util');
// function rutas(appk) {  // OK1
const Router = require('koa-router');
//const abb = require('async-busboy');
const kbb = require('koa-busboy');

//module.exports = function(passport)
  const routerk = new Router(); // ({prefix: '/w3'});  // new routerk({prefix: '/corp1'});
//  routerk.prefix('/w3');
/*
console.time("fileread");   // mzfs. 0.342ms fs. 0.396ms  (0.111ms console.timeEnd)
var dbadmin = fs.readFileSync(process.env.DBADMIN, 'utf8');  // mzfs. 0.212ms fs. 0.202ms
var dbadminq = dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');  // quoted correct JSON 0.245ms
var dbadminqp = JSON.parse(dbadminq); // 0.150ms
var record = JSON.stringify(dbadminqp.session); // 0.140ms
console.timeEnd("fileread");
console.log("DBADMIN:"+process.env.DBADMIN+'\n '+record); // 2.810ms

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const dbUrl = `mongodb://${dbadminqp.dbuser.createUser}:${dbadminqp.dbuser.pwd}@172.17.0.1:27017/kyxtree?authSource=admin`;
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const mongooseConn = mongoose.connect(dbUrl, {
    useMongoClient: true//,
//  promiseLibrary: bluebird // Deprecation issue again
});
mongooseConn.then(db => {//db.createUser(dbadminqp.superadmin);// console.log('Mongoose has been connected from router');})
       .catch(err => {console.log('Error while trying to connect with mongodb: '+err); });  // throw err;
*/
//var User = require('../models/user');
////require('../auth0'); // pass passport for configuration  ./config/passport
/*
appk.use(bodyParser())
require('../auth0');
///appk.use(flash2()); // use connect-flash for flash messages stored in session // app. koa deprecated Support for generators
appk.use(passport.initialize());
appk.use(passport.session());
*/
/*
    // HOME PAGE (with login links) ========
    routerk.get('/', async function (ctx, next) { // function(req, res)
        res.render('index.ejs'); // load the index.ejs file
    });
*/
// LOGIN ===============================
// show the login form
//   routerk.get('/logito', console.log('logito ok'));
     routerk.get('/loginp', async function (ctx, next) { // function(req, res)
// render the page and pass in any flash data if it exists
//   res.render('login.ejs', { message: req.flash('loginMessage') });
     console.log("msg from pass.js /login");
    });
// process the login form
// app.post('/login', do all our passport stuff here);
// SIGNUP ==============================
// show the signup form
   routerk.get('/signup', function(ctx) {
// render the page and pass in any flash data if it exists
   ctx.render('signup.ejs', { message: ctx.flash('signupMessage') })
           .catch(err => console.error(err)); // Unhandled promise rejection
   });
// process the signup form
// app.post('/signup', do all our passport stuff here);
// PROFILE SECTION =====================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
   routerk.get('/profile', isLoggedIn, function(ctx) {
        ctx.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
// LOGOUT ==============================
   routerk.get('/logout', function(ctx) {
        ctx.logout();
        ctx.redirect('/');
    });
// process the signup form
// routerk.post('/signup', passport.authenticate('local', { badRequestMessage: 'insert message here' }));
   routerk.post('/signupass', passport.authenticate('local-signup', {
         successRedirect : '/w3/who', // redirect to the secure profile section
         failureRedirect : '/w3/', // redirect back to the signup page if there is an error
         failureFlash : false // allow flash messages
   }));
// process the login form
   routerk.post('/loginpass', passport.authenticate('local', {
         successRedirect : '/w3/sqldb/fr', // redirect to the secure profile section
         failureRedirect : '/w3/sqldb/de', // redirect back to the signup page if there is an error
         failureFlash : false // allow flash messages
   }));

/*
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello'
})

export default router
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
  //   email: "yones",
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

// module.exports.who =
routerk.post("/who", async function (ctx,next) {  //  , isLoggedIn,
 try {  //  ctx.body = ctx.session;
      if (ctx.isAuthenticated()){ console.log("passport authenticated!!");}
      if (ctx.isUnauthenticated()){console.log("passport not authenticated!!")}
      ctx.body = ctx.state.user;
      //if (ctx.session){console.log("New session", ctx.session);}
//      ctx.cookies.set("kyx:user", email);// = {resp: "login eureka!!"};
await next();
} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};
});


//routerk.post("/login", async function (ctx, next) {await abb(ctx.req);},function (filds) {console.log("results",filds);})
routerk.post("/loginpasx", async function (ctx, next) {
  var User            = require('../models/user');  // ../app/models/user   default  .js

 try {
const {fields} = await abb(ctx.req);  console.log(util.inspect({fields}));
var email = fields.email;
var password = fields.password;
var userid = await User.findOne({'local.email': email}, function (err, userid) {
                 if (err) {console.log("error find:", err);
                           ctx.throw(400, 'name required', { user: user });}
//                else {console.log('user found:',userid.local);}
                 });
if (!userid || userid === null){userid  = {};
   userid.local = {email: email, password: password};
// userid = await User.create(new User(newUser));
   await User.save(new User(userid), 'userid.local.password', function(err, newuser) {
                     if (err) {console.log("error register", err);} //return ctx.render('register', { user : user });
                     });
}
if (userid && userid.local.email === email && userid.local.password === password) {
         ctx.state.user = {};
         ctx.state.user.email = email;
         ctx.state.user.password = password;
         console.log('logos',ctx.state.user);
         }

//if (ctx.isAuthenticated()){ console.log("passport authenticated!!");}
//if (ctx.isUnauthenticated()){console.log("passport not authenticated!!")}
ctx.body = ctx.state.user;
if (ctx.session){console.log("New session", ctx.session);}
ctx.cookies.set("kyx:user", email);// = {resp: "login eureka!!"};
return email;

  } catch (err) {
  ctx.body = { message: err.message };
  ctx.status = err.status || 500;
  };
}
//, function (u) {console.log("results",u)}

);  // end routerk.post("/login"

// process the login form
routerk.post('/login', passport.authenticate('local-login', {
        successRedirect : '/who', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages
}));

routerk.post('/loginy', async  function(ctx, next) {  //'/custom'
   //await abb(ctx.req);
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
routerk.post('/loginz', bodyParser(),
  passport.authenticate('local', {
    successRedirect: '/pets/pets',
    failureRedirect: '/'
  })
);

routerk.post('/loginzz',Multer, function(ctx, next)
{ console.log ("request",ctx.body);
  ctx.state.user = {};
  ctx.state.user.email = ctx.request.email;
  ctx.state.user.password = ctx.request.password;

if (ctx.isAuthenticated()){ console.log("passport authenticated!!");}
if (ctx.isUnauthenticated()){console.log("passport not authenticated!!")}
}
);


routerk.post('/logout', function(ctx) {
  ctx.logout();
  if (ctx.isAuthenticated()){ console.log("logout:passport authenticated!!");}
  if (ctx.isUnauthenticated()){console.log("logout:passport not authenticated!!")}
  ctx.session=null;
//  ctx.redirect('/login');
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

routerk.post("/uploadz", async function (ctx, next) {
 try {
/*
var yo = require("socket.io")(appk);
yo.on('connect', function (socket) { console.log("sockrouter connected");
                                     socket.on('upload', function (msg) {console.log("msg??????????????:",msg);});
 });
*/
let filesize = await ctx.state.filesize;
//socket.on('upload', async function (msg) {filesize = msg; console.log("msg:",msg);});
console.log('filesizerouter:'+JSON.stringify(ctx.session));
const {fields} = await abb(ctx.req, {
    onFile: function(fieldname, file, filename, encoding, mimetype) {
            //uploadFilesToS3(file);
          //  console.log("ctx.req:"+ctx.request.get);
      //      console.log("filesinctx:"+ctx.req.files);
            console.log("abb:fieldname "+fieldname+" file** "+JSON.stringify(file)+"** filename "+filename+" encoding "+encoding+" mime "+mimetype);
            var upfile = `statics/upload/${filename}`;  // as of `/home/node/statics/${filename}`;

//exiftool for media >> filename user+timegeostamp >> translatable tags
//json test + upsert mongodb

//            events.js:182
//                  throw er; // Unhandled 'error' event
//                  ^
//            Error: EROFS: read-only file system, open 'js/routes/atompush.png'

  //          fs.closeSync(fs.openSync(upfile, 'w'));
/*           fs.open(upfile,'w', function(err,fd){
                  if(err)console.log('cant open: '+upfile+err);//handle error
                      console.log('open: '+upfile);
                  fs.close(fd, function(err){
                     if(err)console.log('cant close: '+upfile+err);//handle error
                      console.log('close: '+upfile);
              });
            });*/
//        var stat = fs.statSync(upfile);

var extFilter = "jpg";
function extension(filename) {
//  var extName = path.extname(filename);
 var extName = filename.substr(0, filename.lastIndexOf('.')) || filename;
 console.log("ext"+extName);
  return extName === '.' + extFilter;
};
fse.readdir('statics/upload/')
.then((list) => list.filter(extension))
.then((listext) => listext.forEach((listitem) => console.log("listitem: "+listitem)))//  console.log("filelist"+filelist))
.catch(err => console.error(err));
/*
var filelist = fse.readdir('statics/upload/', function(err, list) {
                          list.filter(extension).forEach(function(value) {console.log("value"+value);});
//                filename =>  (filename.substr(0, filename.lastIndexOf('.')) == ".jpg") ? {filelistext.push(filename)}
//                 console.log("filelistext"+filelistext);
})
*/
/*
fs.access(upfile, fs.constants.R_OK | fs.constants.W_OK, (err) => {  // fse.pathExists
  console.log(err ? 'no access!' : 'can read/write');
});
fs.unlink(upfile, function(err) {    // fse.remove
    if(err && err.code == 'ENOENT') { // file doens't exist
        console.info("File doesn't exist, won't remove it.");
    } else if (err) {  // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
    } else {
        console.info(`removed`);
    }
});
*/
          var strm = progress({
                  length: filesize, //stat.size,
                  time: 1 // ms
            });
            wstream = fs.createWriteStream(upfile);
            file.pipe(strm).pipe(wstream);
            strm.on('progress', async function(progress) {
                await console.log('progreso:',progress);
                /* {percentage: 9.05,
                    transferred: 949624,
                    length: 10485760,
                    remaining: 9536136,
                    eta: 42,
                    runtime: 3,
                    delta: 295396,
                    speed: 949624
                } */
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
  ctx.body = await {resp: "eureka!!"+ filesize};
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
  const sqlconnect = require('./../sqlconnect.js');   // pool or single
//  var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE VALUE = LANGTO`, // language locale
//  var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng'`, // languages fra eng
//  var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@Gn:' AND LANGTO='eng'`, // countries eng
    var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE ?`,
                 'values' :  ['%'+ling+'%'], 'timeout' : 40000 }; // '%_%'   40s
                  console.log("ctx.response"+ JSON.stringify(ctx.request.url));
  // const respo[rows, fields] = await sqlconn.execute(env_sql.options.sql)
//      await next();
  ctx.body = await sqlconnect.querypr(sqlopts)
              .then(rows => {//console.log("rowssqlpre:"+rows);  //undefined
            //          ctx.body = rows; //JSON.stringify(rows);
              //      ctx.send(rows);
                /*      var lst = "[";
                      rows.map(value =>{lst += '\"'+value.VALUE+'''\",'});
                      lst += "]";*/
                      var lst = "{";
                      rows.map(value =>{lst += '\"'+value.VALUE+'\":\"'+value.LEXIC+'\",'});
                      lst += "}";

                      console.log("rowssql:"+lst);   //OOOOOOOKKKKKK
//                      console.log("rowssql:"+JSON.stringify(rows));   //OOOOOOOKKKKKK
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
//  Store the data from the fields in your data store.
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
//await next();
//return routerk;
/* // catch remaining inexistent routes
routerk.get(/(|^$)/, function* (next) { // <--- important that it is last
    console.log('public: /(|^$)/');
    this.body = 'public: /(|^$)/';
});*/

//module.exports = routerk;
// OK1
///////////appk.use(routerk.routes());
//////////////appk.use(routerk.allowedMethods());

///return appk;
//};  //  ();  // end export router
//module.exports = routerx;
// OK1

//module.exports = routerk.routes();  // OK2
// route middleware to make sure a user is logged in
   function isLoggedIn(ctx, next) {
// if user is authenticated in the session, carry on
      if (ctx.isAuthenticated())
            return next();
// if they aren't redirect them to the home page
      res.redirect('/');
   };
