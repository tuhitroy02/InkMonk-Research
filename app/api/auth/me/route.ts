import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getSession();
  if (!session || !session.userId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  let user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  if (!user && session.email) {
    user = await db.user.findUnique({
      where: { email: session.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      try {
        user = await db.user.create({
          data: {
            id: session.userId,
            email: session.email,
            name: session.name || session.email.split('@')[0],
            role: session.role || 'CLIENT',
            status: 'ACTIVE',
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
          },
        });
      } catch (e) {
        console.warn('Auto-create session user error:', e);
      }
    }
  }

  if (!user || user.status === 'SUSPENDED') {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user });
}
