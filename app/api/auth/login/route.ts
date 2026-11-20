import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { allowRate } from '@/lib/client-auth';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(4).max(128),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    
    // Check 4: Rate Limiting (Prevents Brute Force Attacks)
    if (!await allowRate(`login-ip:${ip}`, 30, 60 * 60_000)) {
      return NextResponse.json(
        { error: 'Too many login attempts from this network. Please wait a while before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please enter a valid email and password.' },
        { status: 400 }
      );
    }

    const { email: rawEmail, password } = parsed.data;
    const email = rawEmail.trim().toLowerCase();

    // Rate limit per target email address
    if (!await allowRate(`login-email:${email}`, 10, 60 * 60_000)) {
      return NextResponse.json(
        { error: 'Too many attempts for this account. Please try again later.' },
        { status: 429 }
      );
    }

    const examplePassword = process.env.NODE_ENV === 'production' &&
      ((email === 'admin@inkmonk.com' && password === 'admin123') ||
       (email === 'client@inkmonk.com' && password === 'client123'));
    if (examplePassword) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });

    const user = await db.user.findUnique({ where: { email } });
    if (!user || user.status !== 'ACTIVE' || !user.hashedPassword ||
        !await bcrypt.compare(password, user.hashedPassword)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
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
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed. Please try again.' }, { status: 500 });
  }
}
