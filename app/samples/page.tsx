import Link from 'next/link';
import {
  TurnitinShieldLogo,
  IndiaFlagLogo,
  UkFlagLogo,
} from '@/components/RealIcons';

import {
  ResearchPaperRealWork,
  HindiPaperRealWork,
  ThesisRealWork,
  TurnitinReportRealWork,
} from '@/components/RealWorkImages';
import { Interactive3DCard } from '@/components/FuturisticScrollExperience';

export const metadata = {
  title: 'Academic Writing Samples & Previews — InkMonk Research',
  description: 'Examine redacted, approved samples of academic research papers, theses, literature reviews, and Turnitin reports by InkMonk Research.',
};

const SAMPLES = [
  {
    id: 'sample-1',
    visual: <ResearchPaperRealWork className="w-full max-w-md h-48 mx-auto mb-4" />,
    title: 'Deep Residual Networks for Automated Pulmonary Radiograph Diagnostics',
    category: 'Research Paper',
    domain: 'Computer Science / Healthcare AI',
    language: 'English (Technical)',
    format: 'IEEE Two-Column, 10 Pages',
    abstract: 'This paper presents a customized deep residual convolutional neural network (ResNet-50 variant) evaluated on 14,000 public chest X-ray scans. Through transfer learning and adaptive focal loss, the framework achieves an AUC-ROC of 0.942 across four critical thoracic pathologies, addressing severe class imbalances typical of clinical radiological datasets.',
    highlights: [
      'Comprehensive mathematical formulation of focal loss adaptation',
      'Comparative benchmarking against baseline DenseNet and VGG models',
      'Full bibtex citation index with 38 peer-reviewed references',
      'Turnitin similarity score verified below 5%',
    ],
    glowColor: 'purple' as const,
  },
  {
    id: 'sample-2',
    visual: <HindiPaperRealWork className="w-full max-w-md h-48 mx-auto mb-4" />,
    title: 'भारतीय संदर्भ में समावेशी शिक्षा और डिजिटल विभाजन का समाजशास्त्रीय अध्ययन',
    category: 'Review Paper',
    domain: 'Sociology & Educational Policy',
    language: 'Hindi (Non-Technical)',
    format: 'Standard Academic Layout, 18 Pages',
    abstract: 'प्रस्तुत शोध पत्र राष्ट्रीय शिक्षा नीति (NEP 2020) के संदर्भ में भारत के ग्रामीण और अर्ध-शहरी अंचलों में डिजिटल अवसंरचना और समावेशी शिक्षा के अंतर्संबंधों का समालोचनात्मक विश्लेषण करता है। अध्ययन विभिन्न राज्यों के प्राथमिक डेटा और सरकारी सर्वेक्षणों के सांख्यिकीय समन्वय के आधार पर नीतिगत अनुशंसाएं प्रस्तुत करता है।',
    highlights: [
      'शुद्ध मानक हिंदी शब्दावली और सुव्यवस्थित प्रारूप',
      'यूनेस्को और मानव संसाधन विकास मंत्रालय के आंकड़ों का तुलनात्मक विश्लेषण',
      'संदर्भ ग्रंथ सूची (APA 7th Edition) का सटीक प्रयोग',
      'अकादमिक निष्ठा और 0% AI योगदान प्रमाणीकरण',
    ],
    glowColor: 'purple' as const,
  },
  {
    id: 'sample-3',
    visual: <ThesisRealWork className="w-full max-w-md h-48 mx-auto mb-4" />,
    title: 'Microgrid Energy Management System with Hybrid Solar-Wind Storage',
    category: 'Thesis Excerpt',
    domain: 'Electrical & Sustainable Energy Engineering',
    language: 'English (Technical with Model)',
    format: 'Dissertation Chapter 4 (Methodology & Simulation)',
    abstract: 'Chapter 4 develops the predictive model-predictive control (MPC) algorithm deployed for dynamic load-leveling across an islanded community microgrid. Simulation executed in MATLAB/Simulink validates bus frequency stability under volatile 48-hour solar irradiation drops and gust wind speed fluctuations.',
    highlights: [
      'Detailed Simulink block diagram architecture and parameter tables',
      'State-space equations governing bidirectional inverter switching',
      'Experimental convergence and efficiency loss tables',
      'Clean Python/MATLAB source code scripts provided',
    ],
    glowColor: 'purple' as const,
  },
  {
    id: 'sample-4',
    visual: <TurnitinReportRealWork className="w-full max-w-md h-48 mx-auto mb-4" />,
    title: 'Sample Turnitin Originality & AI Paraphrase Audit',
    category: 'Turnitin Report',
    domain: 'Plagiarism & AI Verification Audit',
    language: 'Bilingual Audit',
    format: 'Standard Turnitin PDF Report Preview',
    abstract: 'Instructor-tier Turnitin verification audit demonstrating overall similarity index breakdown, matching web repositories, student paper database matches, and Turnitin’s proprietary AI writing percentage detection indicator.',
    highlights: [
      'Overall Similarity Index: 4% (Green bracket)',
      'AI Generated Content Detection: 0% detected',
      'Complete color-coded source matrix and clickable passage citations',
      'Delivered within 2 hours under standard verification request',
    ],
    glowColor: 'purple' as const,
  },
];

export default function SamplesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white py-20 px-4 text-center transition-colors duration-300 selection:bg-purple-600 selection:text-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge-pill-purple mb-3 font-mono">DEMONSTRATED QUALITY</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4 text-center">
            Sample Work &amp; Redacted Previews
          </h1>
          <p className="text-slate-600 dark:text-purple-200/80 text-base sm:text-lg text-center leading-relaxed font-normal">
            To strictly protect client confidentiality and proprietary research data, all personal information, institutional affiliations, and unpublished findings have been redacted. Real samples are continuously updated.
          </p>
        </div>

        {/* Samples List */}
        <div className="space-y-8 mb-16 text-center">
          {SAMPLES.map((sample) => (
            <Interactive3DCard key={sample.id} glowColor={sample.glowColor}>
              <div className="card-futuristic-3d p-6 md:p-8 text-center bg-purple-50/20 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-purple-100 dark:border-purple-900/40">
                  <div className="flex flex-wrap gap-2 items-center mx-auto sm:mx-0">
                    <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-500/40 text-xs font-mono font-bold rounded-full">
                      {sample.category}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-500/40 text-xs font-mono font-bold rounded-full">
                      {sample.domain}
                    </span>
                    <span className="px-3 py-1 bg-white dark:bg-[#05020A] text-purple-800 dark:text-purple-300 text-xs font-mono font-bold rounded-full border border-purple-200 dark:border-purple-800">
                      {sample.language}
                    </span>
                  </div>
                  <div className="text-xs text-purple-500 dark:text-purple-400 font-mono font-bold mx-auto sm:mx-0">
                    {sample.format}
                  </div>
                </div>

                {/* Photorealistic Work Visual */}
                <div className="my-4">
                  {sample.visual}
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-black dark:text-white mb-3 text-center">
                  {sample.title}
                </h2>

                <div className="mb-6 bg-white dark:bg-[#05020A] p-5 rounded-2xl border border-purple-100 dark:border-purple-500/25 text-sm text-slate-700 dark:text-purple-200/80 leading-relaxed text-center sm:text-left">
                  <strong className="not-italic text-purple-700 dark:text-purple-300 block mb-1 text-center sm:text-left font-mono">
                    Abstract Preview:
                  </strong>
                  &ldquo;{sample.abstract}&rdquo;
                </div>

                <div className="text-left max-w-2xl mx-auto mb-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-3 text-center">
                    Sample Structural Attributes:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-purple-200 text-left">
                    {sample.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-purple-100 dark:border-purple-900/40 flex flex-wrap justify-between items-center gap-4">
                  <span className="text-xs text-slate-500 dark:text-purple-400 font-mono">
                    Redacted under InkMonk Research Non-Disclosure Protocol
                  </span>
                  <Link
                    href="/quote"
                    className="btn-primary-glow text-xs py-2 px-5 font-mono"
                  >
                    Order a similar paper →
                  </Link>
                </div>
              </div>
            </Interactive3DCard>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-purple-50/40 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30 rounded-3xl p-8 md:p-12 text-black dark:text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3 text-center">
              Have a Specific Format or Journal Requirement?
            </h3>
            <p className="text-slate-600 dark:text-purple-200/80 max-w-xl mx-auto text-sm sm:text-base mb-8 text-center leading-relaxed font-medium">
              Whether your university requires IEEE, Springer LNCS, Elsevier, Harvard, or a customized university thesis template in English or Hindi, our team configures the exact style guide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/quote" className="btn-primary-glow font-mono">
                Configure Your Project →
              </Link>
              <Link href="/chat" className="btn-secondary-dark font-mono">
                Consult with AI Assistant
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
