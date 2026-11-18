import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'llms-full.txt');
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    content = `# InkMonk Research — Full Documentation\nhttps://inkmonkresearch.com`;
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
