'use client';

import React, { useState, useEffect } from 'react';

/**
 * InkMonk Research — Futuristic Scroll Experience & Cyber Telemetry
 * Inspired by Michael Skripin / Zajno's Cyber Security Ecosystem (Dribbble)
 * Palette: Kevlar Obsidian (#030712), Liquid Chrome (#E2E8F0), & Cyber Flare (Cyan #00F2FE / Emerald #10B981)
 */

/* ─── 1. Fixed Top Laser Scroll Progress Scanner & HUD ───────────────────── */
export function ScrollProgressLaser() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('HERO');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      // Section telemetry
      const scrollY = window.scrollY;
      if (scrollY < 600) setActiveSection('01 // CORE_HERO');
      else if (scrollY < 1400) setActiveSection('02 // DISCIPLINES');
      else if (scrollY < 2200) setActiveSection('03 // ESCROW_TIMELINE');
      else if (scrollY < 3200) setActiveSection('04 // DELIVERABLES_MATRIX');
      else if (scrollY < 4200) setActiveSection('05 // 4_PHASE_PIPELINE');
      else if (scrollY < 5200) setActiveSection('06 // SCHOLAR_DIRECTORATE');
      else setActiveSection('07 // SECURE_COMMS');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const percentage = Math.round(scrollProgress * 100);

  return (
    <>
      {/* Top Fixed Glowing Laser Beam */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-900/40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_12px_#00F2FE,0_0_24px_#10B981]"
          style={{ width: `${percentage}%` }}
        />
        {/* Leading Laser Flare Blip */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#00F2FE,0_0_30px_#FFFFFF] pointer-events-none transition-all duration-150"
          style={{ left: `calc(${percentage}% - 6px)` }}
        />
      </div>

      {/* Floating HUD Telemetry Badge (Bottom Right on Desktop) */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-3 bg-[#030712]/90 border border-cyan-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.25)] select-none pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
          {activeSection}
        </span>
        <span className="text-[10px] font-mono text-slate-500">|</span>
        <span className="text-[10px] font-mono text-emerald-400 font-bold">
          DEPTH: {percentage}%
        </span>
      </div>
    </>
  );
}

/* ─── 2. Vertical Cyber Circuit Trace Spine Connecting Sections ─────────── */
export function CyberCircuitSpine({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center my-8 pointer-events-none ${className}`}>
      {/* Upper Node */}
      <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F2FE]" />
      
      {/* Pulsing Vertical Laser Track */}
      <div className="w-[2px] h-20 bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 relative overflow-hidden my-1">
        <div className="absolute inset-0 bg-white/80 animate-scanline" />
      </div>

      {/* Lower Node */}
      <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#10B981]" />
    </div>
  );
}

/* ─── 3. Interactive 3D Perspective Tilt Card Wrapper ────────────────────── */
export function Interactive3DCard({
  children,
  className = "",
  glowColor = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "emerald" | "indigo";
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const glowStyles = {
    cyan: "hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.35),0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-400/80",
    emerald: "hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.35),0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-400/80",
    indigo: "hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.35),0_0_30px_rgba(99,102,241,0.15)] hover:border-indigo-400/80",
  }[glowColor];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out transform-gpu ${glowStyles} ${className}`}
      style={{
        perspective: '1000px',
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-6px) scale(1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

/* ─── 4. Procedural Floating Cyber Particles ─────────────────────────────── */
export function CyberParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/4 left-1/6 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F2FE] animate-ping" />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10B981] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-teal-300 shadow-[0_0_8px_#2DD4BF] animate-ping" />
      <div className="absolute top-3/4 right-1/6 w-2 h-2 rounded-full bg-cyan-300/60 shadow-[0_0_15px_#22D3EE] animate-pulse" />
    </div>
  );
}
