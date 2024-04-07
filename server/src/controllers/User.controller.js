const User = require('../models/User.model');

async function me(req, res) {
  const user = await User.findOne({ _id: req.userId }).select({ name: 1, email: 1 });

  res.json(user);
}

async function search(req, res) {
  const query = req.query.q ?? '';
  const userId = req.userId;

  try {
    const users = await User.find({
      $and: [
        {
          $or: [{ name: { $regex: query, $options: 'i' } }, { email: { $regex: query, $options: 'i' } }],
          $nor: [{ _id: userId }]
        }
      ]
    }).select({ name: 1, email: 1, _id: 1 });
    console.log('users', users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function sendRequest(req, res) {
  const userId = req.userId;
  const { friendId } = req.body;

  console.log('userId', userId);
  console.log('friendId', friendId);

  // const query = req.query.q ?? '';
  // const userId = req.userId;
  //
  // try {
  //   const users = await User.find({
  //     $and: [{
  //       $or: [{ name: { $regex: query, $options: 'i' } }, { email: { $regex: query, $options: 'i' } }],
  //       $nor: [{ _id: userId }]
  //     }]
  //   }).select({ name: 1, email: 1, _id: 1 });
  //   console.log('users', users);
  //   res.json(users);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
}

module.exports = {
  me,
  search,
  sendRequest
};
