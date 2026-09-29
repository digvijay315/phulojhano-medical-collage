const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  noticeTicker: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
