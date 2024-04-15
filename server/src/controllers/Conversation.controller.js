const User = require('../models/User.model');
const Conversation = require('../models/Conversation.model');

async function conversations(req, res) {
  const userId = req.userId;

  try {
    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'name email')
      .lean();
    console.log('convertions');
    res.json({ message: 'Conversations fetched', result: conversations });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function startConversation(req, res) {
  // const user = await User.findOne({ _id: req.userId }).select({
  //   _id: 1,
  //   name: 1,
  //   email: 1,
  //   sentRequests: 1,
  //   friendRequests: 1,
  //   friends: 1,
  //   createdAt: 1
  // });
  //
  // res.json({ message: 'User fetched', result: user });
}

module.exports = {
  conversations,
  startConversation
};
