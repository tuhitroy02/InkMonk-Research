'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  AuditTrailIcon,
  TerminalLogIcon,
  CalendarScheduleIcon,
  NdaShieldIcon,
  UpiShieldIcon,
} from '@/components/RealIcons';

import {
  ResearchPaperRealWork,
  HindiPaperRealWork,
  TurnitinReportRealWork,
} from '@/components/RealWorkImages';

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
    <div className="min-h-screen bg-[#F9F7F4] py-16 px-4 text-center" style={{ fontFamily: '"Cavolini", "Cavolini Condensed", sans-serif' }}>
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

        {/* 3 Main Pillars with Real Work Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* English Services Card */}
          <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-[#1A2B6D] text-center relative">
            <div className="absolute -top-3.5 right-6 bg-[#1A2B6D] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              English Specialists
            </div>
            <div>
              <ResearchPaperRealWork className="w-full h-44 mb-4" />
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">English Services</h2>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed text-center">
                Comprehensive support for international journals, doctoral dissertations, and technical documentation formatted to IEEE, Springer, and Elsevier standards.
              </p>
              <div className="max-w-xs mx-auto mb-6">
                <ul className="space-y-2 text-xs text-slate-700 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Research &amp; Review Papers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Thesis Writing (With / Without Model)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Book Writing (100, 200, 300 pages)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Articles &amp; Presentations
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/quote?lang=EN" className="btn-primary-glow text-xs w-full text-center">
              Request English Quote →
            </Link>
          </div>

          {/* Hindi Services Card */}
          <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-orange-500 text-center relative">
            <div className="absolute -top-3.5 right-6 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              Hindi Specialists
            </div>
            <div>
              <HindiPaperRealWork className="w-full h-44 mb-4" />
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Hindi Services</h2>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed text-center">
                Dedicated Hindi academic division led by Sampreeti Mukherjee ensuring authentic scholarly vocabulary, correct Devanagari grammar, and zero automated translation flags.
              </p>
              <div className="max-w-xs mx-auto mb-4">
                <ul className="space-y-2 text-xs text-slate-700 text-left">
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
                    <span className="text-orange-500 font-bold">✓</span> Devanagari Presentations
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
            <Link href="/quote?lang=HI" className="btn-primary-glow text-xs w-full text-center">
              Request Hindi Quote →
            </Link>
          </div>

          {/* Turnitin Card */}
          <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-emerald-600 text-center relative">
            <div className="absolute -top-3.5 right-6 bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              Verified Originality
            </div>
            <div>
              <TurnitinReportRealWork className="w-full h-44 mb-4" />
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-1 text-center">Turnitin Reports</h2>
              <p className="text-slate-600 text-xs mb-3 leading-relaxed text-center">
                Verified instructor-grade Turnitin check with complete AI percentage detection and highlighted originality breakdown without repository retention.
              </p>
              <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-200 mb-3 text-center">
                <span className="text-[10px] text-orange-600 font-semibold block uppercase">Fixed Flat Fee</span>
                <span className="font-serif text-2xl font-bold text-[#0A1128]">₹200</span>
                <span className="text-[10px] text-slate-500 block">per scanned file • 15–30 min delivery</span>
              </div>

              <button
                onClick={() => setSampleModalOpen(true)}
                className="text-xs text-slate-600 hover:text-orange-600 font-bold underline mb-3 block cursor-pointer"
              >
                View Watermarked Sample Deliverable →
              </button>
            </div>
            <button
              onClick={() => setTurnitinModalOpen(true)}
              className="btn-primary-glow text-xs w-full text-center cursor-pointer"
            >
              Upload &amp; Pay ₹200 via UPI →
            </button>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center flex flex-wrap justify-center gap-4">
          <Link href="/quote" className="btn-primary-glow text-sm px-8 py-3.5 shadow-xl">
            Start Your Custom Quotation →
          </Link>
          <button
            onClick={() => setSchedulerModalOpen(true)}
            className="btn-secondary-dark !text-slate-800 !border-slate-300 hover:!bg-slate-100 cursor-pointer text-xs"
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
