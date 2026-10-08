const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  pdfUrl: { type: String }, // Optional, can be text notice or PDF attachment
  date: { type: Date, default: Date.now },
  category: { type: String, default: 'General' }, // 'General', 'Recruitment', 'Stipends'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);
