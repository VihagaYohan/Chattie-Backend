const express = require('express');

const {sendRequest,getRequests,updateRequests} = require('../controllers/requests')
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth,sendRequest)

router.route('/:userId').get(auth,getRequests)

router.route('/:requestId').put(auth,updateRequests)

module.exports = router;