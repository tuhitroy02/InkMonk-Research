'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Step1Icon,
  Step2Icon,
  Step3Icon,
  Step4Icon,
  Step5Icon,
  TurnitinShieldLogo,
  NdaShieldIcon,
  ResearchPaperRealIcon,
  ThesisRealIcon,
  OfficialTurnitinLogo,
} from '@/components/RealIcons';
import { Interactive3DCard } from '@/components/FuturisticScrollExperience';

export interface WorkflowStep {
  step: string;
  shortTitle: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  subpoints: string[];
  deliverables: string;
  timeline: string;
}

export const HORIZONTAL_STEPS: WorkflowStep[] = [
  {
    step: '01',
    shortTitle: 'CONSULT & NDA',
    title: 'Consultation & Precise Scope Definition',
    icon: <Step1Icon className="w-8 h-8" />,
    desc: 'You share your research topic, word count, target journal or university rubric, and deadline. Pre-signed mutual NDA guarantees your data remains 100% private.',
    subpoints: [
      'Identification of Technical vs Non-Technical taxonomy',
      'Determination of English or Hindi linguistic conventions',
      'Evaluation of code or model implementation requirements',
      'Immediate transparent price calculation based on established schedule',
    ],
    deliverables: 'Signed Mutual NDA & Formal Scope Specification',
    timeline: 'Day 1 (Instant Calculation)',
  },
  {
    step: '02',
    shortTitle: 'QUOTE & ESCROW',
    title: 'Deterministic Quotation & Escrow',
    icon: <Step2Icon className="w-8 h-8" />,
    desc: 'Receive an immediate transparent estimate with a 4-stage chapter milestone payment plan. Zero 100% upfront lock-in.',
    subpoints: [
      'Transparent integer paise calculation from server catalogue',
      'Milestone payment escrow (25% per verified milestone)',
      'Direct UPI / Bank Transfer / International invoicing',
      'Official milestone agreement signed before work commences',
    ],
    deliverables: 'Milestone Escrow Schedule & Direct Director Booking',
    timeline: 'Day 1–2',
  },
  {
    step: '03',
    shortTitle: 'DOCTORAL DRAFTING',
    title: 'Doctoral Expert Drafting & Modeling',
    icon: <Step3Icon className="w-8 h-8" />,
    desc: 'Assigned PhD domain researchers draft your chapters or develop containerized PyTorch/MATLAB code strictly aligned to university rubrics.',
    subpoints: [
      'Original synthesis without robotic repetition or fabricated data',
      'High-resolution figures, architecture schematics, and clean tables',
      'Accurate mathematical derivations and code documentation',
      'Standardized Devanagari vocabulary for Hindi dissertations',
    ],
    deliverables: 'Chapter Drafts, Mathematical Proofs, Clean Code Scripts',
    timeline: 'Milestone Cycles (Agreed Deadlines)',
  },
  {
    step: '04',
    shortTitle: 'TURNITIN AUDIT',
    title: 'Turnitin Audit & Quality Assurance',
    icon: <OfficialTurnitinLogo className="w-8 h-8" />,
    desc: 'Every document undergoes an independent Turnitin plagiarism and AI detection audit before delivery to verify zero unintended overlap.',
    subpoints: [
      'Safe Non-Repository protocol (manuscript is never saved to database)',
      'Strict threshold: Plagiarism < 10%, AI Writing: 0%',
      'Complete color-coded source matrix and clickable citations',
      'Language editing, structural coherence check, and typo rectification',
    ],
    deliverables: 'Turnitin Digital Audit Report (PDF)',
    timeline: 'Prior to Every Milestone Delivery',
  },
  {
    step: '05',
    shortTitle: 'DELIVERY & GIT',
    title: 'Delivery, Revisions & Git Handoff',
    icon: <Step5Icon className="w-8 h-8" />,
    desc: 'Your files are delivered securely via your client portal and email. You have dedicated revision windows and reproducible Git code handoff.',
    subpoints: [
      'Editable Word (.docx) / LaTeX (.tex) and slide deck (.pptx)',
      'Private Git repository handoff with Docker runtime instructions',
      'Direct communication channel with InkMonk academic directors',
      'Prompt adjustments and rebuttal assistance for journal submissions',
    ],
    deliverables: 'Final Formatted Package, Source Code & Revision Window',
    timeline: 'On or Before Final Deadline',
  },
];

export default function HorizontalHowItWorks({ className = "" }: { className?: string }) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="how-it-works" className={`py-20 px-4 text-center relative ${className}`}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill-gold mb-3 font-mono">
            HORIZONTAL WORKFLOW PIPELINE // 5 STAGES
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 text-center">
            How InkMonk Delivers Excellence
          </h2>
          <p className="text-slate-400 text-base sm:text-lg text-center leading-relaxed font-medium">
            Follow our horizontal 5-stage pipeline from consultation and NDA to doctoral drafting, Turnitin verification, and final Git handoff.
          </p>
        </div>

        {/* Horizontal Navigation Stepper Track */}
        <div className="relative mb-12 max-w-5xl mx-auto hidden md:block">
          {/* Horizontal Connecting Laser Conduit */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[3px] bg-slate-800 pointer-events-none z-0">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 transition-all duration-500 shadow-[0_0_15px_#00F2FE]"
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
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 border-2 ${
                      isCurrent
                        ? 'bg-cyan-500 text-black border-white shadow-[0_0_25px_#00F2FE] scale-110'
                        : isPast
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-400'
                        : 'bg-[#060B18] text-slate-400 border-slate-700 hover:border-cyan-400'
                    }`}
                  >
                    {isPast ? '✓' : s.step}
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold mt-2 uppercase tracking-wider transition-colors ${
                      isCurrent ? 'text-cyan-300' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    {s.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Pipeline Conveyor (Desktop: 5-Stage Connected Rail / Mobile: Snap Row) */}
        <div className="relative overflow-x-auto pb-6 pt-2 no-scrollbar">
          <div className="flex md:grid md:grid-cols-5 gap-4 min-w-[900px] md:min-w-0">
            {HORIZONTAL_STEPS.map((s, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer transition-all duration-300 flex-1 ${
                    isCurrent ? 'scale-[1.02]' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <Interactive3DCard glowColor={idx === 3 ? 'emerald' : 'cyan'}>
                    <div
                      className={`card-futuristic-3d p-5 flex flex-col justify-between text-left h-full border-t-4 transition-all ${
                        isCurrent
                          ? 'border-t-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)]'
                          : 'border-t-slate-700'
                      }`}
                    >
                      {/* Step Header */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="step-number-futuristic !w-10 !h-10 !text-sm">
                            {s.step}
                          </span>
                          <div className="p-1.5 rounded-xl bg-[#030712] border border-cyan-500/30">
                            {s.icon}
                          </div>
                        </div>

                        <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">
                          PHASE // {s.shortTitle}
                        </div>
                        <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug">
                          {s.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
                          {s.desc}
                        </p>

                        {/* Bullet Deliverables */}
                        <div className="p-2.5 rounded-xl bg-[#030712] border border-cyan-500/20 mb-3">
                          <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase mb-1">
                            DELIVERABLE:
                          </div>
                          <div className="text-xs text-slate-300 font-medium">
                            {s.deliverables}
                          </div>
                        </div>
                      </div>

                      {/* Timeline Bottom */}
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>TIMELINE:</span>
                        <span className="text-cyan-300 font-bold">{s.timeline}</span>
                      </div>
                    </div>
                  </Interactive3DCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Spotlight Box */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#060B18] border border-cyan-500/30 text-left max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="step-number-futuristic !w-14 !h-14 !text-xl">
                {HORIZONTAL_STEPS[activeStep].step}
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  SELECTED STAGE OVERVIEW
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {HORIZONTAL_STEPS[activeStep].title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#030712] border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
              >
                ← PREVIOUS PHASE
              </button>
              <button
                disabled={activeStep === HORIZONTAL_STEPS.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(HORIZONTAL_STEPS.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-950 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-900 disabled:opacity-40 cursor-pointer"
              >
                NEXT PHASE →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-2">
                Phase Breakdown &amp; Execution:
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {HORIZONTAL_STEPS[activeStep].desc}
              </p>
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                <span>●</span>
                <span>Expected Output: {HORIZONTAL_STEPS[activeStep].deliverables}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-2">
                Mandatory Stage Rubric &amp; Deliverables:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {HORIZONTAL_STEPS[activeStep].subpoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/quote" className="btn-primary-glow font-mono text-xs uppercase !py-3 !px-7">
            Start Phase 01: Calculate Quote →
          </Link>
          <Link href="/contact" className="btn-secondary-dark font-mono text-xs uppercase">
            Consult Directors in Kolkata →
          </Link>
        </div>

      </div>
    </section>
  );
}
