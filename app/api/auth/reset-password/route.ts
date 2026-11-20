import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { consumeCode } from '@/lib/email-code';
import { z } from 'zod';

const ResetSchema = z.object({
  email: z.string().email().max(254),
  code: z.string().min(4).max(10),
  newPassword: z.string().min(6).max(128),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ResetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please provide email, verification code, and new password (min 6 chars).' },
        { status: 400 }
      );
    }

    const { email: rawEmail, code, newPassword } = parsed.data;
    const email = rawEmail.trim().toLowerCase();

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { email } });
      if (!user || user.role !== 'CLIENT' || user.status !== 'ACTIVE') return null;
      if (!await consumeCode(tx, email, code, 'reset')) return null;
      return tx.user.update({ where: { id: user.id }, data: { hashedPassword } });
    });
    if (!updatedUser) return NextResponse.json({ error: 'Invalid or expired code.' }, { status: 401 });

    const token = await signToken({
      userId: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: 'CLIENT',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Password updated successfully.',
      user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: 'CLIENT' },
    });

    response.cookies.set('inkmonk_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Failed to reset password. Please try again.' }, { status: 500 });
  }
}
