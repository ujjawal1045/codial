const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// use express router
app.use('/', require('./routes'));

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err) {
    if(err) {
        console.log("error in returning to the server :((",err);
    }
    console.log("YUPP! my server is running on port: ",port);
}) ;