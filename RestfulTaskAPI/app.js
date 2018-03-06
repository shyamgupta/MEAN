const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const port = process.env.port || 8080;

//Connect Mongoose to database
mongoose.connect('mongodb://localhost/taskapi');

//Create Schema and Model
var TaskSchema = new mongoose.Schema({
    title:String,
    description:String,
    completed: Boolean,
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}
})
var Task = mongoose.model('Task',TaskSchema);

//Root route - Displays all tasks
app.get('/tasks',function(req,res){
    Task.find({},function(err,tasks){
        if(err){
            console.log(err);
        }
        else{
            res.json(tasks);
        }
    })
})


//Route creates a new task
app.post('/tasks/new',function(req,res){
    var task = new Task(req.body);
    task.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log('Saved');
            res.redirect('/tasks');
        }
    })
})

//Route displays a task by ID
app.get('/tasks/:id',function(req,res){
    Task.find({_id:req.params.id},function(err,task){
        if(err){
            console.log(err);
        }
        else{
            res.json(task);
        }
    })
})

//Route updates a task by ID
app.post('/tasks/:id',function(req,res){
    Task.update({_id:req.params.id},{$set:{
        title:req.body.title,
        description:req.body.description,
        completed: req.body.completed,
        updated_at:new Date()
    }},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Updated');
            res.redirect('/tasks');
        }
    })
})

//Route deletes a task by ID
app.post('/tasks/delete/:id',function(req,res){
    Task.remove({_id:req.params.id},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Task deleted');
            res.redirect('/tasks');
        }
    })
})

//Listener
app.listen(port,function(){
    console.log(`App listening on port ${port}`);
})
