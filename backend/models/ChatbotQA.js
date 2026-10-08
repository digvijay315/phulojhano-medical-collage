const mongoose = require('mongoose');

const chatbotQASchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  keywords: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatbotQA', chatbotQASchema);
