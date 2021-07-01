const mongoose = require("mongoose");

const friendListSchema = new mongoose.Schema({
    userName : String,
    friendList : [{}]
});

const friendList = mongoose.model("friendList", friendListSchema);

module.exports = friendList;
