import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowRate, authHash, clientSession, getOrCreateClient, normalizeIdentifier } from '@/lib/client-auth';

export async function POST(request: NextRequest) {
  try {
    const { identifier: raw, code, name } = await request.json();
    const identifier = normalizeIdentifier(raw);
    if (!identifier || typeof code !== 'string' || !/^\d{6}$/.test(code.trim())) {
      return NextResponse.json({ error: 'Enter the 6-digit verification code.' }, { status: 400 });
    }
    const { kind, value } = identifier;
    if (!await allowRate(`otp-check:${value}`, 10, 3600000)) {
      return NextResponse.json({ error: 'Too many verification attempts.' }, { status: 429 });
    }

    let verified = false;
    if (kind === 'email') {
      const challenge = await db.emailLoginCode.findUnique({ where: { email: value } });
      const actual = authHash(`${value}:${code.trim()}`);
      if (challenge && challenge.expiresAt > new Date() && challenge.attempts < 5 &&
          timingSafeEqual(Buffer.from(challenge.codeHash), Buffer.from(actual))) {
        const consumed = await db.emailLoginCode.deleteMany({ where: {
          email: value, codeHash: actual, expiresAt: { gt: new Date() }, attempts: { lt: 5 },
        } });
        verified = consumed.count === 1;
      } else if (challenge) {
        await db.emailLoginCode.update({ where: { email: value },
          data: { attempts: { increment: 1 } } });
      }
    } else {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const service = process.env.TWILIO_VERIFY_SERVICE_SID;
      if (!sid || !token || !service) return NextResponse.json({ error: 'SMS verification unavailable.' }, { status: 503 });
      const response = await fetch(`https://verify.twilio.com/v2/Services/${encodeURIComponent(service)}/VerificationCheck`, {
        method: 'POST',
        headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ To: value, Code: code.trim() }),
        cache: 'no-store',
      });
      if (response.ok) {
        const result = await response.json();
        verified = result.status === 'approved' && result.valid === true;
      }
    }
    if (!verified) return NextResponse.json({ error: 'Invalid or expired verification code.' }, { status: 401 });

    const user = await getOrCreateClient(identifier, name);
    if (!user) return NextResponse.json({ error: 'Account is not eligible for client access.' }, { status: 403 });
    return clientSession(user);
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: 'Verification temporarily unavailable.' }, { status: 503 });
  }
}
