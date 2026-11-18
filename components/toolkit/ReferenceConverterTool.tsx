// components/toolkit/ReferenceConverterTool.tsx
'use client';

import React, { useState } from 'react';
import {
  ParsedReference,
  ConversionDirection,
  splitReferences,
  parseJournalReference,
  formatToAPA7,
  formatToIEEE,
} from '@/lib/toolkit/citationEngine';

const SAMPLE_APA = `Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30(2), 5998–6008. https://doi.org/10.48550/arXiv.1706.03762

LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539`;

const SAMPLE_IEEE = `[1] A. Vaswani, N. Shazeer, N. Parmar, and J. Uszkoreit, "Attention is all you need," Adv. Neural Inf. Process. Syst., vol. 30, no. 2, pp. 5998-6008, 2017, doi: 10.48550/arXiv.1706.03762.

[2] Y. LeCun, Y. Bengio, and G. Hinton, "Deep learning," Nature, vol. 521, no. 7553, pp. 436-444, May 2015, doi: 10.1038/nature14539.`;

export default function ReferenceConverterTool() {
  const [direction, setDirection] = useState<ConversionDirection>('APA_TO_IEEE');
  const [inputText, setInputText] = useState('');
  const [parsedEntries, setParsedEntries] = useState<ParsedReference[]>([]);
  const [copied, setCopied] = useState(false);
  const [hasParsed, setHasParsed] = useState(false);

  // Parse input
  const handleParse = () => {
    if (!inputText.trim()) return;
    const rawList = splitReferences(inputText);
    const parsed = rawList.map((raw) => parseJournalReference(raw, direction));
    setParsedEntries(parsed);
    setHasParsed(true);
  };

  // Update a field in the editable preview
  const handleFieldChange = (id: string, field: keyof ParsedReference, value: string) => {
    setParsedEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  };

  // Generate final output string
  const generateOutput = (): string => {
    return parsedEntries
      .map((entry, index) => {
        if (direction === 'APA_TO_IEEE') {
          return formatToIEEE(entry, index + 1);
        } else {
          return formatToAPA7(entry);
        }
      })
      .join('\n\n');
  };

  const handleCopyAll = () => {
    const text = generateOutput();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = (mode: 'APA' | 'IEEE') => {
    if (mode === 'APA') {
      setDirection('APA_TO_IEEE');
      setInputText(SAMPLE_APA);
    } else {
      setDirection('IEEE_TO_APA');
      setInputText(SAMPLE_IEEE);
    }
    setHasParsed(false);
    setParsedEntries([]);
  };

  const handleClear = () => {
    setInputText('');
    setParsedEntries([]);
    setHasParsed(false);
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>📚 APA ↔ IEEE Reference Converter</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Bi-directional reference converter with heuristic field parsing, editable verification, and list ordering.
          </p>
        </div>

        {/* Direction Switcher Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 shrink-0">
          <button
            type="button"
            onClick={() => {
              setDirection('APA_TO_IEEE');
              setHasParsed(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              direction === 'APA_TO_IEEE'
                ? 'bg-[#1d4ed8] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            APA 7th → IEEE
          </button>
          <button
            type="button"
            onClick={() => {
              setDirection('IEEE_TO_APA');
              setHasParsed(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              direction === 'IEEE_TO_APA'
                ? 'bg-[#1d4ed8] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            IEEE → APA 7th
          </button>
        </div>
      </div>

      {/* Scope Advisory Badge */}
      <div className="flex items-center gap-2 px-3.5 py-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs text-[#1d4ed8] dark:text-blue-300 font-medium">
        <span className="font-black text-sm">ℹ️</span>
        <span>
          <strong>Scope Notice:</strong> This release supports <strong>academic journal articles</strong> and periodical papers. Book and conference proceeding modules will be added in upcoming builds.
        </span>
      </div>

      {/* Paste Area & Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Paste {direction === 'APA_TO_IEEE' ? 'APA 7th' : 'IEEE'} References (One per line or separated by blank lines):
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadExample(direction === 'APA_TO_IEEE' ? 'APA' : 'IEEE')}
              className="text-xs font-bold text-[#f97316] hover:underline cursor-pointer"
            >
              Load Example
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setHasParsed(false);
          }}
          placeholder={
            direction === 'APA_TO_IEEE'
              ? 'e.g. Vaswani, A., Shazeer, N., & Parmar, N. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30(2), 5998–6008. https://doi.org/10.48550/arXiv.1706.03762'
              : 'e.g. [1] A. Vaswani, N. Shazeer, and N. Parmar, "Attention is all you need," Adv. Neural Inf. Process. Syst., vol. 30, no. 2, pp. 5998-6008, 2017, doi: 10.48550/arXiv.1706.03762.'
          }
          className="w-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all leading-relaxed"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleParse}
            disabled={!inputText.trim()}
            className="btn-clay-orange text-xs sm:text-sm py-2.5 px-6 font-extrabold flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>Parse &amp; Verify Metadata</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Editable Field Preview (Shown after parsing) */}
      {hasParsed && parsedEntries.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>🔍 Editable Field Preview</span>
              <span className="text-xs font-bold text-slate-500">
                ({parsedEntries.length} {parsedEntries.length === 1 ? 'Reference' : 'References'} Parsed)
              </span>
            </h4>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              Verify or adjust fields before generating final citations
            </span>
          </div>

          <div className="space-y-4">
            {parsedEntries.map((entry, index) => (
              <div
                key={entry.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  entry.confidence === 'low'
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Header row: Index & Confidence Flag */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="bg-[#1d4ed8] text-white text-xs font-black px-2.5 py-0.5 rounded-lg font-mono">
                    Entry #{index + 1}
                  </span>

                  {entry.flaggedReasons.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {entry.flaggedReasons.map((reason, rIdx) => (
                        <span
                          key={rIdx}
                          className="bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 text-[10px] font-black px-2 py-0.5 rounded-full"
                        >
                          ⚠️ {reason}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                      ✓ High Confidence Match
                    </span>
                  )}
                </div>

                {/* Original Raw Text Display (Preserved for review) */}
                <div className="mb-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                    Original Pasted Reference:
                  </span>
                  <p className="font-mono text-[11px] break-words">{entry.raw}</p>
                </div>

                {/* Editable Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                      Author(s):
                    </label>
                    <input
                      type="text"
                      value={entry.authors}
                      onChange={(e) => handleFieldChange(entry.id, 'authors', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                      Publication Year:
                    </label>
                    <input
                      type="text"
                      value={entry.year}
                      onChange={(e) => handleFieldChange(entry.id, 'year', e.target.value)}
                      placeholder="e.g. 2023"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                      DOI (Optional):
                    </label>
                    <input
                      type="text"
                      value={entry.doi}
                      onChange={(e) => handleFieldChange(entry.id, 'doi', e.target.value)}
                      placeholder="10.xxxx/yyyy"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                      Article Title:
                    </label>
                    <input
                      type="text"
                      value={entry.title}
                      onChange={(e) => handleFieldChange(entry.id, 'title', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                      Journal Name:
                    </label>
                    <input
                      type="text"
                      value={entry.journal}
                      onChange={(e) => handleFieldChange(entry.id, 'journal', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                      Volume:
                    </label>
                    <input
                      type="text"
                      value={entry.volume}
                      onChange={(e) => handleFieldChange(entry.id, 'volume', e.target.value)}
                      placeholder="e.g. 42"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                      Issue / Number:
                    </label>
                    <input
                      type="text"
                      value={entry.issue}
                      onChange={(e) => handleFieldChange(entry.id, 'issue', e.target.value)}
                      placeholder="e.g. 3"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                      Page Range / Article No.:
                    </label>
                    <input
                      type="text"
                      value={entry.pages}
                      onChange={(e) => handleFieldChange(entry.id, 'pages', e.target.value)}
                      placeholder="e.g. 112–125"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Generated Result Output */}
          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-serif text-lg font-black text-slate-900 dark:text-white">
                  Generated {direction === 'APA_TO_IEEE' ? 'IEEE Reference List' : 'APA 7th Reference List'}
                </h4>
                {direction === 'APA_TO_IEEE' && (
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-0.5">
                    ⚠️ Note: IEEE references are numbered in the supplied order. Manuscript in-text citations must follow this exact numerical sequence ([1], [2], ...).
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleCopyAll}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>{copied ? '✓ Copied to Clipboard!' : '📋 Copy All References'}</span>
              </button>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 font-mono text-xs leading-relaxed overflow-x-auto border-2 border-slate-800">
              <pre className="whitespace-pre-wrap">{generateOutput()}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
