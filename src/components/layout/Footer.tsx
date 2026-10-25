import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { COMPANY_CONFIG } from '../../data/companyConfig';
import { MapPin, Phone, Mail, Clock, Shield, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a192f] text-slate-300 border-t border-slate-800">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('/')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <BrandLogo variant="light" showSlogan={true} />
            </button>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              KEDGE Insurance Brokers Ltd is a client-focused Nigerian insurance brokerage and risk advisory firm. We help corporate organisations, commercial enterprises, SMEs, and individuals identify risk exposures, structure appropriate insurance coverage, and achieve dependable claims advocacy.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1 border-t border-slate-800/80">
              <p className="font-semibold text-slate-300">Regulatory & Industry Affiliation:</p>
              <p>Regulatory status and registration details should be confirmed against current NAICOM records before publication.</p>
              <p className="text-slate-400">
                Official Licencing & Registration: <span className="text-amber-300">{COMPANY_CONFIG.regulatory.statusNote}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Navigation & About */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-display">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/about')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  About KEDGE
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/about')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Corporate Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Insurance Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/industries')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Industries Served
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/risk-management')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Risk Advisory Framework
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/insights')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Insurance Insights & Law
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Services & Enquiries */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-display">
              Client Desk
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/quote')}
                  className="text-white font-medium hover:text-red-400 transition-colors"
                >
                  Request a Quote
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/claims-assistance')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Claims Support & Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/renewal-enquiry')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Policy Renewal Review
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/faq')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/coverage-matrix')}
                  className="hover:text-white transition-colors text-slate-300 flex items-center gap-1.5"
                >
                  <span>NAICOM Coverage Matrix</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">Audit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact')}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  Office Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-display">
              Contact Desk
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Office Location</p>
                  <p>{COMPANY_CONFIG.headOffice.verificationStatus === 'Verified' ? COMPANY_CONFIG.headOffice.addressLine1 : 'Address awaiting confirmation'}</p>
                  {COMPANY_CONFIG.headOffice.verificationStatus === 'Verified' && <p>{COMPANY_CONFIG.headOffice.city}, {COMPANY_CONFIG.headOffice.state}, Nigeria</p>}
                  {COMPANY_CONFIG.headOffice.verificationStatus !== 'Verified' && <p className="text-[11px] text-amber-300/90 italic mt-0.5">Address awaiting confirmation</p>}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Telephone Inquiries</p>
                  {COMPANY_CONFIG.phoneNumbers.primary && <a
                    href={`tel:${COMPANY_CONFIG.phoneNumbers.primary}`}
                    className="hover:text-white transition-colors block"
                  >
                    {COMPANY_CONFIG.phoneNumbers.primary}
                  </a>}
                  {COMPANY_CONFIG.phoneNumbers.directDesk && <a
                    href={`tel:${COMPANY_CONFIG.phoneNumbers.directDesk}`}
                    className="text-xs text-slate-400 hover:text-white transition-colors block"
                  >
                    Direct: {COMPANY_CONFIG.phoneNumbers.directDesk}
                  </a>}
                  {!COMPANY_CONFIG.phoneNumbers.primary && <p>Telephone details awaiting confirmation.</p>}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Email Enquiries</p>
                  {COMPANY_CONFIG.emails.generalEnquiry && <a
                    href={`mailto:${COMPANY_CONFIG.emails.generalEnquiry}`}
                    className="hover:text-white transition-colors block text-xs"
                  >
                    {COMPANY_CONFIG.emails.generalEnquiry}
                  </a>}
                  {COMPANY_CONFIG.emails.quoteDesk && <a
                    href={`mailto:${COMPANY_CONFIG.emails.quoteDesk}`}
                    className="hover:text-white transition-colors block text-xs text-slate-400"
                  >
                    {COMPANY_CONFIG.emails.quoteDesk}
                  </a>}
                  {!COMPANY_CONFIG.emails.generalEnquiry && <p>Email details awaiting confirmation.</p>}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                <p className="text-xs text-slate-400">{COMPANY_CONFIG.officeHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Disclaimer & Legal Sub-Footer */}
      <div className="border-t border-slate-800 bg-[#060d1a] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="leading-relaxed">
            <strong className="text-slate-300">Statutory Notice & Disclaimer:</strong> KEDGE Insurance Brokers Ltd acts strictly in its capacity as an independent insurance broker representing the interests of policyholders. Content published on this website is for educational and informational purposes in the Nigerian market and does not constitute individualized legal, taxation, or insurance contract advice. Actual policy coverage, terms, deductibles, warranties, and exclusions are determined by the formal policy wording issued by the underwriting insurance company.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <p>
              &copy; {new Date().getFullYear()} KEDGE Insurance Brokers Ltd. All rights reserved. Registered in the Federal Republic of Nigeria.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-slate-400">
              <button
                onClick={() => handleNav('/privacy-policy')}
                className="hover:text-white transition-colors"
              >
                Privacy Notice (NDPA 2023)
              </button>
              <span>·</span>
              <button
                onClick={() => handleNav('/terms')}
                className="hover:text-white transition-colors"
              >
                Terms of Use
              </button>
              <span>·</span>
              <button
                onClick={() => handleNav('/coverage-matrix')}
                className="hover:text-white transition-colors"
              >
                Coverage Verification Matrix
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
