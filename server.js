const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const mongoose = require('./db/connection.js')
const appstractorController = require('./controllers/appstractor.js');

app.use(express.static('public'));
app.use(methodOverride('_method'));

//required parameters for exporting canvas body document as string 
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb', extended: true}));

app.use('/', appstractorController);

//Listen
app.listen(port, (req,res) => console.log('listening'));

