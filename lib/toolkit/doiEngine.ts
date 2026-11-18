// lib/toolkit/doiEngine.ts
/**
 * InkMonk Research — Academic DOI & Scholarly Metadata Engine
 * Handles URL extraction, DOI normalization, and Crossref API integration
 * Adheres strictly to approved metadata endpoints without fetching arbitrary external URLs.
 */

export type DoiExtractionStatus =
  | 'DOI extracted from URL'
  | 'Matching DOI found'
  | 'No DOI found'
  | 'Lookup temporarily unavailable';

export interface ScholarlyArticle {
  doi: string;
  title: string;
  firstAuthor: string;
  authors: string[];
  year: string;
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publisher?: string;
  isConfirmed: boolean;
  status: DoiExtractionStatus;
  confidence: 'confirmed' | 'high' | 'medium' | 'low';
  source: 'extracted_from_url' | 'title_author_search' | 'direct_doi';
  note?: string;
}

/**
 * Normalizes any bare DOI, 'doi:', or 'doi.org' link into a standard '10.xxxx/yyyy' string
 */
export function normalizeDoi(rawInput: string): string | null {
  if (!rawInput || !rawInput.trim()) return null;

  let cleaned = rawInput.trim();

  // 1. Decode URI entities (e.g. 10.1016%2Fj.neucom.2020.01.001)
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {}

  // 2. Remove URL protocols and domain roots
  cleaned = cleaned.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '');
  cleaned = cleaned.replace(/^doi:\s*/i, '');
  cleaned = cleaned.replace(/^DOI:\s*/i, '');

  // 3. Match standard DOI regex pattern: 10.NNNN/...
  const match = cleaned.match(/(10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+)/);
  if (!match) return null;

  // 4. Strip trailing punctuation often caught in URLs or brackets
  let doi = match[1];
  doi = doi.replace(/[.,;:)>\]]+$/, '');

  return doi;
}

/**
 * Extracts DOI from publisher URLs, query parameters, or direct doi.org links
 * Handles URL encoding, query strings, and fragments
 */
export function extractDoiFromUrl(inputUrl: string): {
  doi: string | null;
  status: DoiExtractionStatus;
  method: 'direct_doi_org' | 'publisher_path' | 'query_param' | 'none';
  details?: string;
} {
  if (!inputUrl || !inputUrl.trim()) {
    return {
      doi: null,
      status: 'No DOI found',
      method: 'none',
      details: 'Empty URL input',
    };
  }

  let raw = inputUrl.trim();

  // Handle URL encoding
  try {
    raw = decodeURIComponent(raw);
  } catch {}

  // Check 1: Direct doi.org link
  if (/https?:\/\/(?:dx\.)?doi\.org\//i.test(raw)) {
    const doi = normalizeDoi(raw);
    if (doi) {
      return {
        doi,
        status: 'DOI extracted from URL',
        method: 'direct_doi_org',
        details: 'Direct doi.org canonical resolver recognized',
      };
    }
  }

  // Check 2: Query parameter containing DOI (e.g. ?doi=10.1016/... or ?id=10.1371/...)
  try {
    const parsed = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
    for (const [, val] of parsed.searchParams.entries()) {
      const paramDoi = normalizeDoi(val);
      if (paramDoi) {
        return {
          doi: paramDoi,
          status: 'DOI extracted from URL',
          method: 'query_param',
          details: 'Extracted from URL search parameter',
        };
      }
    }
  } catch {}

  // Check 3: Publisher path pattern (e.g. ScienceDirect, Springer, Wiley, Nature, ACM, PLOS)
  const pathMatch = raw.match(/(10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+)/);
  if (pathMatch) {
    const candidate = normalizeDoi(pathMatch[1]);
    if (candidate) {
      return {
        doi: candidate,
        status: 'DOI extracted from URL',
        method: 'publisher_path',
        details: 'Extracted directly from publisher URL path',
      };
    }
  }

  return {
    doi: null,
    status: 'No DOI found',
    method: 'none',
    details: 'The pasted URL does not contain an embedded DOI pattern. Try searching by article title below.',
  };
}

/**
 * Parses raw Crossref message object into standardized ScholarlyArticle
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCrossrefMessage(item: any, source: 'extracted_from_url' | 'title_author_search' | 'direct_doi'): ScholarlyArticle {
  const doi = item.DOI || '';
  const title = Array.isArray(item.title) ? item.title[0] : (item.title || 'Untitled Academic Work');

  const authors: string[] = [];
  if (Array.isArray(item.author)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item.author.forEach((a: any) => {
      if (a.family && a.given) {
        authors.push(`${a.given} ${a.family}`);
      } else if (a.family) {
        authors.push(a.family);
      } else if (a.name) {
        authors.push(a.name);
      }
    });
  }

  const firstAuthor = authors[0] || 'Unknown Author';

  // Year from published-print, published-online, or created
  let year = '';
  const dateParts =
    item['published-print']?.['date-parts']?.[0] ||
    item['published-online']?.['date-parts']?.[0] ||
    item['created']?.['date-parts']?.[0] ||
    item['issued']?.['date-parts']?.[0];

  if (Array.isArray(dateParts) && dateParts[0]) {
    year = String(dateParts[0]);
  }

  const journal = Array.isArray(item['container-title'])
    ? item['container-title'][0]
    : (item['container-title'] || item.publisher || 'Academic Journal / Proceedings');

  const volume = item.volume ? String(item.volume) : undefined;
  const issue = item.issue ? String(item.issue) : undefined;
  const pages = item.page ? String(item.page) : undefined;
  const publisher = item.publisher ? String(item.publisher) : undefined;

  const isConfirmed = source === 'direct_doi' || source === 'extracted_from_url';

  return {
    doi,
    title,
    firstAuthor,
    authors: authors.length > 0 ? authors : [firstAuthor],
    year,
    journal,
    volume,
    issue,
    pages,
    publisher,
    isConfirmed,
    status: isConfirmed ? (source === 'extracted_from_url' ? 'DOI extracted from URL' : 'Matching DOI found') : 'Matching DOI found',
    confidence: isConfirmed ? 'confirmed' : 'high',
    source,
  };
}
