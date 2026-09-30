const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  post: { type: String, required: true },
  department: { type: String, required: true },
  imageUrl: { type: String }, // Optional staff photo
  type: { 
    type: String, 
    enum: ['teaching', 'non-teaching'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', staffSchema);
