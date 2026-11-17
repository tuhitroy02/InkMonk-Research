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
} from '@/components/RealIcons';

export const metadata = {
  title: 'Academic Writing & Research Services — InkMonk Research',
  description: 'Full overview of InkMonk Research services in English and Hindi: Research papers, theses, book writing, articles, synopses, and Turnitin reports.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] py-16 px-4 text-center">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3">Academic Excellence</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0A1128] mb-4 text-center">
            Our Research &amp; Writing Services
          </h1>
          <p className="text-slate-600 text-base sm:text-lg text-center">
            InkMonk Research provides rigorously formatted, plagiarism-free academic and research content in both <strong>English</strong> and <strong>Hindi</strong>.
          </p>
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
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-2 text-center">English Services</h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed text-center">
                Comprehensive support for international journals, university submissions, doctoral dissertations, and technical documentation.
              </p>
              <div className="max-w-xs mx-auto mb-8">
                <ul className="space-y-3 text-sm text-slate-700 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Research &amp; Review Papers (Up to 10k words)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span> Thesis Writing (With / Without Model)
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
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-2 text-center">Hindi Services</h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed text-center">
                Dedicated Hindi academic team ensuring authentic scholarly vocabulary, correct Devanagari grammar, and structured methodology.
              </p>
              <div className="max-w-xs mx-auto mb-8">
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
              <h2 className="font-serif text-2xl font-bold text-[#0A1128] mb-2 text-center">Turnitin Reports</h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed text-center">
                Verified instructor-grade Turnitin check with complete AI percentage detection and highlighted originality breakdown.
              </p>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 mb-6 text-center">
                <span className="text-xs text-orange-600 font-semibold block uppercase">Fixed Flat Fee</span>
                <span className="font-serif text-3xl font-bold text-[#0A1128]">₹200</span>
                <span className="text-xs text-slate-500 block">per scanned file</span>
              </div>
              <div className="max-w-xs mx-auto mb-8">
                <ul className="space-y-3 text-sm text-slate-700 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> AI Writing &amp; Paraphrasing Detection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Source Similarity Index
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Non-Repository Submission (Safe)
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/quote?type=TURNITIN" className="btn-primary-glow text-sm w-full text-center">
              Order Turnitin Report →
            </Link>
          </div>

        </div>

        {/* Detailed Breakdown with 3D Futuristic Steps */}
        <div className="card-futuristic-3d p-8 md:p-12 mb-16 text-center">
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
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    IEEE, Springer, Elsevier, UGC CARE, Scopus-standard structures with full methodology and citations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="step-number-futuristic shrink-0">
                  02
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Master &amp; Doctoral Theses</h3>
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
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Model &amp; Code Implementation</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    Practical code generation and experimentation in Python (TensorFlow, PyTorch, Scikit-learn, OpenCV), R, MATLAB, or full web prototypes for engineering projects.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="step-number-futuristic shrink-0">
                  05
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0A1128] text-center sm:text-left">Professional Presentations (PPT)</h3>
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
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed text-center sm:text-left">
                    Pre-submission verification to ensure complete academic integrity. Reports delivered with clear guidance on high-similarity passages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/quote" className="btn-primary-glow text-base px-8 py-3.5 shadow-xl">
            Start Your Custom Quotation →
          </Link>
        </div>

      </div>
    </div>
  );
}
