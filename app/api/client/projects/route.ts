import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getRequestClient } from '@/lib/server-client';

export async function GET(request: NextRequest) {
  try {
    const client = await getRequestClient(request);
    if (!client) return NextResponse.json({ error: 'Sign in to access your work.' }, { status: 401 });
    const records = await db.project.findMany({
      where: { clientId: client.id }, include: { milestones: true },
      orderBy: { createdAt: 'desc' },
    });
    const projects = records.map(project => {
      const total = project.milestones.length;
      const completed = project.milestones.filter(m => m.status === 'DONE').length;
      const progress = total > 0 ? Math.round(completed / total * 100) : (project.status === 'DELIVERED' || project.status === 'CLOSED' ? 100 : 0);
      return {
        id: project.id, title: project.title, service: project.scope || 'Academic Research',
        language: 'English',
        status: project.status === 'DELIVERED' || project.status === 'CLOSED' ? 'COMPLETED' :
          project.status === 'REVIEW' ? 'UNDER_REVIEW' : 'IN_PROGRESS',
        progress,
        deadline: project.deadline ? project.deadline.toISOString().slice(0, 10) : 'Not scheduled',
        amount: project.totalPaise === null ? 'To be confirmed' :
          new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(project.totalPaise / 100),
        deliverables: [],
      };
    });
    return NextResponse.json({ success: true, projects },
      { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('Projects read error:', error);
    return NextResponse.json({ error: 'Work list temporarily unavailable.' }, { status: 503 });
  }
}
