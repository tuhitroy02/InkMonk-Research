// lib/toolkit/citationEngine.ts
/**
 * InkMonk Research — Academic Reference & Citation Engine
 * Supports bi-directional conversion between APA 7th Edition and IEEE Standards
 * Focuses on Journal Articles with high-fidelity heuristic parsing & editable validation
 */

export interface ParsedReference {
  id: string;
  raw: string;
  authors: string;
  year: string;
  title: string;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
  confidence: 'high' | 'medium' | 'low';
  flaggedReasons: string[];
}

export type ConversionDirection = 'APA_TO_IEEE' | 'IEEE_TO_APA';

/**
 * Normalizes DOI to standard format (without URL prefix or doi: prefix)
 */
export function extractDoiFromText(text: string): string {
  const match = text.match(/(?:https?:\/\/(?:dx\.)?doi\.org\/|doi:\s*|DOI:\s*)?(10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+)/i);
  if (!match) return '';
  return match[1].replace(/[.,;:)]+$/, '');
}

/**
 * Splits raw input into separate reference entries
 * Handles one reference per line OR blank lines separating multi-line entries
 */
export function splitReferences(input: string): string[] {
  if (!input || !input.trim()) return [];

  // Check if double newlines are present
  if (input.includes('\n\n')) {
    return input
      .split(/\n\s*\n/)
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }

  // Otherwise, split line by line
  return input
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

/**
 * Converts author list from APA 7th ("Last, F. M., & Last, F. M.") to IEEE ("F. M. Last and F. M. Last")
 */
export function convertAuthorsToIEEE(apaAuthors: string): string {
  if (!apaAuthors.trim()) return '';

  // Clean out leading numbers or bullets
  let cleaned = apaAuthors.replace(/^\[?\d+\]?\.?\s*/, '').trim();

  // Handle APA Oxford comma and ampersand: ", & " or " & "
  cleaned = cleaned.replace(/,\s*&\s*/g, ', ');
  cleaned = cleaned.replace(/\s*&\s*/g, ', ');
  cleaned = cleaned.replace(/,\s*and\s+/gi, ', ');
  cleaned = cleaned.replace(/\s+and\s+/gi, ', ');

  // Split into individual tokens and strip empty
  const tokens = cleaned.split(/,\s*/).map((t) => t.trim()).filter(Boolean);
  const authorNames: string[] = [];

  for (let i = 0; i < tokens.length; i += 2) {
    const lastName = tokens[i]?.trim();
    const initials = tokens[i + 1]?.trim();

    if (lastName && initials) {
      authorNames.push(`${initials} ${lastName}`);
    } else if (lastName) {
      authorNames.push(lastName);
    }
  }

  if (authorNames.length === 0) return apaAuthors;
  if (authorNames.length === 1) return authorNames[0];
  if (authorNames.length === 2) return `${authorNames[0]} and ${authorNames[1]}`;
  return `${authorNames.slice(0, -1).join(', ')}, and ${authorNames[authorNames.length - 1]}`;
}

/**
 * Converts author list from IEEE ("F. M. Last and F. M. Last") to APA 7th ("Last, F. M., & Last, F. M.")
 */
export function convertAuthorsToAPA(ieeeAuthors: string): string {
  if (!ieeeAuthors.trim()) return '';

  let cleaned = ieeeAuthors.replace(/^\[?\d+\]?\.?\s*/, '').trim();
  cleaned = cleaned.replace(/\s+and\s+/gi, ', ');
  cleaned = cleaned.replace(/\s*&\s*/g, ', ');

  // Split on commas
  const rawList = cleaned.split(/,\s*/).filter(Boolean);
  const apaList: string[] = [];

  for (const name of rawList) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      const lastName = parts[parts.length - 1];
      const initialsOrFirst = parts.slice(0, parts.length - 1).join(' ');
      // Ensure initials have periods
      const formattedInitials = initialsOrFirst
        .split('.')
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => (p.length === 1 ? `${p}.` : p))
        .join(' ');
      apaList.push(`${lastName}, ${formattedInitials || initialsOrFirst}`);
    } else {
      apaList.push(name);
    }
  }

  if (apaList.length === 0) return ieeeAuthors;
  if (apaList.length === 1) return apaList[0];
  if (apaList.length === 2) return `${apaList[0]}, & ${apaList[1]}`;
  return `${apaList.slice(0, -1).join(', ')}, & ${apaList[apaList.length - 1]}`;
}

/**
 * Heuristically parses an academic journal reference string
 */
export function parseJournalReference(raw: string, direction: ConversionDirection): ParsedReference {
  const flags: string[] = [];
  const id = `ref-${Math.random().toString(36).substring(2, 9)}`;

  // 1. Strip leading numeric anchors (e.g. "[1] ", "1. ", "(1) ")
  let text = raw.replace(/^\[\d+\]\s*/, '').replace(/^\d+\.\s*/, '').replace(/^\(\d+\)\s*/, '').trim();

  // 2. Extract DOI if present
  const doi = extractDoiFromText(text);
  if (doi) {
    // Remove DOI from parsing buffer to avoid token conflicts
    text = text.replace(new RegExp(`(?:https?:\\/\\/(?:dx\\.)?doi\\.org\\/|doi:\\s*|DOI:\\s*)?${doi.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'i'), '').trim();
    text = text.replace(/[,\s]+$/, '').trim();
  }

  let authors = '';
  let year = '';
  let title = '';
  let journal = '';
  let volume = '';
  let issue = '';
  let pages = '';

  // 3. Extract Year
  // APA format typically has (2020). or (2020, May).
  const parenYearMatch = text.match(/\(((?:19|20)\d{2})[a-z]?\)/);
  // IEEE format typically has end-of-string Year: ", 2020." or ", May 2020."
  const ieeeYearMatch = text.match(/,\s*(?:(?:Jan\.|Feb\.|Mar\.|Apr\.|May|Jun\.|Jul\.|Aug\.|Sep\.|Oct\.|Nov\.|Dec\.)\s*)?((?:19|20)\d{2})\.?$/);
  const inlineYearMatch = text.match(/\b((?:19|20)\d{2})\b/);

  if (parenYearMatch) {
    year = parenYearMatch[1];
  } else if (ieeeYearMatch) {
    year = ieeeYearMatch[1];
  } else if (inlineYearMatch) {
    year = inlineYearMatch[1];
    flags.push('Publication year derived from text context');
  } else {
    flags.push('Missing publication year');
  }

  // 4. Try IEEE-style parsing (quoted article title: "Title of article,")
  const quoteMatch = text.match(/"([^"]+)[,".]*\s*"\s*,?\s*/);
  if (quoteMatch) {
    title = quoteMatch[1].replace(/[,".]+$/, '').trim();
    const splitIndex = text.indexOf(quoteMatch[0]);
    authors = text.substring(0, splitIndex).replace(/[,\s]+$/, '').trim();
    const remainder = text.substring(splitIndex + quoteMatch[0].length).trim();

    // In remainder: "IEEE Trans. Softw. Eng., vol. 46, no. 5, pp. 500-515, 2020."
    // Extract volume, issue, pages
    const volMatch = remainder.match(/vol\.\s*(\d+)/i);
    if (volMatch) volume = volMatch[1];

    const issMatch = remainder.match(/no\.\s*(\d+)/i);
    if (issMatch) issue = issMatch[1];

    const ppMatch = remainder.match(/pp?\.\s*([\d\w]+[-–—][\d\w]+|[\d\w]+)/i);
    if (ppMatch) pages = ppMatch[1];

    // Journal is the beginning of remainder up to vol/no/pp or comma
    let journalPart = remainder
      .replace(/vol\.\s*\d+.*$/i, '')
      .replace(/no\.\s*\d+.*$/i, '')
      .replace(/pp?\.\s*[\d\w-]+.*$/i, '')
      .replace(/,\s*(?:19|20)\d{2}.*$/, '')
      .replace(/[,\s.]+$/, '')
      .trim();

    journal = journalPart;
  } else {
    // APA-style parsing
    // Pattern: Authors (Year). Article title. Journal Name, vol(issue), pages.
    if (parenYearMatch && parenYearMatch.index !== undefined) {
      authors = text.substring(0, parenYearMatch.index).replace(/[.\s,]+$/, '').trim();
      const afterYear = text.substring(parenYearMatch.index + parenYearMatch[0].length).replace(/^[.\s]+/, '').trim();

      // Next period usually separates Article Title from Journal
      const firstPeriodIdx = afterYear.indexOf('.');
      if (firstPeriodIdx !== -1) {
        title = afterYear.substring(0, firstPeriodIdx).trim();
        const afterTitle = afterYear.substring(firstPeriodIdx + 1).trim();

        // Match volume(issue), pages: e.g. "Journal of Artificial Intelligence, 42(3), 112–125"
        const volIssMatch = afterTitle.match(/([A-Za-z0-9\s&:'’.-]+?),\s*(\d+)(?:\((\d+)\))?(?:,\s*(?:pp?\.\s*)?([\d\w]+[-–—][\d\w]+|[\d\w]+))?/i);
        if (volIssMatch) {
          journal = volIssMatch[1].trim();
          volume = volIssMatch[2] || '';
          issue = volIssMatch[3] || '';
          pages = volIssMatch[4] || '';
        } else {
          journal = afterTitle.replace(/[.\s,]+$/, '').trim();
        }
      } else {
        title = afterYear;
      }
    } else {
      // Fallback unstructured parsing: split on periods
      const segments = text.split('.').map((s) => s.trim()).filter(Boolean);
      if (segments.length >= 3) {
        authors = segments[0];
        title = segments[1];
        journal = segments[2];
      } else if (segments.length === 2) {
        authors = segments[0];
        title = segments[1];
        flags.push('Journal name could not be identified with certainty');
      } else {
        title = text;
        flags.push('Unstructured format: please review individual fields');
      }
    }
  }

  // Quality validation flags
  if (!authors) flags.push('Missing author(s)');
  if (!title) flags.push('Missing article title');
  if (!journal) flags.push('Missing journal title');
  if (!volume && !pages) flags.push('Missing volume/pages (common in online-first papers)');

  let confidence: 'high' | 'medium' | 'low' = 'high';
  if (flags.length >= 2) confidence = 'low';
  else if (flags.length === 1) confidence = 'medium';

  return {
    id,
    raw,
    authors: authors || '',
    year: year || '',
    title: title || '',
    journal: journal || '',
    volume: volume || '',
    issue: issue || '',
    pages: pages || '',
    doi: doi || '',
    confidence,
    flaggedReasons: flags,
  };
}

/**
 * Formats a parsed record into APA 7th Edition
 */
export function formatToAPA7(ref: ParsedReference): string {
  // Author handling
  let authorStr = ref.authors.trim();
  if (!authorStr.includes('&') && !authorStr.includes('(')) {
    // If not already APA formatted, try converting
    authorStr = convertAuthorsToAPA(authorStr);
  }

  const yearStr = ref.year ? `(${ref.year}).` : '(n.d.).';
  const titleStr = ref.title ? `${ref.title.replace(/[.]+$/, '')}.` : '';
  const journalStr = ref.journal ? ref.journal.replace(/[.,]+$/, '') : '';

  let pubDetails = '';
  if (journalStr) {
    pubDetails += journalStr;
    if (ref.volume) {
      pubDetails += `, ${ref.volume}`;
      if (ref.issue) {
        pubDetails += `(${ref.issue})`;
      }
    }
    if (ref.pages) {
      pubDetails += `, ${ref.pages}`;
    }
    pubDetails += '.';
  }

  const doiStr = ref.doi ? ` https://doi.org/${ref.doi}` : '';

  return `${authorStr} ${yearStr} ${titleStr} ${pubDetails}${doiStr}`.replace(/\s+/g, ' ').trim();
}

/**
 * Formats a parsed record into IEEE Style
 * Must be numbered in list order: [index]
 */
export function formatToIEEE(ref: ParsedReference, index: number): string {
  let authorStr = ref.authors.trim();
  if (authorStr.includes('&') || authorStr.includes(',')) {
    authorStr = convertAuthorsToIEEE(authorStr);
  }

  const titleStr = ref.title ? `"${ref.title.replace(/[,".]+$/, '')},"` : '';
  const journalStr = ref.journal ? ref.journal.replace(/[.,]+$/, '') : '';

  const parts: string[] = [];
  if (journalStr) parts.push(journalStr);
  if (ref.volume) parts.push(`vol. ${ref.volume}`);
  if (ref.issue) parts.push(`no. ${ref.issue}`);
  if (ref.pages) parts.push(`pp. ${ref.pages}`);
  if (ref.year) parts.push(ref.year);

  const pubDetails = parts.join(', ');
  const doiStr = ref.doi ? `, doi: ${ref.doi}.` : '.';

  return `[${index}] ${authorStr}, ${titleStr} ${pubDetails}${doiStr}`.replace(/\s+/g, ' ').trim();
}

/**
 * Formats a parsed record into standard BibTeX
 */
export function formatToBibTeX(ref: ParsedReference): string {
  // Generate citekey from first author last name + year + first title word
  const firstAuthor = ref.authors.split(/[,&\s]+/)[0]?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'article';
  const yearKey = ref.year || '2024';
  const firstWord = ref.title.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'paper';
  const citekey = `${firstAuthor}${yearKey}${firstWord}`;

  const fields: string[] = [];
  if (ref.authors) fields.push(`  author    = {${ref.authors.replace(/&/g, 'and')}}`);
  if (ref.title) fields.push(`  title     = {${ref.title}}`);
  if (ref.journal) fields.push(`  journal   = {${ref.journal}}`);
  if (ref.volume) fields.push(`  volume    = {${ref.volume}}`);
  if (ref.issue) fields.push(`  number    = {${ref.issue}}`);
  if (ref.pages) fields.push(`  pages     = {${ref.pages}}`);
  if (ref.year) fields.push(`  year      = {${ref.year}}`);
  if (ref.doi) fields.push(`  doi       = {${ref.doi}}`);

  return `@article{${citekey},\n${fields.join(',\n')}\n}`;
}
