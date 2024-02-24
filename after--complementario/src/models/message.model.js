const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const MessageModel = mongoose.model("messages", messageSchema);

module.exports = MessageModel; 