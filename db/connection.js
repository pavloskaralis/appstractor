const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/' + 'appstraction';

mongoose.connect(mongoURI);