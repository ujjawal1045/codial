const passport =require('passport');

const LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user');


//authentcation using passport
 
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        user.findOne({email:email},function(err, user) {
            if(err) {
                console.log('err in finding user --> passport ');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('invalid username/password');
                return done(null, false);
            }
            return done(null, user);
        });

    }

));

//serialising the user to decide which key is kept int the cokies

passport.serializeUser(function(user,done){
    done(null, user.id);
});

//deserialising the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user){
        if(err){
            console.log('err in finding user --> passport');
            return done(err);
        }
        return done(null, user);
    });
});

//check if the user is authenticated(middleware)
passport.checkAuthentication = function(req, res, next) {
    //if user is signed in then pass on the request to next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user not signedin
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res, next) {
    if (req.isAuthenticated()){
        //req.uesr contains the current signed in user from session cookie and we are just sending to the
        //locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;