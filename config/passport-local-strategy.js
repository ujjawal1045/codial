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

module.exports = passport;