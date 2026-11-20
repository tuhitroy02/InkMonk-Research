import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowRate, clientSession, getOrCreateClient, normalizeIdentifier } from '@/lib/client-auth';
import { consumeCode } from '@/lib/email-code';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const identifier = normalizeIdentifier(body?.identifier);
    const code = typeof body?.code === 'string' ? body.code.trim() : '';
    const name = typeof body?.name === 'string' ? body.name.trim() : undefined;

    if (!identifier || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: 'Please enter a valid 6-digit verification code.' }, { status: 400 });
    }
    const { kind, value } = identifier;

    // Rate Limiting
    if (!await allowRate(`otp-check:${kind}:${value}`, 20, 60 * 60_000)) {
      console.warn('[AUTH_DIAGNOSTICS] OTP verification rate limit exceeded.');
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    if (kind === 'email') {
      let verified = false;
      try {
        verified = await db.$transaction(async (tx) => {
          return await consumeCode(tx, value, code, 'login');
        });
      } catch (dbErr) {
        console.error('[AUTH_DIAGNOSTICS] OTP verification failed at database transaction stage.');
        return NextResponse.json(
          { error: 'Database service error during verification. Please try again.' },
          { status: 500 }
        );
      }

      if (!verified) {
        console.warn('[AUTH_DIAGNOSTICS] Email OTP verification rejected: code invalid, expired, or maximum attempts exceeded.');
        return NextResponse.json({ error: 'Invalid or expired verification code.' }, { status: 401 });
      }
    } else {
      // Phone OTP Verification via Twilio Verify Check
      const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
      const token = process.env.TWILIO_AUTH_TOKEN?.trim();
      const service = process.env.TWILIO_VERIFY_SERVICE_SID?.trim();

      if (!sid || !token || !service) {
        console.warn('[AUTH_DIAGNOSTICS] Phone OTP verification aborted: Twilio credentials unset.');
        return NextResponse.json({ error: 'SMS verification is not configured.' }, { status: 503 });
      }

      let checkRes: Response;
      try {
        checkRes = await fetch(
          `https://verify.twilio.com/v2/Services/${encodeURIComponent(service)}/VerificationCheck`,
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ To: value, Code: code }),
            cache: 'no-store',
          }
        );
      } catch (networkErr) {
        console.error('[AUTH_DIAGNOSTICS] Phone OTP verification failed at provider check stage: network error.');
        return NextResponse.json(
          { error: 'Failed to connect to SMS verification service. Please try again.' },
          { status: 502 }
        );
      }

      if (!checkRes.ok) {
        console.warn(`[AUTH_DIAGNOSTICS] Phone OTP verification failed: Twilio returned HTTP status ${checkRes.status}.`);
        return NextResponse.json({ error: 'Invalid or expired SMS verification code.' }, { status: 401 });
      }

      const checkData = await checkRes.json();
      if (checkData.status !== 'approved') {
        console.warn('[AUTH_DIAGNOSTICS] Phone OTP verification rejected: status not approved.');
        return NextResponse.json({ error: 'Invalid or expired SMS verification code.' }, { status: 401 });
      }
    }

    // Provision user and return session
    let user;
    try {
      user = await getOrCreateClient(identifier, name);
    } catch (dbErr) {
      console.error('[AUTH_DIAGNOSTICS] OTP verification failed at database user provisioning stage.');
      return NextResponse.json(
        { error: 'Database error occurred while setting up your session. Please try again.' },
        { status: 500 }
      );
    }

    if (!user) {
      console.warn('[AUTH_DIAGNOSTICS] OTP verification user provisioning returned null or user not eligible.');
      return NextResponse.json({ error: 'This account cannot use client sign-in.' }, { status: 403 });
    }

    // Update profile if additional fields were passed
    if (name) {
      try {
        user = await db.user.update({
          where: { id: user.id },
          data: {
            name: name || user.name,
          },
        });
      } catch (err) {
        console.warn('[AUTH_DIAGNOSTICS] Profile update minor error:', err);
      }
    }

    console.info('[AUTH_DIAGNOSTICS] OTP verification successful; issuing client session.');
    return await clientSession(user);
  } catch (error) {
    console.error('[AUTH_DIAGNOSTICS] Unhandled OTP verification error:', error);
    return NextResponse.json({ error: 'Unable to verify code right now.' }, { status: 500 });
  }
}
