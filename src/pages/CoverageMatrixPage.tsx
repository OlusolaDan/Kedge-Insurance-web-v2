import React, { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import { INSURANCE_CLASSES } from '../data/coverage-matrix/insuranceClasses';
import { INSURANCE_PRODUCT_EXAMPLES } from '../data/coverage-matrix/insuranceProducts';
import { COMPULSORY_INSURANCE, COVERAGE_MATRIX_REVIEW_DATE } from '../data/coverage-matrix/compulsoryInsurance';
import { BROKER_REGULATIONS } from '../data/coverage-matrix/brokerRegulations';
import { LEGAL_REFERENCES } from '../data/coverage-matrix/legalReferences';
import { SERVICE_CATEGORIES } from '../data/categoryProducts';
import { INSURANCE_SERVICES } from '../data/servicesData';
import type { InsuranceBusinessGroup } from '../types/coverageMatrix';
import './CoverageMatrixPage.css';

interface CoverageMatrixPageProps {
  navigate: (path: string) => void;
}

type MatrixTab = 'classes' | 'compulsory' | 'legal';
type RequirementFilter = 'all' | 'MANDATORY' | 'CONDITIONAL';

const NIIRA_URL = 'https://naicom.gov.ng/wp-content/uploads/2025/08/NIIRA-2025.pdf';
const groups: { id: InsuranceBusinessGroup; label: string; count: string; description: string }[] = [
  { id: 'life', label: 'Life Insurance Business', count: '4 statutory classes', description: 'One of the two principal categories under section 3.' },
  { id: 'non-life', label: 'Non-Life Insurance Business', count: '8 statutory classes', description: 'The other principal category under section 3.' },
  { id: 'miscellaneous', label: 'Miscellaneous Insurance Business', count: 'Additional classification', description: 'Includes financial inclusion insurance business; not a third principal category.' },
];
const tabs: { id: MatrixTab; label: string }[] = [
  { id: 'classes', label: 'Insurance Classes' },
  { id: 'compulsory', label: 'Compulsory Insurance' },
  { id: 'legal', label: 'Legal & Regulatory References' },
];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));

const displayVerificationStatus = (status: string) => {
  if (status === 'VERIFIED') return 'Checked against the official source';
  if (status === 'PENDING VERIFICATION') return 'Individual instrument not reviewed';
  if (status === 'SUPERSEDED') return 'Superseded';
  return 'Not verified';
};

export const CoverageMatrixPage: React.FC<CoverageMatrixPageProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<MatrixTab>('classes');
  const [classQuery, setClassQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState<InsuranceBusinessGroup | 'all'>('all');
  const [requirementQuery, setRequirementQuery] = useState('');
  const [requirementFilter, setRequirementFilter] = useState<RequirementFilter>('all');
  const tabRefs = useRef<Record<MatrixTab, HTMLButtonElement | null>>({
    classes: null,
    compulsory: null,
    legal: null,
  });

  const directoryProductIds = useMemo(
    () => new Set([
      ...SERVICE_CATEGORIES.flatMap((category) => category.products.map((product) => product.id)),
      ...INSURANCE_SERVICES.map((service) => service.id),
    ]),
    [],
  );
  const verifiedRequirements = useMemo(
    () => COMPULSORY_INSURANCE.filter((record) => record.verificationStatus === 'VERIFIED'),
    [],
  );

  const filteredClasses = useMemo(() => {
    const query = classQuery.trim().toLowerCase();
    return INSURANCE_CLASSES.filter((insuranceClass) => {
      if (groupFilter !== 'all' && insuranceClass.group !== groupFilter) return false;
      if (!query) return true;
      const products = INSURANCE_PRODUCT_EXAMPLES
        .filter((product) => product.classId === insuranceClass.id)
        .map((product) => `${product.name} ${product.coverageExample}`)
        .join(' ');
      return [
        insuranceClass.name,
        insuranceClass.description,
        insuranceClass.provision,
        insuranceClass.qualification ?? '',
        insuranceClass.riskExamples.join(' '),
        products,
      ].join(' ').toLowerCase().includes(query);
    });
  }, [classQuery, groupFilter]);

  const filteredRequirements = useMemo(() => {
    const query = requirementQuery.trim().toLowerCase();
    return verifiedRequirements.filter((record) => {
      if (requirementFilter !== 'all' && record.regulatoryStatus !== requirementFilter) return false;
      return !query || [
        record.requirement,
        record.legalProvision,
        record.affectedParties,
        record.scope,
        record.conditionsAndExceptions,
      ].join(' ').toLowerCase().includes(query);
    });
  }, [requirementFilter, requirementQuery, verifiedRequirements]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex].id;
    setActiveTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  return (
    <div className="coverage-matrix-page">
      <header className="coverage-matrix-hero">
        <div className="coverage-matrix-hero__content">
          <p className="coverage-matrix-eyebrow">Insurance information · Nigeria</p>
          <h1>NAICOM Coverage Matrix</h1>
          <p className="coverage-matrix-hero__intro">
            Explore the recognised insurance business classifications in Nigeria, understand products
            associated with different risk categories, and find the relevant provisions of the Nigerian
            Insurance Industry Reform Act 2025 and official NAICOM resources.
          </p>
          <div className="coverage-matrix-hero__basis">
            <span><ShieldCheck size={16} aria-hidden="true" /> Nigerian Insurance Industry Reform Act 2025</span>
            <span>Statutory classification: section 3</span>
          </div>
          <a className="coverage-matrix-hero__link" href={NIIRA_URL} target="_blank" rel="noreferrer">
            Read the official Act <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="coverage-matrix-shell">
        <section className="coverage-matrix-intro" aria-labelledby="coverage-purpose-heading">
          <div>
            <p className="coverage-matrix-kicker">How to use this reference</p>
            <h2 id="coverage-purpose-heading">Insurance classes are not individual products</h2>
          </div>
          <p>
            NIIRA 2025 establishes the statutory classification framework. Products are examples of
            how risks may be insured; the wording and legal character of a particular policy determine
            its treatment. This is KEDGE’s informational reference, not a NAICOM publication or
            endorsement. KEDGE is an insurance broker; insurers underwrite policies and assume the
            insured risks.
          </p>
        </section>

        <nav className="coverage-matrix-tabs" aria-label="Coverage Matrix sections" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[tab.id] = element; }}
              type="button"
              id={`coverage-tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="coverage-panel"
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div
          id="coverage-panel"
          className="coverage-matrix-panel"
          role="tabpanel"
          aria-labelledby={`coverage-tab-${activeTab}`}
          tabIndex={0}
        >
          {activeTab === 'classes' && (
            <section aria-labelledby="classes-heading">
              <div className="coverage-matrix-section-heading">
                <div>
                  <p className="coverage-matrix-kicker">NIIRA 2025 · Section 3</p>
                  <h2 id="classes-heading">Insurance classes and product examples</h2>
                </div>
                <a className="coverage-matrix-text-link" href={NIIRA_URL} target="_blank" rel="noreferrer">
                  View section 3 <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a
                  className="coverage-matrix-text-link"
                  href="/insurance-directory"
                  onClick={(event) => { event.preventDefault(); navigate('/insurance-directory'); }}
                >
                  Browse KEDGE’s product directory <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              <div className="coverage-matrix-summaries" aria-label="Insurance classification groups">
                {groups.map((group) => {
                  const count = INSURANCE_CLASSES.filter((item) => item.group === group.id).length;
                  return (
                    <button
                      className={`coverage-summary-card${groupFilter === group.id ? ' is-selected' : ''}`}
                      key={group.id}
                      type="button"
                      aria-pressed={groupFilter === group.id}
                      onClick={() => setGroupFilter(groupFilter === group.id ? 'all' : group.id)}
                    >
                      <span className="coverage-summary-card__count">{group.id === 'miscellaneous' ? '+' : count}</span>
                      <span className="coverage-summary-card__label">{group.label}</span>
                      <span className="coverage-summary-card__meta">{group.count}</span>
                      <span className="coverage-summary-card__description">{group.description}</span>
                    </button>
                  );
                })}
              </div>

              <div className="coverage-matrix-controls">
                <label className="coverage-search">
                  <Search size={18} aria-hidden="true" />
                  <span className="visually-hidden">Search insurance classes, products, risks or legal provisions</span>
                  <input
                    type="search"
                    value={classQuery}
                    onChange={(event) => setClassQuery(event.target.value)}
                    placeholder="Search classes, products, risks or provisions"
                  />
                </label>
                <div className="coverage-filter-group" role="group" aria-label="Filter by statutory insurance group">
                  <button type="button" aria-pressed={groupFilter === 'all'} onClick={() => setGroupFilter('all')}>All classes</button>
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      aria-pressed={groupFilter === group.id}
                      onClick={() => setGroupFilter(group.id)}
                    >
                      {group.id === 'non-life' ? 'Non-Life' : group.id === 'life' ? 'Life' : 'Miscellaneous'}
                    </button>
                  ))}
                </div>
              </div>

              <p className="coverage-matrix-result-count" aria-live="polite">
                {filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'} shown
              </p>

              {filteredClasses.length > 0 ? (
                <div className="coverage-class-list">
                  {filteredClasses.map((insuranceClass) => {
                    const examples = INSURANCE_PRODUCT_EXAMPLES.filter((product) => product.classId === insuranceClass.id);
                    return (
                      <details className="coverage-class-card" key={insuranceClass.id}>
                        <summary>
                          <span className="coverage-class-card__heading">
                            <span className="coverage-class-card__category">
                              {groups.find((group) => group.id === insuranceClass.group)?.label}
                            </span>
                            <span className="coverage-class-card__title">{insuranceClass.name}</span>
                            <span className="coverage-class-card__provision">{insuranceClass.provision}</span>
                          </span>
                          <span className="coverage-class-card__expand">View details</span>
                        </summary>
                        <div className="coverage-class-card__body">
                          <p>{insuranceClass.description}</p>
                          {insuranceClass.qualification && (
                            <p className="coverage-qualification"><strong>Statutory qualification:</strong> {insuranceClass.qualification}</p>
                          )}
                          <div className="coverage-detail-grid">
                            <div>
                              <h3>Illustrative products and covers</h3>
                              <ul className="coverage-chip-list">
                                {examples.map((product) => {
                                  const inDirectory = product.directoryProductId
                                    ? directoryProductIds.has(product.directoryProductId)
                                    : false;
                                  return (
                                    <li key={product.id}>
                                      <strong>{product.name}</strong>
                                      <span>{product.coverageExample}</span>
                                      <small>{inDirectory ? 'Listed in KEDGE’s product directory' : 'Illustrative example; not a confirmation of current availability'}</small>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <div>
                              <h3>Risk examples</h3>
                              <ul className="coverage-risk-list">
                                {insuranceClass.riskExamples.map((risk) => <li key={risk}>{risk}</li>)}
                              </ul>
                              <p className="coverage-class-reference">
                                <strong>Statutory reference</strong>
                                <span>{insuranceClass.provision}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              ) : (
                <div className="coverage-empty-state" role="status">
                  <h3>No matching insurance classes</h3>
                  <p>Try a different search term or clear the selected group filter.</p>
                  <button type="button" onClick={() => { setClassQuery(''); setGroupFilter('all'); }}>Clear search and filters</button>
                </div>
              )}
              <p className="coverage-matrix-note">
                Product examples are illustrative, not policy recommendations. A product’s class depends on its
                substance and wording. KEDGE directory labels identify entries in the existing directory; they
                do not mean KEDGE underwrites the risk.
              </p>
            </section>
          )}

          {activeTab === 'compulsory' && (
            <section aria-labelledby="compulsory-heading">
              <div className="coverage-matrix-section-heading">
                <div>
                  <p className="coverage-matrix-kicker">Separate from insurance classification</p>
                  <h2 id="compulsory-heading">Compulsory Insurance Requirements in Nigeria</h2>
                  <p className="coverage-section-lead">
                    These are specific obligations under NIIRA 2025 and applicable sector legislation. A statutory insurance class is not, by itself,
                    proof that every product in that class is compulsory.
                  </p>
                </div>
              </div>

              <div className="coverage-matrix-controls">
                <label className="coverage-search">
                  <Search size={18} aria-hidden="true" />
                  <span className="visually-hidden">Search compulsory requirements, provisions, parties or scope</span>
                  <input
                    type="search"
                    value={requirementQuery}
                    onChange={(event) => setRequirementQuery(event.target.value)}
                    placeholder="Search requirements, parties or provisions"
                  />
                </label>
                <label className="coverage-select">
                  <span>Applicability</span>
                  <select
                    value={requirementFilter}
                    onChange={(event) => {
                      const value = event.currentTarget.value;
                      if (value === 'all' || value === 'MANDATORY' || value === 'CONDITIONAL') {
                        setRequirementFilter(value);
                      }
                    }}
                  >
                    <option value="all">All verified requirements</option>
                    <option value="MANDATORY">Mandatory in the stated scope</option>
                    <option value="CONDITIONAL">Mandatory when stated conditions apply</option>
                  </select>
                </label>
              </div>
              <p className="coverage-matrix-result-count" aria-live="polite">
                {filteredRequirements.length} verified {filteredRequirements.length === 1 ? 'requirement' : 'requirements'} shown
              </p>

              {filteredRequirements.length > 0 ? (
                <div className="coverage-requirement-list">
                  {filteredRequirements.map((record) => (
                    <details className="coverage-requirement-card" key={record.id}>
                      <summary>
                        <span className="coverage-requirement-card__title">{record.requirement}</span>
                        <span className="coverage-requirement-card__status">
                          {record.regulatoryStatus === 'MANDATORY' ? 'Mandatory' : 'Mandatory when applicable'}
                        </span>
                      </summary>
                      <dl>
                        <div><dt>Exact legal provision</dt><dd>{record.legalProvision}</dd></div>
                        <div><dt>Who it applies to</dt><dd>{record.affectedParties}</dd></div>
                        <div><dt>Scope of cover</dt><dd>{record.scope}</dd></div>
                        <div><dt>Conditions and exceptions</dt><dd>{record.conditionsAndExceptions}</dd></div>
                        <div>
                          <dt>Regulatory status</dt>
                          <dd>{record.regulatoryStatus === 'MANDATORY' ? 'Express statutory obligation' : 'Express statutory obligation when the stated scope or condition applies'}</dd>
                        </div>
                      </dl>
                      <a className="coverage-matrix-text-link" href={record.officialSource} target="_blank" rel="noreferrer">
                        Read the cited legal source <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </details>
                  ))}
                </div>
              ) : (
                <div className="coverage-empty-state" role="status">
                  <h3>No verified requirements match</h3>
                  <p>Adjust your search or applicability filter. Unverified items are not presented as compulsory.</p>
                  <button type="button" onClick={() => { setRequirementQuery(''); setRequirementFilter('all'); }}>Clear search and filters</button>
                </div>
              )}
            </section>
          )}

          {activeTab === 'legal' && (
            <section aria-labelledby="legal-heading">
              <div className="coverage-matrix-section-heading">
                <div>
                  <p className="coverage-matrix-kicker">Intermediaries are regulated separately</p>
                  <h2 id="legal-heading">Insurance Brokerage &amp; Regulatory Framework</h2>
                </div>
              </div>
              <div className="coverage-broker-callout">
                <h3>A broker is not an underwriter</h3>
                <p>
                  KEDGE Insurance Brokers Ltd acts as an insurance intermediary. Insurance companies underwrite
                  policies and assume insured risks. NIIRA regulates insurers, brokers, agents, loss adjusters and
                  other participants through distinct provisions; one role’s obligations should not be attributed
                  to another.
                </p>
              </div>
              <div className="coverage-regulation-list">
                {BROKER_REGULATIONS.map((regulation) => (
                  <article key={regulation.id} className="coverage-regulation-card">
                    <p className="coverage-matrix-kicker">{regulation.provision}</p>
                    <h3>{regulation.title}</h3>
                    <p>{regulation.summary}</p>
                    <p className="coverage-regulation-card__scope"><strong>Applies to:</strong> {regulation.appliesTo}</p>
                  </article>
                ))}
              </div>
              <p className="coverage-matrix-note">
                These provisions describe the legal framework only. They are not a statement or verification of
                KEDGE’s licence, professional membership, regulatory standing or compliance status. Agents and
                loss adjusters have separate licensing provisions under Part VI of the Act. Section 39(11)–(12)
                concerns information provided to underwriters; this page does not assert a separate client-facing
                disclosure rule without an individually verified instrument.
              </p>

              <div className="coverage-reference-heading">
                <p className="coverage-matrix-kicker">Official sources</p>
                <h2>Legal References &amp; Regulatory Resources</h2>
              </div>
              <div className="coverage-reference-grid">
                {LEGAL_REFERENCES.map((reference) => (
                  <article className="coverage-reference-card" key={reference.id}>
                    <div className="coverage-reference-card__topline">
                      <span>{reference.instrumentType}</span>
                      <span className={`coverage-verification coverage-verification--${reference.verificationStatus === 'VERIFIED' ? 'verified' : 'pending'}`}>
                        {displayVerificationStatus(reference.verificationStatus)}
                      </span>
                    </div>
                    <h3>{reference.title}</h3>
                    <p>{reference.description}</p>
                    <p className="coverage-reference-card__provision"><strong>Provision:</strong> {reference.provision}</p>
                    <p className="coverage-reference-card__date">
                      {reference.lastVerified
                        ? `Last checked ${formatDate(reference.lastVerified)}`
                        : 'No individual instrument verification date'}
                    </p>
                    <a href={reference.officialSource} target="_blank" rel="noreferrer">
                      Open official source <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>

              <aside className="coverage-disclaimer" aria-labelledby="coverage-disclaimer-heading">
                <h2 id="coverage-disclaimer-heading">Regulatory disclaimer</h2>
                <p>
                  This page is an informational reference and is not an official NAICOM publication. Product
                  descriptions are illustrative and do not replace policy wording. Actual cover depends on the
                  insurer’s terms, conditions, exclusions and endorsements. Statutory obligations must be read
                  with the applicable legislation and regulatory instruments. Seek professional advice where
                  appropriate.
                </p>
                <p><strong>NIIRA provisions cited here last reviewed: {formatDate(COVERAGE_MATRIX_REVIEW_DATE)}.</strong> Individual NAICOM instruments are identified as pending when they have not been independently checked.</p>
              </aside>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
