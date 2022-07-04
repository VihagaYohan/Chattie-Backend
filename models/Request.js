const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const requestSchema = new mongoose.Schema({
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Requested", "Rejected", "Deleted", "Canceled"],
        default: "Requested"
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
    },
    deletedOn: {
        type: Date,
    }
})

// create request model
const Request = mongoose.model("Request", requestSchema);

// modal validation
const requestValidation = request => {
    const schema = Joi.object({
        receiverUserId: Joi.objectId().required(),
        senderUserId: Joi.objectId().required(),
        status: Joi.string().required(),
    })
    return schema.validate(request)
}

module.exports = {
    requestSchema,
    Request,
    requestValidation
}