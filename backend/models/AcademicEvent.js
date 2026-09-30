const mongoose = require('mongoose');

const academicEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Optional, for multi-day events like vacations or exams
  type: { 
    type: String, 
    enum: ['Exam', 'Holiday', 'Academic', 'Other'],
    default: 'Academic' 
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AcademicEvent', academicEventSchema);
