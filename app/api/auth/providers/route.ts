import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  let databaseReady = false;
  try { await db.authRateLimit.findFirst({ select: { key: true } }); databaseReady = true; } catch {}
  const sessionReady = Boolean(process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32);
  return NextResponse.json({
    google: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    email: databaseReady && sessionReady && Boolean(process.env.RESEND_API_KEY && process.env.OTP_FROM_EMAIL),
    phone: databaseReady && sessionReady && Boolean(
      process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_VERIFY_SERVICE_SID),
  }, { headers: { 'Cache-Control': 'no-store' } });
}
