const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
})

// create conversation model
const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = {
    conversationSchema,
    Conversation
}