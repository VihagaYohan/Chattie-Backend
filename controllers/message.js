const mongoose = require('mongoose');
const {Message,messageValidation, messageSchema} = require('../models/Message')
const ErrorResponse = require('../utility/errorResponse')


// @desc    get all messages for a conversation
// @route   GET/api/messages/:conversationId
// @access  private
exports.getAllMessages = async(req,res,next)=>{
    try{
        const messages = await Message.find({conversationId:req.params.conversationId});
        res.status(200).json({
            success:true,
            data:messages
        })
        
    }catch(error){
        next(new ErrorResponse(`${error.message}`, 500))
    }
}

// @desc    create message
// @route   POST/api/messages/:conversationId
// @access  private
exports.createMessage = async(req,res,next)=>{
    try{
        // check for the input validation
        const {error} = await messageValidation(req.body);
        if(error) return next(new ErrorResponse(error.details[0].message,400))
        
        let {conversationId, message, senderId} = req.body
        console.log(req.body)
         let newMessage = await Message({
            conversationId:conversationId,
            message:message,
            senderId:senderId
        })

        newMessage = await newMessage.save();

        res.status(200).json({
            sucess:true,
            data:newMessage
        })
    }catch(error){
        next(new ErrorResponse(`${error.message}`,500))
    }
}
