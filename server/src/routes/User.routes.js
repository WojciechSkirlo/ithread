const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
  console.log('GET /user');
  res.json({
    firstName: 'Shawn',
    lastName: 'Samson',
    email: 'shawnsamson@gmail.cm'
  });
});

module.exports = router;
