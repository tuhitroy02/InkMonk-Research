// components/toolkit/WordCountTool.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { calculateWordCount, formatWordCountSummary } from '@/lib/toolkit/wordCountEngine';

const SAMPLE_ENGLISH = `Abstract:
In contemporary computational linguistics, transformer-based neural architectures have redefined benchmark performance across sequence transduction tasks. However, multi-head self-attention mechanisms exhibit quadratic memory complexity with respect to sequence length, creating critical bottlenecks in resource-constrained edge computing environments.

This paper proposes an empirically validated hybrid recurrent-attention framework designed specifically for high-frequency biomedical telemetry. Through systematic 5-fold cross-validation on 12,000 ECG recording sequences, our state-of-the-art model achieves a 94.8% classification accuracy while reducing floating-point operations by 38.2%. The proposed approach demonstrates robust noise-resilience under clinical signal degradation.`;

const SAMPLE_HINDI = `शोध सारांश:
समकालीन भारतीय समाजशास्त्र एवं साहित्य में यथार्थवादी विमर्श का अध्ययन अत्यंत महत्वपूर्ण है। यह शोध पत्र प्रेमचंद के उपन्यासों में चित्रित सामाजिक स्तरीकरण, कृषक शोषण तथा सामंती व्यवस्था के अंतर्विरोधों का समालोचनात्मक विश्लेषण प्रस्तुत करता है।

शोध प्रविधि के अंतर्गत ऐतिहासिक-भौतिकवादी दृष्टिकोण का प्रयोग किया गया है। प्राथमिक स्रोतों के रूप में 'गोदान' एवं 'कर्मभूमि' के मूल पाठों का परीक्षण करते हुए तत्कालीन सामाजिक-आर्थिक परिस्थितियों का तुलनात्मक मूल्यांकन किया गया है। यह अध्ययन सिद्ध करता है कि प्रेमचंद का यथार्थवाद मात्र विवरणात्मक न होकर समाज-सुधार की सशक्त चेतना से संपृक्त है।`;

export default function WordCountTool() {
  const [text, setText] = useState('');
  const [wordLimitStr, setWordLimitStr] = useState<string>('3000');
  const [copied, setCopied] = useState(false);

  const wordLimit = useMemo(() => {
    const parsed = parseInt(wordLimitStr, 10);
    return isNaN(parsed) || parsed <= 0 ? undefined : parsed;
  }, [wordLimitStr]);

  const metrics = useMemo(() => {
    return calculateWordCount(text, wordLimit);
  }, [text, wordLimit]);

  const handleCopySummary = () => {
    const summary = formatWordCountSummary(metrics);
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>📊 Multilingual Word Count Calculator</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Precision real-time word, character, and paragraph auditor supporting English academic manuscripts and Hindi (देवनागरी) research.
        </p>
      </div>

      {/* Primary Metrics Counter Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Word Count */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-center shadow-xs hover:border-blue-400/50 transition-all duration-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Total Words</span>
          <div className="text-3xl font-black text-[#1d4ed8] dark:text-blue-400">
            {metrics.words.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 block">
            ~{metrics.readingTimeMinutes} min reading
          </span>
        </div>

        {/* Characters (with spaces) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-center shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Chars (w/ Spaces)</span>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {metrics.charactersWithSpaces.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1 block">Including spaces</span>
        </div>

        {/* Characters (without spaces) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-center shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Chars (No Spaces)</span>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {metrics.charactersWithoutSpaces.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1 block">Letters &amp; punctuation</span>
        </div>

        {/* Paragraphs */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-center shadow-xs hover:border-orange-400/50 transition-all duration-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Paragraphs</span>
          <div className="text-2xl font-black text-[#f97316]">
            {metrics.paragraphs.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1 block">
            Script: {metrics.detectedScript}
          </span>
        </div>
      </div>

      {/* Target Word Limit Bar */}
      <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border-2 border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 shrink-0">
            Journal / University Word Limit:
          </label>
          <input
            type="number"
            value={wordLimitStr}
            onChange={(e) => setWordLimitStr(e.target.value)}
            placeholder="e.g. 3000"
            className="w-28 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-black font-mono focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all duration-200"
          />
        </div>

        {wordLimit && (
          <div className="flex items-center gap-2">
            {metrics.isOverLimit ? (
              <span className="bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 text-xs font-black px-3.5 py-1.5 rounded-full border border-rose-300 dark:border-rose-700/80 shadow-2xs">
                ⚠️ Over Limit: +{metrics.wordsOver?.toLocaleString()} words
              </span>
            ) : (
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-black px-3.5 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-700/80 shadow-2xs">
                ✓ On Track: {metrics.wordsRemaining?.toLocaleString()} words remaining
              </span>
            )}
          </div>
        )}
      </div>

      {/* Text Area & Quick Samples */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Type or Paste Text:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setText(SAMPLE_ENGLISH)}
              className="text-xs font-bold text-[#1d4ed8] dark:text-blue-400 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
            >
              Load Sample (English)
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              type="button"
              onClick={() => setText(SAMPLE_HINDI)}
              className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] dark:hover:text-orange-400 hover:underline cursor-pointer transition-colors"
            >
              Load Sample (Hindi देवनागरी)
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your manuscript abstract, chapter, or response draft here…"
          className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-700 rounded-2xl p-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-3 focus:ring-[#1d4ed8]/20 transition-all duration-200 shadow-2xs"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium max-w-xl">
            <strong>Counting Methodology:</strong> Hyphenated compound terms (e.g., <em>state-of-the-art</em> or <em>शोध-प्रबंध</em>) are counted as 1 word, matching Microsoft Word. Devanagari Hindi text respects whitespace and traditional sentence danda (<em>।</em>) boundaries. Processed 100% locally in your browser.
          </p>

          <button
            type="button"
            onClick={handleCopySummary}
            disabled={metrics.words === 0}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 text-slate-800 dark:text-slate-100 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs focus:ring-2 focus:ring-slate-400/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? '✓ Summary Copied!' : '📋 Copy Results Summary'}
          </button>
        </div>
      </div>
    </div>
  );
}
