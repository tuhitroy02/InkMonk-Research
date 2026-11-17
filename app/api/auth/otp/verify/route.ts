import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowRate, authHash, clientSession, getOrCreateClient, normalizeIdentifier } from '@/lib/client-auth';

export async function POST(request: NextRequest) {
  try {
    const { identifier: raw, code, name, phone, gender, education, institution } = await request.json();
    const identifier = normalizeIdentifier(raw);
    if (!identifier || typeof code !== 'string' || !/^\d{4,8}$/.test(code)) {
      return NextResponse.json({ error: 'Enter a valid verification code.' }, { status: 400 });
    }
    const { kind, value } = identifier;
    if (!await allowRate(`otp-check:${kind}:${value}`, 25, 60 * 60_000)) {
      return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const challenge = await db.emailLoginCode.findUnique({ where: { email: value } });
    if (!challenge || challenge.expiresAt <= new Date() || challenge.attempts >= 8) {
      return NextResponse.json({ error: 'Code expired or invalid. Please request a new code.' }, { status: 401 });
    }

    if (challenge.codeHash !== authHash(`${value}:${code}`)) {
      await db.emailLoginCode.update({ where: { email: value }, data: { attempts: { increment: 1 } } });
      return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 401 });
    }

    await db.emailLoginCode.deleteMany({ where: { email: value } });

    let user = await getOrCreateClient(identifier);
    if (!user) {
      return NextResponse.json({ error: 'This account cannot use client sign-in.' }, { status: 403 });
    }

    // If profile details were supplied in the multi-step onboarding, update user record
    if (name || phone) {
      try {
        user = await db.user.update({
          where: { id: user.id },
          data: {
            name: name || user.name,
            phone: phone || user.phone,
          },
        });
      } catch (err) {
        console.warn('Profile update minor error:', err);
      }
    }

    return clientSession(user);
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: 'Unable to verify code right now.' }, { status: 500 });
  }
}
