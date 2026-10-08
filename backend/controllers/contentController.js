const SiteContent = require('../models/SiteContent');

const getContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent({
        phone: '06432 299 927',
        email: 'principal.pjmc@gmail.com',
        noticeTicker: 'Welcome to Phulo Jhano Medical College.',
        popupEnabled: true,
        popupTitle: 'Admission Notice',
        popupDescription: 'The admission process is now live.',
        popupLinkText: 'View Guidelines',
        popupLinkUrl: '/academics'
      });
      await content.save();
    }
    res.status(200).json({ success: true, item: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const updateData = req.body;
    let content = await SiteContent.findOne();
    
    if (content) {
      Object.assign(content, updateData);
      await content.save();
    } else {
      content = new SiteContent(updateData);
      await content.save();
    }
    
    res.status(200).json({ success: true, item: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getContent, updateContent };
