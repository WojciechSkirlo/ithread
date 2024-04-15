const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
