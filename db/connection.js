// for local connection
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'appstraction';

mongoose.connect(mongoURI);
mongoose.Promise = Promise;

module.exports = mongoose;