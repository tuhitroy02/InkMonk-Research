// components/toolkit/DoiCitationBibtexTool.tsx
'use client';

import React, { useState } from 'react';
import { normalizeDoi, ScholarlyArticle } from '@/lib/toolkit/doiEngine';
import { formatToAPA7, formatToIEEE, formatToBibTeX, ParsedReference } from '@/lib/toolkit/citationEngine';

const SAMPLE_DOIS = [
  { label: 'IEEE Signal Processing', val: '10.1109/5.771073' },
  { label: 'Nature (Deep Learning)', val: 'https://doi.org/10.1038/nature14539' },
  { label: 'ACM (Transformer Attention)', val: 'doi:10.1145/3065386' },
];

export default function DoiCitationBibtexTool() {
  const [doiInput, setDoiInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<ScholarlyArticle | null>(null);
  const [errorInfo, setErrorInfo] = useState<{ type: 'invalid' | 'missing' | 'rate_limit' | 'service'; msg: string } | null>(null);

  // Copy feedback
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!doiInput.trim()) return;

    setErrorInfo(null);
    setArticle(null);

    const normalized = normalizeDoi(doiInput);
    if (!normalized) {
      setErrorInfo({
        type: 'invalid',
        msg: 'Invalid DOI format. Please enter a valid DOI such as "10.1109/5.771073" or "https://doi.org/10.xxxx/yyyy".',
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/tools/doi-lookup?doi=${encodeURIComponent(normalized)}`);
      const json = await res.json();

      if (json.success && json.article) {
        setArticle(json.article);
      } else {
        if (json.status === 'Lookup temporarily unavailable') {
          setErrorInfo({
            type: 'service',
            msg: json.error || 'The scholarly metadata service is temporarily unreachable. Please retry shortly.',
          });
        } else {
          setErrorInfo({
            type: 'missing',
            msg: json.error || `DOI "${normalized}" could not be found in the registry.`,
          });
        }
      }
    } catch {
      setErrorInfo({
        type: 'service',
        msg: 'Network communication error while connecting to scholarly registry. Please check your connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Convert article to ParsedReference for formatting
  const toParsedRef = (art: ScholarlyArticle): ParsedReference => {
    return {
      id: art.doi,
      raw: '',
      authors: art.authors.join(', '),
      year: art.year,
      title: art.title,
      journal: art.journal,
      volume: art.volume || '',
      issue: art.issue || '',
      pages: art.pages || '',
      doi: art.doi,
      confidence: 'high',
      flaggedReasons: [],
    };
  };

  const getApaCitation = () => {
    if (!article) return '';
    return formatToAPA7(toParsedRef(article));
  };

  const getIeeeCitation = () => {
    if (!article) return '';
    return formatToIEEE(toParsedRef(article), 1);
  };

  const getBibtexRecord = () => {
    if (!article) return '';
    return formatToBibTeX(toParsedRef(article));
  };

  const handleCopy = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadBib = () => {
    const bibText = getBibtexRecord();
    const blob = new Blob([bibText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = article?.title
      ? `${article.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 25)}_citation.bib`
      : 'citation.bib';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const loadSampleDoi = (val: string) => {
    setDoiInput(val);
    setErrorInfo(null);
    setArticle(null);
  };

  // Check for incomplete metadata
  const missingMetadataFields: string[] = [];
  if (article) {
    if (!article.volume) missingMetadataFields.push('Volume');
    if (!article.issue) missingMetadataFields.push('Issue');
    if (!article.pages) missingMetadataFields.push('Pages');
  }

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>🏷️ DOI → Citation &amp; BibTeX</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Resolve any bare DOI or doi.org link to generate verified APA 7th, IEEE, and downloadable BibTeX entries.
        </p>
      </div>

      {/* Input Form */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Enter Bare DOI, &quot;doi:&quot; Value, or &quot;doi.org&quot; URL:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400">Sample DOIs:</span>
            {SAMPLE_DOIS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSampleDoi(s.val)}
                className="text-[11px] font-bold text-[#f97316] hover:underline cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={doiInput}
            onChange={(e) => setDoiInput(e.target.value)}
            placeholder="e.g. 10.1109/5.771073 or https://doi.org/10.1038/nature14539"
            className="flex-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8]"
          />
          <button
            type="button"
            onClick={handleLookup}
            disabled={!doiInput.trim() || loading}
            className="btn-clay-orange text-xs sm:text-sm py-3 px-6 font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {loading ? <span>Querying Registry…</span> : <span>Fetch Citation &amp; BibTeX →</span>}
          </button>
        </div>
      </div>

      {/* Useful Error & Warning States */}
      {errorInfo && (
        <div
          className={`p-4 rounded-2xl border-2 text-xs sm:text-sm flex items-start gap-3 ${
            errorInfo.type === 'invalid'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : errorInfo.type === 'missing'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
          }`}
        >
          <span className="text-base shrink-0">
            {errorInfo.type === 'invalid' ? '⚠️' : errorInfo.type === 'missing' ? '❌' : '⏳'}
          </span>
          <div>
            <h5 className="font-extrabold mb-0.5">
              {errorInfo.type === 'invalid' && 'Invalid Input Format'}
              {errorInfo.type === 'missing' && 'Record Not Found in Scholarly Database'}
              {errorInfo.type === 'service' && 'Registry Service Notice'}
            </h5>
            <p className="font-medium text-xs leading-relaxed">{errorInfo.msg}</p>
          </div>
        </div>
      )}

      {/* Metadata Verification Card */}
      {article && (
        <div className="space-y-6 pt-2">
          {/* Metadata Card */}
          <div className="card-clay-white p-6 border-2 border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
              <span className="font-mono text-xs font-black bg-blue-100 text-[#1d4ed8] dark:bg-blue-950 dark:text-blue-300 px-3 py-1 rounded-lg">
                Verified DOI: {article.doi}
              </span>
              <a
                href={`https://doi.org/${article.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#f97316] hover:underline flex items-center gap-1"
              >
                <span>View on doi.org</span>
                <span>↗</span>
              </a>
            </div>

            <h4 className="font-serif text-lg font-black text-slate-900 dark:text-white mb-2">
              {article.title}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Author(s)</span>
                <span className="font-black text-slate-800 dark:text-white">
                  {article.authors.join(', ') || article.firstAuthor}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Journal</span>
                <span className="font-black text-slate-800 dark:text-white">{article.journal}</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Year</span>
                <span className="font-black text-slate-800 dark:text-white">{article.year || 'N/A'}</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Volume / Issue / Pages</span>
                <span className="font-black text-slate-800 dark:text-white">
                  {article.volume ? `vol. ${article.volume}` : ''}
                  {article.issue ? `, no. ${article.issue}` : ''}
                  {article.pages ? `, pp. ${article.pages}` : ''}
                  {!article.volume && !article.pages && 'Online First / Ahead of Print'}
                </span>
              </div>
            </div>

            {/* Incomplete Metadata Warning */}
            {missingMetadataFields.length > 0 && (
              <div className="mt-4 p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <span>ℹ️</span>
                <span>
                  <strong>Partial metadata:</strong> The publisher registry entry is missing: {missingMetadataFields.join(', ')} (standard for early-access or preprint publications).
                </span>
              </div>
            )}
          </div>

          {/* Formats Grid: APA, IEEE, BibTeX */}
          <div className="grid grid-cols-1 gap-5">
            {/* 1. APA 7th Edition Output */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#1d4ed8] dark:text-blue-400 tracking-wider">
                  APA 7th Edition Format
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(getApaCitation(), 'APA')}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  {copiedFormat === 'APA' ? '✓ Copied APA' : '📋 Copy APA 7th'}
                </button>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-100 select-all">
                {getApaCitation()}
              </div>
            </div>

            {/* 2. IEEE Format Output */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#1d4ed8] dark:text-blue-400 tracking-wider">
                  IEEE Format
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(getIeeeCitation(), 'IEEE')}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  {copiedFormat === 'IEEE' ? '✓ Copied IEEE' : '📋 Copy IEEE'}
                </button>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-100 select-all">
                {getIeeeCitation()}
              </div>
            </div>

            {/* 3. BibTeX Record Output */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black uppercase text-[#1d4ed8] dark:text-blue-400 tracking-wider">
                  BibTeX Entry (@article)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(getBibtexRecord(), 'BIBTEX')}
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedFormat === 'BIBTEX' ? '✓ Copied BibTeX' : '📋 Copy BibTeX'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadBib}
                    className="btn-clay-orange text-xs py-1.5 px-3.5 font-bold cursor-pointer"
                  >
                    💾 Download .bib File
                  </button>
                </div>
              </div>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto">
                <pre>{getBibtexRecord()}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
