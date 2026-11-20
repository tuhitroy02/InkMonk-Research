/**
 * Focused Auth Regression Tests
 * Tests Google OAuth origin binding, Resend delivery handling, atomic single-use verification,
 * replay protection, concurrency, and guess limit enforcement.
 */

import assert from 'node:assert';
import { NextRequest } from 'next/server';
import { db } from '../lib/db';
import { authHash } from '../lib/client-auth';
import { codeKey } from '../lib/email-code';
import { getGoogleRedirectUri, getTrustedPublicOrigin } from '../lib/url-helper';
import { GET as googleStartGET } from '../app/api/auth/google/route';
import { GET as providersGET } from '../app/api/auth/providers/route';
import { POST as otpSendPOST } from '../app/api/auth/otp/send/route';
import { POST as otpVerifyPOST } from '../app/api/auth/otp/verify/route';

async function runTests() {
  console.log('=== RUNNING AUTH REGRESSION TEST SUITE ===\n');

  const envMap = process.env as Record<string, string | undefined>;

  // Ensure test environment JWT_SECRET is set
  process.env.JWT_SECRET = 'a'.repeat(32);

  // -------------------------------------------------------------------------
  // TEST 1: Google OAuth Origin Resolution
  // -------------------------------------------------------------------------
  console.log('Test 1: Google OAuth Origin Resolution...');
  {
    // Case 1A: Production environment ignores 0.0.0.0 and arbitrary host headers
    const origEnv = process.env.NODE_ENV;
    envMap.NODE_ENV = 'production';

    const spoofedReq = new NextRequest('http://0.0.0.0:3000/api/auth/google', {
      headers: {
        host: '0.0.0.0:3000',
        'x-forwarded-host': 'attacker-controlled.site',
      },
    });

    const prodOrigin = getTrustedPublicOrigin(spoofedReq);
    assert.strictEqual(
      prodOrigin,
      'https://inkmonkresearch.com',
      'In production, origin must always be https://inkmonkresearch.com regardless of host headers'
    );

    const redirectUri = getGoogleRedirectUri(spoofedReq);
    assert.strictEqual(
      redirectUri,
      'https://inkmonkresearch.com/api/auth/google/callback',
      'Production redirect URI must be the exact registered callback on inkmonkresearch.com'
    );

    // Case 1B: Non-production allows loopback hosts
    envMap.NODE_ENV = 'development';
    const localReq = new NextRequest('http://localhost:3000/api/auth/google', {
      headers: { host: 'localhost:3000' },
    });
    const localOrigin = getTrustedPublicOrigin(localReq);
    assert.strictEqual(localOrigin, 'http://localhost:3000', 'In development, localhost is permitted');

    // Restore
    envMap.NODE_ENV = origEnv;
    console.log('✓ Test 1 Passed: Trusted public origin enforced.');
  }

  // -------------------------------------------------------------------------
  // TEST 2: Google OAuth Start When Unconfigured
  // -------------------------------------------------------------------------
  console.log('Test 2: Google OAuth Start When Unconfigured...');
  {
    const origId = process.env.GOOGLE_CLIENT_ID;
    const origSec = process.env.GOOGLE_CLIENT_SECRET;
    const origEnv = process.env.NODE_ENV;

    envMap.NODE_ENV = 'production';
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;

    const req = new NextRequest('http://0.0.0.0:3000/api/auth/google', {
      headers: { host: '0.0.0.0:3000' },
    });

    const res = await googleStartGET(req);
    assert.strictEqual(res.status, 307, 'Should redirect when unconfigured');
    const location = res.headers.get('location');
    assert.ok(location, 'Must contain Location header');
    assert.ok(
      location.startsWith('https://inkmonkresearch.com/login?error=google-unavailable'),
      `Redirect must use trusted origin https://inkmonkresearch.com, got: ${location}`
    );

    // Restore
    if (origId) process.env.GOOGLE_CLIENT_ID = origId;
    if (origSec) process.env.GOOGLE_CLIENT_SECRET = origSec;
    envMap.NODE_ENV = origEnv;
    console.log('✓ Test 2 Passed: Google start redirects to trusted public origin.');
  }

  // -------------------------------------------------------------------------
  // TEST 3: Provider Availability Endpoint
  // -------------------------------------------------------------------------
  console.log('Test 3: Provider Availability Endpoint...');
  {
    const origResend = process.env.RESEND_API_KEY;
    const origFrom = process.env.OTP_FROM_EMAIL;
    const origGoogleId = process.env.GOOGLE_CLIENT_ID;
    const origTwilio = process.env.TWILIO_ACCOUNT_SID;

    // Unset all credentials
    delete process.env.RESEND_API_KEY;
    delete process.env.OTP_FROM_EMAIL;
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.TWILIO_ACCOUNT_SID;

    const resUnset = await providersGET();
    const dataUnset = await resUnset.json();
    assert.strictEqual(dataUnset.google, false, 'Google should be false when credentials unset');
    assert.strictEqual(dataUnset.email, false, 'Email should be false when credentials unset');
    assert.strictEqual(dataUnset.phone, false, 'Phone should be false when credentials unset');

    // Set Resend only
    process.env.RESEND_API_KEY = 're_test_key_123';
    process.env.OTP_FROM_EMAIL = 'InkMonk <login@inkmonkresearch.com>';
    const resEmailOnly = await providersGET();
    const dataEmailOnly = await resEmailOnly.json();
    assert.strictEqual(dataEmailOnly.email, true, 'Email should be true when Resend configured');
    assert.strictEqual(dataEmailOnly.google, false, 'Google should still be false');

    // Restore
    if (origResend) process.env.RESEND_API_KEY = origResend; else delete process.env.RESEND_API_KEY;
    if (origFrom) process.env.OTP_FROM_EMAIL = origFrom; else delete process.env.OTP_FROM_EMAIL;
    if (origGoogleId) process.env.GOOGLE_CLIENT_ID = origGoogleId;
    if (origTwilio) process.env.TWILIO_ACCOUNT_SID = origTwilio;
    console.log('✓ Test 3 Passed: Provider availability dynamically reflects server configuration.');
  }

  // -------------------------------------------------------------------------
  // TEST 4: OTP Send Route Security (No Code Hint, Resend Requirement)
  // -------------------------------------------------------------------------
  console.log('Test 4: OTP Send Route Security...');
  {
    delete process.env.RESEND_API_KEY;
    delete process.env.OTP_FROM_EMAIL;

    const reqNoResend = new NextRequest('http://localhost:3000/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'test_regression_scholar@example.com' }),
    });

    const resNoResend = await otpSendPOST(reqNoResend);
    assert.strictEqual(resNoResend.status, 503, 'Must return 503 when Resend is unconfigured');
    const dataNoResend = await resNoResend.json();
    assert.strictEqual(dataNoResend.success, undefined, 'Must not report success');
    assert.strictEqual(dataNoResend.codeHint, undefined, 'Never expose codeHint to client');
    console.log('✓ Test 4 Passed: OTP Send fails securely when mailer is unconfigured.');
  }

  // -------------------------------------------------------------------------
  // TEST 5: Master Code Bypass & Invalid Code Rejection
  // -------------------------------------------------------------------------
  console.log('Test 5: Master Code Bypass Rejection...');
  {
    const testEmail = 'scholar_nobypass@example.com';
    const emailKey = codeKey(testEmail, 'login');
    const actualCode = '654321';
    const codeHash = authHash(`${emailKey}:${actualCode}`);

    // Clean up prior test data
    await db.emailLoginCode.deleteMany({ where: { email: emailKey } });

    // Seed challenge with code 654321
    await db.emailLoginCode.create({
      data: {
        email: emailKey,
        codeHash,
        expiresAt: new Date(Date.now() + 600_000),
        lastSentAt: new Date(),
        attempts: 0,
      },
    });

    // Attempt to verify with master code 123456
    const reqBypass = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: testEmail, code: '123456' }),
    });

    const resBypass = await otpVerifyPOST(reqBypass);
    assert.strictEqual(resBypass.status, 401, 'Master code 123456 must be rejected with 401');
    const bypassData = await resBypass.json();
    assert.strictEqual(bypassData.success, undefined, 'Must not issue session for bypass attempt');

    // Verify attempts counter incremented
    const challengeAfterBypass = await db.emailLoginCode.findUnique({ where: { email: emailKey } });
    assert.strictEqual(challengeAfterBypass?.attempts, 1, 'Attempts counter should be incremented');

    console.log('✓ Test 5 Passed: Master code bypass successfully rejected and attempts tracked.');
  }

  // -------------------------------------------------------------------------
  // TEST 6: Guess Limit Enforcement (Max 5 Attempts)
  // -------------------------------------------------------------------------
  console.log('Test 6: Guess Limit Enforcement...');
  {
    const testEmail = 'scholar_guesslimit@example.com';
    const emailKey = codeKey(testEmail, 'login');
    const actualCode = '888999';
    const codeHash = authHash(`${emailKey}:${actualCode}`);

    await db.emailLoginCode.deleteMany({ where: { email: emailKey } });
    await db.emailLoginCode.create({
      data: {
        email: emailKey,
        codeHash,
        expiresAt: new Date(Date.now() + 600_000),
        lastSentAt: new Date(),
        attempts: 4, // 4 prior wrong attempts
      },
    });

    // 5th wrong attempt
    const req5th = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: testEmail, code: '000000' }),
    });

    const res5th = await otpVerifyPOST(req5th);
    assert.strictEqual(res5th.status, 401, '5th wrong guess must be rejected');

    // 6th attempt should find challenge is invalidated / rejected
    const req6th = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: testEmail, code: actualCode }),
    });

    const res6th = await otpVerifyPOST(req6th);
    assert.strictEqual(res6th.status, 401, 'Code must be invalid after exceeding attempts limit');

    console.log('✓ Test 6 Passed: Guess limit strictly enforced.');
  }

  // -------------------------------------------------------------------------
  // TEST 7: Expiration Enforcement
  // -------------------------------------------------------------------------
  console.log('Test 7: Expiration Enforcement...');
  {
    const testEmail = 'scholar_expired@example.com';
    const emailKey = codeKey(testEmail, 'login');
    const actualCode = '777888';
    const codeHash = authHash(`${emailKey}:${actualCode}`);

    await db.emailLoginCode.deleteMany({ where: { email: emailKey } });
    // Seed expired challenge (expired 5 minutes ago)
    await db.emailLoginCode.create({
      data: {
        email: emailKey,
        codeHash,
        expiresAt: new Date(Date.now() - 300_000),
        lastSentAt: new Date(Date.now() - 400_000),
        attempts: 0,
      },
    });

    const reqExpired = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: testEmail, code: actualCode }),
    });

    const resExpired = await otpVerifyPOST(reqExpired);
    assert.strictEqual(resExpired.status, 401, 'Expired code must return 401');

    console.log('✓ Test 7 Passed: Code expiration strictly enforced.');
  }

  // -------------------------------------------------------------------------
  // TEST 8: Atomic Single-Use & Replay Protection
  // -------------------------------------------------------------------------
  console.log('Test 8: Atomic Single-Use & Replay Protection...');
  {
    const testEmail = 'scholar_singleuse@example.com';
    const emailKey = codeKey(testEmail, 'login');
    const actualCode = '345678';
    const codeHash = authHash(`${emailKey}:${actualCode}`);

    await db.emailLoginCode.deleteMany({ where: { email: emailKey } });
    await db.user.deleteMany({ where: { email: testEmail } });

    await db.emailLoginCode.create({
      data: {
        email: emailKey,
        codeHash,
        expiresAt: new Date(Date.now() + 600_000),
        lastSentAt: new Date(),
        attempts: 0,
      },
    });

    // First verification (Valid)
    const reqFirst = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: testEmail, code: actualCode, name: 'Single Use Scholar' }),
    });

    const resFirst = await otpVerifyPOST(reqFirst);
    assert.strictEqual(resFirst.status, 200, 'First verification must succeed with 200');
    const dataFirst = await resFirst.json();
    assert.strictEqual(dataFirst.success, true);
    assert.ok(resFirst.cookies.get('inkmonk_session')?.value, 'Session cookie must be issued');

    // Second verification with the exact same code (Replay Attack)
    const reqReplay = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: testEmail, code: actualCode }),
    });

    const resReplay = await otpVerifyPOST(reqReplay);
    assert.strictEqual(resReplay.status, 401, 'Replay attempt must be rejected with 401');

    // Clean up
    await db.user.deleteMany({ where: { email: testEmail } });
    console.log('✓ Test 8 Passed: Replay attack successfully prevented via single-use atomic consumption.');
  }

  // -------------------------------------------------------------------------
  // TEST 9: Concurrent Verification Race Condition
  // -------------------------------------------------------------------------
  console.log('Test 9: Concurrent Verification Race Condition...');
  {
    const testEmail = 'scholar_concurrent@example.com';
    const emailKey = codeKey(testEmail, 'login');
    const actualCode = '555666';
    const codeHash = authHash(`${emailKey}:${actualCode}`);

    await db.emailLoginCode.deleteMany({ where: { email: emailKey } });
    await db.user.deleteMany({ where: { email: testEmail } });

    await db.emailLoginCode.create({
      data: {
        email: emailKey,
        codeHash,
        expiresAt: new Date(Date.now() + 600_000),
        lastSentAt: new Date(),
        attempts: 0,
      },
    });

    // Fire 5 simultaneous verification requests
    const concurrentRequests = Array.from({ length: 5 }, () =>
      otpVerifyPOST(
        new NextRequest('http://localhost:3000/api/auth/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: testEmail, code: actualCode, name: 'Concurrent Scholar' }),
        })
      )
    );

    const results = await Promise.all(concurrentRequests);
    const successes = results.filter((r) => r.status === 200);
    const failures = results.filter((r) => r.status === 401);

    assert.strictEqual(
      successes.length,
      1,
      `Under concurrent load, EXACTLY 1 request must succeed. Succeeded: ${successes.length}`
    );
    assert.strictEqual(
      failures.length,
      4,
      `Under concurrent load, exactly 4 requests must fail. Failed: ${failures.length}`
    );

    // Clean up
    await db.user.deleteMany({ where: { email: testEmail } });
    console.log('✓ Test 9 Passed: Concurrent race condition prevented (Atomic 1/5 success).');
  }

  // -------------------------------------------------------------------------
  // TEST 10: Phone OTP Rejection When Unconfigured
  // -------------------------------------------------------------------------
  console.log('Test 10: Phone OTP Security When Unconfigured...');
  {
    delete process.env.TWILIO_ACCOUNT_SID;
    delete process.env.TWILIO_AUTH_TOKEN;
    delete process.env.TWILIO_VERIFY_SERVICE_SID;

    const reqPhone = new NextRequest('http://localhost:3000/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: '+919876543210' }),
    });

    const resPhone = await otpSendPOST(reqPhone);
    assert.strictEqual(resPhone.status, 503, 'Phone send must return 503 when Twilio is unconfigured');

    const reqPhoneVerify = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: '+919876543210', code: '123456' }),
    });

    const resPhoneVerify = await otpVerifyPOST(reqPhoneVerify);
    assert.strictEqual(resPhoneVerify.status, 503, 'Phone verify must return 503 when Twilio is unconfigured');

    console.log('✓ Test 10 Passed: Phone OTP securely rejected when unconfigured.');
  }

  console.log('\n=============================================');
  console.log('ALL 10 AUTH REGRESSION TESTS PASSED CLEANLY! ');
  console.log('=============================================\n');
}

runTests().catch((err) => {
  console.error('\n❌ REGRESSION TEST FAILED:', err);
  process.exit(1);
});
