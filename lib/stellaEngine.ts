/**
 * Stella — Academic & Website Concierge Intelligence Engine
 * 100% Client-side, Zero-API-Key, Zero External Network Dependency
 * InkMonk Research (https://inkmonkresearch.com)
 */

export interface StellaResponse {
  botMessage: string;
  suggestedChips?: string[];
  actionLink?: { label: string; href: string; isExternal?: boolean };
}

export interface StellaContext {
  turnCount: number;
  lastTopic?: string;
  serviceInterest?: string;
  citationStyle?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. GUARDRAILS & RISK FILTERS
// ─────────────────────────────────────────────────────────────────────────────

const UNETHICAL_PATTERNS = [
  /(write|take|do|give).*(my|an|the)?.*exam/i,
  /cheat/i,
  /fake.*(data|result|finding)/i,
  /fabricat.*(data|result|finding)/i,
  /falsif.*(data|result)/i,
  /(bypass|trick|fool|beat).*turnitin/i,
  /exam.*proxy/i,
  /do.*(quiz|test|assignment for me)/i,
  /fake.*(peer|review)/i,
];

const OFF_TOPIC_PATTERNS = [
  /movie.*recommend/i,
  /who won/i,
  /cricket.*score/i,
  /weather.*in/i,
  /recipe|cook.*pasta/i,
  /relationship.*advice/i,
  /dating.*tips/i,
  /crypto|bitcoin/i,
  /write.*poem/i,
  /video.*game/i,
  /horoscope|astrology/i,
];

const GUARANTEE_PATTERNS = [
  /guarantee.*(accept|publish|publication|scopus|springer|ieee|journal)/i,
  /guaranteed.*(accept|publish|scopus|indexing)/i,
  /(promise|assure).*(publication|accept)/i,
  /100%.*(accept|publish|scopus)/i,
  /paid.*publication.*guarantee/i,
];

const MEDICAL_LEGAL_FINANCIAL = [
  /diagnos(e|is)/i,
  /symptom.*of/i,
  /legal.*advice/i,
  /sue.*my/i,
  /invest.*in.*stock/i,
  /prescri(be|ption)/i,
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. KNOWLEDGE GRAPH & INTENT MAPPINGS
// ─────────────────────────────────────────────────────────────────────────────

interface IntentRule {
  id: string;
  keywords: (string | RegExp)[];
  handler: (query: string, context: StellaContext) => StellaResponse;
}

const INTENT_RULES: IntentRule[] = [
  // ─── Guardrails: Academic Integrity ─────────────────────────────────────────
  {
    id: 'academic_integrity',
    keywords: UNETHICAL_PATTERNS,
    handler: () => ({
      botMessage: `### 🛡️ Commitment to Academic Integrity

At **InkMonk Research**, we strictly adhere to international publication ethics and the **COPE (Committee on Publication Ethics)** guidelines. 

- We **do not** engage in exam cheating, ghost-sitting, data fabrication, or falsifying research outcomes.
- We **do not** employ deceptive tactics to "trick" similarity detection algorithms.

**How we assist ethically:**
1. **Structural & Editorial Mentoring:** Refining clarity, argumentation flow, and academic tone.
2. **Methodological Framing:** Validating statistical tests, sample calculations, and experimental setups.
3. **Plagiarism & Similarity Audits:** Utilizing instructor-level safe non-repository Turnitin checking to help you cite correctly and eliminate inadvertent plagiarism.
4. **Journal Formatting:** Precision formatting to IEEE, Springer, Elsevier, or university thesis guidelines.

How can we help strengthen the genuine scholarship of your manuscript today?`,
      suggestedChips: [
        'Journal Formatting (IEEE/APA)',
        'Thesis & IMRaD Structure',
        'Plagiarism & AI-Check Standards',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Explore Ethical Services', href: '/services' },
    }),
  },

  // ─── Guardrails: Acceptance Guarantees ─────────────────────────────────────
  {
    id: 'acceptance_guarantee',
    keywords: GUARANTEE_PATTERNS,
    handler: () => ({
      botMessage: `### ⚖️ Transparency on Journal Acceptance

**No ethical research consultancy can honestly guarantee 100% acceptance in legitimate peer-reviewed journals (such as Scopus, IEEE, Springer, or SCI/WoS).**

Independent journal editors and blind peer reviewers maintain complete editorial independence. Any service claiming "100% guaranteed Scopus indexing" is typically referring to predatory journals that risk university blacklisting.

**What InkMonk Research guarantees:**
- **Zero Desk-Rejections due to Formatting/Language:** Flawless technical English/Hindi, camera-ready LaTeX/Word formatting, and verified reference standards.
- **Methodological Rigor:** Robust data presentation, PRISMA/IMRaD compliance, and deep literature gap positioning.
- **Turnitin Verified:** Clean non-repository originality verification.
- **Rebuttal & Revision Support:** In-depth assistance addressing reviewer critiques throughout your revision rounds.

Would you like an editorial assessment of your manuscript before submission?`,
      suggestedChips: [
        'Peer-Review Rebuttal Support',
        'Get a Project Estimate',
        'Journal Formatting (IEEE/APA)',
        'Plagiarism & AI-Check Standards',
      ],
      actionLink: { label: 'Calculate Instant Estimate', href: '/quote' },
    }),
  },

  // ─── Guardrails: Medical / Legal / Financial Advice ────────────────────────
  {
    id: 'medical_legal_financial',
    keywords: MEDICAL_LEGAL_FINANCIAL,
    handler: () => ({
      botMessage: `### ⚠️ Notice on Professional Boundaries

I am **Stella**, an Academic & Research Concierge at InkMonk Research. I cannot provide clinical, legal, or financial advisory services. 

However, if you are conducting an academic literature review, systematic survey, or doctoral thesis in **medical sciences, healthcare policy, legal jurisprudence, or financial economics**, our subject-matter scholars can assist with scholarly structuring, statistical tests, and publication formatting!`,
      suggestedChips: [
        'Thesis & IMRaD Structure',
        'Statistical Data Analysis',
        'Get a Project Estimate',
      ],
    }),
  },

  // ─── Guardrails: Off-Topic ──────────────────────────────────────────────────
  {
    id: 'off_topic',
    keywords: OFF_TOPIC_PATTERNS,
    handler: () => ({
      botMessage: `### 🎓 Let's Refocus on Your Academic Goals

I am programmed specifically as InkMonk Research's **Academic & Website Concierge**. While I enjoy general knowledge, my expertise lies in:

- **Manuscript Writing & Review Papers** (English & Hindi)
- **Doctoral Theses & Dissertations** (5-Chapter compliance)
- **Formatting & Citation Engineering** (IEEE, APA, Harvard, LaTeX/BibTeX)
- **Originality Audits** (Turnitin Instructor Non-Repository)
- **Statistical Analysis & Computational Code** (SPSS, R, Python, MATLAB)

How can I help you with your manuscript or project quotation today?`,
      suggestedChips: [
        'Journal Formatting (IEEE/APA)',
        'Thesis & IMRaD Structure',
        'Get a Project Estimate',
        'Plagiarism & AI-Check Standards',
      ],
      actionLink: { label: 'Explore Academic Services', href: '/services' },
    }),
  },

  // ─── Estimator & Pricing Guidance ──────────────────────────────────────────
  {
    id: 'pricing_estimator',
    keywords: [
      'estimate', 'quote', 'cost', 'pricing', 'price', 'rate', 'fees',
      'how much', 'charge', 'calculator', 'package', 'discount',
    ],
    handler: () => ({
      botMessage: `### 💰 Transparent Academic Estimator & Pricing

InkMonk Research provides deterministic, transparent milestone pricing with zero hidden fees. Both English and Hindi disciplines are supported:

#### 1. English Non-Technical
- **Research Paper Writing:** ₹4,999 (Full peer-reviewed draft)
- **Review Paper Writing:** ₹3,999 (PRISMA systematic literature review)
- **Synopsis / Proposal:** ₹3,999 (DRC committee approved structure)
- **Complete Doctoral Thesis:** ₹19,999 (Full 5-chapter volume)
- **Monograph Books:** ₹3,999 (100 pp) | ₹7,499 (200 pp) | ₹10,999 (300 pp)
- **PPT Decks:** ₹120/slide | **Articles:** ₹0.60/word

#### 2. English Technical (with Code / Computational Model)
- **Research Paper with Computational Model:** ₹8,998 (Writing + Code)
- **Technical Thesis with Model:** ₹28,998 (Complete implementation)
- **Standalone Models (PyTorch / MATLAB / ML):** ₹5,999 (Small) | ₹8,999 (Big) | ₹12,999 (Web App + Model)

#### 3. Hindi Academic Work (हिंदी शोध कार्य)
- **Hindi Research Paper:** ₹3,999 | **Hindi Thesis:** ₹14,999 | **Review:** ₹2,999

Use our interactive on-site estimator for an instant timeline and customized breakdown:`,
      suggestedChips: [
        'Open Interactive Estimator',
        'Thesis & IMRaD Structure',
        'Plagiarism & AI-Check Standards',
        'Contact via WhatsApp',
      ],
      actionLink: { label: 'Calculate Your Instant Estimate →', href: '/quote' },
    }),
  },

  // ─── Turnitin & Plagiarism / AI Standards ───────────────────────────────────
  {
    id: 'plagiarism_turnitin',
    keywords: [
      'turnitin', 'plagiarism', 'similarity', 'ithenticate', 'ai check',
      'ai detection', 'safe check', 'repository', 'originality',
    ],
    handler: () => ({
      botMessage: `### 🛡️ Turnitin Originality & AI-Check Standards

At InkMonk Research, we process all similarity checks exclusively through **Licensed Instructor Non-Repository Turnitin Accounts**.

#### Why this is essential for scholars:
- **Zero Repository Indexing Guaranteed:** Your manuscript is **never** added to Turnitin's global comparative database. When your university or supervisor subsequently submits it, it will **not** trigger a 100% false self-plagiarism match.
- **Detailed PDF Similarity Report:** Includes complete highlighted source matches, internet references, and student paper match breakdowns.
- **AI-Generated Writing Probability:** Provides modern sentence-level detection insights across GPT-4, Claude, and Gemini text signatures.
- **Paraphrasing & Citation Repair:** If your similarity index exceeds your university threshold (e.g., >10% or >15%), our editors assist in rewriting matched passive text into original scholarly syntax.

Would you like to schedule a confidential originality review?`,
      suggestedChips: [
        'Get a Project Estimate',
        'Journal Formatting (IEEE/APA)',
        'Thesis & IMRaD Structure',
        'Contact via WhatsApp',
      ],
      actionLink: { label: 'Request Turnitin Verification', href: '/quote?service=turnitin' },
    }),
  },

  // ─── Citation & Referencing Styles (IEEE, APA, Harvard, MLA, etc.) ─────────
  {
    id: 'citation_styles',
    keywords: [
      'cite', 'citation', 'reference', 'referencing', 'apa', 'ieee',
      'harvard', 'mla', 'chicago', 'vancouver', 'ama', 'bibtex', 'latex citation',
    ],
    handler: (query) => {
      const q = query.toLowerCase();

      if (q.includes('ieee') || q.includes('bibtex')) {
        return {
          botMessage: `### 📐 IEEE Citation & Referencing Guide

IEEE format is a numeric system where citations appear in square brackets (e.g., \`[1]\`) consecutively in the order they appear in the text.

#### In-Text Citations:
- Single source: *"As demonstrated in recent deep learning benchmarks [1]..."*
- Multiple sources: *"Prior studies [2], [4]–[7] have documented..."* (Note: comma between separate brackets, en-dash for continuous ranges).
- With authors: *"According to Zhang and Li [3], convolutional layers..."*

#### Reference List Format:
\`\`\`text
[1] J. K. Author, "Title of paper," IEEE Trans. Neural Netw. Learn. Syst., vol. 34, no. 5, pp. 2450–2462, May 2023, doi: 10.1109/TNNLS.2022.3150000.
[2] R. E. Smith and T. Roy, Principles of Scalable Computation, 2nd ed. New York, NY, USA: IEEE Press, 2024.
\`\`\`

#### BibTeX Template for LaTeX:
\`\`\`bibtex
@article{roy2024scalable,
  author  = {Roy, Tuhit and Mukherjee, Sampreeti},
  title   = {Empirical Validation of Scalable Neural Architectures},
  journal = {IEEE Transactions on Knowledge and Data Engineering},
  year    = {2024},
  volume  = {36},
  number  = {4},
  pages   = {1120--1135},
  doi     = {10.1109/TKDE.2024.1000000}
}
\`\`\`

InkMonk Research provides 100% camera-ready IEEE LaTeX template formatting. Would you like our editorial team to format your manuscript?`,
          suggestedChips: [
            'Journal Formatting (IEEE/APA)',
            'Thesis & IMRaD Structure',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Get Formatting Quote', href: '/quote' },
        };
      }

      if (q.includes('apa')) {
        return {
          botMessage: `### 📚 APA 7th Edition Referencing Standard

APA (American Psychological Association) 7th Edition uses the **Author-Date** citation method with a hanging indent reference list.

#### In-Text Citations:
- **Parenthetical:** *(Roy & Mukherjee, 2024)* or *(Smith et al., 2023)* for three or more authors.
- **Narrative:** *Roy and Mukherjee (2024) established that...*
- **Direct Quote:** *(Roy, 2024, p. 45)*.

#### Reference List Formats:
- **Journal Article (with DOI):**
  \`\`\`text
  Mukherjee, S., & Roy, T. (2024). Methodological frameworks in South Asian higher education. Journal of Educational Rigor, 18(2), 145–162. https://doi.org/10.1016/j.jer.2024.01.005
  \`\`\`
- **Authored Book:**
  \`\`\`text
  Roy, T. (2023). Empirical foundations of scholarly writing. Academic Press.
  \`\`\`
- **Edited Book Chapter:**
  \`\`\`text
  Sharma, P. (2024). Plagiarism prevention in the AI era. In T. Roy (Ed.), Scholarly Publishing Protocols (pp. 89–114). Academic Press.
  \`\`\`

*Key Rule in APA 7:* Include DOIs for all journal articles formatted as active \`https://doi.org/...\` URLs. Never put a period after the DOI.`,
          suggestedChips: [
            'IEEE Citation Style',
            'Thesis & IMRaD Structure',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Format My Manuscript to APA', href: '/quote' },
        };
      }

      return {
        botMessage: `### 📖 Academic Citation & Referencing Systems

InkMonk Research supports all major international academic citation manuals:

| Style | Primary Disciplines | In-Text Pattern | Reference Ordering |
| :--- | :--- | :--- | :--- |
| **IEEE** | Engineering, Computer Science, IT | \`[1]\`, \`[2]\` (Bracketed numeric) | Chronological by citation order |
| **APA 7th** | Social Sciences, Psychology, Business | \`(Roy & Mukherjee, 2024)\` | Alphabetical by author surname |
| **Harvard** | Economics, Humanities, Management | \`(Roy 2024: 45)\` | Alphabetical |
| **Chicago (Turabian)** | History, Fine Arts, Social Sciences | Notes & Bib (Footnotes \`^1\`) or Author-Date | Footnote numbers or Alphabetical |
| **MLA 9th** | Literature, Cultural Studies, Languages | \`(Roy 42)\` (Author-page, no comma) | Works Cited (Alphabetical) |
| **Vancouver** | Medicine, Nursing, Biomedical Sciences | \`(1)\` or Superscript \`^1\` | Numeric in order of appearance |
| **AMA** | Medical Journals, Clinical Trials | Superscript numbers without spaces (\`^1,^2\`) | Numeric in order of appearance |

**LaTeX & Zotero/Mendeley Support:** We also build clean, error-free \`.bib\` databases and debug Overleaf compilation errors!`,
        suggestedChips: [
          'IEEE Citation Guide',
          'APA 7th Guide',
          'Thesis & IMRaD Structure',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Get Expert Citation Proofing', href: '/quote' },
      };
    },
  },

  // ─── Manuscript Architecture (IMRaD & Abstract) ────────────────────────────
  {
    id: 'imrad_architecture',
    keywords: [
      'imrad', 'structure', 'abstract', 'introduction', 'methodology',
      'literature review', 'research gap', 'problem statement', 'hypothesis',
      'results', 'discussion', 'conclusion', 'title',
    ],
    handler: (query) => {
      const q = query.toLowerCase();

      if (q.includes('abstract')) {
        return {
          botMessage: `### 🎯 Anatomy of a High-Impact Abstract (200–250 Words)

A compelling journal abstract must function as a standalone executive summary. Follow this proven 4-part formula:

1. **Background & Context (1–2 sentences):**
   - Introduce the domain and pinpoint the critical problem or unresolved research gap.
   - *Example:* *"While convolutional neural networks excel at spatial feature extraction, their computational cost restricts real-time deployment on edge hardware."*
2. **Methodology / Proposed Approach (2–3 sentences):**
   - State what you did, your dataset/sample size, and key tools or experimental models used.
   - *Example:* *"This paper introduces a quantized pruning pipeline evaluated on a benchmark dataset of 50,000 multimodal medical scans."*
3. **Key Findings / Results (2–3 sentences):**
   - **Quantify your outcomes!** Never say "results were improved"; state exact percentages, p-values, or F1-scores.
   - *Example:* *"Empirical evaluations show a 34.2% reduction in latency with a negligible 0.4% drop in top-1 accuracy (p < 0.01)."*
4. **Conclusion & Practical Implications (1 sentence):**
   - Why this matters to the scholarly community or industry.
   - *Example:* *"These findings provide a reproducible blueprint for low-power clinical diagnostic instruments."*

**Pro Tip:** Avoid abbreviations, literature citations (\`[1]\`), and undefined acronyms in the abstract.`,
          suggestedChips: [
            'Full IMRaD Structure',
            'Journal Formatting (IEEE/APA)',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Get Abstract Proofed', href: '/quote' },
        };
      }

      return {
        botMessage: `### 🏛️ The Standard IMRaD Manuscript Architecture

High-impact Scopus, IEEE, and SCI/WoS journals require strict adherence to the **IMRaD** framework:

#### 1. Title & Abstract
- **Title:** Concise (<15 words), declarative, incorporating high-indexing keywords.
- **Abstract:** Structured 200–250 word synthesis (Background, Methods, Results, Conclusion).

#### 2. Introduction (The Funnel Model)
- **Broad Context:** Current state of the field.
- **The Research Gap:** What prior studies missed (crucial for peer review survival).
- **Novelty & Contributions:** 3–4 bulleted, concrete technical or conceptual contributions of this paper.

#### 3. Materials & Methods (Reproducibility Core)
- Experimental design, sampling strategy, theoretical formulations, and statistical frameworks.
- Detailed enough that an independent researcher can replicate your study exactly.

#### 4. Results (Objective Reporting)
- Clear tables and high-resolution figures (300 DPI) presenting empirical data without editorial speculation.
- Statistical significance levels clearly reported ($p < 0.05$, confidence intervals, effect sizes).

#### 5. Discussion & Limitations
- Interpretation: What do the results mean relative to your initial hypotheses?
- Contrast with prior literature (agreeing and diverging findings).
- Frank acknowledgment of methodological constraints and 2–3 avenues for future research.

InkMonk Research provides end-to-end structural drafting and peer-review preparation for IMRaD papers.`,
        suggestedChips: [
          'How to Write an Abstract',
          'Peer-Review Rebuttal Support',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Explore Paper Writing Services', href: '/services#english' },
      };
    },
  },

  // ─── Research Methodologies & PRISMA Literature Reviews ────────────────────
  {
    id: 'methodology_prisma',
    keywords: [
      'prisma', 'systematic review', 'meta-analysis', 'methodology',
      'vosviewer', 'bibliometric', 'qualitative', 'quantitative',
      'sample size', 'cronbach', 'likert', 'survey',
    ],
    handler: () => ({
      botMessage: `### 🔬 Research Methodologies & Systematic Reviews

#### 1. PRISMA 2020 Guidelines (Systematic Reviews & Meta-Analyses)
Publishing a Systematic Literature Review requires adherence to the **PRISMA 2020 statement**:
- **Protocol & Registration:** PROSPERO / Open Science Framework registration.
- **Search Strategy:** Query strings across at least 3 databases (Scopus, Web of Science, PubMed, IEEE Xplore).
- **Four-Phase Flow Diagram:**
  1. *Identification* (records identified through database searching)
  2. *Screening* (title/abstract review and duplicate removal)
  3. *Eligibility* (full-text evaluation against explicit inclusion/exclusion criteria)
  4. *Included* (final qualitative synthesis and quantitative meta-analysis)

#### 2. Bibliometric Analysis (VOSviewer / R Bibliometrix)
- Co-authorship networks, co-occurrence of author keywords, and co-citation clustering.
- Generates high-resolution cluster maps illustrating emerging thematic frontiers.

#### 3. Quantitative Statistical Validation
- **Sample Size Determination:** Cochran’s formula ($n = \frac{Z^2 p q}{e^2}$) or Yamane’s formula for finite populations.
- **Instrument Reliability:** Cronbach's Alpha ($\alpha \ge 0.70$ acceptable, $\ge 0.80$ good) for Likert scales.
- **Construct Validity:** Exploratory Factor Analysis (EFA) and Confirmatory Factor Analysis (CFA).

Our technical statistics division supports **SPSS, R, Python, and MATLAB** analysis with publication-grade visualizations!`,
      suggestedChips: [
        'Statistical Data Analysis',
        'Thesis & IMRaD Structure',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Get Statistical Consultation', href: '/quote' },
    }),
  },

  // ─── Peer-Review Rebuttal & Reviewer Comment Templates ─────────────────────
  {
    id: 'rebuttal_reviewers',
    keywords: [
      'rebuttal', 'reviewer', 'reviewer 1', 'reviewer 2', 'major revision',
      'minor revision', 'resubmission', 'response letter', 'editor comments',
    ],
    handler: () => ({
      botMessage: `### ✍️ Diplomatic Peer-Review Rebuttal Strategy

Receiving a *"Major Revision"* is a victory—it means the editor wants to publish your work once reviewer concerns are satisfactorily resolved!

#### The Golden Rule: The 3-Part Response Architecture
For every single point raised by Reviewer #1 and Reviewer #2, structure your response as:
1. **Diplomatic Gratitude:** Acknowledge the critique respectfully.
2. **Exact Action Taken:** State what was added, corrected, or recalculated.
3. **Manuscript Cross-Reference:** Point directly to Page number, Line number, and quote the newly added text in bold.

#### Template 1: Agreeing and Expanding
> *"We sincerely thank Reviewer 1 for this constructive observation regarding [Topic]. We agree that our initial explanation was overly condensed. In the revised manuscript, we have expanded Section 3.2 (Page 8, Lines 142–158) to include a comparative baseline: **'[Insert newly added text here]'**."*

#### Template 2: Respectful Disagreement (Defending Your Methodology)
> *"We appreciate the reviewer’s suggestion to utilize [Method B]. While Method B is indeed valuable in [Context], we chose [Method A] because our study specifically aims to evaluate [Condition]. To make this rationale explicit for future readers, we have added a dedicated justification paragraph in Section 2.4 (Page 5, Lines 95–104)."*

InkMonk Research specializes in crafting comprehensive Response-to-Reviewers matrices that dramatically accelerate final acceptance!`,
      suggestedChips: [
        'Get a Project Estimate',
        'Thesis & IMRaD Structure',
        'Journal Formatting (IEEE/APA)',
      ],
      actionLink: { label: 'Request Revision Assistance', href: '/quote' },
    }),
  },

  // ─── Converting Thesis to Book / Monograph ──────────────────────────────────
  {
    id: 'thesis_to_book',
    keywords: [
      'thesis to book', 'convert thesis', 'monograph', 'book proposal',
      'publish book', 'isbn', 'scholarly book',
    ],
    handler: () => ({
      botMessage: `### 📖 Converting a Doctoral Thesis into a Scholarly Book

A PhD thesis and a published scholarly monograph have fundamentally different audiences:
- A **thesis** is written to prove to your committee that you read everything and conducted rigorous experiments.
- A **book** is written for scholars, students, and practitioners who seek a compelling narrative and actionable insights.

#### Key Transformation Steps:
1. **Dismantle Chapter 2 (Literature Review):** Readers do not want a catalog of past papers. Weave literature seamlessly into arguments rather than keeping a monolithic review chapter.
2. **Eliminate Academic Jargon & Dissertationese:** Remove passive constructions like *"It was observed by the researcher that..."* in favor of active, authoritative prose (*"Empirical observations indicate that..."*).
3. **Enhance Narrative Cohesion:** Group findings into themed standalone chapters with clear introductory bridges.
4. **ISBN & Publisher Formatting:** Camera-ready interior layouts formatted for print (6×9 or 7×10 inch) and digital distribution.

InkMonk Research offers end-to-end book conversion packages:
- **100 Pages:** ₹3,999 (English) | ₹2,999 (Hindi)
- **200 Pages:** ₹7,499 (English) | ₹5,499 (Hindi)
- **300 Pages:** ₹10,999 (English) | ₹7,999 (Hindi)`,
      suggestedChips: [
        'Get a Project Estimate',
        'Thesis & IMRaD Structure',
        'Contact via WhatsApp',
      ],
      actionLink: { label: 'Explore Book Writing Services', href: '/services' },
    }),
  },

  // ─── Client Portal & Authentication Guidance ───────────────────────────────
  {
    id: 'client_portal',
    keywords: [
      'client portal', 'login', 'sign in', 'account', 'otp', 'google login',
      'dashboard', 'check status', 'track project', 'my project',
    ],
    handler: () => ({
      botMessage: `### 🔐 InkMonk Client Portal Access

Our encrypted Client Portal allows scholars to monitor project milestones, review chapter drafts, download similarity certificates, and communicate directly with directors Tuhit Roy and Sampreeti Mukherjee.

#### Fast & Secure Sign-In Options:
1. **Continue with Google (OAuth):** Instant one-click authentication.
2. **6-Digit Email OTP:** Passwordless numeric code delivered directly to your inbox with zero hassle.

Click below to open the Portal authentication window:`,
      suggestedChips: [
        'Client Portal Login',
        'Get a Project Estimate',
        'Contact via WhatsApp',
      ],
      actionLink: { label: 'Open Client Portal →', href: '/client' },
    }),
  },

  // ─── Contact & Office Details ──────────────────────────────────────────────
  {
    id: 'contact_info',
    keywords: [
      'contact', 'phone', 'whatsapp', 'email', 'office', 'address',
      'location', 'tuhit roy', 'sampreeti mukherjee', 'kolkata', 'salt lake',
    ],
    handler: () => ({
      botMessage: `### 📍 Connect Directly with InkMonk Research Leadership

We welcome scholars to consult directly with our co-founders for custom project scoping, milestone agreements, and confidentiality NDAs:

- **Founders:** **Tuhit Roy** (Founder) & **Sampreeti Mukherjee** (Co-Founder)
- **Official WhatsApp / Phone:** [\`+91 7980470880\`](https://wa.me/917980470880) *(Instant response during working hours)*
- **Official Email:** \`inkmonkresearch@gmail.com\` / \`support@inkmonkresearch.com\`
- **Registered Office:** Karunamoyee, Sector 2, Salt Lake, Kolkata, West Bengal 700091, India
- **Consultation Hours:** Monday – Saturday, 9:00 AM – 8:00 PM IST

How would you prefer to get in touch?`,
      suggestedChips: [
        'Chat on WhatsApp',
        'Get a Project Estimate',
        'Journal Formatting (IEEE/APA)',
      ],
      actionLink: {
        label: 'Message on WhatsApp (+91 7980470880)',
        href: 'https://wa.me/917980470880?text=Hello%20InkMonk%20Research,%20I%20would%20like%20to%20consult%20regarding%20my%20academic%20project.',
        isExternal: true,
      },
    }),
  },

  // ─── Hindi Academic Work (हिंदी शोध कार्य) ──────────────────────────────────
  {
    id: 'hindi_services',
    keywords: [
      'hindi', 'hindi paper', 'hindi thesis', 'हिंदी', 'शोध प्रबंध',
      'शोध पत्र', 'यूजीसी', 'शोधगंगा', 'shodhganga', 'ugc care hindi',
    ],
    handler: () => ({
      botMessage: `### 🇮🇳 हिंदी शोध एवं लेखन सेवाएं (Hindi Research Division)

इंकमोंक रिसर्च (InkMonk Research) में हिंदी भाषा के शोधार्थियों के लिए एक समर्पित विद्वान मंडल (Scholarly Panel) कार्यरत है, जो **UGC-CARE** और **शोधगंगा (Shodhganga)** मानकों के पूर्णतः अनुरूप कार्य करता है:

#### हमारी प्रमुख हिंदी सेवाएं:
1. **हिंदी शोध पत्र (Research Paper):** ₹3,999 (विश्वविद्यालय एवं UGC-CARE जर्नल्स हेतु मानक IMRaD प्रारूप)
2. **समीक्षा पत्र (Review Paper):** ₹2,999 (साहित्यिक एवं विषयगत सर्वेक्षण)
3. **शोध सारांश / प्रस्ताव (Synopsis):** ₹2,999 (DRC समिति द्वारा स्वीकृत रूपरेखा)
4. **संपूर्ण शोध प्रबंध (Doctoral Thesis):** ₹14,999 (5 अध्यायों का सुव्यवस्थित शोध प्रबंध)
5. **ग्रंथ / पुस्तक लेखन (Book Writing):** 100 पृष्ठ: ₹2,999 | 200 पृष्ठ: ₹5,499 | 300 पृष्ठ: ₹7,999
6. **शोध प्रस्तुति (Academic PPT):** ₹100 प्रति स्लाइड

मंगल (Mangal / Unicode) फॉन्ट में त्रुटिहीन टाइपिंग एवं भाषा-शुद्धि! क्या आप अपने हिंदी शोध कार्य का अनुमान लगाना चाहते हैं?`,
      suggestedChips: [
        'हिंदी कार्य का कोटेशन प्राप्त करें',
        'शोध पत्र संरचना',
        'व्हाट्सएप पर बात करें',
      ],
      actionLink: { label: 'Explore Hindi Services', href: '/services#hindi' },
    }),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. MAIN QUERY PROCESSOR (SEMANTIC MATCHING + CONTEXT)
// ─────────────────────────────────────────────────────────────────────────────

export function processStellaQuery(
  rawQuery: string,
  context: StellaContext = { turnCount: 0 }
): StellaResponse {
  const query = rawQuery.trim();
  const lowerQuery = query.toLowerCase();

  // Empty input check
  if (!query) {
    return {
      botMessage: `Hello! I am **Stella**, your Academic Concierge at InkMonk Research. How can I assist with your research paper, thesis, or citation formatting today?`,
      suggestedChips: [
        'Journal Formatting (IEEE/APA)',
        'Thesis & IMRaD Structure',
        'Get a Project Estimate',
        'Plagiarism & AI-Check Standards',
      ],
    };
  }

  // 1. Check intent rules
  for (const rule of INTENT_RULES) {
    for (const keyword of rule.keywords) {
      const isMatch =
        typeof keyword === 'string'
          ? lowerQuery.includes(keyword.toLowerCase())
          : keyword.test(lowerQuery);

      if (isMatch) {
        context.lastTopic = rule.id;
        context.turnCount += 1;
        return rule.handler(query, context);
      }
    }
  }

  // 2. Intelligent Academic Fallback with Keyword Extraction
  context.turnCount += 1;
  const words = query
    .replace(/[^\w\s]/gi, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['this', 'that', 'with', 'what', 'have', 'from', 'help'].includes(w.toLowerCase()));

  const topicKeyword = words.length > 0 ? words.slice(0, 3).join(' ') : 'your academic project';

  return {
    botMessage: `### 🎓 Academic Consultation on "${topicKeyword}"

Thank you for your question. As your **Academic Concierge**, here is how **InkMonk Research** approaches this domain:

1. **Scholarly Scoping & Rigor:** Every study requires a defensible theoretical foundation, validated methodology (qualitative, quantitative, or computational), and explicit research gap positioning.
2. **Formatting & Originality Standards:** We ensure all writing meets target publication rules (IEEE, Springer, Elsevier, APA 7th, or UGC-CARE) alongside safe, non-repository Turnitin verification.
3. **Direct Editorial Support:** Our directors, **Tuhit Roy** and **Sampreeti Mukherjee**, personally oversee research quality and milestone delivery.

Would you like an exact milestone timeline and cost breakdown for this project?`,
    suggestedChips: [
      'Get a Project Estimate',
      'Journal Formatting (IEEE/APA)',
      'Thesis & IMRaD Structure',
      'Plagiarism & AI-Check Standards',
    ],
    actionLink: { label: 'Calculate Instant Estimate →', href: '/quote' },
  };
}
