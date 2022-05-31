const express = require('express');

const { getAllConversations, createConversation,
    getAllConversationsForUser,
    deleteConversation } = require('../controllers/conversation')
const auth = require('../middleware/auth')

const router = express.Router();

router.route('/').get(getAllConversations).post(auth, createConversation);

router.route('/:userId').get(auth, getAllConversationsForUser)

router.route('/:id').delete(auth, deleteConversation)

module.exports = router;