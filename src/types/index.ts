export type InsuranceCategory = 
  | 'Motor'
  | 'Marine & Aviation'
  | 'Property & Engineering'
  | 'Liability'
  | 'Life & Personal'
  | 'Commercial & Specialist';

export interface InsuranceService {
  id: string;
  name: string;
  category: InsuranceCategory;
  shortDescription: string;
  fullDescription: string;
  isCompulsoryInNigeria?: boolean;
  compulsoryApplicability?: 'MANDATORY' | 'CONDITIONAL';
  statutoryBasis?: string;
  targetAudience: string[];
  keyRisksCovered: string[];
  coverageConsiderations: string[];
  standardExclusions: string[];
  naicomClass: string;
}

export interface IndustrySector {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  typicalExposures: string[];
  recommendedCovers: string[];
  nigerianCommercialContext: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  publishedDate: string;
  regulatoryReference?: string;
  content: {
    sectionHeading: string;
    paragraphs: string[];
  }[];
}

export interface QuoteFormData {
  fullName: string;
  organization?: string;
  email: string;
  phone: string;
  category: string;
  specificProduct?: string;
  estimatedSumInsured?: string;
  description: string;
  privacyConsent: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  enquiryType: string;
  message: string;
  privacyConsent: boolean;
}

export interface RenewalFormData {
  policyHolder: string;
  currentInsurer?: string;
  existingPolicyNumber?: string;
  insuranceClass: string;
  expiryDate?: string;
  email: string;
  phone: string;
  notes?: string;
  privacyConsent: boolean;
}
