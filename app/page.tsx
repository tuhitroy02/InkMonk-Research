'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroClaymorphic from '@/components/HeroClaymorphic';
import {
  ScrollProgressLaser,
  ScrollReveal3D,
  Scroll3DParallaxSection,
} from '@/components/FuturisticScrollExperience';

import {
  UpiShieldIcon,
  NdaShieldIcon,
  AuditTrailIcon,
  CalendarScheduleIcon,
} from '@/components/RealIcons';

import {
  TurnitinSampleModal,
  FormalNdaModal,
  ConsultationSchedulerModal,
  ModelCodeScopeBuilderModal,
  TranslationAuditModal,
} from '@/components/FuturisticInteractions';

export default function HomePage() {
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [scopeBuilderOpen, setScopeBuilderOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-center bg-white dark:bg-[#0A0F1D] text-slate-900 dark:text-white relative transition-colors duration-300">
      {/* ─── Laser Scroll Progress Scanner HUD ──────────────────────────── */}
      <ScrollProgressLaser />

      {/* ─── Claymorphic 3D Hero Section with Quick Estimator ───────────── */}
      <HeroClaymorphic />

      {/* ─── 3 Core Academic Divisions (English, Hindi & Turnitin) ──────── */}
      <section className="py-20 px-4 bg-notebook-grid text-center relative border-t-2 border-slate-200 dark:border-slate-800">
        <Scroll3DParallaxSection offsetY={30}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-orange-100 dark:bg-orange-950/60 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200 dark:border-orange-800">
                CORE ACADEMIC DISCIPLINES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 text-center">
                Three Distinct Pathways to Scholarly Success
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg text-center font-medium max-w-2xl mx-auto">
                Whether authoring a high-impact Scopus manuscript, conducting Shodhganga-compliant vernacular Hindi research, or verifying originality with Turnitin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 1. English Division Card */}
              <div className="card-clay-white p-7 flex flex-col justify-between text-center relative h-full group hover:-translate-y-1 transition-transform">
                <span className="absolute top-4 right-4 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                  ENGLISH SPECIALISTS
                </span>
                <div>
                  <Image
                    src="/services/research-paper.jpg"
                    alt="English Research Services"
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover rounded-2xl mb-4 border-2 border-slate-200/80 shadow-sm"
                  />
                  <h3 className="font-serif text-2xl font-black text-slate-900 dark:text-white mb-2 text-center group-hover:text-[#F95721] transition-colors">
                    English Services
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs mb-4 text-center font-medium leading-relaxed">
                    Technical and non-technical manuscripts formatted strictly to IEEE, Springer, Elsevier, APA, Harvard, and UGC-CARE standards.
                  </p>
                  <div className="w-full mb-6 flex flex-col items-center">
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      {[
                        'IEEE, Springer & Elsevier Papers',
                        'Master & Doctoral Theses (5 Chapters)',
                        'Scholarly Books (100–300 pp with ISBN)',
                        'Academic PPT & Thesis Defense Decks',
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="inline-flex items-center justify-center gap-1.5 bg-slate-50/90 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 px-3.5 py-1.5 rounded-full text-center text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs hover:border-[#F95721]/50 hover:bg-orange-50/40 transition-all max-w-xs"
                        >
                          <span className="text-[#F95721] text-[10px] font-black shrink-0">✦</span>
                          <span className="text-center leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href="/services#english" className="btn-clay-orange text-xs w-full text-center py-2.5">
                  Explore English Services →
                </Link>
              </div>

              {/* 2. Hindi Division Card */}
              <div className="card-clay-white p-7 flex flex-col justify-between text-center relative h-full group hover:-translate-y-1 transition-transform">
                <span className="absolute top-4 right-4 bg-orange-50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                  HINDI SPECIALISTS
                </span>
                <div>
                  <Image
                    src="/research-areas/hindi-sahitya.jpg"
                    alt="Hindi Academic Services"
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover rounded-2xl mb-4 border-2 border-slate-200/80 shadow-sm"
                  />
                  <h3 className="font-serif text-2xl font-black text-slate-900 dark:text-white mb-2 text-center group-hover:text-[#F95721] transition-colors">
                    Hindi Services
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs mb-4 text-center font-medium leading-relaxed">
                    Supervised by Sampreeti Mukherjee with standard Devanagari academic vocabulary, Shodhganga compliance, and zero automated translation shortcuts.
                  </p>
                  <div className="w-full mb-4 flex flex-col items-center">
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      {[
                        'शोध पत्र / Research Papers',
                        'शोध प्रबंध / Complete Thesis',
                        'पुस्तक लेखन (100–300 पृष्ठ)',
                        'देवनागरी व्याख्यान एवं प्रस्तुतियाँ',
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="inline-flex items-center justify-center gap-1.5 bg-slate-50/90 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 px-3.5 py-1.5 rounded-full text-center text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs hover:border-[#F95721]/50 hover:bg-orange-50/40 transition-all max-w-xs font-hindi"
                        >
                          <span className="text-[#F95721] text-[10px] font-black shrink-0">✦</span>
                          <span className="text-center leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setAuditModalOpen(true)}
                    className="text-xs text-[#2563EB] dark:text-[#60A5FA] font-bold hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <AuditTrailIcon className="w-4 h-4" />
                    <span>View Vernacular Translation Audit →</span>
                  </button>
                </div>
                <Link href="/services#hindi" className="btn-clay-orange text-xs w-full text-center py-2.5">
                  Explore Hindi Services →
                </Link>
              </div>

              {/* 3. Turnitin Division Card */}
              <div className="card-clay-white p-7 flex flex-col justify-between text-center relative h-full group hover:-translate-y-1 transition-transform">
                <span className="absolute top-4 right-4 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                  SAFE NON-REPOSITORY
                </span>
                <div>
                  <Image
                    src="/services/turnitin-report.jpg"
                    alt="Turnitin AI & Plagiarism Reports"
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover rounded-2xl mb-4 border-2 border-slate-200/80 shadow-sm"
                  />
                  <h3 className="font-serif text-2xl font-black text-slate-900 dark:text-white mb-1 text-center group-hover:text-[#F95721] transition-colors">
                    Turnitin Reports
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs mb-3 text-center font-medium leading-relaxed">
                    Instructor-tier originality and AI writing detection audits without saving your document to public repositories.
                  </p>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border-2 border-slate-200 dark:border-slate-700 mb-4 text-center">
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-wider">Zero Repository Deposit</div>
                    <div className="font-serif text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Safe Express Scan</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">100% Non-Repository • 15–30 min delivery</div>
                  </div>

                  <button
                    onClick={() => setSampleModalOpen(true)}
                    className="text-xs text-[#2563EB] dark:text-[#60A5FA] hover:underline font-bold mb-3 block cursor-pointer"
                  >
                    View Watermarked Sample Deliverable →
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href="/quote?lang=TURNITIN"
                    className="btn-clay-orange text-xs w-full text-center py-2.5 cursor-pointer"
                  >
                    Request an originality check →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Scroll3DParallaxSection>
      </section>

      {/* ─── Unique Home Section: 4 Scholarly Governance & Integrity Guarantees ─── */}
      <section className="py-20 px-4 bg-white dark:bg-[#0A0F1D] text-center border-t-2 border-slate-200 dark:border-slate-800">
        <ScrollReveal3D>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block bg-blue-100 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-blue-200 dark:border-blue-800">
                SCHOLARLY GOVERNANCE &amp; ETHICS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 text-center">
                Built Upon Uncompromising Research Integrity
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base text-center font-medium">
                Our institutional framework safeguards your intellectual property, academic reputation, and doctoral defense.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Guarantee 1 */}
              <div className="card-clay-white p-6 text-center flex flex-col items-center justify-between h-full">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#F95721] flex items-center justify-center mb-4 border border-orange-200 dark:border-orange-800 shadow-sm">
                  <NdaShieldIcon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900 dark:text-white mb-2 text-center">
                  Pre-Signed Mutual NDA
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed mb-4 text-center">
                  Your thesis drafts, empirical datasets, and ideas are legally protected under a non-disclosure agreement before any file review commences.
                </p>
                <button
                  onClick={() => setNdaModalOpen(true)}
                  className="text-xs text-[#F95721] font-bold hover:underline cursor-pointer"
                >
                  Preview NDA Terms →
                </button>
              </div>

              {/* Guarantee 2 */}
              <div className="card-clay-white p-6 text-center flex flex-col items-center justify-between h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-200 dark:border-emerald-800 shadow-sm font-black text-lg">
                  0%
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900 dark:text-white mb-2 text-center">
                  Zero-Repository Turnitin
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed mb-4 text-center">
                  Files are checked under strict instructor no-repository settings, ensuring your work is never indexed or flagged when you submit to university committees.
                </p>
                <Link
                  href="/quote?lang=TURNITIN"
                  className="text-xs text-[#2563EB] dark:text-[#60A5FA] font-bold hover:underline cursor-pointer"
                >
                  Request a non-repository check →
                </Link>
              </div>

              {/* Guarantee 3 */}
              <div className="card-clay-white p-6 text-center flex flex-col items-center justify-between h-full">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mb-4 border border-blue-200 dark:border-blue-800 shadow-sm font-serif font-black text-lg">
                  4S
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900 dark:text-white mb-2 text-center">
                  4-Stage Milestone Escrow
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed mb-4 text-center">
                  Never pay 100% upfront. Payments are divided into 4 transparent chapter milestones, released solely upon your satisfactory review of drafts.
                </p>
                <Link
                  href="/how-it-works"
                  className="text-xs text-[#2563EB] dark:text-[#60A5FA] font-bold hover:underline"
                >
                  View Milestone Flow →
                </Link>
              </div>

              {/* Guarantee 4 */}
              <div className="card-clay-white p-6 text-center flex flex-col items-center justify-between h-full">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 border border-purple-200 dark:border-purple-800 shadow-sm font-mono font-black text-sm">
                  &lt;/&gt;
                </div>
                <h3 className="font-serif font-black text-lg text-slate-900 dark:text-white mb-2 text-center">
                  Reproducible Code &amp; Artifacts
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed mb-4 text-center">
                  Computational models include fully documented PyTorch/MATLAB code, Docker containers, and Git repositories for complete defense reproducibility.
                </p>
                <button
                  onClick={() => setScopeBuilderOpen(true)}
                  className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
                >
                  Code Scope Builder →
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal3D>
      </section>

      {/* ─── Unique Home Section: Academic Impact Metric Wall ───────────── */}
      <section className="py-16 px-4 bg-notebook-grid text-center border-t-2 border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card-clay-white p-6 text-center">
              <div className="font-serif font-black text-3xl sm:text-4xl text-[#F95721] mb-1">
                1,200+
              </div>
              <div className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 mb-1">
                Scholars Mentored
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Across IITs, NITs, Central &amp; State Universities
              </div>
            </div>

            <div className="card-clay-white p-6 text-center">
              <div className="font-serif font-black text-3xl sm:text-4xl text-[#2563EB] mb-1">
                99.2%
              </div>
              <div className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 mb-1">
                Defense Approval
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Passed DRC, RAC and doctoral viva voce reviews
              </div>
            </div>

            <div className="card-clay-white p-6 text-center">
              <div className="font-serif font-black text-3xl sm:text-4xl text-emerald-600 mb-1">
                0%
              </div>
              <div className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 mb-1">
                AI Writing Guarantee
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                100% human intellectual synthesis verified on Turnitin
              </div>
            </div>

            <div className="card-clay-white p-6 text-center">
              <div className="font-serif font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-1">
                15–30m
              </div>
              <div className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 mb-1">
                Audit Turnaround
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Rapid non-repo Turnitin scanned report delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Unique Home Section: Verified Scholar Voices & Testimonials ─── */}
      <section className="py-20 px-4 bg-white dark:bg-[#0A0F1D] text-center border-t-2 border-slate-200 dark:border-slate-800">
        <ScrollReveal3D>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block bg-orange-100 dark:bg-orange-950/60 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200 dark:border-orange-800">
                SCHOLAR TESTIMONIALS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 text-center">
                Trusted by Researchers Across India &amp; Abroad
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base text-center font-medium">
                Read authentic feedback from doctoral candidates and faculty who partnered with InkMonk Research.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="card-clay-white p-7 text-center flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-center gap-1 text-[#F95721] mb-3 text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed italic mb-6 text-center">
                    &ldquo;InkMonk’s technical team refined our PyTorch architecture and IEEE Transactions manuscript formatting. The code was delivered in a clean Docker container, and our paper passed double-blind peer review with minor revisions.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                  <div className="font-serif font-black text-sm text-slate-900 dark:text-white">
                    Dr. Arindam Mukherjee
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    Postdoctoral Fellow // Computational Physics
                  </div>
                  <div className="text-[9px] text-[#2563EB] font-bold mt-0.5">
                    Scopus Q1 Accepted
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="card-clay-white p-7 text-center flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-center gap-1 text-[#F95721] mb-3 text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed italic mb-6 text-center">
                    &ldquo;सम्प्रीति मुखर्जी मैम के मार्गदर्शन में मेरे हिंदी शोध प्रबंध की भाषा, मानक पारिभाषिक शब्दावली एवं शोधगंगा प्रारूप की पूर्ण समीक्षा हुई। 0% AI और शुद्ध शोध के साथ मेरा थीसिस डिफेंस सफलतापूर्वक संपन्न हुआ।&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                  <div className="font-serif font-black text-sm text-slate-900 dark:text-white">
                    सुनीता शर्मा / Sunita Sharma
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    Ph.D. Scholar // हिंदी साहित्य (Hindi Literature)
                  </div>
                  <div className="text-[9px] text-[#2563EB] font-bold mt-0.5">
                    Shodhganga Compliant
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="card-clay-white p-7 text-center flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-center gap-1 text-[#F95721] mb-3 text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed italic mb-6 text-center">
                    &ldquo;The express Turnitin audit was a lifesaver. Within 20 minutes, I had an instructor-grade non-repo originality report that proved 0% AI writing and 6% similarity. Excellent service and zero stress.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                  <div className="font-serif font-black text-sm text-slate-900 dark:text-white">
                    Priya Rajagopalan
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    Ph.D. Candidate // Electrical &amp; Computer Engineering
                  </div>
                  <div className="text-[9px] text-[#2563EB] font-bold mt-0.5">
                    Turnitin Non-Repo Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal3D>
      </section>

      {/* ─── Bottom High-Converting Action Banner ───────────────────────── */}
      <section className="py-20 px-4 bg-notebook-grid text-center border-t-2 border-slate-200 dark:border-slate-800">
        <ScrollReveal3D>
          <div className="max-w-4xl mx-auto card-clay-white p-8 sm:p-12 text-center relative overflow-hidden">
            <span className="inline-block bg-orange-100 dark:bg-orange-950/60 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-4 shadow-sm border border-orange-200 dark:border-orange-800">
              COMMENCE YOUR SCHOLARSHIP TODAY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 text-center">
              Ready to Accelerate Your Academic Publication?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8 text-center leading-relaxed">
              Configure your customized scope in under 60 seconds with our deterministic pricing calculator or converse with our AI Research Assistant.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/quote" className="btn-clay-orange text-xs uppercase">
                <span>GET FREE ESTIMATE</span>
                <span>→</span>
              </Link>
              <Link href="/chat" className="btn-clay-ai text-xs uppercase">
                <span>ASK AI ASSISTANT</span>
              </Link>
              <button
                onClick={() => setSchedulerModalOpen(true)}
                className="btn-clay-home text-xs uppercase cursor-pointer"
              >
                <CalendarScheduleIcon className="w-3.5 h-3.5" />
                <span>Book 1-on-1 Consultation</span>
              </button>
            </div>
          </div>
        </ScrollReveal3D>
      </section>

      {/* ─── Interactive Modals ─────────────────────────────────────────── */}
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
