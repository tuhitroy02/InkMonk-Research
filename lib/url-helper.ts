/**
 * InkMonk Research — Trusted Origin & URL Utilities
 *
 * Enforces secure origin resolution:
 * - In production: Always binds to https://inkmonkresearch.com to avoid internal proxy
 *   hosts (e.g., 0.0.0.0:3000, 127.0.0.1:3000) and prevent arbitrary Host/X-Forwarded-Host injection.
 * - In development: Allows strictly localhost/127.0.0.1 to preserve local developer workflows.
 */

import { NextRequest } from 'next/server';

const CANONICAL_PRODUCTION_ORIGIN = 'https://inkmonkresearch.com';

/**
 * Resolves the trusted public origin for InkMonk Research.
 */
export function getTrustedPublicOrigin(request?: NextRequest | Request | { headers: Headers }): string {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const configured = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;
    if (configured && /^https:\/\/(www\.)?inkmonkresearch\.com(?::\d+)?$/i.test(configured.trim())) {
      return configured.trim().replace(/\/$/, '');
    }
    return CANONICAL_PRODUCTION_ORIGIN;
  }

  // Development / Test environment:
  if (request) {
    const headers = 'headers' in request ? request.headers : null;
    const hostHeader = headers?.get('x-forwarded-host') || headers?.get('host');
    if (hostHeader) {
      const primaryHost = hostHeader.split(',')[0].trim();
      // Strictly allow only loopback hosts in non-production
      if (/^localhost(:\d+)?$/i.test(primaryHost) || /^127\.0\.0\.1(:\d+)?$/.test(primaryHost)) {
        const proto = headers?.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
        return `${proto}://${primaryHost}`;
      }
    }
  }

  const configuredDev = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (configuredDev && !isProd) {
    return configuredDev.trim().replace(/\/$/, '');
  }

  return 'http://localhost:3000';
}

/**
 * Resolves the exact Google OAuth callback URI.
 * In production: Enforces 'https://inkmonkresearch.com/api/auth/google/callback'.
 */
export function getGoogleRedirectUri(request?: NextRequest | Request | { headers: Headers }): string {
  const isProd = process.env.NODE_ENV === 'production';
  const envUri = (process.env.GOOGLE_REDIRECT_URI || '').trim();

  if (isProd) {
    if (envUri && /^https:\/\/(www\.)?inkmonkresearch\.com\/api\/auth\/google\/callback$/i.test(envUri)) {
      return envUri;
    }
    return `${CANONICAL_PRODUCTION_ORIGIN}/api/auth/google/callback`;
  }

  if (envUri) return envUri;
  const origin = getTrustedPublicOrigin(request);
  return `${origin}/api/auth/google/callback`;
}
