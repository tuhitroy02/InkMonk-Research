import { NextRequest, NextResponse } from 'next/server';
import { processChat, buildWhatsAppMessage } from '@/lib/chatbot/engine';
import type { ChatState, ChatContext } from '@/lib/chatbot/engine';
import { db } from '@/lib/db';
import { allowRate } from '@/lib/client-auth';
import { sanitizeText, sanitizeEmail, sanitizePhone } from '@/lib/sanitize';
import { z } from 'zod';

const ChatSchema = z.object({
  state: z.string().max(50),
  userMessage: z.string().max(2000),
  context: z.record(z.string(), z.unknown()),
  sessionToken: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Check 4: Rate limit chatbot turns (45 turns per minute per IP)
    if (!await allowRate(`chat-ip:${ip}`, 45, 60 * 60_000)) {
      return NextResponse.json(
        { error: 'Chat rate limit reached. Please wait a moment before sending another message.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = ChatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { state, userMessage, context, sessionToken } = parsed.data;

    // Check 5: Sanitize userMessage before processing
    const cleanUserMessage = sanitizeText(userMessage, 2000);

    // Process through chatbot FSM
    const turn = processChat(
      state as ChatState,
      cleanUserMessage,
      context as ChatContext,
    );

    // Save lead if contact data collected
    let leadId: string | undefined;
    if (turn.leadData && turn.leadData.email && turn.leadData.name) {
      try {
        const cleanName = sanitizeText(turn.leadData.name, 200);
        const cleanEmail = sanitizeEmail(turn.leadData.email);
        const cleanPhone = sanitizePhone(turn.leadData.phone || '');

        if (cleanName && cleanEmail) {
          const lead = await db.lead.create({
            data: {
              channel: 'CHAT',
              language: turn.leadData.language || undefined,
              domain: turn.leadData.domain ? sanitizeText(turn.leadData.domain, 200) : undefined,
              workType: turn.leadData.workType || undefined,
              service: turn.leadData.service ? sanitizeText(turn.leadData.service, 50) : undefined,
              package: turn.leadData.package ? sanitizeText(turn.leadData.package, 50) : undefined,
              requirements: turn.leadData.requirements ? sanitizeText(turn.leadData.requirements, 5000) : undefined,
              deadline: turn.leadData.deadline ? sanitizeText(turn.leadData.deadline, 100) : undefined,
              quantity: turn.leadData.quantity ?? undefined,
              totalPaise: turn.leadData.totalPaise ?? undefined,
              breakdown: turn.leadData.breakdown ? sanitizeText(turn.leadData.breakdown, 1000) : undefined,
              name: cleanName,
              email: cleanEmail,
              phone: cleanPhone || undefined,
              status: 'NEW',
            },
          });
          leadId = lead.id;

          // Track analytics event (no PII)
          await db.analyticsEvent.create({
            data: { event: 'CHAT_COMPLETE', channel: 'CHAT' },
          });
        }
      } catch (dbError) {
        console.warn('Lead save notice in chat:', dbError);
      }
    }

    // Build WhatsApp URL if in SUMMARY or DONE state
    let whatsappUrl: string | undefined;
    let whatsappDirectUrl: string | undefined;
    if (turn.nextState === 'SUMMARY' || turn.nextState === 'DONE') {
      const waMsg = buildWhatsAppMessage(turn.context);
      whatsappUrl = `https://wa.me/917980470880?text=${waMsg}`;
      whatsappDirectUrl = `https://wa.me/917980470880`;
    }

    return NextResponse.json({
      success: true,
      botMessage: turn.botMessage,
      nextState: turn.nextState,
      options: turn.options,
      context: turn.context,
      leadId,
      whatsappUrl,
      whatsappDirectUrl,
    });

  } catch (error: unknown) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Chat service unavailable. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Track WhatsApp click
export async function PATCH(request: NextRequest) {
  try {
    const { leadId, type } = await request.json();
    if (leadId) {
      await db.lead.update({
        where: { id: leadId },
        data: { whatsAppClickedAt: new Date() },
      });
    }
    await db.analyticsEvent.create({
      data: {
        event: type === 'direct' ? 'DIRECT_CHAT_CLICK' : 'WHATSAPP_CLICK',
        channel: 'CHAT',
      },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
