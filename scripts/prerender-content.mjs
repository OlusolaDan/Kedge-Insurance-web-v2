export const COMPANY_DETAILS = {
  legalName: 'KEDGE Insurance Brokers Ltd',
  tradingName: 'KEDGE Insurance Brokers',
  slogan: 'With You From Now, Into The Future',
  address: '20, Oshidehin Street, off Akilo Road, Ogba-Ikeja, Lagos, Lagos State, Nigeria',
  addressLocality: 'Lagos',
  addressRegion: 'Lagos State',
  addressCountry: 'NG',
  primaryPhone: '+234 814 636 4641',
  directDesk: '+234 706 721 0112',
  email: 'info@kedgeinsure.com.ng',
  officeHours: 'Monday to Friday, 8:30 AM to 4:30 PM (WAT)',
  naicomLicence: 'RBC-LIC-903',
  ncribMembership: 'NCRIB/MBR/896',
  cacRegistration: 'RC- 476963',
};

const escapeHtml = (val) =>
  String(val ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const navHeader = `
<header class="bg-[#0a192f] text-white border-b border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
    <a href="/" class="flex items-center gap-3 text-white font-bold text-lg font-display tracking-tight">
      <span class="text-red-500 font-extrabold text-2xl">KEDGE</span>
      <span class="text-xs uppercase tracking-widest text-slate-300 hidden sm:inline">Insurance Brokers Ltd</span>
    </a>
    <nav aria-label="Main Navigation" class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200">
      <a href="/" class="hover:text-white transition-colors">Home</a>
      <a href="/about" class="hover:text-white transition-colors">About Us</a>
      <a href="/services" class="hover:text-white transition-colors">Services</a>
      <a href="/insurance-directory" class="hover:text-white transition-colors">Directory</a>
      <a href="/industries" class="hover:text-white transition-colors">Industries</a>
      <a href="/risk-management" class="hover:text-white transition-colors">Risk Advisory</a>
      <a href="/insights" class="hover:text-white transition-colors">Insights</a>
      <a href="/contact" class="hover:text-white transition-colors">Contact</a>
    </nav>
    <a href="/quote" class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#c51f1f] hover:bg-[#a81717] text-white text-xs font-semibold uppercase tracking-wider">
      Request Quote
    </a>
  </div>
</header>
`;

const globalFooter = `
<footer class="bg-[#0a192f] text-white border-t border-slate-800 py-12 mt-auto">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-lg font-bold font-display text-white mb-3">KEDGE Insurance Brokers Ltd</h3>
        <p class="text-xs text-slate-300 leading-relaxed mb-4">
          Independent insurance broking and risk advisory partner dedicated to protecting Nigerian enterprise, assets, and families.
        </p>
        <p class="text-xs text-slate-400">
          NAICOM: <span class="text-slate-200 font-mono">${COMPANY_DETAILS.naicomLicence}</span><br />
          NCRIB: <span class="text-slate-200 font-mono">${COMPANY_DETAILS.ncribMembership}</span><br />
          CAC: <span class="text-slate-200 font-mono">${COMPANY_DETAILS.cacRegistration}</span>
        </p>
      </div>
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3">Insurance Solutions</h4>
        <ul class="space-y-2 text-xs text-slate-300">
          <li><a href="/services/motor" class="hover:text-white">Motor Insurance</a></li>
          <li><a href="/services/marine-aviation" class="hover:text-white">Marine & Aviation Insurance</a></li>
          <li><a href="/services/property-engineering" class="hover:text-white">Property & Engineering</a></li>
          <li><a href="/services/liability" class="hover:text-white">Liability Insurance</a></li>
          <li><a href="/services/life-personal" class="hover:text-white">Life & Personal Insurance</a></li>
          <li><a href="/services/commercial-specialist" class="hover:text-white">Commercial & Specialist</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3">Client Services</h4>
        <ul class="space-y-2 text-xs text-slate-300">
          <li><a href="/quote" class="hover:text-white">Request Quotation Callback</a></li>
          <li><a href="/claims-assistance" class="hover:text-white">Claims Assistance Desk</a></li>
          <li><a href="/renewal-enquiry" class="hover:text-white">Policy Renewal Audit</a></li>
          <li><a href="/insurance-directory" class="hover:text-white">Full Product Directory</a></li>
          <li><a href="/coverage-matrix" class="hover:text-white">Coverage Matrix</a></li>
          <li><a href="/faq" class="hover:text-white">Frequently Asked Questions</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3">Head Office</h4>
        <address class="not-italic text-xs text-slate-300 space-y-2 leading-relaxed">
          <p>${escapeHtml(COMPANY_DETAILS.address)}</p>
          <p>Tel: <a href="tel:${COMPANY_DETAILS.primaryPhone.replace(/\s+/g, '')}" class="hover:text-white">${COMPANY_DETAILS.primaryPhone}</a></p>
          <p>Email: <a href="mailto:${COMPANY_DETAILS.email}" class="hover:text-white">${COMPANY_DETAILS.email}</a></p>
          <p>Hours: ${COMPANY_DETAILS.officeHours}</p>
        </address>
      </div>
    </div>
    <div class="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(COMPANY_DETAILS.legalName)}. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="/privacy-policy" class="hover:text-white">Privacy Policy</a>
        <a href="/terms" class="hover:text-white">Terms of Use</a>
      </div>
    </div>
  </div>
</footer>
`;

export const ROUTE_CONTENT = {
  '/': `
    <section class="hero-carousel relative min-h-[580px] overflow-hidden bg-[#0a192f] text-white lg:min-h-[660px]">
      <div class="hero-slide-initial absolute inset-0">
        <picture><source media="(max-width: 768px)" srcset="%HERO_MOBILE_SRC%" /><img src="%HERO_IMAGE_SRC%" alt="Commercial container port and cargo infrastructure at dusk" width="1376" height="768" class="absolute inset-0 h-full w-full object-cover object-center" fetchpriority="high" loading="eager" decoding="async" /></picture>
        <div class="absolute inset-0 bg-[linear-gradient(90deg,#061326_0%,rgba(10,25,47,.94)_37%,rgba(10,25,47,.58)_72%,rgba(10,25,47,.42)_100%)]"></div>
        <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,13,26,.72),transparent_45%)]"></div>
      </div>
      <div class="relative z-10 mx-auto flex min-h-[580px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:min-h-[660px] lg:px-8 lg:py-24">
        <div class="max-w-3xl">
          <div class="mb-5 inline-flex items-center gap-2 rounded border border-slate-700/60 bg-slate-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-200">
            <span>MARINE &amp; LOGISTICS</span><span class="text-red-400">|</span><span>RISK ADVISORY</span>
          </div>
          <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">Protecting goods in motion</p>
          <h1 class="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-6xl font-display">Protection for What Matters. Confidence for What Comes Next.</h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">From businesses and infrastructure to people and valuable assets, KEDGE helps clients understand their risks and make informed insurance decisions.</p>
          <div class="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <a href="/quote" class="inline-flex items-center justify-center rounded-lg bg-[#c51f1f] px-6 py-3.5 text-base font-semibold text-white shadow-md">Request a Quote &rarr;</a>
            <a href="/services" class="inline-flex items-center justify-center rounded-lg border border-slate-600/80 bg-slate-800/70 px-6 py-3.5 text-base font-semibold text-white">Explore Our Services</a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-xs font-bold uppercase tracking-wider text-[#c51f1f]">Structured Portfolio</h2>
          <h3 class="mt-2 text-2xl sm:text-3xl font-bold text-[#0a192f] font-display">Specialist Insurance Classes Placed with Authorized Underwriters</h3>
          <p class="mt-3 text-sm text-slate-600">Tailored risk transfer frameworks for commercial, industrial, marine, and personal requirements.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h4 class="text-lg font-bold text-[#0a192f] mb-2"><a href="/services/motor" class="hover:text-red-700">Motor & Fleet Insurance</a></h4>
            <p class="text-xs text-slate-600 leading-relaxed">Comprehensive and third-party protection for private vehicles, executive fleets, and commercial distribution networks.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h4 class="text-lg font-bold text-[#0a192f] mb-2"><a href="/services/marine-aviation" class="hover:text-red-700">Marine & Aviation</a></h4>
            <p class="text-xs text-slate-600 leading-relaxed">Marine cargo clauses (A, B, C), hull and machinery, and aviation spares coverage for international and domestic transit.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h4 class="text-lg font-bold text-[#0a192f] mb-2"><a href="/services/property-engineering" class="hover:text-red-700">Property & Engineering</a></h4>
            <p class="text-xs text-slate-600 leading-relaxed">Fire and special perils, contractors' all risks, plant breakdown, and electronic equipment coverage.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h4 class="text-lg font-bold text-[#0a192f] mb-2"><a href="/services/liability" class="hover:text-red-700">Liability Solutions</a></h4>
            <p class="text-xs text-slate-600 leading-relaxed">Public and occupiers' liability, professional indemnity, directors' and officers' liability, and product guarantees.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h4 class="text-lg font-bold text-[#0a192f] mb-2"><a href="/services/life-personal" class="hover:text-red-700">Life & Personal Accident</a></h4>
            <p class="text-xs text-slate-600 leading-relaxed">Statutory Group Life Assurance under the Pension Reform Act, keyman protection, and personal accident benefits.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h4 class="text-lg font-bold text-[#0a192f] mb-2"><a href="/services/commercial-specialist" class="hover:text-red-700">Commercial & Specialist</a></h4>
            <p class="text-xs text-slate-600 leading-relaxed">Goods-in-transit, business interruption, fidelity guarantee, agriculture, and energy sector risk placements.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-12 bg-slate-100 border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
        <div>
          <h4 class="text-base font-bold text-[#0a192f]">Need an Independent Risk Assessment or Policy Review?</h4>
          <p class="text-xs text-slate-600 mt-1">Speak directly with an accredited insurance broker at our Lagos head office.</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <a href="/contact" class="px-5 py-2.5 rounded-lg bg-[#0a192f] text-white text-xs font-semibold hover:bg-slate-800">
            Contact Advisory Desk
          </a>
        </div>
      </div>
    </section>
  `,

  '/about': `
    <section class="bg-[#0a192f] text-white py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">About KEDGE Insurance Brokers Ltd</div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
            A Trusted Partner for Risk Appraisal, Policy Design, and Claims Advocacy
          </h1>
          <p class="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Founded on the belief that insurance should be clear, reliable, and tailored to real operating risks, KEDGE serves businesses, families, and institutions across Nigeria.
          </p>
        </div>
      </div>
    </section>
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="max-w-3xl space-y-4">
          <h2 class="text-2xl font-bold text-[#0a192f] font-display">Dedicated to Protecting Nigerian Enterprise & Personal Solvency</h2>
          <p class="text-sm text-slate-600 leading-relaxed">
            KEDGE Insurance Brokers Limited is an independent insurance broking firm established in the Federal Republic of Nigeria, committed to helping businesses and individuals protect their assets, manage risk, and safeguard their financial interests. We bridge the gap between clients seeking insurance protection and the insurance companies that underwrite risks, connecting our clients with insurance solutions suited to their needs and circumstances.
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            We believe insurance should be more than an annual transaction; it should be a strategic component of sound risk management and long-term financial resilience. By understanding our clients’ operations, assets, liabilities, and unique exposures, we provide professional broking guidance to help them evaluate coverage options, clarify policy terms and conditions, and make informed decisions about protecting what matters most.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50">
            <h3 class="font-bold text-sm text-[#0a192f]">Integrity</h3>
            <p class="text-xs text-slate-600 mt-2">Acting honestly, ethically, and transparently in every advisory engagement and client representation.</p>
          </div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50">
            <h3 class="font-bold text-sm text-[#0a192f]">Professionalism</h3>
            <p class="text-xs text-slate-600 mt-2">Applying rigorous insurance technical knowledge, diligence, and the highest standards of the broking profession.</p>
          </div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50">
            <h3 class="font-bold text-sm text-[#0a192f]">Client Focus</h3>
            <p class="text-xs text-slate-600 mt-2">Genuinely understanding each client's unique operating exposures and structuring tailored protection.</p>
          </div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50">
            <h3 class="font-bold text-sm text-[#0a192f]">Accountability</h3>
            <p class="text-xs text-slate-600 mt-2">Taking end-to-end ownership for advisory guidance, policy execution, and claims settlement advocacy.</p>
          </div>
        </div>
        <div class="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-2">
          <h3 class="font-bold text-slate-900 text-sm">Regulatory & Statutory Status</h3>
          <p>KEDGE Insurance Brokers Ltd is licensed by the National Insurance Commission (NAICOM Licence: <strong>${COMPANY_DETAILS.naicomLicence}</strong>), is a verified member of the Nigerian Council of Registered Insurance Brokers (NCRIB Membership: <strong>${COMPANY_DETAILS.ncribMembership}</strong>), and is registered with the Corporate Affairs Commission (CAC: <strong>${COMPANY_DETAILS.cacRegistration}</strong>).</p>
        </div>
      </div>
    </section>
  `,

  '/services': `
    <section class="bg-[#0a192f] text-white py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs uppercase tracking-widest font-semibold text-red-300">Our services</p>
        <h1 class="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold font-display">Insurance categories for real-world risk</h1>
        <p class="mt-4 max-w-2xl text-slate-300 text-base leading-relaxed">Explore the category that best matches your personal, commercial or specialist insurance needs.</p>
      </div>
    </section>
    <section class="py-14 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-[#0a192f] font-display"><a href="/services/motor" class="hover:text-red-700">Motor Insurance</a></h2>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Cover for private vehicles, commercial fleets and the liabilities that arise from using vehicles on Nigerian roads.</p>
            </div>
            <a href="/services/motor" class="mt-5 text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f]">Explore category &rarr;</a>
          </article>
          <article class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-[#0a192f] font-display"><a href="/services/marine-aviation" class="hover:text-red-700">Marine & Aviation</a></h2>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Protection designed around cargo movements, vessels, aircraft and specialist aviation interests.</p>
            </div>
            <a href="/services/marine-aviation" class="mt-5 text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f]">Explore category &rarr;</a>
          </article>
          <article class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-[#0a192f] font-display"><a href="/services/property-engineering" class="hover:text-red-700">Property & Engineering</a></h2>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Structured protection for buildings, plant, equipment, construction projects and business premises.</p>
            </div>
            <a href="/services/property-engineering" class="mt-5 text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f]">Explore category &rarr;</a>
          </article>
          <article class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-[#0a192f] font-display"><a href="/services/liability" class="hover:text-red-700">Liability Solutions</a></h2>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Insurance solutions for legal liabilities arising from premises, professional services, leadership decisions and products.</p>
            </div>
            <a href="/services/liability" class="mt-5 text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f]">Explore category &rarr;</a>
          </article>
          <article class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-[#0a192f] font-display"><a href="/services/life-personal" class="hover:text-red-700">Life & Personal</a></h2>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Personal and employee-benefit covers that help households and organisations plan for life, accident and key-person risks.</p>
            </div>
            <a href="/services/life-personal" class="mt-5 text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f]">Explore category &rarr;</a>
          </article>
          <article class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-[#0a192f] font-display"><a href="/services/commercial-specialist" class="hover:text-red-700">Commercial & Specialist</a></h2>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Specialist covers for money, goods, people, revenue continuity, agriculture and energy-related exposures.</p>
            </div>
            <a href="/services/commercial-specialist" class="mt-5 text-sm font-semibold text-[#0a192f] hover:text-[#c51f1f]">Explore category &rarr;</a>
          </article>
        </div>
      </div>
    </section>
  `,

  '/insurance-directory': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">Insurance Directory</div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
          Comprehensive Insurance Portfolio Aligned with NAICOM Guidelines
        </h1>
        <p class="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          Explore our structured directory of personal, commercial, marine, and industrial covers. As insurance brokers, we ensure every policy is tailored to your real exposures and placed with authorized underwriters.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <p class="text-sm text-slate-600">
          Our directory covers 25 core insurance solutions across six main categories. Review specific covers or request an adviser consultation.
        </p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">Motor Third-Party & Comprehensive</h3><p class="text-xs text-slate-600 mt-2">Legal liability and physical damage protection for private motorists and commercial transport fleets.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">Marine Cargo & Hull</h3><p class="text-xs text-slate-600 mt-2">Protection for ocean, air, and multimodal consignments under Institute Cargo Clauses.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">Fire & Special Perils</h3><p class="text-xs text-slate-600 mt-2">Safeguarding business premises, warehouses, and plant against fire, storm, and explosion hazards.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">Contractors' All Risks (CAR)</h3><p class="text-xs text-slate-600 mt-2">Comprehensive construction project insurance covering material damage and third-party liabilities.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">Professional Indemnity & D&O</h3><p class="text-xs text-slate-600 mt-2">Civil liability defence and management indemnity for corporate directors, lawyers, engineers, and advisers.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">Group Life & Personal Accident</h3><p class="text-xs text-slate-600 mt-2">Statutory employee death benefit arrangements under Nigerian pension law and injury indemnity.</p></div>
        </div>
        <div class="text-center pt-6">
          <a href="/quote" class="inline-flex px-6 py-3 rounded-lg bg-[#c51f1f] text-white font-semibold text-sm">Request a Quotation Callback</a>
        </div>
      </div>
    </section>
  `,

  '/services/motor': `
    <section class="bg-[#0a192f] text-white py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-300 mb-6"><a href="/services" class="hover:text-white">Services</a> &gt; <span>Motor Insurance</span></nav>
        <p class="text-xs uppercase tracking-widest font-semibold text-red-300">Insurance services</p>
        <h1 class="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold font-display">Motor Insurance</h1>
        <p class="mt-4 max-w-2xl text-slate-300 text-base leading-relaxed">Cover for private vehicles, commercial fleets and the liabilities that arise from using vehicles on Nigerian roads.</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="grid md:grid-cols-2 gap-6">
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-xl font-bold text-[#0a192f]">Motor Third-Party Insurance</h2>
            <p class="text-sm text-slate-600 mt-2">Covers eligible legal liability to third parties arising from the use of an insured vehicle, subject to the policy and applicable requirements.</p>
            <dl class="mt-4 text-xs space-y-2">
              <div><dt class="font-bold text-slate-900">Typical risks:</dt><dd class="text-slate-600">Third-party bodily injury, death and property damage liabilities.</dd></div>
              <div><dt class="font-bold text-slate-900">Often relevant to:</dt><dd class="text-slate-600">Private motorists, businesses and fleet operators.</dd></div>
            </dl>
            <a href="/quote?service=Motor%20Third-Party%20Insurance" class="mt-6 inline-block px-4 py-2 rounded bg-[#c51f1f] text-white text-xs font-semibold">Discuss this cover &rarr;</a>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-xl font-bold text-[#0a192f]">Motor Comprehensive Insurance</h2>
            <p class="text-sm text-slate-600 mt-2">A broader motor policy that may combine own-vehicle damage and theft perils with third-party liability, subject to agreed terms.</p>
            <dl class="mt-4 text-xs space-y-2">
              <div><dt class="font-bold text-slate-900">Typical risks:</dt><dd class="text-slate-600">Collision, overturning, fire, theft and selected third-party liabilities.</dd></div>
              <div><dt class="font-bold text-slate-900">Often relevant to:</dt><dd class="text-slate-600">Private vehicle owners, executives and commercial fleets.</dd></div>
            </dl>
            <a href="/quote?service=Motor%20Comprehensive%20Insurance" class="mt-6 inline-block px-4 py-2 rounded bg-[#c51f1f] text-white text-xs font-semibold">Discuss this cover &rarr;</a>
          </article>
        </div>
      </div>
    </section>
  `,

  '/services/marine-aviation': `
    <section class="bg-[#0a192f] text-white py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-300 mb-6"><a href="/services" class="hover:text-white">Services</a> &gt; <span>Marine & Aviation</span></nav>
        <p class="text-xs uppercase tracking-widest font-semibold text-red-300">Insurance services</p>
        <h1 class="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold font-display">Marine & Aviation Insurance</h1>
        <p class="mt-4 max-w-2xl text-slate-300 text-base leading-relaxed">Protection designed around cargo movements, vessels, aircraft and specialist aviation interests.</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-6">
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-xl font-bold text-[#0a192f]">Marine Cargo Insurance</h2><p class="text-sm text-slate-600 mt-2">Helps protect goods while in transit by sea, air, road or multimodal routes under selected cargo clauses.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-xl font-bold text-[#0a192f]">Marine Hull & Machinery Insurance</h2><p class="text-sm text-slate-600 mt-2">Cover for an insured vessel and its machinery against agreed marine perils and physical damage.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-xl font-bold text-[#0a192f]">Aviation Hull Insurance</h2><p class="text-sm text-slate-600 mt-2">Protection for physical aircraft against insured accidental damage and other agreed aviation risks.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-xl font-bold text-[#0a192f]">Aviation Spares & Liability</h2><p class="text-sm text-slate-600 mt-2">Addresses aviation spares interests and selected liabilities connected with aviation operations.</p></article>
        </div>
      </div>
    </section>
  `,

  '/services/property-engineering': `
    <section class="bg-[#0a192f] text-white py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-300 mb-6"><a href="/services" class="hover:text-white">Services</a> &gt; <span>Property & Engineering</span></nav>
        <p class="text-xs uppercase tracking-widest font-semibold text-red-300">Insurance services</p>
        <h1 class="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold font-display">Property & Engineering Insurance</h1>
        <p class="mt-4 max-w-2xl text-slate-300 text-base leading-relaxed">Structured protection for buildings, plant, equipment, construction projects and business premises.</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-base text-[#0a192f]">Fire & Special Perils</h2><p class="text-xs text-slate-600 mt-2">Covers insured property against fire, lightning, explosion, storm, flood, and related perils.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-base text-[#0a192f]">Buildings Under Construction</h2><p class="text-xs text-slate-600 mt-2">Protection for works and project assets in compliance with statutory building insurance mandates.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-base text-[#0a192f]">Contractors' All Risks (CAR)</h2><p class="text-xs text-slate-600 mt-2">Combines cover for civil construction works with selected site third-party liability.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-base text-[#0a192f]">Machinery Breakdown</h2><p class="text-xs text-slate-600 mt-2">Protects industrial machinery, plant, and turbines against sudden mechanical or electrical breakdown.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-base text-[#0a192f]">Electronic Equipment (EEI)</h2><p class="text-xs text-slate-600 mt-2">Covers server infrastructure, communications, and sensitive office computing equipment.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-base text-[#0a192f]">Burglary & All Risks</h2><p class="text-xs text-slate-600 mt-2">Protection for contents, warehouse inventory, and portable business assets.</p></article>
        </div>
      </div>
    </section>
  `,

  '/services/liability': `
    <section class="bg-[#0a192f] text-white py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-300 mb-6"><a href="/services" class="hover:text-white">Services</a> &gt; <span>Liability</span></nav>
        <p class="text-xs uppercase tracking-widest font-semibold text-red-300">Insurance services</p>
        <h1 class="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold font-display">Liability Insurance</h1>
        <p class="mt-4 max-w-2xl text-slate-300 text-base leading-relaxed">Insurance solutions for legal liabilities arising from premises, professional services, leadership decisions and products.</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-6">
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">Public & Occupiers' Liability</h2><p class="text-xs text-slate-600 mt-2">Protects against third-party bodily injury and property damage liabilities connected with premises or operations.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">Professional Indemnity (PI)</h2><p class="text-xs text-slate-600 mt-2">Covers civil defense costs and damages arising from alleged errors, omissions, or breach of professional duty.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">Directors' & Officers' Liability (D&O)</h2><p class="text-xs text-slate-600 mt-2">Financial protection for company executives and board members facing management liability claims.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">Product Liability</h2><p class="text-xs text-slate-600 mt-2">Addresses liability for bodily injury or property damage allegedly caused by manufactured or distributed products.</p></article>
        </div>
      </div>
    </section>
  `,

  '/services/life-personal': `
    <section class="bg-[#0a192f] text-white py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-300 mb-6"><a href="/services" class="hover:text-white">Services</a> &gt; <span>Life & Personal</span></nav>
        <p class="text-xs uppercase tracking-widest font-semibold text-red-300">Insurance services</p>
        <h1 class="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold font-display">Life & Personal Insurance</h1>
        <p class="mt-4 max-w-2xl text-slate-300 text-base leading-relaxed">Personal and employee-benefit covers that help households and organisations plan for life, accident and key-person risks.</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-6">
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">Group Life Assurance (GLA)</h2><p class="text-xs text-slate-600 mt-2">Statutory employer life assurance structured in strict accordance with the Pension Reform Act 2014.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">Group Personal Accident (GPA)</h2><p class="text-xs text-slate-600 mt-2">Accidental bodily injury, permanent disability, and medical expense protection for workplace teams.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">Personal Accident Insurance</h2><p class="text-xs text-slate-600 mt-2">Individual coverage against accidental injuries and disability for entrepreneurs, travellers, and families.</p></article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">Keyman & Executive Life</h2><p class="text-xs text-slate-600 mt-2">Financial solvency cover designed to protect enterprise stability upon the untimely demise of key executives.</p></article>
        </div>
      </div>
    </section>
  `,

  '/services/commercial-specialist': `
    <section class="bg-[#0a192f] text-white py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-300 mb-6"><a href="/services" class="hover:text-white">Services</a> &gt; <span>Commercial & Specialist</span></nav>
        <p class="text-xs uppercase tracking-widest font-semibold text-red-300">Insurance services</p>
        <h1 class="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold font-display">Commercial & Specialist Insurance</h1>
        <p class="mt-4 max-w-2xl text-slate-300 text-base leading-relaxed">Specialist covers for money, goods, people, revenue continuity, agriculture and energy-related exposures.</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-6">
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Goods-in-Transit (GIT)</h2><p class="text-xs text-slate-600 mt-2">Covers cargo while moving across domestic road and rail freight corridors.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Business Interruption</h2><p class="text-xs text-slate-600 mt-2">Replaces lost gross profit and standing charges during post-incident operational recovery.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Fidelity Guarantee</h2><p class="text-xs text-slate-600 mt-2">Protects against direct financial losses arising from employee fraud or embezzlement.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Money Insurance</h2><p class="text-xs text-slate-600 mt-2">Transit and on-premises coverage for cash, cheques, and securities under security warranties.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Agricultural Insurance</h2><p class="text-xs text-slate-600 mt-2">Protection for commercial crop production, poultry, livestock, and processing infrastructure.</p></article>
          <article class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Oil & Gas / Energy</h2><p class="text-xs text-slate-600 mt-2">Tailored placement for upstream, midstream, and downstream petrochemical operational assets.</p></article>
        </div>
      </div>
    </section>
  `,

  '/industries': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">Sector Capabilities</div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
          Risk Management Tailored for Key Nigerian Industry Sectors
        </h1>
        <p class="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          Every industry operates with distinct risk exposures, regulatory standards, and supply chain vulnerabilities. Discover how KEDGE crafts sector-aligned insurance programs.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="grid md:grid-cols-2 gap-8">
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-xl font-bold text-[#0a192f]">Manufacturing & Industrial Production</h2>
            <p class="text-sm text-slate-600 mt-2">Mitigating fire hazards, plant breakdown, raw material interruptions, and product liability liabilities.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-xl font-bold text-[#0a192f]">Marine, Shipping & Port Logistics</h2>
            <p class="text-sm text-slate-600 mt-2">Cargo damage, port demurrage exposures, hull protection, and stevedore operational liabilities.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-xl font-bold text-[#0a192f]">Commercial Transport & Fleet Logistics</h2>
            <p class="text-sm text-slate-600 mt-2">Fleet collision, driver liability, road transit perils, and distribution continuity.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-xl font-bold text-[#0a192f]">Construction & Real Estate Development</h2>
            <p class="text-sm text-slate-600 mt-2">Project site damages, collapse risks, contractor liabilities, and statutory building guarantees.</p>
          </article>
        </div>
      </div>
    </section>
  `,

  '/risk-management': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">Advisory Framework</div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
          Risk Management & Insurance Advisory Framework
        </h1>
        <p class="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          Insurance is only as effective as the risk assessment preceding it. We help clients identify, prioritize, and structure protection against Nigerian operational hazards.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-6 max-w-4xl">
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">1. Exposure Identification</h2><p class="text-xs text-slate-600 mt-2">Systematic survey of operational assets, supply bottlenecks, contractual covenants, and regulatory compliance duties.</p></div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">2. Quantitative & Qualitative Risk Evaluation</h2><p class="text-xs text-slate-600 mt-2">Analyzing loss frequency, potential maximum loss (PML), and financial resilience thresholds.</p></div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">3. Mitigation & Internal Control Advisory</h2><p class="text-xs text-slate-600 mt-2">Implementing physical protection, fleet safety guidelines, and security protocols to diminish loss probability.</p></div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">4. Strategic Insurance Transfer & Placement</h2><p class="text-xs text-slate-600 mt-2">Negotiating favorable terms, warranties, and competitive pricing across top-rated NAICOM-authorised underwriters.</p></div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50"><h2 class="text-lg font-bold text-[#0a192f]">5. Active Claims Advocacy & Continuous Auditing</h2><p class="text-xs text-slate-600 mt-2">Standing beside our clients through loss adjustment, documentation, and prompt settlement advocacy.</p></div>
        </div>
      </div>
    </section>
  `,

  '/insights': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">Insurance Education & Insights</div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
          Authoritative Guidance on Nigerian Insurance & Risk Regulation
        </h1>
        <p class="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          Clear, practical analysis of statutory mandates, claims protocols, marine cargo regulations, and risk planning for Nigerian corporate leaders and entrepreneurs.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-6">
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-lg font-bold text-[#0a192f]">Compulsory Statutory Insurance for Nigerian Employers</h2>
            <p class="text-xs text-slate-600 mt-2">Understanding Pension Reform Act mandates, Occupiers' Liability, and building insurances required by law.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-lg font-bold text-[#0a192f]">Marine Cargo Clauses Explained for Importers</h2>
            <p class="text-xs text-slate-600 mt-2">Differences between Institute Cargo Clauses (A), (B), and (C), general average contributions, and transit risks.</p>
          </article>
          <article class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 class="text-lg font-bold text-[#0a192f]">Claims Best Practice: Swift Notification Protocols</h2>
            <p class="text-xs text-slate-600 mt-2">Crucial documentation steps, mitigation of loss, and avoiding repudiation during insured claims.</p>
          </article>
        </div>
      </div>
    </section>
  `,

  '/contact': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">Communication Desk</div>
        <h1 class="text-3xl sm:text-4xl font-bold font-display text-white">Contact KEDGE Insurance Brokers Ltd</h1>
        <p class="text-sm text-slate-300 mt-2 max-w-2xl">Speak with an insurance broker regarding corporate risk advisory, policy placement, claims assistance, or regulatory compliance reviews.</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-xl font-bold text-[#0a192f]">Official Communication Channels</h2>
          <div class="space-y-4 text-sm text-slate-600">
            <div>
              <p class="font-bold text-slate-900">Head Office Address:</p>
              <p>${escapeHtml(COMPANY_DETAILS.address)}</p>
            </div>
            <div>
              <p class="font-bold text-slate-900">Telephone Lines:</p>
              <p><a href="tel:${COMPANY_DETAILS.primaryPhone.replace(/\s+/g, '')}" class="text-red-700 font-semibold">${COMPANY_DETAILS.primaryPhone}</a> (General Enquiry)</p>
              <p><a href="tel:${COMPANY_DETAILS.directDesk.replace(/\s+/g, '')}" class="text-red-700 font-semibold">${COMPANY_DETAILS.directDesk}</a> (Direct Advisory Desk)</p>
            </div>
            <div>
              <p class="font-bold text-slate-900">Official Email:</p>
              <p><a href="mailto:${COMPANY_DETAILS.email}" class="text-red-700 font-semibold">${COMPANY_DETAILS.email}</a></p>
            </div>
            <div>
              <p class="font-bold text-slate-900">Office Working Hours:</p>
              <p>${COMPANY_DETAILS.officeHours}</p>
            </div>
          </div>
        </div>
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h2 class="text-lg font-bold text-[#0a192f] mb-3">Online Enquiry & Support</h2>
          <p class="text-xs text-slate-600 mb-4 leading-relaxed">
            Submit your risk advisory questions, policy renewal reviews, or claims questions. A qualified KEDGE broking specialist will contact you directly.
          </p>
          <a href="/quote" class="inline-block px-5 py-2.5 rounded-lg bg-[#c51f1f] text-white text-xs font-semibold">
            Open Interactive Enquiry Form &rarr;
          </a>
        </div>
      </div>
    </section>
  `,

  '/quote': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-wider text-red-400">Quotation enquiry</p>
        <h1 class="mt-2 text-3xl sm:text-4xl font-bold font-display text-white">Request a conversation with an adviser</h1>
        <p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          Tell us what you need to protect. A KEDGE adviser will review your enquiry and follow up. This form requests an expert callback; it does not calculate or bind insurance cover.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm text-slate-600">
        <h2 class="text-lg font-bold text-[#0a192f]">How Our Advisory Process Works</h2>
        <ol class="list-decimal pl-5 space-y-3 text-xs leading-relaxed">
          <li><strong>Initial Review:</strong> A licensed broker analyzes your industry exposures, asset declarations, and statutory requirements.</li>
          <li><strong>Underwriter Negotiation:</strong> We solicit quotations from reputable underwriters in Nigeria to benchmark rates, terms, and exclusions.</li>
          <li><strong>Recommendations:</strong> You receive an independent advisory summary detailing optimal cover choices.</li>
        </ol>
      </div>
    </section>
  `,

  '/claims-assistance': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">Claims Support Desk</div>
        <h1 class="text-3xl sm:text-4xl font-bold font-display text-white">Claims Notification & Settlement Advocacy</h1>
        <p class="text-sm text-slate-300 mt-2 max-w-2xl">
          When an unfortunate insured incident occurs, swift, methodical notification and robust documentation make the difference. Discover how KEDGE guides you through the claims lifecycle.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 class="text-xl font-bold text-[#0a192f]">The 4-Step Claims Assistance Protocol</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">1. Immediate Notification</h3><p class="text-xs text-slate-600 mt-2">Notify KEDGE as soon as practical to preserve claim admissibility under policy conditions.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">2. Evidence Preservation</h3><p class="text-xs text-slate-600 mt-2">Secure photographic proof, police reports, survey reports, and mitigate further loss.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">3. Documentation</h3><p class="text-xs text-slate-600 mt-2">Compile purchase invoices, asset registers, and repair estimates for loss adjuster appraisal.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h3 class="font-bold text-sm text-[#0a192f]">4. Settlement Advocacy</h3><p class="text-xs text-slate-600 mt-2">We represent your best interests before the underwriter to expedite equitable claim settlement.</p></div>
        </div>
      </div>
    </section>
  `,

  '/renewal-enquiry': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">Policy Renewal & Technical Audit</div>
        <h1 class="text-3xl sm:text-4xl font-bold font-display text-white">Renew or Review Existing Insurance</h1>
        <p class="text-sm text-slate-300 mt-2">
          Is your current insurance expiring within 30–60 days? Let KEDGE conduct an independent policy benchmarking audit to optimize terms and competitive premiums.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-xs text-slate-600 leading-relaxed">
        <h2 class="text-base font-bold text-[#0a192f]">Why Request an Independent Renewal Review?</h2>
        <p>Market terms, inflation, asset replacements, and regulatory standards change annually. Relying on automatic policy renewal without a technical broking review often leaves enterprises underinsured or paying uncompetitive premiums.</p>
        <p>Contact our renewal desk at <a href="mailto:${COMPANY_DETAILS.email}" class="text-red-700 font-semibold">${COMPANY_DETAILS.email}</a> to arrange a confidential policy benchmarking audit.</p>
      </div>
    </section>
  `,

  '/faq': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">Knowledge Base</div>
        <h1 class="text-3xl sm:text-4xl font-bold font-display text-white">Frequently Asked Questions</h1>
        <p class="text-sm text-slate-300 mt-2">
          Clear, authoritative answers to common questions regarding insurance broking, statutory compliance, claims, and underwriting in Nigeria.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
          <h2 class="text-base font-bold text-[#0a192f]">What is the difference between an insurance broker and an insurance agent?</h2>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">
            An insurance broker is an independent professional who acts strictly on behalf of the client (the insured), offering independent advice across multiple insurance companies. An insurance agent represents a specific insurer. KEDGE is an independent broker advocating for our clients.
          </p>
        </div>
        <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
          <h2 class="text-base font-bold text-[#0a192f]">Does using an insurance broker cost more than buying directly from an insurer?</h2>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">
            No. In Nigerian standard practice, insurance brokerage fees and commissions are remunerated by the underwriting insurance companies from standard premium tariffs. Engaging KEDGE provides expert guidance, policy auditing, and claims advocacy without additional cost to the client.
          </p>
        </div>
        <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
          <h2 class="text-base font-bold text-[#0a192f]">Which insurance covers are compulsory under Nigerian law?</h2>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">
            Compulsory statutory covers in Nigeria include: Motor Third-Party Insurance, Group Life Assurance (under the Pension Reform Act for employers with 3+ employees), Healthcare/NHIA schemes, Insurance of Public Buildings, and Insurance of Buildings Under Construction (above 2 floors).
          </p>
        </div>
      </div>
    </section>
  `,

  '/privacy-policy': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">Data Protection & Privacy Notice</div>
        <h1 class="text-2xl sm:text-3xl font-bold font-display text-white">Privacy Policy & NDPA 2023 Compliance Statement</h1>
        <p class="text-xs text-slate-300 mt-2">Governing Law: Nigeria Data Protection Act (NDPA) 2023 &middot; Data Controller: KEDGE Insurance Brokers Ltd</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs text-slate-600 leading-relaxed">
        <h2 class="text-base font-bold text-[#0a192f]">1. Introduction & Scope</h2>
        <p>KEDGE Insurance Brokers Ltd respects the privacy rights of all individuals and corporate representatives who interact with this website. This Privacy Notice describes how we collect, store, and process personal information submitted through website contact and quotation request forms.</p>
        <h2 class="text-base font-bold text-[#0a192f]">2. Data Processing Principles</h2>
        <p>Personal data is processed lawfully, fairly, and transparently, solely for assessing insurance risk exposures, responding to client enquiries, and fulfilling statutory requirements under the NDPA 2023 and NAICOM regulations.</p>
        <h2 class="text-base font-bold text-[#0a192f]">3. Data Rights</h2>
        <p>Under the NDPA 2023, data subjects have the right to request access, rectification, erasure, or restriction of their personal data by writing to our compliance officer at <a href="mailto:${COMPANY_DETAILS.email}" class="text-red-700 font-semibold">${COMPANY_DETAILS.email}</a>.</p>
      </div>
    </section>
  `,

  '/terms': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">Legal Terms & Operational Notice</div>
        <h1 class="text-2xl sm:text-3xl font-bold font-display text-white">Terms of Use & Website Conditions</h1>
        <p class="text-xs text-slate-300 mt-2">Jurisdiction: Federal Republic of Nigeria &middot; Regulatory Oversight: NAICOM</p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs text-slate-600 leading-relaxed">
        <h2 class="text-base font-bold text-[#0a192f]">1. Website Status & General Information Notice</h2>
        <p>Content on this website is provided for general informational and educational guidance regarding insurance and risk advisory matters in Nigeria. It does not constitute a formal policy quotation, financial advice, or an offer of coverage.</p>
        <h2 class="text-base font-bold text-[#0a192f]">2. No Binding Insurance Online</h2>
        <p>Submitting an enquiry through our online forms initiates an advisory conversation with a broker. Cover is bound only upon formal policy documentation issued by an authorized Nigerian underwriter.</p>
      </div>
    </section>
  `,

  '/coverage-matrix': `
    <section class="bg-[#0a192f] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-xs font-semibold text-red-400 tracking-wider uppercase mb-1">Coverage Directory Reference</div>
        <h1 class="text-3xl sm:text-4xl font-bold font-display text-white">Insurance Classes & Legal References</h1>
        <p class="text-sm text-slate-300 mt-2">
          Technical summary of insurance categories, statutory bases, and advisory notes under Nigerian insurance law.
        </p>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs text-slate-600">
        <p>This reference matrix summarizes statutory and commercial insurance classifications handled by KEDGE Insurance Brokers Ltd.</p>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Motor Insurance (Compulsory & Comprehensive)</h2><p class="mt-1">Governed by the Motor Vehicles (Third-Party Insurance) Act 1945 and NAICOM revised tariffs.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Group Life Assurance (GLA)</h2><p class="mt-1">Mandatory for corporate employers with three or more staff under Section 4(5) of Pension Reform Act 2014.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Marine Cargo Insurance</h2><p class="mt-1">Insurance Act 2003 statutory mandate requiring domestic placement of import cargo insurance in Nigeria.</p></div>
          <div class="p-5 rounded-xl border border-slate-200 bg-slate-50"><h2 class="font-bold text-sm text-[#0a192f]">Occupiers' & Public Liability</h2><p class="mt-1">Insurance Act 2003 Sections 64 & 65 regarding compulsory insurance of public buildings and buildings under construction.</p></div>
        </div>
      </div>
    </section>
  `,
};

export function buildPrerenderBody(route, heroImageSrc = '', heroMobileSrc = '') {
  if (route === '/404') {
    return `<div class="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8"><div class="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-6"><div class="flex items-center justify-center gap-2 text-[#0a192f] font-bold tracking-tight"><span class="text-red-600 font-extrabold text-2xl">KEDGE</span><span class="text-xs uppercase tracking-widest text-slate-500">Insurance Brokers Ltd</span></div><div class="space-y-2"><span class="text-4xl sm:text-5xl font-mono font-bold text-[#c51f1f] block">404</span><h1 class="text-xl sm:text-2xl font-bold text-[#0a192f]">Page or Resource Not Found</h1><p class="text-xs text-slate-500 leading-relaxed">The page you requested does not exist or may have been relocated within our corporate directory.</p></div><div class="pt-2 space-y-2.5"><a href="/" class="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0a192f] rounded-lg shadow-sm flex items-center justify-center">Return to Homepage</a><a href="/services" class="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg flex items-center justify-center">Browse Insurance Directory</a><a href="/contact" class="w-full py-2.5 px-4 text-xs font-semibold text-[#c51f1f] bg-red-50 rounded-lg flex items-center justify-center">Contact Advisory Desk</a></div></div></div>`;
  }
  let content = ROUTE_CONTENT[route] ?? `<main id="main-content"><article class="py-16 max-w-4xl mx-auto px-4"><h1>KEDGE Insurance Brokers Ltd</h1></article></main>`;
  if (route === '/' && heroImageSrc) {
    content = content.replace('%HERO_IMAGE_SRC%', heroImageSrc).replace('%HERO_MOBILE_SRC%', heroMobileSrc);
  }
  return `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>${navHeader}<main id="main-content" class="flex-1">${content}</main>${globalFooter}`;
}
