import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Target, HeartHandshake, Award, Users, Scale, Sparkles, Building, Compass } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import teamImagePath from '../assets/images/corporate_advisory_team_1792794886967.jpg';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const valueIcons: Record<string, React.ReactNode> = {
    Integrity: <Scale className="w-5 h-5 text-red-600" />,
    Professionalism: <Award className="w-5 h-5 text-red-600" />,
    'Client Focus': <Users className="w-5 h-5 text-red-600" />,
    Accountability: <CheckCircle2 className="w-5 h-5 text-red-600" />,
    Excellence: <Sparkles className="w-5 h-5 text-red-600" />,
    Innovation: <Compass className="w-5 h-5 text-red-600" />,
    Trust: <HeartHandshake className="w-5 h-5 text-red-600" />,
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-[#0a192f] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">
              About KEDGE Insurance Brokers Ltd
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
              A Trusted Partner for Risk Appraisal, Policy Design, and Claims Advocacy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Founded on the belief that insurance should be clear, reliable, and tailored to real operating risks, KEDGE serves businesses, families, and institutions across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Company Overview & Image Split */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase">
                Who We Are
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
                Dedicated to Protecting Nigerian Enterprise & Personal Solvency
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                KEDGE Insurance Brokers Limited is an independent insurance broking firm established in the Federal Republic of Nigeria, committed to helping businesses and individuals protect their assets, manage risk, and safeguard their financial interests. We bridge the gap between clients seeking insurance protection and the insurance companies that underwrite risks, connecting our clients with insurance solutions suited to their needs and circumstances.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We believe insurance should be more than an annual transaction; it should be a strategic component of sound risk management and long-term financial resilience. By understanding our clients’ operations, assets, liabilities, and unique exposures, we provide professional broking guidance to help them evaluate coverage options, clarify policy terms and conditions, and make informed decisions about protecting what matters most.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our commitment extends beyond policy placement. We support clients through policy documentation, renewals, and the claims process, applying professional diligence, technical understanding, and clear communication at every stage. Whether you are building a business, protecting valuable assets, or securing your family's financial future, KEDGE is here to help you navigate risk with confidence and make informed decisions about your protection. Let us work with you to safeguard what you have built, prepare for the uncertainties ahead, and protect the future you are working towards.

KEDGE Insurance Brokers Limited — With You From Now, Into The Future.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-900">Governance & Disclosure Status:</p>
                <p>
                  Official corporate founding records, personnel rosters, and regulatory certificates are managed through designated compliance controls: <span className="text-amber-800">{COMPANY_CONFIG.regulatory.statusNote}</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src={teamImagePath}
                  alt="KEDGE technical advisory team meeting in executive corporate boardroom in Lagos"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-50 text-xs text-slate-500 border-t border-slate-200">
                  <span>Advisory & Placement Desk · Commercial Risk Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Role of an Insurance Broker */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
              Industry Clarification
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
              The Fundamental Difference: Insurance Broker vs. Insurance Agent
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Understanding who represents you is the most critical distinction in Nigerian insurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Broker Box */}
            <div className="bg-white rounded-xl p-6 border-2 border-[#0a192f] shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0a192f] bg-slate-100 px-3 py-1 rounded">
                <ShieldCheck className="w-4 h-4 text-[#c51f1f]" />
                <span>An Insurance Broker (KEDGE)</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Represents You (The Insured)
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Statutory duty of care is exclusively to the client, under Nigerian law.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Compares multiple insurance companies independently to secure optimal rates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Customizes policy wording and eliminates restrictive hidden clauses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Provides vigorous claims advocacy against underwriters at zero direct broker fee.</span>
                </li>
              </ul>
            </div>

            {/* Insurance Agent Box */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4 opacity-90">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded">
                <span>An Insurance Agent</span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 font-display">
                Represents One Underwriter
              </h3>
              <ul className="space-y-2 text-xs text-slate-500 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold shrink-0">•</span>
                  <span>Legal employee or tied agent of a single insurance company.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold shrink-0">•</span>
                  <span>Can only sell products offered by their parent insurer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold shrink-0">•</span>
                  <span>Standardized product terms without flexibility for bespoke risk tailoring.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold shrink-0">•</span>
                  <span>Cannot advocate against their employing underwriter if a claim is disputed.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEDGE Advisory Approach & Evaluation */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
              Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
              How We Help Clients Evaluate and Structure Insurance
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our systematic 4-stage advisory workflow guarantees complete coverage without costly redundancies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <span className="text-xs font-bold text-[#c51f1f]">Phase 01</span>
              <h3 className="text-base font-bold text-slate-900 font-display mt-1">
                Risk Audit & Surveys
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We inspect your operational premises, fleet schedules, supply chains, and staff contracts to uncover unhedged loss exposures.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <span className="text-xs font-bold text-[#c51f1f]">Phase 02</span>
              <h3 className="text-base font-bold text-slate-900 font-display mt-1">
                Market Comparison
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We solicit competing tenders from reputable NAICOM-registered underwriters, evaluating financial solvencies and claim track records.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <span className="text-xs font-bold text-[#c51f1f]">Phase 03</span>
              <h3 className="text-base font-bold text-slate-900 font-display mt-1">
                Policy Structuring
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We negotiate favorable deductibles, add crucial extensions, eliminate restrictive warranties, and verify NIID / PENCOM registration.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <span className="text-xs font-bold text-[#c51f1f]">Phase 04</span>
              <h3 className="text-base font-bold text-slate-900 font-display mt-1">
                Ongoing Advocacy
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We monitor mid-term changes, coordinate seamless renewals, and lead claim adjustments when losses occur to guarantee full indemnification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORPORATE PHILOSOPHY (Section 7 Mandate) */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">
              Corporate Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight">
              Our Vision, Mission, and Core Values
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              The proposed bedrock statements guiding KEDGE’s growth, governance, and client relations.
            </p>
          </div>

          {/* Vision and Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {COMPANY_CONFIG.philosophy.vision}
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Our Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {COMPANY_CONFIG.philosophy.mission}
              </p>
            </div>
          </div>

          {/* Core Values 7-Pillar Responsive Grid */}
          <div>
            <h3 className="text-lg font-bold font-display text-white mb-6">
              Our Seven Core Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COMPANY_CONFIG.philosophy.coreValues.map((val, idx) => (
                <div
                  key={val.name}
                  className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
                        {valueIcons[val.name] || <CheckCircle2 className="w-4 h-4 text-red-400" />}
                      </div>
                      <span className="text-xs font-mono text-slate-400 tabular-nums">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white font-display">
                      {val.name}
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {val.definition}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-400 italic">
            Note: {COMPANY_CONFIG.philosophy.statusNote}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">
            Let’s Discuss Your Organization’s Insurance Requirements
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Whether you require an independent audit of current policy wordings, renewal benchmarking, or compliance certificates, our advisory team is ready to assist.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/quote')}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm"
            >
              Request a Custom Quote
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 text-sm font-semibold text-[#0a192f] bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Contact Our Advisory Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
