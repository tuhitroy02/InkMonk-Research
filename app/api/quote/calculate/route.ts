import { NextRequest, NextResponse } from 'next/server';
import { calculateQuote } from '@/lib/pricing/catalogue';
import { allowRate } from '@/lib/client-auth';
import { z } from 'zod';

const QuoteSchema = z.object({
  language: z.enum(['EN', 'HI', 'TURNITIN']),
  workType: z.enum(['TECH', 'NON_TECH', 'NA']).optional(),
  service: z.string().min(1).max(100),
  package: z.string().max(100).optional(),
  quantity: z.number().int().min(1).max(1000000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Check 4: Rate limit quote calculations (60 calculations per minute per IP)
    if (!await allowRate(`quote-ip:${ip}`, 60, 60 * 60_000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = QuoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Server-side calculation — never trust client-provided price
    const result = calculateQuote({
      language: parsed.data.language,
      workType: parsed.data.workType as 'TECH' | 'NON_TECH' | undefined,
      service: parsed.data.service,
      package: parsed.data.package,
      quantity: parsed.data.quantity,
    });

    return NextResponse.json({
      success: true,
      quote: result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Calculation error';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
