const express = require('express');

const {sendRequest,getRequests} = require('../controllers/requests')
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth,sendRequest)

router.route('/:userId').get(auth,getRequests)

module.exports = router;