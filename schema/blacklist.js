const mongoose = require('mongoose');
module.exports = mongoose.model('Blacklist', new mongoose.Schema({ userId: String, etat: Boolean, raison: String }));