import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Copy, Check, FileCheck, PhoneCall, HelpCircle } from 'lucide-react';
import { INSURANCE_SERVICES } from '../data/servicesData';
import { COMPANY_CONFIG } from '../data/companyConfig';

interface QuotePageProps {
  navigate: (path: string) => void;
  preselectedService?: string | null;
}

export const QuotePage: React.FC<QuotePageProps> = ({ navigate, preselectedService }) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Motor');
  const [specificProduct, setSpecificProduct] = useState('');
  const [estimatedSumInsured, setEstimatedSumInsured] = useState('');
  const [description, setDescription] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // States
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  // Populate preselected service if provided
  useEffect(() => {
    if (preselectedService) {
      const match = INSURANCE_SERVICES.find(
        (s) => s.name.toLowerCase() === preselectedService.toLowerCase() || s.id === preselectedService
      );
      if (match) {
        setCategory(match.category);
        setSpecificProduct(match.name);
      } else {
        setDescription(`Inquiry regarding: ${preselectedService}`);
      }
    }
  }, [preselectedService]);

  // Available products for current category
  const productsForCategory = INSURANCE_SERVICES.filter((s) => s.category === category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    // Client-side quick check
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required (minimum 2 characters)';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'A valid email address is required';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'A valid contact telephone number is required';
    }
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = 'Please describe your insurance requirement (minimum 10 characters)';
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
      const payload = {
        type: 'quote',
        fullName,
        organization,
        email,
        phone,
        category,
        specificProduct: specificProduct || productsForCategory[0]?.name || category,
        estimatedSumInsured,
        description,
        privacyConsent,
      };

      const response = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(data.message || 'Server rejected the submission. Please check your details.');
      } else {
        setSubmissionSuccess(data);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    } catch (err: any) {
      setServerError('Network communication error with KEDGE server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyReference = () => {
    if (submissionSuccess?.reference) {
      navigator.clipboard.writeText(submissionSuccess.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
            Technical Quote Desk
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a192f] font-display">
            Request an Insurance Quotation
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Provide details of your insurable interest. As insurance brokers, KEDGE surveys the market to negotiate optimal coverage terms across NAICOM-registered insurers.
          </p>
        </div>

        {submissionSuccess ? (
          /* Success Screen with Verified Reference Code */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6 text-center animate-in fade-in duration-200">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Quotation Request Logged Successfully
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                {submissionSuccess.message}
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2">
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
              <p className="text-lg font-mono font-bold text-[#0a192f] tracking-wide">
                {submissionSuccess.reference}
              </p>
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-200 space-y-1">
                <p>Category: <strong className="text-slate-800">{submissionSuccess.details?.category}</strong></p>
                <p>Client: <strong className="text-slate-800">{submissionSuccess.details?.clientName}</strong></p>
                <p>Expected Review: <strong className="text-emerald-700">{submissionSuccess.estimatedResponseTime}</strong></p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSubmissionSuccess(null);
                  setDescription('');
                  setEstimatedSumInsured('');
                }}
                className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Submit Another Request
              </button>
              <button
                onClick={() => navigate('/services')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0a192f] hover:bg-slate-800 rounded-lg"
              >
                Browse Insurance Directory
              </button>
            </div>
          </div>
        ) : (
          /* Quote Request Form */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {serverError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Submission Error</p>
                  <p>{serverError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal / Org Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                      errors.fullName ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Company / Organisation Name <span className="text-slate-400 font-normal">(Optional for private)</span>
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Apex Logistics Nigeria Ltd"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="babatunde@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Telephone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567 or +234..."
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                      errors.phone ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Category & Product Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Insurance Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSpecificProduct('');
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  >
                    <option value="Motor">Motor Insurance</option>
                    <option value="Marine & Aviation">Marine & Aviation Insurance</option>
                    <option value="Property & Engineering">Property & Engineering Insurance</option>
                    <option value="Liability">Liability Insurance</option>
                    <option value="Life & Personal">Life & Personal Insurance</option>
                    <option value="Commercial & Specialist">Commercial & Specialist Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Specific Insurance Class / Product
                  </label>
                  <select
                    value={specificProduct}
                    onChange={(e) => setSpecificProduct(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  >
                    <option value="">-- Select Specific Product (or describe below) --</option>
                    {productsForCategory.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name} {prod.isCompulsoryInNigeria ? '(Statutory Compulsory)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sum Insured */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Estimated Total Sum Insured / Asset Value (Naira or USD)
                </label>
                <input
                  type="text"
                  value={estimatedSumInsured}
                  onChange={(e) => setEstimatedSumInsured(e.target.value)}
                  placeholder="e.g. ₦45,000,000 (Vehicles) or $500,000 (Marine Cargo)"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Accurate valuation helps prevent under-insurance penalties under the Average Clause.
                </p>
              </div>

              {/* Requirement Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Description of Insurance Requirement & Operating Context <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the risk, vehicle models/fleet count, building location, nature of cargo, or current insurance expiry date..."
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f] ${
                    errors.description ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.description && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>
                )}
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 mt-0.5"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I consent to KEDGE Insurance Brokers Ltd collecting and processing this information in accordance with our{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/privacy-policy')}
                      className="text-[#0a192f] font-semibold underline"
                    >
                      Privacy Policy (Nigeria Data Protection Act 2023)
                    </button>{' '}
                    to review our risk profile and generate underwriting terms.
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p className="text-[11px] text-red-600 mt-1 ml-6.5">{errors.privacyConsent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Strictly confidential · Zero broker fee to client
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  {loading ? 'Processing on KEDGE Server...' : 'Submit Quotation Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
