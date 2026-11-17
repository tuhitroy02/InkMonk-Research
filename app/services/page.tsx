'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  ResearchPaperRealIcon,
  ThesisRealIcon,
  BookRealIcon,
  CodeModelRealIcon,
  PresentationRealIcon,
  AuditTrailIcon,
  TerminalLogIcon,
  CalendarScheduleIcon,
  NdaShieldIcon,
  UpiShieldIcon,
} from '@/components/RealIcons';

import {
  InstantTurnitinModal,
  TurnitinSampleModal,
  FormalNdaModal,
  ConsultationSchedulerModal,
  ModelCodeScopeBuilderModal,
  TranslationAuditModal,
} from '@/components/FuturisticInteractions';

export default function ServicesPage() {
  const [turnitinModalOpen, setTurnitinModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [scopeBuilderOpen, setScopeBuilderOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F7F4] py-16 px-4 text-center">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3">Academic Excellence &amp; COPE Ethics</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0A1128] mb-4 text-center">
            Our Research &amp; Writing Services
          </h1>
          <p className="text-slate-600 text-base sm:text-lg text-center font-medium">
            Rigorously formatted, 0% AI, and plagiarism-free academic scholarship in both <strong>English</strong> and <strong>Hindi</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              <UpiShieldIcon className="w-4 h-4" />
              <span>Instant UPI Accepted</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <NdaShieldIcon className="w-4 h-4" />
              <span>100% IP &amp; NDA Assignment</span>
            </span>
            <span>•</span>
            <span>Chapter-by-Chapter Milestone Escrow</span>
          </div>
        </div>

        {/* 3 Main Pillars (English Specialists & Hindi Specialists) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* English Services Card */}
          <div className="card-futuristic-3d p-8 flex flex-col justify-between border-t-4 border-t-[#1A2B6D] text-center relative">
            <div className="absolute -top-3.5 right-6 bg-[#1A2B6D] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              English Specialists
            </div>
            <div>
              <div className="flex justify-center mb-5">
                <UkFlagLogo className="w-16 h-16" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">English Services</h2>
              <div className="text-xs font-bold text-orange-600 mb-3">From ₹3,500 (Papers) • 4-Milestone Escrow</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed text-center">
                Comprehensive support for international journals, doctoral dissertations, and technical documentation formatted to IEEE, Springer, and Elsevier standards.
              </p>
              <div className="max-w-xs mx-auto mb-8">
                <ul className="space-y-3 text-sm text-slate-700 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Research &amp; Review Papers (From ₹3,500)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Thesis Writing (From ₹14,999 in 4 Milestones)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Book Writing (100, 200, 300 pages)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Articles (₹0.60–0.70/word)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Academic Presentations (₹120–150/slide)
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/quote?lang=EN" className="btn-primary-glow text-sm w-full text-center">
              Request English Quote →
            </Link>
          </div>

          {/* Hindi Services Card */}
          <div className="card-futuristic-3d p-8 flex flex-col justify-between border-t-4 border-t-orange-500 text-center relative">
            <div className="absolute -top-3.5 right-6 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              Hindi Specialists
            </div>
            <div>
              <div className="flex justify-center mb-5">
                <IndiaFlagLogo className="w-16 h-16" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Hindi Services</h2>
              <div className="text-xs font-bold text-orange-600 mb-3">Authentic Devanagari Terminology</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed text-center">
                Dedicated Hindi academic division led by Sampreeti Mukherjee ensuring authentic scholarly vocabulary, correct Devanagari grammar, and zero automated translation flags.
              </p>
              <div className="max-w-xs mx-auto mb-6">
                <ul className="space-y-3 text-sm text-slate-700 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Shodh Patra / Hindi Research Papers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Shodh Prabandh / Hindi Thesis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Hindi Book Writing (100–300 pages)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Articles (₹0.75–0.80/word)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Hindi Presentations (₹150–170/slide)
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuditModalOpen(true)}
                className="text-xs text-orange-600 font-bold hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
              >
                <AuditTrailIcon className="w-4 h-4" />
                <span>View Vernacular Translation Audit Trail →</span>
              </button>
            </div>
            <Link href="/quote?lang=HI" className="btn-primary-glow text-sm w-full text-center">
              Request Hindi Quote →
            </Link>
          </div>

          {/* Turnitin Card */}
          <div className="card-futuristic-3d p-8 flex flex-col justify-between border-t-4 border-t-emerald-600 text-center relative">
            <div className="absolute -top-3.5 right-6 bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              Verified Originality
            </div>
            <div>
              <div className="flex justify-center mb-5">
                <TurnitinShieldLogo className="w-16 h-16" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Turnitin Reports</h2>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed text-center">
                Verified instructor-grade Turnitin check with complete AI percentage detection and highlighted originality breakdown without repository retention.
              </p>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 mb-4 text-center">
                <span className="text-xs text-orange-600 font-semibold block uppercase">Fixed Flat Fee</span>
                <span className="font-serif text-3xl font-bold text-[#0A1128]">₹200</span>
                <span className="text-xs text-slate-500 block">per scanned file • 15–30 min delivery</span>
              </div>
              <div className="max-w-xs mx-auto mb-4">
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Assured 0% AI Writing Score
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Assured Plagiarism &lt; 10%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Safe Non-Repository Protocol
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setSampleModalOpen(true)}
                className="text-xs text-slate-600 hover:text-orange-600 font-bold underline mb-4 block cursor-pointer"
              >
                View Watermarked Sample Deliverable →
              </button>
            </div>
            <button
              onClick={() => setTurnitinModalOpen(true)}
              className="btn-primary-glow text-sm w-full text-center cursor-pointer"
            >
              Upload &amp; Pay ₹200 via UPI →
            </button>
          </div>

        </div>

        {/* Detailed Breakdown with 3D Futuristic Steps */}
        <div className="card-futuristic-3d p-8 md:p-12 mb-16 text-center hud-corner">
          <h2 className="font-serif text-3xl font-bold text-[#0A1128] mb-8 text-center">
            Service Capabilities &amp; Formats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="step-number-futuristic shrink-0">
                  01
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Research &amp; Review Papers</h3>
                  <div className="text-xs font-bold text-orange-600">From ₹3,500</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    IEEE, Springer, Elsevier, UGC CARE, Scopus-standard structures with full methodology, reproducible citations, and zero robotic shortcuts.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="step-number-futuristic shrink-0">
                  02
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Master &amp; Doctoral Theses</h3>
                  <div className="text-xs font-bold text-orange-600">From ₹14,999 (4-Milestone Escrow)</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    End-to-end dissertation drafting. Optional hands-on Machine Learning, Deep Learning, statistical analysis, or custom web architecture model implementation.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="step-number-futuristic shrink-0">
                  03
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Book &amp; Monograph Writing</h3>
                  <div className="text-xs font-bold text-orange-600">From ₹18,000</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    Complete manuscripts structured into chapters, index, preface, and bibliography. Formatted for ISBN publication in 100, 200, or 300 page editions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="step-number-futuristic shrink-0">
                  04
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Model &amp; Code Implementation</h3>
                    <button
                      onClick={() => setScopeBuilderOpen(true)}
                      className="text-xs font-bold text-cyan-600 hover:text-cyan-800 cursor-pointer"
                    >
                      Open Scope Builder →
                    </button>
                  </div>
                  <div className="text-xs font-bold text-orange-600">From ₹4,999 (Deterministic)</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    Practical code generation and experimentation in Python (TensorFlow, PyTorch, Scikit-learn), R, or MATLAB with containerized Docker environments and private Git handoff.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="step-number-futuristic shrink-0">
                  05
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Professional Presentations (PPT)</h3>
                  <div className="text-xs font-bold text-orange-600">₹120–170 / slide</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    Clean, visually appealing conference and thesis defense slide decks designed to highlight core contributions, equations, figures, and key takeaways.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="step-number-futuristic shrink-0">
                  06
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Turnitin Plagiarism Verification</h3>
                  <div className="text-xs font-bold text-emerald-600">Flat ₹200 / file</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    Pre-submission verification to ensure complete academic integrity. Reports delivered with clear guidance on high-similarity passages under safe non-repository protocol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center flex flex-wrap justify-center gap-4">
          <Link href="/quote" className="btn-primary-glow text-base px-8 py-3.5 shadow-xl">
            Start Your Custom Quotation →
          </Link>
          <button
            onClick={() => setSchedulerModalOpen(true)}
            className="btn-secondary-dark !text-slate-800 !border-slate-300 hover:!bg-slate-100 cursor-pointer"
          >
            <CalendarScheduleIcon className="w-4 h-4 text-orange-600" />
            <span>Book 1-on-1 Expert Video Meet →</span>
          </button>
        </div>

      </div>

      {/* Interactive Modals */}
      <InstantTurnitinModal
        isOpen={turnitinModalOpen}
        onClose={() => setTurnitinModalOpen(false)}
      />

      <TurnitinSampleModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
      />

      <FormalNdaModal
        isOpen={ndaModalOpen}
        onClose={() => setNdaModalOpen(false)}
      />

      <ConsultationSchedulerModal
        isOpen={schedulerModalOpen}
        onClose={() => setSchedulerModalOpen(false)}
      />

      <ModelCodeScopeBuilderModal
        isOpen={scopeBuilderOpen}
        onClose={() => setScopeBuilderOpen(false)}
      />

      <TranslationAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

    </div>
  );
}
