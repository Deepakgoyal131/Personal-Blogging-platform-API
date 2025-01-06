const mongoose = require('mongoose');

const myblogSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    artical: {
        type: String,
        required: true
    },
    publishingDate :{
        type: Date,
        default: Date.now
    }
});

const myBlog = mongoose.model('myBlogs',myblogSchema);

module.exports = myBlog;