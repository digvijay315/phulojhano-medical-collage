const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Joi schema for validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.login = async (req, res) => {
  try {
    // 1. Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { email, password } = req.body;

    // 2. Find Admin (Fallback to hardcoded for first time setup if db is empty)
    let admin = await Admin.findOne({ email });

    // TEMPORARY: Auto-create admin if not exists (Only for setup phase)
    if (!admin && email === 'admin@gmail.com' && password === 'admin@123') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      admin = await Admin.create({ email, password: hashedPassword });
    }

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 4. Generate JWT
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};
