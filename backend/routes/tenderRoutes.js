const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');

router.post('/', tenderController.createTender);
router.get('/', tenderController.getTenders);
router.put('/:id', tenderController.updateTender);
router.delete('/:id', tenderController.deleteTender);

module.exports = router;
