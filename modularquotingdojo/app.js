//Require node & 3rd party modules
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set the EJS view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Set body-parser
app.use(bodyParser.urlencoded({extended:true}));

//Connect to quotes database
mongoose.connect('mongodb://localhost/quotesdb');

//Create Schema
var QuoteSchema = new mongoose.Schema({
    username:{type:String,required:true,minlength:2},
    quote:{type:String,required:true,minlength:2,maxlength:100}
},{timestamps:true});

//Register QuoteSchema with Mongoose and store it in Quote variable
mongoose.model('Quote',QuoteSchema);
var Quote = mongoose.model('Quote');

require('./server/config/routes.js')(app);

//Listener
app.set('port',8000);
const server = app.listen(app.get('port'),function(){
    let port = server.address().port;
    console.log(`App listening at port ${port}`);
})

