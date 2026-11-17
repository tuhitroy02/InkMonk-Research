'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  UkFlagLogo,
  IndiaFlagLogo,
  TurnitinShieldLogo,
  WhatsAppRealIcon,
} from '@/components/RealIcons';

interface QuoteResult {
  totalPaise: number;
  totalRupees: number;
  formattedTotal: string;
  breakdown: string;
  languageName: string;
  workTypeName?: string;
  serviceName: string;
  packageName?: string;
  quantity?: number;
  unit?: string;
}

function QuoteWizard() {
  const searchParams = useSearchParams();

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [language, setLanguage] = useState<'EN' | 'HI' | 'TURNITIN'>('EN');
  const [domain, setDomain] = useState<string>('');
  const [workType, setWorkType] = useState<'TECH' | 'NON_TECH'>('TECH');
  const [service, setService] = useState<string>('RESEARCH_PAPER');
  const [packageType, setPackageType] = useState<string>('UPTO_6000_WORDS');
  const [quantity, setQuantity] = useState<number>(1);
  const [requirements, setRequirements] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  // Contact info
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Calculated quote & submission
  const [calculatedQuote, setCalculatedQuote] = useState<QuoteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync query params if present
  useEffect(() => {
    const qLang = searchParams.get('lang');
    const qType = searchParams.get('type');
    const qService = searchParams.get('service');

    if (qType === 'TURNITIN') {
      setLanguage('TURNITIN');
      setService('TURNITIN');
    } else if (qLang === 'HI') {
      setLanguage('HI');
    } else if (qLang === 'EN') {
      setLanguage('EN');
    }

    if (qService && qType !== 'TURNITIN') {
      setService(qService);
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

  // Recalculate quote
  const handleCalculate = async () => {
    setIsCalculating(true);
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

      if (!res.ok) {
        throw new Error('Could not calculate quote.');
      }

      const data = await res.json();
      setCalculatedQuote(data.quote);
      setStep(3); // Advance to preview & details
    } catch {
      alert('Unable to generate quote at this moment. Please check your inputs or contact us directly.');
    } finally {
      setIsCalculating(false);
    }
  };

  // Submit enquiry lead
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setSubmitError('Please enter your name and email.');
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
          domain,
          workType: language === 'TURNITIN' ? undefined : workType,
          service,
          package: getAvailablePackages().length > 0 ? packageType : undefined,
          requirements,
          deadline,
          quantity: ['ARTICLE', 'PPT', 'TURNITIN', 'ASSIGNMENT'].includes(service) ? Number(quantity) : undefined,
          totalPaise: calculatedQuote?.totalPaise,
          breakdown: calculatedQuote?.breakdown,
          name,
          email,
          phone,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit');
      }

      const data = await res.json();
      setSubmittedLeadId(data.leadId);
      setStep(4); // Advance to success
    } catch {
      setSubmitError('Failed to record your quote request. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello InkMonk Research Team,\n\nI have requested a quote on your website:\n- Service: ${calculatedQuote?.serviceName || service}\n- Language: ${language === 'HI' ? 'Hindi' : language === 'EN' ? 'English' : 'Turnitin'}\n- Domain: ${domain || 'General'}\n- Quote Estimate: ${calculatedQuote?.formattedTotal || 'Calculated'}\n- My Name: ${name}\n\nLooking forward to discussing further!`
    );
    return `https://wa.me/917980470880?text=${text}`;
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-white dark:bg-[#000000] text-black dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="badge-pill-purple mb-3">Guided Estimation</div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black dark:text-white mb-3 text-center">
            Custom Project Quotation
          </h1>
          <p className="text-slate-600 dark:text-purple-200/80 text-base max-w-xl mx-auto text-center leading-relaxed">
            Select your academic specifications below. Our server-side pricing engine calculates a precise, transparent estimate according to our exact business schedule.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 max-w-xl mx-auto px-4">
          {[
            { s: 1, label: 'Service' },
            { s: 2, label: 'Specifications' },
            { s: 3, label: 'Quote & Contact' },
            { s: 4, label: 'Confirmation' },
          ].map((item) => (
            <div key={item.s} className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === item.s
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-110'
                    : step > item.s
                    ? 'bg-purple-800 text-white'
                    : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                }`}
              >
                {step > item.s ? '✓' : item.s}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-purple-300/70 font-medium mt-1">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Select Language & Service Category */}
        {step === 1 && (
          <div className="card-futuristic-3d p-6 md:p-8 bg-purple-50/20 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30">
            <h2 className="font-serif text-2xl font-bold text-black dark:text-white mb-6">Step 1: Select Category &amp; Language</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'EN', title: 'English Writing', desc: 'Technical & Non-Technical', logo: <UkFlagLogo className="w-8 h-8 mb-2" /> },
                { id: 'HI', title: 'Hindi Writing', desc: 'Technical & Non-Technical', logo: <IndiaFlagLogo className="w-8 h-8 mb-2" /> },
                { id: 'TURNITIN', title: 'Turnitin Report', desc: 'AI + Plagiarism Check (₹200/file)', logo: <TurnitinShieldLogo className="w-8 h-8 mb-2" /> },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setLanguage(cat.id as any);
                    if (cat.id === 'TURNITIN') {
                      setService('TURNITIN');
                    } else if (service === 'TURNITIN') {
                      setService('RESEARCH_PAPER');
                    }
                  }}
                  className={`p-5 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                    language === cat.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/70 shadow-md ring-2 ring-purple-500/20'
                      : 'border-purple-100 dark:border-purple-900/40 hover:border-purple-300 bg-white dark:bg-[#05020A]'
                  }`}
                >
                  {cat.logo}
                  <div className="font-serif font-bold text-lg text-black dark:text-white mb-1">{cat.title}</div>
                  <div className="text-slate-500 dark:text-purple-300/70 text-xs">{cat.desc}</div>
                </button>
              ))}
            </div>

            {/* Service selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">Service Type</label>
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
                    className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                      service === s.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 shadow-sm'
                        : 'border-purple-100 dark:border-purple-900/40 hover:border-purple-300 text-slate-700 dark:text-purple-200 bg-white dark:bg-[#05020A]'
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
                className="btn-primary-glow font-mono text-xs cursor-pointer"
              >
                Continue to Specifications →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Service Specifications */}
        {step === 2 && (
          <div className="card-futuristic-3d p-6 md:p-8 bg-purple-50/20 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30">
            <h2 className="font-serif text-2xl font-bold text-black dark:text-white mb-6">Step 2: Technical Specifications</h2>

            {language !== 'TURNITIN' && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">Technical vs. Non-Technical</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'TECH', title: 'Technical', desc: 'Engineering, CS, AI/ML, Data Science, Medical, Sciences' },
                    { id: 'NON_TECH', title: 'Non-Technical', desc: 'Social Sciences, Humanities, Management, Literature, Law' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setWorkType(t.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        workType === t.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/70 text-black dark:text-white ring-2 ring-purple-500/20'
                          : 'border-purple-100 dark:border-purple-900/40 hover:border-purple-300 text-slate-700 dark:text-purple-200 bg-white dark:bg-[#05020A]'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1">{t.title}</div>
                      <div className="text-xs text-slate-500 dark:text-purple-300/70">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Package selector if applicable */}
            {getAvailablePackages().length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">Scope / Package Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {getAvailablePackages().map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPackageType(p.id)}
                      className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                        packageType === p.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 shadow-sm'
                          : 'border-purple-100 dark:border-purple-900/40 hover:border-purple-300 text-slate-700 dark:text-purple-200 bg-white dark:bg-[#05020A]'
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
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  {service === 'ARTICLE' || service === 'ASSIGNMENT'
                    ? 'Total Estimated Word Count'
                    : service === 'PPT'
                    ? 'Number of Slides'
                    : 'Number of Files'}
                </label>
                <div className="max-w-xs">
                  <input
                    type="number"
                    min="1"
                    step={service === 'ARTICLE' || service === 'ASSIGNMENT' ? '100' : '1'}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input-field font-semibold text-lg"
                  />
                  <span className="text-xs text-slate-500 dark:text-purple-300/70 mt-1 block">
                    {service === 'ARTICLE' || service === 'ASSIGNMENT'
                      ? 'Example: 1500 or 3000 words'
                      : service === 'PPT'
                      ? 'Example: 15 slides'
                      : 'Files to scan (₹200 per file)'}
                  </span>
                </div>
              </div>
            )}

            {/* Domain & Topic */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">Domain / Subject Topic</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. Deep Learning in Healthcare, Constitutional Law, Hindi Literature..."
                className="input-field"
              />
            </div>

            {/* Deadline */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">Target Completion Date / Urgency</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. 15 days, End of next month, Urgent (5 days)"
                className="input-field"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-semibold text-slate-600 dark:text-purple-300 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="btn-primary-glow font-mono text-xs cursor-pointer"
              >
                {isCalculating ? 'Calculating Quote...' : 'Calculate Quote →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Server Quote Calculation & Client Contact Info */}
        {step === 3 && calculatedQuote && (
          <div className="card-futuristic-3d p-6 md:p-8 bg-purple-50/20 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30">
            <h2 className="font-serif text-2xl font-bold text-black dark:text-white mb-2">Step 3: Your Calculated Estimate</h2>
            <p className="text-slate-600 dark:text-purple-200/80 text-sm mb-6">
              Calculated automatically using InkMonk Research’s internal verified rate schedule.
            </p>

            {/* Quote Summary Box */}
            <div className="bg-purple-950/70 border border-purple-400/50 rounded-2xl p-6 text-white mb-8 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple-400/20 pb-5 mb-5">
                <div>
                  <div className="text-xs text-purple-300 font-bold uppercase tracking-wider font-mono">
                    {calculatedQuote.languageName} • {calculatedQuote.workTypeName || 'Standard'}
                  </div>
                  <div className="font-serif text-2xl font-bold mt-1 text-white">{calculatedQuote.serviceName}</div>
                  {calculatedQuote.packageName && (
                    <div className="text-purple-200 text-sm">{calculatedQuote.packageName}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-300/80">Estimated Total</div>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-purple-300">
                    {calculatedQuote.formattedTotal}
                  </div>
                </div>
              </div>

              <div className="text-sm text-purple-200 space-y-1">
                <div className="font-medium text-white">Price Calculation Breakdown:</div>
                <div className="text-purple-300/90 font-mono text-xs">{calculatedQuote.breakdown}</div>
              </div>
            </div>

            {/* Contact details to finalize and reserve quote */}
            <form onSubmit={handleSubmitLead}>
              <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-4">
                Confirm Your Details to Lock-in this Estimate
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="input-field text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="input-field text-sm"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">Detailed Brief or Questions (Optional)</label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Include any specific journal requirements, software/tools needed, or guidelines..."
                  className="input-field text-sm"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl mb-4 border border-red-200">
                  {submitError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm font-semibold text-slate-600 dark:text-purple-300 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  ← Modify Parameters
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-glow font-mono text-xs w-full sm:w-auto cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm & Save Quotation →'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Submission Confirmation */}
        {step === 4 && (
          <div className="card-futuristic-3d p-8 md:p-12 text-center bg-purple-50/20 dark:bg-[#0A0414] border border-purple-200 dark:border-purple-500/30">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner border border-purple-300 dark:border-purple-600">
              ✓
            </div>
            <h2 className="font-serif text-3xl font-bold text-black dark:text-white mb-3">
              Quotation Request Received!
            </h2>
            <p className="text-slate-600 dark:text-purple-200/80 max-w-lg mx-auto text-base mb-6 leading-relaxed">
              Thank you, <strong className="text-black dark:text-white">{name}</strong>. Your project quote of{' '}
              <strong className="text-purple-600 dark:text-purple-300 font-bold">{calculatedQuote?.formattedTotal}</strong> has been saved.
              Our academic directors, <strong className="text-black dark:text-white">Tuhit Roy</strong> and <strong className="text-black dark:text-white">Sampreeti Mukherjee</strong>, will review your scope and get in touch shortly.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-pill font-mono text-xs"
              >
                <span>Direct WhatsApp Confirmation</span>
              </a>
              <Link href="/services" className="btn-secondary-dark font-mono text-xs">
                Explore More Services
              </Link>
            </div>

            <div className="text-xs text-slate-500 dark:text-purple-400 font-mono">
              Reference ID: {submittedLeadId || 'INKMONK-QUOTE'} • Karunamoyee, Salt Lake, Kolkata
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
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <QuoteWizard />
    </Suspense>
  );
}
