const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    picture: {type: String, required: false},
});

module.exports = mongoose.model("Post", Post)