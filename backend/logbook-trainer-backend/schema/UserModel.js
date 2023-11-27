const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: String,
    password: String,
    email: String,
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

