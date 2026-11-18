'use client';

import { useEffect } from 'react';

export default function WebMcpProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register WebMCP tools with navigator.modelContext if available (Emerging WebMCP Standard)
    const nav = navigator as any;

    const registerWebMcpTools = () => {
      if (nav.modelContext && typeof nav.modelContext.registerTool === 'function') {
        try {
          // Tool 1: Calculate Instant Academic Research Estimate
          nav.modelContext.registerTool({
            name: 'calculate_research_estimate',
            description:
              'Calculate real-time academic quotation, word-count estimates, and turnaround milestones for research papers, doctoral dissertations, book chapters, and Turnitin similarity checks at InkMonk Research.',
            inputSchema: {
              type: 'object',
              properties: {
                serviceType: {
                  type: 'string',
                  enum: [
                    'research_paper',
                    'thesis_dissertation',
                    'review_paper',
                    'synopsis_proposal',
                    'book_monograph',
                    'turnitin_report',
                    'academic_ppt',
                    'article_writing',
                  ],
                  description: 'Type of academic service required',
                },
                language: {
                  type: 'string',
                  enum: ['english', 'hindi'],
                  description: 'Language of the academic manuscript',
                },
                isTechnical: {
                  type: 'boolean',
                  description: 'Whether computational model / code implementation (PyTorch, TensorFlow, MATLAB, etc.) is included',
                },
                wordCount: {
                  type: 'number',
                  description: 'Estimated word count or page volume',
                },
              },
              required: ['serviceType', 'language'],
            },
            execute: async (args: {
              serviceType: string;
              language: string;
              isTechnical?: boolean;
              wordCount?: number;
            }) => {
              const basePrices: Record<string, number> = {
                research_paper: args.language === 'hindi' ? 3999 : args.isTechnical ? 8998 : 4999,
                review_paper: args.language === 'hindi' ? 2999 : args.isTechnical ? 4499 : 3999,
                synopsis_proposal: args.language === 'hindi' ? 2999 : args.isTechnical ? 4499 : 3999,
                thesis_dissertation: args.language === 'hindi' ? 14999 : args.isTechnical ? 28998 : 19999,
                book_monograph: args.language === 'hindi' ? 2999 : 3999,
                turnitin_report: 0,
                academic_ppt: args.language === 'hindi' ? 100 : 120,
              };

              const estimatedCost = basePrices[args.serviceType] || 4999;

              return {
                status: 'success',
                provider: 'InkMonk Research',
                service: args.serviceType,
                language: args.language,
                isTechnical: Boolean(args.isTechnical),
                estimatedBasePriceINR: estimatedCost,
                currency: 'INR',
                turnaroundTimeDays: args.serviceType.includes('thesis') ? 21 : 10,
                plagiarismCheckIncluded: true,
                ndaProtected: true,
                quoteUrl: 'https://inkmonkresearch.com/quote',
                contact: {
                  phone: '+91 7980470880',
                  email: 'inkmonkresearch@gmail.com',
                  office: 'Karunamoyee, Sector 2, Salt Lake, Kolkata 700091',
                },
              };
            },
          });

          // Tool 2: Retrieve Full Academic Services Catalog
          nav.modelContext.registerTool({
            name: 'get_service_catalog',
            description:
              'Retrieve the comprehensive InkMonk Research service matrix including English and Hindi categories, publishing compliance, and deliverables.',
            inputSchema: {
              type: 'object',
              properties: {
                discipline: {
                  type: 'string',
                  description: 'Specific academic discipline or category',
                },
              },
            },
            execute: async () => ({
              status: 'success',
              categories: [
                'English Non-Technical (Research Papers, Theses, Reviews, Books)',
                'English Technical (Computational Models, PyTorch, Scopus Formatting)',
                'Hindi Academic Work (शोध पत्र, समीक्षा, शोध प्रबंध, UGC-CARE / Shodhganga compliant)',
                'Turnitin Originality Verification (Safe Non-Repository Instructor Account)',
              ],
              catalogUrl: 'https://inkmonkresearch.com/services',
              sitemapUrl: 'https://inkmonkresearch.com/sitemap.xml',
              llmsTxtUrl: 'https://inkmonkresearch.com/llms.txt',
            }),
          });

          // Tool 3: Verified Founders Contact & Consultation
          nav.modelContext.registerTool({
            name: 'contact_founders_consultation',
            description:
              'Connect directly with InkMonk Research founders Tuhit Roy and Sampreeti Mukherjee for confidentiality agreements or custom proposals.',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string' },
              },
            },
            execute: async () => ({
              founders: ['Tuhit Roy (Founder)', 'Sampreeti Mukherjee (Co-Founder)'],
              whatsapp: '+91 7980470880',
              email: 'inkmonkresearch@gmail.com',
              office: 'Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal, India',
            }),
          });
        } catch (e) {
          // ModelContext registration failed gracefully
          console.debug('WebMCP registerTool notice:', e);
        }
      }
    };

    registerWebMcpTools();

    // Listen for model context initialization event if browser agent fires it later
    window.addEventListener('modelcontextready', registerWebMcpTools);
    return () => {
      window.removeEventListener('modelcontextready', registerWebMcpTools);
    };
  }, []);

  return null;
}
