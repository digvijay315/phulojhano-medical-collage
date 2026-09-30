const Gallery = require('../models/Gallery');
const cloudinary = require('cloudinary').v2;

// Create
const createItem = async (req, res) => {
  try {
    const { title, url, type } = req.body;
    const newItem = new Gallery({ title, url, type });
    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Read with Server-Side Pagination
const getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type; // 'photo' or 'video'

    const query = type ? { type } : {};

    const total = await Gallery.countDocuments(query);
    const items = await Gallery.find(query)
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
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;
    const updated = await Gallery.findByIdAndUpdate(
      id,
      { title, ...(url && { url }) },
      { new: true }
    );
    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    
    // Attempt to delete from cloudinary if it's hosted there
    if (item.url.includes('cloudinary')) {
      try {
        const parts = item.url.split('/');
        const filename = parts.pop().split('.')[0]; // get filename without extension
        const folder = parts.pop();
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId, { resource_type: item.type === 'video' ? 'video' : 'image' });
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr);
        // Continue to delete from DB even if cloud delete fails
      }
    }

    await Gallery.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem
};
