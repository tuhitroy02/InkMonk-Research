'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { OfficialTurnitinLogo } from '@/components/RealIcons';
import { Interactive3DCard } from '@/components/FuturisticScrollExperience';

export interface WorkflowStep {
  step: string;
  shortTitle: string;
  title: string;
  desc: string;
  subpoints: string[];
  deliverables: string;
  timeline: string;
  badge: string;
}

export const HORIZONTAL_STEPS: WorkflowStep[] = [
  {
    step: '01',
    shortTitle: 'CONSULT & SCOPE',
    badge: 'MUTUAL NDA',
    title: 'Initial Consultation & Scope Definition',
    desc: 'You share your research requirements, university rubric, and deadline. Pre-signed mutual NDA guarantees your data remains 100% private.',
    subpoints: [
      'Technical vs. Non-Technical domain categorization',
      'Linguistic standards (English academic or Hindi Devanagari)',
      'Identification of dataset or computational code requirements',
      'Immediate transparent price estimation based on established scope',
    ],
    deliverables: 'Signed Mutual NDA & Formal Scope Blueprint',
    timeline: 'Day 1 (Instant)',
  },
  {
    step: '02',
    shortTitle: 'QUOTE & ESCROW',
    badge: '4-STAGE ESCROW',
    title: 'Deterministic Quotation & Milestone Escrow',
    desc: 'Receive an immediate transparent estimate with a 4-stage chapter milestone payment plan. Zero 100% upfront lock-in.',
    subpoints: [
      'Transparent schedule based on word count & complexity',
      'Milestone payment escrow (25% per verified milestone)',
      'Direct UPI / Bank Transfer / International invoicing',
      'Official agreement signed before work commences',
    ],
    deliverables: 'Milestone Escrow Schedule & Assigned Discipline Director',
    timeline: 'Day 1–2',
  },
  {
    step: '03',
    shortTitle: 'DOCTORAL DRAFTING',
    badge: 'PHD SUPERVISION',
    title: 'Doctoral Expert Drafting & Modeling',
    desc: 'Assigned PhD domain researchers draft your chapters or develop containerized PyTorch/MATLAB code strictly aligned to university rubrics.',
    subpoints: [
      'Original synthesis without robotic repetition or fabricated data',
      'High-resolution figures, architecture schematics, and clean tables',
      'Accurate mathematical derivations and code documentation',
      'Standardized Devanagari vocabulary for Hindi dissertations',
    ],
    deliverables: 'Chapter Drafts, Mathematical Proofs & Clean Code Scripts',
    timeline: 'Milestone Cycles',
  },
  {
    step: '04',
    shortTitle: 'TURNITIN AUDIT',
    badge: '0% AI VERIFIED',
    title: 'Turnitin Audit & Originality Certification',
    desc: 'Every milestone undergoes instructor-tier verification under non-repository protocols, ensuring 0% AI writing and <10% similarity.',
    subpoints: [
      'Instructor-grade similarity scan with clickable source matches',
      'AI writing probability analysis (Zero false-positive risk)',
      'Strict non-repository protocol (draft never indexed)',
      'Downloadable PDF audit certificate generated for each milestone',
    ],
    deliverables: 'Official Turnitin Digital Receipt & Similarity Report',
    timeline: '15–30 Mins per Milestone',
  },
  {
    step: '05',
    shortTitle: 'HANDOFF & DEFENSE',
    badge: 'FULL OWNERSHIP',
    title: 'Final Package Handoff & Revision Support',
    desc: 'Full compilation delivered in DOCX/LaTeX with complete source code, Docker setup, presentation slides, and post-delivery review support.',
    subpoints: [
      'Final comprehensive volume formatted for university submission',
      'Reproducible Docker container setup & Git repository access',
      'Presentation slides formatted for DRC or viva voce defense',
      'Post-delivery revisions included within agreed scope',
    ],
    deliverables: 'Complete Publication-Ready Volume, Source Code & Slides',
    timeline: 'On or Before Deadline',
  },
];

export default function HorizontalHowItWorks({ className = "" }: { className?: string }) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = HORIZONTAL_STEPS[activeStep];

  return (
    <section id="how-it-works" className={`py-20 px-4 text-center relative ${className}`}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge-pill-gold mb-3">
            5-STAGE RESEARCH PIPELINE
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 text-center">
            How InkMonk Delivers Excellence
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base text-center leading-relaxed font-medium">
            A transparent, milestone-protected workflow from confidential consultation to doctoral drafting and Turnitin originality verification.
          </p>
        </div>

        {/* Horizontal Navigation Stepper Track (Desktop) */}
        <div className="relative mb-10 max-w-5xl mx-auto hidden md:block">
          {/* Horizontal Connecting Line */}
          <div className="absolute top-6 left-12 right-12 h-[2px] bg-slate-200 dark:bg-slate-800 pointer-events-none z-0">
            <div
              className="h-full bg-[#0284C7] transition-all duration-300"
              style={{ width: `${(activeStep / (HORIZONTAL_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stepper Buttons in a Single Horizontal Row */}
          <div className="relative z-10 flex items-center justify-between">
            {HORIZONTAL_STEPS.map((s, idx) => {
              const isCurrent = activeStep === idx;
              const isPast = activeStep > idx;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-sans font-bold text-sm transition-all duration-200 border-2 ${
                      isCurrent
                        ? 'bg-[#0284C7] text-white border-white shadow-md scale-110'
                        : isPast
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-sky-500'
                    }`}
                  >
                    {isPast ? '✓' : s.step}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-2 uppercase tracking-wider transition-colors ${
                      isCurrent ? 'text-[#0284C7] dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800'
                    }`}
                  >
                    {s.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal 5-Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          {HORIZONTAL_STEPS.map((s, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className="cursor-pointer transition-all duration-200"
              >
                <Interactive3DCard glowColor={idx === 3 ? 'emerald' : 'cyan'}>
                  <div
                    className={`card-futuristic-3d p-5 flex flex-col justify-between h-full border-t-4 transition-all ${
                      isCurrent
                        ? 'border-t-[#0284C7] dark:border-t-cyan-400 shadow-md ring-2 ring-sky-500/20'
                        : 'border-t-slate-300 dark:border-t-slate-700'
                    }`}
                  >
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="step-number-futuristic !w-9 !h-9 !text-sm">
                          {s.step}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {s.badge}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
                        {s.desc}
                      </p>

                      {/* Deliverable Box */}
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800 mb-3">
                        <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-0.5">
                          DELIVERABLE:
                        </div>
                        <div className="text-xs text-slate-800 dark:text-slate-300 font-medium leading-tight">
                          {s.deliverables}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Bottom */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Timeline:</span>
                      <span className="text-sky-700 dark:text-cyan-300 font-bold">{s.timeline}</span>
                    </div>
                  </div>
                </Interactive3DCard>
              </div>
            );
          })}
        </div>

        {/* Active Stage Detailed Spotlight Box */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#060B18] border border-slate-200 dark:border-cyan-500/30 text-left max-w-5xl mx-auto shadow-sm dark:shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-cyan-950/80 border border-sky-200 dark:border-cyan-400/50 text-[11px] font-bold text-sky-800 dark:text-cyan-300 uppercase tracking-wider mb-2">
                <span>STAGE {current.step} IN-DEPTH PROTOCOL</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                {current.title}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-slate-500 block">Standard Timeline</span>
              <span className="text-sm font-bold text-[#0284C7] dark:text-cyan-300">{current.timeline}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="font-sans text-xs font-bold text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-3">
                Key Milestone Activities:
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {current.subpoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-600 dark:text-cyan-400 font-bold mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase mb-1">
                  Guaranteed Deliverable:
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {current.deliverables}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="btn-primary-glow text-xs !py-2.5 !px-5"
                >
                  Configure Project Scope →
                </Link>
                <a
                  href="https://wa.me/917980470880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-dark text-xs !py-2.5 !px-5"
                >
                  Discuss with Assigned Director
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
