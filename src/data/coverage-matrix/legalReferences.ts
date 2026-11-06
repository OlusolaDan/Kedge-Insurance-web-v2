import type { LegalReferenceRecord } from '../../types/coverageMatrix';
import { COVERAGE_MATRIX_REVIEW_DATE } from './compulsoryInsurance';

const NIIRA_URL = 'https://naicom.gov.ng/wp-content/uploads/2025/08/NIIRA-2025.pdf';
const NAICOM_INSTRUMENTS_URL = 'https://naicom.gov.ng/regulatory-instruments/';
const CIVIL_AVIATION_ACT_URL = 'https://www.ncaa.gov.ng/media/sxxn42yu/civil-aviation-act-2022-publi9cation.pdf';
const NCDMB_INSURANCE_GUIDELINE_URL = 'https://www.ncdmb.gov.ng/ncdmb-naicom-launch-insurance-services-guideline/';

export const LEGAL_REFERENCES: LegalReferenceRecord[] = [
  {
    id: 'niira-2025',
    title: 'Nigerian Insurance Industry Reform Act, 2025',
    instrumentType: 'Act of the National Assembly',
    provision: 'Sections 3, 37–52, 68 and 75–84',
    description: 'Primary statutory source for the class framework, insurance broker requirements and the compulsory insurance provisions shown in this matrix.',
    officialSource: NIIRA_URL,
    verificationStatus: 'VERIFIED',
    lastVerified: COVERAGE_MATRIX_REVIEW_DATE,
  },
  {
    id: 'civil-aviation-act-2022',
    title: 'Civil Aviation Act, 2022',
    instrumentType: 'Act of the National Assembly',
    provision: 'Section 104(1)–(3)',
    description: 'Requires carriers and specified aviation service providers to maintain adequate insurance for liabilities under the Act and third-party damage. Section 104 also addresses operating permission and quarterly compliance returns.',
    officialSource: `${CIVIL_AVIATION_ACT_URL}#page=69`,
    verificationStatus: 'VERIFIED',
    lastVerified: COVERAGE_MATRIX_REVIEW_DATE,
  },
  {
    id: 'nogicd-act-2010-insurance',
    title: 'Nigerian Oil and Gas Industry Content Development Act, 2010',
    instrumentType: 'Act of the National Assembly',
    provision: 'Sections 49–50',
    description: 'Addresses insurance of insurable risks related to oil-and-gas activities and prior written NAICOM approval for offshore placement after local insurance capacity has been exhausted. The linked NCDMB release explains the provisions and the joint insurance guideline.',
    officialSource: NCDMB_INSURANCE_GUIDELINE_URL,
    verificationStatus: 'VERIFIED',
    lastVerified: COVERAGE_MATRIX_REVIEW_DATE,
  },
  {
    id: 'ncdmb-naicom-insurance-guideline-2022',
    title: 'NCDMB–NAICOM Insurance Services Guideline (2022)',
    instrumentType: 'Joint regulatory guideline',
    provision: 'Supports implementation of NOGICD Act 2010, sections 49–50',
    description: 'The NCDMB confirms the guideline’s launch and purpose. The full guideline text and its current detailed requirements have not been independently reviewed.',
    officialSource: NCDMB_INSURANCE_GUIDELINE_URL,
    verificationStatus: 'PENDING VERIFICATION',
    lastVerified: null,
  },
  {
    id: 'naicom-regulatory-instruments',
    title: 'Regulatory Instruments',
    instrumentType: 'NAICOM official regulatory-instruments index',
    provision: 'As applicable to the relevant activity or insurance class',
    description: 'Official NAICOM index for locating current regulatory instruments. This matrix does not rely on an individual instrument unless it is specifically identified.',
    officialSource: NAICOM_INSTRUMENTS_URL,
    verificationStatus: 'VERIFIED',
    lastVerified: COVERAGE_MATRIX_REVIEW_DATE,
  },
  {
    id: 'naicom-guidelines',
    title: 'Applicable NAICOM Guidelines',
    instrumentType: 'Guidelines collection',
    provision: 'To be identified for the relevant transaction or regulated activity',
    description: 'Use the official NAICOM index to identify any guideline that applies. No individual guideline is represented here as verified.',
    officialSource: NAICOM_INSTRUMENTS_URL,
    verificationStatus: 'PENDING VERIFICATION',
    lastVerified: null,
  },
  {
    id: 'naicom-directives-circulars',
    title: 'Applicable NAICOM Directives and Circulars',
    instrumentType: 'Directives and circulars collection',
    provision: 'To be identified for the relevant transaction or regulated activity',
    description: 'Use the official NAICOM index to identify any current directive or circular. No individual instrument is represented here as verified.',
    officialSource: NAICOM_INSTRUMENTS_URL,
    verificationStatus: 'PENDING VERIFICATION',
    lastVerified: null,
  },
  {
    id: 'naic-act',
    title: 'Nigerian Agricultural Insurance Corporation Act (Cap. N89, LFN 2004)',
    instrumentType: 'Legislation referenced by NIIRA',
    provision: 'Referenced in NIIRA 2025, section 3(3)(h)',
    description: 'NIIRA qualifies the agricultural insurance class by excluding classes covered by this Act. The separate Act has not been independently reviewed for this matrix.',
    officialSource: `${NIIRA_URL}#page=13`,
    verificationStatus: 'PENDING VERIFICATION',
    lastVerified: null,
  },
];
