import React from 'react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { Shield, Lock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface PrivacyPolicyPageProps {
  navigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ navigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          {/* Header */}
          <div className="border-b border-slate-100 pb-6">
            <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
              Data Protection & Privacy Notice
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
              Privacy Policy & NDPA 2023 Compliance Statement
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last Updated: October 2026 · Governing Law: Nigeria Data Protection Act (NDPA) 2023
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              1. Introduction & Data Controller Information
            </h2>
            <p>
              KEDGE Insurance Brokers Ltd (“KEDGE”, “we”, “our”, or “us”) is a corporate insurance broking entity incorporated under Nigerian law. This Privacy Notice explains how we collect, store, process, and safeguard personal and organizational data obtained via our corporate website (kedgeinsurance.com.ng) and our digital quotation and advisory workflows.
            </p>
            <p>
              KEDGE acts as a Data Controller in respect of personal data submitted by visitors, clients, and policyholders, and adheres to the principles of lawful, fair, and transparent data processing stipulated under the Nigeria Data Protection Act 2023 (NDPA 2023) and regulations issued by the Nigeria Data Protection Commission (NDPC).
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              2. Information We Collect
            </h2>
            <p>
              We collect only information reasonably necessary to evaluate insurable risks, generate insurance quotations, manage renewals, and process general advisory inquiries. Specifically:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><strong>Contact Information:</strong> Full name, corporate organization name, business email address, telephone numbers, and physical operational address.</li>
              <li><strong>Insurable Risk Information:</strong> Nature of business operations, commercial fleet details, estimated sums insured, cargo transit schedules, building construction permits, and existing policy expiration dates.</li>
              <li><strong>Claims Information:</strong> Circumstances of losses, incident photographs, police extracts, and repair estimates provided during claims notification.</li>
              <li><strong>Technical Metadata:</strong> Standard web server request logs, browser type, and timestamps strictly for system reliability and cyber abuse prevention.</li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              Notice: We do not collect banking credentials, credit card details, biometric identifiers, or sensitive political/religious data through our public website.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              3. Lawful Bases for Data Processing
            </h2>
            <p>
              Under Section 25 of the Nigeria Data Protection Act 2023, we process personal data under the following recognized lawful bases:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><strong>Consent:</strong> Explicit consent provided when ticking the privacy consent checkbox on quote and contact forms.</li>
              <li><strong>Contractual Necessity:</strong> Processing required to prepare underwriting proposals, place insurance policies, and adjust claims on your behalf.</li>
              <li><strong>Legal & Regulatory Obligation:</strong> Compliance with NAICOM reporting directives, Anti-Money Laundering/Combating the Financing of Terrorism (AML/CFT) laws, and statutory compliance certifications.</li>
              <li><strong>Legitimate Interests:</strong> Protecting the security and integrity of our communication infrastructure against fraud and abuse.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              4. Sharing of Information & Third-Party Underwriters
            </h2>
            <p>
              In our capacity as independent insurance brokers, we do not sell or rent personal information to marketing third parties. We share client information strictly with:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><strong>NAICOM-Authorized Underwriting Companies:</strong> To obtain competitive premium quotations, bind coverage, and negotiate claims settlements.</li>
              <li><strong>Appointed Loss Adjusters & Surveyors:</strong> To assess physical damage when an insured claim is lodged.</li>
              <li><strong>Regulatory Bodies:</strong> When legally required by NAICOM, the Nigerian Police, or judicial order.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              5. Data Retention & Security Measures
            </h2>
            <p>
              We retain insurance enquiry records and proposal documentation for the duration of the broker-client relationship plus statutory retention periods prescribed under Nigerian financial services regulations (typically 6 years following policy expiration).
            </p>
            <p>
              We enforce administrative, logical, and technical security controls including encrypted transmission (HTTPS/TLS), firewalled database servers, role-based access restrictions, and strict employee confidentiality covenants.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 font-display">
              6. Your Statutory Rights Under the NDPA 2023
            </h2>
            <p>
              As a data subject under Nigerian law, you possess enforceable rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
              <li>The right to request access to personal data held concerning you.</li>
              <li>The right to rectify inaccurate, out-of-date, or incomplete data.</li>
              <li>The right to request erasure of your data where no overriding legal obligation mandates retention.</li>
              <li>The right to object to or restrict processing under defined statutory conditions.</li>
              <li>The right to withdraw consent previously granted without affecting prior lawful processing.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <h2 className="text-base font-bold text-slate-900 font-display">
              7. Contact Us & Regulatory Complaints
            </h2>
            <p>
              To exercise any of your data protection rights or lodge an inquiry regarding this privacy notice, contact our Data Compliance Desk:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <p><strong>Data Compliance Officer</strong></p>
              <p>KEDGE Insurance Brokers Ltd</p>
              <p>Email: {COMPANY_CONFIG.emails.generalEnquiry ? <a href={`mailto:${COMPANY_CONFIG.emails.generalEnquiry}`} className="text-[#0a192f] font-semibold underline">{COMPANY_CONFIG.emails.generalEnquiry}</a> : 'Contact details awaiting confirmation.'}</p>
              {COMPANY_CONFIG.phoneNumbers.primary && <p>Telephone: {COMPANY_CONFIG.phoneNumbers.primary}</p>}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              If you believe your data protection rights have not been appropriately addressed, you have the right to lodge a formal complaint with the <strong>Nigeria Data Protection Commission (NDPC)</strong> at <a href="https://ndpc.gov.ng" target="_blank" rel="noreferrer" className="underline text-[#0a192f]">ndpc.gov.ng</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
