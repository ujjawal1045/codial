const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());
//setting cookie parser
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//middleware
app.use(session({
    name: 'coedial',
    //todo change the secret before deployent in production mode
    secret: 'blabla',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));



app.listen(port, function(err) {
    if(err) {
        console.log("error in returning to the server :((",err);
    }

    console.log("YUPP! my server is running on port: ",port);
}) ;


