import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { allowRate, authHash } from '@/lib/client-auth';
import { z } from 'zod';

const ResetSchema = z.object({
  email: z.string().email().max(254),
  code: z.string().regex(/^\d{6}$/),
  newPassword: z.string().min(8).max(128),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = ResetSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'A valid email, 6-digit code and new password (8+ characters) are required.' }, { status: 400 });
    const { code, newPassword } = parsed.data;
    const email = parsed.data.email.trim().toLowerCase();
    if (!await allowRate(`password-reset:${email}`, 10, 3600000))
      return NextResponse.json({ error: 'Too many attempts.' }, { status: 429 });
    const challenge = await db.emailLoginCode.findUnique({ where: { email } });
    const hash = authHash(`${email}:${code}`);
    if (!challenge || challenge.expiresAt <= new Date() || challenge.attempts >= 5 ||
        !timingSafeEqual(Buffer.from(challenge.codeHash), Buffer.from(hash))) {
      if (challenge) await db.emailLoginCode.update({ where: { email },
        data: { attempts: { increment: 1 } } }).catch(() => {});
      return NextResponse.json({ error: 'Invalid or expired verification code.' }, { status: 401 });
    }
    const consumed = await db.emailLoginCode.deleteMany({ where: { email, codeHash: hash,
      expiresAt: { gt: new Date() }, attempts: { lt: 5 } } });
    if (consumed.count !== 1) return NextResponse.json({ error: 'Verification code already used.' }, { status: 401 });
    const user = await db.user.findUnique({ where: { email } });
    if (!user || user.status !== 'ACTIVE' || user.role !== 'CLIENT')
      return NextResponse.json({ error: 'Unable to reset this account.' }, { status: 403 });
    await db.user.update({ where: { id: user.id }, data: {
      hashedPassword: await bcrypt.hash(newPassword, 12),
    } });
    return NextResponse.json({ success: true, message: 'Password updated. Sign in using your new password.' });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Password reset temporarily unavailable.' }, { status: 503 });
  }
}
