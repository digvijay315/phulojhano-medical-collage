const express = require('express');
const router = express.Router();
const { getNotices, createNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');
const auth = require('../middlewares/auth');

router.get('/', getNotices);
router.post('/', auth, createNotice);
router.put('/:id', auth, updateNotice);
router.delete('/:id', auth, deleteNotice);

module.exports = router;
