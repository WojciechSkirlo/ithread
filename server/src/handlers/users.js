// const User = require('../models/User.model');
const Message = require('../models/Message.model');

module.exports = (io) => {
  // async function usersList(userId) {
  //   if (!userId) return;
  //
  //   const requests = await User.findById(userId).populate('friendRequests', 'name email').lean();
  //
  //   const friendsRequests = requests.friendRequests;
  //
  //   console.log('requests', friendsRequests);
  // }
  //
  // async function message({ sender, receiver, text }) {
  //
  //   console.log('asdasdasd', sender, receiver, text);
  //
  //   if (!sender || !receiver || !text) return;
  //
  //   const newMessage = new Message({
  //     sender,
  //     receiver,
  //     text
  //   });
  //
  //   await newMessage.save();
  //
  //   io.emit('message', newMessage);
  //
  //   // io.to(sender).to(receiver).emit('message', newMessage);
  //
  //   // const newUser = new User({
  //   //   name,
  //   //   email,
  //   //   password: hashedPassword
  //   // });
  //
  //   // await newUser.save();
  //
  //   // const userId = socket.handshake.auth.userId;
  //
  //
  //   // if (!userId) return;
  //   //
  //   // const requests = await User.findById(userId).populate('friendRequests', 'name email').lean();
  //   //
  //   // const friendsRequests = requests.friendRequests;
  //   //
  //   // console.log('requests', friendsRequests);
  // };

  async function sendMessage({ senderId, receiverId, conversationId, text }) {
    console.log('asdasdasd', senderId, receiverId, conversationId);

    if (!senderId || !receiverId || !text) return;

    const newMessage = new Message({
      senderId,
      receiverId,
      text
    });

    await newMessage.save();

    io.emit('message', newMessage);
  }

  return {
    // message,
    sendMessage
  };
};
