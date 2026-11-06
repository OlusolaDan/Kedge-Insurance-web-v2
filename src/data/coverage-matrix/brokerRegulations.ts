import type { BrokerRegulationRecord } from '../../types/coverageMatrix';

export const BROKER_REGULATIONS: BrokerRegulationRecord[] = [
  {
    id: 'broker-licensing',
    title: 'Licensing before transacting business',
    provision: 'NIIRA 2025, section 39(1), (3) and (4)',
    summary: 'A person may not transact business in Nigeria as an insurance broker unless licensed under the Act. Section 39 sets out the application process and eligibility requirements, including firm registration and professional qualification requirements for specified principals.',
    appliesTo: 'Insurance brokers and applicants for an insurance broker licence.',
  },
  {
    id: 'broker-renewal',
    title: 'Licence renewal',
    provision: 'NIIRA 2025, section 39(2)',
    summary: 'A broker licence is to be renewed every five years, or for a longer period if the Commission determines one.',
    appliesTo: 'Licensed insurance brokers.',
  },
  {
    id: 'broker-indemnity',
    title: 'Professional indemnity',
    provision: 'NIIRA 2025, section 43(1)',
    summary: 'An insurance or reinsurance broking firm must maintain professional indemnity cover of at least NGN 100,000,000 or 50% of its average annual brokerage income for the preceding year, whichever is greater.',
    appliesTo: 'Insurance and reinsurance broking firms.',
  },
  {
    id: 'broker-records',
    title: 'Records, membership evidence and accounts',
    provision: 'NIIRA 2025, section 44(1)–(3)',
    summary: 'The Act requires brokers to keep prescribed business records, maintain evidence of current Nigerian Council of Registered Insurance Brokers membership, and submit audited financial statements and a revenue account within the prescribed period.',
    appliesTo: 'Insurance and reinsurance brokers.',
  },
  {
    id: 'broker-client-account',
    title: 'Clients’ account',
    provision: 'NIIRA 2025, section 47(1)–(2)',
    summary: 'A broker must establish and maintain a clients’ account for money, premiums, claims and recoveries received from or on behalf of clients, insurers and reinsurers.',
    appliesTo: 'Insurance brokers.',
  },
  {
    id: 'broker-risk-information',
    title: 'Risk information provided to underwriters',
    provision: 'NIIRA 2025, section 39(11)–(12)',
    summary: 'A broker must provide an underwriter with fundamental risk assessment information in accordance with Commission regulations. The Act addresses commission where a broker knowingly or recklessly transacts without that information.',
    appliesTo: 'Insurance brokers placing business with underwriters.',
  },
  {
    id: 'broker-professional-conduct',
    title: 'Professional conduct and licence action',
    provision: 'NIIRA 2025, section 42(1)(g) and (2)–(5)',
    summary: 'Knowingly or recklessly acting contrary to the profession’s code of conduct is identified among the grounds relevant to cancellation of a broker’s licence. The Act provides for notice and a graduated sanction process.',
    appliesTo: 'Licensed insurance brokers.',
  },
];
