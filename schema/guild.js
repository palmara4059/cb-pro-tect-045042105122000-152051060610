const mongoose = require('mongoose');
module.exports = mongoose.model('Guilds', new mongoose.Schema({ Guild: String, etat: Boolean }));