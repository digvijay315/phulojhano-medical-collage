const express = require('express');
const router = express.Router();
const academicEventController = require('../controllers/academicEventController');

router.post('/', academicEventController.createEvent);
router.get('/', academicEventController.getEvents);
router.put('/:id', academicEventController.updateEvent);
router.delete('/:id', academicEventController.deleteEvent);

module.exports = router;
