'use client';

import React, { useState, useEffect } from 'react';
import { AcademicLabCrestLogo } from '@/components/RealIcons';

/**
 * InkMonk Research — "The Edit: Split Reveal" Entrance Animation
 * Strictly Purple, White, and Black Palette
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
        className={`absolute top-0 left-0 right-0 h-1/2 bg-black border-b border-purple-500/40 flex flex-col justify-end items-center pb-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          stage === 'splitting' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 100%, rgba(168, 85, 247, 0.2) 0%, transparent 60%), linear-gradient(to right, rgba(168, 85, 247, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      >
        <div className="flex flex-col items-center text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-black border border-purple-400/60 p-1 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            <AcademicLabCrestLogo className="w-12 h-12" />
          </div>
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-purple-400 font-black mb-1">
            INKMONK // PROCEDURAL RESEARCH ECOSYSTEM
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            InkMonk <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-300">Research</span>
          </h1>
        </div>
      </div>

      {/* Luminous Central Laser Seam Flare */}
      <div
        className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-all duration-700 z-10 ${
          stage === 'splitting'
            ? 'scale-y-[20] opacity-0 blur-lg'
            : 'scale-y-100 opacity-100 shadow-[0_0_30px_#C084FC,0_0_60px_#A855F7]'
        }`}
      />

      {/* Bottom Split Panel */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-black border-t border-purple-500/40 flex flex-col justify-start items-center pt-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          stage === 'splitting' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.2) 0%, transparent 60%), linear-gradient(to right, rgba(168, 85, 247, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      >
        <div className="flex flex-col items-center text-center px-4">
          <p className="font-serif italic text-sm sm:text-base text-purple-200 font-bold mb-3">
            &ldquo;Research with care. Writing with clarity.&rdquo;
          </p>

          <div className="flex items-center gap-3 text-[10px] font-mono text-purple-300 uppercase tracking-widest bg-black/60 border border-purple-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span>0% AI Verification • Turnitin Non-Repository Protocol • Salt Lake</span>
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              setStage('done');
              if (onComplete) onComplete();
            }}
            className="mt-6 text-[10px] font-mono uppercase text-purple-400 hover:text-white transition-colors tracking-widest underline cursor-pointer"
          >
            [ Skip Intro → ]
          </button>
        </div>
      </div>
    </div>
  );
}
