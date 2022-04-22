const mongoose = require('mongoose');
module.exports = mongoose.model('anti-spam', new mongoose.Schema({ Guild: String, etat: Boolean }));