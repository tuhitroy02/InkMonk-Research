'use client';

import React from 'react';

/**
 * InkMonk Research — Real Academic Work Visuals
 * Photorealistic, high-definition depictions of actual academic deliverables:
 * Research Papers, Dissertations, Books, Review Papers, Articles,
 * Academic Slides, Model & Code Implementations, Synopses, and Turnitin Reports.
 */

// 1. Real Research Paper (IEEE / Springer Two-Column Journal Layout)
export function ResearchPaperRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-300 bg-white p-3 font-serif select-none ${className}`}>
      {/* Paper Header / Journal Metadata */}
      <div className="border-b border-slate-200 pb-2 mb-2">
        <div className="flex items-center justify-between text-[8px] font-sans text-slate-500 font-bold uppercase tracking-wider">
          <span className="text-[#1A2B6D] font-black">IEEE Transactions on Neural Networks</span>
          <span>Vol. 35, No. 4 • Peer-Reviewed</span>
        </div>
        <div className="text-[11px] font-bold text-[#0A1128] mt-1 line-clamp-1 leading-snug">
          Bi-LSTM Attention Mechanism for Reproducible Anomaly Detection in High-Dimensional Time Series
        </div>
        <div className="text-[8px] font-sans text-slate-600 mt-0.5">
          Tuhit Roy, Lead Computational Architect • InkMonk Research Salt Lake Hub
        </div>
      </div>

      {/* Abstract Box */}
      <div className="bg-slate-50 border-l-2 border-[#1A2B6D] p-1.5 mb-2 text-[7.5px] leading-relaxed text-slate-700 font-sans">
        <strong className="text-[#1A2B6D]">Abstract—</strong>We present a deterministic computational pipeline integrating multi-head self-attention with bi-directional LSTM units. Empirical evaluation across 50,000 telemetry cycles demonstrates a 14.8% reduction in mean absolute error over baseline autoregressive formulations.
      </div>

      {/* Two-Column Manuscript Layout */}
      <div className="grid grid-cols-2 gap-2 text-[7.5px] leading-normal text-slate-800">
        <div>
          <div className="font-bold font-sans text-[#0A1128] text-[8px] uppercase mb-0.5">I. Introduction</div>
          <p className="line-clamp-3 text-slate-600">
            Temporal forecasting within distributed industrial cyber-physical environments poses severe gradient vanishing risks [1]. Prior formulations (Kumar et al. [2]) struggled with non-stationary drift...
          </p>
        </div>
        <div className="bg-slate-100 rounded border border-slate-200 p-1 flex flex-col justify-center items-center">
          <div className="text-[7px] font-sans font-bold text-slate-600 mb-0.5">Fig 1: Convergence Curve (PyTorch)</div>
          {/* Mini Loss Graph SVG */}
          <svg viewBox="0 0 100 35" className="w-full h-8">
            <polyline
              fill="none"
              stroke="#FF6B00"
              strokeWidth="2"
              points="5,30 20,24 40,15 60,9 80,6 95,5"
            />
            <polyline
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeDasharray="2"
              points="5,32 20,28 40,22 60,18 80,15 95,14"
            />
          </svg>
          <div className="flex gap-2 text-[6px] font-mono text-slate-500">
            <span className="text-orange-600 font-bold">● Proposed</span>
            <span className="text-sky-600">-- Baseline</span>
          </div>
        </div>
      </div>

      {/* Watermark Ribbon */}
      <div className="absolute bottom-1 right-2 bg-emerald-100 border border-emerald-400 text-emerald-800 text-[7px] font-sans font-bold px-1.5 py-0.5 rounded shadow-sm">
        ✓ IEEE Standard Format
      </div>
    </div>
  );
}

// 2. Real Doctoral Thesis / Dissertation (Hardbound Navy & Gold Foil)
export function ThesisRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-xl border-2 border-amber-500/60 bg-gradient-to-br from-[#0A1128] via-[#101F42] to-[#050814] p-4 text-center select-none flex flex-col justify-between ${className}`}>
      {/* Gold Foil Border Frame */}
      <div className="absolute inset-1.5 border border-amber-400/40 rounded-lg pointer-events-none" />
      <div className="absolute inset-2 border border-amber-400/20 rounded pointer-events-none" />

      {/* Golden University Crest Seal */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border border-amber-400/80 bg-amber-500/10 flex items-center justify-center text-amber-300 text-xs shadow-inner mb-1">
          🏛️
        </div>
        <div className="text-[8px] font-serif uppercase tracking-widest text-amber-200/90 font-bold">
          Doctor of Philosophy Dissertation
        </div>
      </div>

      {/* Thesis Title in Embossed Gold */}
      <div className="my-1">
        <h4 className="font-serif text-[11px] font-black text-amber-100 leading-snug tracking-wide uppercase px-2">
          Empirical Investigation of Quantum Error Mitigation in Distributed Computing
        </h4>
        <div className="text-[7.5px] font-sans text-amber-300/80 mt-1">
          A Comprehensive 280-Page Dissertation with Reproducible Benchmarks
        </div>
      </div>

      {/* Bottom Metadata & Ribbon */}
      <div className="flex items-center justify-between text-[7.5px] font-sans text-amber-200/70 border-t border-amber-400/30 pt-1.5 z-10">
        <span>Department of Computer Science</span>
        <span className="bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-400/40">
          Shodhganga &amp; UGC Standard
        </span>
      </div>

      {/* Ribbon Bookmark */}
      <div className="absolute top-0 right-6 w-3 h-10 bg-amber-500 shadow-md transform -skew-y-6" />
    </div>
  );
}

// 3. Real Published Book (Scholarly Hardcover Monograph with ISBN)
export function BookRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-300 bg-gradient-to-r from-orange-950 via-amber-900 to-slate-900 text-white p-3.5 select-none flex flex-col justify-between ${className}`}>
      {/* Book Spine Simulation */}
      <div className="absolute top-0 bottom-0 left-0 w-3 bg-black/40 border-r border-amber-400/40" />

      <div className="pl-2">
        <div className="flex items-center justify-between text-[8px] font-mono text-amber-300">
          <span>ACADEMIC MONOGRAPH</span>
          <span className="bg-black/40 px-1 py-0.5 rounded border border-amber-400/30">ISBN 978-93-84192-04-1</span>
        </div>
        <h4 className="font-serif text-[12px] font-black text-amber-100 mt-2 leading-tight">
          Contemporary Foundations of Advanced Algorithmic Systems
        </h4>
        <div className="text-[8px] text-slate-300 mt-1">
          By Dr. Editorial Board • InkMonk Scholarly Press
        </div>
      </div>

      <div className="pl-2 bg-black/30 rounded-lg p-2 border border-white/10 mt-1">
        <div className="text-[7.5px] text-amber-200 font-bold mb-0.5">Volume Scope:</div>
        <div className="text-[7px] text-slate-300 leading-snug">
          100 to 300 pages structured into 8 thematic chapters, extensive index, preface, and Scopus-indexed references.
        </div>
      </div>

      <div className="pl-2 flex items-center justify-between text-[7px] text-slate-400 border-t border-white/10 pt-1">
        <span>Complete Editorial Proofing</span>
        <span className="text-amber-400 font-bold">Print &amp; Digital Ready</span>
      </div>
    </div>
  );
}

// 4. Real Review Paper (PRISMA Systematic Review Matrix & Bibliometrics)
export function ReviewPaperRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-300 bg-white p-3 select-none flex flex-col justify-between ${className}`}>
      <div className="border-b border-slate-200 pb-1.5 flex items-center justify-between">
        <div>
          <span className="text-[8px] font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded">
            PRISMA 2020 GUIDELINES
          </span>
          <h4 className="font-serif text-[10.5px] font-bold text-slate-900 mt-1">
            Systematic Literature Review: 2015–2026 Deep Learning Advances
          </h4>
        </div>
        <span className="text-[8px] font-mono text-slate-400">120+ Papers Analyzed</span>
      </div>

      {/* PRISMA Flowchart Graphic */}
      <div className="my-1.5 bg-slate-50 rounded-lg p-2 border border-slate-200">
        <div className="flex items-center justify-between text-[7.5px] font-sans font-bold text-slate-700 mb-1">
          <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">Identification (n=450)</span>
          <span>→</span>
          <span className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">Screening (n=180)</span>
          <span>→</span>
          <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Included (n=68)</span>
        </div>
        <div className="text-[7px] text-slate-500 leading-snug">
          VOSviewer bibliometric clustering mapping cross-citation co-occurrence networks and taxonomic gaps.
        </div>
      </div>

      <div className="flex items-center justify-between text-[7.5px] text-slate-600 border-t border-slate-100 pt-1">
        <span className="font-bold text-purple-700">✓ Comprehensive Gap Analysis</span>
        <span>Harvard / APA 7th Citations</span>
      </div>
    </div>
  );
}

// 5. Real Academic Article (High-Impact Editorial Essay)
export function ArticleRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-300 bg-white p-3.5 select-none flex flex-col justify-between font-serif ${className}`}>
      <div className="border-b border-slate-200 pb-1.5">
        <div className="flex items-center justify-between font-sans text-[8px] text-orange-600 font-bold uppercase tracking-wider">
          <span>Peer-Reviewed Journal Essay</span>
          <span className="bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded border border-orange-200">
            ₹0.60–0.80 / word
          </span>
        </div>
        <h4 className="text-[11px] font-bold text-slate-900 mt-1 leading-snug">
          Socio-Technical Determinants of Sustainable Smart Cities in South Asia
        </h4>
      </div>

      <div className="my-1.5 text-[8px] text-slate-700 leading-relaxed">
        <span className="float-left font-serif text-2xl font-bold text-[#1A2B6D] leading-none pr-1">T</span>
        he rapid reconfiguration of municipal data governance frameworks demands a nuanced dialectic between automated sensor networks and participatory civic oversight...
      </div>

      <div className="flex items-center justify-between font-sans text-[7.5px] text-slate-500 border-t border-slate-100 pt-1">
        <span>Verified Word Counts</span>
        <span className="text-emerald-700 font-bold">100% Human Authored • 0% AI</span>
      </div>
    </div>
  );
}

// 6. Real Academic Presentation Deck (Conference & Defense Slides)
export function PresentationRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-xl border-2 border-slate-700 bg-slate-950 text-white p-3 select-none flex flex-col justify-between ${className}`}>
      {/* 16:9 Slide Aspect Frame */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[8px] font-sans">
        <span className="text-orange-400 font-bold">Doctoral Thesis Defense • Slide 12 of 35</span>
        <span className="text-slate-400 font-mono">16:9 Widescreen UHD</span>
      </div>

      <div className="my-1 text-center">
        <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
          Proposed Mathematical Formulation
        </div>
        {/* Rendered Equation */}
        <div className="my-1 bg-slate-900 rounded p-1 font-mono text-[8.5px] text-cyan-300 border border-slate-800">
          L(θ) = -Σ [ y log(p_i) + (1-y) log(1-p_i) ] + λ ||W||²
        </div>
        <div className="grid grid-cols-2 gap-2 text-[7px] text-slate-300 text-left px-2">
          <div>• Cross-entropy classification loss</div>
          <div>• L2 regularization parameter (λ=1e-4)</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[7px] font-sans text-slate-400 border-t border-slate-800 pt-1">
        <span>University Committee Approved</span>
        <span className="text-amber-300 font-bold">Speaker Notes Included</span>
      </div>
    </div>
  );
}

// 7. Real Model & Code Implementation (VS Code / PyTorch Terminal)
export function ModelCodeRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-2xl border border-cyan-500/50 bg-[#0F172A] text-slate-200 p-2.5 font-mono select-none flex flex-col justify-between ${className}`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[8px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span className="text-slate-400 ml-1">train_model.py — PyTorch CUDA</span>
        </div>
        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.2 rounded text-[7px]">
          Docker Containerized
        </span>
      </div>

      {/* Code Snippet */}
      <div className="text-[7.5px] leading-snug text-slate-300 py-1 space-y-0.5">
        <div><span className="text-pink-400">import</span> torch</div>
        <div><span className="text-pink-400">import</span> torch.nn <span className="text-pink-400">as</span> nn</div>
        <div><span className="text-blue-400">class</span> <span className="text-amber-300">ResAttentionNet</span>(nn.Module):</div>
        <div className="pl-2 text-slate-400"># Deterministic Seed Initialized (Seed=42)</div>
        <div className="pl-2"><span className="text-cyan-400">self</span>.fc = nn.Linear(512, num_classes)</div>
      </div>

      {/* Terminal Benchmark Execution Output */}
      <div className="bg-slate-950 rounded p-1 text-[7px] text-emerald-400 border border-slate-800 flex items-center justify-between">
        <span>$ python benchmark.py --eval</span>
        <span className="text-white font-bold">Accuracy: 98.42% (A100 GPU)</span>
      </div>

      <div className="flex items-center justify-between text-[7px] text-slate-400 border-t border-slate-800 pt-1">
        <span className="text-cyan-400">✓ Private Git Repo Handoff</span>
        <span>Requirements.txt + Dockerfile</span>
      </div>
    </div>
  );
}

// 8. Real PhD Synopsis / Proposal (Formal DRC Committee Submission)
export function SynopsisRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-300 bg-white p-3 select-none flex flex-col justify-between font-serif ${className}`}>
      <div className="text-center border-b border-slate-200 pb-1.5">
        <div className="font-sans text-[7.5px] text-slate-500 font-bold uppercase tracking-widest">
          Departmental Research Committee (DRC)
        </div>
        <h4 className="text-[11px] font-bold text-[#0A1128] mt-0.5">
          Doctoral Research Synopsis &amp; Proposal
        </h4>
      </div>

      <div className="my-1 text-[7.5px] text-slate-700 leading-relaxed font-sans space-y-1">
        <div><strong className="text-[#0A1128]">1. Statement of the Problem:</strong> Formulates central unresolved investigative queries.</div>
        <div><strong className="text-[#0A1128]">2. Research Objectives:</strong> Explicit primary and secondary aims (Aims I-IV).</div>
        <div><strong className="text-[#0A1128]">3. Methodological Framework:</strong> Sampling methodology, sampling size, and statistical tools.</div>
      </div>

      <div className="flex items-center justify-between font-sans text-[7.5px] text-slate-600 border-t border-slate-100 pt-1">
        <span className="text-emerald-700 font-bold">✓ Committee Ready</span>
        <span>University Registration Approved</span>
      </div>
    </div>
  );
}

// 9. Real Turnitin Instructor Originality & AI Report
export function TurnitinReportRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg border border-emerald-400 bg-slate-50 p-3 select-none flex flex-col justify-between font-sans ${className}`}>
      {/* Turnitin Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-slate-900 text-[10px]">turnitin</span>
          <span className="text-[7.5px] bg-slate-200 text-slate-700 px-1 py-0.2 rounded font-mono">Feedback Studio</span>
        </div>
        <span className="text-[7.5px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
          NON-REPOSITORY SUBMISSION
        </span>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 gap-2 my-1">
        <div className="bg-emerald-100/80 border border-emerald-400 rounded-lg p-1.5 text-center">
          <div className="text-[7px] font-bold text-emerald-900 uppercase">Similarity Index</div>
          <div className="font-serif text-lg font-black text-emerald-700 leading-tight">6%</div>
          <div className="text-[6.5px] text-emerald-800 font-semibold">&lt; 10% Guaranteed</div>
        </div>

        <div className="bg-sky-100/80 border border-sky-400 rounded-lg p-1.5 text-center">
          <div className="text-[7px] font-bold text-sky-900 uppercase">AI Writing Score</div>
          <div className="font-serif text-lg font-black text-sky-700 leading-tight">0%</div>
          <div className="text-[6.5px] text-sky-800 font-semibold">100% Human Rigor</div>
        </div>
      </div>

      {/* Matched Sources */}
      <div className="text-[7px] text-slate-600 space-y-0.5 border-t border-slate-200 pt-1">
        <div className="flex items-center justify-between">
          <span>• 2% IEEE Digital Library (Ref #94821)</span>
          <span className="font-bold text-red-600">Matched</span>
        </div>
        <div className="flex items-center justify-between">
          <span>• 2% ScienceDirect / Elsevier Publications</span>
          <span className="font-bold text-blue-600">Matched</span>
        </div>
      </div>

      <div className="text-[6.5px] font-mono text-slate-500 pt-0.5 text-right">
        Audit ID: TRN-2026-INKMONK-VERIFIED
      </div>
    </div>
  );
}

// 10. Real Hindi Shodh Patra (Authentic Devanagari Research Paper)
export function HindiPaperRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg border border-orange-300 bg-white p-3 select-none flex flex-col justify-between font-serif ${className}`}>
      <div className="border-b border-orange-200 pb-1.5">
        <div className="flex items-center justify-between font-sans text-[7.5px] text-orange-700 font-bold">
          <span>शोध पत्रिका (यूजीसी केयर सूची)</span>
          <span className="bg-orange-50 px-1 py-0.2 rounded border border-orange-200">शोध पत्र</span>
        </div>
        <h4 className="text-[11px] font-bold text-[#0A1128] mt-1 leading-snug">
          समकालीन हिंदी साहित्य में सामाजिक यथार्थवाद एवं ग्रामीण विमर्श का अनुशीलन
        </h4>
      </div>

      <div className="my-1 bg-amber-50/60 rounded p-1.5 border-l-2 border-orange-500 text-[7.5px] leading-relaxed text-slate-800 font-sans">
        <strong>शोध संक्षेप:</strong> प्रस्तुत शोध पत्र में स्वातंत्र्योत्तर ग्रामीण अंचलों में सामाजिक-आर्थिक परिवर्तनों तथा लोक चेतना के द्वंद्व का आलोचनात्मक मूल्यांकन किया गया है...
      </div>

      <div className="flex items-center justify-between font-sans text-[7.5px] text-slate-600 border-t border-slate-100 pt-1">
        <span className="text-orange-700 font-bold">✓ शुद्ध देवनागरी शब्दावली</span>
        <span>शोधगंगा मानक प्रारूप</span>
      </div>
    </div>
  );
}

// 11. Real Hindi Shodh Prabandh (Hindi Doctoral Dissertation)
export function HindiThesisRealWork({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-xl border-2 border-amber-500/70 bg-gradient-to-br from-[#1C0F05] via-[#2D1606] to-[#0A0502] p-4 text-center select-none flex flex-col justify-between text-white ${className}`}>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border border-amber-400 bg-amber-500/20 flex items-center justify-center text-amber-300 text-xs shadow-inner mb-1">
          📜
        </div>
        <div className="text-[8px] font-serif uppercase tracking-widest text-amber-200 font-bold">
          विद्यावाचस्पति (Ph.D.) शोध प्रबंध
        </div>
      </div>

      <div className="my-1">
        <h4 className="font-serif text-[11px] font-black text-amber-100 leading-snug px-2">
          आधुनिक भारतीय समाज में लोकभाषाओं का संरक्षण एवं भाषाई समाजशास्त्र
        </h4>
        <div className="text-[7.5px] font-sans text-amber-300/80 mt-1">
          संपूर्ण शोध प्रबंध • संदर्भ ग्रंथ सूची एवं परिशिष्ट सहित
        </div>
      </div>

      <div className="flex items-center justify-between text-[7.5px] font-sans text-amber-200/80 border-t border-amber-400/30 pt-1.5">
        <span>मानविकी एवं समाजशास्त्र संकाय</span>
        <span className="bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-400/50">
          UGC Care &amp; Shodhganga
        </span>
      </div>
    </div>
  );
}
