import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
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
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark-mode" data-theme="dark">
      <body
        className="min-h-screen font-bold antialiased transition-colors duration-300"
        style={{ fontFamily: '"Cavolini", "Cavolini Condensed", "Plus Jakarta Sans", sans-serif', fontWeight: 700 }}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
