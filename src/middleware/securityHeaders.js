/**
 * Security Headers Middleware (Zero-dependency OWASP hardening)
 * Protects against Clickjacking, MIME-Sniffing, XSS, and Information Disclosure.
 */

function securityHeaders(req, res, next) {
  // Prevent browser MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Block Clickjacking attacks (iframe framing)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Enforce HTTPS HSTS when in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Cross-site scripting filter behavior
  res.setHeader('X-XSS-Protection', '0');

  // Restrict referrer leakage
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict browser permissions/features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Cross-Origin Resource Policy
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  // Prevent caching of sensitive API responses
  if (req.path.startsWith('/api')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
}

module.exports = securityHeaders;
