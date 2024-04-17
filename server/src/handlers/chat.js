// const User = require('../models/User.model');
const Message = require('../models/Message.model');

module.exports = (io, socket) => {
  const joinConversation = async (conversationId) => {
    if (!conversationId) return;
    socket.join(conversationId);

    console.log(`User joined conversation ${conversationId}`);

    try {
      const messages = await Message.find({ conversationId });
      io.to(conversationId).emit('loadMessages', messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const leaveConversation = async (conversationId) => {
    if (!conversationId) return;
    socket.leave(conversationId);

    console.log(`User left conversation ${conversationId}`);
  };

  const sendMessage = async ({ senderId, conversationId, text }) => {
    if (!senderId || !conversationId || !text) return;

    const newMessage = new Message({
      senderId,
      conversationId,
      text
    });

    await newMessage.save();
    io.to(conversationId).emit('newMessage', newMessage);
  };

  socket.on('joinConversation', joinConversation);
  socket.on('leaveConversation', leaveConversation);
  socket.on('sendMessage', sendMessage);
};
