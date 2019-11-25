const mongoose = require('mongoose');
const mongoURI = 'mongodb://pavlos:B1u3m00n@ds249008.mlab.com:49008/heroku_0thh8tzc';

mongoose.connect(mongoURI);
mongoose.Promise = Promise;

module.exports = mongoose;