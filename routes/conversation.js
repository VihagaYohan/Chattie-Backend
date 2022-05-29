const express = require('express');

const {getAllConversations} = require('../controllers/conversation')

const router = express.Router();

router.route('/').get(getAllConversations);

module.exports = router;