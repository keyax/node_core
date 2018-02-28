/*
app.use(function *() {
  switch (this.path) {
  case '/get':
    get.call(this);
    break;
  case '/remove':
    remove.call(this);
    break;
  }
});
*/
//koa-route
const dbx = {
  tobi: { name: 'tobi', species: 'ferret' },
  loki: { name: 'loki', species: 'ferret' },
  jane: { name: 'jane', species: 'ferret' }
};
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
  }
},
  dbc: async function (ctx, next) {
    try {
  var dbconn = require('./dbconnect.js');
  let database = null;
  await dbconn.opens()
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
 ctx.body = { messagedb: err.message }
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
///         ctx.flushHeaders();
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
    await dbconn.opens()
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
   ctx.body = { message_listados: err.message }
   ctx.status = err.status || 500     // AssertionError [ERR_ASSERTION]: headers have already been sent
 };
//ctx.body = JSON.stringify({ status: 200, body: `${resujs}` });
//ctx.status = 200;
await next();
ctx.body = resujs;   // ReferenceError: resujs is not defined  without ctx.flushHeaders();
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
  ctx.body = { messagesql: err.message }
  ctx.status = err.status || 500
};

  }  // end sqlang()
};  // end pets

console.log('APPS> '+Object.keys(pets.app1));

var rte= '/pets/pets'; var unit = pets.app1.list;
//var uploadm = Multer({dest: '/img'});
app.use(Mount('/pets/hi', pets.app1.hi)); // Internal Serve Error>TypeError:Cannot read property 'middleware' of undefined
app.use(routek.get('/pets/hello', pets.app1.hi)); // Not Found
app.use(routek.get(rte, unit));
app.use(routek.get('/pets/pets/:name', pets.app1.show));
unit = pets.app1.hi;
///app.use(routek.get(rte, pets.hi));
app.use(routek.get('/pets/listad', pets.listados));
app.use(routek.get('/pets/sqlang/:langs', pets.sqlang));
//app.use(routek.post('/pets/uploadm', uploadm.single('avatar')));

//server.listen(nodeport+100); // app.listen(8100);
//console.log('listening on port 8100');
/*
server.listen(parseInt(`${port}+100`), (err) => {
      if (err) {return console.log('app something bad happened', err)}
      console.log(`app server is listening on port: ${port}`)
});
*/


/*
var appone = {login: async function (ctx, next) {
  var User            = require('./models/user');  // ../app/models/user   default  .js
 try {
      var {fields} = await abb(ctx.req);  console.log(util.inspect({fields}));
      var email = fields.email;
      var password = fields.password;
  var userdoc = await User.findOne({'local.email': email}, function (err, userdok) {
                 if (err) {console.log("error find:", err);
                           ctx.throw(400, 'name required', { user: user });}
                 else {console.log('user found:',userdok);}
                 return userdok;
                 });
  if (!userdoc || userdoc === null){userdoc = {};
   userdoc.local = {email: email, password: password};
   var newuser = new User(userdoc);
   await newuser.save(function (err) { if (err) return handleError(err);});
// .save client side read full doc,write atomic diff => find+insert/update => .pre .post middleware
// userdox = await User.create(userdoc_array,   // call n times .save with validators,hooks
// userdox = await User.update({age:{$gt:18}},{multi:true,upsert: true} // mongoose => mongodb
// userdox = await User.users.insert(userdoc_array, // bulk faster native driver
//                      function(err,userdoq_array){if(err) return handleError(err);});
//   await User.register(userdoc, 'userid.local.password', function(err, userdoq) {
//                     if (err) {console.log("error register", err);}
//                     return ctx.render('register', { user : user });
//                     });
}

if (userdoc && userdoc.local.email === email && userdoc.local.password === password) {
         ctx.state.user = {};
         ctx.state.user.email = email;
         ctx.state.user.password = password;
         console.log('logos',ctx.state.user);
         }
//if (ctx.isAuthenticated()){ console.log("passport authenticated!!");}
//if (ctx.isUnauthenticated()){console.log("passport not authenticated!!")}
if (ctx.session){console.log("New session", ctx.session);}
ctx.cookies.set("kyx:user",JSON.stringify({"email": email,"passhash": password}));// = {resp: "login eureka!!"};
console.log("kyx:user"+JSON.parse(ctx.cookies.get("kyx:user")));
ctx.body = ctx.state.user;  // response to browser
// return email;
  } catch (err) {
  ctx.body = { messagelogin: err.message };
  ctx.status = err.status || 500;
  };
}  // end /login
}  // end appone
*/
//const mount2 = require('koa-mount');
//appk.use(mount2.post('/login', appone.login));
