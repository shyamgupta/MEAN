//Require node and 3rd party modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.port || 8080;
app.set('views',path.join(__dirname,'client/views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Connect to database
mongoose.connect('mongodb://localhost/modulardb');

require('./server/models/quote');

//Routes
require('./server/config/routes.js')(app);

//Listener
app.listen(port,function(){
    console.log(`App listening at port ${port}`);
})