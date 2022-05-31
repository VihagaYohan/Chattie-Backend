const mongoose = require('mongoose');
const Joi = require('Joi');
const joiObjectid = require('joi-objectid');
Joi.objectId = require('joi-objectid')(Joi)

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    deletedOn:{
        type:Date
    }
})

// create message model
const Message = mongoose.model('Message', messageSchema);

// modal validation
const messageValidation = order => {
    const schema = Joi.object({
        conversationId:Joi.objectId().required(),
        message:Joi.string().required(),
        senderId:Joi.objectId().required(),

    })

    return schema.validate(order);
}

module.exports = {
    messageSchema,
    Message,
    messageValidation
} 