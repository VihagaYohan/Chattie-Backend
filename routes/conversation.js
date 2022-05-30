const express = require('express');

const { getAllConversations, createConversation,
    getAllConversationsForUser } = require('../controllers/conversation')
const auth = require('../middleware/auth')

const router = express.Router();

router.route('/').get(getAllConversations).post(auth, createConversation);

router.route('/:userId').get(auth,getAllConversationsForUser)

module.exports = router;