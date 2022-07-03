const ErrorResponse = require('../utility/errorResponse')

const { Message, messageSchema, messageValidation } = require('../models/Message')

// get all messages for a conversation
exports.getAllMessages = async (id) => {
    try {
        const messages = await Message.find({
            conversationId: id
        })
        return messages;
    } catch (e) {
        console.log(e)
    }
}

// save message
exports.saveMessage = async (messageObj) => {
    try {

        // get messages list
        let messagesList = await Message.find({
            conversationId: messageObj.conversationId
        })

        console.log('new message')
        console.log(messageObj)
        // check for message input validation
        /* const { error } = await messageValidation(messageObj);
        if (error) return next(new ErrorResponse(error.details[0].message, 400)); */



        let { conversationId, message, senderId } = messageObj;
        let newMessage = new Message({
            conversationId: conversationId,
            senderId: senderId,
            message: message
        })

        newMessage = await newMessage.save();

        messagesList.push(newMessage)

        return messagesList;
    } catch (e) {
        console.log(e)
    }
}
