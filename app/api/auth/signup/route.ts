import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { authHash, clientSession } from '@/lib/client-auth';
import { z } from 'zod';

const SignupSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().trim().min(2).max(100),
  password: z.string().min(8).max(128),
  code: z.string().regex(/^\d{6}$/),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = SignupSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({
      error: 'Enter your name, email, a password of at least 8 characters and a 6-digit email code.',
    }, { status: 400 });
    const { name, password, code } = parsed.data;
    const email = parsed.data.email.trim().toLowerCase();
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({
      error: 'An account already exists for this email. Please sign in or reset your password.',
    }, { status: 409 });
    const challenge = await db.emailLoginCode.findUnique({ where: { email } });
    const expectedHash = authHash(`${email}:${code}`);
    if (!challenge || challenge.expiresAt <= new Date() || challenge.attempts >= 5 ||
        !timingSafeEqual(Buffer.from(challenge.codeHash), Buffer.from(expectedHash))) {
      if (challenge) await db.emailLoginCode.update({ where: { email },
        data: { attempts: { increment: 1 } } }).catch(() => {});
      return NextResponse.json({ error: 'Invalid or expired email verification code.' }, { status: 401 });
    }
    const consumed = await db.emailLoginCode.deleteMany({ where: { email, codeHash: expectedHash,
      expiresAt: { gt: new Date() }, attempts: { lt: 5 } } });
    if (consumed.count !== 1) return NextResponse.json({ error: 'Verification code already used.' }, { status: 401 });
    const user = await db.user.create({ data: { email, name, hashedPassword: await bcrypt.hash(password, 12),
      role: 'CLIENT', status: 'ACTIVE', provider: 'credentials' } });
    return clientSession(user);
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Registration temporarily unavailable.' }, { status: 503 });
  }
}
