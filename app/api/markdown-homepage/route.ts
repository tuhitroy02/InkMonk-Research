import { NextResponse } from 'next/server';

export async function GET() {
  const markdown = `# InkMonk Research — Academic Writing & Research Consultation

> Premier research and writing services in English and Hindi — research papers, theses, books, articles, presentations, and Turnitin reports. Based in Salt Lake, Kolkata, India.
> Official Website: https://inkmonkresearch.com
> Email: inkmonkresearch@gmail.com | WhatsApp: +91 7980470880
> Office: Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal

---

## About InkMonk Research
InkMonk Research was founded by Tuhit Roy and Sampreeti Mukherjee to support PhD scholars, postgraduate researchers, and academics across India and globally. We uphold 100% intellectual property confidentiality backed by formal NDAs, peer-review submission standards (Scopus, IEEE, Springer, Elsevier, UGC-CARE), and zero-repository Turnitin originality verification.

---

## Academic Divisions & Service Catalogue

### 1. English Scholarly Services
- **Research Paper Writing**: Full IMRaD manuscript with peer-reviewed references adhering to IEEE, Springer, or Elsevier standards.
- **Review Paper Writing**: PRISMA systematic literature reviews and bibliometric citation network mapping.
- **Synopsis / Proposal Writing**: Defensible DRC committee ready doctoral registration proposals.
- **Complete Doctoral Thesis / Dissertation**: Full 5-chapter volume aligned to institutional thesis handbooks with milestone escrow.
- **Scholarly Book Writing**: Monograph volumes and edited collections (100, 200, 300 pages) formatted for ISBN publishing.
- **Academic PPT & Defense**: Widescreen 16:9 slide decks with speaker notes for doctoral defense boards.
- **Academic Article Writing**: Standardized per-word scholarly essays and book chapters with full citation apparatus.

### 2. English Technical Services (with Computational Models & Code)
- **Research Paper with Model**: Theoretical manuscript paired with reproducible machine learning / simulation code.
- **Technical Review Paper**: Comprehensive state-of-the-art computational and algorithmic survey.
- **Technical Synopsis**: Methodological proposal detailing computational architecture, sampling, and validation metrics.
- **Technical Thesis with Model**: Doctoral dissertation with complete working codebase, datasets, and benchmarks.
- **Standalone Computational Models**:
  - Small Models (PyTorch / TensorFlow / Scikit-learn architectures)
  - Complex Deep Learning & Computer Vision Implementations
  - Full Model cum Web Application (Dockerized with Git repository handoff)

### 3. Hindi Academic Services (हिंदी शोध एवं लेखन सेवाएं)
- **Hindi Research Paper (हिंदी शोध पत्र)**: यूजीसी-केयर एवं समकक्ष पत्रिकाओं हेतु मौलिक शोध पत्र।
- **Hindi Review Paper (समीक्षा पत्र)**: समकालीन शोध प्रवृत्तियों का समालोचनात्मक एवं ग्रंथपरक सर्वेक्षण।
- **Hindi Synopsis (शोध प्रस्ताव / सारांश)**: विभागीय शोध समिति (DRC/RAC) पंजीकरण स्वीकृति मानक प्रस्ताव।
- **Hindi Doctoral Thesis (हिंदी शोध प्रबंध)**: शोधगंगा एवं यूजीसी नियमावली अनुरूप संपूर्ण 5-अध्यायी शोध प्रबंध।
- **Hindi Book Writing (पुस्तक लेखन)**: 100, 200 एवं 300 पृष्ठों के अकादमिक ग्रंथ आईएसबीएन प्रारूप सहित।
- **Hindi PPT & Articles**: 16:9 देवनागरी स्लाइड एवं उच्च स्तरीय बौद्धिक आलेख।

*Note: All exact customized pricing and project scopes are calculated dynamically via our Instant Quote Estimator (https://inkmonkresearch.com/quote) or through consultation with our AI Academic Concierge (https://inkmonkresearch.com/chat).*

### 4. Turnitin Originality & AI Verification
- Instructor-level safe non-repository Turnitin checking.
- Digital similarity report with comprehensive source breakdown and AI probability analysis.
- Guaranteed zero indexing (your manuscript will never be stored in the repository).

---

## How It Works (5-Stage Academic Milestone Workflow)
1. **Confidential Enquiry**: Submit requirements, word count, and target journal guidelines via website or WhatsApp.
2. **Transparent Quotation & Scope**: Transparent price calculated with guaranteed delivery milestone.
3. **Structured Milestone Drafting**: Dedicated subject-matter scholar drafts the manuscript chapter by chapter.
4. **Turnitin Originality Check**: Full non-repository similarity verification and formatting proofing.
5. **Final Delivery & Ongoing Support**: Complete editable files (.docx / .tex) delivered with revision support.

---

## Machine-Readable Resources & Tool Access
- **llms.txt**: https://inkmonkresearch.com/llms.txt
- **Sitemap**: https://inkmonkresearch.com/sitemap.xml
- **MCP Server Card**: https://inkmonkresearch.com/.well-known/mcp/server-card.json
- **Instant Quotation Tool**: https://inkmonkresearch.com/quote
- **Interactive AI Chatbot**: https://inkmonkresearch.com/chat
`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'Link': '</llms.txt>; rel="describedby"; type="text/plain", </>; rel="alternate"; type="text/markdown"',
      'Content-Signal': 'search=yes, ai-train=no',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
