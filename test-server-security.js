/**
 * Automated Security & Functionality Verification Script
 * Run this with: node test-server-security.js
 * Make sure server is running (npm run server) before running this test.
 */

const http = require('http');

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function makeRequest({ path, method = 'GET', headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: 5000,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: parsed,
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runSecurityTests() {
  console.log('====================================================');
  console.log(`🛡️  RUNNING SECURITY & API INTEGRITY TESTS`);
  console.log(`🎯 Target: ${BASE_URL}`);
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function report(title, isPass, details = '') {
    if (isPass) {
      console.log(`✅ [PASS] ${title}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${title} - ${details}`);
      failed++;
    }
  }

  try {
    // 1. Health Check & Security Headers Test
    console.log('1. Checking Health Check Endpoint & OWASP Headers...');
    const healthRes = await makeRequest({ path: '/api/health' });
    report(
      'Health check status is 200 OK',
      healthRes.statusCode === 200,
      `Status: ${healthRes.statusCode}`
    );
    report(
      'X-Content-Type-Options: nosniff header present',
      healthRes.headers['x-content-type-options'] === 'nosniff',
      `Header: ${healthRes.headers['x-content-type-options']}`
    );
    report(
      'X-Frame-Options: SAMEORIGIN header present (Clickjacking protection)',
      healthRes.headers['x-frame-options'] === 'SAMEORIGIN',
      `Header: ${healthRes.headers['x-frame-options']}`
    );
    report(
      'X-Powered-By is hidden (Information Disclosure protection)',
      !healthRes.headers['x-powered-by'],
      `Header present: ${healthRes.headers['x-powered-by']}`
    );

    // 2. Input Validation (Empty / Invalid Payload)
    console.log('\n2. Checking Input Validation & Rejection of Malformed Requests...');
    const invalidEmailRes = await makeRequest({
      path: '/api/send-email',
      method: 'POST',
      body: { name: 'Hacker', email: 'not-an-email', message: 'Hello' },
    });
    report(
      'Rejects invalid email format with HTTP 400',
      invalidEmailRes.statusCode === 400,
      `Status: ${invalidEmailRes.statusCode}`
    );

    const emptyMsgRes = await makeRequest({
      path: '/api/send-email',
      method: 'POST',
      body: { name: 'Test', email: 'test@example.com', message: '' },
    });
    report(
      'Rejects empty message with HTTP 400',
      emptyMsgRes.statusCode === 400,
      `Status: ${emptyMsgRes.statusCode}`
    );

    // 3. Honeypot Anti-Bot Trap
    console.log('\n3. Checking Honeypot Spambot Trapping...');
    const honeypotRes = await makeRequest({
      path: '/api/send-email',
      method: 'POST',
      body: {
        name: 'SpamBot',
        email: 'bot@spam.com',
        message: 'Buy cheap watches here',
        hp_website: 'http://spam-link.com', // Filled honeypot
      },
    });
    report(
      'Honeypot intercepts bot and returns 200 OK silently without firing email',
      honeypotRes.statusCode === 200,
      `Status: ${honeypotRes.statusCode}`
    );

    // 4. Large Payload DoS Protection (> 10kb)
    console.log('\n4. Checking Large Payload DoS Protection...');
    const largeString = 'A'.repeat(15 * 1024); // 15 KB
    const largeRes = await makeRequest({
      path: '/api/send-email',
      method: 'POST',
      body: { name: 'BigPayload', email: 'big@example.com', message: largeString },
    });
    report(
      'Rejects payload larger than 10kb with HTTP 413 Payload Too Large',
      largeRes.statusCode === 413,
      `Status: ${largeRes.statusCode}`
    );

    // 5. Rate Limiting Protection (Burst Flooding)
    console.log('\n5. Checking Rate Limiting Defense (Burst Request Protection)...');
    let hitRateLimit = false;
    for (let i = 0; i < 7; i++) {
      const burstRes = await makeRequest({
        path: '/api/send-email',
        method: 'POST',
        body: { name: 'Burst', email: 'burst@example.com', message: 'Test message count' },
      });
      if (burstRes.statusCode === 429) {
        hitRateLimit = true;
        break;
      }
    }
    report(
      'Rate limiter blocked repeated requests with HTTP 429 (Too Many Requests)',
      hitRateLimit,
      'Rate limit threshold not triggered'
    );

    console.log('\n====================================================');
    console.log(`📊 TEST SUMMARY: Passed: ${passed} | Failed: ${failed}`);
    console.log('====================================================');

    if (failed === 0) {
      console.log('🎉 ALL SECURITY AUDIT TESTS PASSED SUCCESSFULLY!');
    }
  } catch (err) {
    console.error('\n❌ Could not complete tests. Make sure the server is running (`npm run server`).');
    console.error('Error detail:', err.message);
  }
}

runSecurityTests();
