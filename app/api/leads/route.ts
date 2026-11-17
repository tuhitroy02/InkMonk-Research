import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowRate } from '@/lib/client-auth';
import { sanitizeText, sanitizeEmail, sanitizePhone } from '@/lib/sanitize';
import { calculateQuote } from '@/lib/pricing/catalogue';
import { z } from 'zod';

const LeadSchema = z.object({
  channel: z.enum(['MANUAL', 'CHAT']),
  language: z.enum(['EN', 'HI', 'TURNITIN']).optional(),
  domain: z.string().max(200).optional(),
  workType: z.enum(['TECH', 'NON_TECH', 'NA']).optional(),
  service: z.string().max(50).optional(),
  package: z.string().max(50).optional(),
  requirements: z.string().max(5000).optional(),
  deadline: z.string().max(100).optional(),
  quantity: z.number().int().min(1).optional(),
  totalPaise: z.number().int().min(0).optional(),
  breakdown: z.string().optional(),
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(30).optional(),
  // Check 11: Honeypot field (hidden from real users, filled only by automated bots)
  hp_website: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Check 4: Add rate limiting (15 submissions per hour per IP)
    if (!await allowRate(`lead-submit:${ip}`, 15, 60 * 60_000)) {
      return NextResponse.json(
        { error: 'Too many submissions from this connection. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = LeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid lead data. Please check your inputs.', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Check 11: Bot check (Honeypot Trap)
    // If the hidden bot field is filled, silently discard or reject bot
    if (parsed.data.hp_website && parsed.data.hp_website.trim().length > 0) {
      return NextResponse.json({ success: true, leadId: 'discarded' }, { status: 200 });
    }

    // Check 5: Sanitize User Inputs
    const cleanName = sanitizeText(parsed.data.name, 200);
    const cleanEmail = sanitizeEmail(parsed.data.email);
    const cleanPhone = sanitizePhone(parsed.data.phone || '');
    const cleanReqs = sanitizeText(parsed.data.requirements || '', 5000);
    const cleanDomain = sanitizeText(parsed.data.domain || '', 200);

    if (!cleanName || !cleanEmail) {
      return NextResponse.json({ error: 'Valid name and email are required.' }, { status: 400 });
    }

    // Check 3: Never trust frontend price calculations
    let verifiedTotalPaise = parsed.data.totalPaise;
    if (parsed.data.service && parsed.data.language) {
      try {
        const serverQuote = calculateQuote({
          language: parsed.data.language,
          workType: parsed.data.workType as 'TECH' | 'NON_TECH' | undefined,
          service: parsed.data.service,
          package: parsed.data.package,
          quantity: parsed.data.quantity,
        });
        if (serverQuote && serverQuote.totalPaise > 0) {
          verifiedTotalPaise = serverQuote.totalPaise;
        }
      } catch {
        // Retain unquoted or custom enquiry status
      }
    }

    const lead = await db.lead.create({
      data: {
        channel: parsed.data.channel,
        language: parsed.data.language,
        domain: cleanDomain,
        workType: parsed.data.workType,
        service: parsed.data.service,
        package: parsed.data.package,
        requirements: cleanReqs,
        deadline: sanitizeText(parsed.data.deadline || '', 100),
        quantity: parsed.data.quantity,
        totalPaise: verifiedTotalPaise,
        breakdown: parsed.data.breakdown ? sanitizeText(parsed.data.breakdown, 1000) : undefined,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        status: 'NEW',
      },
    });

    // Analytics (Strictly NO PII)
    await db.analyticsEvent.create({
      data: {
        event: 'QUOTE_COMPLETE',
        channel: parsed.data.channel,
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });

  } catch (error) {
    // Check 10: Turn off verbose debug messages for visitors
    console.error('Lead submission notice:', error);
    return NextResponse.json({ error: 'Could not process enquiry. Please try again or reach out on WhatsApp.' }, { status: 500 });
  }
}

// Track WhatsApp click with sanitized inputs
export async function PATCH(request: NextRequest) {
  try {
    const { leadId, type } = await request.json();

    if (leadId && typeof leadId === 'string' && leadId.length < 50) {
      await db.lead.update({
        where: { id: leadId },
        data: { whatsAppClickedAt: new Date() },
      }).catch(() => null);
    }

    await db.analyticsEvent.create({
      data: {
        event: type === 'direct' ? 'DIRECT_CHAT_CLICK' : 'WHATSAPP_CLICK',
        channel: 'MANUAL',
      },
    }).catch(() => null);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
