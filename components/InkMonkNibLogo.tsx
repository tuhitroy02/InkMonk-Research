'use client';

import React from 'react';
import Image from 'next/image';

export function InkMonkNibIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src="/logo.png"
        alt="InkMonk Research Logo"
        width={100}
        height={100}
        className="w-full h-full object-contain"
        unoptimized
        priority
        style={{ imageRendering: '-webkit-optimize-contrast' }}
      />
    </div>
  );
}

export default function InkMonkNibLogo({ className = "h-11" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative w-11 h-11 shrink-0">
        <Image
          src="/logo.png"
          alt="InkMonk Research"
          width={80}
          height={80}
          className="w-full h-full object-contain"
          unoptimized
          priority
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
      </div>
      <div className="flex flex-col text-center leading-tight">
        <span className="font-serif font-black text-lg tracking-tight text-slate-900 dark:text-white">
          <span className="text-[#1E3A8A] dark:text-[#60A5FA]">Ink</span><span className="text-[#F95721]">Monk</span>
        </span>
        <span className="text-[9px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400">
          RESEARCH
        </span>
      </div>
    </div>
  );
}
