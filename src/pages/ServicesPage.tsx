import React, { useState, useMemo } from 'react';
import { Search, Filter, ShieldCheck, ArrowRight, X, AlertCircle, CheckCircle2, ChevronRight, FileCheck } from 'lucide-react';
import { INSURANCE_SERVICES } from '../data/servicesData';
import { InsuranceCategory, InsuranceService } from '../types';

interface ServicesPageProps {
  navigate: (path: string) => void;
  selectedServiceId?: string | null;
  onClearSelectedService?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  navigate,
  selectedServiceId,
  onClearSelectedService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [compulsoryOnly, setCompulsoryOnly] = useState<boolean>(false);
  const [activeDetailModal, setActiveDetailModal] = useState<InsuranceService | null>(() => {
    if (selectedServiceId) {
      return INSURANCE_SERVICES.find((s) => s.id === selectedServiceId) || null;
    }
    return null;
  });

  const categories: string[] = [
    'All',
    'Motor',
    'Marine & Aviation',
    'Property & Engineering',
    'Liability',
    'Life & Personal',
    'Commercial & Specialist',
  ];

  // Filtered services
  const filteredServices = useMemo(() => {
    return INSURANCE_SERVICES.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.keyRisksCovered.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCompulsory = !compulsoryOnly || service.isCompulsoryInNigeria;

      return matchesCategory && matchesSearch && matchesCompulsory;
    });
  }, [selectedCategory, searchQuery, compulsoryOnly]);

  const handleOpenDetail = (service: InsuranceService) => {
    setActiveDetailModal(service);
  };

  const handleCloseDetail = () => {
    setActiveDetailModal(null);
    if (onClearSelectedService) onClearSelectedService();
  };

  const handleQuoteClick = (serviceName: string) => {
    handleCloseDetail();
    // Navigate to quote with preselected product
    navigate(`/quote?service=${encodeURIComponent(serviceName)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Page Header */}
      <section className="bg-[#0a192f] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">
              Insurance Directory
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
              Comprehensive Insurance Portfolio Aligned with NAICOM Guidelines
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore our structured directory of personal, commercial, marine, and industrial covers. As insurance brokers, we ensure every policy is tailored to your real exposures and placed with authorized underwriters.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Search & Filter Bar */}
      <section className="sticky top-[69px] z-30 bg-white border-b border-slate-200 shadow-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search insurance classes, risks, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a192f] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Compulsory Toggle Switch */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={compulsoryOnly}
                  onChange={(e) => setCompulsoryOnly(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                />
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>Show Statutory Compulsory Covers Only</span>
                </span>
              </label>

              <button
                onClick={() => navigate('/coverage-matrix')}
                className="text-xs font-medium text-slate-600 hover:text-[#0a192f] underline ml-2"
              >
                View Regulatory Matrix
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#0a192f] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900">{filteredServices.length}</strong> insurance products
            </span>
            {compulsoryOnly && (
              <span className="text-red-700 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Filtered by Nigerian Statutory Compulsory Covers
              </span>
            )}
          </div>

          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No matching insurance products found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search criteria or resetting category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setCompulsoryOnly(false);
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0a192f] rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                      <span className="font-medium text-slate-700">{service.category}</span>
                      {service.isCompulsoryInNigeria && (
                        <span className="text-[11px] font-bold text-[#c51f1f] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                          Compulsory
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-[#0a192f] transition-colors leading-snug">
                      {service.name}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      <p className="text-[11px] font-semibold text-slate-500 uppercase">
                        Typical Insured Interests:
                      </p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {service.targetAudience.slice(0, 2).map((aud, i) => (
                          <li key={i} className="line-clamp-1 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                            <span>{aud}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenDetail(service)}
                      className="text-xs font-semibold text-[#0a192f] hover:text-[#c51f1f] transition-colors inline-flex items-center"
                    >
                      <span>Full Policy Breakdown</span>
                      <ChevronRight className="w-4 h-4 ml-0.5" />
                    </button>
                    <button
                      onClick={() => handleQuoteClick(service.name)}
                      className="text-xs font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] px-3 py-1.5 rounded-md transition-all"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Service Detail Accessible Modal */}
      {activeDetailModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-service-title"
        >
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#0a192f] text-white px-6 py-5 flex items-start justify-between border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                  <span>{activeDetailModal.category}</span>
                  <span>·</span>
                  <span className="text-red-400 font-mono text-[11px]">{activeDetailModal.naicomClass}</span>
                </div>
                <h2
                  id="modal-service-title"
                  className="text-xl sm:text-2xl font-bold font-display text-white"
                >
                  {activeDetailModal.name}
                </h2>
              </div>
              <button
                onClick={handleCloseDetail}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm text-slate-700">
              {activeDetailModal.isCompulsoryInNigeria && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Statutory Compulsory Cover in Nigeria</p>
                    <p className="mt-0.5 text-red-800">{activeDetailModal.statutoryBasis}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Technical Overview & Broker Role
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeDetailModal.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Risks & Perils Covered
                </h3>
                <ul className="grid grid-cols-1 gap-2 text-xs text-slate-600">
                  {activeDetailModal.keyRisksCovered.map((risk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Typical Insured Interests
                </h3>
                <ul className="flex flex-wrap gap-2 text-xs">
                  {activeDetailModal.targetAudience.map((aud, i) => (
                    <li
                      key={i}
                      className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200"
                    >
                      {aud}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Coverage Considerations
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeDetailModal.coverageConsiderations.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#0a192f] font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Standard Exclusions
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeDetailModal.standardExclusions.map((ex, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Independent brokerage representation by KEDGE.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCloseDetail}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleQuoteClick(activeDetailModal.name)}
                  className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm"
                >
                  Request a Quote for this Cover
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
