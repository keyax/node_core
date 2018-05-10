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
const fs = require('fs');
const fse = require('fs-extra');
const util = require('util');
const assert = require('assert');
const path = require('path');
const url = require('url');
const URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');

// const abb = require('async-busboy');
const kbb = require('koa-busboy');
// koa-busboy uploader puts fields in ctx.request.body & files in ctx.request.files[]
const upkbb = kbb({ dest: "statics/upload",     // default is system /temp folder (`os.tmpdir()`)
                    fnDestFilename: (fieldname, filename) =>  fieldname + '_' + filename  //uuid() default epoch+fieldname+filename
                  });
var progress = require('progress-stream');
const exif = require('exiftool');

const bodyParser = require('koa-bodyparser');
//const passport = require('koa-passport');
const Multer = require('koa-multer');

var Koa = require('koa');
var appk = new Koa();

// function rutas(appk) {  // OK1
const Router = require('koa-router');

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

/*
var yo = require("socket.io")(appk);
yo.on('connect', function (socket) { console.log("sockrouter connected");
                                     socket.on('upload', function (msg) {console.log("msg??????????????:",msg);});
 });
*/
//socket.on('upload', async function (msg) {filesize = msg; console.log("msg:",msg);});

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
/*
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
*/
/*
var filelist = fse.readdir('statics/upload/', function(err, list) {
                          list.filter(extension).forEach(function(value) {console.log("value"+value);});
    //            filename =>  (filename.substr(0, filename.lastIndexOf('.')) == ".jpg") ? {filelistext.push(filename)}
                 console.log("filelistext"+filelistext);
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
/*
function checkFile(files) {var filename = files[0].filename;
           console.log("filename+check:"+filename);
           if(path.extname(filename) !== 'jpg'){
          var err = new Error('not jpg image');
          err.status = 400;
          return err;
          }
        }; // end checkFile()
const {files, fields} = await kbb(ctx.req, {});
checkFile(files);
console.log(util.inspect({files, fields}));
*/

routerk.post("/uploadz", upkbb, async function (ctx, next) {
try {
  var fields = ctx.request.body; // fields in ctx.request.body + [] with file sizes

      console.log(process.cwd()); console.log("Form fields: ",fields.kanimg);
      var kanimg = fields.kanimg.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "");
      fs.writeFile("statics/upload/kanimg.jpeg", kanimg, 'base64', function(err) { console.log(err); });

  var files = ctx.request.files; // files in ctx.request.files array
  console.log("file: ",files[0].path);  //  files[0].path|fieldname|filename|encoding|mimetype
//  files.forEach((file)=>{console.log("filesize: ",file.entries());});
  /*var strm = [];
  files.forEach((file,idx,aray) => {   //   console.log("filesize: ",file);   //  sockt.emit('upload', fil.size);
      strm[idx] = progress({
                  length: fields.filarr[idx],  // file.size, //stat.size,
                  time: 1 // ms
                  });
     wstream = fs.createWriteStream("upfile");
///   ctx.request.files[0].pipe(wstream);
      file.pipe(strm[idx]).pipe(wstream);
      strm[idx].on('progress', function(progress) {   // no async
                console.log('progreso:',JSON.stringify(progress));
            //  {percentage: 9.05, transferred: 949624, length: 10485760, remaining: 9536136,
            //   eta: 42, runtime: 3, delta: 295396, speed: 949624 }
                });
  });  //  files.forEach
*/
ctx.body = await {"resp:": "eureka!!","file":files[0].path, fields};  // POST >> [HTTP/1.1 404 Not Found 2468ms
return ctx;
} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};  // end catch
//next();
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

module.exports = routerk;
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
