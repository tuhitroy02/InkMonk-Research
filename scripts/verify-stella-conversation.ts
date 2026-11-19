import { processStellaQuery, StellaContext } from '../lib/stellaEngine';
import assert from 'assert';

console.log('--- Testing Stella Multi-Turn Conversation ---');

// Test 1: Greetings do NOT lock the user into booking mode
const ctx1: StellaContext = { turnCount: 0 };
const r1 = processStellaQuery('hi', ctx1);
console.log('Turn 1 (hi) Response snippet:', r1.botMessage.slice(0, 80));
assert.strictEqual(ctx1.booking, undefined, 'Greeting should NOT initialize booking state');

// Test 2: Asking an academic question immediately after greeting works perfectly!
const r2 = processStellaQuery('How do I write a literature review?', ctx1);
console.log('Turn 2 (Literature Review) Snippet:', r2.botMessage.slice(0, 80));
assert.ok(r2.botMessage.includes('Literature Review'), 'Should answer literature review inquiry');

// Test 3: Test New Academic Rules
const testQueries = [
  { q: 'What is a null hypothesis and Type 1 error?', keyword: 'Hypothesis' },
  { q: 'How to calculate sample size using Yamane and Cochran formula?', keyword: 'Sample Size' },
  { q: 'What is Cronbach alpha and convergent validity AVE?', keyword: 'Psychometric Validity' },
  { q: 'What is the difference between scoping review and systematic review?', keyword: 'Scoping' },
  { q: 'How to interpret meta-analysis forest plot and I2 heterogeneity?', keyword: 'Meta-Analytic' },
  { q: 'What is CB-SEM vs PLS-SEM in SmartPLS and AMOS?', keyword: 'Structural Equation Modeling' },
  { q: 'How does mediation and moderation work in Hayes PROCESS macro?', keyword: 'Mediation' },
  { q: 'How to write a cover letter to journal editor-in-chief?', keyword: 'Cover Letter' },
  { q: 'How to recover from journal desk rejection?', keyword: 'Desk Rejection' },
  { q: 'What are top PhD viva voce defense questions?', keyword: 'Viva' },
  { q: 'What is double blind vs single blind peer review?', keyword: 'Double-Blind' },
  { q: 'Difference between patchwriting and plagiarism?', keyword: 'Patchwriting' },
  { q: 'What are Shodhganga guidelines and UGC-CARE list?', keyword: 'Shodhganga' },
  { q: 'How to use Overleaf LaTeX template and avoid BibTeX errors?', keyword: 'LaTeX' },
];

for (const { q, keyword } of testQueries) {
  const resp = processStellaQuery(q, { turnCount: 0 });
  console.log(`Query: "${q.slice(0, 45)}..." -> Found: ${resp.botMessage.includes(keyword) ? 'PASS' : 'FAIL'}`);
  assert.ok(resp.botMessage.includes(keyword), `Failed to match expected keyword "${keyword}" for query: "${q}"`);
}

// Test 4: Booking Flow starts ONLY on explicit request
const ctxBooking: StellaContext = { turnCount: 0 };
const rBooking1 = processStellaQuery('get a project estimate', ctxBooking);
assert.strictEqual(ctxBooking.booking?.step, 'LANGUAGE', 'Should start at step LANGUAGE');

// Test 5: While in booking flow, if user asks an academic question, Stella answers it without breaking!
const rBookingQuestion = processStellaQuery('What is ANOVA?', ctxBooking);
console.log('Booking Flow Question Response:', rBookingQuestion.botMessage.slice(0, 100));
assert.ok(rBookingQuestion.botMessage.includes('Statistical Test Selection Matrix'), 'Should answer ANOVA question');
assert.ok(rBookingQuestion.botMessage.toLowerCase().includes('quotation session is paused'), 'Should notify that quotation is paused');

console.log('\nALL 17 CONVERSATION & INTELLIGENCE TESTS PASSED 100%!');
