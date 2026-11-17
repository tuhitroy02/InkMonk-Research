'use client';

import React, { useState, useEffect } from 'react';

/**
 * InkMonk Research — 3D Cyber Security & Scholarly Ecosystem
 * Inspired by Michael Skripin / Zajno's "3D video for a Cyber Security Ecosystem"
 * Palette: Kevlar (Obsidian #030712), Chrome (Platinum #E2E8F0), & Flare (Cyan #00F2FE / Emerald #10B981)
 */
export function CyberEcosystem3D({ className = "w-full h-80" }: { className?: string }) {
  const [rotation, setRotation] = useState({ x: 12, y: -15 });
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setRotation({ x: 12 + y, y: -15 + x });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 12, y: -15 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex items-center justify-center overflow-hidden rounded-3xl bg-[#030712] border border-cyan-500/30 p-6 ${className}`}
      style={{
        perspective: '1200px',
        backgroundImage:
          'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 70%), linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 28px 28px, 28px 28px',
      }}
    >
      {/* Tactical Ambient Light Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-cyan-500/20 via-teal-400/15 to-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Procedural 3D Ecosystem Platform */}
      <div
        className="relative w-full max-w-md h-72 transition-transform duration-300 ease-out flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Base Grid Floor Plane */}
        <div
          className="absolute inset-0 rounded-2xl border border-cyan-400/20 bg-cyan-950/20"
          style={{
            transform: 'translateZ(-40px) rotateX(60deg)',
            boxShadow: '0 0 50px rgba(6, 182, 212, 0.2)',
          }}
        />

        {/* Tactical Tech Block 1: IEEE Research Core (Top Left) */}
        <div
          className={`absolute top-4 left-6 p-3 rounded-xl border transition-all duration-500 backdrop-blur-md ${
            pulseIndex === 0
              ? 'bg-cyan-900/60 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.8)] scale-105'
              : 'bg-slate-900/80 border-slate-700/80'
          }`}
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="text-[8px] font-mono font-bold text-cyan-300 uppercase">CORE 01 // RESEARCH</div>
          <div className="text-[11px] font-bold text-white mt-0.5">IEEE &amp; Scopus Engine</div>
          <div className="text-[8px] font-mono text-slate-400 mt-1">● 100% Human Peer-Reviewed</div>
        </div>

        {/* Tactical Tech Block 2: Neural Code & PyTorch (Top Right) */}
        <div
          className={`absolute top-6 right-6 p-3 rounded-xl border transition-all duration-500 backdrop-blur-md ${
            pulseIndex === 1
              ? 'bg-emerald-900/60 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.8)] scale-105'
              : 'bg-slate-900/80 border-slate-700/80'
          }`}
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="text-[8px] font-mono font-bold text-emerald-300 uppercase">CORE 02 // REPRODUCIBILITY</div>
          <div className="text-[11px] font-bold text-white mt-0.5">PyTorch &amp; Docker Matrix</div>
          <div className="text-[8px] font-mono text-slate-400 mt-1">● A100 GPU CUDA Benchmarks</div>
        </div>

        {/* Central Quantum Hub: InkMonk Neural Crest */}
        <div
          className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950 to-black border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.5)] flex flex-col items-center justify-center p-2 z-10"
          style={{ transform: 'translateZ(70px)' }}
        >
          {/* Rotating Laser Radar Ring */}
          <div className="absolute inset-0 rounded-2xl border border-cyan-300/40 animate-spin-slow pointer-events-none" />
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-300 flex items-center justify-center text-lg text-cyan-200">
            ⚡
          </div>
          <div className="text-[9px] font-mono font-black text-cyan-300 uppercase tracking-wider mt-2">
            INKMONK LAB
          </div>
          <div className="text-[7px] font-mono text-emerald-400">STATUS: PROACTIVE</div>
        </div>

        {/* Tactical Tech Block 3: Turnitin Originality Sentry (Bottom Left) */}
        <div
          className={`absolute bottom-6 left-8 p-3 rounded-xl border transition-all duration-500 backdrop-blur-md ${
            pulseIndex === 2
              ? 'bg-teal-900/60 border-teal-400 shadow-[0_0_25px_rgba(20,184,166,0.8)] scale-105'
              : 'bg-slate-900/80 border-slate-700/80'
          }`}
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="text-[8px] font-mono font-bold text-teal-300 uppercase">CORE 03 // SENTRY</div>
          <div className="text-[11px] font-bold text-white mt-0.5">Turnitin Safe Protocol</div>
          <div className="text-[8px] font-mono text-slate-400 mt-1">● Zero Repository Deposit</div>
        </div>

        {/* Tactical Tech Block 4: Hindi Devanagari Bridge (Bottom Right) */}
        <div
          className={`absolute bottom-4 right-8 p-3 rounded-xl border transition-all duration-500 backdrop-blur-md ${
            pulseIndex === 3
              ? 'bg-amber-900/60 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.8)] scale-105'
              : 'bg-slate-900/80 border-slate-700/80'
          }`}
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="text-[8px] font-mono font-bold text-amber-300 uppercase">CORE 04 // VERNACULAR</div>
          <div className="text-[11px] font-bold text-white mt-0.5">शोधगंगा &amp; देवनागरी</div>
          <div className="text-[8px] font-mono text-slate-400 mt-1">● Standardized Vocabulary</div>
        </div>

        {/* Procedural Laser Circuit Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(10px)' }}>
          <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" strokeDasharray="4" />
          <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" strokeDasharray="4" />
          <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="1.5" strokeDasharray="4" />
          <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" strokeDasharray="4" />
        </svg>
      </div>

      {/* Telemetry Corner Accents */}
      <div className="absolute top-3 left-4 text-[9px] font-mono text-cyan-400/80">
        [SYS://3D_ECOSYSTEM_PROCEDURAL]
      </div>
      <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-500">
        PALETTE: KEVLAR • CHROME • FLARE
      </div>
    </div>
  );
}
