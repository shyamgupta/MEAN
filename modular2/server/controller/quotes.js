const mongoose = require('mongoose');
const Quote = mongoose.model('Quote');
class QuoteController{
    index(req,res){
        res.render('index.ejs');
    }
    addquote(req,res){
        var quote = new Quote(req.body);
            quote.save()
            .then(()=>{
                console.log('Quote added to database');
                res.redirect('/');
            })
            .catch(console.log);
    }
    showquotes(req,res){
        Quote.find({})
            .then((quotes)=>{
                res.render('quotes.ejs',{quotes});
            })
            .catch(console.log);
    }
    deletequote(req,res){
        Quote.remove({_id:req.params.id})
            .then(()=>{
                console.log('Record deleted');
                res.redirect('/');
            })
            .catch(console.log);
    }
    displayquote(req,res){
        Quote.find({_id:req.params.id})
            .then((quote)=>{
                res.render('update.ejs',{quote});
            })
            .catch(console.log);
    }
    updatequote(req,res){
        Quote.findOne({_id:req.params.id})
            .then((quote)=>{
                quote.username = req.body.username;
                quote.quote = req.body.quote;
                quote.save();
                res.redirect('/showquotes');
            })
            .catch(console.log)
    }
}
module.exports = new QuoteController();