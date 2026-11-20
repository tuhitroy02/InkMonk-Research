import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { consumeCode } from '@/lib/email-code';
import { z } from 'zod';

const SignupSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().min(2).max(100),
  password: z.string().min(6).max(128),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  institution: z.string().optional(),
  discipline: z.string().optional(),
  code: z.string().length(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = SignupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Valid Email, Name, and Password min 6 chars).' },
        { status: 400 }
      );
    }

    const {
      email: rawEmail,
      name,
      password,
      gender,
      qualification,
      institution,
      discipline,
      code,
    } = parsed.data;

    const email = rawEmail.trim().toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.$transaction(async (tx) => {
      if (await tx.user.findUnique({ where: { email } })) return null;
      if (!await consumeCode(tx, email, code, 'signup')) return null;
      return tx.user.create({ data: { email, name, hashedPassword, role: 'CLIENT', provider: 'credentials', status: 'ACTIVE' } });
    });
    if (!user) return NextResponse.json({ error: 'Invalid or expired code, or account already exists.' }, { status: 400 });

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: 'CLIENT',
    });

    const scholarProfile = {
      name: user.name,
      email: user.email,
      gender: gender || 'Not Specified',
      qualification: qualification || 'Postgraduate / PhD Scholar',
      institution: institution || 'Academic Institution',
      discipline: discipline || 'General Academic Research',
    };

    const response = NextResponse.json({
      success: true,
      message: 'Account created and verified successfully.',
      user: { id: user.id, name: user.name, email: user.email, role: 'CLIENT' },
      profile: scholarProfile,
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
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create account. Please try again.' }, { status: 500 });
  }
}
