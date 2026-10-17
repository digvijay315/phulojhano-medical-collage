const Staff = require('../models/Staff');
const cloudinary = require('cloudinary').v2;

const createStaff = async (req, res) => {
  try {
    const { name, post, department, qualification, email, imageUrl, type } = req.body;
    const newStaff = new Staff({ name, post, department, qualification, email, imageUrl, type });
    await newStaff.save();
    res.status(201).json({ success: true, item: newStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStaff = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 12);
    const { type, department, post, search, q } = req.query;

    const query = {};
    if (type) query.type = type;

    if (department && department.trim()) {
      const escapedDept = department.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.department = { $regex: new RegExp(`^${escapedDept}$`, 'i') };
    }

    if (post && post.trim()) {
      const escapedPost = post.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.post = { $regex: new RegExp(`^${escapedPost}$`, 'i') };
    }

    const searchTerm = (search || q || '').trim();
    if (searchTerm) {
      const sRegex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [
        { name: sRegex },
        { qualification: sRegex },
        { email: sRegex },
        { department: sRegex },
        { post: sRegex }
      ];
    }

    const baseFilter = type ? { type } : {};
    const [total, items, allDepartments, allPosts] = await Promise.all([
      Staff.countDocuments(query),
      Staff.find(query)
        .sort({ createdAt: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Staff.distinct('department', baseFilter),
      Staff.distinct('post', baseFilter)
    ]);

    res.status(200).json({
      success: true,
      items,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
      totalItems: total,
      departments: allDepartments.filter(Boolean).sort(),
      posts: allPosts.filter(Boolean).sort()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, post, department, qualification, email, imageUrl } = req.body;
    
    const updateData = { name, post, department, qualification, email };
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
