const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = Schema({

    FirstName: {
        type: String,
        required: false
    },

    LastName: {
        type: String,
        required: false
    },

    Email: {
        type: String,
        required: true
    },

    Subject: {
        type: String,
        required: false
    },

    Message: {
        type: String,
        required: true
    }

});

mongoose.model('message', MessageSchema);