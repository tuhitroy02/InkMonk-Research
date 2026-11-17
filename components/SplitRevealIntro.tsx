'use client';

import React, { useState, useEffect } from 'react';
import { AcademicLabCrestLogo } from '@/components/RealIcons';

/**
 * InkMonk Research — "The Edit: Split Reveal" Entrance Animation
 * Inspired by Jitter Motion Design & Zajno 3D Cyber Ecosystem (Kevlar, Chrome, & Flare).
 */
export default function SplitRevealIntro({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<'initial' | 'splitting' | 'done'>('initial');

  useEffect(() => {
    // Stage 1: Laser Seam & Text Build
    const timer1 = setTimeout(() => {
      setStage('splitting');
    }, 1200);

    // Stage 2: Curtain Opens & Completes
    const timer2 = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden font-sans">
      {/* Top Split Panel */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#030712] border-b border-cyan-500/40 flex flex-col justify-end items-center pb-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          stage === 'splitting' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.15) 0%, transparent 60%), linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      >
        <div className="flex flex-col items-center text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-400/60 p-1 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            <AcademicLabCrestLogo className="w-12 h-12" />
          </div>
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-400 font-black mb-1">
            INKMONK // PROCEDURAL RESEARCH ECOSYSTEM
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            InkMonk <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Research</span>
          </h1>
        </div>
      </div>

      {/* Luminous Central Laser Seam Flare */}
      <div
        className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-700 z-10 ${
          stage === 'splitting'
            ? 'scale-y-[20] opacity-0 blur-lg'
            : 'scale-y-100 opacity-100 shadow-[0_0_30px_#22D3EE,0_0_60px_#06B6D4]'
        }`}
      />

      {/* Bottom Split Panel */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#030712] border-t border-cyan-500/40 flex flex-col justify-start items-center pt-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          stage === 'splitting' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 60%), linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      >
        <div className="flex flex-col items-center text-center px-4">
          <p className="font-serif italic text-sm sm:text-base text-cyan-100/90 font-bold mb-3">
            &ldquo;Research with care. Writing with clarity.&rdquo;
          </p>

          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>0% AI Verification • Turnitin Non-Repository Protocol • Salt Lake</span>
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              setStage('done');
              if (onComplete) onComplete();
            }}
            className="mt-6 text-[10px] font-mono uppercase text-slate-500 hover:text-cyan-300 transition-colors tracking-widest underline cursor-pointer"
          >
            [ Skip Intro → ]
          </button>
        </div>
      </div>
    </div>
  );
}
