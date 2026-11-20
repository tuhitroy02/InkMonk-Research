import { randomInt } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowRate, authHash, normalizeIdentifier } from '@/lib/client-auth';
import { codeKey, CodePurpose } from '@/lib/email-code';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const identifier = normalizeIdentifier(body?.identifier);
    if (!identifier) {
      return NextResponse.json({ error: 'Enter a valid email or phone number.' }, { status: 400 });
    }
    const { kind, value } = identifier;
    const rawPurpose = typeof body?.purpose === 'string' ? body.purpose.trim().toLowerCase() : '';
    const purpose: CodePurpose = rawPurpose === 'signup' || rawPurpose === 'reset' ? rawPurpose : 'login';

    // Account eligibility and purpose validation
    try {
      const existing = kind === 'email'
        ? await db.user.findUnique({ where: { email: value } })
        : await db.user.findUnique({ where: { phone: value } });

      if (purpose === 'reset' && (!existing || existing.status !== 'ACTIVE' || existing.role !== 'CLIENT')) {
        console.warn('[AUTH_DIAGNOSTICS] OTP send rejected: reset requested for non-existent or inactive user.');
        return NextResponse.json({ error: 'No active account found with this email address.' }, { status: 404 });
      }

      if (purpose === 'signup' && existing) {
        console.warn('[AUTH_DIAGNOSTICS] OTP send rejected: signup requested for existing email address.');
        return NextResponse.json({ error: 'An account with this email already exists. Please sign in.' }, { status: 409 });
      }

      if (purpose === 'login' && existing && (existing.role !== 'CLIENT' || existing.status !== 'ACTIVE')) {
        console.warn('[AUTH_DIAGNOSTICS] OTP send rejected: account not eligible or suspended.');
        return NextResponse.json({ error: 'This account cannot use client OTP sign-in.' }, { status: 403 });
      }
    } catch (dbErr) {
      console.error('[AUTH_DIAGNOSTICS] OTP send failed at database user eligibility stage.');
      return NextResponse.json({ error: 'Database service is currently unavailable. Please try again.' }, { status: 500 });
    }

    // Rate Limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!await allowRate(`otp-ip:${ip}`, 50, 60 * 60_000) ||
        !await allowRate(`otp-send:${kind}:${value}`, 5, 60 * 60_000)) {
      console.warn('[AUTH_DIAGNOSTICS] OTP send rate limit exceeded.');
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    if (kind === 'email') {
      const apiKey = process.env.RESEND_API_KEY?.trim();
      const from = process.env.OTP_FROM_EMAIL?.trim();

      if (!apiKey || !from) {
        console.warn('[AUTH_DIAGNOSTICS] OTP send aborted: Resend configuration missing (RESEND_API_KEY or OTP_FROM_EMAIL unset).');
        return NextResponse.json({ error: 'Email service is not configured. Please contact support.' }, { status: 503 });
      }

      const code = String(randomInt(100_000, 1_000_000));
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 10 * 60_000); // 10 minutes
      const emailKey = codeKey(value, purpose);
      const codeHash = authHash(`${emailKey}:${code}`);

      // Save challenge in DB first
      try {
        await db.emailLoginCode.upsert({
          where: { email: emailKey },
          create: {
            email: emailKey,
            codeHash,
            expiresAt,
            lastSentAt: now,
            attempts: 0,
            sends: 1,
          },
          update: {
            codeHash,
            expiresAt,
            lastSentAt: now,
            attempts: 0,
            sends: { increment: 1 },
          },
        });
      } catch (dbErr) {
        console.error('[AUTH_DIAGNOSTICS] OTP send failed at database challenge stage.');
        return NextResponse.json({ error: 'Database error saving verification challenge. Please try again.' }, { status: 500 });
      }

      // Dispatch via Resend API
      let resendResponse: Response;
      try {
        resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from,
            to: [value],
            subject: 'Your InkMonk Research sign-in code',
            text: `Your InkMonk Research verification code is ${code}. It expires in 10 minutes. If you did not request this, please disregard.`,
          }),
          cache: 'no-store',
          signal: AbortSignal.timeout(10_000),
        });
      } catch (networkErr) {
        console.error('[AUTH_DIAGNOSTICS] OTP send failed at email provider stage: network error connecting to Resend.');
        await db.emailLoginCode.deleteMany({ where: { email: emailKey, codeHash } }).catch(() => {});
        return NextResponse.json({ error: 'Failed to connect to email service. Please try again later.' }, { status: 502 });
      }

      if (!resendResponse.ok) {
        console.error(`[AUTH_DIAGNOSTICS] OTP send failed at email provider stage: Resend returned HTTP status ${resendResponse.status}.`);
        await db.emailLoginCode.deleteMany({ where: { email: emailKey, codeHash } }).catch(() => {});
        return NextResponse.json({ error: 'Failed to dispatch verification email. Please check your address or try again later.' }, { status: 502 });
      }

      console.info('[AUTH_DIAGNOSTICS] Email OTP challenge successfully created and dispatched via Resend.');
      return NextResponse.json({
        success: true,
        message: 'Verification code dispatched to your email.',
      });
    } else {
      // SMS / Phone OTP via Twilio Verify
      const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
      const token = process.env.TWILIO_AUTH_TOKEN?.trim();
      const service = process.env.TWILIO_VERIFY_SERVICE_SID?.trim();

      if (!sid || !token || !service) {
        console.warn('[AUTH_DIAGNOSTICS] Phone OTP send aborted: Twilio Verify credentials unset.');
        return NextResponse.json({ error: 'SMS verification is not configured. Please sign in with email.' }, { status: 503 });
      }

      let twilioResponse: Response;
      try {
        twilioResponse = await fetch(`https://verify.twilio.com/v2/Services/${encodeURIComponent(service)}/Verifications`, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ To: value, Channel: 'sms' }),
          cache: 'no-store',
          signal: AbortSignal.timeout(10_000),
        });
      } catch (networkErr) {
        console.error('[AUTH_DIAGNOSTICS] Phone OTP send failed at SMS provider stage: network error connecting to Twilio.');
        return NextResponse.json({ error: 'Failed to connect to SMS service. Please try again later.' }, { status: 502 });
      }

      if (!twilioResponse.ok) {
        console.error(`[AUTH_DIAGNOSTICS] Phone OTP send failed at SMS provider stage: Twilio returned HTTP status ${twilioResponse.status}.`);
        return NextResponse.json({ error: 'Failed to dispatch SMS verification code. Please try again later.' }, { status: 502 });
      }

      console.info('[AUTH_DIAGNOSTICS] Phone OTP challenge successfully dispatched via Twilio Verify.');
      return NextResponse.json({
        success: true,
        message: 'SMS verification code dispatched.',
      });
    }
  } catch (error) {
    console.error('[AUTH_DIAGNOSTICS] Unhandled OTP send error:', error);
    return NextResponse.json({ error: 'Unable to dispatch verification code right now.' }, { status: 500 });
  }
}
