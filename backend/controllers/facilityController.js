const Facility = require('../models/Facility');
const cloudinary = require('cloudinary').v2;

const createFacility = async (req, res) => {
  try {
    const { title, description, imageUrl, category } = req.body;
    const newFac = new Facility({ title, description, imageUrl, category });
    await newFac.save();
    res.status(201).json({ success: true, item: newFac });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getFacilities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    const query = category ? { category } : {};

    const total = await Facility.countDocuments(query);
    const items = await Facility.find(query)
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

const updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;
    const updateData = { title, description };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updated = await Facility.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Facility.findById(id);
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

    await Facility.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createFacility,
  getFacilities,
  updateFacility,
  deleteFacility
};
