const express = require('express');
const router = express.Router();
const controller = require('../controllers/Auth.controller');

router.post('/sign-up', controller.signUp);
// router.get('/sign-in', controller.signIn);
// router.put('/sign-out', controller.signOut);

module.exports = router;
