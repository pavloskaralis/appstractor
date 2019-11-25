const mongoose = require('mongoose');
const Schema = mongoose.Schema

const appstraction = new Schema({
    user: {type: String, required: true},
    dom: {type: String, required: true}
});

const Appstraction = mongoose.model('Appstractions', appstraction);
module.exports = Appstraction; 
