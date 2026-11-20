import { createHash, randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getGoogleRedirectUri, getTrustedPublicOrigin } from '@/lib/url-helper';

export async function GET(request: NextRequest) {
  const origin = getTrustedPublicOrigin(request);
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const redirectUri = getGoogleRedirectUri(request);

  if (!clientId || !clientSecret || !redirectUri) {
    console.warn('[AUTH_DIAGNOSTICS] Google OAuth start aborted: server configuration missing (GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET unset).');
    return NextResponse.redirect(new URL('/login?error=google-unavailable', origin));
  }

  const state = randomBytes(24).toString('base64url');
  const nonce = randomBytes(24).toString('base64url');
  const verifier = randomBytes(32).toString('base64url');
  const challenge = createHash('sha256').update(verifier).digest('base64url');

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  }).toString();

  const response = NextResponse.redirect(authUrl);
  response.cookies.set('inkmonk_oauth', Buffer.from(JSON.stringify({ state, nonce, verifier })).toString('base64url'), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  console.info('[AUTH_DIAGNOSTICS] Google OAuth authorization flow successfully initiated with PKCE.');
  return response;
}
