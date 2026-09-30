require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middlewares
app.use(helmet()); // Secure HTTP headers
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logger

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/tenders', require('./routes/tenderRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/facilities', require('./routes/facilityRoutes'));
app.use('/api/academic-events', require('./routes/academicEventRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
// app.use('/api/content', require('./routes/contentRoutes'));

app.get('/', (req, res) => {
  res.send('Phulo Jhano Medical College API is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
