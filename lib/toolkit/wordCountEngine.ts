// lib/toolkit/wordCountEngine.ts
/**
 * InkMonk Research — Multilingual Academic Word Count Engine
 * Robust counting for English and Devanagari Hindi academic prose
 * Evaluates hyphenated compounds, punctuation boundaries, and paragraph dynamics
 */

export interface WordCountMetrics {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  paragraphs: number;
  readingTimeMinutes: number;
  wordLimit?: number;
  wordsRemaining?: number;
  wordsOver?: number;
  isOverLimit: boolean;
  detectedScript: 'English / Latin' | 'Hindi / Devanagari' | 'Bilingual / Mixed' | 'Empty';
}

/**
 * Counts words in a string supporting both English and Hindi Devanagari scripts
 */
export function calculateWordCount(text: string, wordLimit?: number): WordCountMetrics {
  if (!text || !text.trim()) {
    return {
      words: 0,
      charactersWithSpaces: 0,
      charactersWithoutSpaces: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      wordLimit: wordLimit && wordLimit > 0 ? wordLimit : undefined,
      wordsRemaining: wordLimit && wordLimit > 0 ? wordLimit : undefined,
      wordsOver: 0,
      isOverLimit: false,
      detectedScript: 'Empty',
    };
  }

  const raw = text;
  const charactersWithSpaces = raw.length;
  const charactersWithoutSpaces = raw.replace(/\s/g, '').length;

  // Paragraph Count: count non-empty line blocks
  const paragraphs = raw
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // Detect Script
  const hasDevanagari = /[\u0900-\u097F]/.test(raw);
  const hasLatin = /[a-zA-Z]/.test(raw);

  let detectedScript: 'English / Latin' | 'Hindi / Devanagari' | 'Bilingual / Mixed' | 'Empty' = 'Empty';
  if (hasDevanagari && hasLatin) {
    detectedScript = 'Bilingual / Mixed';
  } else if (hasDevanagari) {
    detectedScript = 'Hindi / Devanagari';
  } else if (hasLatin) {
    detectedScript = 'English / Latin';
  }

  // Normalize text for word counting:
  // 1. Replace Hindi Danda ('।') and Double Danda ('॥') with spaces
  let normalized = raw.replace(/[।॥]/g, ' ');

  // 2. Replace common punctuation (except hyphens and apostrophes inside words) with spaces
  // Keep alphanumeric characters, Devanagari characters (\u0900-\u097F), hyphens, and apostrophes
  normalized = normalized.replace(/[^\w\s\u0900-\u097F'-]+/g, ' ');

  // 3. Split on whitespace
  const tokens = normalized.split(/\s+/).filter((t) => t.trim().length > 0);

  // Filter out bare punctuation tokens like lone '-' or lone "'"
  const words = tokens.filter((t) => {
    const cleaned = t.replace(/^[-']+|[-']+$/g, '');
    return cleaned.length > 0;
  }).length;

  // Reading time at average academic speed of 200 words per minute
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  let wordsRemaining: number | undefined;
  let wordsOver: number | undefined;
  let isOverLimit = false;

  if (wordLimit && wordLimit > 0) {
    if (words <= wordLimit) {
      wordsRemaining = wordLimit - words;
      wordsOver = 0;
      isOverLimit = false;
    } else {
      wordsRemaining = 0;
      wordsOver = words - wordLimit;
      isOverLimit = true;
    }
  }

  return {
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    paragraphs,
    readingTimeMinutes,
    wordLimit: wordLimit && wordLimit > 0 ? wordLimit : undefined,
    wordsRemaining,
    wordsOver,
    isOverLimit,
    detectedScript,
  };
}

/**
 * Formats metrics summary as plain text for clipboard copying
 */
export function formatWordCountSummary(metrics: WordCountMetrics): string {
  const lines: string[] = [
    'InkMonk Research — Academic Word Count Summary',
    '------------------------------------------------',
    `Script Detected: ${metrics.detectedScript}`,
    `Total Words: ${metrics.words.toLocaleString()}`,
    `Characters (with spaces): ${metrics.charactersWithSpaces.toLocaleString()}`,
    `Characters (no spaces): ${metrics.charactersWithoutSpaces.toLocaleString()}`,
    `Paragraphs: ${metrics.paragraphs}`,
    `Estimated Reading Time: ~${metrics.readingTimeMinutes} min`,
  ];

  if (metrics.wordLimit) {
    lines.push(`Target Limit: ${metrics.wordLimit.toLocaleString()} words`);
    if (metrics.isOverLimit) {
      lines.push(`Status: EXCEEDED by ${metrics.wordsOver?.toLocaleString()} words`);
    } else {
      lines.push(`Status: ON TRACK (${metrics.wordsRemaining?.toLocaleString()} words remaining)`);
    }
  }

  lines.push('------------------------------------------------');
  lines.push('Methodology: Hyphenated compound terms counted as 1 word. Processed locally in browser.');

  return lines.join('\n');
}
