const mongoose = require("mongoose");

const pendingRequestSchema = new mongoose.Schema({
    userName : String,
    friendRequests : [{}]
});

const pendingRequestList = mongoose.model("pendingRequestList", pendingRequestSchema);

module.exports = pendingRequestList;
