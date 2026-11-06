import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { ShieldAlert, FileText, Phone, Mail, AlertCircle, CheckCircle2, Clock, Scale } from 'lucide-react';

interface ClaimsAssistancePageProps {
  navigate: (path: string) => void;
}

export const ClaimsAssistancePage: React.FC<ClaimsAssistancePageProps> = ({ navigate }) => {
  const [selectedClass, setSelectedClass] = useState<string>('motor');

  const documentChecklists: Record<string, { title: string; docs: string[] }> = {
    motor: {
      title: 'Motor Accident, Fire, or Theft Claims',
      docs: [
        'Duly completed and signed Motor Claim Form',
        'Copy of Insured Driver’s valid Nigerian Driver’s Licence',
        'Official Police Incident Report (Mandatory for theft, fatal injury, or major third-party damage)',
        'Clear photographs of damage showing vehicle registration number and collision angles',
        'Detailed itemized repair estimate from an authorized garage or automobile workshop',
        'Third-party details (vehicle registration, driver’s contact, and third-party insurer details if known)',
      ],
    },
    property: {
      title: 'Property Fire, Storm, or Special Perils Claims',
      docs: [
        'Duly completed Fire & Special Perils Claim Form',
        'Federal / State Fire Service Incident Investigation Report (for fire outbreaks)',
        'Photographic evidence of physical destruction prior to site disturbance',
        'Itemized schedule of damaged stock, machinery, or building structures',
        'Original purchase invoices, bills of quantities (BOQ), or replacement quotations',
        'Stock inventory ledgers immediately preceding the date of loss',
      ],
    },
    marine: {
      title: 'Marine Cargo & Transit Damage Claims',
      docs: [
        'Duly completed Marine Cargo Claim Form',
        'Original Bill of Lading (B/L) or Air Waybill (AWB)',
        'Commercial Invoice and Supplier Packing List',
        'Customs Single Goods Declaration (SGD) and Assessment Notice',
        'Port Terminal Outturn Report or Delivery Order indicating damaged packages',
        'Joint Survey Report conducted with underwriter-appointed marine surveyor',
        'Formal letter holding shipping line / carrier liable for transit loss',
      ],
    },
    burglary: {
      title: 'Commercial Burglary & Theft Claims',
      docs: [
        'Duly completed Burglary Claim Form',
        'Certified Police Station Diary Extract and Crime Investigation Report',
        'Photographic proof of forcible and violent entry into or exit from premises',
        'Inventory registers verifying stolen stock quantities and cost values',
        'Premises security guard report and CCTV footage excerpts where available',
      ],
    },
    lifegpa: {
      title: 'Group Life & Personal Accident Claims',
      docs: [
        'Duly completed Group Life / GPA Claim Form',
        'Original Medical Death Certificate issued by a registered medical practitioner',
        'National Population Commission (NPC) Death Certificate',
        'Employer official letter certifying employment status and salary record',
        'Last 3 months payslips verifying Total Emoluments calculation',
        'For GPA injury claims: Attending physician’s medical treatment discharge summary and receipts',
      ],
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
            Claims Support Desk
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a192f] font-display">
            Claims Notification & Settlement Advocacy
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            When an unfortunate insured incident occurs, swift, methodical notification and robust documentation make the difference. Discover how KEDGE guides you through the claims lifecycle.
          </p>
        </div>

        {/* Essential Legal Delineation Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-10 flex items-start gap-3">
          <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Statutory Brokerage Role & Claims Assessment Notice:</p>
            <p>
              As registered insurance brokers, KEDGE acts as your professional advocate to compile, present, and negotiate your claim with the underwriting insurance company. Final determination of policy liability, deductible application, and payment authorization rests with the underwriter in accordance with formal policy conditions and the findings of independent NAICOM-registered loss adjusters. KEDGE does not guarantee claim acceptance.
            </p>
          </div>
        </div>

        {/* Emergency Claims Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="premium-card bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Immediate Phone Notification</h3>
            <p className="text-xs text-slate-600">
              Notify our claims desk immediately upon incident occurrence (within 24–48 hours).
            </p>
            {COMPANY_CONFIG.phoneNumbers.primary ? <a href={`tel:${COMPANY_CONFIG.phoneNumbers.primary}`} className="text-xs font-bold text-[#0a192f] hover:text-[#c51f1f] block pt-1">{COMPANY_CONFIG.phoneNumbers.primary}</a> : <p className="text-xs text-slate-500">Telephone details awaiting confirmation.</p>}
          </div>

          <div className="premium-card bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Email Claims Desk</h3>
            <p className="text-xs text-slate-600">
              Submit incident details and initial photographs to our dedicated claims team.
            </p>
            {COMPANY_CONFIG.emails.claimsSupport ? <a href={`mailto:${COMPANY_CONFIG.emails.claimsSupport}`} className="text-xs font-bold text-[#0a192f] hover:text-[#c51f1f] block pt-1">{COMPANY_CONFIG.emails.claimsSupport}</a> : <p className="text-xs text-slate-500">Email details awaiting confirmation.</p>}
          </div>

          <div className="premium-card bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Time-Barred Notice</h3>
            <p className="text-xs text-slate-600">
              Policies contain strict notification windows. Delays can prejudice underwriter liability.
            </p>
            <span className="text-[11px] text-red-600 font-semibold block pt-1">
              Always notify KEDGE promptly
            </span>
          </div>
        </div>

        {/* Step-by-Step Procedure */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-12">
          <h2 className="text-xl font-bold text-[#0a192f] font-display mb-6">
            The 5-Step Claims Procedure with KEDGE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-xs">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Step 01</span>
              <h4 className="font-bold text-slate-900 text-sm">Mitigate & Protect</h4>
              <p className="text-slate-600 leading-relaxed">
                Take reasonable immediate steps to prevent further damage. Extinguish fire, isolate leaking pipes, or arrange emergency towing.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Step 02</span>
              <h4 className="font-bold text-slate-900 text-sm">Notify KEDGE</h4>
              <p className="text-slate-600 leading-relaxed">
                Send initial notification with policy number, date of incident, brief circumstances, and estimated scale of damage.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Step 03</span>
              <h4 className="font-bold text-slate-900 text-sm">Underwriter & Adjuster Survey</h4>
              <p className="text-slate-600 leading-relaxed">
                KEDGE formally notifies the underwriter, who appoints an independent loss adjuster. We attend and guide the site survey.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Step 04</span>
              <h4 className="font-bold text-slate-900 text-sm">Documentation</h4>
              <p className="text-slate-600 leading-relaxed">
                We assist you in gathering police extracts, purchase invoices, and repair estimates to support the claim without delays.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Step 05</span>
              <h4 className="font-bold text-slate-900 text-sm">Settlement & Discharge</h4>
              <p className="text-slate-600 leading-relaxed">
                We examine the adjuster’s adjustment report, challenge unwarranted deductions, and secure the discharge voucher for payout.
              </p>
            </div>
          </div>
        </div>

        {/* Class-Specific Document Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#0a192f] font-display">
              Substantiating Document Checklist by Insurance Class
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select an insurance category to review potentially required documentation:
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedClass('motor')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedClass === 'motor' ? 'bg-[#0a192f] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Motor Claims
            </button>
            <button
              onClick={() => setSelectedClass('property')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedClass === 'property' ? 'bg-[#0a192f] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Fire & Property
            </button>
            <button
              onClick={() => setSelectedClass('marine')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedClass === 'marine' ? 'bg-[#0a192f] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Marine Cargo
            </button>
            <button
              onClick={() => setSelectedClass('burglary')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedClass === 'burglary' ? 'bg-[#0a192f] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Burglary & Theft
            </button>
            <button
              onClick={() => setSelectedClass('lifegpa')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedClass === 'lifegpa' ? 'bg-[#0a192f] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Group Life & GPA
            </button>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 font-display">
              {documentChecklists[selectedClass].title}
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              {documentChecklists[selectedClass].docs.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 italic">
              Note: Exact documentation varies depending on underwriter requirements and specific incident circumstances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
