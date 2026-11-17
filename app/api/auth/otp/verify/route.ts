import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowRate, authHash, clientSession, getOrCreateClient, normalizeIdentifier } from '@/lib/client-auth';

export async function POST(request: NextRequest) {
  try {
    const { identifier: raw, code, name, phone, gender, education, institution } = await request.json();
    const identifier = normalizeIdentifier(raw);
    if (!identifier || typeof code !== 'string' || code.trim().length < 4) {
      return NextResponse.json({ error: 'Please enter a valid verification code.' }, { status: 400 });
    }
    const { kind, value } = identifier;
    const trimmedCode = code.trim();

    if (!await allowRate(`otp-check:${kind}:${value}`, 50, 60 * 60_000)) {
      return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const challenge = await db.emailLoginCode.findUnique({ where: { email: value } });
    
    // Cryptographically verify the challenge code against stored hash
    const isChallengeValid = Boolean(
      challenge &&
      challenge.codeHash === authHash(`${value}:${trimmedCode}`) &&
      challenge.expiresAt > new Date()
    );

    if (!isChallengeValid) {
      if (challenge) {
        await db.emailLoginCode.update({ where: { email: value }, data: { attempts: { increment: 1 } } });
      }
      return NextResponse.json({ error: 'Invalid or expired code. Please request a new verification code.' }, { status: 401 });
    }

    if (challenge) {
      await db.emailLoginCode.deleteMany({ where: { email: value } });
    }

    let user = await getOrCreateClient(identifier, name);
    if (!user) {
      return NextResponse.json({ error: 'This account cannot use client sign-in.' }, { status: 403 });
    }

    // Update profile if additional fields were passed
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
