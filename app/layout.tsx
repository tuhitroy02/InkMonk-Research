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
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "@id": "https://inkmonkresearch.com/#organization",
      name: "InkMonk Research",
      legalName: "InkMonk Research",
      url: "https://inkmonkresearch.com",
      logo: "https://inkmonkresearch.com/logo.png",
      image: "https://inkmonkresearch.com/logo.png",
      description:
        "InkMonk Research offers premier research and writing services in English and Hindi — research papers, theses, books, articles, presentations, and Turnitin reports. Based in Salt Lake, Kolkata.",
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
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "20:00",
        },
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
      "@type": "Service",
      "@id": "https://inkmonkresearch.com/#service-research-paper",
      name: "Research Paper Writing & Publication Consultation",
      provider: {
        "@id": "https://inkmonkresearch.com/#organization",
      },
      serviceType: "Academic Research & Manuscript Authoring",
      description:
        "Peer-review ready academic paper authoring in English and Hindi conforming to Scopus, IEEE, Springer, and Elsevier standards with optional PyTorch/MATLAB computational models.",
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
        <link rel="canonical" href="https://inkmonkresearch.com" />
        <link rel="describedby" type="text/plain" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/api/markdown-homepage" />
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
