const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Adjust path to your model

// FIX: Change '/api/contact' to '/'
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create and save the new message to MongoDB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Server error. Could not send message." });
  }
});

module.exports = router;