import Link from 'next/link';
import {
  Step1Icon,
  Step2Icon,
  Step3Icon,
  Step4Icon,
  TurnitinShieldLogo,
  ResearchPaperRealIcon,
  ThesisRealIcon,
} from '@/components/RealIcons';
import { Interactive3DCard } from '@/components/FuturisticScrollExperience';

export const metadata = {
  title: 'How It Works — Step-by-Step Academic Process | InkMonk Research',
  description: 'Learn how InkMonk Research executes your academic research and writing projects with rigorous peer-review quality and strict delivery timelines.',
};

const PHASES = [
  {
    step: '01',
    logo: <Step1Icon className="w-9 h-9" />,
    title: 'Consultation & Precise Scope Definition',
    desc: 'You provide your research topic, word count, institutional guidelines, target journal/university rubric, and deadline. Use our instant quote engine or consult our interactive local AI assistant.',
    subpoints: [
      'Identification of Technical vs Non-Technical taxonomy',
      'Determination of English or Hindi linguistic conventions',
      'Evaluation of code or model implementation requirements',
      'Immediate transparent price calculation based on established schedule',
    ],
  },
  {
    step: '02',
    logo: <Step2Icon className="w-9 h-9" />,
    title: 'Assignment to Domain Specialist',
    desc: 'Your project is assigned directly to qualified subject-matter researchers. For engineering and AI papers, computational specialists lead the architecture. For Hindi research, native scholars oversee grammar and terminology.',
    subpoints: [
      'Comprehensive primary literature search across peer-reviewed databases',
      'Synthesis of modern methodology and theoretical models',
      'Drafting of structural synopsis and outline for verification',
    ],
  },
  {
    step: '03',
    logo: <Step3Icon className="w-9 h-9" />,
    title: 'Rigorous Drafting & Model Experimentation',
    desc: 'The complete manuscript is drafted adhering strictly to your target citation style (IEEE, APA, MLA, Harvard, Chicago). When models are requested, scripts and benchmarks are produced and documented.',
    subpoints: [
      'Original synthesis without robotic repetition or fabricated data',
      'High-resolution figures, architecture schematics, and clean tables',
      'Accurate mathematical derivations and code documentation',
    ],
  },
  {
    step: '04',
    logo: <TurnitinShieldLogo className="w-9 h-9" />,
    title: 'Turnitin Audit & Quality Assurance',
    desc: 'Every document undergoes an independent Turnitin plagiarism and AI detection audit before delivery to verify zero unintended overlap and authentic authorship.',
    subpoints: [
      'Turnitin similarity index verification below strict academic thresholds',
      'Language editing, structural coherence check, and typo rectification',
      'Turnitin digital audit report generated for client assurance',
    ],
  },
  {
    step: '05',
    logo: <ThesisRealIcon className="w-9 h-9" />,
    title: 'Delivery, Review & Client Revisions',
    desc: 'Your files are delivered securely via your client portal and email. You have dedicated revision windows to address any committee or mentor feedback.',
    subpoints: [
      'Editable Word/LaTeX files and presentation slide decks',
      'Direct communication channel with InkMonk academic directors',
      'Prompt adjustments and rebuttal assistance for journal submissions',
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] py-20 px-4 text-center selection:bg-cyan-500 selection:text-black" style={{ fontFamily: '"Cavolini", "Cavolini Condensed", sans-serif' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3 font-mono">METHODOLOGY &amp; RIGOR</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            Our End-to-End Workflow
          </h1>
          <p className="text-slate-400 text-base sm:text-lg text-center leading-relaxed font-medium">
            At InkMonk Research, every paper, thesis, and monograph follows an unyielding quality-assurance pipeline founded on care, clarity, and academic integrity.
          </p>
        </div>

        {/* Steps Timeline with Real Logos & 3D Futuristic Badges */}
        <div className="space-y-8 mb-16">
          {PHASES.map((p) => (
            <Interactive3DCard key={p.step} glowColor="cyan">
              <div className="card-futuristic-3d p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                {/* Left Side: Real Logo & 3D Step Number */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="step-number-futuristic">
                    {p.step}
                  </div>
                  <div className="bg-[#030712] p-2 rounded-xl shadow-md border border-cyan-500/40">
                    {p.logo}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-serif text-2xl font-bold text-white mb-2 text-center md:text-left">
                    {p.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 text-center md:text-left">
                    {p.desc}
                  </p>
                  <div className="bg-[#060B18] p-4 rounded-xl border border-cyan-500/25">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 mb-2 text-center md:text-left">
                      Key Deliverables in this Phase:
                    </div>
                    {/* Bullets Left-Aligned */}
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 text-left">
                      {p.subpoints.map((pt, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Interactive3DCard>
          ))}
        </div>

        {/* Confidentiality & Security Pledge */}
        <div className="card-futuristic-3d p-8 md:p-12 mb-12 text-center">
          <h3 className="font-serif text-2xl font-bold text-white mb-4 text-center">
            Our Confidentiality &amp; Academic Guarantee
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">
            <div className="p-6 rounded-2xl bg-[#060B18] border border-cyan-500/20 flex flex-col items-center text-center">
              <TurnitinShieldLogo className="w-10 h-10 mb-3" />
              <h4 className="font-bold text-white text-base mb-1 text-center">Strict Non-Disclosure</h4>
              <p className="text-slate-400 text-xs leading-relaxed text-center">
                Your research topics, client data, and raw findings are protected under confidentiality agreements and never repurposed or shared.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#060B18] border border-cyan-500/20 flex flex-col items-center text-center">
              <ResearchPaperRealIcon className="w-10 h-10 mb-3" />
              <h4 className="font-bold text-white text-base mb-1 text-center">Punctual Delivery</h4>
              <p className="text-slate-400 text-xs leading-relaxed text-center">
                We respect academic calendar deadlines, defense schedules, and conference submission cutoffs with rigorous milestone tracking.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#060B18] border border-cyan-500/20 flex flex-col items-center text-center">
              <ThesisRealIcon className="w-10 h-10 mb-3" />
              <h4 className="font-bold text-white text-base mb-1 text-center">Human Scholarship</h4>
              <p className="text-slate-400 text-xs leading-relaxed text-center">
                Every project is researched and written by domain experts, audited through Turnitin, and verified against shallow AI hallucinations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/quote" className="btn-primary-glow text-base px-8 py-3.5 shadow-xl font-mono">
            Configure Your Project Quote →
          </Link>
        </div>

      </div>
    </div>
  );
}
