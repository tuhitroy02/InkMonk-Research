'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LocationRealIcon,
  WhatsAppRealIcon,
  EmailRealIcon,
  TurnitinShieldLogo,
} from '@/components/RealIcons';

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
    <div className="min-h-screen bg-[#F9F7F4] py-16 px-4 text-center">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3">Direct Academic Consultation</div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0A1128] mb-4 text-center">
            Connect with InkMonk Research
          </h1>
          <p className="text-slate-600 text-base sm:text-lg text-center leading-relaxed">
            Connect directly with founders <strong>Tuhit Roy</strong> and <strong>Sampreeti Mukherjee</strong>. We review and respond swiftly to all scholarly briefs, quotes, and research requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

          {/* Contact Details Column (3D Futuristic Cards) */}
          <div className="space-y-6">

            {/* Office Address Card */}
            <div className="card-futuristic-3d p-7 flex flex-col items-center text-center">
              <LocationRealIcon className="w-12 h-12 mb-3" />
              <h3 className="font-serif font-bold text-xl text-[#0A1128] mb-2 text-center">Office Address</h3>
              <p className="text-slate-600 text-sm leading-relaxed text-center">
                Karunamoyee, Sector 2, Salt Lake City,<br />
                Kolkata 700091, West Bengal, India
              </p>
              <span className="inline-block mt-3 text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold">
                Visits by prior appointment
              </span>
            </div>

            {/* WhatsApp & Instant Advisory Card */}
            <div className="card-futuristic-3d p-7 flex flex-col items-center text-center border-2 border-emerald-400/40">
              <WhatsAppRealIcon className="w-12 h-12 mb-3" />
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Online &amp; Available</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#0A1128] mb-2 text-center">Direct WhatsApp</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-4 text-center leading-relaxed">
                Direct consultation for urgent deadlines and instant quotes with our directors.
              </p>
              <a
                href="https://wa.me/917980470880"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-pill w-full justify-center text-sm"
              >
                Chat on WhatsApp (+91 7980470880)
              </a>
            </div>

            {/* Email Support Card */}
            <div className="card-futuristic-3d p-7 flex flex-col items-center text-center">
              <EmailRealIcon className="w-12 h-12 mb-3" />
              <h3 className="font-serif font-bold text-xl text-[#0A1128] mb-2 text-center">Email Desk</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-3 text-center leading-relaxed">
                For detailed research briefs, institutional contracts, and manuscript attachments.
              </p>
              <a
                href="mailto:inkmonkresearch@gmail.com"
                className="text-orange-600 font-bold text-sm hover:underline"
              >
                inkmonkresearch@gmail.com
              </a>
            </div>

          </div>

          {/* Inquiry Form Column (Sleek Glassmorphic 3D Card) */}
          <div className="lg:col-span-2">
            <div className="card-futuristic-3d p-8 md:p-10 text-center">
              <h2 className="font-serif text-3xl font-bold text-[#0A1128] mb-2 text-center">
                Send an Academic Inquiry
              </h2>
              <p className="text-slate-600 text-sm mb-8 text-center">
                Fill in your project specifications below. Our directors review and respond within 2 to 4 business hours.
              </p>

              {submitted ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-300 text-center animate-3d-float">
                  <TurnitinShieldLogo className="w-16 h-16 mx-auto mb-3" />
                  <h3 className="font-serif text-2xl font-bold text-emerald-900 mb-2 text-center">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-emerald-700 text-sm max-w-md mx-auto mb-6 text-center leading-relaxed">
                    Thank you for reaching out to InkMonk Research. Founders Tuhit Roy and Sampreeti Mukherjee have received your submission and will review your specifications promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary-dark !text-emerald-900 !border-emerald-600 hover:!bg-emerald-100 text-xs py-2 px-6"
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
                        className="input-field text-sm"
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
                        className="input-field text-sm"
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
                        className="input-field text-sm"
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
                        className="input-field text-sm"
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
                      className="input-field text-sm"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <TurnitinShieldLogo className="w-4 h-4" />
                      <span>Strict Academic Non-Disclosure &amp; Confidentiality Assured</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary-glow w-full sm:w-auto text-sm px-8"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Dispatch Inquiry →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
