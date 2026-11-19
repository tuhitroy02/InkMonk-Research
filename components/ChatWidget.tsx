'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { processStellaQuery, StellaResponse, StellaContext } from '@/lib/stellaEngine';

interface ChatMessage {
  id: string;
  sender: 'stella' | 'user';
  text: string;
  time: string;
  chips?: string[];
  actionLink?: { label: string; href: string; isExternal?: boolean };
}

// Lightweight Markdown Formatter for Stella's Academic Responses
function FormattedMessage({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-800 dark:text-slate-100">
      {lines.map((line, i) => {
        // Headers
        if (line.startsWith('### ')) {
          return (
            <h4 key={i} className="font-extrabold text-sm sm:text-[14px] text-[#1d4ed8] dark:text-blue-400 mt-2 mb-1 flex items-center gap-1.5">
              {line.replace('### ', '')}
            </h4>
          );
        }
        if (line.startsWith('#### ')) {
          return (
            <h5 key={i} className="font-bold text-xs sm:text-xs text-slate-900 dark:text-white mt-1.5 mb-0.5">
              {line.replace('#### ', '')}
            </h5>
          );
        }
        // Bullet list
        if (line.startsWith('- ') || line.startsWith('* ')) {
          const content = line.substring(2);
          return (
            <div key={i} className="flex items-start gap-1.5 pl-1.5">
              <span className="text-[#f97316] font-black shrink-0 text-[10px] mt-0.5">◆</span>
              <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(content) }} />
            </div>
          );
        }
        // Numbered list
        if (/^\d+\.\s/.test(line)) {
          const match = line.match(/^(\d+\.)\s(.*)/);
          if (match) {
            return (
              <div key={i} className="flex items-start gap-1.5 pl-1.5">
                <span className="font-bold text-[#1d4ed8] dark:text-blue-400 shrink-0 text-xs">{match[1]}</span>
                <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(match[2]) }} />
              </div>
            );
          }
        }
        // Code / Preformatted block
        if (line.startsWith('```')) {
          return null; // Handle code container simply
        }
        // Blockquote
        if (line.startsWith('> ')) {
          return (
            <blockquote key={i} className="border-l-2 border-[#f97316] pl-2.5 my-1 text-slate-600 dark:text-slate-300 italic text-[11px] sm:text-xs bg-orange-50/50 dark:bg-orange-950/20 py-1 rounded-r">
              <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line.substring(2)) }} />
            </blockquote>
          );
        }
        // Blank line
        if (!line.trim()) {
          return <div key={i} className="h-1" />;
        }
        // Regular line
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }} />
        );
      })}
    </div>
  );
}

// Inline Markdown (Bold, Italics, Code tags, Links)
function renderInlineMarkdown(str: string): string {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-[#1d4ed8] dark:text-blue-300 px-1 py-0.5 rounded text-[11px] font-mono">$1</code>');
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'stella',
      text: `### 👋 Greetings from Stella
I am your **AI Academic & Website Concierge** at InkMonk Research.

How can I assist your scholarship today?
- **Journal Formatting:** IEEE, APA 7th, Springer, Elsevier, or Harvard standards
- **Manuscript Architecture:** IMRaD structure, research gaps & title scoping
- **Turnitin Verification:** Safe instructor-level non-repository originality audits
- **Instant Project Estimates:** Direct transparent pricing & timeline calculations`,
      time: 'Just now',
      chips: [
        'Journal Formatting (IEEE/APA)',
        'Thesis & IMRaD Structure',
        'Get a Project Estimate',
        'Plagiarism & AI-Check Standards',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<StellaContext>({ turnCount: 0 });

  const chatDrawerRef = useRef<HTMLDivElement>(null);
  const chatLauncherRef = useRef<HTMLButtonElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll ONLY inside the chat messages container without jitter or window jumping
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  // Focus input ONLY once when user explicitly opens the drawer (never on message updates)
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus({ preventScroll: true });
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Outside click handler that STRICTLY protects chat drawer and launcher
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!isOpen) return;
      const target = event.target as Node;
      if (
        chatDrawerRef.current &&
        !chatDrawerRef.current.contains(target) &&
        chatLauncherRef.current &&
        !chatLauncherRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Send message through Stella's 100% Local Intelligence Engine
  const handleSendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    // Anchor current window scroll position to prevent browser jumping
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Safeguard window scroll
    if (typeof window !== 'undefined' && window.scrollY !== scrollY) {
      window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
    }

    // Realistic typing delay (350ms) for high-end feel while running 100% locally
    setTimeout(() => {
      const response: StellaResponse = processStellaQuery(trimmed, context);
      setContext((prev) => ({ ...prev, turnCount: prev.turnCount + 1 }));

      const stellaMessage: ChatMessage = {
        id: `stella-${Date.now()}`,
        sender: 'stella',
        text: response.botMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: response.suggestedChips,
        actionLink: response.actionLink,
      };

      setMessages((prev) => [...prev, stellaMessage]);
      setIsTyping(false);

      if (typeof window !== 'undefined' && window.scrollY !== scrollY) {
        window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
      }
    }, 350);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatDrawerRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[340px] sm:w-[410px] h-[550px] max-h-[84vh] bg-white dark:bg-[#0A0F1D] rounded-3xl shadow-[0_20px_60px_-15px_rgba(29,78,216,0.3)] border-2 border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden mb-3.5 z-50"
          >
            {/* ─── Top Header (Royal Blue + Vibrant Orange Accents) ────── */}
            <div className="bg-gradient-to-r from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a] p-4 text-white flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] flex items-center justify-center text-white font-black text-sm shadow-inner ring-2 ring-white/30">
                    ✨
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#1e40af] rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                      Stella
                    </h3>
                    <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full text-white/95 uppercase tracking-wider">
                      Concierge
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-blue-100 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Private Scholarly Concierge • Instant</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href="/chat"
                  className="p-2 hover:bg-white/15 rounded-xl text-white/80 hover:text-white transition-colors"
                  title="Expand to Full Page Chat"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-2 hover:bg-white/15 rounded-xl text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Close Concierge"
                  aria-label="Close Concierge"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ─── Messages Scroll Container (Pure Internal Scroll, No Page Jump) ─── */}
            <div
              ref={messagesContainerRef}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 dark:bg-[#070b14] scrollbar-thin overscroll-contain"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm text-xs sm:text-sm ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white rounded-br-xs font-medium'
                        : 'bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-800 rounded-bl-xs shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                    }`}
                  >
                    {m.sender === 'user' ? (
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    ) : (
                      <FormattedMessage text={m.text} />
                    )}

                    {/* Action Button Link if provided */}
                    {m.actionLink && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/80">
                        {m.actionLink.isExternal ? (
                          <a
                            href={m.actionLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-[11px] px-3 py-1.5 rounded-xl shadow-md transition-all hover:scale-102"
                          >
                            <span>{m.actionLink.label}</span>
                            <span>↗</span>
                          </a>
                        ) : (
                          <Link
                            href={m.actionLink.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-[11px] px-3 py-1.5 rounded-xl shadow-md transition-all hover:scale-102"
                          >
                            <span>{m.actionLink.label}</span>
                            <span>→</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>

                  {/* Suggested Quick Starter Chips */}
                  {m.chips && m.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {m.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSendMessage(chip);
                          }}
                          className="text-[11px] font-bold bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-700 dark:text-slate-200 hover:text-[#f97316] border border-slate-300 dark:border-slate-700 hover:border-[#f97316] px-2.5 py-1 rounded-full shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Realistic Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-[#111827] rounded-2xl w-fit shadow-xs border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
                    Stella is consulting knowledge graph…
                  </span>
                  <div className="w-1.5 h-1.5 bg-[#f97316] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-[#1d4ed8] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-[#f97316] rounded-full animate-bounce" />
                </div>
              )}
            </div>

            {/* ─── Bottom Input Box ──────────────────────────────────── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSendMessage(input);
              }}
              onClick={(e) => e.stopPropagation()}
              className="p-3 bg-white dark:bg-[#0A0F1D] border-t border-slate-200 dark:border-slate-800 flex gap-2 items-center shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSendMessage(input);
                  }
                }}
                placeholder="Ask Stella about formatting, IMRaD, quotes…"
                className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] focus:bg-white dark:focus:bg-slate-900 transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white flex items-center justify-center disabled:opacity-40 hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                title="Send Message"
                aria-label="Send Message"
              >
                <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Launcher Badge + Round Toggle Button ───────────── */}
      <div className="flex items-center gap-2.5">
        {/* Launcher Pill Badge */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="hidden sm:flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-slate-200 dark:border-slate-800 py-2 px-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(29,78,216,0.18)] hover:shadow-[0_14px_30px_-5px_rgba(249,115,22,0.25)] hover:border-[#f97316] transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-slate-800 dark:text-white group-hover:text-[#f97316] transition-colors">
              Ask Stella • Academic Concierge
            </span>
            <span className="bg-orange-100 dark:bg-orange-950 text-[#f97316] text-[10px] font-black px-1.5 py-0.5 rounded-full">
              FREE
            </span>
          </motion.div>
        )}

        {/* Round Launcher Button */}
        <button
          ref={chatLauncherRef}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#1d4ed8] via-[#2563eb] to-[#f97316] text-white shadow-[0_12px_32px_rgba(29,78,216,0.35)] flex items-center justify-center transition-all duration-200 hover:scale-108 active:scale-95 border-2 border-white dark:border-slate-800 cursor-pointer focus:outline-none"
          aria-label={isOpen ? 'Close Stella Concierge' : 'Open Stella Concierge'}
          title={isOpen ? 'Close Stella Concierge' : 'Ask Stella • Academic Concierge'}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative flex items-center justify-center">
              <span className="text-2xl">✨</span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
