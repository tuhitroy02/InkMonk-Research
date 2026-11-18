// scripts/verify-research-toolkit.ts
import assert from 'node:assert';
import {
  parseJournalReference,
  formatToAPA7,
  formatToIEEE,
  formatToBibTeX,
  splitReferences,
  convertAuthorsToIEEE,
  convertAuthorsToAPA,
} from '../lib/toolkit/citationEngine';
import {
  normalizeDoi,
  extractDoiFromUrl,
} from '../lib/toolkit/doiEngine';
import {
  generateResponseLetter,
  validateReviewerComments,
} from '../lib/toolkit/reviewerResponseEngine';
import {
  calculateWordCount,
  formatWordCountSummary,
} from '../lib/toolkit/wordCountEngine';

console.log('════════════════════════════════════════════════════════════════════');
console.log('INKMONK RESEARCH TOOLKIT VERIFICATION TEST SUITE');
console.log('════════════════════════════════════════════════════════════════════\n');

// ─────────────────────────────────────────────────────────────────────────────
// 1. Tool 1: Reference Converter Tests (APA ↔ IEEE)
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- [1] Testing APA ↔ IEEE Reference Converter Engine ---');

const sampleApaRef = 'Vaswani, A., Shazeer, N., & Parmar, N. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30(2), 5998–6008. https://doi.org/10.48550/arXiv.1706.03762';
const sampleIeeeRef = '[1] Y. LeCun, Y. Bengio, and G. Hinton, "Deep learning," Nature, vol. 521, no. 7553, pp. 436-444, May 2015, doi: 10.1038/nature14539.';

// Test 1.1: Split references
const multiRef = `${sampleApaRef}\n\n${sampleIeeeRef}`;
const split = splitReferences(multiRef);
assert.strictEqual(split.length, 2, 'Should split 2 references separated by double newline');

// Test 1.2: Author conversion
const ieeeAuthors = convertAuthorsToIEEE('Vaswani, A., Shazeer, N., & Parmar, N.');
assert(ieeeAuthors.includes('A. Vaswani') && ieeeAuthors.includes('N. Parmar'), 'Author conversion to IEEE failed');

const apaAuthors = convertAuthorsToAPA('Y. LeCun, Y. Bengio, and G. Hinton');
assert(apaAuthors.includes('LeCun, Y.') && apaAuthors.includes('Bengio, Y.'), 'Author conversion to APA failed');

// Test 1.3: Parse APA Reference
const parsedApa = parseJournalReference(sampleApaRef, 'APA_TO_IEEE');
assert.strictEqual(parsedApa.year, '2017', 'Year must be 2017');
assert.strictEqual(parsedApa.volume, '30', 'Volume must be 30');
assert.strictEqual(parsedApa.issue, '2', 'Issue must be 2');
assert.strictEqual(parsedApa.doi, '10.48550/arXiv.1706.03762', 'DOI extraction failed');
assert.strictEqual(parsedApa.confidence, 'high', 'Confidence should be high for standard APA');

// Test 1.4: Format to IEEE
const formattedIeee = formatToIEEE(parsedApa, 1);
assert(formattedIeee.startsWith('[1]'), 'IEEE output must start with numerical index [1]');
assert(formattedIeee.includes('"Attention is all you need,"'), 'IEEE title must be in quotes');
assert(formattedIeee.includes('vol. 30'), 'IEEE must include volume');
assert(formattedIeee.includes('doi: 10.48550/arXiv.1706.03762'), 'IEEE must format DOI with doi: prefix');

// Test 1.5: Parse IEEE Reference
const parsedIeee = parseJournalReference(sampleIeeeRef, 'IEEE_TO_APA');
assert.strictEqual(parsedIeee.title, 'Deep learning', 'IEEE title extraction failed');
assert.strictEqual(parsedIeee.volume, '521', 'IEEE volume extraction failed');
assert.strictEqual(parsedIeee.issue, '7553', 'IEEE issue extraction failed');
assert.strictEqual(parsedIeee.pages, '436-444', 'IEEE pages extraction failed');

// Test 1.6: Format to APA 7th
const formattedApa = formatToAPA7(parsedIeee);
assert(formattedApa.includes('(2015).'), 'APA 7th must format year in parentheses');
assert(formattedApa.includes('https://doi.org/10.1038/nature14539'), 'APA 7th must format DOI as https URL');

// Test 1.7: Format to BibTeX
const bibtex = formatToBibTeX(parsedApa);
assert(bibtex.startsWith('@article{'), 'BibTeX must be @article');
assert(bibtex.includes('doi       = {10.48550/arXiv.1706.03762}'), 'BibTeX must contain doi field');

// Test 1.8: Flagging incomplete/ambiguous reference
const incompleteRef = 'Some Author. Just a random incomplete note with no journal or year';
const parsedIncomplete = parseJournalReference(incompleteRef, 'APA_TO_IEEE');
assert(parsedIncomplete.confidence === 'low' || parsedIncomplete.confidence === 'medium', 'Should flag incomplete ref');
assert(parsedIncomplete.flaggedReasons.length > 0, 'Must provide flagged reasons');

console.log('✓ Reference Converter passed all 8 unit tests.\n');

// ─────────────────────────────────────────────────────────────────────────────
// 2. Tool 2: URL → DOI Finder Tests
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- [2] Testing URL → DOI Finder Engine ---');

// Test 2.1: Direct doi.org link
const ext1 = extractDoiFromUrl('https://doi.org/10.1109/5.771073');
assert.strictEqual(ext1.status, 'DOI extracted from URL');
assert.strictEqual(ext1.doi, '10.1109/5.771073');

// Test 2.2: Publisher URL with embedded DOI (ScienceDirect)
const ext2 = extractDoiFromUrl('https://www.sciencedirect.com/science/article/pii/S000437022030118X?doi=10.1016/j.artint.2020.103324');
assert.strictEqual(ext2.status, 'DOI extracted from URL');
assert.strictEqual(ext2.doi, '10.1016/j.artint.2020.103324');

// Test 2.3: URL-encoded DOI in URL
const ext3 = extractDoiFromUrl('https://example.com/item?id=10.1016%2Fj.neucom.2020.01.001#fragment');
assert.strictEqual(ext3.status, 'DOI extracted from URL');
assert.strictEqual(ext3.doi, '10.1016/j.neucom.2020.01.001');

// Test 2.4: URL with trailing punctuation
const ext4 = extractDoiFromUrl('https://doi.org/10.1038/nature14539.');
assert.strictEqual(ext4.doi, '10.1038/nature14539', 'Must trim trailing punctuation from DOI');

// Test 2.5: URL without DOI pattern
const ext5 = extractDoiFromUrl('https://www.nature.com/news/some-editorial-blog-post');
assert.strictEqual(ext5.status, 'No DOI found');
assert.strictEqual(ext5.doi, null);

console.log('✓ URL → DOI Finder passed all 5 extraction tests.\n');

// ─────────────────────────────────────────────────────────────────────────────
// 3. Tool 3: DOI Normalization & Citation / BibTeX Tests
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- [3] Testing DOI Normalization & Format Generator ---');

// Test 3.1: Normalization
assert.strictEqual(normalizeDoi('doi:10.1109/5.771073'), '10.1109/5.771073');
assert.strictEqual(normalizeDoi('https://doi.org/10.1038/nature14539'), '10.1038/nature14539');
assert.strictEqual(normalizeDoi('http://dx.doi.org/10.1016/j.artint.2020.103324'), '10.1016/j.artint.2020.103324');
assert.strictEqual(normalizeDoi('invalid-doi-format'), null);

console.log('✓ DOI Normalization passed all 4 format tests.\n');

// ─────────────────────────────────────────────────────────────────────────────
// 4. Tool 4: Reviewer Response Builder Tests
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- [4] Testing Reviewer Response Builder Engine ---');

const testGroups = [
  {
    id: 'grp-1',
    reviewerNumber: 1,
    reviewerName: 'Reviewer #1',
    comments: [
      {
        id: 'c-1-1',
        reviewerComment: 'Clarify baseline model.',
        authorResponse: 'We have clarified Section 3.',
        locationChanged: 'Page 4, Line 12',
      },
      {
        id: 'c-1-2',
        reviewerComment: 'Check equation 4.',
        authorResponse: '', // Unanswered!
        locationChanged: '',
      },
    ],
  },
];

// Test 4.1: Unanswered comment validation
const val = validateReviewerComments(testGroups);
assert.strictEqual(val.isFullyAnswered, false, 'Must flag incomplete comment');
assert.strictEqual(val.unansweredComments.length, 1);
assert.strictEqual(val.unansweredComments[0].commentIndex, 2);

// Test 4.2: Response Letter Generation
const letter = generateResponseLetter(
  {
    manuscriptTitle: 'Neural Adaptive Control for Microgrids',
    manuscriptId: 'IEEE-2026-001',
    targetJournal: 'IEEE Transactions',
    authorName: 'Dr. Debabrata Roy',
  },
  testGroups
);

assert(letter.includes('POINT-BY-POINT RESPONSE TO EDITORS AND REVIEWERS'), 'Must contain header');
assert(letter.includes('Comment 1.1:'), 'Must number comment 1.1');
assert(letter.includes('"Clarify baseline model."'), 'Must keep reviewer original wording');
assert(letter.includes('Page 4, Line 12'), 'Must include location changed');

console.log('✓ Reviewer Response Builder passed all validation and letter generation tests.\n');

// ─────────────────────────────────────────────────────────────────────────────
// 5. Tool 5: Multilingual Word Count Calculator Tests
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- [5] Testing Multilingual Word Count Calculator Engine ---');

// Test 5.1: English counting with hyphenated compound
const engText = 'This is a state-of-the-art peer-reviewed research paper.';
const engMetrics = calculateWordCount(engText, 10);
// "This" (1), "is" (2), "a" (3), "state-of-the-art" (4), "peer-reviewed" (5), "research" (6), "paper" (7)
assert.strictEqual(engMetrics.words, 7, `Expected 7 words with hyphenated compounds, got ${engMetrics.words}`);
assert.strictEqual(engMetrics.detectedScript, 'English / Latin');
assert.strictEqual(engMetrics.isOverLimit, false);
assert.strictEqual(engMetrics.wordsRemaining, 3); // 10 - 7 = 3

// Test 5.2: Hindi Devanagari text counting
const hindiText = 'प्रेमचंद का साहित्य भारतीय समाज का यथार्थवादी दर्पण है। इसमें कृषकों के जीवन का चित्रण हुआ है।';
const hindiMetrics = calculateWordCount(hindiText, 15);
assert(hindiMetrics.words >= 15, `Expected at least 15 words in Hindi excerpt, got ${hindiMetrics.words}`);
assert.strictEqual(hindiMetrics.detectedScript, 'Hindi / Devanagari');

// Test 5.3: Empty input handling
const emptyMetrics = calculateWordCount('');
assert.strictEqual(emptyMetrics.words, 0);
assert.strictEqual(emptyMetrics.charactersWithSpaces, 0);
assert.strictEqual(emptyMetrics.paragraphs, 0);
assert.strictEqual(emptyMetrics.detectedScript, 'Empty');

// Test 5.4: Paragraph count
const multiPara = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.';
const paraMetrics = calculateWordCount(multiPara);
assert.strictEqual(paraMetrics.paragraphs, 3, 'Expected 3 paragraphs');

// Test 5.5: Over limit calculation
const overMetrics = calculateWordCount('One two three four five six', 5);
assert.strictEqual(overMetrics.words, 6);
assert.strictEqual(overMetrics.isOverLimit, true);
assert.strictEqual(overMetrics.wordsOver, 1);

// Test 5.6: Summary formatting
const summary = formatWordCountSummary(engMetrics);
assert(summary.includes('Total Words: 7'));
assert(summary.includes('Methodology: Hyphenated compound terms counted as 1 word'));

console.log('✓ Multilingual Word Count Calculator passed all 6 tests.\n');

// ─────────────────────────────────────────────────────────────────────────────
// 6. Tool 2 & 3 Server Route Lookup Tests (/api/tools/doi-lookup)
// ─────────────────────────────────────────────────────────────────────────────
async function runServerTests() {
  console.log('--- [6] Testing Server DOI Lookup API Route ---');
  const { GET: doiLookupGet, POST: doiLookupPost } = await import('../app/api/tools/doi-lookup/route');
  const { NextRequest } = await import('next/server');

  // Test 6.1: Direct DOI lookup via GET
  const req1 = new NextRequest('http://localhost:3000/api/tools/doi-lookup?doi=10.1109/5.771073');
  const res1 = await doiLookupGet(req1);
  const data1 = await res1.json();
  assert.strictEqual(data1.success, true, 'GET DOI lookup failed');
  assert(data1.article?.title, 'Article title missing');
  console.log('  Lookup Result:', data1.article.doi, '->', data1.article.title);

  // Test 6.2: Invalid DOI error handling
  const req2 = new NextRequest('http://localhost:3000/api/tools/doi-lookup?doi=invalid-doi');
  const res2 = await doiLookupGet(req2);
  const data2 = await res2.json();
  assert.strictEqual(data2.success, false, 'Invalid DOI should return success=false');
  assert.strictEqual(data2.status, 'No DOI found');

  // Test 6.3: POST search by Title and Author
  const req3 = new NextRequest('http://localhost:3000/api/tools/doi-lookup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'Attention Is All You Need', author: 'Vaswani' }),
  });
  const res3 = await doiLookupPost(req3);
  const data3 = await res3.json();
  assert.strictEqual(data3.success, true, 'Title/author search failed');
  assert(data3.article?.doi, 'Expected matching DOI from search');
  console.log('  Search Result:', data3.article.doi, '->', data3.article.title);

  console.log('✓ Server DOI Lookup API passed all 3 integration tests.\n');

  console.log('════════════════════════════════════════════════════════════════════');
  console.log('✅ ALL FIVE TOOLKIT ENGINES & API ROUTES PASSED 100% OF VERIFICATION CHECKS!');
  console.log('════════════════════════════════════════════════════════════════════');
}

runServerTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
