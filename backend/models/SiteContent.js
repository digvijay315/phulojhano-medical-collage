const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  noticeTicker: { type: String, required: true },
  popupEnabled: { type: Boolean, default: true },
  popupTitle: { type: String, default: 'Admission Notice' },
  popupDescription: { type: String, default: 'Welcome to our college.' },
  popupLinkText: { type: String, default: 'View Guidelines' },
  popupLinkUrl: { type: String, default: '/academics' }
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
