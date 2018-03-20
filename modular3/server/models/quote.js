const mongoose = require('mongoose');
//Create Schema
var QuoteSChema = new mongoose.Schema({
    username:{type:String,required:true,minlength:2},
    quote:{type:String,required:true,minlength:2,maxlength:100}
},{timestamps:true});

//Register Schema with Mongoose and create model
var Quote = mongoose.model('Quote',QuoteSChema);
module.exports = Quote;