const mongoose = require('mongoose');
Quote = mongoose.model('Quote');

module.exports = function(app){
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
}