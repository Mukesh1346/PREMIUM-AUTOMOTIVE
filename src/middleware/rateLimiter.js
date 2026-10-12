/**
 * High-performance In-Memory Sliding-Window Rate Limiter
 * Protects server endpoints from DDoS, Brute-Force, and Spam Flooding.
 */

function createRateLimiter(options) {
  const windowMs = options.windowMs || 15 * 60 * 1000; // default 15 minutes
  const maxRequests = options.max || 5; // default 5 requests per window
  const message = options.message || {
    error: 'Too many requests. Please try again later.',
  };

  // Map to hold IP -> array of timestamps
  const ipMap = new Map();

  // Periodic cleanup of expired entries every 5 minutes to prevent memory leaks
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of ipMap.entries()) {
      const valid = timestamps.filter((t) => now - t < windowMs);
      if (valid.length === 0) {
        ipMap.delete(ip);
      } else {
        ipMap.set(ip, valid);
      }
    }
  }, 5 * 60 * 1000);

  // Allow Node process to exit gracefully without keeping event loop alive
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return (req, res, next) => {
    // Extract client IP (respecting reverse proxy if trust proxy is configured)
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp =
      (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null) ||
      req.ip ||
      req.socket.remoteAddress ||
      'unknown-ip';

    const now = Date.now();
    const timestamps = (ipMap.get(clientIp) || []).filter((t) => now - t < windowMs);

    if (timestamps.length >= maxRequests) {
      const oldest = timestamps[0];
      const retryAfterSeconds = Math.ceil((windowMs - (now - oldest)) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);
      return res.status(429).json(message);
    }

    timestamps.push(now);
    ipMap.set(clientIp, timestamps);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - timestamps.length));

    next();
  };
}

// Strict limiter for sending emails: 5 emails per 15 minutes per IP
const mailLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many email requests from this network. Please wait a few minutes before trying again.',
  },
});

// General limiter for general API routes: 100 requests per 15 minutes per IP
const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests. Please slow down and try again shortly.',
  },
});

module.exports = {
  createRateLimiter,
  mailLimiter,
  apiLimiter,
};
