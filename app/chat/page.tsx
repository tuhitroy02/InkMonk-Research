'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to InkMonk Research.\n\n\"Research with care. Writing with clarity.\"\n\nI am your intelligent assistant running locally with no external APIs or telemetry. I can guide you through our research services, calculate transparent quotes, explain our methodology, or prepare an inquiry for our directors, Tuhit Roy and Sampreeti Mukherjee.\n\nWhat kind of academic assistance are you seeking today?",
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState('INIT');
  const [options, setOptions] = useState<string[]>([
    'Research Paper Writing',
    'Thesis Writing',
    'Book Writing',
    'Turnitin AI & Plagiarism Report',
    'Review Paper Writing',
    'Technical vs Non-Technical Advice',
  ]);
  const [context, setContext] = useState<Record<string, unknown>>({});
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = {
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state,
          userMessage: messageText,
          context,
        }),
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      setState(data.nextState || state);
      setOptions(data.options || []);
      setContext(data.context || {});
      if (data.whatsappUrl) {
        setWhatsappUrl(data.whatsappUrl);
      }

      const botMsg: Message = {
        sender: 'bot',
        text: data.botMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "I encountered a minor network error. Please feel free to retry or contact us directly on WhatsApp at +91 7980470880 or email inkmonkresearch@gmail.com.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-notebook-grid py-10 px-4 text-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Top Info Banner */}
        <div className="card-clay-blue-frame p-6 mb-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 p-2 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-inner">
              <Image
                src="/logo.png"
                alt="InkMonk Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-black text-white">InkMonk AI Assistant</h1>
              <p className="text-blue-100 text-xs sm:text-sm font-medium">
                100% Local Rule-Based Engine • Zero External API Keys • Private &amp; Deterministic
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/quote"
              className="btn-clay-white text-xs py-2 px-4 font-bold"
            >
              Manual Quote Form
            </Link>
            <a
              href="https://wa.me/917980470880"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clay-orange text-xs py-2 px-4 font-bold"
            >
              WhatsApp Support
            </a>
          </div>
        </div>

        {/* Chat Window */}
        <div className="card-clay-white flex flex-col h-[650px] overflow-hidden p-0 border-2 border-slate-200">

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/60 scrollbar-thin">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[85%]">
                  {m.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-[#F95721] text-white text-xs font-black flex items-center justify-center shrink-0 mb-1 shadow-sm">
                      IM
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#2563EB] text-white shadow-md rounded-br-none font-medium'
                        : 'bg-white text-slate-800 border-2 border-slate-200 shadow-sm rounded-bl-none font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 px-9 font-semibold">{m.time}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3.5 bg-white rounded-2xl shadow-sm border-2 border-slate-200 w-fit">
                <div className="w-2 h-2 rounded-full bg-[#F95721] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#F95721] animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-[#F95721] animate-bounce delay-200"></div>
                <span className="text-xs text-slate-500 font-bold ml-1">Assistant is reasoning...</span>
              </div>
            )}

            {whatsappUrl && (
              <div className="p-4 bg-orange-50 rounded-2xl border-2 border-orange-200 text-center animate-fade-in my-2">
                <div className="text-slate-900 font-black text-sm mb-2">
                  🎉 Your Quote is Ready for Instant WhatsApp Handover!
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-clay-orange inline-flex items-center gap-2 text-xs py-2.5 px-6 font-bold"
                >
                  Forward Directly to WhatsApp (+91 7980470880)
                </a>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Choice Buttons */}
          {options.length > 0 && !isLoading && (
            <div className="px-5 py-3 bg-white border-t-2 border-slate-100 flex flex-wrap gap-2">
              <span className="text-xs text-slate-500 font-bold self-center mr-1">Suggested replies:</span>
              {options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(opt)}
                  className="text-xs bg-orange-50 hover:bg-orange-100 text-[#F95721] font-bold px-3 py-1.5 rounded-full border border-orange-200 transition-all cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-4 bg-white border-t-2 border-slate-200 flex gap-3 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message, query, or academic discipline here..."
              className="flex-1 bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F95721] text-slate-900 font-medium"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-clay-orange py-2.5 px-6 text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
