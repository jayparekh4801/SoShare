const express = require('express');
const mongoose = require("mongoose");
const app = express()
const port = 8000;
const User = require("./User");
const FriendList = require("./FriendList");
const PendingRequestList = require("./PendingRequest");
const PlayList = require("./PlayList");
var bodyParser = require('body-parser');
var cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.urlencoded());
app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json('application/json'));
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));

mongoose.connect('mongodb://localhost/SongShareApp', { useNewUrlParser: true, useUnifiedTopology: true });


// signUp endPoint
app.post("/signUp", (req, res) => {
    User.findOne({ userName: req.body.userName }, (err, success) => {
        if (success) {
            res.send({
                success: false,
                message: "Already Registered",
                data: null
            });
        }
        else {
            let user = new User();
            user.name = req.body.name;
            user.userName = req.body.userName;
            user.emailId = req.body.emailId;
            user.password = req.body.password;
            user.image = "https://bootdey.com/img/Content/avatar/avatar6.png";
            user.save((err, success) => {
                if (err) {
                    res.send({
                        success: false,
                        message: "data not saved",
                        data: err
                    });
                }
                else {
                    let friendList = new FriendList();
                    friendList.userName = req.body.userName;
                    friendList.friendList = [{ userName: "parekhjay0408", image: "https://bootdey.com/img/Content/avatar/avatar6.png" }];
                    friendList.save((err, success) => {
                        if (err) {
                            res.send({
                                success: false,
                                message: "data not saved",
                                data: err
                            });
                        }
                        else {
                            let pendingRequest = new PendingRequestList();
                            pendingRequest.userName = req.body.userName;
                            pendingRequest.friendRequests = [];
                            pendingRequest.save((err, success) => {
                                if (err) {
                                    res.send({
                                        success: false,
                                        message: "data not saved",
                                        data: err
                                    });
                                }
                                else {
                                    let playList = new PlayList();
                                    playList.userName = req.body.userName;
                                    playList.playLists = [];
                                    playList.save((err, success) => {
                                        if (err) {
                                            res.send({
                                                success: false,
                                                message: "data not saved",
                                                data: err
                                            });
                                        }
                                        else {
                                            res.send({
                                                success: true,
                                                message: "saved Succcessfully",
                                                data: null
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// logIn endPoint
app.post("/logIn", (req, res) => {
    User.findOne({ emailId: req.body.emailId, userName: req.body.userName, password: req.body.password }, (err, success) => {
        if (success) {
            res.send({
                success: true,
                message: "log in successfull",
                data: success
            });
        }
        else {
            res.send({
                success: false,
                message: "not Registered",
                data: null
            });
        }
    });
});

// PlayList EndPoint

app.get("/getPlayLists", (req, res) => {
    PlayList.findOne({ userName: req.headers.username }, { playLists: 1, _id: 0 }, (err, success) => {
        if (err) {
            res.send({
                success: false,
                message: "playlist for user not found",
                data: err
            });
        }
        else {
            res.send({
                success: true,
                message: "playlist found",
                data: success
            });
        }
    });
});

// pendingRequests endpoint

app.get("/getPendingRequestList", (req, res) => {
    PendingRequestList.findOne({ userName: req.headers.username }, { friendRequests: 1, _id: 0 }, (err, success) => {
        if (err) {
            res.send({
                success: false,
                message: "pending requests for user not found",
                data: err
            });
        }
        else {
            res.send({
                success: true,
                message: "pending requests found",
                data: success
            });
        }
    });
});

// friendList endpoint

app.get("/getFriendList", (req, res) => {
    FriendList.findOne({ userName: req.headers.username }, { friendList: 1, _id: 0 }, (err, success) => {
        if (err) {
            res.send({
                success: false,
                message: "friendList for user not found",
                data: err
            });
        }
        else {
            res.send({
                success: true,
                message: "feiendList for user is found",
                data: success
            });
        }
    });
});

// Import PlayList 

app.post("/importPlayList", (req, res) => {

    PlayList.findOne({ userName: req.headers.username }, { playLists: 1, _id: 0 }, (err, success) => {
        if (success) {
            let flag = 0;
            success.playLists.forEach(element => {
                if (element.playListName == req.body.playListName) {
                    console.log("padi");
                    element.songs.push(req.body.song)
                    flag = 1;
                }
            });

            // if(flag == 0) {
            //     success.playLists.push({playListName : req.body.playListName, songs : [req.body.song]});
            // }
        }
        PlayList.updateOne({ userName: req.headers.username }, { playLists: success.playLists }, (err, success) => {
            if (success) {
                res.send({
                    success: true,
                    message: "PlayList Updated Successfully",
                    data: null
                })
            }
            else {
                res.send({
                    success: false,
                    message: "PlayList Is Not Updated",
                    data: err
                })
            }
        })
    })
})

// Get User Details endpoint

app.get("/getUserDetails", (req, res) => {
    User.findOne({ userName: req.headers.username }, (err, success) => {
        res.send({
            success: true,
            message: "user Detsails",
            data: {
                name: success.name,
                userName: success.userName,
                emailId: success.emailId,
                image: success.image
            }
        });
    });
});

// search friend endpoint

app.post("/searchFriend", (req, res) => {
    if (req.body.userName != req.headers.username) {
        User.findOne({ userName: req.body.userName }, (err, success) => {
            if (success) {
                let flag = 0;
                let userName = success.userName;
                let image = success.image;
                FriendList.findOne({ userName: req.headers.username }, { friendList: 1, _id: 0 }, (err, success) => {
                    console.log(success)
                    for (let i = 0; i < success.friendList.length; i++) {
                        if (success.friendList[i].userName == req.body.userName) {
                            flag = 1;
                            // console.log(element.userName);
                            res.send({
                                success: true,
                                message: "from friendList",
                                data: {
                                    userName: userName,
                                    image: image,
                                    friends: true
                                }
                            });
                        }
                        else if ((i == success.friendList.length - 1) && (flag == 0)) {
                            PendingRequestList.findOne({ userName: req.headers.username }, { friendRequests: 1, _id: 0 }, (err, success) => {
                                if (success.friendRequests.length != 0) {
                                    for (let j = 0; j < success.friendRequests.length; j++) {
                                        console.log(success.friendRequests[j].userName, req.body.userName)
                                        if (success.friendRequests[j].userName == req.body.userName) {
                                            flag = 1;
                                            res.send({
                                                success: true,
                                                message: "from pending List",
                                                data: {
                                                    userName: userName,
                                                    image: image,
                                                    friends: true
                                                }
                                            });
                                            console.log("after");
                                        }
                                        else if ((j == success.friendRequests.length - 1) && (flag == 0)) {
                                            res.send({
                                                success: true,
                                                message: "User Found",
                                                data: {
                                                    userName: userName,
                                                    image: image,
                                                    friends: false
                                                }
                                            })
                                        }
                                    }
                                }
                                else {
                                    res.send({
                                        success: true,
                                        message: "User Found",
                                        data: {
                                            userName: userName,
                                            image: image,
                                            friends: false
                                        }
                                    })
                                }
                            });
                        }
                    }
                });
            }
            else {
                console.log("sfsasf")
                res.send({
                    success: false,
                    message: "User Does Not Exist",
                    data: err
                });
            }
        })
    }
    else {
        console.log("sfsasf")
        res.send({
            success: false,
            message: "User Does Not Exist",
            data: null
        });
    }
});

// Change User Iamge endpoint

app.post("/changeimage", (req, res) => {
    User.updateOne({ userName: req.headers.username }, { image: req.body.image }, (req, success) => {
        if (success) {
            res.send({
                success: true,
                message: "Image Is Update",
                data: null
            });
        }

        else {
            res.send({
                success: false,
                message: "image is not updated",
                data: err
            });
        }
    });
});

// Send Friend Request endpoint

app.post("/friendRequest", (req, res) => {
    PendingRequestList.updateOne({ userName: req.headers.username }, {
        $push: {
            friendRequests: {
                userName: req.body.userName,
                image: req.body.image,
                request : "sent"
            }
        }
    }, (err, success) => {
        let senderIamge = "";
        User.findOne({userName : req.headers.username}, {image : 1, _id : 0}, (err, success) => {
           console.log(success.image);
           
        })
        if (success) {
            PendingRequestList.updateOne({ userName: req.body.userName }, {
                $push: {
                    friendRequests: {
                        userName: req.headers.username,
                        image: senderIamge,
                        request : "received"
                    }
                }
            }, (err, success) => {
                if (success) {
                    res.send({
                        success: true,
                        message: "Request Is Sent",
                        data: null
                    })
                }
            })
        }
        else {
            res.send({
                success: false,
                message: "Request Not Sent, Please Try Again",
                data: err
            })
        }
    });
})
// endPoints Listener

app.listen(port, () => {
    console.log(`server is start on ${port}`);
});
