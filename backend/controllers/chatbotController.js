const ChatbotQA = require('../models/ChatbotQA');

const getQAs = async (req, res) => {
  try {
    const items = await ChatbotQA.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createQA = async (req, res) => {
  try {
    const { question, answer, keywords } = req.body;
    let keywordArray = [];
    if (keywords && typeof keywords === 'string') {
      keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
    } else if (Array.isArray(keywords)) {
      keywordArray = keywords;
    }

    const newItem = new ChatbotQA({ question, answer, keywords: keywordArray });
    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateQA = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, keywords } = req.body;
    
    let keywordArray = undefined;
    if (keywords !== undefined) {
      if (typeof keywords === 'string') {
        keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      } else if (Array.isArray(keywords)) {
        keywordArray = keywords;
      }
    }

    const updateData = { question, answer };
    if (keywordArray) updateData.keywords = keywordArray;

    const updated = await ChatbotQA.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteQA = async (req, res) => {
  try {
    const { id } = req.params;
    await ChatbotQA.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getQAs, createQA, updateQA, deleteQA };
