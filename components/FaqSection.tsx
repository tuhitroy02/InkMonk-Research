'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WhatsAppRealIcon } from '@/components/RealIcons';
import { Interactive3DCard } from '@/components/FuturisticScrollExperience';

export interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    category: 'General & Confidentiality',
    q: 'What is InkMonk Research and who founded it?',
    a: 'InkMonk Research is an academic writing and research consultancy based in Karunamoyee, Salt Lake, Kolkata, founded by Tuhit Roy and Sampreeti Mukherjee. Our mission is encapsulated in our tagline: "Research with care. Writing with clarity." We serve researchers, postgraduate scholars, faculty, and industry professionals in English and Hindi.',
  },
  {
    category: 'General & Confidentiality',
    q: 'Is my research topic and work kept completely confidential?',
    a: 'Yes, 100%. InkMonk Research operates under strict non-disclosure principles. We sign a mutual NDA upfront guaranteeing that your project briefs, raw findings, personal details, and completed manuscripts are never resold, licensed, published, or revealed to any third party.',
  },
  {
    category: 'Pricing & Estimates',
    q: 'How does InkMonk Research calculate quotes without publishing public prices?',
    a: 'We evaluate each project on its technical complexity, domain, language (English or Hindi), word count tier, and code/simulation requirements. Our guided quote calculator and local AI assistant use our central server-side rate schedule to provide exact, transparent estimates in integer paise.',
  },
  {
    category: 'Pricing & Estimates',
    q: 'How much does a Turnitin report cost and what does it include?',
    a: 'Turnitin reports are fixed at ₹200 per scanned file. The audit checks for web similarity, journal repository matching, and includes Turnitin’s proprietary AI writing detection indicator without submitting your file to the public or institutional student repository.',
  },
  {
    category: 'Services & Scope',
    q: 'Do you offer research papers and theses in Hindi?',
    a: 'Yes! Co-founder Sampreeti Mukherjee leads our dedicated Hindi academic writing division. We handle Shodh Patra (research papers), Shodh Prabandh (theses), book writing, articles, and presentations using standardized Devanagari terminology across humanities, social sciences, and technical domains.',
  },
  {
    category: 'Services & Scope',
    q: 'Can you implement AI, Machine Learning, or Deep Learning models for my thesis?',
    a: 'Yes. Led by founder Tuhit Roy, our computational division writes, trains, and validates machine learning and deep learning pipelines in Python (TensorFlow, PyTorch, Scikit-learn, CUDA), MATLAB, or containerized environments with reproducible benchmarks and Git repository handoff.',
  },
  {
    category: 'Process & Revisions',
    q: 'What happens if my university committee or journal reviewers request revisions?',
    a: 'We provide dedicated revision support within the agreed project scope. If your guide or peer-reviewers provide specific critique on methodology, literature references, or formatting, our team promptly updates the manuscript.',
  },
  {
    category: 'Process & Revisions',
    q: 'How does the Local AI Chatbot work without API keys?',
    a: 'Our AI assistant is custom-engineered with a deterministic Finite State Machine (FSM) and local natural language classification algorithms running directly on our server. It requires zero third-party API keys (no OpenAI, Anthropic, or Google Cloud fees), guarantees absolute privacy, and provides instantaneous responses.',
  },
];

export default function FaqSection({ className = "" }: { className?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    'All',
    'General & Confidentiality',
    'Pricing & Estimates',
    'Services & Scope',
    'Process & Revisions',
  ];

  const filteredFaqs = filter === 'All' ? FAQS : FAQS.filter((f) => f.category === filter);

  return (
    <div className={`text-center max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="badge-pill-gold mb-3 font-mono">FREQUENTLY ASKED QUESTIONS</div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 text-center">
          Frequently Asked Academic Questions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base text-center leading-relaxed font-normal">
          Clear, transparent answers about our academic workflows, pricing estimates, confidentiality protocols, and research standards.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === cat
                ? 'bg-sky-100 dark:bg-cyan-950 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-400/50 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-white dark:bg-[#060B18] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-4 mb-12 text-center">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <Interactive3DCard key={idx} glowColor="cyan">
              <div className="overflow-hidden text-center">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-center p-6 flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white text-left">
                    {faq.q}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-sky-50 dark:bg-cyan-950 text-sky-700 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/40 flex items-center justify-center shrink-0 text-sm font-bold font-mono">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            </Interactive3DCard>
          );
        })}
      </div>

      {/* WhatsApp Callout */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-cyan-500/30 text-slate-900 dark:text-white text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="text-left">
          <div className="font-serif font-bold text-lg text-slate-900 dark:text-white">
            Still Have an Unanswered Question?
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Connect directly with founders Tuhit Roy and Sampreeti Mukherjee via WhatsApp.
          </div>
        </div>
        <a
          href="https://wa.me/917980470880"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp-pill font-mono text-xs uppercase whitespace-nowrap"
        >
          <WhatsAppRealIcon className="w-4 h-4" />
          <span>Chat on WhatsApp (+91 7980470880)</span>
        </a>
      </div>
    </div>
  );
}
