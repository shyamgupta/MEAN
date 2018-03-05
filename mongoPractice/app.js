const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/postdb');

//Create Schemas
var PostSchema = new mongoose.Schema({
    text:{type:String,required:true},
    comments :[{type:Schema.Types.ObjectId,ref:"Comment"}]
},{timestamps:true});

var CommentSchema = new mongoose.Schema({
    _post:{type:Schema.Types.ObjectId,ref:"Post"},
    text:{type:String,required:true}
},{timestamps:true});

//Create Models
var Post = mongoose.model('Post',PostSchema);
var Comment = mongoose.model('Comment',CommentSchema);


//Root route
app.get('/',function(req,res){
    Post.find()
    .then((posts)=>{
        posts[0].comments[0];
        res.render('index',{posts});
    })
    .catch(console.log);
    
})

//Route displays blog form
app.get('/post',function(req,res){
    res.render('blogform');
})

//Route saves post to database
app.post('/post/save',function(req,res){
    var text = new Post({text:req.body.post});
    text.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Post saved!');
            res.redirect('/');
        }
    })
    
})

//Route saves comment
app.post('/post/:id',function(req,res){
    Post.findOne({_id:req.params.id})
    .then((post)=>{
        var comment = new Comment({text:req.body.comment});
        comment._post = post._id;
        comment.save(function(err){
            post.comments.push(comment);
            post.save(function(err){
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/');
                }
            })
        })
    })
})

//Listener
app.set('port',8000);
const server = app.listen(app.get('port'),function(){
    let port = server.address().port;
    console.log(`App listening at port ${port}`);
})