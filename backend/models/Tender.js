const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  pdfUrl: { type: String, required: true },
  isNewFlash: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tender', tenderSchema);
