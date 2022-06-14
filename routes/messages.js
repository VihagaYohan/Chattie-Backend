const express = require('express');

const {getAllMessages,
createMessage} = require('../controllers/message')
const auth = require('../middleware/auth')

const router = express.Router();

router.route('/:conversationId')
.get(auth,getAllMessages).post(auth,createMessage)

module.exports = router;