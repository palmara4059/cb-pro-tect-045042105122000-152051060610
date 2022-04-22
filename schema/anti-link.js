const mongoose = require('mongoose');
module.exports = mongoose.model('anti-link', new mongoose.Schema({ Guild: String, etat: Boolean }));