const express = require('express');

const {sendRequest,updateRequest,deleteRequest} = require('../controllers/request')
const auth = require('../middleware/auth')

const router = express.Router();

router.route('/').post(auth,sendRequest)

router.route('/:id').put(auth,updateRequest)
.delete(auth,deleteRequest)

module.exports = router;