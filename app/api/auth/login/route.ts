import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please enter a valid email and password (min 4 characters).' }, { status: 400 });
    }

    const { email: rawEmail, password } = parsed.data;
    const email = rawEmail.trim().toLowerCase();

    // 1. Master Administrator check for InkMonk Directors (Tuhit Roy / Admin)
    const isMasterAdmin =
      email === 'inkmonkresearch@gmail.com' ||
      email === 'admin@inkmonk.com' ||
      email === 'tuhitroy02@gmail.com';

    const isMasterAdminPassword =
      password === 'InkMonk@2026' ||
      password === 'admin123' ||
      password === 'admin@2026' ||
      (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);

    if (isMasterAdmin && isMasterAdminPassword) {
      let adminUser = await db.user.findUnique({ where: { email } });
      if (!adminUser) {
        adminUser = await db.user.create({
          data: {
            email,
            name: email === 'inkmonkresearch@gmail.com' ? 'Tuhit Roy (Director)' : 'InkMonk Administrator',
            role: 'ADMIN',
            provider: 'credentials',
            status: 'ACTIVE',
          },
        });
      } else if (adminUser.role !== 'ADMIN') {
        adminUser = await db.user.update({
          where: { id: adminUser.id },
          data: { role: 'ADMIN', status: 'ACTIVE' },
        });
      }

      const token = await signToken({
        userId: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: 'ADMIN',
      });

      const response = NextResponse.json({
        success: true,
        user: { id: adminUser.id, name: adminUser.name, email: adminUser.email, role: 'ADMIN' },
      });

      response.cookies.set('inkmonk_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });

      return response;
    }

    // 2. Standard Client Master/Demo Passwords for frictionless login
    const isClientMasterPassword =
      password === 'InkMonk@2026' ||
      password === 'client123' ||
      password === 'client@2026';

    let user = await db.user.findUnique({ where: { email } });

    if (!user) {
      // If client signs in with the master client password, auto-create active client
      if (isClientMasterPassword) {
        user = await db.user.create({
          data: {
            email,
            name: email.split('@')[0],
            role: 'CLIENT',
            provider: 'credentials',
            status: 'ACTIVE',
          },
        });
      } else {
        return NextResponse.json({ error: 'Account not found. Please register or verify with OTP.' }, { status: 401 });
      }
    }

    // Verify Password if hashed password exists
    if (user.hashedPassword && !isClientMasterPassword) {
      const valid = await bcrypt.compare(password, user.hashedPassword);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
      }
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json({ error: 'Account suspended. Please contact inkmonkresearch@gmail.com.' }, { status: 403 });
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
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}
