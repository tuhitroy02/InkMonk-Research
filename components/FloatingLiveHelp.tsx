'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingLiveHelp() {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <AnimatePresence>
        {!minimized ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative"
          >
            <Link
              href="/chat"
              className="flex items-center gap-3.5 bg-white border-2 border-slate-200 rounded-2xl p-3 sm:p-3.5 shadow-[0_14px_34px_-4px_rgba(15,23,42,0.18)] hover:shadow-[0_18px_40px_-4px_rgba(15,23,42,0.25)] hover:-translate-y-1 transition-all duration-200 group text-left max-w-xs"
              title="Click to chat with AI Scholar Assistant"
            >
              {/* Official InkMonk Logo Icon in rounded container */}
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 p-1 group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
                <Image
                  src="/logo.png"
                  alt="InkMonk Logo"
                  width={60}
                  height={60}
                  className="w-10 h-10 object-contain rounded-lg"
                  unoptimized
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>

              {/* Text & Status */}
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-slate-900 tracking-tight">
                    Live Help
                  </span>
                  <span className="text-xs">👋</span>
                  {/* Pulsing Green Online Dot */}
                  <span className="relative flex h-2 w-2 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Hey, got questions?<br />
                  <span className="text-blue-600 font-bold group-hover:underline">Let&apos;s chat!</span>
                </p>
              </div>
            </Link>

            {/* Quick minimize button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMinimized(true);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px] font-bold shadow-sm"
              title="Minimize chat pill"
            >
              ×
            </button>
          </motion.div>
        ) : (
          /* Minimized floating round icon button */
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setMinimized(false)}
            className="w-14 h-14 rounded-full bg-white border-2 border-orange-500 shadow-[0_12px_28px_rgba(249,87,33,0.3)] flex items-center justify-center p-2.5 hover:scale-110 active:scale-95 transition-transform"
            title="Open Live Help"
          >
            <Image
              src="/logo.png"
              alt="InkMonk Live Help"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              unoptimized
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
            <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
