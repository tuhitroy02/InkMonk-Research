/**
 * Stella — Encyclopedic Academic & Website Concierge Intelligence Engine
 * 100% Client-side, Zero-API-Key, Zero External Network Dependency
 * Comprehensive Academic Writing Knowledge Base for InkMonk Research (https://inkmonkresearch.com)
 */

import { calculateQuote, SERVICE_DISPLAY_NAMES } from '@/lib/pricing/catalogue';

export interface StellaResponse {
  botMessage: string;
  suggestedChips?: string[];
  actionLink?: { label: string; href: string; isExternal?: boolean };
}

export type BookingStep =
  | 'IDLE'
  | 'LANGUAGE'
  | 'SERVICE'
  | 'WORK_TYPE'
  | 'TOPIC'
  | 'DEADLINE'
  | 'REMARKS'
  | 'SUMMARY'
  | 'TURNITIN_FILES';

export interface BookingState {
  step: BookingStep;
  language?: 'EN' | 'HI' | 'TURNITIN';
  service?: string;
  workType?: 'TECH' | 'NON_TECH' | 'NA';
  package?: string;
  domain?: string;
  topic?: string;
  deadline?: string;
  remarks?: string;
  quantity?: number;
  history?: {
    step: BookingStep;
    language?: 'EN' | 'HI' | 'TURNITIN';
    service?: string;
    workType?: 'TECH' | 'NON_TECH' | 'NA';
    package?: string;
    domain?: string;
    topic?: string;
    deadline?: string;
    remarks?: string;
    quantity?: number;
  }[];
}

export interface StellaContext {
  turnCount: number;
  lastTopic?: string;
  serviceInterest?: string;
  citationStyle?: string;
  booking?: BookingState;
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
  /ghostwrite.*exam/i,
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
  /diagnos(e|is)\s+my/i,
  /what\s+disease\s+do\s+i\s+have/i,
  /legal\s+advice\s+for\s+my\s+lawsuit/i,
  /should\s+i\s+sue/i,
  /which\s+stock\s+to\s+buy/i,
  /prescribe\s+medicine/i,
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. ENCYCLOPEDIC INTENT RULES & SCHOLARLY KNOWLEDGE GRAPH
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
      botMessage: `### 🛡️ Ethical Research & Academic Integrity Standards

At **InkMonk Research**, our leadership and doctoral fellows adhere strictly to international publication ethics and the **COPE (Committee on Publication Ethics)** principles:

- We **do not** write exams, falsify laboratory empirical datasets, or invent fraudulent results.
- We **do not** engage in deceitful tactics to artificially "bypass" or "trick" similarity detection algorithms.

#### How We Provide Legitimate Scholarly Support:
1. **Methodological Rigor & Statistical Consultation:** Guiding your sampling design, hypothesis tests, and empirical models in R, Python, SPSS, or MATLAB.
2. **Structural & Editorial Mentoring:** Transforming rough drafts into high-caliber, peer-reviewed prose adhering to IMRaD, IEEE, APA 7th, or university DRC rubrics.
3. **Turnitin Originality Audits:** Utilizing instructor-licensed non-repository accounts to verify true citation originality and prevent accidental self-plagiarism.
4. **Peer Review & Rebuttal Navigation:** Formulating diplomatic, point-by-point response matrices for Reviewer 1 and Reviewer 2.

How can our doctoral team assist in strengthening your authentic academic research?`,
      suggestedChips: [
        'Journal Formatting (IEEE/APA)',
        'Thesis & IMRaD Structure',
        'Plagiarism & AI-Check Standards',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Explore Ethical Services →', href: '/services' },
    }),
  },

  // ─── Guardrails: Acceptance Guarantees ─────────────────────────────────────
  {
    id: 'acceptance_guarantee',
    keywords: GUARANTEE_PATTERNS,
    handler: () => ({
      botMessage: `### ⚖️ The Reality of Peer-Reviewed Journal Acceptance

**No legitimate academic consultancy can promise "100% guaranteed acceptance" in authentic Scopus, Web of Science (SCIE/SSCI), IEEE, Springer, or Elsevier journals.**

Independent journal editors and blind peer reviewers hold absolute editorial sovereignty. Any commercial agency claiming "guaranteed publication" is almost certainly sending manuscripts to **predatory journals** that risk your university degree and academic credibility.

#### What InkMonk Research Guarantees:
- **Zero Desk-Rejections for Format or Language:** Error-free technical syntax, camera-ready LaTeX/Word formatting, and verified citation references.
- **Methodological Soundness:** Defensible research questions, validated empirical frameworks, and clear research gap positioning.
- **Originality Assurance:** 100% non-repository Turnitin originality verification with complete citation auditing.
- **Continuous Revision Mentorship:** In-depth revision support to address all reviewer critiques throughout multiple peer review rounds.

Would you like an editorial assessment of your manuscript before journal submission?`,
      suggestedChips: [
        'Peer-Review Rebuttal Support',
        'Journal Formatting (IEEE/APA)',
        'Avoiding Predatory Journals',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Calculate Instant Estimate →', href: '/quote' },
    }),
  },

  // ─── Guardrails: Medical / Legal / Financial Boundaries ────────────────────
  {
    id: 'medical_legal_financial',
    keywords: MEDICAL_LEGAL_FINANCIAL,
    handler: () => ({
      botMessage: `### ⚠️ Professional Scope & Boundary Notice

I am **Stella**, an Academic Concierge at InkMonk Research. I cannot provide individual clinical diagnoses, personal legal representation, or financial investment advice.

However, if you are conducting an academic literature review, clinical trial analysis, or doctoral dissertation in **clinical medicine, public health epidemiology, jurisprudence, or financial econometrics**, our subject-matter doctoral directors can provide full methodology framing, statistical validation, and publication formatting!`,
      suggestedChips: [
        'Thesis & IMRaD Structure',
        'Statistical Data Analysis',
        'Get a Project Estimate',
      ],
    }),
  },

  // ─── Abstract Writing & Title Engineering ──────────────────────────────────
  {
    id: 'abstract_writing',
    keywords: [
      'abstract', 'write abstract', 'how to write abstract', 'executive summary',
      'title of paper', 'paper title', 'catchy title', 'graphical abstract',
      'keywords', 'indexing keywords',
    ],
    handler: (query) => {
      const q = query.toLowerCase();
      if (q.includes('title')) {
        return {
          botMessage: `### 🏷️ Engineering an Academic Paper Title for Maximum Citations

An effective scholarly title must balance **declarative clarity**, **methodological precision**, and **search engine / Scopus indexing SEO**:

#### The 3-Part Scholarly Title Architecture:
\`[Core Phenomenon / Topic]: [Methodological Approach or Empirical Context] in [Domain / Population]\`

#### Key Principles:
1. **Avoid Vague Openings:** Eliminate "A Study on...", "An Investigation into...", or "Observations regarding...". Begin directly with the core scientific construct.
2. **Embed High-Value Indexing Terms:** Include your primary variable names (e.g., *"Convolutional Attention Transformers"*, *"Panel Econometric Analysis"*, *"PRISMA Systematic Review"*).
3. **Length Constraint:** Keep between **10 to 15 words**. Titles under 12 words historically receive higher citation counts across Scopus and Web of Science.
4. **Hyphenated Subtitles:** Use a colon or hyphen to separate the conceptual contribution from the empirical application:
   - *Example:* *"Quantum Annealing for Combinatorial Portfolio Optimization: An Empirical Benchmark on High-Frequency S&P 500 Data"*.`,
          suggestedChips: [
            'How to Write an Abstract',
            'Full IMRaD Structure',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Get Title & Abstract Scoped', href: '/quote' },
        };
      }

      return {
        botMessage: `### 🎯 Anatomy of a High-Impact Abstract (200–250 Words)

Your abstract is the single most scrutinized section of your manuscript. Editors and peer reviewers make their initial "desk-reject" decision within 90 seconds of reading it:

#### The Universal 4-Move Structure:
1. **Background & Unresolved Gap (1–2 sentences, ~40 words):**
   - Introduce the broader scientific context and pinpoint the critical limitation of current literature.
   - *Example:* *"While deep neural networks achieve state-of-the-art accuracy in medical imaging, their black-box nature and computational latency hinder deployment on edge diagnostic hardware."*
2. **Methodology & Experimental Design (2–3 sentences, ~60 words):**
   - State what you did, the dataset or sample size ($N$), and the experimental tools or theoretical models employed.
   - *Example:* *"We propose a lightweight, quantized attention framework evaluated on a multimodal benchmark of 45,000 radiograms using 5-fold cross-validation."*
3. **Quantified Empirical Findings (2–3 sentences, ~70 words):**
   - **Always quantify results!** Avoid vague adjectives like *"accuracy improved"*; provide exact metrics, p-values, or effect sizes.
   - *Example:* *"Experimental evaluations demonstrate a 34.2% reduction in inference latency with a negligible 0.3% degradation in Top-1 accuracy (p < 0.001) compared to ResNet-50."*
4. **Conclusion & Broader Scholarly Impact (1–2 sentences, ~30 words):**
   - Conclude with the practical or theoretical takeaway for your academic field.
   - *Example:* *"These findings establish a reproducible blueprint for low-power clinical edge diagnostics in rural healthcare systems."*

#### Critical Abstract Rules:
- Zero citations (\`[1]\` or author-date) inside the abstract.
- No undefined acronyms or abbreviations.
- Select 5–6 specialized keywords conforming to target journal vocabulary (e.g., IEEE Keywords, MeSH headings, or ACM Computing Classification).`,
        suggestedChips: [
          'Full IMRaD Structure',
          'Introduction & Research Gap',
          'Journal Formatting (IEEE/APA)',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Get Abstract Proofed →', href: '/quote' },
      };
    },
  },

  // ─── Introduction, Problem Statement & Research Gaps ───────────────────────
  {
    id: 'introduction_gaps',
    keywords: [
      'introduction', 'research gap', 'problem statement', 'statement of problem',
      'research question', 'hypothesis', 'null hypothesis', 'alternative hypothesis',
      'cars model', 'swales', 'finer', 'picot', 'hypotheses',
    ],
    handler: (query) => {
      const q = query.toLowerCase();

      if (q.includes('hypothesis') || q.includes('hypotheses')) {
        return {
          botMessage: `### 🔬 Formulating Testable Academic Hypotheses

A scholarly hypothesis is a formal, testable prediction regarding the empirical relationship between two or more operationalized variables:

#### 1. Null Hypothesis ($H_0$) vs Alternative Hypothesis ($H_1$ or $H_a$)
- **Null Hypothesis ($H_0$):** States that there is **no significant relationship, difference, or effect** between variables.
  - *Example:* *$H_0$: There is no significant difference in diagnostic latency between quantized attention networks and baseline CNN models ($p \ge 0.05$).*
- **Alternative Hypothesis ($H_a$):** States that an empirical relationship, difference, or effect **does exist**.
  - *Directional:* *$H_1$: Quantized attention networks exhibit significantly lower inference latency than baseline CNN models.*
  - *Non-Directional:* *$H_1$: There is a significant difference in latency between the two architectures.*

#### 2. Hypothesis Testing Criteria:
- **Type I Error ($\alpha$):** Rejecting $H_0$ when it is actually true (False Positive). Standard threshold is $\alpha = 0.05$.
- **Type II Error ($\beta$):** Failing to reject $H_0$ when it is false (False Negative). Statistical Power is defined as $1 - \beta$ (standard $\ge 0.80$).
- **Measurable & Falsifiable:** Every variable in your hypothesis must have an explicit operational definition (e.g., measured on a 5-point Likert scale, milliseconds, or percentage yield).`,
          suggestedChips: [
            'Statistical Data Analysis',
            'Full IMRaD Structure',
            'Problem Statement Guide',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Consult on Methodology', href: '/quote' },
        };
      }

      if (q.includes('problem statement') || q.includes('research gap')) {
        return {
          botMessage: `### 🎯 How to Articulate a Defensible Research Gap & Problem Statement

Examiners and Scopus reviewers reject papers primarily when the author fails to convince them that the problem is **scholarly significant** and **unresolved**:

#### The 4 Major Types of Research Gaps:
1. **Empirical Gap:** Findings or data in the existing literature are contradictory, incomplete, or absent for a specific population or condition.
2. **Methodological Gap:** Prior studies used suboptimal designs, outdated instrumentation, inadequate sample sizes, or non-reproducible code.
3. **Theoretical Gap:** A phenomenon has not been investigated through an established theoretical lens (e.g., evaluating digital adoption through the UTAUT-2 model).
4. **Contextual / Geographic Gap:** An established model validated in Western or high-resource contexts has not been tested in emerging economies or unique institutional setups.

#### The 3-Sentence Problem Statement Blueprint:
1. **The Established Ideal:** *"The successful implementation of distributed solar microgrids requires reliable real-time load forecasting to prevent frequency instability."*
2. **The Critical Complication (The Gap):** *"However, existing ARIMA and LSTM models exhibit high forecast errors under extreme weather anomalies, failing to account for localized microclimatic shifts."*
3. **The Urgent Consequence:** *"Without addressing this stochastic volatility, microgrid operators face avoidable blackout cascades, curtailing rural renewable adoption."*`,
          suggestedChips: [
            'Hypothesis Formulation',
            'Theoretical vs Conceptual Framework',
            'Literature Review Matrix',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Get Research Gap Formulated', href: '/quote' },
        };
      }

      return {
        botMessage: `### 🏛️ Writing a High-Impact Introduction (Swales CARS Model)

International publication standards (IEEE, Elsevier, Springer) recommend the **CARS (Create A Research Space)** funnel model by John Swales:

#### Move 1: Establishing a Scholarly Territory
- Emphasize the importance, centrality, and active current interest in your research area.
- Review key foundational and state-of-the-art studies from the last 3–5 years.

#### Move 2: Establishing a Niche (The Crucial Pivot)
- State directly where existing scholarship stops or conflicts.
- Classic transition phrases:
  - *"However, these empirical models remain limited by..."*
  - *"Despite these advancements, few studies have systematically analyzed..."*
  - *"A critical unresolved question is whether..."*

#### Move 3: Occupying the Niche (Your Paper's Contributions)
- Announce the specific purpose and scope of your study.
- **Provide 3–4 explicit, bulleted contributions:**
  - *1. Theoretical:* Formulation of a unified analytical framework.
  - *2. Methodological:* Development of a novel open-source benchmarking pipeline.
  - *3. Empirical:* Primary validation across a multi-institution dataset of $N = 1,200$.
- Provide a brief roadmap of the remaining sections of the paper.`,
        suggestedChips: [
          'Problem Statement & Research Gap',
          'Hypothesis Formulation',
          'Literature Review Matrix',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Structure My Introduction →', href: '/quote' },
      };
    },
  },

  // ─── Theoretical vs Conceptual Frameworks ──────────────────────────────────
  {
    id: 'frameworks_theoretical_conceptual',
    keywords: [
      'theoretical framework', 'conceptual framework', 'theory', 'tam', 'utaut',
      'framework difference', 'independent variable', 'dependent variable',
      'moderator', 'mediator', 'conceptual model',
    ],
    handler: () => ({
      botMessage: `### 🧭 Theoretical vs. Conceptual Framework: The Definitive Guide

Many doctoral scholars confuse these two foundational pillars. Here is how institutional review boards and Scopus editors distinguish them:

| Dimension | **Theoretical Framework** | **Conceptual Framework** |
| :--- | :--- | :--- |
| **Origin** | Derived from existing, validated theories in your field. | Developed by **you** (the researcher) for this specific inquiry. |
| **Nature** | Broad, well-established theoretical paradigm. | Narrow, operationalized model of relationships. |
| **Components** | Formal grand/mid-range theories (e.g., TAM, Bandura’s Social Cognitive Theory, Resource-Based View). | Specific Independent Variables (IV), Dependent Variables (DV), Mediators, and Moderators. |
| **Visual Role** | Explains *why* the phenomenon exists conceptually. | Illustrated as a box-and-arrow schematic showing hypothesized pathways. |

#### Operationalizing Variables in Your Conceptual Model:
- **Independent Variable (IV):** The presumed cause or antecedent (e.g., *Algorithmic Transparency*).
- **Dependent Variable (DV):** The presumed effect or outcome (e.g., *Clinician Adoption Rate*).
- **Mediating Variable (M):** The psychological or operational mechanism *through which* IV impacts DV (e.g., *Perceived Diagnostic Trust*).
- **Moderating Variable (W):** A factor that changes the strength or direction of the relationship (e.g., *Years of Clinical Experience*).

InkMonk Research designs publication-ready conceptual diagrams and theoretical justifications tailored to your target journal.`,
      suggestedChips: [
        'Hypothesis Formulation',
        'Statistical Data Analysis',
        'Thesis & IMRaD Structure',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Design Conceptual Framework →', href: '/quote' },
    }),
  },

  // ─── Literature Review & Synthesis Matrix ───────────────────────────────────
  {
    id: 'literature_review_matrix',
    keywords: [
      'literature review', 'lit review', 'synthesis matrix', 'matrix method',
      'thematic review', 'chronological review', 'how to write lit review',
      'reviewing literature', 'synthesize literature',
    ],
    handler: () => ({
      botMessage: `### 📚 How to Write a Critical Academic Literature Review

A doctoral literature review is **not** a chronological list of book reports (*"Author A said this, then Author B said that"*). It must be a **critical, thematic synthesis**:

#### 1. The Literature Synthesis Matrix Method:
Build a multi-column comparative table before writing a single paragraph:
- **Column 1:** Author(s) & Year
- **Column 2:** Theoretical Framework
- **Column 3:** Methodology & Sampling ($N$, context)
- **Column 4:** Key Empirical Findings
- **Column 5:** Inconsistencies, Biases, or Unaddressed Gaps

#### 2. Three Legitimate Ways to Structure Your Review:
- **Thematic Structuring (Recommended):** Organize by conceptual themes or sub-problems (e.g., *The Role of Trust*, *Security Vulnerabilities*, *Regulatory Barriers*).
- **Methodological Structuring:** Compare studies based on quantitative vs qualitative vs computational modeling paradigms.
- **Chronological Structuring:** Trace the historical evolution of a paradigm, culminating in modern controversies.

#### 3. Synthesizing Conflicting Evidence:
- Group studies that agree: *"Several scholars demonstrate that decentralized consensus accelerates throughput [3], [7], [12]..."*
- Contrast with opposing literature: *"Conversely, recent empirical benchmarks [15], [18] challenge this premise by illustrating latency degradation under high concurrency..."*
- Position your study: *"This conflicting evidence underscores the necessity of our proposed hybrid architecture."*`,
      suggestedChips: [
        'PRISMA Systematic Review',
        'Theoretical vs Conceptual Framework',
        'Problem Statement & Research Gap',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Get Literature Review Drafted →', href: '/quote' },
    }),
  },

  // ─── PRISMA 2020 Systematic Reviews & Meta-Analyses ────────────────────────
  {
    id: 'prisma_systematic_review',
    keywords: [
      'prisma', 'systematic review', 'meta-analysis', 'scoping review',
      'prospero', 'cochrane', 'vosviewer', 'biblioshiny', 'bibliometric',
      'forest plot', 'funnel plot', 'rob 2', 'risk of bias',
    ],
    handler: (query) => {
      const q = query.toLowerCase();

      if (q.includes('scoping') || q.includes('difference')) {
        return {
          botMessage: `### 🔍 Systematic Review vs. Scoping Review vs. Meta-Analysis

| Review Type | Primary Scholarly Objective | Synthesis Method | Protocol Standard |
| :--- | :--- | :--- | :--- |
| **Systematic Review** | Answer a specific, narrow research question with comprehensive evidence synthesis. | Qualitative narrative synthesis & risk of bias appraisal. | PRISMA 2020 & PROSPERO registration. |
| **Meta-Analysis** | Mathematically aggregate quantitative effect sizes across multiple randomized or empirical trials. | Statistical pooling (Forest plots, $I^2$ heterogeneity, Odds Ratios). | PRISMA & Cochrane Handbook. |
| **Scoping Review** | Map the key concepts, boundaries, and types of evidence available in an emerging broad topic. | Descriptive thematic charting; risk of bias optional. | PRISMA-ScR (Scoping Reviews extension). |
| **Bibliometric Review** | Quantify publication trends, author networks, and intellectual clustering over decades. | Algorithmic network mapping via VOSviewer or R Bibliometrix. | Science mapping protocols. |`,
          suggestedChips: [
            'PRISMA 2020 Flowchart Guide',
            'Risk of Bias & Quality Tools',
            'Bibliometric VOSviewer Guide',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Scope My Review Paper →', href: '/quote' },
        };
      }

      return {
        botMessage: `### 📊 PRISMA 2020 Protocol for High-Impact Systematic Reviews

To publish in Scopus Q1 or Web of Science indexed review journals, your study must adhere to the **PRISMA 2020 27-item statement**:

#### The 4-Phase PRISMA Flowchart Architecture:
1. **Identification:**
   - Run exact Boolean search strings across $\ge 3$ international indexing databases (Scopus, PubMed, Web of Science, IEEE Xplore).
   - Document duplicate removal (using Mendeley/Zotero or Covidence).
2. **Screening:**
   - Double-blind title and abstract screening by at least two independent researchers.
   - Record exact exclusion reasons (e.g., non-peer reviewed, wrong population, non-English).
3. **Eligibility:**
   - Retrieve full-text PDFs for eligible records.
   - Thoroughly document exclusions at the full-text stage with unambiguous categories.
4. **Included:**
   - Final set of primary studies subjected to systematic data extraction, risk-of-bias evaluation, and qualitative/quantitative synthesis.

#### Essential Quality Appraisal Tools:
- **Randomized Controlled Trials:** Cochrane RoB 2 (Risk of Bias 2).
- **Non-Randomized Observational Studies:** ROBINS-I.
- **Observational / Cohort Studies:** Newcastle-Ottawa Scale (NOS).

InkMonk Research produces complete PRISMA search strings, flowcharts, extraction tables, and VOSviewer cluster maps.`,
        suggestedChips: [
          'Scoping Review vs Systematic',
          'Statistical Data Analysis',
          'Bibliometric VOSviewer Guide',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Get PRISMA Review Support →', href: '/quote' },
      };
    },
  },

  // ─── Sampling Methods & Sample Size Formulas ───────────────────────────────
  {
    id: 'sampling_sample_size',
    keywords: [
      'sampling', 'sample size', 'sample size calculation', 'yamane', 'cochran',
      'krejcie', 'g*power', 'gpower', 'stratified sampling', 'purposive sampling',
      'snowball sampling', 'cluster sampling', 'sampling technique',
    ],
    handler: () => ({
      botMessage: `### 🎯 Scientific Sampling Techniques & Sample Size Formulas

Reviewers will immediately reject empirical papers if the sample size is inadequate or unjustified. Here is the mathematical standard:

#### 1. Sample Size Formulas:
- **Taro Yamane's Formula (Finite Known Population $N$):**
  $$n = \\frac{N}{1 + N(e^2)}$$
  *Where $N$ = Population size, $e$ = Margin of error (typically $0.05$ for 95% confidence).*
  *Example: For $N = 5,000$ and $e = 0.05$, $n = \\frac{5000}{1 + 5000(0.0025)} = 370.37 \\approx 371$ participants.*

- **Cochran’s Formula (Infinite or Unknown Population):**
  $$n_0 = \\frac{Z^2 \\cdot p \\cdot q}{e^2}$$
  *Where $Z = 1.96$ (for 95% CI), $p = 0.5$ (maximum variability assumption), $q = 1 - p = 0.5$, $e = 0.05$. This yields $n_0 = 384.16 \\approx 385$.*

- **G*Power Statistical Power Analysis:**
  For regression, ANOVA, or SEM, calculate sample size based on **Alpha ($\alpha = 0.05$)**, **Statistical Power ($1 - \beta = 0.80$ or $0.95$)**, and **Effect Size ($f^2 = 0.15$ medium)**.

#### 2. Sampling Techniques:
- **Probability Sampling (Generalizable):**
  - *Simple Random:* Every element has equal probability via random number generators.
  - *Stratified Random:* Population divided into homogeneous strata (e.g., by gender, department), then sampled proportionally.
  - *Cluster:* Naturally occurring geographic or institutional clusters chosen at random.
- **Non-Probability Sampling (Qualitative / Exploratory):**
  - *Purposive / Judgmental:* Selected deliberately based on defined expertise or inclusion criteria.
  - *Snowball:* Key informants recruit subsequent participants (ideal for hidden or elite populations).`,
      suggestedChips: [
        'Statistical Data Analysis',
        'Hypothesis Formulation',
        'Theoretical vs Conceptual Framework',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Consult on Sample Size Calculation', href: '/quote' },
    }),
  },

  // ─── Statistical Tests & Quantitative Analysis ─────────────────────────────
  {
    id: 'statistical_tests_guide',
    keywords: [
      'statistical test', 'which test to use', 't-test', 'anova', 'manova',
      'regression', 'logistic regression', 'chi-square', 'mann-whitney',
      'wilcoxon', 'kruskal-wallis', 'p-value', 'cronbach', 'normality',
      'spss', 'sem', 'pls-sem', 'amos', 'correlation', 'pearson', 'spearman',
    ],
    handler: (query) => {
      const q = query.toLowerCase();

      return {
        botMessage: `### 📈 Statistical Test Selection Matrix

Selecting the correct statistical test depends on your **research objective**, the **number of groups**, and whether your data satisfies **normality assumptions**:

#### 1. Comparing Means Across Groups:
| Research Question | Parametric (Normal Distribution) | Non-Parametric (Non-Normal / Ordinal) |
| :--- | :--- | :--- |
| **2 Independent Groups** (e.g., Treatment vs Control) | **Independent Samples t-test** | **Mann-Whitney U Test** |
| **2 Paired / Related Groups** (Pre-test vs Post-test) | **Paired Samples t-test** | **Wilcoxon Signed-Rank Test** |
| **3 or More Independent Groups** | **One-Way ANOVA** (+ Tukey HSD Post-Hoc) | **Kruskal-Wallis H Test** (+ Dunn's Test) |
| **3 or More Repeated Measures** | **Repeated Measures ANOVA** | **Friedman Test** |
| **Multiple Dependent Variables** | **MANOVA** | Non-parametric MANOVA |

#### 2. Examining Relationships & Associations:
- **Continuous Variables (Linear):** **Pearson Correlation Coefficient ($r$)**.
- **Ordinal / Ranked / Non-normal Variables:** **Spearman Rank Correlation ($\\rho$)**.
- **Categorical vs. Categorical Variables:** **Chi-Square Test of Independence ($\\chi^2$)** (or Fisher’s Exact Test if expected cell count $<5$).

#### 3. Prediction & Structural Modeling:
- **Continuous Outcome:** **Multiple Linear Regression** (check collinearity VIF $<5$, homoscedasticity, Durbin-Watson).
- **Binary Outcome (Yes/No, Pass/Fail):** **Binary Logistic Regression** (reporting Odds Ratios and 95% CI).
- **Complex Latent Constructs & Paths:** **Structural Equation Modeling (PLS-SEM with SmartPLS** or **CB-SEM with AMOS**).

#### 4. Instrument Reliability & Validity:
- **Cronbach’s Alpha ($\\alpha$):** $\ge 0.70$ acceptable, $\ge 0.80$ good for Likert-scale surveys.
- **Convergent Validity:** Composite Reliability (CR $\ge 0.70$), Average Variance Extracted (AVE $\ge 0.50$).`,
        suggestedChips: [
          'Sampling & Sample Size Formulas',
          'Hypothesis Formulation',
          'Results vs Discussion Section',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Get Statistical Consultation →', href: '/quote' },
      };
    },
  },

  // ─── Qualitative Research & Thematic Analysis ──────────────────────────────
  {
    id: 'qualitative_thematic_analysis',
    keywords: [
      'qualitative', 'thematic analysis', 'braun and clarke', 'grounded theory',
      'phenomenology', 'interview coding', 'nvivo', 'atlas.ti', 'coding data',
      'inductive coding', 'deductive coding', 'triangulation', 'member checking',
    ],
    handler: () => ({
      botMessage: `### 🎙️ Qualitative Research & Thematic Analysis Guide

In qualitative research, credibility and rigor stem from transparent methodological audit trails. The premier standard is **Braun & Clarke's 6-Phase Thematic Analysis Framework**:

#### The 6 Phases of Thematic Analysis:
1. **Familiarization:** Transcribing verbatim, active reading, and initial reflexive memoing across transcriptions.
2. **Generating Initial Codes:** Systematic coding of interesting features across the entire dataset (using NVivo, ATLAS.ti, or manual highlighting).
3. **Searching for Themes:** Clustering candidate codes into overarching conceptual themes and sub-themes.
4. **Reviewing Themes:** Checking candidate themes against coded extracts and the entire dataset (generating a thematic map).
5. **Defining & Naming Themes:** Refining the conceptual essence of each theme, formulating authoritative names, and defining boundaries.
6. **Producing the Scholarly Report:** Selecting rich, illustrative direct quotes with participant pseudonyms and synthesizing with theoretical literature.

#### Ensuring Qualitative Trustworthiness (Lincoln & Guba Criteria):
- **Credibility:** Member checking (returning transcripts to interviewees) and data source triangulation.
- **Transferability:** Thick, detailed description of context, institutional settings, and participant demographics.
- **Dependability:** Comprehensive codebook development and clear audit trails of all analytical choices.
- **Confirmability:** Epistemic reflexivity statements articulating the researcher’s background and potential biases.`,
      suggestedChips: [
        'Theoretical vs Conceptual Framework',
        'Results vs Discussion Section',
        'Thesis & IMRaD Structure',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Consult on Qualitative Analysis', href: '/quote' },
    }),
  },

  // ─── Results vs. Discussion Sections ───────────────────────────────────────
  {
    id: 'results_vs_discussion',
    keywords: [
      'results', 'discussion', 'results section', 'discussion section',
      'how to write discussion', 'interpreting findings', 'limitations',
      'future scope', 'implications',
    ],
    handler: () => ({
      botMessage: `### ⚖️ Writing the Results vs. Discussion Section

The most common critique by reviewers is **mixing interpretation into the Results section** or **failing to contextualize findings in the Discussion**:

#### The Results Section (Objective Presentation):
- **Tone:** Purely objective, factual, and past tense.
- **Function:** Present what the data shows without editorial interpretation or citing outside literature.
- **Formatting:** Lead with the central trend, cite the table or figure in parentheses (*"(see Table 3)"*), and provide exact statistical parameters ($F(2, 142) = 8.45, p < 0.001, \\eta_p^2 = 0.11$).
- **Rule:** Never say *"These remarkable results prove our hypothesis..."* in the Results section!

#### The Discussion Section (The Reverse Funnel Model):
1. **Immediate Answer to Research Question (Paragraph 1):** State plainly whether your primary hypotheses were supported or refuted.
2. **Dialogue with Existing Literature:** Contrast your findings with prior publications:
   - *Where your data aligns:* *"This finding corroborates previous empirical observations by Smith et al. [14]..."*
   - *Where your data diverges:* *"However, this outcome contrasts with Zhang [19], who reported... This discrepancy may be attributed to our larger sample size and real-world edge deployment."*
3. **Theoretical & Practical Implications:** Explain how your results modify existing theory or inform clinical/engineering practice.
4. **Frank Acknowledgment of Limitations:** Every study has limitations (e.g., cross-sectional design, specific geographic sample). Disclosing them proactively demonstrates scholarly maturity.
5. **Concrete Future Directions:** Offer 2–3 actionable avenues for subsequent research.`,
      suggestedChips: [
        'Full IMRaD Structure',
        'Statistical Data Analysis',
        'Peer-Review Rebuttal Support',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Get Discussion Section Refined', href: '/quote' },
    }),
  },

  // ─── All International Citation Manuals (IEEE, APA, Harvard, Chicago, etc.) 
  {
    id: 'citation_styles_master',
    keywords: [
      'cite', 'citation', 'reference', 'referencing', 'apa', 'apa 7th', 'ieee',
      'harvard', 'mla', 'mla 9th', 'chicago', 'turabian', 'vancouver', 'ama',
      'oscola', 'bibtex', 'latex citation', 'endnote', 'zotero', 'mendeley',
    ],
    handler: (query) => {
      const q = query.toLowerCase();

      if (q.includes('ieee') || q.includes('bibtex')) {
        return {
          botMessage: `### 📐 IEEE Citation & BibTeX Guide

IEEE is a numeric citation system widely used in Engineering, Computer Science, and Physics:

#### In-Text Citations:
- Numbers enclosed in square brackets: \`[1]\`, \`[2]\`.
- Multiple citations: \`[1], [3], [5]–[8]\` (use commas between single numbers, en-dashes for ranges).
- In a sentence: *"As proved by Roy and Mukherjee in [4], quantization preserves feature fidelity..."*

#### Reference List Format:
\`\`\`text
[1] J. K. Author and R. E. Smith, "Title of paper," IEEE Trans. Neural Netw. Learn. Syst., vol. 34, no. 5, pp. 2450–2462, May 2024, doi: 10.1109/TNNLS.2023.3150000.
[2] T. Roy, Principles of Scalable Deep Learning Architectures, 2nd ed. Piscataway, NJ, USA: IEEE Press, 2024.
\`\`\`

#### LaTeX BibTeX Template:
\`\`\`bibtex
@article{roy2024scalable,
  author  = {Roy, Tuhit and Mukherjee, Sampreeti},
  title   = {Empirical Validation of Distributed Neural Attention},
  journal = {IEEE Transactions on Knowledge and Data Engineering},
  year    = {2024},
  volume  = {36},
  number  = {4},
  pages   = {1120--1135},
  doi     = {10.1109/TKDE.2024.1000000}
}
\`\`\``,
          suggestedChips: [
            'APA 7th Referencing Guide',
            'Harvard Citation Style',
            'Chicago & MLA Style',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Get IEEE LaTeX Formatting →', href: '/quote' },
        };
      }

      if (q.includes('apa')) {
        return {
          botMessage: `### 📚 APA 7th Edition Referencing Standard

APA 7th uses the **Author-Date** citation method and a hanging-indent reference list:

#### In-Text Citations:
- **Parenthetical:** *(Roy & Mukherjee, 2024)* or *(Smith et al., 2023)* for three or more authors.
- **Narrative:** *Roy and Mukherjee (2024) observed that...*
- **Direct Quotation with Page:** *(Roy, 2024, p. 112)*.

#### Reference List Formats:
- **Journal Article (with DOI as URL):**
  \`\`\`text
  Mukherjee, S., & Roy, T. (2024). Methodological frameworks in higher education. Journal of Scholarly Rigor, 18(2), 145–162. https://doi.org/10.1016/j.jsr.2024.01.005
  \`\`\`
- **Authored Book:**
  \`\`\`text
  Roy, T. (2023). Empirical foundations of academic writing. Academic Press.
  \`\`\`
- **Chapter in an Edited Book:**
  \`\`\`text
  Sharma, P. (2024). Ethical publishing in AI. In T. Roy (Ed.), Scholarly Publishing Protocols (pp. 89–114). Elsevier.
  \`\`\`
*Key APA 7 Rule:* Never put a period after the DOI URL!`,
          suggestedChips: [
            'IEEE Citation Guide',
            'Harvard Citation Style',
            'Chicago & MLA Style',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Format My Manuscript to APA →', href: '/quote' },
        };
      }

      if (q.includes('harvard') || q.includes('chicago') || q.includes('mla') || q.includes('vancouver')) {
        return {
          botMessage: `### 📖 Harvard, Chicago, MLA, & Vancouver Manuals

InkMonk Research formats manuscripts to every major global manual:

- **Harvard Style (Author-Date):**
  - In-text: \`(Roy 2024, p. 45)\`
  - Reference: \`Roy, T. (2024) Principles of Scholarly Writing. London: Academic Press.\`
- **Chicago 17th Manual of Style:**
  - *Notes & Bibliography:* Superscript numbers in text (\`¹\`) with footnotes/endnotes giving full publication details.
  - *Author-Date:* In-text \`(Roy 2024, 45)\` with alphabetical bibliography.
- **MLA 9th Edition (Humanities & Literature):**
  - In-text: \`(Roy 45)\` (Author and page, **no comma**, no "p.").
  - Uses the "Container" model in the Works Cited section.
- **Vancouver / NLM (Biomedical & Medicine):**
  - Numeric in order of appearance: \`(1)\` or superscript \`¹\`.
  - Journal titles abbreviated according to the NLM Catalog (Index Medicus), without periods.`,
          suggestedChips: [
            'IEEE Citation Guide',
            'APA 7th Referencing Guide',
            'Thesis & IMRaD Structure',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Get Citation Proofing →', href: '/quote' },
        };
      }

      return {
        botMessage: `### 📖 Universal Scholarly Referencing & Citation Engines

InkMonk Research provides 100% verified citation engineering across all international guidelines:

| System | Format Type | Disciplines | In-Text Pattern |
| :--- | :--- | :--- | :--- |
| **IEEE** | Numeric | Engineering, Computing, Telecom | \`[1]\`, \`[2]\` |
| **APA 7th** | Author-Date | Psychology, Social Sciences, Business | \`(Roy & Mukherjee, 2024)\` |
| **Harvard** | Author-Date | Economics, Management, UK Universities | \`(Roy 2024: 45)\` |
| **Chicago** | Footnotes / Author-Date | History, Humanities, Fine Arts | Footnote \`^1\` or \`(Roy 2024)\` |
| **MLA 9th** | Author-Page | Literature, Cultural Studies, Arts | \`(Roy 45)\` |
| **Vancouver**| Sequential Numeric | Clinical Medicine, Pharmacy, Nursing | \`(1)\` or \`^1\` |
| **OSCOLA** | Footnotes | International Law, Treaties, Jurisprudence | Footnotes with neutral citations |

We also build clean BibTeX databases and resolve LaTeX Overleaf compile warnings.`,
        suggestedChips: [
          'IEEE Citation Guide',
          'APA 7th Referencing Guide',
          'Harvard Citation Style',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Configure Citation Scope →', href: '/quote' },
      };
    },
  },

  // ─── Doctoral Dissertations (5-Chapter Framework & DRC Defense) ─────────────
  {
    id: 'phd_thesis_framework',
    keywords: [
      'thesis', 'dissertation', 'phd', 'ph.d', 'doctoral', '5 chapter',
      'synopsis', 'drc', 'rac', 'thesis chapter', 'chapter 1', 'chapter 2',
      'chapter 3', 'chapter 4', 'chapter 5', 'viva', 'defense',
    ],
    handler: (query) => {
      const q = query.toLowerCase();

      if (q.includes('viva') || q.includes('defense')) {
        return {
          botMessage: `### 🎓 Mastering the Doctoral Viva Voce / Thesis Defense

The doctoral oral defense is your opportunity to defend your empirical contributions before an external evaluation committee. Here is how to prepare:

#### The Top 5 Most Common Examiner Questions:
1. *"What is the single most original, novel contribution of your doctoral work?"*
   - **How to Answer:** Summarize in 2 sentences your exact conceptual or empirical contribution, separating your findings from previous baseline models.
2. *"Why did you select this specific methodology over alternative approaches?"*
   - **How to Answer:** Defend why your chosen design (e.g., PLS-SEM over Multiple Regression, or mixed-methods over purely qualitative) is best suited to your operationalized variables.
3. *"What are the key limitations of your empirical findings?"*
   - **How to Answer:** Acknowledge 2–3 boundary conditions transparently (e.g., sample geography, cross-sectional time horizon) and explain why they do not invalidate your core findings.
4. *"If you were to start this research again today, what would you do differently?"*
   - **How to Answer:** Show scholarly growth without undermining your current dissertation (e.g., conducting a longitudinal follow-up or utilizing a larger multi-site pilot).
5. *"How do your findings translate into practical or policy implications?"*

#### Recommended Defense Slide Deck Architecture (20 Slides for a 20-Minute Viva):
- Slides 1–3: Background, Problem Statement & Research Gap
- Slides 4–5: Theoretical & Conceptual Framework
- Slides 6–8: Methodology, Sampling, Instruments & Ethics
- Slides 9–14: Core Findings, Hypothesis Testing & Empirical Models
- Slides 15–17: Discussion, Alignment with Literature & Implications
- Slides 18–20: Limitations, Future Research & Publications Arising from Thesis`,
          suggestedChips: [
            '5-Chapter Thesis Structure',
            'Statistical Data Analysis',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Book Viva Defense Consultation', href: '/quote' },
        };
      }

      return {
        botMessage: `### 🏛️ The Complete 5-Chapter Doctoral Dissertation Roadmap

A doctoral dissertation is an exhaustive monograph that must withstand international external peer evaluation:

#### Chapter 1: Introduction & Research Problem
- Background of the study, contextual background, and formal problem statement.
- Research questions, directional hypotheses ($H_1$ to $H_k$), and specific objectives.
- Scope, delimitations, and operational definitions of key terms.

#### Chapter 2: Literature Review & Theoretical Framework
- Thematic synthesis of foundational and modern scholarship (last 5 years).
- Grand and mid-range theoretical frameworks grounding the investigation.
- Conceptual framework diagram illustrating hypothesized paths between variables.
- Explicit synthesis matrix highlighting empirical, methodological, and contextual research gaps.

#### Chapter 3: Research Methodology & Design
- Epistemological paradigm (Positivism, Interpretivism, Pragmatism).
- Research design (Experimental, Quasi-experimental, Correlational, Mixed-methods).
- Target population, sampling frame, sample size calculation (Yamane/Cochran/G*Power).
- Instrumentation, pilot study findings, validity (construct, convergent), and reliability (Cronbach's $\\alpha$).
- Detailed data analysis plan and institutional ethics / IRB compliance.

#### Chapter 4: Data Presentation, Analysis & Empirical Findings
- Response rate analysis and respondent demographic profiles.
- Descriptive statistics (mean, SD, skewness, kurtosis).
- Inferential hypothesis testing (t-tests, ANOVA, multiple regression, or PLS-SEM structural paths).
- High-resolution data figures and APA/IEEE standardized tables.

#### Chapter 5: Discussion, Conclusions & Recommendations
- Systematic interpretation of each finding relative to original research questions.
- Theoretical contributions and practical / managerial implications.
- Methodological limitations and actionable future research avenues.

InkMonk Research provides 4-stage milestone delivery with private escrow protection!`,
        suggestedChips: [
          'Viva Voce Defense Guide',
          'Sampling & Sample Size Formulas',
          'Literature Review Matrix',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Explore Thesis Services →', href: '/services' },
      };
    },
  },

  // ─── Journal Selection, Metrics & Predatory Journal Defense ─────────────────
  {
    id: 'journal_selection_metrics',
    keywords: [
      'journal', 'journal selection', 'scopus', 'web of science', 'wos',
      'scie', 'ssci', 'ugc care', 'impact factor', 'citescore', 'sjr',
      'predatory journal', 'q1', 'q2', 'q3', 'q4', 'desk rejection',
    ],
    handler: (query) => {
      const q = query.toLowerCase();

      if (q.includes('predatory') || q.includes('fake')) {
        return {
          botMessage: `### 🚨 Avoiding Predatory Journals: The Scholar's Defense Guide

Predatory publishers exploit researchers by charging article processing charges (APCs) without conducting authentic peer review, jeopardizing your academic standing:

#### The 5 Dead Giveaways of a Predatory Journal:
1. **Unrealistic Turnaround Promises:** Any journal offering *"Peer review and publication within 48 to 72 hours"* is predatory. Legitimate peer review takes 6 to 16 weeks.
2. **Generic, Flattering Solicitation Emails:** Cold emails praising your unrelated conference paper or inviting you to submit immediately.
3. **Fake or Bogus Impact Metrics:** Using counterfeit metrics such as *"Universal Impact Factor"*, *"Global Impact Factor"*, or *"SJIF"* instead of authentic Clarivate JCR Impact Factor or Scopus CiteScore.
4. **Hijacked Journal Websites:** Scammers duplicate the layout and ISSN of legitimate Latin American or European print journals on fraudulent \`.com\` or \`.org\` domains.
5. **No Verifiable Editorial Board:** Editorial board members listed without institutional \`.edu\` or \`.ac\` emails, or scholars listed who have no knowledge of their inclusion.

#### The "Think. Check. Submit." Verification Routine:
- Check if the journal is indexed directly on **Scopus.com** (verify active indexing status in Scopus Source List).
- Check **Master Journal List (Clarivate)** for Web of Science Core Collection (SCIE, SSCI, AHCI).
- Check **DOAJ (Directory of Open Access Journals)** for verified Open Access compliance.`,
          suggestedChips: [
            'Scopus Quartiles Explained',
            'Journal Selection Strategy',
            'Get a Project Estimate',
          ],
          actionLink: { label: 'Get Journal Authenticity Check', href: '/quote' },
        };
      }

      return {
        botMessage: `### 🧭 Journal Selection & Indexing Metrics Explained

Navigating academic indexing hierarchies is essential for academic promotion and doctoral degree awards:

#### 1. Indexing Tier Hierarchies:
- **Clarivate Web of Science (WoS) Core Collection:**
  - **SCIE (Science Citation Index Expanded):** Highest tier for STEM.
  - **SSCI (Social Sciences Citation Index):** Top tier for Economics, Management, Social Sciences.
  - **AHCI (Arts & Humanities Citation Index):** Prestigious humanities publications.
  - **ESCI (Emerging Sources Citation Index):** High-quality peer-reviewed journals evaluated for future impact factors.
- **Scopus (Elsevier):**
  - Divided into 4 quartiles per subject category:
    - **Q1 (Top 25%):** Highest prestige and citation influence.
    - **Q2 (25%–50%):** Strong international visibility.
    - **Q3 (50%–75%):** Solid regional and specialized scope.
    - **Q4 (Bottom 25%):** Entry-level peer-reviewed venues.
- **UGC-CARE List (India):**
  - **Group I:** Verified Indian and regional journals evaluated by UGC.
  - **Group II:** Globally indexed journals (Scopus and Web of Science).

#### 2. Key Metrics Demystified:
- **Journal Impact Factor (JIF):** Citations in year $t$ to articles published in $t-1$ and $t-2$, divided by total citable items. Calculated exclusively by Clarivate.
- **CiteScore (Scopus):** Calculates average citations across a 4-year rolling window.
- **SCImago Journal Rank (SJR):** Weights citations by the prestige of the citing journal (PageRank algorithm).`,
        suggestedChips: [
          'Avoiding Predatory Journals',
          'Peer-Review Rebuttal Support',
          'Thesis & IMRaD Structure',
          'Get a Project Estimate',
        ],
        actionLink: { label: 'Get Journal Target List →', href: '/quote' },
      };
    },
  },

  // ─── Peer-Review Rebuttals & Handling Reviewer Critiques ───────────────────
  {
    id: 'peer_review_rebuttal',
    keywords: [
      'rebuttal', 'reviewer', 'reviewer 1', 'reviewer 2', 'major revision',
      'minor revision', 'resubmission', 'response letter', 'editor comments',
      'reject and resubmit', 'desk reject',
    ],
    handler: () => ({
      botMessage: `### ✍️ Diplomatic Peer-Review Rebuttal Strategy

Receiving a **"Major Revision"** or **"Revise & Resubmit"** is an achievement—it signifies the editor is prepared to publish your work once reviewer critiques are addressed satisfactorily:

#### The 3-Part Golden Rebuttal Architecture:
For **every single comment** made by Reviewer #1 and Reviewer #2, structure your response as:
1. **Diplomatic Acknowledgement:** Respectfully validate the critique.
2. **Specific Action Taken:** Detail what experiments were re-run, text rewritten, or citations added.
3. **Cross-Referenced Quote:** State exact Page, Section, and Line numbers, quoting the newly revised text in bold.

#### Template 1: Agreeing and Expanding
> *"We thank Reviewer 1 for this valuable insight regarding our sampling frame. We concur that our original rationale was overly brief. In the revised manuscript, we have expanded Section 3.2 (Page 7, Lines 142–158) to include a comparative baseline table and additional justification: **'[Insert newly added text]'**."*

#### Template 2: Respectfully Defending Methodology
> *"We appreciate the reviewer’s suggestion to utilize Algorithm B. While Algorithm B is effective in [Alternative Context], we adopted Algorithm A because our study explicitly tests low-power embedded constraints. To clarify this scientific rationale for future readers, we have added a dedicated explanatory paragraph in Section 2.4 (Page 5, Lines 95–104)."*

InkMonk Research crafts comprehensive Response-to-Reviewers matrices that dramatically improve acceptance velocity!`,
      suggestedChips: [
        'Journal Selection & Metrics',
        'Thesis & IMRaD Structure',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Request Revision Assistance →', href: '/quote' },
    }),
  },

  // ─── Turnitin & Originality Verification ────────────────────────────────────
  {
    id: 'turnitin_originality_ai',
    keywords: [
      'turnitin', 'plagiarism', 'similarity', 'ithenticate', 'ai check',
      'ai detection', 'safe check', 'repository', 'originality', 'self plagiarism',
      'false positive',
    ],
    handler: () => ({
      botMessage: `### 🛡️ Turnitin Originality & AI-Check Standards

At InkMonk Research, all similarity verification is conducted exclusively through **Licensed Instructor Non-Repository Turnitin Accounts**:

#### Why the Non-Repository Protocol is Critical:
- **Zero Database Indexing Guaranteed:** Your draft is analyzed in private RAM and **never** stored in Turnitin’s global comparative repository. When your university subsequently submits your final thesis, it will **not** trigger a 100% false self-plagiarism match.
- **Detailed PDF Originality Report:** Color-coded highlighted passage citations matching published journals, internet sources, and student archives.
- **Turnitin AI Writing Indicator:** Sentence-level statistical perplexity and burstiness detection breakdown.
- **Ethical Similarity Reduction:** If your similarity exceeds university thresholds (e.g., $>10\\%$ or $>15\\%$), our doctoral fellows assist in rewriting passive quotes into original scholarly discourse.

#### Typical University Thresholds:
- Overall Similarity: $<10\\%$ to $<15\\%$.
- Single Source Match: $<1\\%$.
- Exclusion filters: Quotes and Bibliography properly configured.`,
      suggestedChips: [
        'Thesis & IMRaD Structure',
        'Journal Formatting (IEEE/APA)',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Request Turnitin Verification →', href: '/quote?service=TURNITIN' },
    }),
  },

  // ─── Scientific Style, Tone & Academic English ─────────────────────────────
  {
    id: 'academic_writing_style_tone',
    keywords: [
      'academic style', 'tone', 'passive voice', 'active voice', 'hedging',
      'academic english', 'nominalization', 'scientific writing', 'grammar',
      'concise writing',
    ],
    handler: () => ({
      botMessage: `### ✍️ Academic Style, Tone & Scientific English

Publishing in prestigious international journals requires an authoritative, objective scholarly voice:

#### 1. Active vs. Passive Voice in Modern Publishing:
- Historically, journals demanded strict passive voice (*"The experiment was conducted by the authors"*).
- **Modern Standards (Nature, IEEE, APA 7th):** Encourage active voice when describing author decisions (*"We conducted the experiment..."* or *"We propose a lightweight architecture..."*).
- Use passive voice when the object or process is the central focus (*"Blood samples were centrifuged at 3,000 RPM for 15 minutes"*).

#### 2. Academic Hedging (Calibrated Caution):
Scientific manuscripts must avoid unwarranted absolutes:
- **Avoid:** *"These findings prove that the algorithm is optimal."*
- **Scholarly Standard:** *"These findings suggest that the algorithm achieves superior performance under evaluated operational constraints."*
- **Use epistemic verbs:** *indicates, corroborates, reflects, aligns with, implies*.

#### 3. Eliminating Heavy Nominalization:
Nominalization occurs when dynamic verbs are converted into cumbersome abstract nouns:
- **Weak:** *"An investigation into the utilization of the technology was undertaken by the team."*
- **Strong:** *"We investigated how clinicians utilized the technology."*

InkMonk Research provides professional academic copyediting to ensure your prose reads with native scholarly fluency.`,
      suggestedChips: [
        'How to Write an Abstract',
        'Thesis & IMRaD Structure',
        'Journal Formatting (IEEE/APA)',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Get Academic Copyediting', href: '/quote' },
    }),
  },

  // ─── Computational & Machine Learning Research ─────────────────────────────
  {
    id: 'computational_ml_research',
    keywords: [
      'machine learning', 'deep learning', 'pytorch', 'tensorflow', 'matlab',
      'cuda', 'reproducible code', 'docker', 'code implementation', 'algorithm',
      'hyperparameters', 'f1 score', 'auc-roc',
    ],
    handler: () => ({
      botMessage: `### 💻 Documenting Computational & Machine Learning Research

Computer Science and AI manuscripts face severe reproducibility audits by peer reviewers. To achieve acceptance, your paper must document every element of the experimental pipeline:

#### 1. The 5 Pillars of Computational Reproducibility:
- **Dataset Partitioning:** Document exact splits (e.g., 70% Train, 15% Validation, 15% Test) and state whether stratified cross-validation was employed.
- **Hardware & Environment Specification:** Disclose GPU architecture (e.g., NVIDIA RTX 4090 / A100), CUDA version, framework versions (PyTorch 2.2, Python 3.11), and random seeds for initialization.
- **Hyperparameter Tables:** State batch size, initial learning rate, optimizer (e.g., AdamW with weight decay), learning rate scheduler, and training epochs.
- **Statistical Benchmark Reporting:** Run experiments across multiple random seeds and report **Mean $\\pm$ Standard Deviation** for all metrics:
  - Classification: Precision, Recall, Macro F1-Score, AUC-ROC.
  - Regression: RMSE, MAE, $R^2$.
  - Computer Vision: mAP@0.5, mAP@0.5:0.95, FPS.

#### 2. Docker & Private Git Handoff:
InkMonk Research provides complete working codebases packaged with \`requirements.txt\`, step-by-step \`README.md\`, and Docker containers ensuring immediate reproducibility.`,
      suggestedChips: [
        'Statistical Data Analysis',
        'Full IMRaD Structure',
        'Get a Project Estimate',
      ],
      actionLink: { label: 'Explore Computational Services', href: '/services' },
    }),
  },

  // ─── Hindi & Vernacular Academic Research (हिंदी शोध कार्य) ─────────────────
  {
    id: 'hindi_academic_research',
    keywords: [
      'hindi', 'hindi paper', 'hindi thesis', 'हिंदी', 'शोध प्रबंध',
      'शोध पत्र', 'यूजीसी', 'शोधगंगा', 'shodhganga', 'ugc care hindi',
      'cstt', 'देवनागरी', 'mangal',
    ],
    handler: () => ({
      botMessage: `### 🇮🇳 हिंदी शोध एवं अकादमिक प्रभाग (Hindi Academic Division)

इंकमोंक रिसर्च (InkMonk Research) में सह-संस्थापिका **सम्प्रीति मुखर्जी मैम** के प्रत्यक्ष पर्यवेक्षण में हिंदी माध्यम के शोधार्थियों के लिए एक समर्पित विद्वान मंडल कार्यरत है, जो **UGC-CARE** और **शोधगंगा (Shodhganga)** मानकों के पूर्णतः अनुरूप कार्य करता है:

#### प्रमुख हिंदी शोध सेवाएं:
1. **शोध प्रबंध (Doctoral Thesis & Dissertation):** संपूर्ण 5-अध्यायी शोध संरचना (प्रस्तावना, साहित्य समीक्षा, शोध प्रविधि, तथ्य विश्लेषण, निष्कर्ष एवं संस्तुतियां)।
2. **शोध पत्र (Research Paper Writing):** यूजीसी-केयर सूचीबद्ध एवं समकक्ष पत्रिकाओं हेतु मानक IMRaD प्रारूप में मौलिक शोध पत्र।
3. **समीक्षात्मक शोध (Systematic Review Papers):** समकालीन साहित्यिक एवं सामाजिक शोध प्रवृत्तियों का समालोचनात्मक सर्वेक्षण।
4. **शोध सारांश / प्रस्ताव (Synopsis):** विभागीय शोध समिति (DRC/RAC) पंजीकरण स्वीकृति मानक रूपरेखा।
5. **अकादमिक ग्रंथ लेखन (Scholarly Books):** 100, 200 एवं 300 पृष्ठों के संदर्भ ग्रंथ एवं मोनोग्राफ (ISBN मानक सहित)।

#### प्रामाणिक भाषा मानक:
- **वैज्ञानिक तथा तकनीकी शब्दावली आयोग (CSTT), शिक्षा मंत्रालय, भारत सरकार** द्वारा स्वीकृत मानक पारिभाषिक शब्दावली का प्रयोग।
- मानक यूनिकोड (Mangal / Devanagari) में त्रुटिहीन टाइपिंग एवं प्रूफरीडिंग।
- 0% AI लेखन एवं शत-प्रतिशत मौलिक बौद्धिक शोध।`,
      suggestedChips: [
        'हिंदी कार्य का कोटेशन प्राप्त करें',
        'शोध पत्र संरचना',
        'व्हाट्सएप पर संपर्क करें',
      ],
      actionLink: { label: 'Explore Hindi Services →', href: '/services' },
    }),
  },

  // ─── Client Portal & Authentication Guidance ───────────────────────────────
  {
    id: 'client_portal_access',
    keywords: [
      'client portal', 'login', 'sign in', 'account', 'otp', 'google login',
      'dashboard', 'check status', 'track project', 'my project', 'portal',
    ],
    handler: () => ({
      botMessage: `### 🔐 InkMonk Client Portal Access

Our encrypted Client Portal enables scholars to monitor project milestones, review chapter drafts, download similarity certificates, and submit technical queries directly to directors Tuhit Roy and Sampreeti Mukherjee:

#### Two Fast & Secure Authentication Methods:
1. **Continue with Google (OAuth):** Instant one-click sign in.
2. **6-Digit Email OTP:** Passwordless numeric verification code sent directly to your email inbox.

Click below to access your scholar dashboard:`,
      suggestedChips: [
        'Open Client Portal',
        'Get a Project Estimate',
        'Contact via WhatsApp',
      ],
      actionLink: { label: 'Open Client Portal →', href: '/client' },
    }),
  },

  // ─── Contact & Office Leadership ───────────────────────────────────────────
  {
    id: 'contact_leadership',
    keywords: [
      'contact', 'phone', 'whatsapp', 'email', 'office', 'address',
      'location', 'tuhit roy', 'sampreeti mukherjee', 'kolkata', 'salt lake',
      'talk to founder', 'speak with director',
    ],
    handler: () => ({
      botMessage: `### 📍 Consult Directly with InkMonk Research Leadership

We welcome scholars to consult directly with our co-founders for custom project scoping, milestone agreements, and pre-signed mutual NDAs:

- **Leadership:** **Tuhit Roy** (Founder) & **Sampreeti Mukherjee** (Co-Founder)
- **Official WhatsApp / Phone:** [\`+91 7980470880\`](https://wa.me/917980470880) *(Direct scholar line)*
- **Official Email:** \`inkmonkresearch@gmail.com\` / \`support@inkmonkresearch.com\`
- **Registered Office:** Karunamoyee, Sector 2, Salt Lake, Kolkata, West Bengal 700091, India
- **Consultation Hours:** Monday – Saturday, 9:00 AM – 8:00 PM IST

How would you prefer to get in touch?`,
      suggestedChips: [
        'Message on WhatsApp',
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

  // ─── Estimator & Pricing Guidance ──────────────────────────────────────────
  {
    id: 'pricing_estimator_route',
    keywords: [
      'estimate', 'quote', 'cost', 'pricing', 'price', 'rate', 'fees',
      'how much', 'charge', 'calculator', 'package', 'discount',
    ],
    handler: () => ({
      botMessage: `### 💰 Instant Academic Quotation & Timeline Estimator

At InkMonk Research, all project quotations are tailored deterministically to your **technical complexity**, **word count**, **target journal standard (Scopus/IEEE/UGC-CARE)**, and **language (English or Hindi)**:

#### Core Project Offerings Available in our Quote Engine:
- **Ph.D. Theses & Master Dissertations:** Complete 5-chapter volumes with 4-stage milestone escrow.
- **Research Papers:** Full empirical IMRaD drafts formatted to target journal guidelines.
- **PRISMA Systematic Reviews:** Search strings, screening flowcharts, and meta-analyses.
- **Academic Synopses & Proposals:** Formulated for university DRC approval.
- **Computational Models & Code:** PyTorch, TensorFlow, MATLAB simulations, and Docker containers.
- **Instructor Turnitin Scans:** 100% safe non-repository originality audits with express 15–30 min turnaround.

Use our interactive on-site estimator to calculate your exact milestone timeline and customized breakdown:`,
      suggestedChips: [
        'Open Interactive Estimator',
        'Thesis & IMRaD Structure',
        'Plagiarism & AI-Check Standards',
        'Contact via WhatsApp',
      ],
      actionLink: { label: 'Calculate Your Instant Estimate →', href: '/quote' },
    }),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. UNIVERSAL SCHOLARLY FALLBACK & REASONING ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function generateUniversalScholarlyResponse(query: string, context: StellaContext): StellaResponse {
  // Extract key topic nouns and clean punctuation
  const cleanTokens = query
    .replace(/[^\w\s-]/gi, '')
    .split(/\s+/)
    .filter(
      (w) =>
        w.length > 2 &&
        ![
          'what', 'how', 'when', 'where', 'which', 'who', 'why',
          'does', 'explain', 'tell', 'help', 'about', 'with', 'from',
          'this', 'that', 'have', 'been', 'give', 'want', 'need', 'please',
        ].includes(w.toLowerCase())
    );

  const topicPhrase = cleanTokens.length > 0 ? cleanTokens.join(' ') : 'your specific research inquiry';

  return {
    botMessage: `### 🎓 Comprehensive Academic Consultation: "${topicPhrase}"

As your **Academic Concierge**, here is an authoritative, step-by-step scholarly framework for addressing **${topicPhrase}** in peer-reviewed journals and doctoral dissertations:

#### 1. Conceptual Framing & Problem Positioning
- **Establish Scholarly Context:** Connect ${topicPhrase} to primary theoretical frameworks in your discipline.
- **Isolate the Unresolved Gap:** Demonstrate why existing publications have not fully resolved this issue. Why does this inquiry matter to independent peer reviewers?

#### 2. Methodological & Empirical Rigor
- **Operationalization:** Clearly define and operationalize all dependent and independent variables or qualitative constructs.
- **Sampling & Validity:** Ensure your sample size is mathematically justified (Yamane/Cochran/G*Power) or that your qualitative purposive criteria demonstrate adequate data saturation.
- **Standardized Instrumentation:** Use validated measurement scales (testing Cronbach’s $\\alpha \\ge 0.70$) or calibrated experimental hardware.

#### 3. Manuscript & Dissertation Integration
- **IMRaD Alignment:** Embed the methodology transparently in Section 3 and discuss contradictory evidence frankly in the Discussion section.
- **Citation Integrity:** Format all references strictly to your target guidelines (IEEE, APA 7th, Harvard, or Chicago) with zero non-peer-reviewed blog citations.
- **Turnitin Originality:** Verify zero repository retention to guarantee intellectual property safety.

#### 4. How InkMonk Research Can Support You:
Our doctoral directors, **Tuhit Roy** and **Sampreeti Mukherjee**, provide dedicated 1-on-1 mentorship, structural drafting, statistical validation, and pre-submission peer review proofing.

Would you like an exact milestone timeline or customized project quotation for this study?`,
    suggestedChips: [
      'Get a Project Estimate',
      'Thesis & IMRaD Structure',
      'Journal Formatting (IEEE/APA)',
      'Plagiarism & AI-Check Standards',
      'Consult on WhatsApp',
    ],
    actionLink: { label: 'Calculate Instant Estimate →', href: '/quote' },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CONVERSATIONAL BOOKING & ESTIMATE STATE ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function handleBookingFlow(query: string, context: StellaContext): StellaResponse {
  if (!context.booking) {
    context.booking = { step: 'LANGUAGE', history: [] };
  }

  const booking = context.booking;
  const lq = query.toLowerCase();

  // Global commands within booking flow
  if (lq.includes('start over') || lq.includes('restart') || lq.includes('reset')) {
    context.booking = { step: 'LANGUAGE', history: [] };
    return {
      botMessage: `### 🔄 Quotation Wizard Reset

Let's start fresh. I will guide you one question at a time to calculate your transparent estimate.

**Step 1 of 6: Which language will your research or manuscript be conducted in?**`,
      suggestedChips: [
        'English Academic Writing',
        'Hindi Academic Research (हिंदी)',
        'Turnitin AI & Plagiarism Scan',
      ],
    };
  }

  if (lq === 'back' || lq === '← back' || lq.includes('previous step')) {
    if (booking.history && booking.history.length > 0) {
      const prev = booking.history.pop()!;
      booking.step = prev.step;
      booking.language = prev.language;
      booking.service = prev.service;
      booking.workType = prev.workType;
      booking.package = prev.package;
      booking.domain = prev.domain;
      booking.topic = prev.topic;
      booking.deadline = prev.deadline;
      booking.remarks = prev.remarks;
      booking.quantity = prev.quantity;
    } else {
      booking.step = 'LANGUAGE';
    }
  }

  // ─── STEP: LANGUAGE ────────────────────────────────────────────────────────
  if (booking.step === 'LANGUAGE') {
    if (lq.includes('turnitin') || lq.includes('plagiarism')) {
      booking.history = booking.history || [];
      booking.history.push({ ...booking });
      booking.language = 'TURNITIN';
      booking.service = 'TURNITIN_REPORT';
      booking.workType = 'NA';
      booking.step = 'TURNITIN_FILES';
      return {
        botMessage: `### 🛡️ Turnitin Originality & AI Writing Audit

Our scans utilize official **instructor-tier, 100% safe non-repository accounts** (your manuscript is never deposited or indexed in university databases).

**How many manuscripts or files would you like verified?** (Rate: ₹200 per file)`,
        suggestedChips: [
          '1 File (₹200)',
          '2 Files (₹400)',
          '3 Files (₹600)',
          '5 Files (₹1,000)',
          '← Back',
        ],
      };
    }

    if (lq.includes('hindi') || lq.includes('हिंदी')) {
      booking.history = booking.history || [];
      booking.history.push({ ...booking });
      booking.language = 'HI';
      booking.step = 'SERVICE';
      return {
        botMessage: `### 📚 शोध सेवा का चयन करें (हिंदी शोध प्रभाग)

InkMonk Research के विशिष्ट **हिंदी एवं देवनागरी शोध प्रभाग** में आपका स्वागत है।

**चरण 2/6: आपको किस अकादमिक सेवा की आवश्यकता है?**`,
        suggestedChips: [
          'शोध पत्र (Research Paper)',
          'शोध प्रबंध (Ph.D. Thesis / Dissertation)',
          'समीक्षा पत्र (Review Paper)',
          'सिनॉप्सिस / शोध प्रस्ताव (Synopsis)',
          'पुस्तक लेखन (Book Writing)',
          'देवनागरी लेख (Article Writing)',
          'अकादमिक प्रस्तुति (PPT Making)',
          '← Back',
          '🔄 Start Over',
        ],
      };
    }

    // Default to English
    booking.history = booking.history || [];
    booking.history.push({ ...booking });
    booking.language = 'EN';
    booking.step = 'SERVICE';
    return {
      botMessage: `### 📚 Select Academic Service
**Step 2 of 6: Which scholarly service do you require?**
- **Research Paper:** Empirical / theoretical draft conforming to IEEE, Springer, Elsevier, or Scopus.
- **Ph.D. Thesis / Dissertation:** Complete 5-chapter doctoral thesis with 4-stage milestone escrow.
- **Review Paper:** PRISMA 2020 systematic review & bibliometric meta-analysis.
- **Synopsis / Proposal:** Ph.D. registration proposal for university DRC committees.
- **Book Writing:** Full academic monograph (100–300 pages) with ISBN formatting.
- **Article Writing:** Peer-reviewed scholarly article or book chapter.`,
      suggestedChips: [
        'Research Paper Writing',
        'Review Paper Writing',
        'Thesis Writing',
        'Book Writing',
        'Synopsis / Proposal',
        'Article Writing',
        'PPT Making',
        'Model Implementation',
        '← Back',
        '🔄 Start Over',
      ],
    };
  }

  // ─── STEP: TURNITIN FILES ──────────────────────────────────────────────────
  if (booking.step === 'TURNITIN_FILES') {
    const fileMatch = query.match(/\d+/);
    const files = fileMatch ? Math.max(1, parseInt(fileMatch[0], 10)) : 1;
    booking.quantity = files;
    booking.step = 'SUMMARY';

    const quote = calculateQuote({
      language: 'TURNITIN',
      service: 'TURNITIN_REPORT',
      quantity: files,
    });

    const waText = encodeURIComponent(
      `Hello InkMonk Research Team,\n\nI want to request Turnitin scan verification:\n- Files: ${files}\n- Estimated Fee: ${quote.totalFormatted}\n- Protocol: Safe Non-Repository\n\nPlease confirm report turnaround time.`
    );

    return {
      botMessage: `### 💎 Official Turnitin Project Quotation

#### 📋 Audit Specifications:
- **Service:** Turnitin AI & Plagiarism Verification Audit
- **Files Scanned:** ${files} ${files > 1 ? 'files' : 'file'}
- **Total Estimated Price:** **${quote.totalFormatted}** (₹200/file)
- **Turnaround:** Express 15–30 minutes
- **Database Protocol:** 100% Safe Non-Repository (Manuscripts are NEVER indexed or submitted to public databases)

#### 🛡️ Deliverables Included:
- Official instructor-grade color-coded similarity PDF
- Turnitin proprietary AI-generated writing percentage indicator
- Clickable primary source matches and cross-repository verification

Would you like to connect directly on WhatsApp to submit your files, or configure online?`,
      suggestedChips: [
        '💬 Chat on WhatsApp with Directors',
        '📄 Open Full Quotation on Site',
        '🔄 Start Over',
      ],
      actionLink: {
        label: 'Open Turnitin Scan Order →',
        href: `/quote?type=TURNITIN&quantity=${files}`,
      },
    };
  }

  // ─── STEP: SERVICE ─────────────────────────────────────────────────────────
  if (booking.step === 'SERVICE') {
    let selectedSvc = 'RESEARCH_PAPER';
    let defaultPkg: string | undefined = 'UPTO_6000_WORDS';

    if (lq.includes('thesis') || lq.includes('dissertation') || lq.includes('प्रबंध')) {
      selectedSvc = 'THESIS';
      defaultPkg = 'WITH_MODEL';
    } else if (lq.includes('review') || lq.includes('समीक्षा')) {
      selectedSvc = 'REVIEW_PAPER';
      defaultPkg = 'UPTO_6000_WORDS';
    } else if (lq.includes('book') || lq.includes('पुस्तक')) {
      selectedSvc = 'BOOK';
      defaultPkg = 'BOOK_100';
    } else if (lq.includes('synopsis') || lq.includes('proposal') || lq.includes('प्रस्ताव')) {
      selectedSvc = 'SYNOPSIS';
      defaultPkg = undefined;
    } else if (lq.includes('article') || lq.includes('लेख')) {
      selectedSvc = 'ARTICLE';
      booking.quantity = 2000;
      defaultPkg = undefined;
    } else if (lq.includes('ppt') || lq.includes('presentation') || lq.includes('प्रस्तुति')) {
      selectedSvc = 'PPT';
      booking.quantity = 15;
      defaultPkg = undefined;
    } else if (lq.includes('model') || lq.includes('code') || lq.includes('मॉडल')) {
      selectedSvc = 'MODEL';
      defaultPkg = 'MODEL_SMALL';
    }

    booking.history = booking.history || [];
    booking.history.push({ ...booking });
    booking.service = selectedSvc;
    booking.package = defaultPkg;
    booking.step = 'WORK_TYPE';

    const isHindi = booking.language === 'HI';
    return {
      botMessage: isHindi
        ? `### 🔬 विषय क्षेत्र एवं तकनीकी स्तर का चयन
**चरण 3/6: आपका शोध क्षेत्र क्या है? क्या आपके शोध में तकनीकी मॉडल / कोडिंग शामिल है अथवा यह गैर-तकनीकी (सैद्धांतिक, मानविकी, सामाजिक विज्ञान या विधि) है?**`
        : `### 🔬 Academic Domain & Complexity
**Step 3 of 6: What is your academic domain or subject discipline? Is your study technical (with code, algorithms, or simulation) or non-technical (theoretical, social sciences, humanities, or law)?**`,
      suggestedChips: isHindi
        ? [
            'गैर-तकनीकी (मानविकी, समाजशास्त्र, साहित्य, विधि)',
            'तकनीकी (कंप्यूटर साइंस, AI/ML, इंजीनियरिंग, डेटा)',
            'Skip',
            '← Back',
            '🔄 Start Over',
          ]
        : [
            'Non-Technical (Humanities, Social Sciences, Law, Mgmt)',
            'Technical (Computer Science, AI/ML, Engineering, Data)',
            'Life Sciences / Medical',
            'Skip',
            '← Back',
            '🔄 Start Over',
          ],
    };
  }

  // ─── STEP: WORK_TYPE (DOMAIN) ──────────────────────────────────────────────
  if (booking.step === 'WORK_TYPE') {
    let wt: 'TECH' | 'NON_TECH' = 'NON_TECH';
    if (lq.includes('tech') && !lq.includes('non-tech') && !lq.includes('गैर-तकनीकी')) {
      wt = 'TECH';
    } else if (lq.includes('computer') || lq.includes('ai') || lq.includes('engineering') || lq.includes('data')) {
      wt = 'TECH';
    }

    booking.history = booking.history || [];
    booking.history.push({ ...booking });
    booking.workType = wt;
    booking.domain = query !== 'Skip' ? query : 'General Academic Domain';
    booking.step = 'TOPIC';

    const isHindi = booking.language === 'HI';
    return {
      botMessage: isHindi
        ? `### 🎯 शोध विषय / शीर्षक (Topic)
**चरण 4/6: आपके शोध पत्र या प्रबंध का प्रस्तावित शीर्षक या विषय क्या है?**
*(आप अपना विषय नीचे टाइप कर सकते हैं, अथवा विषय निर्धारण हेतु परामर्श ले सकते हैं):*`
        : `### 🎯 Research Topic / Working Title
**Step 4 of 6: What is your proposed research topic, title, or hypothesis?**
*(You can type your exact topic below, or skip if you want our directors to assist in topic formulation):*`,
      suggestedChips: isHindi
        ? [
            'Education policy',
            'विषय निर्धारण परामर्श चाहिए',
            'Skip topic for now',
            '← Back',
            '🔄 Start Over',
          ]
        : [
            'Education policy',
            'Need topic scoping consultation',
            'Skip topic for now',
            '← Back',
            '🔄 Start Over',
          ],
    };
  }

  // ─── STEP: TOPIC ───────────────────────────────────────────────────────────
  if (booking.step === 'TOPIC') {
    let topic = query.trim();
    if (lq.includes('skip') || lq.includes('consultation') || lq.includes('परामर्श')) {
      topic = 'Topic scoping consultation requested';
    }

    booking.history = booking.history || [];
    booking.history.push({ ...booking });
    booking.topic = topic;
    booking.step = 'DEADLINE';

    const isHindi = booking.language === 'HI';
    return {
      botMessage: isHindi
        ? `### ⏱️ पूर्णता समय-सीमा (Target Deadline)
**चरण 5/6: आपके शोध को पूर्ण करने की लक्षित समय-सीमा क्या है?**`
        : `### ⏱️ Target Completion Deadline
**Step 5 of 6: What is your target completion timeline or deadline?**`,
      suggestedChips: isHindi
        ? [
            '21 days',
            'मानक (15–21 दिन)',
            'अति-आवश्यक (7–10 दिन)',
            'विस्तृत (30+ दिन)',
            '← Back',
            'Skip',
            '🔄 Start Over',
          ]
        : [
            '21 days',
            'Standard (15–21 days)',
            'Urgent (7–10 days)',
            'Extended (30+ days)',
            '← Back',
            'Skip',
            '🔄 Start Over',
          ],
    };
  }

  // ─── STEP: DEADLINE ────────────────────────────────────────────────────────
  if (booking.step === 'DEADLINE') {
    let dl = query.trim();
    if (lq.includes('skip') || !dl) {
      dl = '21 days';
    }

    booking.history = booking.history || [];
    booking.history.push({ ...booking });
    booking.deadline = dl;
    booking.step = 'REMARKS';

    const isHindi = booking.language === 'HI';
    return {
      botMessage: isHindi
        ? `### 📝 विशिष्ट निर्देश एवं प्रारूप (Remarks & Guidelines)
**चरण 6/6: क्या आपकी कोई विशिष्ट पत्रिका दिशानिर्देश (जैसे UGC-CARE, Scopus), शब्द सीमा या अतिरिक्त निर्देश हैं?**`
        : `### 📝 Specific Guidelines & Remarks
**Step 6 of 6: Do you have any specific formatting requirements, target journals (e.g. Scopus, IEEE, UGC-CARE), word counts, or extra remarks?**`,
      suggestedChips: isHindi
        ? [
            'मानक यूजीसी केयर प्रारूप',
            'Scopus / Web of Science दिशानिर्देश',
            'Skip extra remarks',
            '← Back',
            '🔄 Start Over',
          ]
        : [
            'Standard Journal Guidelines',
            'Target Scopus / IEEE',
            'Target UGC-CARE',
            'Skip extra remarks',
            '← Back',
            '🔄 Start Over',
          ],
    };
  }

  // ─── STEP: REMARKS -> GENERATE FINAL ESTIMATE ──────────────────────────────
  if (booking.step === 'REMARKS' || booking.step === 'SUMMARY') {
    if (query !== 'Skip extra remarks' && !lq.includes('skip')) {
      booking.remarks = query.trim();
    }
    booking.step = 'SUMMARY';

    const lang = booking.language || 'EN';
    const wt = booking.workType || 'NON_TECH';
    const svc = booking.service || 'RESEARCH_PAPER';
    const pkg = booking.package || (svc === 'RESEARCH_PAPER' ? 'UPTO_6000_WORDS' : undefined);
    const qty = booking.quantity || (['ARTICLE', 'ASSIGNMENTS'].includes(svc) ? 2000 : svc === 'PPT' ? 15 : undefined);

    let quoteRes;
    try {
      quoteRes = calculateQuote({
        language: lang,
        workType: wt,
        service: svc,
        package: pkg,
        quantity: qty,
      });
    } catch {
      // Graceful fallback to default catalogue price if params slightly diverge
      quoteRes = {
        totalPaise: lang === 'HI' ? 699900 : wt === 'TECH' ? 899800 : 499900,
        totalFormatted: lang === 'HI' ? '₹6,999' : wt === 'TECH' ? '₹8,998' : '₹4,999',
        breakdown: [{ label: `${SERVICE_DISPLAY_NAMES[svc] || svc} Writing`, amountPaise: 499900 }],
      };
    }

    const refCode = `IMR-EST-${Math.floor(1000 + Math.random() * 9000)}`;
    const topicText = booking.topic || 'Education policy';
    const deadlineText = booking.deadline || '21 days';
    const svcDisplay = SERVICE_DISPLAY_NAMES[svc] || svc;
    const isHindi = lang === 'HI';

    const breakdownLines = quoteRes.breakdown
      .map((b) => `${b.label}: ₹${(b.amountPaise / 100).toLocaleString('en-IN')}`)
      .join(' + ');

    const waText = encodeURIComponent(
      `Hello InkMonk Research Team,\n\nI configured an estimate with Stella:\n- Ref: ${refCode}\n- Service: ${svcDisplay}\n- Language: ${isHindi ? 'Hindi' : 'English'}\n- Tier: ${wt === 'TECH' ? 'Technical' : 'Non-Technical'}\n- Topic: ${topicText}\n- Deadline: ${deadlineText}\n- Estimated Total: ${quoteRes.totalFormatted}\n\nPlease confirm availability.`
    );

    const quotePageUrl = `/quote?lang=${lang}&service=${svc}&workType=${wt}&domain=${encodeURIComponent(topicText)}&deadline=${encodeURIComponent(deadlineText)}${pkg ? `&package=${pkg}` : ''}`;

    return {
      botMessage: isHindi
        ? `### 💎 आधिकारिक परियोजना कोटेशन एवं कार्ययोजना
**कोटेशन संदर्भ कोड:** \`${refCode}\`

#### 📋 परियोजना विनिर्देश:
- **भाषा:** हिंदी शोध प्रभाग (मानक देवनागरी)
- **सेवा:** ${svcDisplay}
- **प्रकार:** ${wt === 'TECH' ? 'तकनीकी (मॉडल/कोडिंग सहित)' : 'गैर-तकनीकी (सैद्धांतिक एवं शोध समीक्षा)'}
- **विषय:** ${topicText}
- **लक्षित समय-सीमा:** ${deadlineText}

#### 💰 निर्धारित शुल्क एवं भुगतान:
- **कुल अनुमानित शुल्क:** **${quoteRes.totalFormatted}**
- **विस्तृत दर विभाजन:** ${breakdownLines}
- **चरणबद्ध भुगतान:** 4 किश्तों में समीक्षा आधारित एस्क्रो (25% प्रति चरण)
- **समय-सीमा:** आपके निर्धारित ${deadlineText} के भीतर पूर्ण

#### 🛡️ अकादमिक निष्ठा एवं सुरक्षा:
- **संशोधन:** सुपुर्दगी के 30 दिनों के भीतर 2 चरणबद्ध संशोधन सम्मिलित
- **मौलिकता:** टर्निटिन सुरक्षित नॉन-रिपॉजिटरी जांच (0% AI योगदान)
- **गोपनीयता:** पूर्व-हस्ताक्षरित परस्पर गोपनीयता समझौते (NDA) द्वारा सुरक्षित

क्या आप निदेशकों से WhatsApp पर तुरंत चर्चा करना चाहते हैं अथवा वेबसाइट पर कोटेशन सुरक्षित करना चाहते हैं?`
        : `### 💎 Official Project Quotation & Milestone Summary
**Quotation Reference:** \`${refCode}\`

#### 📋 Project Specifications:
- **Language:** English Academic Writing
- **Service:** ${svcDisplay}
- **Technical Tier:** ${wt === 'TECH' ? 'Technical (With Model/Computational Implementation)' : 'Non-Technical (Theoretical / Editorial Rigor)'}
- **Topic:** ${topicText}
- **Target Deadline:** ${deadlineText}
- **Guidelines:** ${booking.remarks || 'Standard International Journal Guidelines'}

#### 💰 Calculated Fee & Schedule:
- **Total Estimated Fee:** **${quoteRes.totalFormatted}**
- **Itemized Breakdown:** ${breakdownLines}
- **Milestone Structure:** 4-stage chapter milestone escrow (25% per verified milestone)
- **Turnaround:** Delivered within your stated ${deadlineText} target

#### 🛡️ Academic Guarantees:
- **Revisions:** 2 rounds of peer-review revisions included within 30 days of delivery
- **Originality:** Zero generative AI writing with verified Turnitin originality receipt
- **Confidentiality:** 100% intellectual property ownership under pre-signed mutual NDA

Would you like to connect directly with our directors on WhatsApp or open this quotation on our website?`,
      suggestedChips: [
        '💬 Chat on WhatsApp with Directors',
        '📄 Open Full Quotation on Site',
        '🔄 Start Over',
      ],
      actionLink: {
        label: 'Open & Save Quote on Site →',
        href: quotePageUrl,
      },
    };
  }

  // Safety fallback
  return {
    botMessage: `Please select an option to proceed with your quotation, or click 'Start Over' to reset.`,
    suggestedChips: ['← Back', '🔄 Start Over'],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. MAIN PROCESSOR (CONVERSATIONAL BOOKING + SEMANTIC INTENT MATCHING)
// ─────────────────────────────────────────────────────────────────────────────

export function processStellaQuery(
  rawQuery: string,
  context: StellaContext = { turnCount: 0 }
): StellaResponse {
  const query = rawQuery.trim();
  const lowerQuery = query.toLowerCase();

  // Empty query guard
  if (!query) {
    return {
      botMessage: `Hello! I am **Stella**, your encyclopedic Academic Concierge at **InkMonk Research**. 

I can answer any question regarding:
- **Manuscript Architecture & IMRaD Structure**
- **Doctoral Theses & Viva Voce Defense**
- **Statistical Tests & Research Methodologies**
- **PRISMA 2020 Systematic Reviews & Meta-Analyses**
- **Citation Guidelines (IEEE, APA 7th, Harvard, Chicago, MLA)**
- **Turnitin Originality & AI Writing Standards**
- **Scopus / Web of Science Journal Selection**

How can I assist your scholarly journey today?`,
      suggestedChips: [
        'Journal Formatting (IEEE/APA)',
        'Thesis & IMRaD Structure',
        'Statistical Data Analysis',
        'Get a Project Estimate',
      ],
    };
  }

  // 1. Check if user is currently inside an active booking flow
  if (context.booking && context.booking.step !== 'IDLE') {
    // If user asks a totally off-flow ethical question, let ethics guardrail take precedence
    for (const pattern of UNETHICAL_PATTERNS) {
      if (pattern.test(lowerQuery)) {
        return INTENT_RULES[0].handler(query, context);
      }
    }
    return handleBookingFlow(query, context);
  }

  // 2. Check if user wants to start the booking conversation or greeting
  const isGreetingOrBooking =
    lowerQuery === 'hi' ||
    lowerQuery === 'hello' ||
    lowerQuery === 'hey' ||
    lowerQuery === 'hola' ||
    lowerQuery === 'namaste' ||
    lowerQuery === 'नमस्ते' ||
    lowerQuery === 'start' ||
    lowerQuery === 'book' ||
    lowerQuery === 'booking' ||
    lowerQuery === 'quote' ||
    lowerQuery === 'estimate' ||
    lowerQuery === 'pricing' ||
    lowerQuery === 'cost' ||
    lowerQuery.includes('get a project estimate') ||
    lowerQuery.includes('open interactive estimator') ||
    lowerQuery.includes('calculate quote') ||
    lowerQuery.includes('start quote');

  if (isGreetingOrBooking) {
    context.booking = { step: 'LANGUAGE', history: [] };
    const isHindi = lowerQuery.includes('namaste') || lowerQuery.includes('नमस्ते') || lowerQuery.includes('हिंदी');
    return {
      botMessage: isHindi
        ? `### 👋 नमस्ते! मैं स्टेला हूँ — आपकी अकादमिक सलाहकार

**InkMonk Research** में आपका स्वागत है। मैं आपके शोध कार्य के लिए पारदर्शी कोटेशन तैयार करने में आपकी सहायता करूँगी।

**चरण 1/6: आपका शोध या पांडुलिपि किस भाषा में तैयार की जानी है?**`
        : `### 👋 Greetings from Stella • Academic Concierge

Welcome to **InkMonk Research**! I will assist you in configuring your project scope and calculate an exact, transparent estimate according to our schedule.

**Step 1 of 6: Which language will your research or manuscript be conducted in?**`,
      suggestedChips: [
        'English Academic Writing',
        'Hindi Academic Research (हिंदी)',
        'Turnitin AI & Plagiarism Scan',
      ],
    };
  }

  // 3. Multi-pass semantic matcher: calculate best scoring rule across encyclopedic knowledge base
  let bestRule: IntentRule | null = null;
  let bestScore = 0;

  for (const rule of INTENT_RULES) {
    let score = 0;

    for (const kw of rule.keywords) {
      if (typeof kw === 'string') {
        const lowerKw = kw.toLowerCase();
        if (lowerQuery === lowerKw) {
          score += 15; // exact match
        } else if (lowerQuery.includes(lowerKw)) {
          score += lowerKw.split(' ').length * 3; // phrase match weighted by word count
        }
      } else if (kw instanceof RegExp) {
        if (kw.test(lowerQuery)) {
          score += 20; // high priority regex match (e.g. guardrails)
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  // If a high-confidence intent is found (score >= 3), execute its handler
  if (bestRule && bestScore >= 3) {
    context.lastTopic = bestRule.id;
    context.turnCount += 1;
    return bestRule.handler(query, context);
  }

  // Fallback to Universal Scholarly Reasoning Engine
  context.turnCount += 1;
  return generateUniversalScholarlyResponse(query, context);
}
