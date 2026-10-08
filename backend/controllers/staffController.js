const Staff = require('../models/Staff');
const cloudinary = require('cloudinary').v2;

const createStaff = async (req, res) => {
  try {
    const { name, post, department, imageUrl, type } = req.body;
    const newStaff = new Staff({ name, post, department, imageUrl, type });
    await newStaff.save();
    res.status(201).json({ success: true, item: newStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStaff = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type;

    const query = type ? { type } : {};

    const total = await Staff.countDocuments(query);
    const items = await Staff.find(query)
      .sort({ createdAt: 1 })
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

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, post, department, imageUrl } = req.body;
    
    const updateData = { name, post, department };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updated = await Staff.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Staff.findById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    
    if (item.imageUrl && item.imageUrl.includes('cloudinary')) {
      try {
        const parts = item.imageUrl.split('/');
        const filename = parts.pop().split('.')[0]; 
        const folder = parts.pop();
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr);
      }
    }

    await Staff.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStaff,
  getStaff,
  updateStaff,
  deleteStaff
};
