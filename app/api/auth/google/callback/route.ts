import { timingSafeEqual } from 'node:crypto';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateClient } from '@/lib/client-auth';
import { signToken } from '@/lib/auth';
import { getGoogleRedirectUri, getTrustedPublicOrigin } from '@/lib/url-helper';

const googleKeys = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

export async function GET(request: NextRequest) {
  const origin = getTrustedPublicOrigin(request);
  const redirect = (reason: string) => NextResponse.redirect(new URL(`/login?error=${reason}`, origin));

  const errorParam = request.nextUrl.searchParams.get('error');
  if (errorParam) {
    console.warn('[AUTH_DIAGNOSTICS] Google OAuth callback returned error parameter:', errorParam);
    return redirect('google-failed');
  }

  const cookie = request.cookies.get('inkmonk_oauth')?.value;
  const state = request.nextUrl.searchParams.get('state');
  const code = request.nextUrl.searchParams.get('code');

  if (!cookie || !state || !code) {
    console.warn('[AUTH_DIAGNOSTICS] Google OAuth callback rejected: missing state, authorization code, or oauth cookie.');
    return redirect('google-failed');
  }

  try {
    let data: { state?: string; nonce?: string; verifier?: string };
    try {
      data = JSON.parse(Buffer.from(cookie, 'base64url').toString('utf8'));
    } catch {
      console.warn('[AUTH_DIAGNOSTICS] Google OAuth callback rejected: malformed oauth cookie.');
      return redirect('google-failed');
    }

    if (
      typeof data.state !== 'string' ||
      typeof data.nonce !== 'string' ||
      typeof data.verifier !== 'string' ||
      state.length !== data.state.length ||
      !timingSafeEqual(Buffer.from(state), Buffer.from(data.state))
    ) {
      console.warn('[AUTH_DIAGNOSTICS] Google OAuth callback rejected: state mismatch or invalid state.');
      return redirect('google-failed');
    }

    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
    const redirectUri = getGoogleRedirectUri(request);

    if (!clientId || !clientSecret || !redirectUri) {
      console.warn('[AUTH_DIAGNOSTICS] Google OAuth callback aborted: missing server credentials.');
      return redirect('google-unavailable');
    }

    const exchange = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code_verifier: data.verifier,
      }),
      cache: 'no-store',
    });

    if (!exchange.ok) {
      console.warn(`[AUTH_DIAGNOSTICS] Google OAuth token exchange failed with HTTP status ${exchange.status}.`);
      return redirect('google-failed');
    }

    const tokens = await exchange.json();
    if (typeof tokens.id_token !== 'string') {
      console.warn('[AUTH_DIAGNOSTICS] Google OAuth token response missing id_token string.');
      return redirect('google-failed');
    }

    let payload: JWTPayload;
    try {
      const verified = await jwtVerify(tokens.id_token, googleKeys, {
        issuer: ['https://accounts.google.com', 'accounts.google.com'],
        audience: clientId,
      });
      payload = verified.payload;
    } catch (jwtErr) {
      console.warn('[AUTH_DIAGNOSTICS] Google ID token verification failed:', jwtErr instanceof Error ? jwtErr.name : 'verification_error');
      return redirect('google-failed');
    }

    if (
      payload.nonce !== data.nonce ||
      payload.email_verified !== true ||
      typeof payload.email !== 'string' ||
      typeof payload.sub !== 'string'
    ) {
      console.warn('[AUTH_DIAGNOSTICS] Google OAuth claims validation failed (nonce, email_verified, or email/sub invalid).');
      return redirect('google-failed');
    }

    const user = await getOrCreateClient(
      { kind: 'email', value: payload.email.toLowerCase().trim() },
      typeof payload.name === 'string' ? payload.name : undefined
    );

    if (!user) {
      console.warn('[AUTH_DIAGNOSTICS] Google OAuth user provisioning returned null or user not eligible.');
      return redirect('client-only');
    }

    const sessionToken = await signToken({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.redirect(new URL('/client', origin));
    response.cookies.set('inkmonk_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });
    response.cookies.delete('inkmonk_oauth');

    console.info('[AUTH_DIAGNOSTICS] Google OAuth authentication successful; session issued.');
    return response;
  } catch (error) {
    console.error('[AUTH_DIAGNOSTICS] Google OAuth callback unexpected error:', error);
    return redirect('google-failed');
  }
}
