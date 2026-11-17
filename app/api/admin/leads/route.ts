import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    await requireRole('STAFF');

    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    const stats = {
      totalLeads: await db.lead.count(),
      newLeads: await db.lead.count({ where: { status: 'NEW' } }),
      contactedLeads: await db.lead.count({ where: { status: 'CONTACTED' } }),
      convertedLeads: await db.lead.count({ where: { status: 'CONVERTED' } }),
      chatLeads: await db.lead.count({ where: { channel: 'CHAT' } }),
      manualLeads: await db.lead.count({ where: { channel: 'MANUAL' } }),
    };

    return NextResponse.json({ success: true, leads, stats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unauthorized' }, { status: 403 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireRole('STAFF');
    const { id, status, notes } = await request.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid Lead ID required.' }, { status: 400 });
    }

    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    const updated = await db.lead.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes: String(notes).slice(0, 5000) }),
      },
    });

    // Check 12: Record Admin Action to AuditLog
    await db.auditLog.create({
      data: {
        entity: 'Lead',
        entityId: id,
        field: status ? 'status' : 'notes',
        oldValue: status ? existing.status : (existing.notes || ''),
        newValue: status || String(notes || ''),
        changedBy: session.userId,
      },
    }).catch((err) => console.warn('AuditLog write notice:', err));

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unauthorized' }, { status: 403 });
  }
}
