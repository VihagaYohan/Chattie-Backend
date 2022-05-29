const mongoose = require('mongoose');
const {Conversation} = require('../models/Conversation');
const ErrorResponse = require('../utility/errorResponse');

// @desc    get all conversations
// @route   GET/api/conversations/
// @access  private
exports.getAllConversations = async(req,res,next)=>{
    try{
        const conversations = await Conversation.find();
        if(!conversations){
            return next(new ErrorResponse('There are no conversations'));
        }
        res.status(200).json({
            success:true,
            data:conversations
        })
    }catch(error){
        next(new ErrorResponse(`${error.message}`,500))
    }
}