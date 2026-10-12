const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/mailController');
const { mailLimiter } = require('../middleware/rateLimiter');

// Rate-limited contact email submission
router.post('/send-email', mailLimiter, sendEmail);

module.exports = router;
