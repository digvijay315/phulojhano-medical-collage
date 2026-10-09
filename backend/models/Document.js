const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['student_list', 'syllabus', 'result', 'academic_calendar', 'stipend'], 
    required: true 
  },
  isNewFlash: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
