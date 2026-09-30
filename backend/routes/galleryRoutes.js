const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

router.post('/', galleryController.createItem);
router.get('/', galleryController.getItems);
router.put('/:id', galleryController.updateItem);
router.delete('/:id', galleryController.deleteItem);

module.exports = router;
