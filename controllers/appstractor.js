const express = require('express');
const router = express.Router();
//browser screen capture
const capture = require('capture-chrome');
const fs = require('fs');
//model
const Appstraction = require('../models/appstraction.js');
//test variable in absence of user authentification
const currentUser = {username: 'Username', email: 'first.last@gmail.com', password: '12345'}

//GET
    //Index
    router.get('/', (req,res) => {
        res.render('index.ejs');
    });

    //New 
    router.get('/new', (req,res) => {
        res.render('new.ejs');
    });

    //Iframe within New
    router.get('/blank', (req,res) => {
        //username is attached to rendered content to distinguish ownership and retrieve within show + edit route
        res.render('blank.ejs',  {user: currentUser.username});
    });

    //Show + Edit 
    router.get('/show', (req,res) => {
        Appstraction.find({user: currentUser.username}, (err, data) => {
            //data passed for length and id tracking within script; username used to located correct png for download
            //data[0].user created error on heroku when data.length === 0; switched to currentUser.username
            res.render('show.ejs',{data: data, user: currentUser.username}) 
        });
    });

    //Iframe within Show + Edit
    router.get('/saved/:id', (req,res) => {
        //data[req.params.index] could have been used, though ID is more concrete and provides uniformity since delete route requires ID
        Appstraction.findById(req.params.id, (err, doc) => {
            //doc passed to retrieve html content of saved appstraction
            res.render('saved.ejs',{doc: doc});
        });
    }); 

//POST: 
    // Create Document
    router.post('/blank', (req, res) => {
        Appstraction.create(req.body, (err, doc) => {
            res.status(204).send();
        });
    });

    // Create PNG
    router.post('/saved/:id', (req, res) => {
            //capture chrome makes a get request to /saved/:id
            capture({
                url: `http://localhost:3000/saved/${req.params.id}`,
                width: 3600,
                height: 2400,
                }).then(screenshot => {
                fs.writeFileSync(`${__dirname + '/../'}/public/saved/appstractorUsername.png`, screenshot);
                console.log('image saved');
            });
            res.status(204).send();
    });

//PUT (Update)
    router.put('/saved/:id', (req,res) => {
        //$set since only dom property is passed through body
        Appstraction.findByIdAndUpdate(req.params.id,{$set: {dom: req.body.dom}}, {new: true}, (err, doc) => {
            res.status(204).send();
        });
    });

//Delete (Destroy)
    router.delete('/saved/:id', (req, res) => {
        //while the above could have been done with /:index, delete route requires :id
        Appstraction.findByIdAndDelete(req.params.id, (err, doc) => {
            res.status(204).send();
        });
    });

module.exports = router; 


