const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

const appstractorController = require('./controllers/appstractor.js');

const mongoose = require('mongoose');
const mongoURI = 'mongodb://heroku_0thh8tzc:B1u3m00n@ds249008.mlab.com:49008/heroku_0thh8tzc';

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

