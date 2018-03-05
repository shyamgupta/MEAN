//Import Node and 3rd party modules, set view engine
const express = require('express');
const app = express();
const port = process.env.port || 8080;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'static')));

//Connect Mongoose to the dashboard database
mongoose.connect('mongodb://localhost/dashboard');

//Message Schema & Model
var MessageSchema = new mongoose.Schema({
    username:{type:String,required:true,minlength:4},
    message:{type:String},
    comments : [{type:Schema.Types.ObjectId,ref:'Comment'}]
},{timestamps:true});
var Message = mongoose.model('Message',MessageSchema);

//Comment Schema & Model
var CommentSchema = new mongoose.Schema({
    username:{type:String,required:true,minlength:4},
    _message:{type:Schema.Types.ObjectId,ref:'Message'},
    comment:{type:String}
},{timestamps:true});
var Comment = mongoose.model('Comment',CommentSchema);

//Root route
app.get('/',function(req,res){
    Message.find({})
    .populate('comments')
    .exec(function(err,messages){
        res.render('index',{messages});
    })
})

//Messages route - Saves the message in db and redirected to root route
app.post('/messages',function(req,res){
    var message = new Message(req.body);
    message.save(function(err){
        if(err){
            console.log('Message not saved');
            res.redirect('/');
        }
        else{
            console.log('Message saved');
            res.redirect('/');
        }
    })
})

//Route saves the comment in database
app.post('/messages/:id',function(req,res){
    Message.findOne({_id:req.params.id})
    .then((message)=>{
        var comment = new Comment(req.body);
        comment._message = message._id;
        comment.save()
        .then(()=>{
            message.comments.push(comment);
            message.save()
            .then(()=>{
                res.redirect('/')
            })
            .catch(console.log);
        })
        .catch(console.log)
    })
})

//Listener
app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});
