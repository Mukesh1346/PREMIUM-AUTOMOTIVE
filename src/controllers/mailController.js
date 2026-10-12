const transporter = require('../utils/mailer');

// Basic HTML sanitization to prevent HTML injection inside email clients
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Strip CRLF to prevent SMTP Header Injection
function sanitizeHeader(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n\t]/g, ' ').trim();
}

// RFC 5322 standard simple email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

exports.sendEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message, text, hp_website } = req.body;

    // 1. HONEYPOT CHECK: If automated bot filled the hidden honeypot field, drop silently
    if (hp_website && hp_website.trim().length > 0) {
      console.warn('[Security] Honeypot triggered by bot.');
      return res.status(200).json({ message: 'Email sent successfully!' });
    }

    // 2. INPUT VALIDATION
    const senderName = sanitizeHeader(name || 'Website Visitor');
    const senderEmail = (email || '').trim().toLowerCase();
    const contactMessage = (message || text || '').trim();
    const contactPhone = sanitizeHeader(phone || 'Not provided');
    const emailSubject = sanitizeHeader(subject || 'New Contact Inquiry - Premium Automotive');

    if (!senderEmail || !EMAIL_REGEX.test(senderEmail)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!contactMessage || contactMessage.length < 5) {
      return res.status(400).json({ error: 'Message must be at least 5 characters long.' });
    }

    if (contactMessage.length > 4000) {
      return res.status(400).json({ error: 'Message is too long (maximum 4000 characters).' });
    }

    if (senderName.length > 100) {
      return res.status(400).json({ error: 'Name must not exceed 100 characters.' });
    }

    // 3. SECURE RECIPIENT LOCK (PREVENTS OPEN RELAY ATTACK)
    // Destination is LOCKED to the verified business email, never arbitrary user input!
    const targetRecipient = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER || 'Info@sikandstandley.com';
    const senderFrom = process.env.EMAIL_USER || targetRecipient;

    // 4. CLEAN HTML & PLAIN TEXT CONTENT
    const safeName = escapeHtml(senderName);
    const safeEmail = escapeHtml(senderEmail);
    const safePhone = escapeHtml(contactPhone);
    const safeSubject = escapeHtml(emailSubject);
    const safeMessage = escapeHtml(contactMessage).replace(/\n/g, '<br/>');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; color: #1a202c;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">New Website Inquiry</h2>
          <p style="margin: 5px 0 0; font-size: 13px; color: #94a3b8;">Premium Automotive / Sikand Standley Portal</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #475569;">Name:</td>
              <td style="padding: 8px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
              <td style="padding: 8px 0;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Subject:</td>
              <td style="padding: 8px 0;">${safeSubject}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #334155;">Message:</p>
            <div style="line-height: 1.6; color: #1e293b;">${safeMessage}</div>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px 20px; font-size: 12px; color: #64748b; text-align: center;">
          Received via Website Contact Form • Direct Reply will send to: ${safeEmail}
        </div>
      </div>
    `;

    const plainTextContent = `New Website Inquiry:\n\nName: ${senderName}\nEmail: ${senderEmail}\nPhone: ${contactPhone}\nSubject: ${emailSubject}\n\nMessage:\n${contactMessage}\n`;

    // 5. SEND EMAIL WITH SECURE SETTINGS
    await transporter.sendMail({
      from: `"Website Contact Form" <${senderFrom}>`,
      to: targetRecipient,
      replyTo: senderEmail, // Owner can just click Reply to respond to the visitor!
      subject: `[Website Inquiry] ${emailSubject}`,
      text: plainTextContent,
      html: htmlContent,
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    });
  } catch (error) {
    console.error('[Mail Server Error]:', error.message || error);
    // Never leak stack trace or internal SMTP configurations to the client
    return res.status(500).json({
      error: 'Unable to send message at this moment. Please contact us directly at Info@sikandstandley.com',
    });
  }
};
