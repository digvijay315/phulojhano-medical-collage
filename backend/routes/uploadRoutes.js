const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToCloudinary } = require('../controllers/uploadController');

// Configure multer for temp storage before uploading to Cloudinary
const upload = multer({ dest: 'uploads/' });

// Upload route (supports multiple files)
router.post('/upload-files', upload.array('files'), uploadToCloudinary);

module.exports = router;
