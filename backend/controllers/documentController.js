const Document = require('../models/Document');
const cloudinary = require('cloudinary').v2;

const createDocument = async (req, res) => {
  try {
    const { title, pdfUrl, category } = req.body;
    const newDoc = new Document({ title, pdfUrl, category });
    await newDoc.save();
    res.status(201).json({ success: true, item: newDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    const query = category ? { category } : {};

    const total = await Document.countDocuments(query);
    const items = await Document.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, pdfUrl } = req.body;
    const updateData = { title };
    if (pdfUrl) updateData.pdfUrl = pdfUrl;

    const updated = await Document.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Document.findById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    
    if (item.pdfUrl.includes('cloudinary')) {
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

    await Document.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument
};
