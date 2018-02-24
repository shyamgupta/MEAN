//Require node and 3rd party modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

//Set views and EJS template engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Use body-parser
app.use(bodyParser.urlencoded({extended:true}));

//Connect Mongoose to animals database
mongoose.connect('mongodb://localhost/animals');

//Create Schema
const AnimalSchema = new mongoose.Schema({
    id:Number,
    type:String,
    numLegs:Number,
    mobilityType:String,
})

//Register schema with mongoose and store the model in a variable
mongoose.model('Animal',AnimalSchema);
var Animal = mongoose.model('Animal');

//Root route - Display list of all animals
app.get('/',function(req,res){
    Animal.find({},function(err,animals){
        if(err){
            console.log(err);
        }
        else{
            res.render('index',{animals:animals})
        }
    })
})

//Route displays form to add a new animal
app.get('/animals/new',function(req,res){
    res.render('newanimal');
})

//Route adds the new animal to database
app.post('/animals',function(req,res){
    var animal = new Animal({
        id:req.body.id,
        type:req.body.type,
        numLegs:req.body.numLegs,
        mobilityType:req.body.mobilityType
    });
    animal.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Successfully added a new animal');
            res.redirect('/');
        }
    })
})

//Route displays information about one animal
app.get('/animals/:id',function(req,res){
    Animal.find({'id':req.params.id},function(err,animal){
        if(err){
            res.send('<h2>Error: Animal not found</h2>');
        }
        else{
            res.render('oneanimal',{animal:animal[0]});
        }
    })
})

// Route displays an edit form to update details
app.get('/animals/edit/:id',function(req,res){
    Animal.find({'id':req.params.id},function(err,animal){
        res.render('editanimal',{animal:animal[0]});
    })
})

//Route updates the values
app.post('/animals/:id',function(req,res){
    
    Animal.update({'id':req.params.id},{$set:{
        'id':req.body.id,
        'type':req.body.type,
        'numLegs':req.body.numLegs,
        'mobilityType':req.body.mobilityType
    }},function(err){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/');
        }
    })

})

//Route deletes the record from the database
app.post('/animals/destroy/:id',function(req,res){
    Animal.remove({'id':req.params.id},function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    })
    
})

// Listener
app.set('port',8000);
const server = app.listen(app.get('port'),function(){
    let port = server.address().port;
    console.log(`App listening at port ${port}`);
}) 