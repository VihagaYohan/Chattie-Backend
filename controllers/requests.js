const ErrorResponse = require('../utility/errorResponse');
const {User} = require('../models/User')
const {Request,requestSchema,requestValidation} = require('../models/Requests')


// @desc    send user request
// @route   POST/api/requests,
// @access  private
exports.sendRequest = async(req,res,next)=>{
    try{
        const {error} = requestValidation(req.body);
        if(error)return next(new ErrorResponse(`${error.details[0].message}`)) 

        // check if the request receiver user exists in the database
        let user = await User.findById({_id:req.body.receiverId});
        if(user == undefined || null) {
            next(new ErrorResponse(`User account does not exists`))
        }

        let {senderId,receiverId,status} = req.body
        let request = new Request({
            senderId:senderId,
            receiverId:receiverId,
            status:status
        })
        request = await request.save();

        res.status(200).json({
            sucess:true,
            data:request
        })
    }catch(
        error
    ){
        next(new ErrorResponse(`${error.message}`,500))
    }
}

// @desc    get all requests for a user 
// @route   GET/api/requests/:userId,
// @access  private
exports.getRequests = async(req,res,next)=>{
    try{
        let allRequsts = await Request.find({receiverId:req.params.userId,
        status:"Requested"});
        res.status(200).json({
            success:true,
            data:allRequsts
        })
    }catch(error){
        next(new ErrorResponse(`${error.message},500`))
    }
}

// @desc    update request
// @route   PUT/api/requests/:requestId
// @access  private
exports.updateRequests = async(req,res,next)=>{
    try{
        let request = await Request.findById(req.params.requestId);
        if(request == null) return res.status(404).json({
            success:false,
            data:"Unable to locate request for given ID"
        }) 

        request.status = req.body.status;
        request = await request.save(); 

        res.status(200).json({
            success:true,
            data:request
        })
    }catch(error){
        next (new ErrorResponse(`${error.message},500`))
    }
}