const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    text: {
        type: String,
        required: true,
    },

    language: {
        type: String,
        required: true,
    },

    voice: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('History', historySchema)