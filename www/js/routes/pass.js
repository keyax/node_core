// const passport = require('koa-passport');
const Router = require('koa-router');

// app/routes.js
module.exports = function(appk, passport) {
require('../auth0.js')(appk, passport); // pass passport for configuration  ./config/passport

const routerkp = new Router(); // new routerkp({prefix: '/corp1'});  //routerkp.prefix('corp1')

/*
    // HOME PAGE (with login links) ========
    routerkp.get('/', async function (ctx, next) { // function(req, res)
        res.render('index.ejs'); // load the index.ejs file
    });
*/
    // LOGIN ===============================
    // show the login form
//    routerkp.get('/logito', console.log('logito ok'));
    routerkp.get('/logito', async function (ctx, next) { // function(req, res)
        // render the page and pass in any flash data if it exists
//        res.render('login.ejs', { message: req.flash('loginMessage') });
    await next();
    console.log({ message: ctx.flash('loginMessage', 'Que pasa!!') });
    });
    // process the login form
    // app.post('/login', do all our passport stuff here);
    // SIGNUP ==============================
    // show the signup form
    routerkp.get('/signup', function(ctx) {
        // render the page and pass in any flash data if it exists
      //  ctx.render('signup.ejs', { message: ctx.flash('signupMessage') });
     console.log({ message: ctx.flash('signupMessage') });
    });
    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    // PROFILE SECTION =====================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    routerkp.get('/profile', isLoggedIn, function(ctx) {
      //  ctx.render('profile.ejs', { user : req.user });// get the user out of session and pass to template
      console.log({ user : ctx.state.user });
    });
    // LOGOUT ==============================
    routerkp.get('/logout', function(ctx) {
        ctx.logout();
        ctx.redirect('/');
    });
    // process the signup form
    routerkp.post('/signup', passport.authenticate('local-signup', {
         successRedirect : '/profile', // redirect to the secure profile section
         failureRedirect : '/signup', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
     }));
     // process the login form
    routerkp.post('/loginpass', passport.authenticate('local-login', {
         successRedirect : '/login', // redirect to the secure profile section
         failureRedirect : '/loginpass', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
     }));
appk.use(routerkp.routes());
appk.use(routerkp.allowedMethods());
return passport;
};
//module.exports = rutas;

// route middleware to make sure a user is logged in
function isLoggedIn(ctx, next) {
// if user is authenticated in the session, carry on
     if (ctx.isAuthenticated())
         return next();
// if they aren't redirect them to the home page
     res.redirect('/');
};
