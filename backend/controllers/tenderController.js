const Tender = require('../models/Tender');
const cloudinary = require('cloudinary').v2;

// Create
const createTender = async (req, res) => {
  try {
    const { name, subject, startDate, endDate, pdfUrl } = req.body;
    const newTender = new Tender({ name, subject, startDate, endDate, pdfUrl });
    await newTender.save();
    res.status(201).json({ success: true, item: newTender });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Read with Pagination
const getTenders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await Tender.countDocuments();
    const items = await Tender.find()
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

// Update
const updateTender = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subject, startDate, endDate, pdfUrl } = req.body;
    
    const updateData = { name, subject, startDate, endDate };
    if (pdfUrl) updateData.pdfUrl = pdfUrl;

    const updated = await Tender.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
const deleteTender = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Tender.findById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    
    // Attempt to delete from cloudinary if it's hosted there
    if (item.pdfUrl.includes('cloudinary')) {
      try {
        const parts = item.pdfUrl.split('/');
        const filename = parts.pop().split('.')[0]; 
        const folder = parts.pop();
        const publicId = `${folder}/${filename}`;
        // For PDFs on cloudinary, resource_type is usually 'raw' or 'image' if uploaded as pdf
        // The upload route uses 'raw' for PDFs
        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr);
      }
    }

    await Tender.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTender,
  getTenders,
  updateTender,
  deleteTender
};
