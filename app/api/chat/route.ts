import { NextRequest, NextResponse } from 'next/server';
import { processStellaQuery } from '@/lib/stellaEngine';
import { sanitizeText } from '@/lib/sanitize';
import { z } from 'zod';

const ChatSchema = z.object({
  userMessage: z.string().max(2000).optional(),
  message: z.string().max(2000).optional(),
  context: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = ChatSchema.safeParse(body);

    const rawMessage = (parsed.success ? parsed.data.userMessage || parsed.data.message : '') || '';
    const cleanUserMessage = sanitizeText(rawMessage, 2000);

    const response = processStellaQuery(cleanUserMessage);

    return NextResponse.json({
      success: true,
      botMessage: response.botMessage,
      options: response.suggestedChips || [],
      actionLink: response.actionLink,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        botMessage: "Hello! I am Stella, your Academic Concierge at InkMonk Research. How can I assist you with your research paper, thesis, or citation formatting today?",
        options: ['Journal Formatting (IEEE/APA)', 'Thesis & IMRaD Structure', 'Get a Project Estimate'],
      },
      { status: 200 }
    );
  }
}
