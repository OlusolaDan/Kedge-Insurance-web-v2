import React from 'react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { FileText, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';

interface TermsPageProps {
  navigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ navigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          {/* Header */}
          <div className="border-b border-slate-100 pb-6">
            <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
              Legal Terms & Operational Notice
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
              Terms of Use & Website Conditions
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Effective Date: October 2026 · Jurisdiction: Federal Republic of Nigeria
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Important Notice Regarding Insurance Contract Wording:</p>
              <p className="mt-0.5">
                The information provided on this corporate website is for general educational and informational guidance only. It does not constitute a formal contract of insurance or binding cover. Actual insurance protection, scope, deductibles, warranties, conditions precedent, and exclusions are governed solely by the formal Policy Schedule and Policy Document issued by the underwriting insurance company.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              1. Corporate Capacity & Regulatory Status
            </h2>
            <p>
              KEDGE Insurance Brokers Ltd presents itself as an insurance brokerage. Its corporate registration, brokerage licence and current regulatory status must be independently confirmed before relying on this website to establish those credentials. A broker arranges insurance and does not itself underwrite the risk.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              2. Quotation Requests & Non-Binding Indications
            </h2>
            <p>
              Submitting a quotation request or renewal inquiry via this website does not constitute a contract of insurance or bind an insurer to provide cover. Cover is subject to the insurer’s written acceptance, applicable law and the terms of the policy or cover note. Confirm current premium-payment and cover requirements with the insurer or a qualified adviser.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              3. Duty of Utmost Good Faith (Uberrima Fides)
            </h2>
            <p>
              Under Nigerian insurance law, contracts of insurance are contracts of Utmost Good Faith. Prospective policyholders and clients are under a legal duty to disclose all material facts known to them when submitting quote requests, proposal forms, and claims declarations. Failure to disclose material information may result in the policy being voided or claims being repudiated by the underwriting insurer.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              4. Intellectual Property & Brand Usage
            </h2>
            <p>
              All trademarks, corporate marks, slogans (“With You From Now, Into The Future”), text compilations, industry analyses, and coverage matrices displayed on this website are the proprietary property of KEDGE Insurance Brokers Ltd or its licensors and are protected under Nigerian copyright and trademark laws.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              5. Limitation of Liability
            </h2>
            <p>
              While KEDGE strives to maintain accurate, up-to-date information regarding statutory insurance requirements, regulatory limits, and underwriting standards, we do not accept liability for errors or omissions arising from subsequent changes in statutory legislation or judicial interpretation. Visitors must consult directly with our advisory desk for individualized policy assessments.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <h2 className="text-base font-bold text-slate-900 font-display">
              6. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms of Use are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the competent courts of Nigeria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
