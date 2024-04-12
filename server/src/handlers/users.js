const User = require('../models/User.model');

module.exports = (io) => {
  async function usersList(userId) {
    if (!userId) return;

    const requests = await User.findById(userId).populate('friendRequests', 'name email').lean();

    const friendsRequests = requests.friendRequests;

    console.log('requests', friendsRequests);
  }

  return {
    usersList
  };
};
