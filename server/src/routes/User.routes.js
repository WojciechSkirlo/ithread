const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/Auth.middleware');
const controller = require('../controllers/User.controller');

router.get('/me', verifyToken, controller.me);
router.get('/search', verifyToken, controller.search);
router.get('/requests', verifyToken, controller.requests);
router.post('/send-request', verifyToken, controller.sendRequest);
router.post('/accept-request', verifyToken, controller.acceptRequest);
router.get('/friends', verifyToken, controller.friends);
router.get('/conversations', verifyToken, controller.conversations);
router.post('/start-conversation', verifyToken, controller.startConversation);

module.exports = router;
