// scripts/verify-quote-flow.mjs
import assert from 'node:assert';
import { calculateQuote } from '../lib/pricing/catalogue.ts';
import { processStellaQuery } from '../lib/stellaEngine.ts';

console.log('--- 1. Testing Catalogue Price Parity ---');

// Test 1: EN Non-Tech Research Paper (User Scenario)
const q1 = calculateQuote({
  language: 'EN',
  workType: 'NON_TECH',
  service: 'RESEARCH_PAPER',
  package: 'UPTO_6000_WORDS',
});
console.log('Test 1 (EN Non-Tech Paper):', q1.totalFormatted, q1.totalPaise);
assert.strictEqual(q1.totalPaise, 499900, 'Price must be 499900 paise (₹4,999)');
assert.strictEqual(q1.totalFormatted, '₹4,999', 'Formatted price must be ₹4,999');

// Test 2: Turnitin 1 file and 3 files
const q2_1 = calculateQuote({ language: 'TURNITIN', service: 'TURNITIN_REPORT', quantity: 1 });
console.log('Test 2.1 (Turnitin 1 file):', q2_1.totalFormatted, q2_1.totalPaise);
assert.strictEqual(q2_1.totalPaise, 20000, 'Turnitin 1 file must be ₹200');

const q2_3 = calculateQuote({ language: 'TURNITIN', service: 'TURNITIN_REPORT', quantity: 3 });
console.log('Test 2.2 (Turnitin 3 files):', q2_3.totalFormatted, q2_3.totalPaise);
assert.strictEqual(q2_3.totalPaise, 60000, 'Turnitin 3 files must be ₹600');

// Test 3: EN Tech Research Paper with Model
const q3 = calculateQuote({ language: 'EN', workType: 'TECH', service: 'RESEARCH_PAPER' });
console.log('Test 3 (EN Tech Paper):', q3.totalFormatted, q3.totalPaise);
assert.strictEqual(q3.totalPaise, 899800, 'Price must be 899800 paise (₹8,998)');

// Test 4: HI Non-Tech Research Paper
const q4 = calculateQuote({ language: 'HI', workType: 'NON_TECH', service: 'RESEARCH_PAPER' });
console.log('Test 4 (HI Non-Tech Paper):', q4.totalFormatted, q4.totalPaise);
assert.strictEqual(q4.totalPaise, 699900, 'Price must be 699900 paise (₹6,999)');

console.log('--- 2. Testing Stella Conversational Flow ---');
let context = { turnCount: 0 };

// Turn 1: Greeting
const res1 = processStellaQuery('Hello', context);
console.log('Stella Turn 1 (Greeting):', res1.suggestedChips);
assert(context.booking, 'Booking must be initiated');
assert.strictEqual(context.booking.step, 'LANGUAGE', 'Must be at LANGUAGE step');

// Turn 2: Language -> English
const res2 = processStellaQuery('English Academic Writing', context);
console.log('Stella Turn 2 (Language):', res2.suggestedChips);
assert.strictEqual(context.booking.language, 'EN', 'Language must be EN');
assert.strictEqual(context.booking.step, 'SERVICE', 'Must be at SERVICE step');

// Turn 3: Service -> Research Paper
const res3 = processStellaQuery('Research Paper Writing', context);
console.log('Stella Turn 3 (Service):', res3.suggestedChips);
assert.strictEqual(context.booking.service, 'RESEARCH_PAPER', 'Service must be RESEARCH_PAPER');
assert.strictEqual(context.booking.step, 'WORK_TYPE', 'Must be at WORK_TYPE step');

// Turn 4: Domain -> Non-Technical
const res4 = processStellaQuery('Non-Technical (Humanities, Social Sciences, Law, Mgmt)', context);
console.log('Stella Turn 4 (WorkType):', res4.suggestedChips);
assert.strictEqual(context.booking.workType, 'NON_TECH', 'WorkType must be NON_TECH');
assert.strictEqual(context.booking.step, 'TOPIC', 'Must be at TOPIC step');

// Turn 5: Topic -> Education policy
const res5 = processStellaQuery('Education policy', context);
console.log('Stella Turn 5 (Topic):', res5.suggestedChips);
assert.strictEqual(context.booking.topic, 'Education policy', 'Topic must be Education policy');
assert.strictEqual(context.booking.step, 'DEADLINE', 'Must be at DEADLINE step');

// Turn 6: Deadline -> 21 days
const res6 = processStellaQuery('21 days', context);
console.log('Stella Turn 6 (Deadline):', res6.suggestedChips);
assert.strictEqual(context.booking.deadline, '21 days', 'Deadline must be 21 days');
assert.strictEqual(context.booking.step, 'REMARKS', 'Must be at REMARKS step');

// Turn 7: Remarks -> Standard Journal Guidelines (Summary & Final Quote)
const res7 = processStellaQuery('Standard Journal Guidelines', context);
console.log('Stella Turn 7 (Summary):', res7.actionLink);
assert(res7.botMessage.includes('₹4,999'), 'Quote must display ₹4,999 in bot message');
assert(res7.botMessage.includes('Education policy'), 'Bot message must contain Education policy');
assert(res7.actionLink?.href.includes('service=RESEARCH_PAPER'), 'Action link must prefill service');
assert(res7.actionLink?.href.includes('domain=Education%20policy'), 'Action link must prefill domain');

console.log('✅ ALL VERIFICATION CHECKS PASSED PERFECTLY!');
