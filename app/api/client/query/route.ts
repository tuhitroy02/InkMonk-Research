import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

const querySchema = z.object({
  queryType: z.string().trim().min(1).max(100),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(3000),
});

async function getClientId() {
  const session = await getSession();
  if (session?.role !== 'CLIENT') return null;
  const client = await db.user.findFirst({
    where: { id: session.userId, role: 'CLIENT', status: 'ACTIVE' },
    select: { id: true },
  });
  return client?.id ?? null;
}

const fields = {
  id: true, queryType: true, subject: true, message: true, status: true, createdAt: true,
} as const;

export async function GET() {
  const userId = await getClientId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const queries = await db.clientQuery.findMany({
    where: { userId }, orderBy: { createdAt: 'desc' }, select: fields,
  });
  return NextResponse.json({ success: true, queries }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: NextRequest) {
  const userId = await getClientId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = querySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Enter a query type, subject, and message.' }, { status: 400 });
  const query = await db.clientQuery.create({ data: { userId, ...parsed.data }, select: fields });
  return NextResponse.json({ success: true, ticketId: query.id, query }, { status: 201 });
}
