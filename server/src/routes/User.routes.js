const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/Auth.middleware');
const controller = require('../controllers/User.controller');

router.get('/me', verifyToken, controller.me);
router.get('/search', verifyToken, controller.search);
router.post('/send-request', verifyToken, controller.sendRequest);

module.exports = router;
