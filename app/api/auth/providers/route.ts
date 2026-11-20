import { NextResponse } from 'next/server';

export async function GET() {
  const googleReady = Boolean(
    process.env.GOOGLE_CLIENT_ID?.trim() &&
    process.env.GOOGLE_CLIENT_SECRET?.trim()
  );

  const emailReady = Boolean(
    process.env.RESEND_API_KEY?.trim() &&
    process.env.OTP_FROM_EMAIL?.trim()
  );

  const phoneReady = Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
    process.env.TWILIO_AUTH_TOKEN?.trim() &&
    process.env.TWILIO_VERIFY_SERVICE_SID?.trim()
  );

  console.info(
    `[AUTH_DIAGNOSTICS] Provider availability check: Google=${googleReady}, Email=${emailReady}, Phone=${phoneReady}`
  );

  return NextResponse.json(
    {
      google: googleReady,
      email: emailReady,
      phone: phoneReady,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
