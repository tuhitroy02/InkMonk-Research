'use client';

import { useState } from 'react';
import {
  LocationRealIcon,
  WhatsAppRealIcon,
  EmailRealIcon,
  OfficialTurnitinLogo,
} from '@/components/RealIcons';
import FaqSection from '@/components/FaqSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'MANUAL',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          domain: formData.subject,
          requirements: formData.message,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Unable to send message right now. Please message us on WhatsApp directly at +91 7980470880.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-notebook-grid text-slate-900 py-16 px-4 text-center">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-orange-100 text-[#F95721] font-black text-xs uppercase px-4 py-1.5 rounded-full mb-3 shadow-sm border border-orange-200">
            DIRECT ACADEMIC CONSULTATION
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-slate-900 mb-4 text-center">
            Connect with InkMonk Research
          </h1>
          <p className="text-slate-600 text-base sm:text-lg text-center leading-relaxed font-medium">
            Connect directly with founders <strong className="text-slate-900 font-bold">Tuhit Roy</strong> and <strong className="text-slate-900 font-bold">Sampreeti Mukherjee</strong>. We review and respond swiftly to all scholarly briefs, quotes, and research requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

          {/* Contact Details Column */}
          <div className="space-y-6">

            {/* Office Address Card */}
            <div className="card-clay-white p-7 flex flex-col items-center text-center">
              <LocationRealIcon className="w-12 h-12 mb-3 text-[#F95721]" />
              <h3 className="font-serif font-black text-xl text-slate-900 mb-2 text-center">Office Address</h3>
              <p className="text-slate-600 text-sm leading-relaxed text-center font-medium">
                Karunamoyee, Sector 2, Salt Lake City,<br />
                Kolkata 700091, West Bengal, India
              </p>
              <span className="inline-block mt-3 text-xs bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full font-bold">
                Visits by prior appointment
              </span>
            </div>

            {/* WhatsApp & Instant Advisory Card */}
            <div className="card-clay-white p-7 flex flex-col items-center text-center border-2 border-emerald-400">
              <WhatsAppRealIcon className="w-12 h-12 mb-3" />
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">Online &amp; Available</span>
              </div>
              <h3 className="font-serif font-black text-xl text-slate-900 mb-2 text-center">Direct WhatsApp</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-4 text-center leading-relaxed font-medium">
                Direct consultation for urgent deadlines and instant quotes with our directors.
              </p>
              <a
                href="https://wa.me/917980470880"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clay-orange w-full justify-center text-sm font-bold"
              >
                Chat on WhatsApp (+91 7980470880)
              </a>
            </div>

            {/* Email Support Card */}
            <div className="card-clay-white p-7 flex flex-col items-center text-center">
              <EmailRealIcon className="w-12 h-12 mb-3 text-[#2563EB]" />
              <h3 className="font-serif font-black text-xl text-slate-900 mb-2 text-center">Email Desk</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-3 text-center leading-relaxed font-medium">
                For detailed research briefs, institutional contracts, and manuscript attachments.
              </p>
              <a
                href="mailto:inkmonkresearch@gmail.com"
                className="text-[#2563EB] font-black text-sm hover:underline"
              >
                inkmonkresearch@gmail.com
              </a>
            </div>

          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-2">
            <div className="card-clay-white p-8 md:p-10 text-center h-full shadow-lg">
              <h2 className="font-serif text-3xl font-black text-slate-900 mb-2 text-center">
                Send an Academic Inquiry
              </h2>
              <p className="text-slate-600 text-sm mb-8 text-center font-medium">
                Fill in your project specifications below. Our directors review and respond within 2 to 4 business hours.
              </p>

              {submitted ? (
                <div className="p-8 bg-orange-50 rounded-2xl border border-orange-200 text-center">
                  <OfficialTurnitinLogo className="w-16 h-16 mx-auto mb-3" />
                  <h3 className="font-serif text-2xl font-black text-slate-900 mb-2 text-center">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-slate-700 text-sm max-w-md mx-auto mb-6 text-center leading-relaxed font-medium">
                    Thank you for reaching out to InkMonk Research. Founders Tuhit Roy and Sampreeti Mukherjee have received your submission and will review your specifications promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-clay-white text-xs py-2 px-6"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-left">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Prof. / Scholar Name"
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@university.edu"
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-left">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                        Academic Discipline / Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. PhD Thesis in Computer Science"
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                      Project Requirements &amp; Scope *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your target word count, language (English/Hindi), model implementation needs, and deadlines..."
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-100 text-red-800 text-sm rounded-xl border border-red-300 text-center font-medium">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <OfficialTurnitinLogo className="w-4 h-4" />
                      <span>Strict Academic Non-Disclosure &amp; Confidentiality Assured</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-clay-orange w-full sm:w-auto text-sm px-8 font-black"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Dispatch Inquiry →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* ─── Merged FAQ Section at the End of Contact (Requirement 3) ──── */}
        <div className="mt-20 pt-16 border-t-2 border-slate-200">
          <FaqSection />
        </div>

      </div>
    </div>
  );
}
