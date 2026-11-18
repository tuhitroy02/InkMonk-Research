'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import {
  CurvedPointerArrow,
  NotepadPencilIcon,
  GraduationCapIcon,
  BookStackIcon,
  OrigamiPaperAirplane,
  DecorativeOpenBook,
  DecorativeGlasses,
} from '@/components/ClaymorphicVisuals';

// Avatars for social proof
const SCHOLAR_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
];

export default function HeroClaymorphic() {
  const router = useRouter();
  const { user, openAuthModal } = useSupabaseAuth();

  // Calculator state
  const [selectedService, setSelectedService] = useState<'RESEARCH_PAPER' | 'THESIS' | 'LIT_REVIEW'>('RESEARCH_PAPER');
  const [stage, setStage] = useState('Just starting');
  const [wordCount, setWordCount] = useState('3,000 – 6,000 words');

  // Dynamic estimate calculation
  const getEstimatedDays = () => {
    if (selectedService === 'RESEARCH_PAPER') return '14 Days';
    if (selectedService === 'THESIS') return '28 Days';
    return '10 Days';
  };

  // Auth gate triggers
  const handleStartJourney = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      openAuthModal(() => {
        router.push('/quote');
      });
    }
  };

  const handleShowPricing = (e: React.MouseEvent) => {
    const targetUrl = `/quote?service=${selectedService}&stage=${encodeURIComponent(stage)}&words=${encodeURIComponent(wordCount)}`;
    if (!user) {
      e.preventDefault();
      openAuthModal(() => {
        router.push(targetUrl);
      });
    }
  };

  return (
    <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-notebook-grid min-h-[92vh] flex flex-col justify-between">
      {/* ─── Floating Desk Stationery Background Elements ───────────────── */}
      <div className="absolute top-28 left-4 lg:left-12 opacity-80 lg:opacity-100 hidden sm:block">
        <DecorativeOpenBook className="w-28 sm:w-36 h-auto" />
      </div>

      <div className="absolute top-72 left-6 lg:left-16 opacity-75 lg:opacity-90 hidden md:block">
        <DecorativeGlasses className="w-24 sm:w-28 h-auto" />
      </div>

      <div className="absolute top-28 right-6 lg:right-16 opacity-85 lg:opacity-100 hidden sm:block">
        <OrigamiPaperAirplane className="w-24 sm:w-32 h-auto" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ─── LEFT COLUMN: HEADLINE & VALUE PROP ─────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-center text-center">
            
            {/* Authentic Brand Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#1E3A8A] font-mono">
                RESEARCH WITH CARE • WRITING WITH CLARITY
              </span>
            </div>

            {/* Main Headline with 3D Arrow */}
            <div className="relative inline-block mb-3">
              <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.08] text-slate-900 tracking-tight">
                InkMonk Research<br />
                <span className="text-[#F95721] inline-block relative">
                  Your Research. Published.
                </span>
              </h1>

              {/* 3D Curved Pointer Arrow looping back onto "Published." */}
              <div className="absolute -top-3 sm:-top-5 -right-24 sm:-right-32 lg:-right-36 hidden xs:block">
                <CurvedPointerArrow className="w-24 sm:w-32 lg:w-36 h-auto" />
              </div>
            </div>

            {/* Authentic Tagline & Subhead */}
            <p className="font-serif italic text-lg sm:text-xl text-[#1E3A8A] font-bold mb-2">
              &ldquo;Research with care. Writing with clarity.&rdquo;
            </p>
            <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-xl mb-6">
              Premier academic research writing, PhD thesis development, peer-reviewed journal publishing, and Turnitin audits in English and Hindi.
            </p>

            {/* Bullet Checklist with Professional Academic Diamonds (No Gemini Stars, No Ticks) */}
            <div className="space-y-3 mb-8 w-full max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 text-slate-800 font-bold text-sm sm:text-base">
                <span className="text-[#F95721] text-base font-black shrink-0">◆</span>
                <span>Done-for-you Formatting (LaTeX, APA, etc.)</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-800 font-bold text-sm sm:text-base">
                <span className="text-[#2563EB] text-base font-black shrink-0">◆</span>
                <span>Peer-Review Ready Checklist</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-800 font-bold text-sm sm:text-base">
                <span className="text-[#1E293B] text-base font-black shrink-0">◆</span>
                <span>100% Confidentiality Guaranteed</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full max-w-md mx-auto">
              <Link
                href="/quote"
                onClick={handleStartJourney}
                className="btn-clay-orange text-center text-sm sm:text-base w-full sm:w-auto"
              >
                <span>Start Your Journey</span>
                <span className="text-lg">→</span>
              </Link>

              <Link
                href="/how-it-works"
                className="btn-clay-white text-center text-sm sm:text-base w-full sm:w-auto"
              >
                <span>See Our Process</span>
                <span className="text-lg">↓</span>
              </Link>
            </div>

            {/* Social Proof: Avatars + Loved by Scholars */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <div className="flex -space-x-3 overflow-hidden">
                {SCHOLAR_AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Scholar ${i + 1}`}
                    className="inline-block h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-2 ring-white object-cover shadow-sm"
                  />
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm sm:text-base font-extrabold text-slate-900">
                  Loved by 1,200+ Scholars
                </div>
                <div className="flex items-center justify-center sm:justify-start text-amber-500 text-xs">
                  {'★'.repeat(5)} <span className="text-slate-500 text-[11px] font-semibold ml-1.5">(4.9/5 from Scopus authors)</span>
                </div>
              </div>
            </div>

          </div>

          {/* ─── RIGHT COLUMN: INTERACTIVE CLAY CARD (WebMCP Enabled) ─────── */}
          <div className="lg:col-span-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleShowPricing(e as any);
              }}
              // @ts-expect-error WebMCP browser standard attributes
              toolname="calculate_research_estimate"
              tooldescription="Calculate quotation and delivery timeline for research papers, doctoral dissertations, and Turnitin originality reports"
              data-toolname="calculate_research_estimate"
              data-tooldescription="Calculate quotation and delivery timeline for research papers, doctoral dissertations, and Turnitin originality reports"
              className="card-clay-blue-frame p-6 sm:p-8 text-center max-w-md mx-auto block"
            >
              
              <h3 className="font-extrabold text-xl sm:text-2xl text-[#1E3A8A] mb-5 tracking-tight">
                Help Me Perfect My…
              </h3>

              {/* 3 Top Category Selectors */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                
                {/* 1. Research Paper */}
                <button
                  type="button"
                  onClick={() => setSelectedService('RESEARCH_PAPER')}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center cursor-pointer ${
                    selectedService === 'RESEARCH_PAPER'
                      ? 'bg-amber-50/80 border-[#F95721] shadow-[0_4px_14px_rgba(249,87,33,0.25)] scale-105'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <NotepadPencilIcon className="w-10 h-10 mb-1" />
                  <span className="text-[11px] sm:text-xs font-black text-slate-800 leading-tight">
                    Research Paper
                  </span>
                </button>

                {/* 2. Thesis & Dissertation */}
                <button
                  type="button"
                  onClick={() => setSelectedService('THESIS')}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center cursor-pointer ${
                    selectedService === 'THESIS'
                      ? 'bg-blue-50/80 border-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.25)] scale-105'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <GraduationCapIcon className="w-10 h-10 mb-1" />
                  <span className="text-[11px] sm:text-xs font-black text-slate-800 leading-tight">
                    Thesis &amp; Dissertation
                  </span>
                </button>

                {/* 3. Literature Review */}
                <button
                  type="button"
                  onClick={() => setSelectedService('LIT_REVIEW')}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center cursor-pointer ${
                    selectedService === 'LIT_REVIEW'
                      ? 'bg-indigo-50/80 border-[#1E40AF] shadow-[0_4px_14px_rgba(30,64,175,0.25)] scale-105'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <BookStackIcon className="w-10 h-10 mb-1" />
                  <span className="text-[11px] sm:text-xs font-black text-slate-800 leading-tight">
                    Literature Review
                  </span>
                </button>
              </div>

              {/* Dropdown 1: Stage Selector */}
              <div className="mb-4 text-left">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  What stage are you in? →
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full bg-white border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Just starting">Just starting / Concept Phase</option>
                  <option value="Drafting / Editing">Drafting / Editing Manuscript</option>
                  <option value="Ready to publish">Ready to publish / Final Proof</option>
                  <option value="Addressing Reviewer Comments">Addressing Peer Review Feedback</option>
                </select>
              </div>

              {/* Dropdown 2: Word Count */}
              <div className="mb-5 text-left">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  What&apos;s your word count? → (Estimate →)
                </label>
                <select
                  value={wordCount}
                  onChange={(e) => setWordCount(e.target.value)}
                  className="w-full bg-white border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="3,000 – 6,000 words">3,000 – 6,000 words (Standard)</option>
                  <option value="6,000 – 10,000 words">6,000 – 10,000 words (Extended)</option>
                  <option value="10,000 – 25,000 words">10,000 – 25,000 words (Master&apos;s Thesis)</option>
                  <option value="25,000 – 60,000 words">25,000 – 60,000 words (Doctoral Thesis)</option>
                  <option value="100 – 300 pages">100 – 300 pages (Scholarly Book)</option>
                </select>
              </div>

              {/* Feature Pills */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <div className="bg-[#0F172A] text-white text-[11px] sm:text-xs font-bold py-2 px-3 rounded-full shadow-sm text-center">
                  Est. Time: {getEstimatedDays()}
                </div>
                <div className="bg-[#F95721] text-white text-[11px] sm:text-xs font-bold py-2 px-3 rounded-full shadow-sm text-center">
                  Plagiarism Check Included
                </div>
              </div>

              {/* Main Button */}
              <Link
                href={`/quote?service=${selectedService}&stage=${encodeURIComponent(stage)}&words=${encodeURIComponent(wordCount)}`}
                onClick={handleShowPricing}
                className="btn-clay-orange w-full !py-3 text-xs sm:text-sm font-extrabold shadow-lg"
              >
                <span>Show Pricing &amp; Next Steps</span>
                <span className="text-base font-black">→</span>
              </Link>

            </form>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM BANNER: TRUSTED BY & STANDARDS ────────────────────────── */}
      <div className="mt-14 sm:mt-18 pt-6 sm:pt-8 border-t-2 border-slate-200/80 bg-white/60 backdrop-blur-sm w-full">
        <div className="max-w-6xl mx-auto px-4 text-center">
          
          <div className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider mb-4">
            Trusted By &amp; Standards
          </div>

          {/* 3D Embossed Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-3">
            
            {/* 1. SCOPUS */}
            <div className="badge-clay-embossed font-mono">
              <span className="text-amber-600 font-black">●</span>
              <span>SCOPUS</span>
            </div>

            {/* 2. IEEE */}
            <div className="badge-clay-embossed">
              <span className="text-blue-600 font-black">◆</span>
              <span>IEEE</span>
            </div>

            {/* 3. Springer */}
            <div className="badge-clay-embossed">
              <span className="text-orange-600 font-black">♞</span>
              <span>Springer</span>
            </div>

            {/* 4. ELSEVIER */}
            <div className="badge-clay-embossed font-serif">
              <span className="text-emerald-600 font-black">🌲</span>
              <span>ELSEVIER</span>
            </div>

            {/* 5. LATEX */}
            <div className="badge-clay-embossed font-mono">
              <span className="text-slate-800 font-black">L<sup className="-ml-1">A</sup>T<sub className="-ml-1">E</sub>X</span>
            </div>

            {/* 6. UGC-CARE */}
            <div className="badge-clay-embossed">
              <span className="text-blue-600 font-black">◆</span>
              <span>UGC-CARE</span>
            </div>

          </div>

          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
            FORMATTED TO WORLD-CLASS STANDARDS
          </div>

        </div>
      </div>
    </section>
  );
}
