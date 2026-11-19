import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getRequestClient } from '@/lib/server-client';
import { sanitizeText } from '@/lib/sanitize';
import { z } from 'zod';

const QueryInput = z.object({
  projectId: z.string().max(100).optional(),
  projectTitle: z.string().max(250).optional(),
  queryType: z.string().max(100).optional(),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(3000),
});
const mapQuery = (q: {
  id: string; projectId: string | null; projectTitle: string | null; queryType: string;
  subject: string; message: string; status: string; createdAt: Date;
}) => ({
  id: q.id, projectId: q.projectId || undefined, projectTitle: q.projectTitle || undefined,
  queryType: q.queryType, subject: q.subject, message: q.message,
  status: q.status, assignedDirector: 'InkMonk Editorial Team',
  createdAt: q.createdAt.toISOString(), responses: [],
});

export async function GET(request: NextRequest) {
  try {
    const client = await getRequestClient(request);
    if (!client) return NextResponse.json({ error: 'Sign in to view your queries.' }, { status: 401 });
    const records = await db.clientQuery.findMany({
      where: { userId: client.id }, orderBy: { createdAt: 'desc' }, take: 100,
    });
    return NextResponse.json({ success: true, queries: records.map(mapQuery) },
      { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('Client query read failed:', error);
    return NextResponse.json({ error: 'Queries temporarily unavailable.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await getRequestClient(request);
    if (!client) return NextResponse.json({ error: 'Sign in to submit a query.' }, { status: 401 });
    const parsed = QueryInput.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Valid subject and message are required.' }, { status: 400 });
    const data = parsed.data;

    if (data.projectId && data.projectId !== 'General') {
      const project = await db.project.findFirst({
        where: { id: data.projectId, clientId: client.id }, select: { id: true },
      });
      if (!project) return NextResponse.json({ error: 'Project not found in your account.' }, { status: 403 });
    }

    const record = await db.clientQuery.create({
      data: {
        userId: client.id, userEmail: client.email, userName: client.name,
        projectId: data.projectId && data.projectId !== 'General' ? data.projectId : null,
        projectTitle: sanitizeText(data.projectTitle || 'General Academic Consultation', 250),
        queryType: sanitizeText(data.queryType || 'General Inquiry', 100),
        subject: sanitizeText(data.subject, 200),
        message: sanitizeText(data.message, 3000),
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, ticketId: record.id,
      message: 'Your query has been saved for editorial review.', query: mapQuery(record) },
      { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Client query submission failed:', error);
    return NextResponse.json({ error: 'Query not saved. Please retry.' }, { status: 503 });
  }
}
