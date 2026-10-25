import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck, Search } from 'lucide-react';

interface FaqPageProps {
  navigate: (path: string) => void;
}

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const FaqPage: React.FC<FaqPageProps> = ({ navigate }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const faqs: FaqItem[] = [
    {
      category: 'Brokers & Value',
      q: 'Does it cost more to use KEDGE Insurance Brokers than going directly to an insurance company?',
      a: 'No. Using an insurance broker does not increase your premium. Under Nigerian insurance law, registered insurance brokers are remunerated through statutory brokerage commissions paid directly by the underwriting insurance company. In fact, because we solicit competing bids across multiple underwriters and negotiate policy terms, clients frequently secure broader coverage at lower overall premiums than approaching a single insurer alone.',
    },
    {
      category: 'Brokers & Value',
      q: 'What is the statutory difference between an Insurance Broker and an Insurance Agent?',
      a: 'An insurance agent is an employee or tied representative of a single insurance company, legally bound to promote their employer’s products. In contrast, an insurance broker (such as KEDGE) is an independent professional whose statutory legal duty of care is owed exclusively to you, the client. We evaluate your risks, compare multiple underwriters, structure bespoke clauses, and advocate for you during claims disputes.',
    },
    {
      category: 'Compulsory Insurances',
      q: 'What are the compulsory insurance requirements for businesses operating in Nigeria?',
      a: 'Requirements depend on the type of risk, the current legislation and regulations in force, and the facts of each business. The statutory summaries elsewhere on this website are under review and should not be relied on as a complete or current legal checklist. Ask a qualified Nigerian insurance adviser to confirm the requirements that apply to your circumstances.',
    },
    {
      category: 'Compulsory Insurances',
      q: 'Why must imported goods into Nigeria be insured locally under Section 67?',
      a: 'Marine insurance and import documentation requirements can depend on current law, trade and foreign-exchange rules, the transaction terms, and the goods involved. Confirm the applicable process with your bank, customs/trade adviser and a qualified Nigerian insurance professional before shipment. This website’s older statutory references are being reviewed.',
    },
    {
      category: 'Motor & NIID',
      q: 'How can I verify that my motor insurance certificate is authentic and registered on the NIID?',
      a: 'All genuine motor certificates arranged by KEDGE are uploaded directly to the Nigerian Insurance Industry Database (NIID). You can independently verify your policy in seconds by visiting askniid.org, entering your vehicle registration number or policy number, or sending an SMS in the prescribed format. Law enforcement officers from the FRSC and Police verify policies electronically using mobile barcode scanners.',
    },
    {
      category: 'Claims & Disputes',
      q: 'What should I do immediately after an accident, fire, or theft occurs?',
      a: 'Take reasonable emergency measures to prevent further loss (extinguish fire, tow disabled vehicle, secure premises). Do not authorize permanent repairs or dispose of damaged parts until an underwriter’s loss adjuster has surveyed the scene. Notify KEDGE immediately (within 24 to 48 hours), take clear photographs of the damage, obtain an official police incident report where required, and compile original receipts or repair quotes.',
    },
    {
      category: 'Claims & Disputes',
      q: 'Can an insurance company refuse to pay a claim, and how does KEDGE assist?',
      a: 'An underwriter may dispute or repudiate a claim if there is a breach of policy conditions precedent (such as late notification, fraudulent exaggeration, or unfulfilled security warranties) or if the proximate cause falls under an excluded peril. As your broker, KEDGE examines the adjuster’s report, challenges unwarranted technical objections, ensures the condition of average is not misapplied, and presents formal appeals directly to underwriter management or NAICOM’s Complaints Bureau.',
    },
    {
      category: 'Policies & Premiums',
      q: 'What is the "Condition of Average" and how does under-insurance harm me?',
      a: 'The Condition of Average is an insurance clause providing that if property is insured for less than its true replacement value at the time of loss, the policyholder is considered their own insurer for the difference and must bear a proportionate share of any loss. For example, if a factory valued at ₦100 million is insured for only ₦50 million (50% under-insured), a ₦10 million fire loss will result in a claim payout of only ₦5 million. KEDGE conducts regular asset valuation reviews to ensure sums insured are adequate.',
    },
    {
      category: 'Policies & Premiums',
      q: 'What is a policy deductible or excess?',
      a: 'A deductible (or excess) is the agreed initial portion of an insured loss that the policyholder agrees to bear before the insurance policy responds. For instance, on a motor policy with a ₦50,000 deductible, if accident repairs cost ₦350,000, you pay ₦50,000 and the insurer pays ₦300,000. Agreeing to a higher voluntary deductible can significantly reduce your annual premium.',
    },
  ];

  const categories = ['All', 'Brokers & Value', 'Compulsory Insurances', 'Motor & NIID', 'Claims & Disputes', 'Policies & Premiums'];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-[#c51f1f] tracking-wider uppercase mb-1">
            Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a192f] font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Clear, authoritative answers to common questions regarding insurance broking, statutory compliance, claims, and underwriting in Nigeria.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#0a192f] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a192f]"
                >
                  <span className="text-sm font-bold text-slate-900 font-display">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#c51f1f] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-100">
                    <p>{faq.a}</p>
                    <div className="mt-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Category: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0a192f] text-white text-center space-y-3">
          <h3 className="text-base font-bold font-display">
            Have a Specific Insurance Question or Policy Inquiry?
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Our technical brokers are available to provide clear, personalized explanations without obligation.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm"
            >
              Ask an Advisor
            </button>
            <button
              onClick={() => navigate('/quote')}
              className="px-5 py-2 text-xs font-semibold text-[#0a192f] bg-white hover:bg-slate-100 rounded-lg"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
