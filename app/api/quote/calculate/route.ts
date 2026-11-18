import { NextRequest, NextResponse } from 'next/server';
import { calculateQuote, SERVICE_DISPLAY_NAMES } from '@/lib/pricing/catalogue';
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

    // Rate limit quote calculations (60 calculations per minute per IP, graceful in-memory fallback)
    try {
      if (!await allowRate(`quote-ip:${ip}`, 60, 60 * 60_000)) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please wait a moment.' },
          { status: 429 }
        );
      }
    } catch {
      // Never let rate limiting failure block legitimate calculation
    }

    const body = await request.json();
    const parsed = QuoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Map service aliases if necessary
    let svc = parsed.data.service;
    if (parsed.data.language === 'TURNITIN' && svc === 'TURNITIN') {
      svc = 'TURNITIN_REPORT';
    }

    // Server-side calculation — single source of truth from catalogue.ts
    const result = calculateQuote({
      language: parsed.data.language,
      workType: parsed.data.workType as 'TECH' | 'NON_TECH' | undefined,
      service: svc,
      package: parsed.data.package,
      quantity: parsed.data.quantity,
    });

    const languageNames: Record<string, string> = {
      EN: 'English Academic Writing',
      HI: 'Hindi Academic Research (हिंदी)',
      TURNITIN: 'Turnitin AI & Plagiarism Audit',
    };

    const workTypeNames: Record<string, string> = {
      TECH: 'Technical (With Model / Computational Implementation)',
      NON_TECH: 'Non-Technical (Theoretical / Editorial Rigor)',
      NA: 'Instructor Verification Audit',
    };

    const breakdownText = result.breakdown
      .map((b) => `${b.label}: ₹${(b.amountPaise / 100).toLocaleString('en-IN')}`)
      .join(' + ');

    return NextResponse.json({
      success: true,
      quote: {
        totalPaise: result.totalPaise,
        totalRupees: result.totalPaise / 100,
        formattedTotal: result.totalFormatted,
        totalFormatted: result.totalFormatted,
        breakdown: result.breakdown,
        breakdownText,
        languageName: languageNames[parsed.data.language] || parsed.data.language,
        workTypeName: workTypeNames[parsed.data.workType || 'NON_TECH'] || 'Standard',
        serviceName: SERVICE_DISPLAY_NAMES[svc] || svc,
        packageName: parsed.data.package,
        quantity: parsed.data.quantity,
        isPending: result.isPending,
        pendingNote: result.pendingNote,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Calculation error';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
