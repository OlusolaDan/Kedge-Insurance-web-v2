export type InsuranceBusinessGroup = 'life' | 'non-life' | 'miscellaneous';

export type VerificationStatus =
  | 'VERIFIED'
  | 'PENDING VERIFICATION'
  | 'NOT VERIFIED'
  | 'SUPERSEDED';

export interface InsuranceClassRecord {
  id: string;
  group: InsuranceBusinessGroup;
  name: string;
  provision: string;
  description: string;
  riskExamples: string[];
  qualification?: string;
}

export interface InsuranceProductExample {
  id: string;
  classId: string;
  name: string;
  coverageExample: string;
  directoryProductId?: string;
}

export interface CompulsoryInsuranceRecord {
  id: string;
  requirement: string;
  legalProvision: string;
  affectedParties: string;
  scope: string;
  conditionsAndExceptions: string;
  regulatoryStatus: 'MANDATORY' | 'CONDITIONAL';
  officialSource: string;
  verificationStatus: VerificationStatus;
  lastVerified: string | null;
}

export interface BrokerRegulationRecord {
  id: string;
  title: string;
  provision: string;
  summary: string;
  appliesTo: string;
}

export interface LegalReferenceRecord {
  id: string;
  title: string;
  instrumentType: string;
  provision: string;
  description: string;
  officialSource: string;
  verificationStatus: VerificationStatus;
  lastVerified: string | null;
}
