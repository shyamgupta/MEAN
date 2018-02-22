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

//Root route
app.get('/',function(req,res){

    res.render('index')

})

// Route processes adding quotes to the database
app.post('/addquote',function(req,res){
    var userquote = new Quote({
        username:req.body.username,
        quote:req.body.userquote
    })
    userquote.save(function(err){
        if(err){
            res.render('saveerror',{err:err});
        }
        else{
            console.log('Quote saved successfully');
            res.redirect('/');
        }
    })
})

//Route displays all quotes from the database
app.post('/showquotes',function(req,res){
    Quote.find({},function(err,allquotes){
        res.render('quotes',{allquotes:allquotes});
    });
})

//Route to go back to home page
app.post('/gohome',function(req,res){
    res.redirect('/');
})

//Listener
app.set('port',8000);
const server = app.listen(app.get('port'),function(){
    let port = server.address().port;
    console.log(`App listening at port ${port}`);
})

