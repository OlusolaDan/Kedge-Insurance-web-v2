import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [enquiryType, setEnquiryType] = useState('General Advisory');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    // Client-side quick check
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'A valid email address is required';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'A valid telephone number is required';
    }
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please provide details of your enquiry (minimum 10 characters)';
    }
    if (!privacyConsent) {
      newErrors.privacyConsent = 'You must accept the privacy notice to submit';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          fullName,
          email,
          phone,
          subject: subject || 'General Advisory Enquiry',
          enquiryType,
          message,
          privacyConsent,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.message || 'Error processing your enquiry. Please check your inputs.');
      } else {
        setSuccessData(data);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    } catch (err: any) {
      setServerError('Network error connecting to KEDGE backend. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyReference = () => {
    if (successData?.reference) {
      navigator.clipboard.writeText(successData.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
            Communication Desk
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a192f] font-display">
            Contact KEDGE Insurance Brokers Ltd
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Speak with an insurance broker regarding corporate risk advisory, policy placement, claims assistance, or regulatory compliance reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h2 className="text-base font-bold text-slate-900 font-display">
                Office & Contact Channels
              </h2>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Commercial Operations Hub</p>
                  <p>{COMPANY_CONFIG.headOffice.verificationStatus === 'Verified' ? COMPANY_CONFIG.headOffice.addressLine1 : 'Address awaiting confirmation'}</p>
                  {COMPANY_CONFIG.headOffice.verificationStatus === 'Verified' && <p>{COMPANY_CONFIG.headOffice.city}, {COMPANY_CONFIG.headOffice.state}, Nigeria</p>}
                  <span className="text-[11px] text-amber-700 italic block mt-1">
                    {COMPANY_CONFIG.headOffice.verificationStatus === 'Verified' ? 'Verified' : 'Details pending confirmation'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Telephone Inquiries</p>
                  {COMPANY_CONFIG.phoneNumbers.primary ? <a href={`tel:${COMPANY_CONFIG.phoneNumbers.primary}`} className="hover:text-[#c51f1f] block font-mono">{COMPANY_CONFIG.phoneNumbers.primary}</a> : <p>Telephone details awaiting confirmation.</p>}
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Email Correspondence</p>
                  {COMPANY_CONFIG.emails.generalEnquiry ? <a href={`mailto:${COMPANY_CONFIG.emails.generalEnquiry}`} className="hover:text-[#c51f1f] block">{COMPANY_CONFIG.emails.generalEnquiry}</a> : <p>Email details awaiting confirmation.</p>}
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Office Working Hours</p>
                  <p>{COMPANY_CONFIG.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => navigate('/claims-assistance')}
                className="p-4 bg-white rounded-xl border border-slate-200 text-left hover:border-slate-300 shadow-xs"
              >
                <span className="font-bold text-[#0a192f] block">Claims Help</span>
                <span className="text-slate-500 text-[11px] mt-0.5 block">Step-by-step reporting</span>
              </button>
              <button
                onClick={() => navigate('/renewal-enquiry')}
                className="p-4 bg-white rounded-xl border border-slate-200 text-left hover:border-slate-300 shadow-xs"
              >
                <span className="font-bold text-[#0a192f] block">Renewals</span>
                <span className="text-slate-500 text-[11px] mt-0.5 block">Audit existing policy</span>
              </button>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            {successData ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 text-center animate-in fade-in duration-150">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Enquiry Logged with Technical Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                    {successData.message}
                  </p>
                </div>

                <div className="max-w-sm mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Tracking Reference:</span>
                    <button
                      onClick={copyReference}
                      className="text-xs text-[#0a192f] hover:text-[#c51f1f] inline-flex items-center gap-1 font-semibold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-base font-mono font-bold text-[#0a192f]">
                    {successData.reference}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSuccessData(null);
                    setMessage('');
                    setSubject('');
                  }}
                  className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
                  Send an Advisory Enquiry
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Validated securely on KEDGE backend servers. Response provided within 1 business day.
                </p>

                {serverError && (
                  <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Olumide Johnson"
                        className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                          errors.fullName ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="olumide@example.com"
                        className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                          errors.email ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Telephone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0802 345 6789"
                        className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                          errors.phone ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nature of Enquiry
                      </label>
                      <select
                        value={enquiryType}
                        onChange={(e) => setEnquiryType(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                      >
                        <option value="General Advisory">General Corporate Advisory</option>
                        <option value="Statutory Compliance Audit">Statutory Compliance Audit</option>
                        <option value="Claims Dispute Support">Claims Dispute & Advocacy</option>
                        <option value="Policy Wording Review">Policy Wording Review</option>
                        <option value="Partnership / Tender Support">Partnership / Tender Documentation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Audit of Marine Cargo & Fire Policies"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please share context regarding your organisation, current insurers, or specific questions..."
                      className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                        errors.message ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <div>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 mt-0.5"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I consent to KEDGE Insurance Brokers Ltd processing my contact information to respond to this enquiry pursuant to the Nigeria Data Protection Act 2023.
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <p className="text-[11px] text-red-600 mt-1 ml-6.5">{errors.privacyConsent}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-7 py-2.5 text-xs font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm transition-all disabled:opacity-50"
                    >
                      {loading ? 'Submitting to Backend...' : 'Send Enquiry'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
