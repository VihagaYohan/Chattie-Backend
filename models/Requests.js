const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:['Accepted','Pending','Reject','Sent',"Requested"]
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    updatedOn:{
        type:Date
    },
    deletedOn:{
        type:Date
    }
})

// create request model
const Request = mongoose.model('Request',requestSchema);

// model validation
const requestValidation = request => {
    const schema = Joi.object({
        senderId:Joi.objectId().required(),
        receiverId:Joi.objectId().required(),
        status:Joi.string().required()
    })
    return schema.validate(request)
}

module.exports ={
    requestSchema,
    Request,
    requestValidation
} 