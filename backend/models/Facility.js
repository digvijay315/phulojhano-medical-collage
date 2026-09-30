const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // Optional image
  category: { 
    type: String, 
    enum: ['hostel', 'canteen'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Facility', facilitySchema);
