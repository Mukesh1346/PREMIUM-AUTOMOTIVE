require('dotenv').config();
const express = require('express');
const cors = require('cors');
const securityHeaders = require('./middleware/securityHeaders');
const { apiLimiter } = require('./middleware/rateLimiter');
const mailRoutes = require('./routes/mailRoutes');
const transporter = require('./utils/mailer');

const app = express();

// 1. TRUST PROXY: Essential for production deployments behind Cloudflare, Nginx, Render, etc.
app.set('trust proxy', 1);

// 2. INFORMATION DISCLOSURE PROTECTION: Hide Express signature
app.disable('x-powered-by');

// 3. SECURITY HEADERS: OWASP Hardening (Clickjacking, MIME Sniffing, XSS)
app.use(securityHeaders);

// 4. CORS PROTECTION: Strict Origin Whitelisting
const parseAllowedOrigins = () => {
  const envOrigins = process.env.ALLOWED_ORIGINS;
  if (!envOrigins) {
    return ['http://localhost:3000', 'http://127.0.0.1:3000'];
  }
  return envOrigins.split(',').map((o) => o.trim()).filter(Boolean);
};

const allowedOrigins = parseAllowedOrigins();

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, or same-origin server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    } else {
      console.warn(`[Security] Blocked CORS request from untrusted origin: ${origin}`);
      return callback(new Error('Access blocked by CORS policy.'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400, // Preflight cache for 24 hours
};

app.use(cors(corsOptions));

// 5. REQUEST BODY LIMITS: Prevents Memory Exhaustion / Large Payload DoS Attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// 6. GLOBAL API RATE LIMITING
app.use('/api', apiLimiter);

// 7. HEALTH CHECK ENDPOINT (Safe monitoring for Cloudflare, Uptime Robot, etc.)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// 8. APPLICATION ROUTES
app.use('/api', mailRoutes);

// 9. 404 NOT FOUND HANDLER FOR UNMATCHED ROUTES
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found.' });
});

// 10. GLOBAL CENTRALIZED ERROR HANDLER (Prevents Stack Trace Leakage)
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err.message || err);

  if (err.message === 'Access blocked by CORS policy.') {
    return res.status(403).json({ error: 'Cross-origin request denied.' });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    error: isProduction ? 'Internal Server Error' : (err.message || 'Server error'),
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Secure Server running on port: ${PORT}`);
  console.log(`🔒 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🛡️ Rate Limiting & OWASP Headers: Active`);
  console.log(`===============================================`);

  // Verify SMTP Connection asynchronously on startup
  transporter.verify((error) => {
    if (error) {
      console.warn(`⚠️ [SMTP Warning] Could not connect to mail server: ${error.message}`);
      console.warn(`   Verify EMAIL_USER and EMAIL_PASS in your .env file.`);
    } else {
      console.log(`✅ [SMTP Ready] Mail server connection verified successfully.`);
    }
  });
});

// 11. GRACEFUL SHUTDOWN HANDLERS
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Closing server gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = app;
