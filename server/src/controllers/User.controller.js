const User = require('../models/User.model');

async function me(req, res) {
  const user = await User.findOne({ _id: req.userId }).select({
    _id: 1,
    name: 1,
    email: 1,
    sentRequests: 1,
    friendRequests: 1,
    friends: 1,
    createdAt: 1
  });

  res.json({ message: 'User fetched', result: user });
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
    }).select({
      _id: 1,
      name: 1,
      email: 1,
      sentRequests: 1,
      friendRequests: 1,
      friends: 1,
      createdAt: 1
    });

    res.json({ message: 'Users searched', result: users });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function requests(req, res) {
  const userId = req.userId;

  const requests = await User.findById(userId).populate('friendRequests', 'name email').lean();
  const friendsRequests = requests.friendRequests ?? [];

  res.json({ message: 'Fetched requests', result: friendsRequests });
}

async function sendRequest(req, res) {
  const userId = req.userId;
  const { friendId } = req.body;

  try {
    const user = await User.findById(userId).select({
      _id: 1,
      name: 1,
      email: 1,
      sentRequests: 1,
      friendRequests: 1,
      friends: 1,
      createdAt: 1
    });
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friends.includes(friendId) || user.sentRequests.includes(friendId)) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    friend.friendRequests.push(userId);
    user.sentRequests.push(friendId);

    await user.save();
    await friend.save();

    console.log('user', user);

    res.json({ message: 'Request sent', result: user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function acceptRequest(req, res) {
  const userId = req.userId;
  const { friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    const userIndex = user.friendRequests.indexOf(friendId);
    user.friendRequests.splice(userIndex, 1);

    const friendIndex = friend.sentRequests.indexOf(userId);
    friend.sentRequests.splice(friendIndex, 1);

    await user.save();
    await friend.save();

    res.json({ message: 'Request accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  me,
  search,
  requests,
  sendRequest,
  acceptRequest
};
