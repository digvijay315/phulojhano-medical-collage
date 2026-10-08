const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');
const auth = require('../middlewares/auth');

router.get('/', getContent);
router.put('/', auth, updateContent);

module.exports = router;
