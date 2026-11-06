import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import { INSURANCE_SERVICES } from '../data/servicesData';

interface QuotePageProps { navigate: (path: string) => void; preselectedService?: string | null; }
type QuoteResponse = { success: boolean; reference?: string; message?: string; errors?: Record<string, string>; details?: { category?: string; clientName?: string } };
const categories = ['Motor', 'Marine & Aviation', 'Property & Engineering', 'Liability', 'Life & Personal', 'Commercial & Specialist', 'Other / Not sure'];

export const QuotePage: React.FC<QuotePageProps> = ({ navigate, preselectedService }) => {
  const [step, setStep] = useState(1);
  const [clientType, setClientType] = useState<'Individual' | 'Business'>('Individual');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [specificProduct, setSpecificProduct] = useState('');
  const [assetDetails, setAssetDetails] = useState('');
  const [estimatedSumInsured, setEstimatedSumInsured] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState<QuoteResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const products = INSURANCE_SERVICES.filter((service) => service.category === category);

  useEffect(() => {
    if (!preselectedService) return;
    const match = INSURANCE_SERVICES.find((service) => service.name.toLowerCase() === preselectedService.toLowerCase() || service.id === preselectedService);
    if (match) { setCategory(match.category); setSpecificProduct(match.name); }
    else { setCategory('Other / Not sure'); setDescription(`Enquiry regarding: ${preselectedService}`); }
  }, [preselectedService]);

  const checkDetails = () => {
    const next: Record<string, string> = {};
    if (fullName.trim().length < 2) next.fullName = 'Enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.';
    if (phone.replace(/\D/g, '').length < 8) next.phone = 'Enter a valid telephone number.';
    if (description.trim().length < 10) next.description = 'Describe your requirement in at least 10 characters.';
    if (!privacyConsent) next.privacyConsent = 'Consent to the privacy notice is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!checkDetails()) { setStep(2); return; }
    setLoading(true); setServerError('');
    try {
      const response = await fetch(import.meta.env.DEV ? '/api/quote' : '/api/submit.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'quote', clientType, fullName: fullName.trim(), organization: organization.trim(), email: email.trim(), phone: phone.trim(), category, specificProduct, assetDetails: assetDetails.trim(), estimatedSumInsured: estimatedSumInsured.trim(), startDate, description: description.trim(), privacyConsent }),
      });
      const data = await response.json() as QuoteResponse;
      if (!response.ok || !data.success) { setErrors(data.errors ?? {}); if (data.errors && Object.keys(data.errors).length) setStep(2); setServerError(data.message || 'We could not submit your enquiry. Please try again.'); return; }
      setSuccess(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setServerError('We could not connect to the enquiry service. Please try again or contact KEDGE using the details on the Contact page.');
    } finally { setLoading(false); }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault(); setServerError('');
    if (step === 1) {
      if (!category) { setErrors({ category: 'Choose a category or select “Other / Not sure”.' }); return; }
      setErrors({}); setStep(2); return;
    }
    if (step === 2) { if (checkDetails()) setStep(3); return; }
    void submit();
  };
  const copyReference = async () => { if (!success?.reference) return; await navigator.clipboard.writeText(success.reference); setCopied(true); window.setTimeout(() => setCopied(false), 2000); };
  const inputClass = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 focus:border-[#0a192f] focus:outline-none focus:ring-2 focus:ring-[#0a192f]';

  return <div className="min-h-screen bg-slate-50 py-10 sm:py-14"><div className="mx-auto max-w-3xl px-4 sm:px-6">
    <header className="mb-8 text-center"><p className="text-xs font-semibold uppercase tracking-wider text-[#c51f1f]">Quotation enquiry</p><h1 className="mt-2 text-3xl font-bold text-[#0a192f] sm:text-4xl">Request a conversation with an adviser</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">Tell us what you need to protect. A KEDGE adviser will review your enquiry and follow up. This form requests an expert callback; it does not calculate or bind insurance cover.</p></header>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      {success ? <section className="space-y-5 text-center" role="status" aria-live="polite"><CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600"/><h2 className="text-2xl font-bold text-[#0a192f]">Enquiry accepted</h2><p className="text-sm text-slate-600">{import.meta.env.DEV ? 'The local development service accepted this test enquiry. It was not sent to KEDGE.' : 'The configured enquiry service accepted your submission for processing.'} This confirms endpoint acceptance, not delivery to an inbox. An adviser can review the enquiry and follow up using the contact details provided.</p>{success.reference && <div className="mx-auto max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-4 text-left"><div className="flex items-center justify-between text-xs text-slate-600"><span>Reference</span><button type="button" onClick={() => void copyReference()} className="inline-flex items-center gap-1 font-semibold text-[#0a192f] focus-visible:outline focus-visible:outline-2"><span>{copied ? 'Copied' : 'Copy'}</span>{copied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}</button></div><p className="mt-1 font-mono text-lg font-bold text-[#0a192f]">{success.reference}</p></div>}<button type="button" onClick={() => navigate('/services')} className="min-h-11 rounded-lg bg-[#0a192f] px-5 py-3 text-sm font-semibold text-white">Browse insurance services</button></section> : <>
        <div className="mb-7" aria-label={`Step ${step} of 3`}><div className="flex justify-between text-xs font-semibold text-slate-600"><span>Step {step} of 3</span><span>{['Your cover', 'Your details', 'Review'][step - 1]}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#c51f1f] transition-all" style={{ width: `${step * 33.333}%` }}/></div></div>
        {serverError && <div className="mb-5 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert"><AlertCircle className="h-5 w-5 shrink-0"/>{serverError}</div>}
        <form onSubmit={onSubmit} noValidate>
          {step === 1 && <section aria-labelledby="quote-step-one"><h2 id="quote-step-one" className="text-xl font-bold text-[#0a192f]">What would you like to protect?</h2><div className="mt-5"><label htmlFor="category" className="text-sm font-semibold text-slate-700">Insurance category <span className="text-red-700">*</span></label><select id="category" value={category} onChange={(event) => { setCategory(event.target.value); setSpecificProduct(''); setErrors({}); }} className={inputClass}><option value="">Select a category</option>{categories.map((value) => <option key={value} value={value}>{value}</option>)}</select>{errors.category && <p className="mt-1 text-sm text-red-700" role="alert">{errors.category}</p>}</div>{products.length > 0 && <div className="mt-5"><label htmlFor="product" className="text-sm font-semibold text-slate-700">Specific product (optional)</label><select id="product" value={specificProduct} onChange={(event) => setSpecificProduct(event.target.value)} className={inputClass}><option value="">I’m not sure / I’d like advice</option>{products.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}</select></div>}</section>}
          {step === 2 && <section aria-labelledby="quote-step-two"><h2 id="quote-step-two" className="text-xl font-bold text-[#0a192f]">Your contact and risk details</h2><fieldset className="mt-5"><legend className="text-sm font-semibold text-slate-700">I’m enquiring as</legend><div className="mt-2 flex gap-3">{(['Individual', 'Business'] as const).map((value) => <button key={value} type="button" aria-pressed={clientType === value} onClick={() => setClientType(value)} className={`min-h-11 rounded-lg border px-4 text-sm font-semibold ${clientType === value ? 'border-[#0a192f] bg-[#0a192f] text-white' : 'border-slate-300 text-slate-700'}`}>{value}</button>)}</div></fieldset><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field id="fullName" label={clientType === 'Business' ? 'Contact person' : 'Full name'} value={fullName} onChange={setFullName} error={errors.fullName} required/><Field id="organization" label="Business or organisation (optional)" value={organization} onChange={setOrganization}/><Field id="email" label="Email address" type="email" value={email} onChange={setEmail} error={errors.email} required/><Field id="phone" label="Telephone number" type="tel" value={phone} onChange={setPhone} error={errors.phone} required/></div>{category === 'Motor' && <Field id="assetDetails" label="Vehicle details (optional)" value={assetDetails} onChange={setAssetDetails} placeholder="Vehicle make/model, year or fleet size"/>}{category === 'Property & Engineering' && <Field id="assetDetails" label="Property or project details (optional)" value={assetDetails} onChange={setAssetDetails} placeholder="Property type, location or project"/>}{category === 'Marine & Aviation' && <Field id="assetDetails" label="Cargo or aviation details (optional)" value={assetDetails} onChange={setAssetDetails} placeholder="Goods, route or asset details"/>}<div className="mt-4 grid gap-4 sm:grid-cols-2"><Field id="sumInsured" label="Estimated asset value (optional)" value={estimatedSumInsured} onChange={setEstimatedSumInsured} placeholder="Approximate value, if known"/><Field id="startDate" label="Preferred cover start date (optional)" type="date" value={startDate} onChange={setStartDate}/></div><div className="mt-4"><label htmlFor="description" className="text-sm font-semibold text-slate-700">Tell us about your requirement <span className="text-red-700">*</span></label><textarea id="description" rows={4} value={description} onChange={(event) => setDescription(event.target.value)} className={inputClass} placeholder="Share relevant risk details or questions. Please do not include identity documents or payment details." aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined}/>{errors.description && <p id="description-error" className="mt-1 text-sm text-red-700" role="alert">{errors.description}</p>}</div><div className="mt-5"><label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input type="checkbox" checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-[#c51f1f]" aria-invalid={Boolean(errors.privacyConsent)}/><span>I agree that KEDGE may use these details to respond to my enquiry, as described in the <button type="button" onClick={() => navigate('/privacy-policy')} className="font-semibold text-[#0a192f] underline">Privacy Policy</button>.</span></label>{errors.privacyConsent && <p className="mt-1 text-sm text-red-700" role="alert">{errors.privacyConsent}</p>}</div></section>}
          {step === 3 && <section aria-labelledby="quote-step-three"><h2 id="quote-step-three" className="text-xl font-bold text-[#0a192f]">Review your enquiry</h2><dl className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 px-4">{[['Enquiry type', clientType], ['Category', category], ['Product', specificProduct || 'Advice requested'], ['Name', fullName], ['Business', organization || 'Not provided'], ['Email', email], ['Telephone', phone], ['Risk details', [assetDetails, description].filter(Boolean).join(' — ')], ['Estimated value', estimatedSumInsured || 'Not provided'], ['Preferred start date', startDate || 'Not provided']].map(([label, value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]"><dt className="text-sm font-semibold text-slate-600">{label}</dt><dd className="break-words text-sm text-slate-900">{value}</dd></div>)}</dl><p className="mt-4 text-xs leading-relaxed text-slate-500">Submitting sends this enquiry to KEDGE for follow-up. It is not an insurance quote, policy, or confirmation of cover.</p></section>}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">{step > 1 ? <button type="button" onClick={() => { setErrors({}); setStep(step - 1); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"><ArrowLeft className="h-4 w-4"/>Back</button> : <span/>}<button type="submit" disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#c51f1f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a81717] disabled:opacity-60">{loading ? 'Submitting…' : step === 3 ? 'Submit enquiry' : 'Continue'}{step < 3 && <ArrowRight className="h-4 w-4"/>}</button></div>
        </form>
      </>}
    </div></div></div>;
};

function Field({ id, label, value, onChange, error, type = 'text', placeholder, required = false }: { id: string; label: string; value: string; onChange: (value: string) => void; error?: string; type?: string; placeholder?: string; required?: boolean }) {
  return <div className="mt-4"><label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}{required && <> <span className="text-red-700">*</span></>}</label><input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900 focus:border-[#0a192f] focus:outline-none focus:ring-2 focus:ring-[#0a192f]"/>{error && <p id={`${id}-error`} className="mt-1 text-sm text-red-700" role="alert">{error}</p>}</div>;
}
