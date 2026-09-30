const AcademicEvent = require('../models/AcademicEvent');

const createEvent = async (req, res) => {
  try {
    const newEvent = new AcademicEvent(req.body);
    await newEvent.save();
    res.status(201).json({ success: true, item: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    // Fetch all events sorted by start date ascending (upcoming first)
    const items = await AcademicEvent.find().sort({ startDate: 1 });
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const updated = await AcademicEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await AcademicEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
};
