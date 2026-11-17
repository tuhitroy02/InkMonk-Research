'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OfficialTurnitinLogo, AcademicLabCrestLogo } from '@/components/RealIcons';

/**
 * InkMonk Research — Distinct 3D Visual Identities for Each Service Category
 * Pure hardware-accelerated CSS 3D & SVG components with interactive hover depth.
 */

// 1. Research Paper Writing: Floating layered manuscript pages with citations & formulas
export function ResearchPaper3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
          y: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c101c] to-[#04060b] border border-cyan-500/30 p-4 select-none ${className}`}
      style={{ perspective: '800px' }}
    >
      {/* Background Laser Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      {/* Layered 3D Paper Stack */}
      <motion.div
        animate={{
          rotateX: 14 + tilt.x,
          rotateY: -16 + tilt.y,
          rotateZ: -2,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-44 h-32 rounded-xl bg-slate-900 border border-cyan-400/50 shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.25)] p-3 flex flex-col justify-between"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer Underneath */}
        <div
          className="absolute inset-0 rounded-xl bg-slate-950 border border-slate-700/60"
          style={{ transform: 'translateZ(-14px) rotateY(-6deg)' }}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1.5 font-mono text-[9px]">
          <span className="text-cyan-300 font-bold">IEEE / SCOPUS // MS-01</span>
          <span className="text-emerald-400 font-bold">PEER-REVIEWED</span>
        </div>

        {/* Simulated Abstract & Formula */}
        <div className="space-y-1.5 text-left font-mono">
          <div className="h-1.5 w-5/6 bg-cyan-300/40 rounded-full" />
          <div className="h-1.5 w-4/6 bg-cyan-300/30 rounded-full" />
          <div className="p-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-[9px] text-cyan-200 font-bold">
            ∫_Ω (∇u · ∇v) dx = λ ∫_Ω uv dx
          </div>
        </div>

        {/* Citation Badges */}
        <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-400 border-t border-cyan-500/20 pt-1">
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">[1] IEEE Xplore</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">[2] Springer</span>
        </div>
      </motion.div>
    </div>
  );
}

// 2. Thesis & Dissertation: Bound 3D Academic Manuscript with Doctoral Seal
export function Thesis3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
          y: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e111d] to-[#030509] border border-cyan-500/30 p-4 select-none ${className}`}
      style={{ perspective: '800px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-amber-500/10" />

      {/* 3D Bound Thesis Volume */}
      <motion.div
        animate={{
          rotateX: 18 + tilt.x,
          rotateY: -22 + tilt.y,
          rotateZ: -4,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-40 h-32 rounded-r-xl rounded-l-sm bg-gradient-to-r from-[#141a29] via-[#0d121f] to-[#080b14] border-2 border-cyan-400/60 shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.3)] p-3 flex flex-col justify-between"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Leather / Kevlar Spine */}
        <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-cyan-950 via-cyan-800 to-cyan-900 border-r border-cyan-400/40 rounded-l-sm shadow-inner" />

        {/* Gold Ribbon Bookmark */}
        <div className="absolute right-6 -bottom-3 w-3 h-8 bg-gradient-to-b from-amber-400 to-amber-600 shadow-md transform rotate-6 rounded-b" />

        {/* Golden Doctoral Seal */}
        <div className="flex items-center justify-center mt-2">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-700 border-2 border-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center">
            <span className="text-[14px]">🎓</span>
          </div>
        </div>

        {/* Embossed Text */}
        <div className="text-center font-mono pl-3">
          <div className="text-[9px] font-bold text-white tracking-widest uppercase">Ph.D. DISSERTATION</div>
          <div className="text-[8px] text-cyan-300">5-CHAPTER ESCROW MATRIX</div>
        </div>
      </motion.div>
    </div>
  );
}

// 3. AI & Machine Learning / Model & Code: Animated Neural Network Matrix
export function ModelCode3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#06101c] to-[#02050a] border border-emerald-500/40 p-4 select-none ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-35" />

      {/* Central 3D Neural Perceptron Lattice */}
      <div className="relative w-48 h-28 flex items-center justify-between px-3">
        {/* Input Layer */}
        <div className="flex flex-col justify-around h-full py-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F2FE] border border-white" />
          ))}
        </div>

        {/* Hidden Layer (Central Pulses) */}
        <div className="flex flex-col justify-around h-full">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_#10B981] border border-white animate-pulse" />
          ))}
        </div>

        {/* Output Layer */}
        <div className="flex flex-col justify-around h-full py-2">
          {[0, 1].map((i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full bg-teal-300 shadow-[0_0_10px_#2DD4BF] border border-white" />
          ))}
        </div>

        {/* Synaptic SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 stroke-cyan-400" strokeWidth="1">
          <line x1="24" y1="20" x2="96" y2="15" />
          <line x1="24" y1="56" x2="96" y2="45" />
          <line x1="24" y1="92" x2="96" y2="75" />
          <line x1="96" y1="45" x2="168" y2="35" />
          <line x1="96" y1="75" x2="168" y2="75" />
        </svg>
      </div>

      {/* Floating Badges */}
      <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[8px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-400/40">
        <span>PYTORCH // CUDA</span>
        <span>DOCKER HANDOFF</span>
      </div>
    </div>
  );
}

// 4. Turnitin 3D Holographic Originality Shield with Laser Sweep
export function Turnitin3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#061817] via-[#020d0d] to-[#010606] border border-teal-400/50 p-4 select-none ${className}`}>
      {/* Laser Scanning Line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-300 to-transparent shadow-[0_0_15px_#2DD4BF] animate-scanline z-20 pointer-events-none" />

      {/* Turnitin Shield with 3D Holographic Elevation */}
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex flex-col items-center justify-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-teal-950/80 border-2 border-teal-400/80 shadow-[0_0_35px_rgba(45,212,191,0.5)] flex items-center justify-center p-2 mb-2">
          <OfficialTurnitinLogo className="w-12 h-12" />
        </div>

        <div className="text-center font-mono">
          <div className="text-[11px] font-bold text-white tracking-widest">TURNITIN INSTRUCTOR</div>
          <div className="text-[9px] text-teal-300 font-bold">NON-REPOSITORY // FLAT ₹200</div>
        </div>
      </motion.div>
    </div>
  );
}

// 5. Book Writing (100–300 pages) 3D Monograph Volume
export function Book3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
          y: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e0f1c] to-[#040409] border border-indigo-500/30 p-4 select-none ${className}`}
      style={{ perspective: '800px' }}
    >
      <motion.div
        animate={{
          rotateX: 16 + tilt.x,
          rotateY: -20 + tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-40 h-32 rounded-r-xl rounded-l-sm bg-gradient-to-r from-[#171933] via-[#0f1124] to-[#090a16] border border-indigo-400/60 shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(99,102,241,0.3)] p-3 flex flex-col justify-between"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-indigo-900 to-indigo-950 border-r border-indigo-400/30" />
        <div className="text-right font-mono text-[8px] text-indigo-300">ISBN READY</div>
        <div className="text-center font-serif text-white font-bold text-sm">
          Scholarly Book
          <div className="text-[8px] font-mono text-slate-400 font-normal">100–300 Pages</div>
        </div>
        <div className="text-[8px] font-mono text-slate-400 text-center border-t border-indigo-500/20 pt-1">
          Full Monograph Layout
        </div>
      </motion.div>
    </div>
  );
}

// 6. Presentation & PPT 3D Slide Deck Stage
export function Presentation3DVisual({ className = "w-full h-44 mb-4" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1224] to-[#03060d] border border-cyan-500/30 p-4 select-none ${className}`}>
      <motion.div
        animate={{ rotateX: [10, 14, 10], rotateY: [-10, -14, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-44 h-28 rounded-xl bg-slate-900 border border-cyan-400/60 shadow-xl p-2.5 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-[8px] font-mono text-cyan-300 border-b border-cyan-500/20 pb-1">
          <span>DEFENSE SLIDE // 01</span>
          <span>16:9 4K</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 my-1">
          <div className="h-10 rounded bg-cyan-950/60 border border-cyan-500/20" />
          <div className="h-10 rounded bg-cyan-950/60 border border-cyan-500/20" />
          <div className="h-10 rounded bg-cyan-950/60 border border-cyan-500/20" />
        </div>
        <div className="text-[8px] font-mono text-slate-400 text-center">
          Conference &amp; Viva Voce Ready
        </div>
      </motion.div>
    </div>
  );
}
