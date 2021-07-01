const mongoose = require("mongoose");

singlePlayList = {
    playListName : String,
    songs : [{}]
}

const playListSchema = new mongoose.Schema({
    userName : String,
    playLists : [singlePlayList]
});

const playList = mongoose.model("playList", playListSchema);

module.exports = playList;
