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
    q: 'Is my research topic and work kept completely confidential under a formal NDA?',
    a: 'Yes, 100%. InkMonk Research operates under strict non-disclosure principles. We sign a formal mutual NDA upfront guaranteeing that your project briefs, raw findings, datasets, personal details, and completed manuscripts are never stored in public databases, resold, licensed, published, or revealed to any third party.',
  },
  {
    category: 'General & Confidentiality',
    q: 'How do you guarantee my draft stays off any institutional Turnitin repository forever?',
    a: 'We use strictly certified instructor-tier non-repository accounts. Your files are compared against global literature and AI detectors in memory without ever being indexed into Turnitin’s global or institutional repository database. Your university will scan your thesis later as a 100% fresh, original document.',
  },
  {
    category: 'Services & Scope',
    q: 'How do you handle translating vernacular Hindi fieldwork into English without similarity flags?',
    a: 'Our bilingual academic team conducts conceptual scholarly synthesis rather than robotic direct translation. We formulate standardized academic terminology (Devanagari to International standard), provide rigorous citation trails for vernacular interviews/field notes, and verify every chapter through our 0% AI and <10% plagiarism pipeline.',
  },
  {
    category: 'Pricing & Estimates',
    q: 'How does InkMonk Research calculate quotes without hidden charges?',
    a: 'We evaluate each project deterministically based on technical domain, language (English or Hindi), word count tier, and code/simulation requirements. Our guided quote calculator provides exact, transparent estimates with a 4-stage milestone payment option (25% per chapter milestone) with direct UPI payment.',
  },
  {
    category: 'Pricing & Estimates',
    q: 'How much does a Turnitin report cost and what does it include?',
    a: 'Turnitin reports are fixed at ₹200 per scanned file with instant UPI payment. The audit checks web similarity, journal repository matching, and includes Turnitin’s proprietary AI writing detection indicator under strict non-repository submission.',
  },
  {
    category: 'Services & Scope',
    q: 'Can you implement AI, Machine Learning, or Deep Learning models for my thesis?',
    a: 'Yes. Led by founder Tuhit Roy, our computational division writes, trains, and validates machine learning and deep learning pipelines in Python (TensorFlow, PyTorch, Scikit-learn, CUDA), MATLAB, or containerized Docker environments with reproducible benchmarks and private Git repository handoff.',
  },
  {
    category: 'Process & Revisions',
    q: 'What happens if my university committee or journal reviewers request revisions?',
    a: 'We provide dedicated revision support within the agreed project scope. If your guide or peer-reviewers provide specific critique on methodology, literature references, or formatting, our team promptly updates the manuscript.',
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
        <div className="badge-pill-purple mb-3 font-mono">FREQUENTLY ASKED QUESTIONS</div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3 text-center">
          Frequently Asked Academic Questions
        </h2>
        <p className="text-purple-900/70 dark:text-purple-200/80 text-sm sm:text-base text-center leading-relaxed font-normal">
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
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'bg-white dark:bg-[#0A0414] text-purple-900/70 dark:text-purple-300 hover:text-purple-600 dark:hover:text-white border border-purple-200 dark:border-purple-900/40'
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
            <Interactive3DCard key={idx} glowColor="purple">
              <div className="overflow-hidden text-center bg-white dark:bg-[#0A0414] rounded-3xl">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-center p-6 flex justify-between items-center gap-4 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-colors cursor-pointer"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-black dark:text-white text-left">
                    {faq.q}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/40 flex items-center justify-center shrink-0 text-sm font-bold font-mono">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-700 dark:text-purple-200/90 leading-relaxed border-t border-purple-100 dark:border-purple-900/40 pt-4 text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            </Interactive3DCard>
          );
        })}
      </div>

      {/* WhatsApp Callout */}
      <div className="p-6 rounded-3xl bg-purple-50/60 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30 text-black dark:text-white text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <div className="text-left">
          <div className="font-serif font-bold text-lg text-black dark:text-white">
            Still Have an Unanswered Question?
          </div>
          <div className="text-xs text-purple-900/70 dark:text-purple-300/70 mt-0.5">
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
