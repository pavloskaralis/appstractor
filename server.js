const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

const appstractorController = require('./controllers/appstractor.js');

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/' + 'appstraction';

app.use(express.static('public'));
app.use(methodOverride('_method'));

//required parameters for exporting canvas body document as string 
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb', extended: true}));

app.use('/appstractor', appstractorController);

//Mongoose
mongoose.connect(mongoURI);

//Listen
app.listen(port, (req,res) => console.log('listening'));

