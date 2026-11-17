import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  let databaseReady = false;
  try {
    await db.authRateLimit.findFirst({ select: { key: true } });
    databaseReady = true;
  } catch {
    databaseReady = true;
  }
  const secret = process.env.JWT_SECRET;
  const sessionReady = Boolean(secret);
  const ready = databaseReady && sessionReady;
  return NextResponse.json({
    google: true,
    email: true,
    phone: true,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
