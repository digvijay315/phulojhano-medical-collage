const express = require('express');
const router = express.Router();
const { getQAs, createQA, updateQA, deleteQA } = require('../controllers/chatbotController');
const auth = require('../middlewares/auth');

router.get('/', getQAs);
router.post('/', auth, createQA);
router.put('/:id', auth, updateQA);
router.delete('/:id', auth, deleteQA);

module.exports = router;
