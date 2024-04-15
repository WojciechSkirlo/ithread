const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/Auth.middleware');
const controller = require('../controllers/Conversation.controller');

router.get('/conversations', verifyToken, controller.conversations);
router.post('/start-conversation', verifyToken, controller.startConversation);

module.exports = router;
