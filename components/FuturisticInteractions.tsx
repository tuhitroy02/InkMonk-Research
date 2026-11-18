'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TurnitinShieldLogo,
  UpiShieldIcon,
  GoogleScholarRealIcon,
  IeeeXploreRealIcon,
  GitHubRealIcon,
  NdaShieldIcon,
  TerminalLogIcon,
  AuditTrailIcon,
  CalendarScheduleIcon,
  ResearchPaperRealIcon,
  ThesisRealIcon,
  CodeModelRealIcon,
} from '@/components/RealIcons';

/* ─── 1. Instant Turnitin Scan & ₹200 UPI Checkout Modal ─────────────────── */
export function InstantTurnitinModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [step, setStep] = useState<'upload' | 'pay' | 'success'>('upload');
  const [userEmail, setUserEmail] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  if (!isOpen) return null;

  const upiId = 'inkmonkresearch@okaxis';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0A0414] text-white rounded-3xl border border-purple-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
        >
          ✕
        </button>

        {step === 'upload' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-400/50 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <TurnitinShieldLogo className="w-9 h-9" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              Instant Turnitin Plagiarism &amp; AI Scan
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 mb-5">
              Flat <span className="text-purple-400 font-bold font-mono">₹200</span> • Safe Non-Repository Protocol • Delivered in 15–30 Mins
            </p>

            {/* Non-Repository Guarantee Badge */}
            <div className="w-full bg-purple-950/70 border border-purple-500/40 rounded-xl p-3 mb-5 text-left flex items-start gap-3">
              <span className="text-purple-300 text-lg">🛡️</span>
              <div className="text-xs text-purple-200">
                <strong className="text-white block font-semibold">Zero-Repository Guarantee</strong>
                Your manuscript is analyzed in private RAM and never deposited into Turnitin&apos;s global student paper database.
              </div>
            </div>

            {/* Upload Box */}
            <label className="w-full border-2 border-dashed border-purple-500/40 hover:border-purple-300 rounded-2xl p-6 cursor-pointer flex flex-col items-center justify-center bg-black/40 hover:bg-black/60 transition-all mb-4">
              <input
                type="file"
                accept=".docx,.pdf,.doc,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
                }}
              />
              <span className="text-3xl mb-2">📄</span>
              {selectedFile ? (
                <div className="text-sm text-purple-300 font-bold break-all">
                  {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </div>
              ) : (
                <>
                  <div className="text-sm font-bold text-white mb-1">
                    Drag &amp; drop or click to upload manuscript
                  </div>
                  <div className="text-xs text-purple-300/80">Supports .DOCX, .PDF (Up to 50MB)</div>
                </>
              )}
            </label>

            <input
              type="email"
              required
              placeholder="Your Email ID for Report Delivery"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full bg-black/60 border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 mb-5"
            />

            <button
              disabled={!selectedFile || !userEmail}
              onClick={() => setStep('pay')}
              className="btn-primary-glow w-full !py-3 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue to Instant UPI Pay (₹200) →
            </button>
          </div>
        )}

        {step === 'pay' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-400/50 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <UpiShieldIcon className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-xl font-bold text-white mb-1">
              Pay ₹200 via UPI
            </h3>
            <p className="text-xs text-purple-200 mb-4">
              Scan QR or copy UPI ID. Instant verification with zero transaction fee.
            </p>

            {/* Simulated UPI QR Code SVG */}
            <div className="bg-white p-3 rounded-2xl shadow-xl border-4 border-purple-400 mb-4 flex flex-col items-center">
              <svg viewBox="0 0 160 160" className="w-36 h-36">
                <rect width="160" height="160" fill="#FFFFFF" />
                {/* QR Finder Corners */}
                <rect x="10" y="10" width="40" height="40" fill="#0A0414" rx="6" />
                <rect x="16" y="16" width="28" height="28" fill="#FFFFFF" rx="3" />
                <rect x="22" y="22" width="16" height="16" fill="#7E22CE" rx="2" />

                <rect x="110" y="10" width="40" height="40" fill="#0A0414" rx="6" />
                <rect x="116" y="16" width="28" height="28" fill="#FFFFFF" rx="3" />
                <rect x="122" y="22" width="16" height="16" fill="#7E22CE" rx="2" />

                <rect x="10" y="110" width="40" height="40" fill="#0A0414" rx="6" />
                <rect x="16" y="116" width="28" height="28" fill="#FFFFFF" rx="3" />
                <rect x="22" y="122" width="16" height="16" fill="#7E22CE" rx="2" />

                {/* Data Matrix Dots */}
                {[
                  [60, 20], [70, 20], [80, 20], [90, 20],
                  [60, 30], [80, 40], [90, 30],
                  [20, 60], [30, 70], [40, 60], [50, 80],
                  [60, 60], [70, 70], [80, 60], [90, 70], [100, 60], [110, 80], [120, 70], [130, 60],
                  [60, 90], [70, 100], [80, 90], [90, 100], [100, 90], [110, 100],
                  [60, 120], [80, 130], [90, 120], [100, 130], [120, 120], [130, 130]
                ].map(([x, y], idx) => (
                  <rect key={idx} x={x} y={y} width="7" height="7" fill="#0A0414" rx="1.5" />
                ))}
                {/* Center Badge */}
                <circle cx="80" cy="80" r="14" fill="#9333EA" />
                <text x="80" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">₹200</text>
              </svg>
              <span className="text-[10px] font-bold text-black mt-1 uppercase tracking-wider font-mono">
                Google Pay • PhonePe • Paytm • BHIM
              </span>
            </div>

            {/* UPI ID Pill with Copy */}
            <div className="flex items-center gap-2 bg-black/60 border border-purple-500/30 rounded-xl px-4 py-2 mb-4 w-full justify-between">
              <span className="text-xs text-purple-300 font-mono font-bold">{upiId}</span>
              <button
                onClick={handleCopyUpi}
                className="text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {copiedUpi ? '◆ Copied!' : 'Copy UPI'}
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter 12-digit UPI Reference / UTR Number"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              className="w-full bg-black/60 border border-purple-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 mb-4"
            />

            <div className="flex gap-2 w-full">
              <button
                onClick={() => setStep('upload')}
                className="w-1/3 py-2.5 text-xs text-purple-200 hover:text-white bg-white/10 rounded-xl cursor-pointer"
              >
                ← Back
              </button>
              <button
                disabled={utrNumber.length < 6}
                onClick={() => setStep('success')}
                className="btn-primary-glow flex-1 !py-2.5 text-xs font-bold disabled:opacity-40"
              >
                Submit Payment &amp; Start Scan →
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl mb-4 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
              ◆
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Manuscript Queued for Audit!
            </h3>
            <p className="text-sm text-purple-200 mb-4">
              Your draft <strong className="text-white">{selectedFile?.name}</strong> has been received under our Safe Non-Repository Protocol.
            </p>
            <div className="bg-black/60 border border-purple-500/30 rounded-2xl p-4 text-xs text-purple-200 text-left mb-6 w-full space-y-1.5 font-mono">
              <div>• <strong>Delivery Target:</strong> 15–30 minutes to {userEmail}</div>
              <div>• <strong>Included Deliverables:</strong> Full Turnitin PDF breakdown + AI Writing Score + Clickable Source Links</div>
              <div>• <strong>Reference ID:</strong> TRN-{Date.now().toString().slice(-6)}</div>
            </div>
            <button
              onClick={onClose}
              className="btn-primary-glow w-full !py-2.5 text-sm"
            >
              Done &amp; Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 2. Turnitin Watermarked Sample Report Modal (Kabir's Request) ───────── */
export function TurnitinSampleModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0A0414] text-white rounded-3xl border border-purple-500/40 shadow-2xl p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-20 cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-purple-950/80 border border-purple-400/50 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-2 font-mono">
            <TurnitinShieldLogo className="w-4 h-4" />
            <span>AUTHENTIC INSTRUCTOR REPORT SAMPLE</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Watermarked Turnitin Feedback Studio Deliverable
          </h3>
          <p className="text-xs sm:text-sm text-purple-200/80">
            This is the exact high-definition breakdown our clients receive — no cyber-cafe summaries.
          </p>
        </div>

        {/* Turnitin Paper Container with Watermark */}
        <div className="relative rounded-2xl p-6 sm:p-8 text-black bg-white overflow-hidden shadow-inner border border-purple-300">
          {/* Turnitin Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-300 pb-4 mb-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-black tracking-tight">turnitin</span>
              <span className="text-xs bg-slate-200 px-2 py-0.5 rounded font-mono text-slate-700">Feedback Studio</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
              <span>Non-Repository Mode: <strong className="text-purple-700">ACTIVE</strong></span>
              <span>•</span>
              <span>Doc ID: #984210</span>
            </div>
          </div>

          {/* Scores Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-purple-50 border-2 border-purple-500 rounded-xl p-3 text-center">
              <div className="text-[11px] font-bold text-purple-900 uppercase font-mono">Overall Similarity</div>
              <div className="font-serif text-3xl font-black text-purple-600">6%</div>
              <div className="text-[10px] text-purple-700 font-semibold">&lt; 10% Guaranteed</div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-500 rounded-xl p-3 text-center">
              <div className="text-[11px] font-bold text-purple-900 uppercase font-mono">AI Writing Score</div>
              <div className="font-serif text-3xl font-black text-purple-600">0%</div>
              <div className="text-[10px] text-purple-700 font-semibold">100% Human Authored</div>
            </div>

            <div className="bg-slate-100 border border-slate-300 rounded-xl p-3 text-center">
              <div className="text-[11px] font-bold text-slate-700 uppercase font-mono">Internet Matches</div>
              <div className="font-serif text-2xl font-bold text-black">3%</div>
              <div className="text-[10px] text-slate-500">Public web crawl</div>
            </div>

            <div className="bg-slate-100 border border-slate-300 rounded-xl p-3 text-center">
              <div className="text-[11px] font-bold text-slate-700 uppercase font-mono">Journal Matches</div>
              <div className="font-serif text-2xl font-bold text-black">3%</div>
              <div className="text-[10px] text-slate-500">IEEE, Elsevier, Springer</div>
            </div>
          </div>

          {/* Manuscript Excerpt with Color-Coded Matches */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white text-left font-serif text-xs sm:text-sm leading-relaxed text-black mb-6">
            <div className="font-sans text-[11px] font-bold text-purple-900 uppercase tracking-wider mb-2 font-mono">
              Manuscript Excerpt (Chapter 3: Methodology)
            </div>
            <p className="mb-2">
              The proposed algorithmic pipeline incorporates a bidirectional long short-term memory (Bi-LSTM) network integrated with self-attention layers to forecast non-linear temporal anomalies.
              <span className="bg-purple-100 border-b-2 border-purple-600 text-purple-900 font-sans px-1 text-xs mx-1">
                [1] As demonstrated in Kumar et al. (2023), gradient vanishing in deep recurring cells is mitigated through orthogonal weight initialization.
              </span>
              Empirical validation across benchmark IEEE datasets demonstrated a root mean squared error reduction of 14.2% relative to baseline autoregressive models.
            </p>
          </div>

          {/* Clickable Match Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-left mb-4">
            <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-black border-b border-slate-200 font-mono">
              Primary Matched Sources (Clickable Audit Breakdown)
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="p-3 flex items-center justify-between bg-white hover:bg-purple-50">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                  <span className="font-medium text-black">IEEE Xplore Digital Library — Document #9482103</span>
                </div>
                <span className="font-bold text-purple-700 font-mono">2% Match</span>
              </div>
              <div className="p-3 flex items-center justify-between bg-white hover:bg-purple-50">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                  <span className="font-medium text-black">ScienceDirect / Elsevier — Computers &amp; Electrical Eng.</span>
                </div>
                <span className="font-bold text-purple-700 font-mono">2% Match</span>
              </div>
            </div>
          </div>

          {/* Official Verification Stamp */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200 font-mono">
            <span>Audit Authority: InkMonk Research Salt Lake Office</span>
            <span className="text-blue-700 font-bold">◆ Institutional Exemption Verified</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="btn-primary-glow !py-2.5 text-xs font-bold"
          >
            Order Your Scan for ₹200 →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 3. Formal Non-Disclosure Agreement (NDA) Modal ─────────────────────── */
export function FormalNdaModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0A0414] text-white rounded-3xl border border-purple-500/50 shadow-2xl p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-20 cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-400/50 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <NdaShieldIcon className="w-9 h-9" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mb-1">
            InkMonk Scholarly Non-Disclosure Agreement
          </h3>
          <p className="text-xs text-purple-300 font-semibold font-mono">
            Standard Mutual NDA &amp; 100% Intellectual Property Assignment
          </p>
        </div>

        <div className="bg-black/80 border border-purple-500/20 rounded-2xl p-5 text-left text-xs leading-relaxed text-purple-100 space-y-4 max-h-80 overflow-y-auto font-sans">
          <div>
            <strong className="text-white block mb-1">1. Absolute Confidentiality of Research Data</strong>
            InkMonk Research covenants that all raw ethnographic fieldwork, primary survey datasets, unpublished hypotheses, experimental logs, computational models, and thesis drafts submitted by the Researcher will remain strictly confidential and shall never be disseminated or disclosed to any third party.
          </div>
          <div>
            <strong className="text-white block mb-1">2. 100% Intellectual Property (IP) Ownership</strong>
            All final drafts, code implementations, diagrams, and written manuscripts are the exclusive intellectual property of the Client. InkMonk Research retains zero proprietary claim, copyright, or moral rights over delivered academic work.
          </div>
          <div>
            <strong className="text-white block mb-1">3. Non-Repository Turnitin Processing Guarantee</strong>
            All similarity and originality audits are executed strictly via instructor accounts with repository storage permanently disabled. No client manuscript will ever be indexed into any institutional database.
          </div>
          <div>
            <strong className="text-white block mb-1">4. Secure Digital Shredding &amp; Jurisdiction</strong>
            Upon final delivery and client sign-off, working project files are purged from active staging environments. This agreement is legally enforceable under the Indian Contract Act, 1872, with exclusive jurisdiction in Kolkata.
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-purple-900/60 gap-3">
          <div className="text-left text-[11px] text-purple-300 font-mono">
            <span className="text-white font-bold block">◆ Pre-Signed by InkMonk Directorate</span>
            Tuhit Roy (Research Dir.) • Sampreeti Mukherjee (Editorial Dir.)
          </div>
          <button
            onClick={onClose}
            className="btn-primary-glow !py-2.5 !px-6 text-xs font-bold"
          >
            I Accept &amp; Understand →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 4. 1-on-1 Doctoral Consultation Scheduler Modal ────────────────────── */
export function ConsultationSchedulerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [discipline, setDiscipline] = useState('Computer Science & AI');
  const [date, setDate] = useState('Tomorrow');
  const [slot, setSlot] = useState('04:00 PM - 04:30 PM IST');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0A0414] text-white rounded-3xl border border-purple-500/50 shadow-2xl p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-20 cursor-pointer"
        >
          ✕
        </button>

        {!booked ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-400/50 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <CalendarScheduleIcon className="w-9 h-9" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              Book a 1-on-1 Video Consultation
            </h3>
            <p className="text-xs text-purple-200 mb-6">
              Confidential 20-minute preliminary session with an assigned discipline specialist via Google Meet.
            </p>

            <div className="space-y-4 text-left text-xs font-mono">
              <div>
                <label className="block text-white font-bold mb-1.5">Select Academic Discipline:</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full bg-black border border-purple-500/40 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                >
                  <option>Computer Science &amp; AI (ML / Deep Learning / IEEE)</option>
                  <option>Social Sciences &amp; Rural Sociology</option>
                  <option>Hindi Literature &amp; Linguistics (Devanagari)</option>
                  <option>Management &amp; Financial Econometrics</option>
                  <option>Mechanical &amp; Civil Engineering</option>
                  <option>Biotechnology &amp; Life Sciences</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white font-bold mb-1.5">Date:</label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-black border border-purple-500/40 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                  >
                    <option>Tomorrow (Priority)</option>
                    <option>In 2 Days</option>
                    <option>This Weekend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-bold mb-1.5">Time Slot (IST):</label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full bg-black border border-purple-500/40 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                  >
                    <option>11:30 AM - 12:00 PM</option>
                    <option>04:00 PM - 04:30 PM</option>
                    <option>06:30 PM - 07:00 PM</option>
                    <option>08:00 PM - 08:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5">Email for Calendar Invite:</label>
                <input
                  type="email"
                  required
                  placeholder="scholar@university.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-purple-500/40 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5">WhatsApp / Phone Number:</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black border border-purple-500/40 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <button
              disabled={!email || !phone}
              onClick={() => setBooked(true)}
              className="btn-primary-glow w-full !py-3 text-xs font-bold mt-6 disabled:opacity-40"
            >
              Confirm 1-on-1 Consultation Slot →
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl mx-auto mb-4 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
              ◆
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Consultation Confirmed!
            </h3>
            <p className="text-sm text-purple-200 mb-4">
              Google Meet invite sent to <strong className="text-white">{email}</strong> for {date} at {slot}.
            </p>
            <div className="bg-black/60 border border-purple-500/30 rounded-xl p-3 text-xs text-purple-200 text-left mb-6 font-mono">
              <div>• <strong>Assigned Expert:</strong> Discipline Director ({discipline})</div>
              <div>• <strong>Protocol:</strong> Full NDA Protected Discussion</div>
            </div>
            <button
              onClick={onClose}
              className="btn-primary-glow w-full !py-2.5 text-xs font-bold"
            >
              Done &amp; Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 5. Model & Code Interactive Scope Builder Modal ────────────────────── */
export function ModelCodeScopeBuilderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [framework, setFramework] = useState('PyTorch');
  const [compute, setCompute] = useState('CUDA 12.x / A100 GPU');
  const [dockerRequired, setDockerRequired] = useState(true);
  const [gitHandoff, setGitHandoff] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0A0414] text-white rounded-3xl border border-purple-500/50 shadow-2xl p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-20 cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-400/50 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <TerminalLogIcon className="w-9 h-9" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mb-1">
            Computational Model &amp; Code Scope Builder
          </h3>
          <p className="text-xs text-purple-300 font-mono">
            Deterministic Reproducibility • Docker Containers • Private Git Handoff
          </p>
        </div>

        <div className="space-y-4 text-left text-xs mb-6 font-mono">
          {/* Framework Selector */}
          <div>
            <label className="block text-white font-bold mb-2">Core Framework &amp; Language:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['PyTorch', 'TensorFlow', 'MATLAB', 'JAX / Flax', 'Scikit-Learn', 'Python Data', 'R Bioconductor', 'CUDA C++'].map((fw) => (
                <button
                  key={fw}
                  type="button"
                  onClick={() => setFramework(fw)}
                  className={`px-3 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    framework === fw
                      ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-105'
                      : 'bg-black/60 text-purple-300 hover:bg-purple-950/40 border border-purple-500/30'
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>

          {/* Compute Environment */}
          <div>
            <label className="block text-white font-bold mb-2">Compute &amp; Training Spec:</label>
            <select
              value={compute}
              onChange={(e) => setCompute(e.target.value)}
              className="w-full bg-black border border-purple-500/40 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-purple-400"
            >
              <option>CUDA 12.x / NVIDIA A100 / H100 Accelerated</option>
              <option>Google Colab Pro / TPU V4 Environment</option>
              <option>Local CPU / Multi-Core Parallel (MATLAB / R)</option>
              <option>Custom Cloud Instance (AWS EC2 / GCP Compute)</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 bg-black/60 border border-purple-500/30 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={dockerRequired}
                onChange={(e) => setDockerRequired(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600"
              />
              <div>
                <span className="font-bold text-white block">Dockerized Container</span>
                <span className="text-[10px] text-purple-300/80">One-click reproducible Dockerfile</span>
              </div>
            </label>

            <label className="flex items-center gap-3 bg-black/60 border border-purple-500/30 p-3 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={gitHandoff}
                onChange={(e) => setGitHandoff(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600"
              />
              <div>
                <span className="font-bold text-white block">Private Git Handoff</span>
                <span className="text-[10px] text-purple-300/80">GitHub/GitLab milestone commits</span>
              </div>
            </label>
          </div>

          {/* Live Simulated Console Execution Preview */}
          <div className="bg-black rounded-xl border border-purple-500/30 p-3 font-mono text-[11px] text-purple-200 space-y-1">
            <div className="text-purple-400 font-bold"># Live Reproducibility Telemetry</div>
            <div className="text-white/60">$ python train_benchmark.py --framework {framework} --seed 42</div>
            <div className="text-blue-300">◆ Random seeds locked. Deterministic validation: PASSED</div>
            <div className="text-white">◆ IEEE/Scopus formatting scan: 0 errors detected</div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Link
            href={`/quote?service=MODEL&framework=${encodeURIComponent(framework)}`}
            className="btn-primary-glow !py-2.5 text-xs font-bold"
          >
            Request Implementation Quote ({framework}) →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── 6. Academic Translation Audit Trail Modal ──────────────────────────── */
export function TranslationAuditModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0A0414] text-white rounded-3xl border border-purple-500/50 shadow-2xl p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-20 cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-400/50 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <AuditTrailIcon className="w-9 h-9" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mb-1">
            Vernacular Fieldwork Translation Audit Trail
          </h3>
          <p className="text-xs text-purple-300 font-semibold font-mono">
            Preserving Ethnographic Authenticity with 0% Plagiarism &amp; Standardized Citation
          </p>
        </div>

        <div className="space-y-4 text-left text-xs mb-6">
          <div className="bg-black/60 border border-purple-500/30 rounded-2xl p-4">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1 font-mono">
              Step 1: Raw Rural Sociological Fieldwork (Devanagari Hindi)
            </span>
            <p className="font-serif italic text-purple-100">
              &ldquo;गाँव की महिलाओं के अनुसार, स्वयं सहायता समूहों से जुड़ने के बाद उनके सामाजिक निर्णयों में भागीदारी बढ़ी है, यद्यपि ऋण अदायगी का दबाव भी बना रहता है।&rdquo;
            </p>
          </div>

          <div className="bg-black/60 border border-purple-500/30 rounded-2xl p-4">
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-1 font-mono">
              Step 2: Editorial Normalization &amp; Sociological Contextualization
            </span>
            <p className="text-purple-200">
              Identifies nuanced vernacular idioms (e.g., intra-household bargaining, collective microcredit liabilities) rather than machine-translating literally.
            </p>
          </div>

          <div className="bg-purple-950/60 border border-purple-500/50 rounded-2xl p-4">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider block mb-1 font-mono">
              Step 3: Elsevier / Springer-Grade International Scholarly English
            </span>
            <p className="font-serif text-white font-medium">
              &ldquo;Ethnographic interviews revealed that participation in Self-Help Groups (SHGs) significantly reinforced female agency in intra-household decision-making, while concurrently introducing institutional pressures surrounding microcredit repayment cycles.&rdquo;
            </p>
            <div className="mt-2 pt-2 border-t border-purple-500/30 flex items-center justify-between text-[11px] text-purple-200 font-mono">
              <span>Similarity Index: 0%</span>
              <span>• Scopus Citation Format Preserved</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="btn-primary-glow !py-2.5 !px-8 text-xs font-bold"
          >
            Close Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 7. Milestone-Based Payment Schedule Breakdown Widget ───────────────── */
export function MilestonePaymentTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(1);

  const MILESTONES = [
    {
      step: 1,
      pct: '25%',
      title: 'Synopsis & Problem Formulation',
      desc: 'Formulation of research questions, objectives, theoretical framework, and committee-ready proposal.',
      payable: 'Payable only upon registration approval',
    },
    {
      step: 2,
      pct: '25%',
      title: 'Literature Review & Bibliometrics',
      desc: 'Systematic review of 50–100 Scopus/IEEE papers, identifying research gaps and conceptual models.',
      payable: 'Payable upon chapter review',
    },
    {
      step: 3,
      pct: '25%',
      title: 'Methodology & Experimental Analysis',
      desc: 'Data analysis, statistical testing (SPSS/R) or computational implementation (PyTorch/MATLAB).',
      payable: 'Payable upon reproducible output sign-off',
    },
    {
      step: 4,
      pct: '25%',
      title: 'Originality Audit & Final Defense',
      desc: 'Turnitin < 10% clearance, defense presentation deck, and full institutional formatting.',
      payable: 'Final tranche upon institutional clearance',
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#0A0414] text-black dark:text-white rounded-3xl border border-purple-200 dark:border-purple-500/40 p-6 sm:p-8 relative overflow-hidden shadow-sm dark:shadow-[0_0_35px_rgba(168,85,247,0.2)]">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-purple-200 dark:border-purple-500/40 font-mono">
          <span>ZERO 100% UPFRONT RISK</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 text-black dark:text-white">
          Milestone-Based Chapter Payment Schedule
        </h3>
        <p className="text-purple-900/70 dark:text-purple-200/80 text-xs sm:text-sm">
          Pay strictly chapter-by-chapter as each deliverable is reviewed and validated by your supervisor.
        </p>
      </div>

      {/* 4 Interactive Milestone Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {MILESTONES.map((m) => (
          <div
            key={m.step}
            onClick={() => setSelectedMilestone(m.step)}
            className={`p-5 rounded-2xl cursor-pointer transition-all border text-left flex flex-col justify-between ${
              selectedMilestone === m.step
                ? 'bg-purple-50 dark:bg-gradient-to-b dark:from-purple-950/80 dark:to-purple-900/30 border-purple-500 shadow-md scale-[1.02]'
                : 'bg-white dark:bg-black/60 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-500/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-sm font-mono shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  {m.step}
                </span>
                <span className="font-serif text-lg font-bold text-purple-600 dark:text-purple-300">
                  {m.pct}
                </span>
              </div>
              <h4 className="font-serif font-bold text-sm text-black dark:text-white mb-2">
                {m.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-purple-200/70 leading-relaxed mb-4">
                {m.desc}
              </p>
            </div>
            <div className="text-[10px] text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider pt-2 border-t border-purple-100 dark:border-purple-900/40 font-mono">
              {m.payable}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-purple-200/80 pt-2 border-t border-purple-100 dark:border-purple-900/40 font-mono">
        <span className="flex items-center gap-1.5">
          <UpiShieldIcon className="w-4 h-4" />
          <span>Local UPI (GPay, PhonePe, Paytm, BHIM) Accepted</span>
        </span>
        <span>•</span>
        <span>No Hidden Gateway Surcharges</span>
        <span>•</span>
        <span>100% Tax Invoiced</span>
      </div>
    </div>
  );
}
