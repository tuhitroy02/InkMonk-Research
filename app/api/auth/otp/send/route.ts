import { randomInt } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowRate, authHash, normalizeIdentifier } from '@/lib/client-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const identifier = normalizeIdentifier(body?.identifier);
    if (!identifier) return NextResponse.json({ error: 'Enter a valid email or phone number.' }, { status: 400 });
    const { kind, value } = identifier;
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!await allowRate(`otp-ip:${ip}`, 30, 3600000) ||
        !await allowRate(`otp-send:${value}`, 5, 3600000)) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const existing = kind === 'email'
      ? await db.user.findUnique({ where: { email: value } })
      : await db.user.findUnique({ where: { phone: value } });
    if (existing && (existing.role !== 'CLIENT' || existing.status !== 'ACTIVE')) {
      return NextResponse.json({ error: 'This account cannot use client OTP sign-in.' }, { status: 403 });
    }

    if (kind === 'email') {
      const apiKey = process.env.RESEND_API_KEY;
      const from = process.env.OTP_FROM_EMAIL;
      if (!apiKey || !from) return NextResponse.json({ error: 'Email verification is temporarily unavailable.' }, { status: 503 });

      const code = String(randomInt(100000, 1000000));
      const now = new Date();
      await db.emailLoginCode.upsert({
        where: { email: value },
        create: { email: value, codeHash: authHash(`${value}:${code}`),
          expiresAt: new Date(now.getTime() + 600000), lastSentAt: now },
        update: { codeHash: authHash(`${value}:${code}`), expiresAt: new Date(now.getTime() + 600000),
          lastSentAt: now, attempts: 0, sends: { increment: 1 } },
      });

      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to: [value], subject: 'Your InkMonk Research sign-in code',
            text: `Your InkMonk Research verification code is ${code}. It expires in 10 minutes.` }),
          cache: 'no-store',
        });
        if (!res.ok) throw new Error(`Email provider responded with ${res.status}`);
      } catch (error) {
        await db.emailLoginCode.deleteMany({ where: { email: value, codeHash: authHash(`${value}:${code}`) } }).catch(() => {});
        console.error('OTP email delivery failure:', error);
        return NextResponse.json({ error: 'Unable to deliver email verification. Please retry.' }, { status: 503 });
      }
    } else {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const service = process.env.TWILIO_VERIFY_SERVICE_SID;
      if (!sid || !token || !service) return NextResponse.json({ error: 'SMS verification is temporarily unavailable.' }, { status: 503 });
      const res = await fetch(`https://verify.twilio.com/v2/Services/${encodeURIComponent(service)}/Verifications`, {
        method: 'POST',
        headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ To: value, Channel: 'sms' }),
        cache: 'no-store',
      });
      if (!res.ok) return NextResponse.json({ error: 'Unable to send SMS verification. Please retry.' }, { status: 503 });
    }

    return NextResponse.json({ success: true, message: 'Verification code sent.' },
      { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json({ error: 'Verification temporarily unavailable.' }, { status: 503 });
  }
}
