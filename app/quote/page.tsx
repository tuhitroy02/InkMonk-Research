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
    <div className="min-h-screen py-16 px-4 bg-notebook-grid text-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
            Guided Estimation
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 mb-3 text-center">
            Custom Project Quotation
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto text-center leading-relaxed font-medium">
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
            <h2 className="font-serif text-2xl font-black text-slate-900 mb-6">Step 1: Select Category &amp; Language</h2>

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
            <h2 className="font-serif text-2xl font-black text-slate-900 mb-6">Step 2: Technical Specifications</h2>

            {language !== 'TURNITIN' && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-900 mb-2">Technical vs. Non-Technical</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'TECH', title: 'Technical', desc: 'Engineering, CS, AI/ML, Data Science, Medical, Sciences' },
                    { id: 'NON_TECH', title: 'Non-Technical', desc: 'Social Sciences, Humanities, Management, Literature, Law' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setWorkType(t.id as any)}
                      className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        workType === t.id
                          ? 'border-[#2563EB] bg-blue-50 text-slate-900 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="font-black text-sm mb-1">{t.title}</div>
                      <div className="text-xs text-slate-500 font-medium">{t.desc}</div>
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
                    : 'Number of Files'}
                </label>
                <div className="max-w-xs">
                  <input
                    type="number"
                    min="1"
                    step={service === 'ARTICLE' || service === 'ASSIGNMENT' ? '100' : '1'}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-lg font-bold text-slate-900 shadow-inner"
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
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
              <label className="block text-sm font-bold text-slate-900 mb-2">Domain / Subject Topic</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. Deep Learning in Healthcare, Constitutional Law, Hindi Literature..."
                className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner"
              />
            </div>

            {/* Deadline */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-900 mb-2">Target Completion Date / Urgency</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. 15 days, End of next month, Urgent (5 days)"
                className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-bold text-slate-600 hover:text-black cursor-pointer"
              >
                ← Back
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
          <div className="card-clay-white p-6 md:p-8">
            <h2 className="font-serif text-2xl font-black text-slate-900 mb-2">Step 3: Your Calculated Estimate</h2>
            <p className="text-slate-600 text-sm mb-6 font-medium">
              Calculated automatically using InkMonk Research’s internal verified rate schedule.
            </p>

            {/* Quote Summary Box */}
            <div className="card-clay-blue-frame p-6 text-white mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/20 pb-5 mb-5">
                <div>
                  <div className="text-xs text-orange-200 font-black uppercase tracking-wider font-mono">
                    {calculatedQuote.languageName} • {calculatedQuote.workTypeName || 'Standard'}
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-black mt-1 text-white">{calculatedQuote.serviceName}</div>
                  {calculatedQuote.packageName && (
                    <div className="text-blue-100 text-sm font-semibold">{calculatedQuote.packageName}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-200 font-semibold uppercase">Estimated Total</div>
                  <div className="text-3xl sm:text-4xl font-serif font-black text-white">
                    {calculatedQuote.formattedTotal}
                  </div>
                </div>
              </div>

              <div className="text-sm text-blue-100 space-y-1">
                <div className="font-black text-white">Price Calculation Breakdown:</div>
                <div className="text-blue-200 font-mono text-xs">{calculatedQuote.breakdown}</div>
              </div>
            </div>

            {/* Contact details to finalize and reserve quote */}
            <form onSubmit={handleSubmitLead}>
              <h3 className="font-serif text-lg font-black text-slate-900 mb-4">
                Confirm Your Details to Lock-in this Estimate
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Brief or Questions (Optional)</label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Include any specific journal requirements, software/tools needed, or guidelines..."
                  className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl mb-4 border border-red-200 font-medium">
                  {submitError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm font-bold text-slate-600 hover:text-black cursor-pointer"
                >
                  ← Modify Parameters
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-clay-orange font-bold text-xs w-full sm:w-auto cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm & Save Quotation →'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Submission Confirmation */}
        {step === 4 && (
          <div className="card-clay-white p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-blue-100 text-[#2563EB] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm border border-blue-200 font-black">
              ◆
            </div>
            <h2 className="font-serif text-3xl font-black text-slate-900 mb-3">
              Quotation Request Received!
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-base mb-6 leading-relaxed font-medium">
              Thank you, <strong className="text-slate-900">{name}</strong>. Your project quote of{' '}
              <strong className="text-[#F95721] font-black">{calculatedQuote?.formattedTotal}</strong> has been saved.
              Our academic directors, <strong className="text-slate-900">Tuhit Roy</strong> and <strong className="text-slate-900">Sampreeti Mukherjee</strong>, will review your scope and get in touch shortly.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clay-orange font-bold text-xs flex items-center justify-center gap-2"
              >
                <WhatsAppRealIcon className="w-4 h-4" />
                <span>Direct WhatsApp Confirmation</span>
              </a>
              <Link href="/services" className="btn-clay-white font-bold text-xs">
                Explore More Services
              </Link>
            </div>

            <div className="text-xs text-slate-500 font-mono font-semibold">
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
