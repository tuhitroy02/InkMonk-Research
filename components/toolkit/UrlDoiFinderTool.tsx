// components/toolkit/UrlDoiFinderTool.tsx
'use client';

import React, { useState } from 'react';
import { extractDoiFromUrl, ScholarlyArticle } from '@/lib/toolkit/doiEngine';

const SAMPLE_URLS = [
  {
    label: 'Direct DOI Resolver',
    url: 'https://doi.org/10.1109/5.771073',
  },
  {
    label: 'ScienceDirect / Elsevier',
    url: 'https://www.sciencedirect.com/science/article/pii/S000437022030118X?doi=10.1016/j.artint.2020.103324',
  },
  {
    label: 'Springer Nature Article',
    url: 'https://link.springer.com/article/10.1007/s11263-020-01387-4#Sec1',
  },
];

export default function UrlDoiFinderTool() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // States: 'IDLE' | 'EXTRACTED' | 'NEEDS_SEARCH' | 'SEARCH_RESULT' | 'NO_DOI' | 'UNAVAILABLE'
  const [statusState, setStatusState] = useState<
    'DOI extracted from URL' | 'Matching DOI found' | 'No DOI found' | 'Lookup temporarily unavailable' | 'IDLE'
  >('IDLE');

  const [extractedDoi, setExtractedDoi] = useState<string | null>(null);
  const [article, setArticle] = useState<ScholarlyArticle | null>(null);

  // Fallback Title Search form
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searching, setSearching] = useState(false);

  const [copiedDoi, setCopiedDoi] = useState(false);

  // Analyze Pasted URL
  const handleInspectUrl = async () => {
    if (!urlInput.trim()) return;

    setErrorMsg(null);
    setArticle(null);
    setLoading(true);

    const extraction = extractDoiFromUrl(urlInput);

    if (extraction.doi) {
      setExtractedDoi(extraction.doi);
      setStatusState('DOI extracted from URL');

      // Fetch metadata from approved Crossref endpoint
      try {
        const res = await fetch(`/api/tools/doi-lookup?doi=${encodeURIComponent(extraction.doi)}`);
        const json = await res.json();

        if (json.success && json.article) {
          setArticle(json.article);
        } else {
          // If metadata lookup returned 404/error, we still have the extracted DOI
          setArticle({
            doi: extraction.doi,
            title: 'Extracted DOI from Publisher URL (Metadata unverified in Crossref)',
            firstAuthor: 'Not Indexed in Crossref',
            authors: [],
            year: '',
            journal: 'Publisher Archive',
            isConfirmed: true,
            status: 'DOI extracted from URL',
            confidence: 'confirmed',
            source: 'extracted_from_url',
          });
        }
      } catch {
        // Network fallback
        setArticle({
          doi: extraction.doi,
          title: 'Extracted DOI from URL',
          firstAuthor: 'Unknown',
          authors: [],
          year: '',
          journal: 'Direct Identifier',
          isConfirmed: true,
          status: 'DOI extracted from URL',
          confidence: 'confirmed',
          source: 'extracted_from_url',
        });
      } finally {
        setLoading(false);
      }
    } else {
      // URL contains no DOI pattern
      setExtractedDoi(null);
      setStatusState('No DOI found');
      setErrorMsg(extraction.details || 'No DOI identifier found in this URL.');
      setLoading(false);
    }
  };

  // Search by Title / Author / Year
  const handleScholarlySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTitle.trim()) return;

    setSearching(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/tools/doi-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchTitle,
          author: searchAuthor,
          year: searchYear,
        }),
      });

      const json = await res.json();
      if (json.success && json.article) {
        setArticle(json.article);
        setExtractedDoi(json.article.doi);
        setStatusState('Matching DOI found');
      } else {
        setStatusState('No DOI found');
        setErrorMsg(json.error || 'No matching academic records found for this title and author.');
      }
    } catch {
      setStatusState('Lookup temporarily unavailable');
      setErrorMsg('The Crossref scholarly search service is temporarily busy. Please retry shortly.');
    } finally {
      setSearching(false);
    }
  };

  const handleCopyDoi = () => {
    if (!extractedDoi) return;
    navigator.clipboard.writeText(extractedDoi);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const handleConfirmDoi = () => {
    if (article) {
      setArticle({ ...article, isConfirmed: true, confidence: 'confirmed' });
    }
  };

  const loadSampleUrl = (url: string) => {
    setUrlInput(url);
    setStatusState('IDLE');
    setArticle(null);
    setExtractedDoi(null);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>🔗 URL → DOI Finder</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Extract verified Digital Object Identifiers (DOIs) from publisher links, or search scholarly metadata registries.
        </p>
      </div>

      {/* Security and Privacy Notice */}
      <div className="px-3.5 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-medium flex items-center gap-2">
        <span>🛡️</span>
        <span>
          <strong>Safe Registry Inspection:</strong> URL extraction runs locally in your browser. Queries use approved Crossref REST endpoints without making arbitrary server-side web requests.
        </span>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Paste Article or Publisher URL:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400">Sample URLs:</span>
            {SAMPLE_URLS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSampleUrl(s.url)}
                className="text-[11px] font-bold text-[#f97316] hover:underline cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="e.g. https://link.springer.com/article/10.1007/s11263-020-01387-4"
            className="flex-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8]"
          />
          <button
            type="button"
            onClick={handleInspectUrl}
            disabled={!urlInput.trim() || loading}
            className="btn-clay-orange text-xs sm:text-sm py-3 px-6 font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {loading ? <span>Analyzing URL…</span> : <span>Extract DOI →</span>}
          </button>
        </div>
      </div>

      {/* Status Bar */}
      {statusState !== 'IDLE' && (
        <div
          className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-3 ${
            statusState === 'DOI extracted from URL'
              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-[#1d4ed8] dark:text-blue-300'
              : statusState === 'Matching DOI found'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : statusState === 'No DOI found'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
            <span>
              {statusState === 'DOI extracted from URL' && '🎯'}
              {statusState === 'Matching DOI found' && '✓'}
              {statusState === 'No DOI found' && '⚠️'}
              {statusState === 'Lookup temporarily unavailable' && '⏳'}
            </span>
            <span>Status: {statusState}</span>
          </div>

          {errorMsg && <p className="text-xs font-medium">{errorMsg}</p>}
        </div>
      )}

      {/* Article Result Card */}
      {article && (
        <div className="card-clay-white p-6 border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-[#1d4ed8] text-white px-3 py-1 rounded-lg">
                DOI: {article.doi}
              </span>
              {article.isConfirmed ? (
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Confirmed Record
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Suggested Search Match (Medium Confidence)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyDoi}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
              >
                {copiedDoi ? '✓ Copied DOI' : '📋 Copy DOI'}
              </button>
              <a
                href={`https://doi.org/${article.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1d4ed8] hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
              >
                <span>Open DOI</span>
                <span>↗</span>
              </a>
              {!article.isConfirmed && (
                <button
                  type="button"
                  onClick={handleConfirmDoi}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  Confirm this DOI ✓
                </button>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-black text-slate-900 dark:text-white mb-1.5">
              {article.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              <strong>First Author:</strong> {article.firstAuthor}
              {article.authors.length > 1 && ` et al. (${article.authors.length} authors)`}
              {article.year && ` • (${article.year})`}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              <strong>Journal / Source:</strong> {article.journal}
              {article.volume && `, vol. ${article.volume}`}
              {article.issue && `(${article.issue})`}
              {article.pages && `, pp. ${article.pages}`}
            </p>
          </div>
        </div>
      )}

      {/* Fallback Search Option: If no DOI found in URL or user wants to search manually */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h4 className="font-serif text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🔎 Fallback Search: Search Scholarly Registry by Title &amp; Author</span>
          </h4>
          <p className="text-xs text-slate-500">
            If the publisher URL is masked or behind a proxy, query Crossref directly with the article title.
          </p>
        </div>

        <form onSubmit={handleScholarlySearch} className="space-y-3">
          <div>
            <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
              Article Title (Required):
            </label>
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="e.g. Deep learning or Attention is all you need"
              required
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                Author (Optional):
              </label>
              <input
                type="text"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
                placeholder="e.g. LeCun or Vaswani"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
                Year (Optional):
              </label>
              <input
                type="text"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                placeholder="e.g. 2017"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={!searchTitle.trim() || searching}
              className="btn-clay-white text-xs py-2 px-5 font-bold cursor-pointer disabled:opacity-40"
            >
              {searching ? 'Querying Crossref…' : 'Search Scholarly Registry 🔍'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
