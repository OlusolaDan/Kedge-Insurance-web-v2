import React, { useState } from 'react';
import { COVERAGE_MATRIX_DATA } from '../data/coverageMatrixData';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, ArrowRight, Download, Search } from 'lucide-react';

interface CoverageMatrixPageProps {
  navigate: (path: string) => void;
}

export const CoverageMatrixPage: React.FC<CoverageMatrixPageProps> = ({ navigate }) => {
  const [filter, setFilter] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const filteredItems = COVERAGE_MATRIX_DATA.filter((item) => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Compulsory' && item.statutoryStatus === 'Compulsory in Nigeria') ||
      (filter === 'Optional' && item.statutoryStatus.includes('Optional')) ||
      (filter === 'Regulatory' && item.statutoryStatus.includes('Regulatory'));

    const matchesSearch =
      item.officialClass.toLowerCase().includes(query.toLowerCase()) ||
      item.naicomCategory.toLowerCase().includes(query.toLowerCase()) ||
      item.legalCitation.toLowerCase().includes(query.toLowerCase()) ||
      item.commercialProducts.some((p) => p.toLowerCase().includes(query.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-200/80 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Draft Coverage Reference</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a192f] font-display">
            Insurance Classes & Legal References
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            This draft reference has not been confirmed against current Nigerian legislation, regulations or NAICOM classifications. It is not a compliance checklist or legal advice; confirm requirements with a qualified adviser before relying on any entry.
          </p>
        </div>

        {/* Verification Status Banner */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs mb-8 space-y-2 text-xs text-slate-700">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-[#0a192f]">Internal Audit & Corporate Verification Details:</span>
            <span className="text-[11px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              Audit Rev: 2026.10-V1
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <p>
              <strong>Governing Regulator:</strong> {COMPANY_CONFIG.regulatory.regulatoryBody}
            </p>
            <p>
              <strong>Operating Licence Status:</strong> <span className="text-amber-800">{COMPANY_CONFIG.regulatory.naicomLicenceNumber}</span>
            </p>
            <p>
              <strong>NCRIB Membership:</strong> <span className="text-amber-800">{COMPANY_CONFIG.regulatory.ncribMembershipNumber}</span>
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search classes, citations, or products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {['All', 'Compulsory', 'Optional', 'Regulatory'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  filter === f
                    ? 'bg-[#0a192f] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f} Classes
              </button>
            ))}
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Official NAICOM Class</th>
                  <th className="py-3 px-4">Statutory Status</th>
                  <th className="py-3 px-4">Legal Citation / Reference</th>
                  <th className="py-3 px-4">Commercial Products Included</th>
                  <th className="py-3 px-4">Website Implementation</th>
                  <th className="py-3 px-4">Verification Audit Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {filteredItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      <div>{item.officialClass}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.naicomCategory}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.statutoryStatus === 'Compulsory in Nigeria'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : item.statutoryStatus.includes('Regulatory')
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {item.statutoryStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-mono text-[11px] text-slate-800 leading-tight">
                        {item.legalCitation}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <ul className="space-y-0.5 list-disc list-inside text-slate-700">
                        {item.commercialProducts.map((p, pIdx) => (
                          <li key={pIdx} className="line-clamp-1">{p}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.websiteStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-sm text-slate-500 leading-relaxed text-[11px]">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Statutory references shown here are historical research notes and have not been confirmed against current legislation or regulator guidance.
          </p>
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center font-semibold text-[#0a192f] hover:text-[#c51f1f]"
          >
            <span>Return to Insurance Directory</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
