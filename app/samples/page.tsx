import Link from 'next/link';
import {
  ResearchPaperRealWork,
  HindiPaperRealWork,
  ThesisRealWork,
  TurnitinReportRealWork,
} from '@/components/RealWorkImages';

export const metadata = {
  title: 'Academic Writing Samples & Previews — InkMonk Research',
  description: 'Examine redacted, approved samples of academic research papers, theses, literature reviews, and Turnitin reports by InkMonk Research.',
};

const SAMPLES = [
  {
    id: 'sample-1',
    visual: <ResearchPaperRealWork className="w-full max-w-md h-48 mx-auto mb-4" />,
    title: 'Bi-LSTM Attention Mechanism for Reproducible Anomaly Detection in High-Dimensional Time Series',
    badgeNote: '[Illustrative Redacted Deliverable]',
    category: 'Research Paper',
    domain: 'Computer Science / Machine Learning',
    language: 'English (Technical with PyTorch)',
    format: 'IEEE Transactions Two-Column, 10 Pages',
    abstract: 'This paper formulates a deterministic computational pipeline integrating multi-head self-attention with bi-directional LSTM units for robust temporal forecasting across industrial cyber-physical environments. Evaluated over 50,000 telemetry cycles, the architecture demonstrates a 14.8% reduction in mean absolute error over baseline autoregressive formulations while resolving non-stationary gradient vanishing.',
    highlights: [
      'Comprehensive mathematical formulation of multi-head self-attention integration',
      'Empirical convergence curves and comparative baseline error benchmarking in PyTorch',
      'Clean BibTeX citation management with 42 Scopus/IEEE peer-reviewed references',
      'Turnitin similarity score verified below 5% under safe non-repository protocol',
    ],
  },
  {
    id: 'sample-2',
    visual: <HindiPaperRealWork className="w-full max-w-md h-48 mx-auto mb-4" />,
    title: 'समकालीन हिंदी साहित्य में सामाजिक यथार्थवाद एवं ग्रामीण विमर्श का अनुशीलन',
    badgeNote: '[Illustrative Redacted Deliverable]',
    category: 'शोध पत्र (UGC-CARE)',
    domain: 'हिंदी साहित्य एवं समाजशास्त्र (Hindi Literature)',
    language: 'Hindi (मानक देवनागरी)',
    format: 'मानक अकादमिक शोध प्रारूप, 14 पृष्ठ',
    abstract: 'प्रस्तुत शोध पत्र स्वतंत्रता-उत्तर एवं समकालीन हिंदी उपन्यासों और कथा-साहित्य में सामाजिक यथार्थवाद, कृषक संकट तथा ग्रामीण संरचना के वैचारिक रूपांतरण का आलोचनात्मक विश्लेषण प्रस्तुत करता है। अध्ययन प्रेमचंदोत्तर परंपरा से लेकर इक्कीसवीं सदी के ग्रामीण आख्यानों तक वर्ग-संघर्ष, जातिगत विमर्श एवं विस्थापन के यथार्थवादी आयामों को सैद्धांतिक रूप से रेखांकित करता है।',
    highlights: [
      'शुद्ध मानक पारिभाषिक देवनागरी शब्दावली एवं उच्च बौद्धिक विश्लेषण शैली',
      'प्रमुख समकालीन औपन्यासिक पाठों का समाजशास्त्रीय एवं तुलनात्मक अध्ययन',
      'सटीक संदर्भ ग्रंथ सूची (APA / MLA 9th Edition) का मानकीकृत प्रयोग',
      'अकादमिक निष्ठा, शून्य मशीनी अनुवाद एवं 0% AI योगदान प्रमाणीकरण',
    ],
  },
  {
    id: 'sample-3',
    visual: <ThesisRealWork className="w-full max-w-md h-48 mx-auto mb-4" />,
    title: 'Empirical Investigation of Quantum Error Mitigation in Distributed Computing',
    badgeNote: '[Illustrative Redacted Deliverable]',
    category: 'Doctoral Dissertation',
    domain: 'Quantum Computing & Distributed Architecture',
    language: 'English (Technical with Simulation)',
    format: 'Dissertation Chapter 4 (Methodology & Benchmarks)',
    abstract: 'Chapter 4 establishes the randomized compiling and zero-noise extrapolation (ZNE) protocol deployed for error suppression across noisy intermediate-scale quantum (NISQ) distributed nodes. Simulation benchmarks demonstrate high fidelity preservation across Clifford group gates and depth-constrained quantum circuits with reproducible Python/Qiskit notebooks.',
    highlights: [
      'Mathematical derivations of quantum gate fidelity decay and Richardson extrapolation',
      'Simulation convergence curves executed across distributed NISQ circuit depths',
      'Standardized Shodhganga / university thesis chapter layout and DRC rubric compliance',
      'Containerized reproducible Qiskit simulation scripts and repository access',
    ],
  },
  {
    id: 'sample-4',
    visual: <TurnitinReportRealWork className="w-full max-w-md h-48 mx-auto mb-4" />,
    title: 'Instructor-Grade Turnitin Originality & AI Paraphrase Audit',
    badgeNote: '[Illustrative Redacted Deliverable]',
    category: 'Turnitin Report',
    domain: 'Plagiarism & AI Verification Audit',
    language: 'Bilingual Audit',
    format: 'Official Turnitin Digital Receipt & PDF Preview',
    abstract: 'Instructor-tier Turnitin verification audit demonstrating overall similarity index breakdown, matching web repositories, student paper database matches, and Turnitin’s proprietary AI writing percentage detection indicator without saving the file to any public database.',
    highlights: [
      'Overall Similarity Index: 4% (Green bracket)',
      'AI Generated Content Detection: 0% detected',
      'Complete color-coded source matrix and clickable passage citations',
      'Delivered within 15–30 minutes under safe non-repository protocol',
    ],
  },
];

export default function SamplesPage() {
  return (
    <div className="min-h-screen bg-notebook-grid text-slate-900 py-20 px-4 text-center">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
            DEMONSTRATED QUALITY
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-slate-900 mb-4 text-center">
            Sample Work &amp; Redacted Previews
          </h1>
          <p className="text-slate-600 text-base sm:text-lg text-center leading-relaxed font-medium">
            To strictly protect client confidentiality and proprietary research data, all personal information, institutional affiliations, and unpublished findings have been redacted.
          </p>
        </div>

        {/* Samples List */}
        <div className="space-y-8 mb-16 text-center">
          {SAMPLES.map((sample) => (
            <div key={sample.id} className="card-clay-white p-6 md:p-8 text-center shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="flex flex-wrap gap-2 items-center mx-auto sm:mx-0">
                  <span className="px-3 py-1 bg-orange-50 text-[#F95721] border border-orange-200 text-xs font-black rounded-full">
                    {sample.category}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-bold rounded-full">
                    {sample.domain}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-full border border-slate-200">
                    {sample.language}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-[10px] font-mono font-bold rounded-full border border-amber-200">
                    {sample.badgeNote}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-bold mx-auto sm:mx-0">
                  {sample.format}
                </div>
              </div>

              {/* Photorealistic Work Visual */}
              <div className="my-4">
                {sample.visual}
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-black text-slate-900 mb-3 text-center">
                {sample.title}
              </h2>

              <div className="mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm text-slate-700 leading-relaxed text-center sm:text-left">
                <strong className="not-italic text-[#2563EB] block mb-1 text-center sm:text-left font-black">
                  Abstract Preview:
                </strong>
                &ldquo;{sample.abstract}&rdquo;
              </div>

              <div className="text-left max-w-2xl mx-auto mb-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 text-center">
                  Sample Structural Attributes:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium text-left">
                  {sample.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#F95721] font-black">◆</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <span className="text-xs text-slate-500 font-medium">
                  Redacted under InkMonk Research Non-Disclosure Protocol
                </span>
                <Link
                  href="/quote"
                  className="btn-clay-orange text-xs py-2 px-5 font-bold"
                >
                  Order a similar paper →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="card-clay-white p-8 md:p-12 text-slate-900 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-black mb-3 text-center">
              Have a Specific Format or Journal Requirement?
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base mb-8 text-center leading-relaxed font-medium">
              Whether your university requires IEEE, Springer LNCS, Elsevier, Harvard, or a customized university thesis template in English or Hindi, our team configures the exact style guide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/quote" className="btn-clay-orange text-xs sm:text-sm font-black">
                Configure Your Project →
              </Link>
              <Link href="/chat" className="btn-clay-white text-xs sm:text-sm font-black">
                Consult with AI Assistant
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
