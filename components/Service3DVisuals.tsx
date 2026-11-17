'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OfficialTurnitinLogo, AcademicLabCrestLogo } from '@/components/RealIcons';

/**
 * InkMonk Research — High-End Editorial Deliverable Visuals (Light & Dark Responsive)
 * Clean, prestigious, photorealistic academic deliverables that build instant client trust.
 */

// 1. Research Paper: Pristine IEEE / Elsevier Manuscript Preview
export function ResearchPaper3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - rect.top) / rect.height - 0.5) * -14,
          y: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-cyan-500/20 p-4 select-none ${className}`}
      style={{ perspective: '800px' }}
    >
      <motion.div
        animate={{
          rotateX: 8 + tilt.x,
          rotateY: -10 + tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-56 h-36 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-md p-3.5 flex flex-col justify-between text-left"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Paper Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5 font-sans text-[9px] text-slate-500">
          <span className="font-bold text-[#0284C7] dark:text-cyan-400">IEEE TRANSACTIONS</span>
          <span>DOI: 10.1109/INKMONK.2026</span>
        </div>

        {/* Paper Title & Abstract */}
        <div className="space-y-1.5 my-1">
          <div className="text-[10px] font-serif font-bold text-slate-900 dark:text-white leading-tight">
            Empirical Validation of Scalable Neural Architectures
          </div>
          <div className="text-[8px] text-slate-500 dark:text-slate-400 font-serif leading-relaxed line-clamp-2">
            Abstract: Comprehensive methodology adhering to double-blind peer-review standards, full statistical rigor, and formatted citations.
          </div>
        </div>

        {/* Mathematical Formula Strip */}
        <div className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-mono font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>∇ · B = 0 &nbsp;|&nbsp; L_loss = -∑ y log(p)</span>
          <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold">100% RIGOR</span>
        </div>
      </motion.div>
    </div>
  );
}

// 2. Thesis & Dissertation: Prestigious Navy & Gold Doctoral Volume
export function Thesis3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - rect.top) / rect.height - 0.5) * -14,
          y: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-cyan-500/20 p-4 select-none ${className}`}
      style={{ perspective: '800px' }}
    >
      <motion.div
        animate={{
          rotateX: 10 + tilt.x,
          rotateY: -14 + tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-48 h-36 rounded-r-xl rounded-l-sm bg-[#0F172A] border-2 border-amber-500/40 shadow-lg p-3.5 flex flex-col justify-between text-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Leather Spine */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-slate-950 border-r border-amber-500/30 rounded-l-sm" />

        {/* Gold Ribbon Bookmark */}
        <div className="absolute right-5 -bottom-2.5 w-2.5 h-7 bg-amber-500 shadow transform rotate-6 rounded-b" />

        {/* Doctoral Seal */}
        <div className="flex justify-center mt-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-700 border border-amber-300 flex items-center justify-center shadow-md">
            <span className="text-sm">🎓</span>
          </div>
        </div>

        {/* Embossed Gold Title */}
        <div className="space-y-0.5">
          <div className="text-[10px] font-serif font-bold text-amber-200 uppercase tracking-wider">
            DOCTORAL DISSERTATION
          </div>
          <div className="text-[8px] font-sans text-slate-300">
            5-Chapter Complete Volume
          </div>
        </div>

        <div className="text-[8px] font-sans font-semibold text-emerald-400 border-t border-slate-800 pt-1">
          University DRC Rubric Compliant
        </div>
      </motion.div>
    </div>
  );
}

// 3. Turnitin Report: Authentic Clean Feedback Studio Deliverable Card
export function Turnitin3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-teal-500/20 p-4 select-none ${className}`}>
      {/* Turnitin Feedback Studio Document Card */}
      <div className="w-56 rounded-xl bg-white border border-slate-300 shadow-md p-3 text-left">
        {/* Studio Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
          <div className="flex items-center gap-1.5">
            <OfficialTurnitinLogo className="w-4 h-4" />
            <span className="text-[10px] font-bold text-slate-800 font-sans">Feedback Studio</span>
          </div>
          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
            NON-REPOSITORY
          </span>
        </div>

        {/* Similarity & AI Writing Scores */}
        <div className="grid grid-cols-2 gap-2 mb-2 text-center">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200">
            <div className="text-[8px] text-slate-500 uppercase font-semibold">Similarity Index</div>
            <div className="text-base font-bold text-sky-700">6%</div>
            <div className="text-[7px] text-slate-400">&lt;10% Guaranteed</div>
          </div>
          <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-[8px] text-slate-500 uppercase font-semibold">AI Writing Score</div>
            <div className="text-base font-bold text-emerald-700">0%</div>
            <div className="text-[7px] text-slate-400">100% Human Writing</div>
          </div>
        </div>

        {/* Matched Sources Info */}
        <div className="text-[8px] text-slate-500 space-y-0.5">
          <div className="flex justify-between">
            <span>• IEEE Digital Library</span>
            <span className="font-semibold text-slate-700">2% Match</span>
          </div>
          <div className="flex justify-between">
            <span>• ScienceDirect / Elsevier</span>
            <span className="font-semibold text-slate-700">2% Match</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Model & Code Implementation: Clean Developer Sandbox Terminal
export function ModelCode3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-emerald-500/20 p-4 select-none ${className}`}>
      <div className="w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-md p-3 text-left font-mono text-[9px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[8px] text-slate-400">pytorch_env:py311</span>
        </div>

        {/* Code Content */}
        <div className="space-y-1 text-slate-300">
          <div className="text-sky-400">import torch.nn as nn</div>
          <div className="text-slate-400"># Model Architecture</div>
          <div>out = model(inputs) <span className="text-emerald-400">// F1: 0.942</span></div>
          <div className="text-amber-300">docker run -v ./weights:/app</div>
        </div>

        <div className="mt-2 pt-1 border-t border-slate-800 flex justify-between text-[8px] text-slate-400">
          <span>CUDA 12.4 • A100 Tested</span>
          <span className="text-emerald-400 font-bold">100% REPRODUCIBLE</span>
        </div>
      </div>
    </div>
  );
}

// 5. Book Writing (100–300 pp): Formal Academic Monograph Volume
export function Book3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-indigo-500/20 p-4 select-none ${className}`}>
      <div className="w-48 h-36 rounded-r-xl rounded-l-sm bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-400/30 shadow-md p-3.5 flex flex-col justify-between text-center">
        <div className="text-right text-[8px] font-mono text-amber-300">
          ISBN 978-93-84192-04-1
        </div>
        <div className="space-y-1">
          <div className="text-xs font-serif font-bold text-white leading-tight">
            Scholarly Monograph Series
          </div>
          <div className="text-[8px] font-sans text-slate-400">
            100–300 Pages • Complete Editorial Proofing
          </div>
        </div>
        <div className="text-[8px] font-sans font-semibold text-indigo-300 border-t border-slate-800 pt-1">
          Print &amp; Digital Publishing Ready
        </div>
      </div>
    </div>
  );
}

// 6. Presentation & PPT: Clean Academic Defense Slide
export function Presentation3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-cyan-500/20 p-4 select-none ${className}`}>
      <div className="w-56 h-32 rounded-lg bg-white border border-slate-300 shadow-md p-3 flex flex-col justify-between text-left">
        <div className="flex justify-between items-center border-b border-slate-100 pb-1 text-[8px] text-slate-500 font-sans">
          <span>Doctoral Thesis Defense • Slide 12 of 35</span>
          <span className="font-bold text-[#0284C7]">16:9 Widescreen</span>
        </div>
        <div>
          <div className="text-[10px] font-serif font-bold text-slate-900 mb-1">
            Proposed Mathematical Formulation
          </div>
          <div className="p-1.5 rounded bg-slate-50 text-[9px] font-mono text-slate-700">
            L(θ) = -E [y log(p) + (1-y) log(1-p)] + λ ||W||²
          </div>
        </div>
        <div className="flex justify-between text-[8px] text-slate-400 pt-1 border-t border-slate-100">
          <span>University Committee Approved</span>
          <span>Speaker Notes Included</span>
        </div>
      </div>
    </div>
  );
}
