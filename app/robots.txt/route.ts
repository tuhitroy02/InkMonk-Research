import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /client
Disallow: /api/

Content-Signal: search=yes, ai-train=no

Sitemap: https://inkmonkresearch.com/sitemap.xml
`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Signal': 'search=yes, ai-train=no',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
