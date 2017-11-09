
const Router = require('koa-router');
const routerk = new Router();  // new routerk({prefix: '/corp1'});  //routerk.prefix('corp1')


// app/routes.js
function pas(passport) {

  require('../auth0.js')(passport); // pass passport for configuration  ./config/passport
/*
    // HOME PAGE (with login links) ========
    routerk.get('/', async function (ctx, next) { // function(req, res)
        res.render('index.ejs'); // load the index.ejs file
    });
*/
    // LOGIN ===============================
    // show the login form
    routerk.get('/login', async function (ctx, next) { // function(req, res)
        // render the page and pass in any flash data if it exists
//        res.render('login.ejs', { message: req.flash('loginMessage') });
       console.log("msg from pass.js /login");
    });
    // process the login form
    // app.post('/login', do all our passport stuff here);
    // SIGNUP ==============================
    // show the signup form
    routerk.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    // PROFILE SECTION =====================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    routerk.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    // LOGOUT ==============================
    routerk.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // process the signup form
    routerk.post('/signup', passport.authenticate('local-signup', {
         successRedirect : '/profile', // redirect to the secure profile section
         failureRedirect : '/signup', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
     }));
     // process the login form
    routerk.post('/loginp', passport.authenticate('local-login', {
         successRedirect : '/profile', // redirect to the secure profile section
         failureRedirect : '/login', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
     }));
};

module.exports = routerk;
// route middleware to make sure a user is logged in
function isLoggedIn(ctx, next) {
    // if user is authenticated in the session, carry on
    if (ctx.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
};
