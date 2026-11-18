'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroClaymorphic from '@/components/HeroClaymorphic';
import FloatingLiveHelp from '@/components/FloatingLiveHelp';
import InkMonkCinematicCore from '@/components/InkMonkCinematicCore';
import {
  ScrollProgressLaser,
  CyberCircuitSpine,
  Interactive3DCard,
  CyberParticleField,
  ScrollReveal3D,
  Scroll3DParallaxSection,
  FloatingScrollBadge,
} from '@/components/FuturisticScrollExperience';

import HorizontalHowItWorks from '@/components/HorizontalHowItWorks';
import ResearchAreasSection from '@/components/ResearchAreasSection';
import FaqSection from '@/components/FaqSection';

import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  OfficialTurnitinLogo,
  AcademicLabCrestLogo,
  UpiShieldIcon,
  GoogleScholarRealIcon,
  IeeeXploreRealIcon,
  GitHubRealIcon,
  NdaShieldIcon,
  TerminalLogIcon,
  AuditTrailIcon,
  CalendarScheduleIcon,
  LocationRealIcon,
  WhatsAppRealIcon,
  EmailRealIcon,
} from '@/components/RealIcons';

import {
  InstantTurnitinModal,
  TurnitinSampleModal,
  FormalNdaModal,
  ConsultationSchedulerModal,
  ModelCodeScopeBuilderModal,
  TranslationAuditModal,
  MilestonePaymentTimeline,
} from '@/components/FuturisticInteractions';

const SERVICES = [
  {
    image: '/services/research-paper.jpg',
    title: 'Research Paper Writing',
    desc: 'IEEE, Springer, Elsevier standard manuscripts with structured methodology, empirical experiments, and citations in English & Hindi.',
    href: '/quote?service=RESEARCH_PAPER',
    badge: 'IEEE / Springer / Elsevier',
  },
  {
    image: '/services/thesis-dissertation.jpg',
    title: 'Thesis & Dissertation',
    desc: 'Master and Doctoral thesis drafting from literature review to conclusion, with optional computational model implementation.',
    href: '/quote?service=THESIS',
    badge: 'Milestone Escrow',
  },
  {
    image: '/services/book-monograph.jpg',
    title: 'Book Writing (100–300 Pages)',
    desc: 'Full-length scholarly book manuscripts, edited volumes, monographs, and book chapters formatted for ISBN publication.',
    href: '/quote?service=BOOK',
    badge: 'ISBN Standard',
  },
  {
    image: '/services/review-paper.jpg',
    title: 'Review Papers',
    desc: 'Systematic literature reviews and bibliometric surveys mapping state-of-the-art developments across your discipline.',
    href: '/quote?service=REVIEW_PAPER',
    badge: 'PRISMA Guidelines',
  },
  {
    image: '/services/article-writing.jpg',
    title: 'Article Writing',
    desc: 'Expertly researched academic, journal, and thought leadership articles with verified word counts and full citation rigor.',
    href: '/quote?service=ARTICLE',
    badge: 'Standardized Rates in Quote',
  },
  {
    image: '/services/academic-presentation.jpg',
    title: 'Academic PPT & Defense',
    desc: 'Engaging, professional thesis defense and conference presentation slide decks formatted for university evaluation panels.',
    href: '/quote?service=PPT',
    badge: 'Defense Ready',
  },
  {
    image: '/services/computational-model.jpg',
    title: 'Model & Code Implementation',
    desc: 'Machine learning, deep learning (PyTorch, TensorFlow), Python, and MATLAB code implementation with reproducible benchmarks.',
    href: '/quote?service=MODEL',
    badge: 'Docker & Git Handoff',
    isCode: true,
  },
  {
    image: '/services/synopsis-proposal.jpg',
    title: 'Synopsis & Research Proposals',
    desc: 'Crisp, defensible research synopses for PhD registrations, grant applications, and institutional doctoral committees.',
    href: '/quote?service=SYNOPSIS',
    badge: 'DRC Committee Ready',
  },
  {
    image: '/services/turnitin-report.jpg',
    title: 'Turnitin AI & Plagiarism Reports',
    price: '₹200 per file flat',
    desc: 'Instructor-tier Turnitin verification audits checking similarity index and AI writing percentages without saving to repository.',
    href: '/quote?type=TURNITIN',
    badge: 'Safe Non-Repository',
    isTurnitin: true,
  },
];

export default function HomePage() {
  const [turnitinModalOpen, setTurnitinModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [scopeBuilderOpen, setScopeBuilderOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-center bg-white dark:bg-[#000000] text-black dark:text-white relative transition-colors duration-300 selection:bg-purple-600 selection:text-white">

      {/* ─── Fixed Top Laser Scroll Progress Scanner & HUD ─────────────── */}
      <ScrollProgressLaser />

      {/* ─── Exact Claymorphic 3D Hero Section from Mockup ───────────── */}
      <HeroClaymorphic />

      {/* ─── 3 Primary Pillars (English, Hindi & Turnitin) in 3D Clay Cards ─── */}
      <section className="py-20 px-4 bg-notebook-grid text-center relative" id="services">
        <Scroll3DParallaxSection offsetY={40}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
                CORE DISCIPLINES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 text-center">
                Comprehensive Scholarly Solutions
              </h2>
              <p className="text-slate-600 text-base sm:text-lg text-center font-medium max-w-2xl mx-auto">
                Tailored specifically to international publishing guidelines, doctoral requirements, and institutional rubrics with zero stress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* English Card */}
              <div className="card-clay-white p-7 flex flex-col justify-between text-center relative h-full">
                <span className="absolute top-4 right-4 bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                  English Specialists
                </span>
                <div>
                  <Image
                    src="/services/research-paper.jpg"
                    alt="English Services"
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover rounded-2xl mb-4 border-2 border-slate-200/80 shadow-sm"
                  />
                  <h3 className="font-serif text-2xl font-black text-slate-900 mb-1 text-center">English Services</h3>
                  <p className="text-slate-600 text-xs mb-4 text-center font-medium">
                    Technical and non-technical manuscripts formatted to IEEE, Springer, Elsevier, APA, Harvard, and UGC standards.
                  </p>
                  <div className="max-w-xs mx-auto mb-6">
                    <ul className="space-y-2 text-xs text-slate-700 font-bold text-center">
                      <li className="flex items-center justify-center gap-2">
                        <span className="text-[#F95721] font-black">✦</span> Research &amp; Review Papers
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="text-[#F95721] font-black">✦</span> Master &amp; Doctoral Theses (with/without model)
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="text-[#F95721] font-black">✦</span> Scholarly Books (100–300 pages)
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="text-[#F95721] font-black">✦</span> Journal Articles &amp; Conference Slides
                      </li>
                    </ul>
                  </div>
                </div>
                <Link href="/quote?lang=EN" className="btn-clay-orange text-xs w-full text-center">
                  Configure English Quote →
                </Link>
              </div>

              {/* Hindi Card */}
              <div className="card-clay-white p-7 flex flex-col justify-between text-center relative h-full">
                <span className="absolute top-4 right-4 bg-orange-50 text-orange-800 border border-orange-200 text-[11px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                  Hindi Specialists
                </span>
                <div>
                  <Image
                    src="/research-areas/hindi-sahitya.jpg"
                    alt="Hindi Services"
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover rounded-2xl mb-4 border-2 border-slate-200/80 shadow-sm"
                  />
                  <h3 className="font-serif text-2xl font-black text-slate-900 mb-1 text-center">Hindi Services</h3>
                  <p className="text-slate-600 text-xs mb-4 text-center font-medium">
                    Supervised by Sampreeti Mukherjee with standardized academic vocabulary, Shodhganga compliance, and zero automated translation shortcuts.
                  </p>
                  <div className="max-w-xs mx-auto mb-4">
                    <ul className="space-y-2 text-xs text-slate-700 font-bold text-center">
                      <li className="flex items-center justify-center gap-2">
                        <span className="text-[#F95721] font-black">✦</span> शोध पत्र / Research Papers
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="text-[#F95721] font-black">✦</span> शोध प्रबंध / Complete Thesis
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="text-[#F95721] font-black">✦</span> पुस्तक लेखन (100–300 पृष्ठ)
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <span className="text-[#F95721] font-black">✦</span> देवनागरी व्याख्यान एवं प्रस्तुतियाँ
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setAuditModalOpen(true)}
                    className="text-xs text-[#2563EB] font-bold hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <AuditTrailIcon className="w-4 h-4" />
                    <span>View Vernacular Translation Audit Trail →</span>
                  </button>
                </div>
                <Link href="/quote?lang=HI" className="btn-clay-orange text-xs w-full text-center">
                  Configure Hindi Quote →
                </Link>
              </div>

              {/* Turnitin Card */}
              <div className="card-clay-white p-7 flex flex-col justify-between text-center relative h-full">
                <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                  Verified Originality
                </span>
                <div>
                  <Image
                    src="/services/turnitin-report.jpg"
                    alt="Turnitin Reports"
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover rounded-2xl mb-4 border-2 border-slate-200/80 shadow-sm"
                  />
                  <h3 className="font-serif text-2xl font-black text-slate-900 mb-1 text-center">Turnitin Reports</h3>
                  <p className="text-slate-600 text-xs mb-3 text-center font-medium">
                    Instructor-grade originality and AI writing detection report without saving your file to public repositories.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-2xl border-2 border-slate-200 mb-4 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Fixed Flat Fee</div>
                    <div className="font-serif text-3xl font-black text-slate-900">₹200</div>
                    <div className="text-[10px] text-slate-500 font-medium">per file scanned • 15–30 min delivery • Direct UPI Accepted</div>
                  </div>

                  <button
                    onClick={() => setSampleModalOpen(true)}
                    className="text-xs text-[#2563EB] hover:underline font-bold mb-3 block cursor-pointer"
                  >
                    View Watermarked Sample Deliverable →
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setTurnitinModalOpen(true)}
                    className="btn-clay-orange text-xs w-full text-center cursor-pointer"
                  >
                    Upload &amp; Pay ₹200 via UPI →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Scroll3DParallaxSection>
      </section>

      {/* ─── Milestone Payment Timeline Section ───────────────────────────── */}
      <section className="py-16 px-4 bg-notebook-grid text-center border-y-2 border-slate-200">
        <ScrollReveal3D>
          <div className="max-w-6xl mx-auto">
            <MilestonePaymentTimeline />
          </div>
        </ScrollReveal3D>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── 9-Service Grid with REAL IMAGES & 3D CLAY CARDS ───────────── */}
      <section className="py-20 px-4 bg-notebook-grid text-center">
        <Scroll3DParallaxSection offsetY={30}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-blue-100 text-[#2563EB] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-blue-200">
                GENUINE DELIVERABLE PREVIEWS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 text-center">
                Explore Our Specific Capabilities
              </h2>
              <p className="text-slate-600 text-base sm:text-lg text-center font-medium max-w-xl mx-auto">
                Real sample previews of our manuscripts, models, presentations, and reports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <div key={s.title} className="card-clay-white p-6 flex flex-col justify-between text-center items-center group relative h-full">
                  <span className="text-[10px] font-black text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3 shadow-sm">
                    {s.badge}
                  </span>

                  {/* Real Image of the Deliverable */}
                  <div className="w-full transform group-hover:scale-[1.02] transition-transform duration-300">
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={400}
                      height={200}
                      className="w-full h-44 object-cover rounded-2xl mb-4 border-2 border-slate-200/80 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col items-center text-center w-full">
                    <h3 className="font-serif font-black text-xl text-slate-900 group-hover:text-[#F95721] transition-colors mb-1 text-center">
                      {s.title}
                    </h3>
                    {s.price && (
                      <div className="text-sm font-black text-[#F95721] mb-1">
                        {s.price}
                      </div>
                    )}
                    <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4 text-center">
                      {s.desc}
                    </p>
                  </div>

                  <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between">
                    {s.isCode ? (
                      <button
                        onClick={() => setScopeBuilderOpen(true)}
                        className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <TerminalLogIcon className="w-3.5 h-3.5" />
                        <span>Scope Builder →</span>
                      </button>
                    ) : s.isTurnitin ? (
                      <button
                        onClick={() => setTurnitinModalOpen(true)}
                        className="text-xs font-bold text-[#F95721] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Instant Scan (₹200) →</span>
                      </button>
                    ) : (
                      <Link
                        href={s.href}
                        className="text-xs font-bold text-[#F95721] hover:underline flex items-center gap-1"
                      >
                        <span>Get Instant Quote →</span>
                      </Link>
                    )}
                    <span className="text-[10px] font-bold text-slate-400">Server Calculated</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Scroll3DParallaxSection>
      </section>

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── RESEARCH AREAS SUPPORTED (AFTER SERVICES AS REQUESTED) ──────── */}
      <ResearchAreasSection />

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── HORIZONTAL HOW IT WORKS PIPELINE (HORIZONTAL NOT VERTICAL) ─── */}
      <HorizontalHowItWorks />

      {/* Cyber Circuit Spine */}
      <CyberCircuitSpine />

      {/* ─── Founders & Verifiable Doctoral Leadership Section ─────────────── */}
      <section className="py-20 px-4 bg-notebook-grid text-center" id="about">
        <Scroll3DParallaxSection offsetY={25}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
                ACADEMIC DIRECTORATE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 text-center">
                Led by Dedicated Scholars
              </h2>
              <p className="text-slate-600 text-base text-center font-medium">
                Every project is directly overseen by our directors with verifiable academic publishing records.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tuhit Roy */}
              <div className="card-clay-white p-8 text-center flex flex-col items-center justify-between h-full">
                <div>
                  <div className="w-20 h-20 rounded-full bg-orange-50 text-[#F95721] font-serif font-black text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-orange-200 shadow-md">
                    TR
                  </div>
                  <h3 className="font-serif text-2xl font-black text-slate-900 text-center">Tuhit Roy</h3>
                  <p className="text-[#F95721] font-black text-xs uppercase tracking-wider mb-3 text-center">
                    Founder &amp; Research Director
                  </p>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed text-center mb-6">
                    Directs technical research methodologies, AI/ML computational architectures (PyTorch/CUDA), and IEEE/Scopus manuscript structuring.
                  </p>
                </div>

                {/* Verifiable Scholar Badges */}
                <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
                  <a
                    href="https://scholar.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#F95721] font-bold transition-colors"
                  >
                    <GoogleScholarRealIcon className="w-4 h-4" />
                    <span>Scholar</span>
                  </a>
                  <a
                    href="https://ieeexplore.ieee.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#2563EB] font-bold transition-colors"
                  >
                    <IeeeXploreRealIcon className="w-4 h-4" />
                    <span>IEEE</span>
                  </a>
                  <a
                    href="https://github.com/tuhitroy02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-black font-bold transition-colors"
                  >
                    <GitHubRealIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Sampreeti Mukherjee */}
              <div className="card-clay-white p-8 text-center flex flex-col items-center justify-between h-full">
                <div>
                  <div className="w-20 h-20 rounded-full bg-blue-50 text-[#2563EB] font-serif font-black text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-blue-200 shadow-md">
                    SM
                  </div>
                  <h3 className="font-serif text-2xl font-black text-slate-900 text-center">Sampreeti Mukherjee</h3>
                  <p className="text-[#2563EB] font-black text-xs uppercase tracking-wider mb-3 text-center">
                    Co-Founder &amp; Editorial Director
                  </p>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed text-center mb-6">
                    Leads qualitative editorial refinement, humanities peer-review consultations, and our specialized Hindi research and dissertation division.
                  </p>
                </div>

                {/* Editorial Badges */}
                <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-700 font-bold">
                  <span className="flex items-center gap-1">
                    <span className="text-[#2563EB] font-bold">◆</span>
                    <span>UGC-CARE Standards</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#F95721] font-bold">◆</span>
                    <span>Comparative Literature</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Scroll3DParallaxSection>
      </section>

      {/* ─── Office & Contact Section ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white text-slate-900 text-center relative overflow-hidden border-t-2 border-slate-200" id="contact">
        <ScrollReveal3D>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
                <LocationRealIcon className="w-4 h-4 text-[#F95721]" />
                <span className="text-xs font-black text-[#F95721] uppercase tracking-widest">
                  Physical Presence in Kolkata
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-center text-slate-900">
                Karunamoyee, Salt Lake Sector 2
              </h3>
              <p className="text-slate-600 text-base max-w-lg mx-auto text-center font-medium">
                Serving researchers across all Indian universities and international institutions. In-person visits by appointment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="card-clay-white p-6 flex flex-col items-center text-center">
                <LocationRealIcon className="w-10 h-10 mb-3 text-[#F95721]" />
                <div className="text-sm font-black text-slate-900 mb-1">Our Location</div>
                <div className="text-xs text-slate-600 font-medium">Sector 2, Salt Lake City, Kolkata 700091</div>
              </div>
              <div className="card-clay-white p-6 flex flex-col items-center text-center">
                <WhatsAppRealIcon className="w-10 h-10 mb-3" />
                <div className="text-sm font-black text-slate-900 mb-1">WhatsApp Chat</div>
                <div className="text-xs text-[#2563EB] font-black">+91 7980470880</div>
              </div>
              <div className="card-clay-white p-6 flex flex-col items-center text-center">
                <EmailRealIcon className="w-10 h-10 mb-3 text-[#F95721]" />
                <div className="text-sm font-black text-slate-900 mb-1">Email Support</div>
                <div className="text-xs text-[#2563EB] font-black">inkmonkresearch@gmail.com</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a
                href="https://wa.me/917980470880"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clay-orange text-xs uppercase"
              >
                <WhatsAppRealIcon className="w-5 h-5" />
                <span>Direct WhatsApp: +91 7980470880</span>
              </a>
              <Link href="/contact" className="btn-clay-white text-xs uppercase">
                Send an Academic Inquiry →
              </Link>
            </div>

            {/* ─── Merged FAQ at the end of Contact Section ── */}
            <div className="w-full mt-16 pt-16 border-t-2 border-slate-200">
              <FaqSection />
            </div>

          </div>
        </ScrollReveal3D>
      </section>

      {/* ─── Floating Live Help Pill Widget from Mockup ─────────────────── */}
      <FloatingLiveHelp />

      {/* ─── Interactive Modals ─────────────────────────────────────────── */}
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
