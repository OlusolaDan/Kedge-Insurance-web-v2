import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, FileText } from 'lucide-react';
import { INSURANCE_SERVICES } from '../data/servicesData';
import { INDUSTRY_SECTORS } from '../data/industriesData';
import { INSIGHT_ARTICLES } from '../data/insightsData';
import { COMPANY_CONFIG } from '../data/companyConfig';
import heroImagePath from '../assets/images/hero_commercial_port_1792794885795-optimized.jpg';
import heroImageMobilePath from '../assets/images/hero_commercial_port_mobile.jpg';
import advisoryImagePath from '../assets/images/corporate_advisory_team_1792794886967-optimized.jpg';
import fleetImagePath from '../assets/images/commercial_fleet_logistics_1792794886504-optimized.jpg';
import industrialImagePath from '../assets/images/industrial_manufacturing_risk_1792794886757-optimized.jpg';
import { CustomerLogoCarousel } from '../components/common/CustomerLogoCarousel';
import { HeroCarousel, type HeroSlide } from '../components/common/HeroCarousel';

interface HomePageProps {
  navigate: (path: string) => void;
  onSelectService?: (serviceId: string) => void;
  onSelectArticle?: (articleId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigate,
  onSelectService,
  onSelectArticle,
}) => {
  const featuredServices = INSURANCE_SERVICES.slice(0, 6);
  const featuredIndustries = INDUSTRY_SECTORS.slice(0, 4);
  const featuredArticles = INSIGHT_ARTICLES.slice(0, 3);
  const heroSlides: HeroSlide[] = [
    {
      image: heroImagePath,
      mobileImage: heroImageMobilePath,
      imageAlt: 'Commercial container port and cargo infrastructure at dusk',
      eyebrow: 'MARINE & LOGISTICS',
      accent: 'Protecting goods in motion',
      title: 'Protection for What Matters. Confidence for What Comes Next.',
      body: 'From businesses and infrastructure to people and valuable assets, KEDGE helps clients understand their risks and make informed insurance decisions.',
    },
    {
      image: advisoryImagePath,
      imageAlt: 'Business advisers collaborating around risk documents in a boardroom',
      eyebrow: 'INSURANCE BROKING',
      accent: 'Advice built around your risks',
      title: 'Clear Advice for Complex Business Decisions.',
      body: 'Our brokers help you explore appropriate protection, compare policy options and move forward with a clearer view of your risk landscape.',
    },
    {
      image: fleetImagePath,
      imageAlt: 'Commercial fleet vehicles supporting logistics operations',
      eyebrow: 'MOTOR & FLEET',
      accent: 'Keep your operations moving',
      title: 'Cover for the Vehicles Your Business Depends On.',
      body: 'Build practical protection for commercial vehicles, goods in transit and the people who keep your distribution network moving.',
    },
    {
      image: industrialImagePath,
      imageAlt: 'Industrial manufacturing facility and operational equipment',
      eyebrow: 'PROPERTY & INDUSTRIAL',
      accent: 'Strengthen business continuity',
      title: 'Prepare Your Assets for the Risks Ahead.',
      body: 'From property and equipment to operational interruption, we help businesses consider the exposures that can affect continuity and resilience.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroCarousel slides={heroSlides} onNavigate={navigate} />

      {/* COMPANY VALUE SUMMARY */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Insurance brokerage', 'Guidance to help clients understand their insurance needs.'],
              ['Risk focused', 'Consider potential exposures before discussing suitable cover.'],
              ['Personal and business', 'Insurance categories for individuals and organisations.'],
              ['Claims support', 'Assistance navigating the claims process with the insurer.'],
            ].map(([title, description]) => <div key={title} className="border-l-2 border-[#c51f1f] pl-4"><p className="font-semibold text-[#0a192f]">{title}</p><p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p></div>)}
          </div>
        </div>
      </section>

      <CustomerLogoCarousel />

      {/* 3. BRIEF COMPANY INTRODUCTION & BROKER VALUE */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase">About KEDGE Insurance Brokers</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a192f] font-display leading-tight text-balance">Navigating Nigerian Risk Realities with Diligence and Technical Precision</h2>
              <p className="text-base text-slate-600 leading-relaxed">Operating a business or managing valuable assets in Nigeria requires navigating an intricate risk landscape. From highway logistics exposures and maritime cargo regulations to factory fire protection and mandatory employee welfare laws, unexpected hazards can jeopardize balance sheets.</p>
              <p className="text-base text-slate-600 leading-relaxed">As registered insurance brokers, <strong className="text-slate-900">KEDGE acts strictly on behalf of our clients</strong>—not the insurance company. We evaluate your operational risks, compare policies across leading NAICOM-authorised underwriters, negotiate competitive premiums, and stand as your vigorous advocate during claims negotiations.</p>
              <div className="pt-2"><button onClick={() => navigate('/about')} className="inline-flex items-center text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f] transition-colors"><span>Learn more about our advisory approach</span><ArrowRight className="w-4 h-4 ml-1.5" /></button></div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                <img src={advisoryImagePath} alt="KEDGE risk advisors collaborating in executive corporate boardroom" width={1200} height={896} className="w-full h-72 object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                <div className="p-6 bg-white space-y-3"><div className="flex items-center gap-2 text-xs text-slate-500"><span className="font-semibold text-[#0a192f]">Client Service Commitment</span><span>·</span><span>Advisory Desk</span></div><h3 className="text-base font-bold text-slate-900 font-display">“With You From Now, Into The Future”</h3><p className="text-xs text-slate-600 leading-relaxed">Our corporate promise reflects continuous partnership across the full lifecycle—from initial risk appraisal and policy design to swift claims resolution.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INSURANCE SERVICES OVERVIEW */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
                Insurance Directory
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
                Comprehensive Insurance Solutions Aligned with NAICOM Standards
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                We structure specialized coverage across personal, commercial, industrial, and statutory insurance categories in Nigeria.
              </p>
            </div>

            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center text-sm font-semibold text-[#c51f1f] hover:text-[#a81717] transition-colors shrink-0"
            >
              <span>View All Insurance Classes</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="premium-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-medium text-slate-700">{service.category}</span>
                    {service.isCompulsoryInNigeria && (
                      <span className="text-[11px] font-semibold text-[#c51f1f]">
                        {service.compulsoryApplicability === 'CONDITIONAL' ? 'Conditional' : 'Statutory Compulsory'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-[#0a192f] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (onSelectService) onSelectService(service.id);
                    }}
                    className="text-xs font-semibold text-[#0a192f] hover:text-[#c51f1f] transition-colors inline-flex items-center"
                  >
                    <span>View Coverage Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                  <button
                    onClick={() => navigate('/quote')}
                    className="text-xs font-semibold text-[#c51f1f] hover:underline"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-[#0a192f] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>Explore Complete Insurance Directory ({INSURANCE_SERVICES.length} Products)</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES SERVED PREVIEW */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
              Sector Specialisations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
              Tailored Risk Protection for Key Nigerian Sectors
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every industry faces unique operating conditions. We craft sector-specific insurance programs designed for Nigerian commercial realities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredIndustries.map((ind) => (
              <div
                key={ind.id}
                className="premium-card bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{ind.subtitle}</p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                    {ind.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => navigate('/industries')}
                    className="text-xs font-semibold text-[#0a192f] hover:text-[#c51f1f] transition-colors inline-flex items-center"
                  >
                    <span>Sector risks & covers</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/industries')}
              className="inline-flex items-center text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f] transition-colors"
            >
              <span>Explore All 11 Nigerian Industry Sectors</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE KEDGE — REASONS & ADVISORY PROCESS */}
      <section className="py-16 lg:py-20 bg-[#0a192f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">
              Why KEDGE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight">
              An Insurance Broker Is Your Strategic Advocate, Not a Policy Salesperson
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              When dealing directly with insurance underwriters or sales agents, they represent their company’s commercial interests. At KEDGE, our statutory duty of care is exclusively to you—the insured.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-[#c51f1f]/20 border border-[#c51f1f]/40 flex items-center justify-center text-red-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                01. Independent Market Placement
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                We evaluate financial strength, claim settlement reputation, and policy wordings across multiple underwriters to find the best terms for your specific risks.
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-[#c51f1f]/20 border border-[#c51f1f]/40 flex items-center justify-center text-red-400 mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                02. Tailored Policy Architecture
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                We avoid generic template covers. We incorporate essential extensions, eliminate restrictive warranty traps, and ensure sum-insured adequacy to avoid the Average Clause.
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-[#c51f1f]/20 border border-[#c51f1f]/40 flex items-center justify-center text-red-400 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                03. Vigorous Claims Advocacy
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                When a loss occurs, our claims experts manage adjuster meetings, review documentation, challenge unfair repudiations, and fast-track fair indemnity payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CORPORATE PHILOSOPHY SUMMARY */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase">
                Corporate Philosophy
              </div>
              <h2 className="text-2xl font-bold text-[#0a192f] font-display">
                Our Guiding Foundations
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our vision, mission, and core values provide the benchmark for every client engagement, advisory assessment, and professional standard.
              </p>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f] transition-colors pt-2"
              >
                <span>Read complete philosophy & values</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            <div className="premium-card bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a192f] font-display">
                Vision
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {COMPANY_CONFIG.philosophy.vision}
              </p>
            </div>

            <div className="premium-card bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a192f] font-display">
                Mission
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {COMPANY_CONFIG.philosophy.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INSURANCE EDUCATION & INSIGHTS PREVIEW */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
                Knowledge & Regulatory Updates
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
                Insurance Education & Market Insights
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Demystifying insurance law, compliance mandates, and claims strategies in Nigeria.
              </p>
            </div>

            <button
              onClick={() => navigate('/insights')}
              className="inline-flex items-center text-sm font-semibold text-[#c51f1f] hover:underline shrink-0"
            >
              <span>View All Insights</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((art) => (
              <article
                key={art.id}
                className="premium-card bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-[#0a192f]">{art.category}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600">{art.publishedDate}</span>
                  <button
                    onClick={() => {
                      if (onSelectArticle) onSelectArticle(art.id);
                      navigate('/insights');
                    }}
                    className="font-semibold text-[#0a192f] hover:text-[#c51f1f] transition-colors"
                  >
                    Read Article →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CLEAR QUOTE-REQUEST CTA BANNER */}
      <section className="py-14 bg-[#c51f1f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Ready to Review Your Risks or Request an Underwriting Quote?
            </h2>
            <p className="text-sm sm:text-base text-red-100 mt-2">
              Our technical brokers will evaluate your requirements and structure competitive terms from leading NAICOM-registered insurance companies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/quote')}
              className="px-6 py-3.5 text-sm font-semibold text-[#0a192f] bg-white hover:bg-slate-100 rounded-lg shadow-md transition-all active:scale-[0.98] whitespace-nowrap"
            >
              Request a Quote Now
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-red-900/60 hover:bg-red-900/80 border border-red-300/40 rounded-lg transition-all whitespace-nowrap"
            >
              Speak to an Advisor
            </button>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SUMMARY STRIP */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase">Head Office</p>
              <p className="text-sm font-bold text-slate-900 mt-1">{COMPANY_CONFIG.headOffice.verificationStatus === 'Verified' ? COMPANY_CONFIG.headOffice.addressLine1 : 'Office address awaiting confirmation'}</p>
              {COMPANY_CONFIG.headOffice.verificationStatus === 'Verified' && <p className="text-xs text-slate-600">{COMPANY_CONFIG.headOffice.city}, {COMPANY_CONFIG.headOffice.country}</p>}
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase">Telephone Support</p>
              {COMPANY_CONFIG.phoneNumbers.primary ? <a href={`tel:${COMPANY_CONFIG.phoneNumbers.primary}`} className="text-sm font-bold text-slate-900 mt-1 block hover:text-[#c51f1f]">
                {COMPANY_CONFIG.phoneNumbers.primary}
              </a> : <p className="text-sm text-slate-600 mt-1">Telephone details awaiting confirmation.</p>}
              <p className="text-xs text-slate-600">{COMPANY_CONFIG.officeHours}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase">Email Enquiries</p>
              {COMPANY_CONFIG.emails.generalEnquiry ? <a href={`mailto:${COMPANY_CONFIG.emails.generalEnquiry}`} className="text-sm font-bold text-slate-900 mt-1 block hover:text-[#c51f1f]">
                {COMPANY_CONFIG.emails.generalEnquiry}
              </a> : <p className="text-sm text-slate-600 mt-1">Email details awaiting confirmation.</p>}
              <p className="text-xs text-slate-600">Technical quote & claims desk</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
