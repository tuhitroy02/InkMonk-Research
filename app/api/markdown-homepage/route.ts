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

### 1. English Non-Technical Services
- **Research Paper Writing**: ₹4,999 (Full IMRaD manuscript with peer-reviewed references)
- **Review Paper Writing**: ₹3,999 (PRISMA systematic literature reviews and bibliometric surveys)
- **Synopsis / Proposal Writing**: ₹3,999 (DRC committee ready proposal)
- **Complete Doctoral Thesis / Dissertation**: ₹19,999 (Full 5-chapter volume with literature review)
- **Scholarly Book Writing**:
  - 100 Pages: ₹3,999
  - 200 Pages: ₹7,499
  - 300 Pages: ₹10,999
- **Academic PPT & Defense**: ₹120 per slide
- **Academic Article Writing**: ₹0.60 per word

### 2. English Technical Services (with Computational Models & Code)
- **Research Paper with Model**: ₹8,998 (₹4,999 writing + ₹3,999 computational architecture)
- **Technical Review Paper**: ₹4,499
- **Technical Synopsis**: ₹4,499
- **Technical Thesis with Model**: ₹28,998 (₹20,999 writing + ₹7,999 code)
- **Standalone Computational Models**:
  - Small Model (PyTorch / TensorFlow / Scikit-learn): ₹5,999
  - Big Model Implementation: ₹8,999
  - Full Model cum Web Application (Dockerized): ₹12,999
- **Technical Book Writing**:
  - 100 Pages: ₹4,999
  - 200 Pages: ₹8,499
  - 300 Pages: ₹11,999

### 3. Hindi Academic Services (हिंदी शोध एवं लेखन सेवाएं)
- **Hindi Research Paper (हिंदी शोध पत्र)**: ₹3,999
- **Hindi Review Paper (समीक्षा पत्र)**: ₹2,999
- **Hindi Synopsis (शोध प्रस्ताव / सारांश)**: ₹2,999
- **Hindi Doctoral Thesis (हिंदी शोध प्रबंध)**: ₹14,999
- **Hindi Book Writing**:
  - 100 पृष्ठ: ₹2,999
  - 200 पृष्ठ: ₹5,499
  - 300 पृष्ठ: ₹7,999
- **Hindi PPT**: ₹100 प्रति स्लाइड
- **Hindi Article**: ₹0.50 प्रति शब्द

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
