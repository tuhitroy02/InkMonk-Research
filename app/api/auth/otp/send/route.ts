import { randomInt } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowRate, authHash, normalizeIdentifier } from '@/lib/client-auth';

export async function POST(request: NextRequest) {
  try {
    const { identifier: raw } = await request.json();
    const identifier = normalizeIdentifier(raw);
    if (!identifier) return NextResponse.json({ error: 'Enter a valid email or phone number.' }, { status: 400 });
    const { kind, value } = identifier;

    const existing = kind === 'email'
      ? await db.user.findUnique({ where: { email: value } })
      : await db.user.findUnique({ where: { phone: value } });
    if (existing && (existing.role !== 'CLIENT' || existing.status !== 'ACTIVE')) {
      return NextResponse.json({ error: 'This account cannot use client OTP sign-in.' }, { status: 403 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!await allowRate(`otp-ip:${ip}`, 50, 60 * 60_000) ||
        !await allowRate(`otp-send:${kind}:${value}`, 20, 60 * 60_000)) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const code = String(randomInt(100_000, 999_999));
    const now = new Date();

    if (kind === 'email') {
      const apiKey = process.env.RESEND_API_KEY;
      const from = process.env.OTP_FROM_EMAIL;
      if (apiKey && from) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              from,
              to: [value],
              subject: 'Your InkMonk Research sign-in code',
              text: `Your InkMonk Research sign-in code is ${code}. It expires in 10 minutes.`,
            }),
            cache: 'no-store',
          });
        } catch (e) {
          console.error('Email send failed:', e);
        }
      }

      await db.emailLoginCode.upsert({
        where: { email: value },
        create: {
          email: value,
          codeHash: authHash(`${value}:${code}`),
          expiresAt: new Date(now.getTime() + 600_000),
          lastSentAt: now,
        },
        update: {
          codeHash: authHash(`${value}:${code}`),
          expiresAt: new Date(now.getTime() + 600_000),
          lastSentAt: now,
          attempts: 0,
          sends: { increment: 1 },
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Verification code generated.',
        codeHint: !apiKey ? code : undefined,
      });
    } else {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const service = process.env.TWILIO_VERIFY_SERVICE_SID;

      if (sid && token && service) {
        try {
          await fetch(`https://verify.twilio.com/v2/Services/${encodeURIComponent(service)}/Verifications`, {
            method: 'POST',
            headers: {
              Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ To: value, Channel: 'sms' }),
            cache: 'no-store',
          });
        } catch (e) {
          console.error('SMS send failed:', e);
        }
      }

      await db.emailLoginCode.upsert({
        where: { email: value },
        create: {
          email: value,
          codeHash: authHash(`${value}:${code}`),
          expiresAt: new Date(now.getTime() + 600_000),
          lastSentAt: now,
        },
        update: {
          codeHash: authHash(`${value}:${code}`),
          expiresAt: new Date(now.getTime() + 600_000),
          lastSentAt: now,
          attempts: 0,
          sends: { increment: 1 },
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Phone verification code generated.',
        codeHint: !sid ? code : undefined,
      });
    }
  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json({ error: 'Unable to dispatch code right now.' }, { status: 500 });
  }
}
