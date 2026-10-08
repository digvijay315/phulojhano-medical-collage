const Notice = require('../models/Notice');
const cloudinary = require('cloudinary').v2;

const getNotices = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const items = await Notice.find(query).sort({ date: -1, createdAt: -1 });
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createNotice = async (req, res) => {
  try {
    const { title, description, pdfUrl, date, category } = req.body;
    const newItem = new Notice({ title, description, pdfUrl, date, category });
    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, pdfUrl, date, category } = req.body;
    
    const updateData = { title, description, date, category };
    if (pdfUrl) updateData.pdfUrl = pdfUrl;

    const updated = await Notice.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Notice.findById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    
    // Optional: Delete from cloudinary if it exists
    if (item.pdfUrl && item.pdfUrl.includes('cloudinary')) {
      try {
        const parts = item.pdfUrl.split('/');
        const filename = parts.pop().split('.')[0]; 
        const folder = parts.pop();
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr);
      }
    }

    await Notice.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getNotices, createNotice, updateNotice, deleteNotice };
