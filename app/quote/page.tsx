'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  WhatsAppRealIcon,
  NdaShieldIcon,
  OfficialTurnitinLogo,
} from '@/components/RealIcons';

interface QuoteBreakdownItem {
  label: string;
  amountPaise: number;
}

interface QuoteResult {
  totalPaise: number;
  totalRupees: number;
  formattedTotal: string;
  totalFormatted?: string;
  breakdown: QuoteBreakdownItem[] | string;
  breakdownText?: string;
  languageName: string;
  workTypeName?: string;
  serviceName: string;
  packageName?: string;
  quantity?: number;
  unit?: string;
  isPending?: boolean;
  pendingNote?: string;
}

function QuoteWizard() {
  const searchParams = useSearchParams();

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [language, setLanguage] = useState<'EN' | 'HI' | 'TURNITIN'>('EN');
  const [domain, setDomain] = useState<string>('');
  const [workType, setWorkType] = useState<'TECH' | 'NON_TECH'>('NON_TECH');
  const [service, setService] = useState<string>('RESEARCH_PAPER');
  const [packageType, setPackageType] = useState<string>('UPTO_6000_WORDS');
  const [quantity, setQuantity] = useState<number>(1);
  const [requirements, setRequirements] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('21 days');

  // Contact info
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Calculated quote & submission
  const [calculatedQuote, setCalculatedQuote] = useState<QuoteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calculateError, setCalculateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Unique Quotation Reference code for display & printing
  const quoteReference = useMemo(() => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `IMR-EST-${randomSuffix}`;
  }, []);

  // Sync query params if present (lang, service, type, workType, package, domain, topic, deadline, words, quantity)
  useEffect(() => {
    const qLang = searchParams.get('lang')?.toUpperCase();
    const qType = searchParams.get('type')?.toUpperCase();
    const qWorkType = searchParams.get('workType')?.toUpperCase();
    const qService = searchParams.get('service')?.toUpperCase();
    const qPackage = searchParams.get('package')?.toUpperCase();
    const qDomain = searchParams.get('domain') || searchParams.get('topic');
    const qDeadline = searchParams.get('deadline');
    const qWords = searchParams.get('words') || searchParams.get('quantity');

    if (qType === 'TURNITIN' || qLang === 'TURNITIN' || qService === 'TURNITIN' || qService === 'TURNITIN_REPORT') {
      setLanguage('TURNITIN');
      setService('TURNITIN');
    } else if (qLang === 'HI') {
      setLanguage('HI');
    } else if (qLang === 'EN') {
      setLanguage('EN');
    }

    if (qWorkType === 'TECH' || qType === 'TECH') {
      setWorkType('TECH');
    } else if (qWorkType === 'NON_TECH' || qType === 'NON_TECH') {
      setWorkType('NON_TECH');
    }

    if (qService && qType !== 'TURNITIN' && qLang !== 'TURNITIN') {
      setService(qService);
    }

    if (qPackage) {
      setPackageType(qPackage);
    }

    if (qDomain) {
      setDomain(qDomain);
    }

    if (qDeadline) {
      setDeadline(qDeadline);
    }

    if (qWords) {
      const parsedNum = parseInt(qWords, 10);
      if (!isNaN(parsedNum) && parsedNum > 0) {
        setQuantity(parsedNum);
      }
    }
  }, [searchParams]);

  // Available services based on selected language
  const getAvailableServices = () => {
    if (language === 'TURNITIN') {
      return [{ id: 'TURNITIN', name: 'Turnitin AI & Plagiarism Report' }];
    }
    return [
      { id: 'RESEARCH_PAPER', name: 'Research Paper Writing' },
      { id: 'REVIEW_PAPER', name: 'Review Paper Writing' },
      { id: 'THESIS', name: 'Thesis Writing' },
      { id: 'BOOK', name: 'Book Writing' },
      { id: 'SYNOPSIS', name: 'Synopsis Writing' },
      { id: 'ARTICLE', name: 'Article Writing (Per Word)' },
      { id: 'PPT', name: 'PPT Making (Per Slide)' },
      { id: 'MODEL', name: 'Model Implementation' },
      { id: 'ASSIGNMENT', name: 'Academic Assignment' },
    ];
  };

  // Available packages based on service
  const getAvailablePackages = () => {
    if (service === 'RESEARCH_PAPER') {
      return [
        { id: 'UPTO_6000_WORDS', name: 'Standard (Up to 6,000 Words)' },
        { id: 'UPTO_8000_WORDS', name: 'Extended (Up to 8,000 Words)' },
        { id: 'UPTO_10000_WORDS', name: 'Comprehensive (Up to 10,000 Words)' },
      ];
    }
    if (service === 'REVIEW_PAPER') {
      return [
        { id: 'UPTO_6000_WORDS', name: 'Standard Review (Up to 6,000 Words)' },
        { id: 'UPTO_8000_WORDS', name: 'Extended Review (Up to 8,000 Words)' },
        { id: 'UPTO_10000_WORDS', name: 'Comprehensive Review (Up to 10,000 Words)' },
      ];
    }
    if (service === 'THESIS') {
      return [
        { id: 'WITH_MODEL', name: 'With Model Implementation' },
        { id: 'WITHOUT_MODEL', name: 'Without Model Implementation' },
      ];
    }
    if (service === 'BOOK') {
      return [
        { id: '100_PAGES', name: '100 Pages Book' },
        { id: '200_PAGES', name: '200 Pages Book' },
        { id: '300_PAGES', name: '300 Pages Book' },
      ];
    }
    if (service === 'MODEL') {
      return [
        { id: 'SMALL', name: 'Small / Prototype Model' },
        { id: 'BIG', name: 'Big / Advanced Model' },
        { id: 'WEBSITE', name: 'Complete Website + AI Integration' },
      ];
    }
    return [];
  };

  // Recalculate quote with 100% accessible inline validation (NO browser alerts)
  const handleCalculate = async () => {
    setIsCalculating(true);
    setCalculateError(null);

    try {
      const res = await fetch('/api/quote/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          workType: language === 'TURNITIN' ? 'NA' : workType,
          service,
          package: getAvailablePackages().length > 0 ? packageType : undefined,
          quantity: ['ARTICLE', 'PPT', 'TURNITIN', 'ASSIGNMENT'].includes(service) ? Number(quantity) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Server pricing calculation could not be completed.');
      }

      setCalculatedQuote(data.quote);
      setStep(3); // Advance to itemized estimate & contact details
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to calculate quote at this moment. Please check your inputs or consult our directors directly.';
      setCalculateError(message);
    } finally {
      setIsCalculating(false);
    }
  };

  // Submit enquiry lead
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setSubmitError('Please enter both your full name and email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'MANUAL',
          language,
          domain: domain || 'General Academic Discipline',
          workType: language === 'TURNITIN' ? undefined : workType,
          service,
          package: getAvailablePackages().length > 0 ? packageType : undefined,
          requirements,
          deadline,
          quantity: ['ARTICLE', 'PPT', 'TURNITIN', 'ASSIGNMENT'].includes(service) ? Number(quantity) : undefined,
          totalPaise: calculatedQuote?.totalPaise,
          breakdown: calculatedQuote?.breakdownText || JSON.stringify(calculatedQuote?.breakdown),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit quote request.');
      }

      setSubmittedLeadId(data.leadId || quoteReference);
      setStep(4); // Advance to confirmation
    } catch {
      setSubmitError('Failed to record your quote request. Please retry or contact us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = (customNote?: string) => {
    const text = encodeURIComponent(
      `Hello InkMonk Research Team,\n\nI am requesting a project quote:\n- Ref: ${quoteReference}\n- Service: ${calculatedQuote?.serviceName || service}\n- Language: ${language === 'HI' ? 'Hindi' : language === 'EN' ? 'English' : 'Turnitin'}\n- Type: ${language === 'TURNITIN' ? 'Turnitin Scan' : workType === 'TECH' ? 'Technical' : 'Non-Technical'}\n- Topic/Domain: ${domain || 'To be discussed'}\n- Deadline: ${deadline || '21 days'}\n- Estimate: ${calculatedQuote?.formattedTotal || 'Awaiting quote'}\n${name ? `- Scholar Name: ${name}\n` : ''}${customNote ? `- Note: ${customNote}\n` : ''}\nPlease review my scope.`
    );
    return `https://wa.me/917980470880?text=${text}`;
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-notebook-grid text-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
            Guided Estimation Engine
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 mb-3 text-center">
            Custom Project Quotation
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto text-center leading-relaxed font-medium">
            Select your academic specifications below. Our deterministic server-side pricing engine calculates a transparent, itemized estimate backed by our exact schedule.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 max-w-xl mx-auto px-4">
          {[
            { s: 1, label: 'Service' },
            { s: 2, label: 'Specifications' },
            { s: 3, label: 'Estimate & Save' },
            { s: 4, label: 'Confirmation' },
          ].map((item) => (
            <div key={item.s} className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                  step === item.s
                    ? 'bg-[#F95721] text-white shadow-[0_4px_0_#C43B00,0_8px_16px_rgba(249,87,33,0.35)] scale-110'
                    : step > item.s
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white text-slate-600 border-2 border-slate-200'
                }`}
              >
                {step > item.s ? '◆' : item.s}
              </div>
              <span className="text-[11px] text-slate-600 font-bold mt-1">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Select Language & Service Category */}
        {step === 1 && (
          <div className="card-clay-white p-6 md:p-8 shadow-md">
            <h2 className="font-serif text-2xl font-black text-slate-900 mb-6">
              Step 1: Select Category &amp; Language
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'EN', title: 'English Writing', desc: 'Technical & Non-Technical', logo: <UkFlagLogo className="w-8 h-8 mb-2" /> },
                { id: 'HI', title: 'Hindi Writing', desc: 'Technical & Non-Technical (हिंदी)', logo: <IndiaFlagLogo className="w-8 h-8 mb-2" /> },
                { id: 'TURNITIN', title: 'Turnitin Report', desc: 'Safe Non-Repository (₹200/file)', logo: <TurnitinShieldLogo className="w-8 h-8 mb-2" /> },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    const nextLang = cat.id as 'EN' | 'HI' | 'TURNITIN';
                    setLanguage(nextLang);
                    if (nextLang === 'TURNITIN') {
                      setService('TURNITIN');
                    } else if (service === 'TURNITIN') {
                      setService('RESEARCH_PAPER');
                    }
                  }}
                  className={`p-5 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                    language === cat.id
                      ? 'border-[#F95721] bg-orange-50/50 shadow-md ring-2 ring-[#F95721]/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {cat.logo}
                  <div className="font-serif font-black text-lg text-slate-900 mb-1">{cat.title}</div>
                  <div className="text-slate-500 text-xs font-medium">{cat.desc}</div>
                </button>
              ))}
            </div>

            {/* Service selector */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-900 mb-2">Service Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {getAvailableServices().map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setService(s.id);
                      if (s.id === 'RESEARCH_PAPER' || s.id === 'REVIEW_PAPER') {
                        setPackageType('UPTO_6000_WORDS');
                      } else if (s.id === 'THESIS') {
                        setPackageType('WITH_MODEL');
                      } else if (s.id === 'BOOK') {
                        setPackageType('100_PAGES');
                      } else if (s.id === 'MODEL') {
                        setPackageType('SMALL');
                      }
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left text-sm font-bold transition-all cursor-pointer ${
                      service === s.id
                        ? 'border-[#F95721] bg-orange-50 text-[#F95721] shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-clay-orange text-xs font-black"
              >
                Continue to Specifications →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Service Specifications */}
        {step === 2 && (
          <div className="card-clay-white p-6 md:p-8 shadow-md">
            <h2 className="font-serif text-2xl font-black text-slate-900 mb-6">
              Step 2: Technical Specifications &amp; Scope
            </h2>

            {language !== 'TURNITIN' && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Technical vs. Non-Technical
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'NON_TECH', title: 'Non-Technical (Theoretical / Editorial)', desc: 'Social Sciences, Humanities, Management, Literature, Law, Education' },
                    { id: 'TECH', title: 'Technical (With Model / Code Implementation)', desc: 'Engineering, CS, AI/ML, Data Science, Medical, Physical Sciences' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setWorkType(t.id as 'TECH' | 'NON_TECH')}
                      className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        workType === t.id
                          ? 'border-[#2563EB] bg-blue-50 text-slate-900 ring-2 ring-blue-500/20 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="font-black text-sm mb-1">{t.title}</div>
                      <div className="text-xs text-slate-500 font-medium leading-relaxed">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Package selector if applicable */}
            {getAvailablePackages().length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-900 mb-2">Scope / Package Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {getAvailablePackages().map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPackageType(p.id)}
                      className={`p-3.5 rounded-xl border-2 text-left text-sm font-bold transition-all cursor-pointer ${
                        packageType === p.id
                          ? 'border-[#F95721] bg-orange-50 text-[#F95721] shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity inputs if per-unit service */}
            {['ARTICLE', 'PPT', 'TURNITIN', 'ASSIGNMENT'].includes(service) && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  {service === 'ARTICLE' || service === 'ASSIGNMENT'
                    ? 'Total Estimated Word Count'
                    : service === 'PPT'
                    ? 'Number of Slides'
                    : 'Number of Files to Scan (₹200 per file)'}
                </label>
                <div className="max-w-xs">
                  <input
                    type="number"
                    min="1"
                    step={service === 'ARTICLE' || service === 'ASSIGNMENT' ? '100' : '1'}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-lg font-bold text-slate-900 shadow-inner focus:outline-none focus:border-[#2563EB]"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    {service === 'ARTICLE' || service === 'ASSIGNMENT'
                      ? 'Example: 1500 or 3000 words'
                      : service === 'PPT'
                      ? 'Example: 15 slides'
                      : 'Turnitin report delivered within 15–30 minutes'}
                  </span>
                </div>
              </div>
            )}

            {/* Domain & Topic */}
            <div className="mb-6">
              <label htmlFor="quoteDomain" className="block text-sm font-bold text-slate-900 mb-2">
                Research Topic or Academic Discipline
              </label>
              <input
                id="quoteDomain"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. Education policy, Deep Learning in Healthcare, Constitutional Law..."
                className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Deadline */}
            <div className="mb-6">
              <label htmlFor="quoteDeadline" className="block text-sm font-bold text-slate-900 mb-2">
                Target Completion Deadline / Urgency
              </label>
              <input
                id="quoteDeadline"
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. 21 days, Urgent (7 days), End of next month"
                className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Accessible Inline Error Alert (NO browser alert popup) */}
            {calculateError && (
              <div
                role="alert"
                className="p-4 bg-red-50 text-red-800 rounded-2xl mb-6 border-2 border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="text-xs sm:text-sm font-medium leading-relaxed">
                  <strong className="font-bold text-red-900 block sm:inline mr-1">Calculation Notice:</strong>
                  {calculateError}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={getWhatsAppLink('Requesting manual review due to custom scope')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-clay-orange text-xs py-1.5 px-3 whitespace-nowrap"
                  >
                    Request Manual Review →
                  </a>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-bold text-slate-600 hover:text-black cursor-pointer"
              >
                ← Back to Service
              </button>
              <button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="btn-clay-orange text-xs font-black cursor-pointer"
              >
                {isCalculating ? 'Calculating Quote...' : 'Calculate Quote →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Server Quote Calculation & Client Contact Info */}
        {step === 3 && calculatedQuote && (
          <div className="card-clay-white p-6 md:p-8 shadow-md">
            
            {/* Header & Quotation Reference */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div>
                <div className="text-xs font-mono font-bold text-[#F95721] uppercase tracking-wider">
                  Reference: {quoteReference}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                  Your Itemized Project Estimate
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  title="Print or Save PDF"
                >
                  🖨️ Print / Save PDF
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppRealIcon className="w-3.5 h-3.5" />
                  <span>Manual Review</span>
                </a>
              </div>
            </div>

            {/* Quote Summary Box */}
            <div className="card-clay-blue-frame p-6 text-white mb-8 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/20 pb-5 mb-5">
                <div>
                  <div className="text-xs text-orange-200 font-black uppercase tracking-wider font-mono">
                    {calculatedQuote.languageName} • {calculatedQuote.workTypeName || 'Standard'}
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-black mt-1 text-white">
                    {calculatedQuote.serviceName}
                  </div>
                  {calculatedQuote.packageName && (
                    <div className="text-blue-100 text-sm font-semibold mt-0.5">
                      Scope Tier: {calculatedQuote.packageName}
                    </div>
                  )}
                  {domain && (
                    <div className="text-blue-200 text-xs mt-1 font-medium italic">
                      Topic: &ldquo;{domain}&rdquo;
                    </div>
                  )}
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
                    Total Estimated Fee
                  </div>
                  <div className="text-3xl sm:text-4xl font-serif font-black text-white">
                    {calculatedQuote.formattedTotal || calculatedQuote.totalFormatted}
                  </div>
                  <div className="text-[11px] text-blue-200 font-mono">
                    Target: {deadline || '21 days'}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-black uppercase text-blue-200 tracking-wider">
                  Itemized Rate Breakdown:
                </div>
                {Array.isArray(calculatedQuote.breakdown) ? (
                  <div className="space-y-1.5">
                    {calculatedQuote.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-lg font-mono">
                        <span>{item.label}</span>
                        <span className="font-bold text-white">₹{(item.amountPaise / 100).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-blue-100 font-mono text-xs bg-white/10 px-3 py-2 rounded-lg">
                    {calculatedQuote.breakdownText || String(calculatedQuote.breakdown)}
                  </div>
                )}
              </div>

              {/* Stated Assumptions & Academic Guarantee */}
              <div className="pt-3 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-100 font-medium">
                <div className="flex items-start gap-2">
                  <span className="text-orange-300 font-bold shrink-0">◆</span>
                  <span>Turnaround: Delivered according to your {deadline || '21 days'} schedule with phased chapter review.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-300 font-bold shrink-0">◆</span>
                  <span>Revisions: Includes 2 rounds of structural &amp; peer-review edits within 30 days of delivery.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-300 font-bold shrink-0">◆</span>
                  <span>Integrity: Zero automated AI writing with verified Turnitin originality receipt.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-300 font-bold shrink-0">◆</span>
                  <span>NDA Protection: Research data protected under pre-signed mutual confidentiality agreement.</span>
                </div>
              </div>
            </div>

            {/* Contact Details Form (WebMCP Enabled) */}
            <form
              onSubmit={handleSubmitLead}
              // @ts-expect-error WebMCP browser standard annotations
              toolname="calculate_research_estimate"
              tooldescription="Calculate exact customized pricing and turnaround milestones for academic research papers, theses, and Turnitin checks"
              data-toolname="calculate_research_estimate"
              data-tooldescription="Calculate exact customized pricing and turnaround milestones for academic research papers, theses, and Turnitin checks"
              className="space-y-4"
            >
              <div className="border-b border-slate-200 pb-2 mb-4">
                <h3 className="font-serif text-lg font-black text-slate-900">
                  Lock In This Estimate &amp; Save Brief
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Enter your contact details so our directors Tuhit Roy and Sampreeti Mukherjee can confirm your milestone dates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quoteName" className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="quoteName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. / Scholar Name"
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
                <div>
                  <label htmlFor="quoteEmail" className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="quoteEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@university.edu"
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quotePhone" className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="quotePhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
                <div>
                  <label htmlFor="quoteRequirements" className="block text-xs font-bold text-slate-700 mb-1">
                    Specific Journal / University Guidelines (Optional)
                  </label>
                  <input
                    id="quoteRequirements"
                    type="text"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="e.g. IEEE Transactions template, DRC chapter guidelines..."
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
              </div>

              {submitError && (
                <div role="alert" className="p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 font-medium">
                  {submitError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm font-bold text-slate-600 hover:text-black cursor-pointer"
                >
                  ← Modify Parameters
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-clay-white text-xs font-bold py-2.5 px-4 flex items-center gap-1.5"
                  >
                    <WhatsAppRealIcon className="w-4 h-4" />
                    <span>WhatsApp Directors</span>
                  </a>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-clay-orange font-bold text-xs w-full sm:w-auto cursor-pointer"
                  >
                    {isSubmitting ? 'Saving Estimate...' : 'Save & Lock In Quote →'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Submission Confirmation */}
        {step === 4 && (
          <div className="card-clay-white p-8 md:p-12 text-center shadow-lg">
            <div className="w-16 h-16 bg-blue-100 text-[#2563EB] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm border border-blue-200 font-black">
              ◆
            </div>
            <h2 className="font-serif text-3xl font-black text-slate-900 mb-3">
              Quotation Successfully Saved!
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-base mb-6 leading-relaxed font-medium">
              Thank you, <strong className="text-slate-900">{name}</strong>. Your project quote of{' '}
              <strong className="text-[#F95721] font-black">{calculatedQuote?.formattedTotal || calculatedQuote?.totalFormatted}</strong> has been logged under quotation reference{' '}
              <code className="bg-slate-100 text-[#2563EB] font-bold px-2 py-0.5 rounded">{submittedLeadId || quoteReference}</code>.
              Founders <strong className="text-slate-900">Tuhit Roy</strong> and <strong className="text-slate-900">Sampreeti Mukherjee</strong> will review your specifications and schedule your milestone timeline.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a
                href={getWhatsAppLink('Confirmation of saved website quotation')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clay-orange font-bold text-xs flex items-center justify-center gap-2"
              >
                <WhatsAppRealIcon className="w-4 h-4" />
                <span>Confirm on WhatsApp (+91 7980470880)</span>
              </a>
              <Link href="/services" className="btn-clay-white font-bold text-xs">
                Explore All Services
              </Link>
            </div>

            <div className="text-xs text-slate-500 font-mono font-semibold">
              Quotation Ref: {submittedLeadId || quoteReference} • Salt Lake Sector 2, Kolkata 700091
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <QuoteWizard />
    </Suspense>
  );
}
