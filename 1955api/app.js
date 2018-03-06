//Import node and 3rd party modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const port = process.env.port || 8080;

//Connect to 1955api database
mongoose.connect('mongodb://localhost/1955api');

//Create schema and model
var PeopleSchema = new mongoose.Schema({
    name:String
});
var People = mongoose.model('People',PeopleSchema);

//Root route - Return JSON of all names in database
app.get('/',function(req,res){
    People.find({},function(err,people){
        if(err){
            console.log(err);
        }
        else{
            res.json(people);
        }
    })
})

//Add new name to database
app.get('/new/:name',function(req,res){
    var person = new People({
        name:req.params.name
    })
    person.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Name Saved!');
            res.redirect('/');
        }
    })
})

//Route displays details of the specified user
app.get('/:name',function(req,res){
    People.find({'name':req.params.name},function(err,person){
        if(err){
            console.log(err);
        }
        else{
            res.json(person);
        }
    })
})

//Route removes the specified user
app.get('/remove/:name',function(req,res){
    People.remove({'name':req.params.name},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('User Deleted');
            res.redirect('/');
        }
    })
})


//Listener
app.listen(port,function(){
    console.log(`App listening on port ${port}`);
})