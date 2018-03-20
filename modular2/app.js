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

//Create Schema
var QuoteSChema = new mongoose.Schema({
    username:{type:String,required:true,minlength:2},
    quote:{type:String,required:true,minlength:2,maxlength:100}
},{timestamps:true});

//Register Schema with Mongoose and create model
var Quote = mongoose.model('Quote',QuoteSChema);

//Routes
require('./server/config/routes.js')(app);

//Listener
app.listen(port,function(){
    console.log(`App listening at port ${port}`);
})