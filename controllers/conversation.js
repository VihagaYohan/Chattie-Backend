const mongoose = require('mongoose');
const { Conversation } = require('../models/Conversation');
const ErrorResponse = require('../utility/errorResponse');

// @desc    get all conversations
// @route   GET/api/conversations/
// @access  private
exports.getAllConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find();
        if (!conversations) {
            return next(new ErrorResponse('There are no conversations'));
        }
        res.status(200).json({
            success: true,
            data: conversations
        })
    } catch (error) {
        next(new ErrorResponse(`${error.message}`, 500))
    }
}

// @desc    get all conversations for a user
// @route   GET/api/conversations/:id
// @access  private
exports.getAllConversationsForUser = async (req, res, next) => {
    try {

        let conversations = await Conversation.find({ users: req.user.id })
        res.status(200).json({
            data: conversations
        })
    } catch (error) {
        next(new ErrorResponse(`${error.message}`, 500))
    }
}

// @desc    create a conversation
// @route   POST/api/conversations/
// @access  private
exports.createConversation = async (req, res, next) => {
    try {
        let usersList = req.body.users
        let conversation = await Conversation({
            users: usersList
        })

        conversation = await conversation.save();

        res.status(200).json({
            sucess: true,
            data: conversation
        })
    } catch (error) {
        next(new ErrorResponse(`${error.message}`, 500, error))
    }
}

// @desc    delete a conversation
// @route   DELETE/api/conversations/:id
// @access  private
exports.deleteConversation = async (req, res, next) => {
    try {
        let conversation = await Conversation.deleteOne({ _id: req.params.id })
        let { deletedCount } = conversation
        if (deletedCount == 0) return res.status(401).json({
            sucess: false,
            message: "Unable to locate convesation"
        })

        res.status(200).json({
            sucess: true,
            message: conversation
        })
    } catch (error) {
        next(new ErrorResponse(`${error.message}`, 500))
    }
}