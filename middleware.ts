import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getTrustedPublicOrigin } from '@/lib/url-helper';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Agent Readiness: Intercept Accept: text/markdown on homepage
  const acceptHeader = request.headers.get('accept') || '';
  if ((pathname === '/' || pathname === '') && acceptHeader.includes('text/markdown')) {
    const markdownUrl = new URL('/api/markdown-homepage', request.url);
    return NextResponse.rewrite(markdownUrl);
  }

  // Force HTTPS in production (exclude localhost / internal health checks)
  const host = request.headers.get('host') || '';
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
  if (
    process.env.NODE_ENV === 'production' &&
    !isLocalhost &&
    request.headers.get('x-forwarded-proto') === 'http'
  ) {
    const httpsUrl = request.nextUrl.clone();
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, 301);
  }

  // Server-side route protection for Admin Dashboard
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('inkmonk_session')?.value;
    if (!token) {
      const loginUrl = new URL('/login?portal=admin', getTrustedPublicOrigin(request));
      return NextResponse.redirect(loginUrl);
    }

    try {
      const payload = await verifyToken(token);
      const role = (payload as { role?: string })?.role;
      if (role !== 'ADMIN' && role !== 'STAFF') {
        const loginUrl = new URL('/login?portal=admin&error=forbidden', getTrustedPublicOrigin(request));
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      const loginUrl = new URL('/login?portal=admin&error=expired', getTrustedPublicOrigin(request));
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();

  // Agent Readiness: RFC 8288 Link headers and Content-Signal
  response.headers.set('Content-Signal', 'search=yes, ai-train=no');
  if (pathname === '/' || pathname === '') {
    response.headers.set(
      'Link',
      '</llms.txt>; rel="describedby"; type="text/plain", </>; rel="alternate"; type="text/markdown"'
    );
  }

  // Security Headers on all HTTP responses
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
