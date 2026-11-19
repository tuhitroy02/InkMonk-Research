// components/toolkit/ResearchToolkitContainer.tsx
'use client';

import React, { useState } from 'react';
import ReferenceConverterTool from './ReferenceConverterTool';
import UrlDoiFinderTool from './UrlDoiFinderTool';
import DoiCitationBibtexTool from './DoiCitationBibtexTool';
import ReviewerResponseTool from './ReviewerResponseTool';
import WordCountTool from './WordCountTool';

export type ToolkitTab = 'CONVERTER' | 'URL_DOI' | 'DOI_CITATION' | 'REBUTTAL' | 'WORD_COUNT';

interface ResearchToolkitContainerProps {
  onBackToWorks?: () => void;
  defaultTool?: ToolkitTab;
}

export default function ResearchToolkitContainer({
  onBackToWorks,
  defaultTool = 'CONVERTER',
}: ResearchToolkitContainerProps) {
  const [activeTool, setActiveTool] = useState<ToolkitTab>(defaultTool);

  const tools: { id: ToolkitTab; label: string; shortDesc: string; icon: string; badge?: string }[] = [
    {
      id: 'CONVERTER',
      label: '1. APA ↔ IEEE Reference Converter',
      shortDesc: 'Bi-directional journal citation converter with editable field parsing',
      icon: '📚',
      badge: 'Journal Standards',
    },
    {
      id: 'URL_DOI',
      label: '2. URL → DOI Finder',
      shortDesc: 'Extract DOIs from publisher links or search Crossref metadata registry',
      icon: '🔗',
      badge: 'Registry Search',
    },
    {
      id: 'DOI_CITATION',
      label: '3. DOI → Citation & BibTeX',
      shortDesc: 'Convert bare DOIs to verified APA, IEEE, and downloadable .bib files',
      icon: '🏷️',
      badge: 'Download .bib',
    },
    {
      id: 'REBUTTAL',
      label: '4. Reviewer Response Builder',
      shortDesc: 'Organize reviewer comments, author rebuttals, and manuscript changes',
      icon: '📝',
      badge: 'Export .txt',
    },
    {
      id: 'WORD_COUNT',
      label: '5. Word Count Calculator',
      shortDesc: 'Precision real-time word, char, and paragraph counter (English & Hindi)',
      icon: '📊',
      badge: 'Devanagari & English',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toolkit Top Banner */}
      <div className="card-clay-white p-6 sm:p-7 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#1d4ed8] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                SCHOLAR TOOLKIT
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold">✦ 5 Working Utilities</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Academic Research Toolkit
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium mt-1">
              Client-side scholarly utilities for citation conversion, DOI discovery, rebuttal authoring, and manuscript word auditing.
            </p>
          </div>

          {onBackToWorks && (
            <button
              type="button"
              onClick={onBackToWorks}
              className="btn-clay-white text-xs py-2 px-4 font-bold flex items-center gap-1.5 cursor-pointer shrink-0 rounded-xl shadow-2xs hover:shadow-xs focus:ring-2 focus:ring-slate-400/30 transition-all duration-200"
            >
              <span>← Back to My Works</span>
            </button>
          )}
        </div>

        {/* Five Tool Selector Tabs in Exact Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
          {tools.map((t) => {
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTool(t.id)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border-2 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a] text-white border-blue-500/80 shadow-[0_6px_18px_rgba(29,78,216,0.3)] scale-[1.02]'
                    : 'bg-slate-50/90 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs hover:shadow-xs hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{t.icon}</span>
                    {t.badge && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-orange-100 text-[#f97316] dark:bg-orange-950/60'
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-xs font-black leading-snug line-clamp-2 mt-1">
                    {t.label}
                  </h4>
                </div>
                <p
                  className={`text-[10px] mt-2 line-clamp-2 ${
                    isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {t.shortDesc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tool Body */}
      <div className="card-clay-white p-6 sm:p-8 border-2 border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-md min-h-[450px]">
        {activeTool === 'CONVERTER' && <ReferenceConverterTool />}
        {activeTool === 'URL_DOI' && <UrlDoiFinderTool />}
        {activeTool === 'DOI_CITATION' && <DoiCitationBibtexTool />}
        {activeTool === 'REBUTTAL' && <ReviewerResponseTool />}
        {activeTool === 'WORD_COUNT' && <WordCountTool />}
      </div>
    </div>
  );
}
