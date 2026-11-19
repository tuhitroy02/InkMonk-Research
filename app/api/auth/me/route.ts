import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) return NextResponse.json({ authenticated: false }, { status: 401 });
    const user = await db.user.findUnique({ where: { id: session.userId },
      select: { id: true, name: true, email: true, role: true, status: true } });
    if (!user || user.email !== session.email || user.status !== 'ACTIVE' || user.role !== session.role)
      return NextResponse.json({ authenticated: false }, { status: 401 });
    return NextResponse.json({ authenticated: true, user }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Session lookup failed:', error);
    return NextResponse.json({ authenticated: false }, { status: 503 });
  }
}
