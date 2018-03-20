const quotes = require('../controller/quotes');
module.exports = function(app){

        //Root route
        app.get('/',function(req,res){
            quotes.index(req,res);
        })

        //Route adds quote to database
        app.post('/addquote',function(req,res){
            quotes.addquote(req,res);
        })

        //Route displays all Quotes
        app.get('/showquotes',function(req,res){
            quotes.showquotes(req,res);
        })



        //Delete a quote
        app.get('/delete/:id',function(req,res){
            quotes.deletequote(req,res);
        })

        //Route displays form to edit a quote
        app.get('/edit/:id',function(req,res){
            quotes.displayquote(req,res);
        })

        //Route updates the quote
        app.post('/update/:id',function(req,res){
            quotes.updatequote(req,res);
        })
}
