'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { processStellaQuery, StellaResponse, StellaContext } from '@/lib/stellaEngine';

interface Message {
  id: string;
  sender: 'stella' | 'user';
  text: string;
  time: string;
  chips?: string[];
  actionLink?: { label: string; href: string; isExternal?: boolean };
}

function FormattedContent({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-100">
      {lines.map((line, i) => {
        if (line.startsWith('### ')) {
          return (
            <h4 key={i} className="font-extrabold text-sm sm:text-base text-[#1d4ed8] dark:text-blue-400 mt-2 mb-1 flex items-center gap-1.5">
              {line.replace('### ', '')}
            </h4>
          );
        }
        if (line.startsWith('#### ')) {
          return (
            <h5 key={i} className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-1.5 mb-0.5">
              {line.replace('#### ', '')}
            </h5>
          );
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <div key={i} className="flex items-start gap-1.5 pl-1.5">
              <span className="text-[#f97316] font-black shrink-0 text-xs mt-0.5">◆</span>
              <span dangerouslySetInnerHTML={{ __html: renderInline(line.substring(2)) }} />
            </div>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          const match = line.match(/^(\d+\.)\s(.*)/);
          if (match) {
            return (
              <div key={i} className="flex items-start gap-1.5 pl-1.5">
                <span className="font-bold text-[#1d4ed8] dark:text-blue-400 shrink-0">{match[1]}</span>
                <span dangerouslySetInnerHTML={{ __html: renderInline(match[2]) }} />
              </div>
            );
          }
        }
        if (line.startsWith('> ')) {
          return (
            <blockquote key={i} className="border-l-3 border-[#f97316] pl-3 my-1 text-slate-600 dark:text-slate-300 italic text-xs sm:text-sm bg-orange-50/60 dark:bg-orange-950/20 py-1.5 rounded-r">
              <span dangerouslySetInnerHTML={{ __html: renderInline(line.substring(2)) }} />
            </blockquote>
          );
        }
        if (!line.trim()) {
          return <div key={i} className="h-1.5" />;
        }
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
        );
      })}
    </div>
  );
}

function renderInline(str: string): string {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-[#1d4ed8] dark:text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'stella',
      text: `### Namaste! 🙏 I am Stella
Welcome to **InkMonk Research** (*"Research with care. Writing with clarity."*).

I am your dedicated **AI Academic & Website Concierge**, running 100% locally on your device with zero cloud API keys or telemetry.

How can I assist your scholarly journey today?
- **Journal Formatting:** IEEE, APA 7th, Harvard, or Scopus guidelines
- **IMRaD & Theses:** 5-chapter doctoral thesis preparation & abstract writing
- **Turnitin Originality:** Safe non-repository instructor-level similarity audits
- **Instant Quotation:** Transparent milestone estimates for English & Hindi work`,
      time: 'Just now',
      chips: [
        'Journal Formatting (IEEE/APA)',
        'Thesis & IMRaD Structure',
        'Get a Project Estimate',
        'Plagiarism & AI-Check Standards',
        'Statistical Data Analysis',
        'Peer-Review Rebuttal Support',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<StellaContext>({ turnCount: 0 });

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll ONLY inside the chat container so window/page never jumps down
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleSend = (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Realistic local consultation delay (350ms)
    setTimeout(() => {
      const response: StellaResponse = processStellaQuery(trimmed, context);
      setContext((prev) => ({ ...prev, turnCount: prev.turnCount + 1 }));

      const stellaMsg: Message = {
        id: `stella-${Date.now()}`,
        sender: 'stella',
        text: response.botMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: response.suggestedChips,
        actionLink: response.actionLink,
      };

      setMessages((prev) => [...prev, stellaMsg]);
      setIsLoading(false);
      inputRef.current?.focus({ preventScroll: true });
    }, 380);
  };

  return (
    <div className="min-h-screen bg-notebook-grid py-8 sm:py-12 px-4 text-slate-900 dark:text-white">
      <div className="max-w-4xl mx-auto">

        {/* Top Info Banner */}
        <div className="card-clay-blue-frame p-6 mb-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] p-2 flex items-center justify-center text-white text-2xl font-black shadow-inner ring-2 ring-white/30">
              ✨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-black text-white">
                  Stella • Academic Concierge
                </h1>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ONLINE
                </span>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-0.5">
                100% Local Intelligence Engine • Zero API Cost • Zero Network Errors
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link
              href="/quote"
              className="btn-clay-orange text-xs py-2 px-4 shadow-sm"
            >
              Get Instant Quote →
            </Link>
            <Link
              href="/services"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-3.5 rounded-xl border border-white/30 transition-colors"
            >
              Services
            </Link>
          </div>
        </div>

        {/* Chat Conversation Container */}
        <div className="bg-white dark:bg-[#0A0F1D] rounded-3xl shadow-xl border-2 border-slate-200 dark:border-slate-800 flex flex-col h-[650px] overflow-hidden">
          
          {/* Messages Area (Pure Internal Scroll, Never Scrolls Webpage Window) */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60 dark:bg-[#070b14] scrollbar-thin overscroll-contain"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 shadow-sm text-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white rounded-br-xs font-medium'
                      : 'bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-800 rounded-bl-xs shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  {m.sender === 'user' ? (
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  ) : (
                    <FormattedContent text={m.text} />
                  )}

                  {/* Action Link Button if provided */}
                  {m.actionLink && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-slate-700/80">
                      {m.actionLink.isExternal ? (
                        <a
                          href={m.actionLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all hover:scale-102"
                        >
                          <span>{m.actionLink.label}</span>
                          <span>↗</span>
                        </a>
                      ) : (
                        <Link
                          href={m.actionLink.href}
                          className="inline-flex items-center gap-1.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all hover:scale-102"
                        >
                          <span>{m.actionLink.label}</span>
                          <span>→</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 px-1">{m.time}</span>

                {/* Quick Action Chips */}
                {m.chips && m.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                    {m.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(chip)}
                        className="text-xs font-bold bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-700 dark:text-slate-200 hover:text-[#f97316] border border-slate-300 dark:border-slate-700 hover:border-[#f97316] px-3 py-1.5 rounded-full shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3.5 bg-white dark:bg-[#111827] rounded-2xl w-fit shadow-xs border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
                  Stella is formulating academic guidance…
                </span>
                <div className="w-2 h-2 bg-[#f97316] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-[#1d4ed8] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-[#f97316] rounded-full animate-bounce" />
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-4 bg-white dark:bg-[#0A0F1D] border-t border-slate-200 dark:border-slate-800 flex gap-3 items-center"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Stella about citation rules, thesis drafting, PRISMA, or quotes…"
              className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] focus:bg-white dark:focus:bg-slate-900 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 disabled:opacity-40 hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <span>Send</span>
              <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
