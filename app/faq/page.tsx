'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WhatsAppRealIcon } from '@/components/RealIcons';
import { Interactive3DCard } from '@/components/FuturisticScrollExperience';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'General & Confidentiality',
    q: 'What is InkMonk Research and who founded it?',
    a: 'InkMonk Research is an academic writing and research consultancy based in Karunamoyee, Salt Lake, Kolkata, founded by Tuhit Roy and Sampreeti Mukherjee. Our mission is encapsulated in our tagline: "Research with care. Writing with clarity." We serve researchers, postgraduate scholars, faculty, and industry professionals in English and Hindi.',
  },
  {
    category: 'General & Confidentiality',
    q: 'Is my research topic and work kept completely confidential?',
    a: 'Yes, 100%. InkMonk Research operates under strict non-disclosure principles. We never resell, license, publish, or reveal your project briefs, raw findings, personal details, or completed manuscripts to any third party.',
  },
  {
    category: 'Pricing & Estimates',
    q: 'How does InkMonk Research calculate quotes without publishing public prices?',
    a: 'We uphold professional academic standards by evaluating each project on its technical complexity, domain, language (English or Hindi), word count tier, and code/simulation requirements. Our guided quote calculator and local AI assistant use our server-side rate schedule to provide exact, transparent estimates.',
  },
  {
    category: 'Pricing & Estimates',
    q: 'How much does a Turnitin report cost and what does it include?',
    a: 'Turnitin reports are fixed at ₹200 per scanned file. The audit checks for web similarity, repository matching, and includes Turnitin’s proprietary AI writing detection indicator without submitting your file to the public repository.',
  },
  {
    category: 'Services & Scope',
    q: 'Do you offer research papers and theses in Hindi?',
    a: 'Yes! Co-founder Sampreeti Mukherjee leads our dedicated Hindi academic writing division. We handle Shodh Patra (research papers), Shodh Prabandh (theses), book writing, articles, and presentations using standardized Devanagari terminology across humanities, social sciences, and technical domains.',
  },
  {
    category: 'Services & Scope',
    q: 'Can you implement AI, Machine Learning, or Deep Learning models for my thesis?',
    a: 'Yes. Led by founder Tuhit Roy, our computational division writes, trains, and validates machine learning and deep learning pipelines in Python (TensorFlow, PyTorch, Scikit-learn), MATLAB, or full web applications with reproducible results and documentation.',
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

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'General & Confidentiality', 'Pricing & Estimates', 'Services & Scope', 'Process & Revisions'];
  const filteredFaqs = filter === 'All' ? FAQS : FAQS.filter(f => f.category === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white py-20 px-4 text-center transition-colors duration-300 selection:bg-purple-600 selection:text-white">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge-pill-purple mb-3 font-mono">FREQUENTLY ASKED QUESTIONS</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4 text-center">
            Got Questions? We Have Answers
          </h1>
          <p className="text-slate-600 dark:text-purple-200/80 text-base sm:text-lg text-center leading-relaxed font-normal">
            Clear, transparent answers about our academic workflows, pricing estimates, confidentiality protocols, and research standards.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-400/50 shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-white dark:bg-[#0A0414] text-slate-600 dark:text-purple-300/70 hover:text-black dark:hover:text-white border border-purple-200 dark:border-purple-900/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-16 text-center">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Interactive3DCard key={idx} glowColor="purple">
                <div className="card-futuristic-3d overflow-hidden text-center bg-purple-50/20 dark:bg-[#0A0414]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-center p-6 flex justify-between items-center gap-4 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-colors cursor-pointer"
                  >
                    <span className="font-serif font-bold text-base sm:text-lg text-black dark:text-white text-left">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40 flex items-center justify-center shrink-0 text-sm font-bold font-mono">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-700 dark:text-purple-200/80 leading-relaxed border-t border-purple-100 dark:border-purple-900/40 pt-4 text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Interactive3DCard>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="bg-purple-50/40 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30 rounded-3xl p-8 md:p-10 text-black dark:text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 text-center">
              Have a Question Not Listed Here?
            </h3>
            <p className="text-slate-600 dark:text-purple-200/80 text-sm max-w-md mx-auto mb-6 text-center font-medium">
              Ask our instant local AI assistant or talk directly with our founders on WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/chat" className="btn-primary-glow font-mono">
                Ask AI Assistant →
              </Link>
              <a
                href="https://wa.me/917980470880"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-pill font-mono"
              >
                <WhatsAppRealIcon className="w-5 h-5" />
                <span>WhatsApp (+91 7980470880)</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
