import React from 'react';
import { ArrowRight, ShieldCheck, AlertTriangle, FileText, Activity, RefreshCw, LifeBuoy, CheckCircle2, Scale } from 'lucide-react';

interface RiskManagementPageProps {
  navigate: (path: string) => void;
}

export const RiskManagementPage: React.FC<RiskManagementPageProps> = ({ navigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Risk Identification & Operational Surveys',
      description: 'Physical walk-through inspections and operational interviews to catalogue tangible and intangible hazard sources—physical plant fire hazards, transit route risks, cargo handling vulnerabilities, and contractual indemnities.',
      role: 'Insurance Brokerage Scope: Identifying insurable exposures against standardized underwriting benchmarks.',
    },
    {
      num: '02',
      title: 'Exposure Assessment & Financial Quantification',
      description: 'Evaluating Maximum Foreseeable Loss (MFL) and Normal Loss Expectancy (NLE). Ensuring sum-insured values reflect current replacement and rebuilding costs in Naira to prevent under-insurance penalties under the Average Clause.',
      role: 'Insurance Brokerage Scope: Determining appropriate policy limits and business interruption indemnity periods.',
    },
    {
      num: '03',
      title: 'Risk Prioritisation & Impact Matrix',
      description: 'Ranking exposures by likelihood and catastrophic severity. Distinguishing between high-frequency low-impact losses (suitable for self-insurance or deductibles) versus low-frequency catastrophic perils requiring immediate risk transfer.',
      role: 'Insurance Brokerage Scope: Optimizing client premium expenditure by focusing capital on existential risks.',
    },
    {
      num: '04',
      title: 'Insurance Needs & Policy Gap Analysis',
      description: 'Benchmarking existing company insurance contracts against statutory mandates (Insurance Act 2003, Pension Reform Act 2014) and identifying dangerous coverage gaps, ambiguous endorsements, and uninsured operations.',
      role: 'Insurance Brokerage Scope: Conducting independent technical reviews of existing policy wordings.',
    },
    {
      num: '05',
      title: 'Loss Mitigation & Preventative Advisory',
      description: 'Advising on physical loss prevention measures—fire fighting equipment certification, lightning arrestors, fleet telemetry tracking devices, warehouse perimeter security, and dual-sign-off accounting controls.',
      role: 'Insurance Brokerage Scope: Ensuring warranties required by underwriters are realistically achievable.',
    },
    {
      num: '06',
      title: 'Policy Review & Renewal Optimization',
      description: 'Annual audits conducted 60 to 90 days before expiry. Incorporating new asset acquisitions, staff payroll adjustments, inflation indexation, and soliciting competing underwriter quotations to negotiate favorable rates.',
      role: 'Insurance Brokerage Scope: Leading market negotiations and negotiating claims-free rebate discounts.',
    },
    {
      num: '07',
      title: 'Claims Notification & Advocacy Protocol',
      description: 'Establishing streamlined internal claims reporting protocols. Appointing loss adjusters, ensuring statutory notification windows are met, preserving evidence, and championing the client’s rights through final indemnity settlement.',
      role: 'Insurance Brokerage Scope: Professional advocacy directly with insurers and appointed loss adjusters.',
    },
    {
      num: '08',
      title: 'Business Continuity & Interruption Planning',
      description: 'Structuring Business Interruption and Consequential Loss covers so that continuing fixed payroll, debt interest, executive salaries, and temporary alternative facility rents are reimbursed during rebuilding.',
      role: 'Insurance Brokerage Scope: Placing Gross Profit / Increased Cost of Working indemnity contracts.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-[#0a192f] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">
              Advisory Framework
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
              Risk Management & Insurance Advisory Framework
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Insurance is only as effective as the risk assessment preceding it. We help clients identify, prioritize, and structure protection against Nigerian operational hazards.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Advisory Scope Disclaimer / Boundary */}
      <section className="py-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-[#0a192f] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Professional Brokerage Scope Delineation:</span>
                <p className="mt-0.5">
                  Our risk advisory services focus strictly on insurable risk identification, policy structuring, compliance alignment, and claims advocacy within our licenced insurance brokerage role. We do not provide unconfirmed third-party environmental auditing, engineering certification, or non-insurance legal consultancy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 8-Step Framework */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
              Methodical Execution
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
              The KEDGE 8-Step Risk Management Cycle
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From initial operational audit to final claims settlement advocacy, our structured framework ensures continuous protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="premium-card bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                      Phase {st.num}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {st.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  {st.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
            Request an Independent Risk Review of Your Existing Policies
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Our technical brokers can review your current insurance schedule to verify compliance with Nigerian statutory mandates, identify coverage gaps, and evaluate pricing competitiveness.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/renewal-enquiry')}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm"
            >
              Request Policy Review / Audit
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 text-sm font-semibold text-[#0a192f] bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Contact Advisory Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
