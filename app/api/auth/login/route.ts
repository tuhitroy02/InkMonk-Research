import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { allowRate, clientSession } from '@/lib/client-auth';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(4).max(128),
});
const adminEmails = new Set([
  'inkmonkresearch@gmail.com', 'tuhitroy02@gmail.com',
  'admin@inkmonk.com', 'admin@inkmonkresearch.com',
]);

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!await allowRate(`login-ip:${ip}`, 30, 3600000))
      return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
    const parsed = LoginSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Valid email and password required.' }, { status: 400 });
    const email = parsed.data.email.trim().toLowerCase();
    const { password } = parsed.data;
    if (!await allowRate(`login-email:${email}`, 10, 3600000))
      return NextResponse.json({ error: 'Too many attempts for this account.' }, { status: 429 });

    let user = await db.user.findUnique({ where: { email } });
    // Bootstrap administrators only via a separately configured server secret.
    if (!user && adminEmails.has(email) && process.env.ADMIN_PASSWORD &&
        process.env.ADMIN_PASSWORD.length >= 12 && password === process.env.ADMIN_PASSWORD) {
      user = await db.user.create({ data: { email, name: 'InkMonk Administrator',
        role: 'ADMIN', status: 'ACTIVE', provider: 'credentials',
        hashedPassword: await bcrypt.hash(password, 12) } });
    }
    if (!user || user.status !== 'ACTIVE' || !user.hashedPassword)
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    if (user.role === 'ADMIN' && !adminEmails.has(email))
      return NextResponse.json({ error: 'Administrator access restricted.' }, { status: 403 });
    if (!await bcrypt.compare(password, user.hashedPassword))
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    return clientSession(user);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Sign-in temporarily unavailable.' }, { status: 503 });
  }
}
