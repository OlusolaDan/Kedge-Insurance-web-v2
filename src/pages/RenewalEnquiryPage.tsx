import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Copy, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/companyConfig';

interface RenewalEnquiryPageProps {
  navigate: (path: string) => void;
}

type RenewalResponse = {
  success: boolean;
  reference?: string;
  message?: string;
  errors?: Record<string, string>;
};

export const RenewalEnquiryPage: React.FC<RenewalEnquiryPageProps> = ({ navigate }) => {
  const [policyHolder, setPolicyHolder] = useState('');
  const [currentInsurer, setCurrentInsurer] = useState('');
  const [existingPolicyNumber, setExistingPolicyNumber] = useState('');
  const [insuranceClass, setInsuranceClass] = useState('Motor Comprehensive');
  const [expiryDate, setExpiryDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<RenewalResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const newErrors: Record<string, string> = {};
    if (!policyHolder.trim() || policyHolder.trim().length < 2) {
      newErrors.policyHolder = 'Policyholder or Company name is required';
    }
    if (!insuranceClass) {
      newErrors.insuranceClass = 'Please select the insurance class';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'A valid contact email is required';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'A valid telephone number is required';
    }
    if (!privacyConsent) {
      newErrors.privacyConsent = 'Consent to the privacy notice is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(import.meta.env.DEV ? '/api/renewal' : '/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'renewal',
          policyHolder,
          currentInsurer,
          existingPolicyNumber,
          insuranceClass,
          expiryDate,
          email,
          phone,
          notes,
          privacyConsent,
        }),
      });

      const data = await response.json() as RenewalResponse;

      if (!response.ok || !data.success) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.message || 'Error processing your renewal review request.');
      } else {
        setSuccessData(data);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    } catch (err) {
      setServerError('Connection error connecting to KEDGE server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyRef = () => {
    if (successData?.reference) {
      navigator.clipboard.writeText(successData.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
            Policy Renewal & Technical Audit
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a192f] font-display">
            Renew or Review Existing Insurance
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Is your current insurance expiring within 30–60 days? Let KEDGE conduct an independent policy benchmarking audit to optimize terms and competitive premiums.
          </p>
        </div>

        {successData ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6 text-center animate-in fade-in duration-200">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Renewal Audit Request Received
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {successData.message}
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Renewal Reference:</span>
                <button
                  onClick={copyRef}
                  className="text-xs text-[#0a192f] hover:text-[#c51f1f] inline-flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-lg font-mono font-bold text-[#0a192f]">
                {successData.reference}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSuccessData(null);
                  setExistingPolicyNumber('');
                  setNotes('');
                }}
                className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Submit Another Policy Review
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0a192f] hover:bg-slate-800 rounded-lg"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {serverError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5" role="alert" aria-live="assertive">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="renewal-policy-holder" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Policyholder / Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="renewal-policy-holder"
                    type="text"
                    value={policyHolder}
                    onChange={(e) => setPolicyHolder(e.target.value)}
                    placeholder="e.g. Dangote Cement Distributor Ltd or Chukwuma Obi"
                    aria-invalid={Boolean(errors.policyHolder)}
                    aria-describedby={errors.policyHolder ? 'renewal-policy-holder-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                      errors.policyHolder ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.policyHolder && <p id="renewal-policy-holder-error" className="text-[11px] text-red-600 mt-1" role="alert">{errors.policyHolder}</p>}
                </div>

                <div>
                  <label htmlFor="renewal-insurance-class" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Insurance Class to Renew <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="renewal-insurance-class"
                    value={insuranceClass}
                    onChange={(e) => setInsuranceClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  >
                    <option value="Motor Comprehensive">Motor Comprehensive / Commercial Fleet</option>
                    <option value="Fire & Special Perils">Fire & Special Perils / Public Buildings</option>
                    <option value="Group Life Assurance">Group Life Assurance (PRA 2014)</option>
                    <option value="Marine Cargo Open Cover">Marine Cargo Open Cover</option>
                    <option value="Industrial All Risks">Industrial All Risks / Machinery Breakdown</option>
                    <option value="Public & Product Liability">Public & Product Liability</option>
                    <option value="Professional Indemnity">Professional Indemnity</option>
                    <option value="Goods-in-Transit">Goods-in-Transit (GIT)</option>
                    <option value="Other Specialist Cover">Other Specialist Commercial Cover</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="renewal-current-insurer" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Current Insurance Company <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="renewal-current-insurer"
                    type="text"
                    value={currentInsurer}
                    onChange={(e) => setCurrentInsurer(e.target.value)}
                    placeholder="e.g. Leadway, AIICO, Custodian, AXA Mansard..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  />
                </div>

                <div>
                  <label htmlFor="renewal-policy-number" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Existing Policy Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="renewal-policy-number"
                    type="text"
                    value={existingPolicyNumber}
                    onChange={(e) => setExistingPolicyNumber(e.target.value)}
                    placeholder="e.g. POL/MOT/2025/..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="renewal-expiry-date" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Policy Expiry Date <span className="text-slate-400 font-normal">(If known)</span>
                  </label>
                  <input
                    id="renewal-expiry-date"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  />
                </div>

                <div>
                  <label htmlFor="renewal-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="renewal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@company.ng"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'renewal-email-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && <p id="renewal-email-error" className="text-[11px] text-red-600 mt-1" role="alert">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="renewal-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Telephone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="renewal-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0802 123 4567"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'renewal-phone-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                      errors.phone ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && <p id="renewal-phone-error" className="text-[11px] text-red-600 mt-1" role="alert">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="renewal-notes" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Renewal Audit Notes & Desired Improvements
                </label>
                <textarea
                  id="renewal-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. We added 3 delivery vans to our fleet this year, or we wish to benchmark premium rates..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                />
              </div>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    id="renewal-privacy-consent"
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    aria-invalid={Boolean(errors.privacyConsent)}
                    aria-describedby={errors.privacyConsent ? 'renewal-privacy-error' : undefined}
                    className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 mt-0.5"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I consent to KEDGE Insurance Brokers Ltd reviewing these policy details to prepare competitive renewal terms in line with our{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/privacy-policy')}
                      className="text-[#0a192f] font-semibold underline"
                    >
                      Privacy Policy
                    </button>.
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p id="renewal-privacy-error" className="text-[11px] text-red-600 mt-1 ml-6.5" role="alert">{errors.privacyConsent}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Secure intake · No public file uploads required
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 text-sm font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm transition-all disabled:opacity-50"
                >
                  {loading ? 'Logging Renewal Request...' : 'Submit Policy for Renewal Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
