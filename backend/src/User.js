const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    name : String,
    emailId : String,
    userName :String,
    password :String,
    image : String
});

const user = mongoose.model('user', userSchema);

module.exports = user;

