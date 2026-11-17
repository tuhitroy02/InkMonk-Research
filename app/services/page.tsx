'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  AuditTrailIcon,
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

import { Interactive3DCard } from '@/components/FuturisticScrollExperience';

export default function ServicesPage() {
  const [turnitinModalOpen, setTurnitinModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [scopeBuilderOpen, setScopeBuilderOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] py-20 px-4 text-center selection:bg-cyan-500 selection:text-black" style={{ fontFamily: '"Cavolini", "Cavolini Condensed", sans-serif' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3 font-mono">ACADEMIC EXCELLENCE &amp; COPE ETHICS</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            Our Research &amp; Writing Services
          </h1>
          <p className="text-slate-400 text-base sm:text-lg text-center font-medium">
            Rigorously formatted, 0% AI, and plagiarism-free academic scholarship in both <strong className="text-white">English</strong> and <strong className="text-white">Hindi</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <UpiShieldIcon className="w-4 h-4 text-cyan-400" />
              <span>Instant UPI Accepted</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <NdaShieldIcon className="w-4 h-4 text-emerald-400" />
              <span>100% IP &amp; NDA Assignment</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-300">Chapter-by-Chapter Milestone Escrow</span>
          </div>
        </div>

        {/* 3 Main Pillars with Real Work Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* English Services Card */}
          <Interactive3DCard glowColor="cyan">
            <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-cyan-500 text-center relative h-full">
              <div className="absolute top-4 right-4 bg-cyan-950 text-cyan-300 border border-cyan-400/40 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md font-mono">
                English Specialists
              </div>
              <div>
                <ResearchPaperRealWork className="w-full h-44 mb-4" />
                <h2 className="font-serif text-2xl font-bold text-white mb-1 text-center">English Services</h2>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed text-center">
                  Comprehensive support for international journals, doctoral dissertations, and technical documentation formatted to IEEE, Springer, and Elsevier standards.
                </p>
                <div className="max-w-xs mx-auto mb-6">
                  <ul className="space-y-2 text-xs text-slate-300 text-left">
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> Research &amp; Review Papers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> Thesis Writing (With / Without Model)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> Book Writing (100, 200, 300 pages)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> Articles &amp; Presentations
                    </li>
                  </ul>
                </div>
              </div>
              <Link href="/quote?lang=EN" className="btn-primary-glow text-xs w-full text-center font-mono">
                Request English Quote →
              </Link>
            </div>
          </Interactive3DCard>

          {/* Hindi Services Card */}
          <Interactive3DCard glowColor="emerald">
            <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-emerald-500 text-center relative h-full">
              <div className="absolute top-4 right-4 bg-emerald-950 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md font-mono">
                Hindi Specialists
              </div>
              <div>
                <HindiPaperRealWork className="w-full h-44 mb-4" />
                <h2 className="font-serif text-2xl font-bold text-white mb-1 text-center">Hindi Services</h2>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed text-center">
                  Dedicated Hindi academic division led by Sampreeti Mukherjee ensuring authentic scholarly vocabulary, correct Devanagari grammar, and zero automated translation flags.
                </p>
                <div className="max-w-xs mx-auto mb-4">
                  <ul className="space-y-2 text-xs text-slate-300 text-left">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> Shodh Patra / Hindi Research Papers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> Shodh Prabandh / Hindi Thesis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> Hindi Book Writing (100–300 pages)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> Devanagari Presentations
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setAuditModalOpen(true)}
                  className="text-xs text-emerald-400 font-bold hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
                >
                  <AuditTrailIcon className="w-4 h-4" />
                  <span>View Vernacular Translation Audit Trail →</span>
                </button>
              </div>
              <Link href="/quote?lang=HI" className="btn-primary-glow text-xs w-full text-center font-mono">
                Request Hindi Quote →
              </Link>
            </div>
          </Interactive3DCard>

          {/* Turnitin Card */}
          <Interactive3DCard glowColor="cyan">
            <div className="card-futuristic-3d p-6 flex flex-col justify-between border-t-4 border-t-teal-400 text-center relative h-full">
              <div className="absolute top-4 right-4 bg-teal-950 text-teal-300 border border-teal-400/40 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md font-mono">
                Verified Originality
              </div>
              <div>
                <TurnitinReportRealWork className="w-full h-44 mb-4" />
                <h2 className="font-serif text-2xl font-bold text-white mb-1 text-center">Turnitin Reports</h2>
                <p className="text-slate-400 text-xs mb-3 leading-relaxed text-center">
                  Verified instructor-grade Turnitin check with complete AI percentage detection and highlighted originality breakdown without repository retention.
                </p>
                <div className="p-3 bg-[#060B18] rounded-xl border border-cyan-500/30 mb-3 text-center">
                  <span className="text-[10px] text-cyan-300 font-semibold block uppercase font-mono">Fixed Flat Fee</span>
                  <span className="font-serif text-2xl font-bold text-white">₹200</span>
                  <span className="text-[10px] text-slate-400 block">per scanned file • 15–30 min delivery</span>
                </div>

                <button
                  onClick={() => setSampleModalOpen(true)}
                  className="text-xs text-cyan-300 hover:text-white font-bold underline mb-3 block cursor-pointer"
                >
                  View Watermarked Sample Deliverable →
                </button>
              </div>
              <button
                onClick={() => setTurnitinModalOpen(true)}
                className="btn-primary-glow text-xs w-full text-center cursor-pointer font-mono"
              >
                Upload &amp; Pay ₹200 via UPI →
              </button>
            </div>
          </Interactive3DCard>

        </div>

        {/* CTA */}
        <div className="text-center flex flex-wrap justify-center gap-4">
          <Link href="/quote" className="btn-primary-glow text-sm px-8 py-3.5 shadow-xl font-mono">
            Start Your Custom Quotation →
          </Link>
          <button
            onClick={() => setSchedulerModalOpen(true)}
            className="btn-secondary-dark cursor-pointer text-xs"
          >
            <CalendarScheduleIcon className="w-4 h-4 text-cyan-400" />
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
