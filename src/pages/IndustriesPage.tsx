import React, { useState } from 'react';
import { INDUSTRY_SECTORS } from '../data/industriesData';
import { IndustrySector } from '../types';
import { ArrowRight, ShieldAlert, CheckCircle2, Factory, Truck, Building2, Anchor, ShoppingBag, Briefcase, Zap, Sprout, Landmark } from 'lucide-react';
import industrialImg from '../assets/images/industrial_manufacturing_risk_1792794886757.jpg';
import logisticsImg from '../assets/images/commercial_fleet_logistics_1792794886504.jpg';

interface IndustriesPageProps {
  navigate: (path: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ navigate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustrySector>(INDUSTRY_SECTORS[0]);

  const sectorIcons: Record<string, React.ReactNode> = {
    'smes-commercial': <ShoppingBag className="w-5 h-5 text-red-600" />,
    'manufacturing-industrial': <Factory className="w-5 h-5 text-red-600" />,
    'construction-engineering': <Building2 className="w-5 h-5 text-red-600" />,
    'logistics-haulage': <Truck className="w-5 h-5 text-red-600" />,
    'importers-exporters-trade': <Anchor className="w-5 h-5 text-red-600" />,
    'marine-offshore-shipping': <Anchor className="w-5 h-5 text-red-600" />,
    'oil-gas-energy-sector': <Zap className="w-5 h-5 text-red-600" />,
    'agriculture-agribusiness': <Sprout className="w-5 h-5 text-red-600" />,
    'professional-services-consulting': <Briefcase className="w-5 h-5 text-red-600" />,
    'retail-distribution-fmcg': <ShoppingBag className="w-5 h-5 text-red-600" />,
    'hospitality-commercial-property': <Landmark className="w-5 h-5 text-red-600" />,
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Page Header */}
      <section className="bg-[#0a192f] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">
              Sector Capabilities
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
              Risk Management Tailored for Key Nigerian Industry Sectors
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Every industry operates with distinct risk exposures, regulatory standards, and supply chain vulnerabilities. Discover how KEDGE crafts sector-aligned insurance programs.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Visual Industry Spotlights */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
              <img
                src={industrialImg}
                alt="Industrial plant machinery safety inspection and electrical risk audit"
                className="w-full h-64 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 bg-white">
                <span className="text-xs font-semibold text-[#c51f1f] uppercase tracking-wider">Manufacturing & Industrial</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 font-display">
                  Machinery Breakdown, Industrial All Risks, and Product Liability
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Protecting industrial estates from Ikeja to Agbara and Trans-Amadi against fire catastrophes, power surge breakdown, and supply chain delays.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
              <img
                src={logisticsImg}
                alt="Commercial transport fleet trucks and distribution logistics hub in Nigeria"
                className="w-full h-64 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 bg-white">
                <span className="text-xs font-semibold text-[#c51f1f] uppercase tracking-wider">Logistics & Freight Haulage</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 font-display">
                  Goods-in-Transit, Fleet Telematics, and Highway Overturning Cover
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Protecting interstate commercial corridors linking Lagos seaports to inland container depots in Abuja, Kaduna, and Kano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Industry Deep-Dive */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Industry List */}
            <div className="lg:col-span-5 space-y-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 px-1">
                Select an Industry Sector:
              </h2>
              <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
                {INDUSTRY_SECTORS.map((sector) => {
                  const isSelected = selectedIndustry.id === sector.id;
                  return (
                    <button
                      key={sector.id}
                      onClick={() => setSelectedIndustry(sector)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0a192f] text-white border-[#0a192f] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white/10' : 'bg-slate-100'
                          }`}
                        >
                          {sectorIcons[sector.id] || <Building2 className="w-4 h-4 text-slate-500" />}
                        </div>
                        <div>
                          <p className={`text-xs sm:text-sm font-bold font-display ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {sector.title}
                          </p>
                          <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {sector.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 shrink-0 ml-2 ${isSelected ? 'text-red-400' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Selected Sector Details */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
                <div>
                  <div className="text-xs font-semibold text-[#c51f1f] uppercase tracking-wider">
                    Sector Risk Architecture
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a192f] font-display mt-1">
                    {selectedIndustry.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedIndustry.subtitle}</p>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                    {selectedIndustry.description}
                  </p>
                </div>

                {/* Nigerian Commercial Context */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-[#0a192f]">Nigerian Commercial Operating Environment:</span>
                  <p className="leading-relaxed">{selectedIndustry.nigerianCommercialContext}</p>
                </div>

                {/* Exposures */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>Typical Risk Exposures in this Sector</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {selectedIndustry.typicalExposures.map((exp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Covers */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Insurance Coverage Portfolio</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedIndustry.recommendedCovers.map((cov, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-800 font-medium px-3 py-1.5 rounded-lg border border-slate-200"
                      >
                        {cov}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Tailored broking terms for {selectedIndustry.title}.
                  </p>
                  <button
                    onClick={() => {
                      navigate(`/quote?service=${encodeURIComponent(selectedIndustry.title + ' Comprehensive Risk Review')}`);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm transition-all"
                  >
                    Request Sector Risk Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
