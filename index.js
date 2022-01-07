const express = require('express');
const app = express();
const port = 8000;



app.use('/', require('./routes'));


app.listen(port, function(err) {
    if(err) {
        console.log("error in returning to the server :((",err);
    }
    console.log("YUPP! my server is running on port: ",port);
}) ;