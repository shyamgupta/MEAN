//Require node and 3rd party modules
const express = require('express');
const app = express();
const path = require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
const port = process.env.port || 8080;
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const bcrypt = require('bcrypt-as-promised');
const session = require('express-session');
app.use(session({
    secret:'ThisIsASecretKey',
    resave:true,
    saveUninitialized:true
}));

//Connect to database
mongoose.connect('mongodb://localhost/loginreg');

//Create Schema and Model
var UserSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true,"Email field cannot be blank"],
        unique:[true,'Email is already registered. Please use a different email address.'],
        validate:[
            {
                validator:function(email){
                    return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
                },
                message:"Not a valid email address."    
            }
        ]
    },
    first:{
        type:String,
        required:[true,"First name should be minimum 2 characters"],
        minlength:[2,"First name should be minimum 2 characters"]
    },
    last:{
        type:String,
        required:[true,"Last name should be minimum 2 characters"],
        minlength:[2,"Last name should be minimum 2 characters"]
    },
    password:{type:String,
        required:true,
        minlength:[6,"Password should be minimum 6 characters"],
    },
    dob:{type:Date,required:true}
});



//validate that email address is unique
UserSchema.plugin(uniqueValidator,{message:`{PATH} is already registered. Please use a unique email address.`});

//pre-save hook for encrypting password
UserSchema.pre('save',function(next){
    if(this.isNew || this.isModified('password')){
        bcrypt.hash(this.password,10)
        .then(hash=>{
            this.password = hash;
            next();
            })
        .catch((err)=>{
            console.log(err);
            next();
        })
    }
})

//
UserSchema.pre('save',function(next){
    
})



//Create User model
var User = mongoose.model('User',UserSchema);


//Root route - Displays registration and login forms
app.get('/',function(req,res){
    res.render('index.ejs');
})

//Register user
app.post('/register',function(req,res){
    console.log(req.body);
    let user = new User(req.body);
    if(req.body.password === req.body.cpassword){
        user.save()
    .then(()=>{
        res.redirect('/');
    })
    .catch(err =>{
        res.json(err);
    });
    }
    else{
        console.log('Passwords do not match');
        res.redirect('/');
    }
})


//Listener
app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})