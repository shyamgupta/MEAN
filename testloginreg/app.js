// Require node & 3rd party modules, create app & port
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-as-promised');
const path = require('path');
const port = process.env.port || 8080;

//Configure body-parser
app.use(bodyParser.urlencoded({extended:true}));

//Configure views & EJS
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Configure Mongoose
mongoose.Promise = global.Promise
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/loginreg');

//Create User model
var UserSchema = new mongoose.Schema({
    username:{type:String,required:true,minlength:4},
    password:{type:String,required:true,minlength:6}
})
var User = mongoose.model('User',UserSchema);

app.get('/',function(req,res){
    res.render('index');
})

app.post('/users',function(req,res){
    if(req.body.password === req.body.cpassword){
        console.log(`Password: ${req.body.password}`);
        console.log(`Confirm Password: ${req.body.cpassword}`);
        bcrypt.hash(req.body.password,10)
        .then(password =>{
            var user = new User({
                username:req.body.username,
                password:password
            })
            user.save()
            .then(()=>{
                console.log('User saved');
                res.redirect('/');
            })
            .catch(console.log);
            res.redirect('/');
        })
        .catch(err =>{
            console.log(err);
            res.redirect('/');
        })

    }
    else{
        console.log('Passwords dont match');
        res.redirect('/');
    }
})

//Listener
app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})