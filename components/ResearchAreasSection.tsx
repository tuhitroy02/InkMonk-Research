'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface ResearchArea {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  image: string;
  desc: string;
  subfields: string[];
  standards: string;
}

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'engineering-tech',
    name: 'Engineering & Technology',
    category: 'STEM & Engineering',
    image: '/research-areas/engineering.jpg',
    desc: 'Experimental design, finite element modeling (FEM), computational simulations, and technical manuscript drafting across all engineering branches.',
    subfields: [
      'Electrical & Electronics Engineering',
      'Mechanical & Aerospace Systems',
      'Civil & Structural Engineering',
      'Chemical & Materials Engineering',
      'Robotics & Industrial Automation',
      'Biomedical Engineering & Devices',
    ],
    standards: 'IEEE, ASME, ASCE, Elsevier, Springer',
  },
  {
    id: 'computer-science-ai',
    name: 'Computer Science & Artificial Intelligence',
    category: 'STEM & Computing',
    image: '/research-areas/computer-science.jpg',
    desc: 'State-of-the-art computational algorithms, deep neural network architectures (PyTorch/CUDA), and empirical benchmarking with reproducible codebases.',
    subfields: [
      'Machine Learning & Deep Learning (CNN, LSTM, Transformers)',
      'Natural Language Processing (LLM Finetuning & Tokenization)',
      'Computer Vision & Medical Image Segmentation',
      'Cybersecurity, Cryptography & Network Intrusion',
      'Cloud Computing, Distributed Systems & DevOps',
      'Blockchain, Smart Contracts & Distributed Ledgers',
    ],
    standards: 'IEEE Transactions, ACM, Springer LNCS, Scopus Q1',
  },
  {
    id: 'medicine-health',
    name: 'Medicine & Health Sciences',
    category: 'Life & Clinical Sciences',
    image: '/research-areas/medicine.jpg',
    desc: 'Biomedical investigations, clinical trials analysis, epidemiological surveys, and pharmacological literature reviews adhering to strict medical publication ethics.',
    subfields: [
      'Clinical Medicine & Surgical Studies',
      'Public Health, Epidemiology & Global Health',
      'Pharmacology & Drug Delivery Formulations',
      'Biostatistics & Survival Analysis (R/SPSS/STATA)',
      'Nursing Informatics & Patient Care Systems',
      'Healthcare Management & Health Economics',
    ],
    standards: 'ICMJE, PubMed, The Lancet / BMJ guidelines, APA 7th',
  },
  {
    id: 'natural-sciences',
    name: 'Natural & Physical Sciences',
    category: 'Foundational Sciences',
    image: '/research-areas/natural-sciences.jpg',
    desc: 'Rigorous theoretical formulations, laboratory experimental synthesis, and quantitative data modeling across fundamental sciences.',
    subfields: [
      'Theoretical & Quantum Physics',
      'Organic, Inorganic & Analytical Chemistry',
      'Cellular & Molecular Biology',
      'Pure & Applied Mathematics (Stochastic, PDEs)',
      'Biotechnology & Genetic Engineering',
      'Materials Science & Nanotechnology',
    ],
    standards: 'Nature, Science, ACS, APS, Royal Society of Chemistry',
  },
  {
    id: 'environmental-sciences',
    name: 'Environmental Sciences & Sustainability',
    category: 'Environmental Sciences',
    image: '/research-areas/environmental.jpg',
    desc: 'Climate impact assessments, ecological biodiversity modeling, renewable energy lifecycle analysis, and sustainable urban environmental policies.',
    subfields: [
      'Climate Dynamics & Meteorological Modeling',
      'Ecology, Biodiversity & Conservation Biology',
      'Renewable Energy Systems (Solar, Wind, Biomass)',
      'Waste Management & Circular Bio-Economy',
      'Hydrology, Water Resources & Soil Conservation',
      'Environmental Impact Assessment (EIA) & Policy',
    ],
    standards: 'IPCC Guidelines, Elsevier Environmental, UGC-CARE',
  },
  {
    id: 'economics-finance',
    name: 'Economics, Management & Finance',
    category: 'Commerce & Management',
    image: '/research-areas/business.jpg',
    desc: 'Quantitative econometrics, corporate financial modeling, behavioral consumer dynamics, and strategic organizational management research.',
    subfields: [
      'Econometric Modeling (Time-Series, GARCH, Panel Data)',
      'Corporate Finance, Valuation & Capital Markets',
      'FinTech, Digital Currencies & Algorithmic Trading',
      'Strategic Management & Organizational Behavior',
      'Supply Chain Logistics & Operations Research',
      'Marketing Analytics & Consumer Behavior',
    ],
    standards: 'JFE, AER, Harvard Business Review, APA / Chicago',
  },
  {
    id: 'social-sciences',
    name: 'Social Sciences & Humanities',
    category: 'Social Sciences',
    image: '/research-areas/social-sciences.jpg',
    desc: 'Qualitative field studies, sociological theory, historical archival analysis, governance frameworks, and interdisciplinary human inquiry.',
    subfields: [
      'Sociology, Social Stratification & Gender Studies',
      'Political Science, Governance & Public Administration',
      'International Relations & Geopolitics',
      'Cognitive & Developmental Psychology',
      'Pedagogy, Education Policy & NEP 2020 Reforms',
      'Jurisprudence, Human Rights & Constitutional Law',
    ],
    standards: 'APA 7th, Chicago Manual of Style, MLA 9th, UGC-CARE',
  },
  {
    id: 'hindi-vernacular',
    name: 'Hindi & Vernacular Studies (भारतीय भाषा एवं शोध)',
    hindiName: 'हिंदी साहित्य एवं अंतःविषय शोध',
    category: 'Vernacular & Humanities',
    image: '/research-areas/hindi-sahitya.jpg',
    desc: 'Specialized academic research in Hindi supervised by Sampreeti Mukherjee with standard Devanagari vocabulary and Shodhganga compliance.',
    subfields: [
      'हिंदी साहित्य एवं समकालीन विमर्श (कविता, उपन्यास, नाटक)',
      'तुलनात्मक साहित्य एवं अनुवाद सिद्धांत',
      'भारतीय दर्शन, संस्कृति एवं समाजशास्त्र',
      'राष्ट्रीय शिक्षा नीति (NEP 2020) एवं मातृभाषा शिक्षा',
      'देवनागरी पारिभाषिक शब्दावली मानकीकरण',
      'शोध प्रबंध एवं यूजीसी-केयर स्वीकृत प्रारूप',
    ],
    standards: 'Shodhganga (शोधगंगा), UGC-CARE List, Devanagari Standards',
  },
  {
    id: 'language-literature',
    name: 'Language, Literature & Linguistics',
    category: 'Humanities & Culture',
    image: '/research-areas/humanities.jpg',
    desc: 'Critical textual hermeneutics, post-colonial literary discourse, comparative rhetoric, and descriptive/applied linguistics.',
    subfields: [
      'British, American & Post-Colonial English Literature',
      'Literary Theory, Hermeneutics & Psychoanalysis',
      'Applied Linguistics, Phonetics & Syntax',
      'Translation Studies & Cross-Cultural Semiotics',
      'Cultural Studies & Digital Humanities',
      'Discourse Analysis & Media Hermeneutics',
    ],
    standards: 'MLA 9th Edition, MHRA, Chicago Style',
  },
  {
    id: 'agriculture-life',
    name: 'Agriculture & Agronomy',
    category: 'Agricultural Sciences',
    image: '/research-areas/environmental.jpg',
    desc: 'Agronomic field experiment design, crop physiology modeling, soil microbiome analytics, and agribusiness supply economics.',
    subfields: [
      'Agronomy & Precision Agriculture Technologies',
      'Plant Breeding, Genetics & Crop Protection',
      'Soil Science & Agricultural Chemistry',
      'Horticulture, Post-Harvest Tech & Food Science',
      'Agribusiness Management & Rural Development',
      'Sustainable Irrigation & Climate-Resilient Farming',
    ],
    standards: 'ICAR Guidelines, FAO Standards, Springer AgSciences',
  },
  {
    id: 'architecture-planning',
    name: 'Architecture & Urban Planning',
    category: 'Design & Built Environment',
    image: '/research-areas/engineering.jpg',
    desc: 'Spatial urban analysis, sustainable architectural design paradigms, GIS geographic modeling, and resilient city infrastructure.',
    subfields: [
      'Urban Design, Zoning & Smart Cities',
      'Sustainable Architecture & Green Building (LEED/GRIHA)',
      'GIS Spatial Modeling & Remote Sensing Mapping',
      'Transportation Planning & Urban Mobility Networks',
      'Architectural Heritage Conservation & Restoration',
      'Landscape Architecture & Environmental Planning',
    ],
    standards: 'RIBA, Council of Architecture (CoA), Harvard Style',
  },
  {
    id: 'arts-design',
    name: 'Arts, Design & Visual Culture',
    category: 'Creative & Practice-Led',
    image: '/research-areas/business.jpg',
    desc: 'Practice-led academic research, visual culture analysis, industrial product ergonomics, and digital media design theory.',
    subfields: [
      'Visual Arts & Art History Hermeneutics',
      'Industrial Product Design & Ergonomics',
      'Digital Media Arts, UI/UX & Interaction Design',
      'Design Pedagogy & Practice-Led Research (PaR)',
      'Fashion, Textiles & Sustainable Materiality',
      'Museum Studies & Curatorial Research',
    ],
    standards: 'Harvard, Chicago Author-Date, Design Research Society',
  },
];

export default function ResearchAreasSection({ className = "" }: { className?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'STEM & Engineering',
    'STEM & Computing',
    'Life & Clinical Sciences',
    'Foundational Sciences',
    'Social Sciences',
    'Commerce & Management',
    'Vernacular & Humanities',
  ];

  const filtered = selectedCategory === 'ALL'
    ? RESEARCH_AREAS
    : RESEARCH_AREAS.filter((a) => a.category === selectedCategory || (selectedCategory === 'Vernacular & Humanities' && a.id === 'hindi-vernacular'));

  return (
    <section id="research-areas" className={`py-20 px-4 text-center relative bg-notebook-grid ${className}`}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-blue-100 text-[#2563EB] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-blue-200">
            DISCIPLINARY TAXONOMY // ALL SUBJECTS
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 mb-4 text-center">
            Comprehensive Research Areas
          </h2>
          <p className="text-slate-600 text-base sm:text-lg text-center leading-relaxed font-medium">
            Subject-matter doctoral directors and researchers across every major scholarly discipline. Adhering strictly to your field’s publication ethics and citation norms.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#F95721] text-white shadow-[0_4px_0_#C43B00,0_8px_16px_rgba(249,87,33,0.3)] scale-105'
                  : 'bg-white text-slate-700 hover:text-[#F95721] border-2 border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 12 Research Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((area) => (
            <div key={area.id} className="card-clay-white p-6 flex flex-col justify-between text-center items-center h-full group relative">
              
              {/* Top High-Resolution Real Photograph with Category Badge */}
              <div className="relative w-full mb-4">
                <Image
                  src={area.image}
                  alt={area.name}
                  width={400}
                  height={180}
                  className="w-full h-44 object-cover rounded-2xl border-2 border-slate-200/80 shadow-sm group-hover:scale-[1.02] transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 text-[10px] font-black uppercase text-[#2563EB] bg-white/95 border border-blue-200 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                  {area.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="w-full text-center flex flex-col items-center">
                <h3 className="font-serif text-xl font-black text-slate-900 mb-1 group-hover:text-[#F95721] transition-colors text-center">
                  {area.name}
                </h3>
                {area.hindiName && (
                  <div className="text-xs text-[#F95721] font-bold mb-2 text-center">
                    {area.hindiName}
                  </div>
                )}
                <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4 text-center">
                  {area.desc}
                </p>

                {/* Subfield Tags (Centered Bullet List) */}
                <div className="w-full mb-4 pt-3 border-t border-slate-100 text-center">
                  <div className="text-[11px] font-black text-slate-800 mb-2 uppercase tracking-wider text-center">
                    Core Specialized Subfields:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium flex flex-col items-center justify-center">
                    {area.subfields.slice(0, 4).map((sub, i) => (
                      <li key={i} className="flex items-center justify-center gap-2 text-center">
                        <span className="text-[#F95721] font-black text-[10px]">◆</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer with Standards & Action */}
              <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-auto">
                <div className="text-[10px] text-slate-500 text-center">
                  <span className="text-slate-400 block font-bold">STANDARD:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[140px] block">{area.standards}</span>
                </div>
                <Link
                  href={`/quote?domain=${encodeURIComponent(area.name)}`}
                  className="text-xs font-bold text-[#F95721] hover:underline flex items-center gap-1"
                >
                  <span>Request Quote →</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl card-clay-white max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-md">
          <div>
            <div className="text-slate-900 font-serif font-black text-xl">
              Have an Interdisciplinary or Custom Topic?
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">
              Our directors evaluate cross-domain studies (e.g. AI in Healthcare, Econometrics of Climate Policy, Digital Humanities).
            </div>
          </div>
          <Link
            href="/quote"
            className="btn-clay-orange text-xs whitespace-nowrap !py-3 !px-6"
          >
            Configure Custom Topic →
          </Link>
        </div>

      </div>
    </section>
  );
}
