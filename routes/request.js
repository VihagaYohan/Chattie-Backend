const express = require('express');

const {sendRequest} = require('../controllers/requests')
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth,sendRequest);

module.exports = router;