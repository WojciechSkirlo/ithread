const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/Auth.middleware');
const User = require('../models/User.model');

router.get('/me', verifyToken, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });

  res.json({ username: user.username, email: user.email });
});

module.exports = router;
