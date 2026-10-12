const nodemailer = require('nodemailer');

// Ensure credentials exist
const user = process.env.EMAIL_USER;
// Remove any accidental whitespace or quotes from password
const pass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: (process.env.SMTP_SECURE !== 'false'), // true for 465
  auth: {
    user: user,
    pass: pass,
  },
  // Anti-hang timeouts: Prevents server process from locking up if SMTP hangs
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

module.exports = transporter;
