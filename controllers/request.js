const mongoose = require("mongoose");

const { User, userSchema, validationUser } = require('../models/User')
const { Request, requestValidation, requestSchema } = require('../models/Request')
const ErrorResponse = require("../utility/errorResponse");



// @desc    send request
// @route   POST/api/requests/
// @access  private
exports.sendRequest = async (req, res, next) => {
    try {
        // check for the input validation
        const { error } = await requestValidation(req.body);
        if (error) return next(new ErrorResponse(error.details[0].message));

        let { senderUserId,
            receiverUserId,
            status } = res.body

        let friendRequest = await Request({
            receiverUserId: receiverUserId,
            senderUserId: senderUserId,
            status: status
        })

        friendRequest = await friendRequest.save();

        res.status(200).json({
            success: true,
            data: friendRequest
        });

    } catch (error) {
        next(new ErrorResponse(`${error.message}`, 500));
    }
}

// @desc    update request
// @route   PUT/api/requests/:id
// @access  private
exports.updateRequest = async (req, res, next) => {
    try {
        // check for friend request
        let friendRequest = await Request.findById(req.params.id)
        if (!friendRequest) return next(
            new ErrorResponse(`Friend request not found`)
        );

        friendRequest.status = req.body.status;
        friendRequest.updatedOn = Date.now
        friendRequest = await friendRequest.save();

        res.status(200).json({
            success: true,
            data: friendRequest
        })
    } catch (error) {
        next(new ErrorResponse(error.message))
    }
}

// @desc    delete request
// @route   DELETE/api/requests/:id
// @access  private
exports.deleteRequest = async (req, res, next) => {
    try {
        // check for friend request
        let friendRequest = await Request.findByIdAndRemove(req.params.id)
        if (!friendRequest) return next(
            new ErrorResponse(`Friend request not found`)
        );

        res.status(200).json({
            success: true,
            data: friendRequest
        })
    } catch (error) {
        next(new ErrorResponse(error.message))
    }
}