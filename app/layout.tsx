import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SupabaseAuthProvider } from "@/context/SupabaseAuthContext";
import SupabaseAuthModal from "@/components/SupabaseAuthModal";
import WebMcpProvider from "@/components/WebMcpProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://inkmonkresearch.com"),
  title: {
    default: "InkMonk Research — Research with care. Writing with clarity.",
    template: "%s | InkMonk Research",
  },
  description:
    "InkMonk Research offers premier research and writing services in English and Hindi — research papers, theses, books, articles, presentations, and Turnitin reports. Based in Kolkata.",
  keywords: [
    "research paper writing",
    "thesis writing",
    "academic writing",
    "Hindi research paper",
    "English research paper",
    "Turnitin report",
    "InkMonk Research",
    "Kolkata research writing",
  ],
  authors: [
    { name: "Tuhit Roy" },
    { name: "Sampreeti Mukherjee" },
  ],
  alternates: {
    canonical: "https://inkmonkresearch.com",
    types: {
      "text/markdown": "https://inkmonkresearch.com/api/markdown-homepage",
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  other: {
    "content-signal": "search=yes, ai-train=no",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://inkmonkresearch.com/#organization",
      name: "InkMonk Research",
      legalName: "InkMonk Research",
      url: "https://inkmonkresearch.com",
      logo: "https://inkmonkresearch.com/logo.png",
      image: "https://inkmonkresearch.com/logo.png",
      description:
        "InkMonk Research is an elite academic research, manuscript writing, computational modeling, and plagiarism audit consultancy based in Salt Lake, Kolkata, India. Founded by Tuhit Roy and Sampreeti Mukherjee.",
      telephone: "+91 7980470880",
      email: "inkmonkresearch@gmail.com",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karunamoyee, Sector 2, Salt Lake",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700091",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.5867,
        longitude: 88.4178,
      },
      founder: [
        {
          "@type": "Person",
          name: "Tuhit Roy",
          jobTitle: "Founder",
        },
        {
          "@type": "Person",
          name: "Sampreeti Mukherjee",
          jobTitle: "Co-Founder",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/inkmonk-research",
        "https://twitter.com/inkmonkresearch",
        "https://github.com/tuhitroy02/InkMonk-Research",
        "https://www.instagram.com/inkmonkresearch",
        "https://www.facebook.com/inkmonkresearch",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://inkmonkresearch.com/#localbusiness",
      name: "InkMonk Research",
      legalName: "InkMonk Research",
      url: "https://inkmonkresearch.com",
      logo: "https://inkmonkresearch.com/logo.png",
      image: "https://inkmonkresearch.com/logo.png",
      description:
        "Academic writing and research consultation firm in Salt Lake, Kolkata, specializing in Scopus, IEEE, Springer, Elsevier, and Shodhganga publication support.",
      telephone: "+91 7980470880",
      email: "inkmonkresearch@gmail.com",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karunamoyee, Sector 2, Salt Lake",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700091",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.5867,
        longitude: 88.4178,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "20:00",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/inkmonk-research",
        "https://twitter.com/inkmonkresearch",
        "https://github.com/tuhitroy02/InkMonk-Research",
        "https://www.instagram.com/inkmonkresearch",
        "https://www.facebook.com/inkmonkresearch",
      ],
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://inkmonkresearch.com/#educational-org",
      name: "InkMonk Research Academic Mentorship",
      url: "https://inkmonkresearch.com",
      description:
        "Scholarly editorial and doctoral research consultation providing IMRaD, PRISMA, IEEE, and Shodhganga research guidance.",
      sameAs: [
        "https://www.linkedin.com/company/inkmonk-research",
        "https://github.com/tuhitroy02/InkMonk-Research",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://inkmonkresearch.com/#website",
      url: "https://inkmonkresearch.com",
      name: "InkMonk Research",
      description:
        "Scholarly Research Paper Writing, Doctoral Thesis Consultation & Turnitin Originality Checking",
      publisher: {
        "@id": "https://inkmonkresearch.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://inkmonkresearch.com/services?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://inkmonkresearch.com/#breadcrumbs",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://inkmonkresearch.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://inkmonkresearch.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Research Areas",
          item: "https://inkmonkresearch.com/research-areas",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Instant Quote",
          item: "https://inkmonkresearch.com/quote",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "FAQ",
          item: "https://inkmonkresearch.com/faq",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Contact",
          item: "https://inkmonkresearch.com/contact",
        },
      ],
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://inkmonkresearch.com/#offercatalog",
      name: "Academic Research & Writing Services Catalog",
      itemListElement: [
        {
          "@type": "Service",
          "@id": "https://inkmonkresearch.com/#service-research-paper",
          name: "Research Paper Writing & Publication Consultation",
          provider: {
            "@id": "https://inkmonkresearch.com/#organization",
          },
          serviceType: "Academic Research & Manuscript Authoring",
          description:
            "Peer-review ready academic paper authoring in English and Hindi conforming to Scopus, IEEE, Springer, and Elsevier standards with optional computational models.",
          areaServed: "Global",
        },
        {
          "@type": "Service",
          "@id": "https://inkmonkresearch.com/#service-thesis",
          name: "Doctoral Thesis & Dissertation Drafting",
          provider: {
            "@id": "https://inkmonkresearch.com/#organization",
          },
          serviceType: "PhD Thesis Consultation",
          description:
            "Complete 5-chapter doctoral thesis preparation, DRC proposal drafting, methodology framing, and university rubric compliance in English and Hindi.",
          areaServed: "Global",
        },
        {
          "@type": "Service",
          "@id": "https://inkmonkresearch.com/#service-turnitin",
          name: "Safe Non-Repository Turnitin Plagiarism & AI Audit",
          provider: {
            "@id": "https://inkmonkresearch.com/#organization",
          },
          serviceType: "Plagiarism & Originality Checking",
          description:
            "Confidential non-repository Turnitin similarity check with comprehensive breakdown report and zero repository storage.",
          areaServed: "Global",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://inkmonkresearch.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Will my manuscript be stored in Turnitin's repository during plagiarism check?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We exclusively use licensed instructor non-repository Turnitin accounts. Your file is never indexed or saved into the repository database, completely eliminating the risk of self-plagiarism when submitted to your university.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide research writing services in Hindi as well as English?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, InkMonk Research has specialized academic divisions for both English (technical and non-technical) and Hindi (हिंदी शोध कार्य, साहित्य, समाजशास्त्र, एवं इतिहास) compliant with UGC-CARE and Shodhganga guidelines.",
          },
        },
        {
          "@type": "Question",
          name: "How is client confidentiality and intellectual property protected?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every research engagement is protected under a strict Non-Disclosure Agreement (NDA). All client data, experimental data, and drafts are kept strictly private and never shared.",
          },
        },
      ],
    },
  ],
};

const webMcpBootstrapScript = `
(function() {
  if (typeof window === 'undefined') return;
  try {
    var nav = window.navigator;
    if (!nav.modelContext) {
      nav.modelContext = {
        tools: [],
        registerTool: function(tool) {
          this.tools.push(tool);
          if (typeof window.dispatchEvent === 'function') {
            window.dispatchEvent(new CustomEvent('toolregistered', { detail: tool }));
          }
        },
        getTools: function() { return this.tools; }
      };
    }
    nav.modelContext.registerTool({
      name: "calculate_research_estimate",
      description: "Calculate real-time academic quotation, word-count estimates, and turnaround milestones for research papers, doctoral dissertations, book chapters, and Turnitin similarity checks at InkMonk Research.",
      inputSchema: {
        type: "object",
        properties: {
          serviceType: { type: "string", description: "Academic service type" },
          language: { type: "string", enum: ["english", "hindi"] },
          isTechnical: { type: "boolean" },
          wordCount: { type: "number" }
        },
        required: ["serviceType", "language"]
      },
      execute: async function(args) {
        return { status: "success", quoteUrl: "https://inkmonkresearch.com/quote", ...args };
      }
    });
    nav.modelContext.registerTool({
      name: "get_service_catalog",
      description: "Retrieve comprehensive catalogue of academic research services in English and Hindi with turnaround times.",
      inputSchema: { type: "object", properties: { category: { type: "string" } } },
      execute: async function() {
        return { catalogUrl: "https://inkmonkresearch.com/services", llmsTxt: "https://inkmonkresearch.com/llms.txt" };
      }
    });
    nav.modelContext.registerTool({
      name: "contact_founders_consultation",
      description: "Get verified contact details, founders profile, and Kolkata office address of InkMonk Research.",
      inputSchema: { type: "object", properties: {} },
      execute: async function() {
        return { phone: "+91 7980470880", email: "inkmonkresearch@gmail.com", office: "Salt Lake, Kolkata" };
      }
    });
    window.__WEBMCP_INITIALIZED__ = true;
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth light-mode"
      data-theme="light"
    >
      <head>
        <link rel="describedby" type="text/plain" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/api/markdown-homepage" />
        <script
          id="webmcp-bootstrap"
          dangerouslySetInnerHTML={{ __html: webMcpBootstrapScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className="min-h-screen antialiased transition-colors duration-300 relative bg-[#F8FAFC] dark:bg-[#0A0F1D] text-[#0F172A] dark:text-[#F8FAFC]"
      >
        <ThemeProvider>
          <SupabaseAuthProvider>
            <WebMcpProvider />
            <Navbar />
            <main className="min-h-screen pt-20 relative z-10">
              {children}
            </main>
            <Footer />
            <ChatWidget />
            <SupabaseAuthModal />
          </SupabaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
