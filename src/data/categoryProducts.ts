import { InsuranceCategory } from '../types';

export interface CategoryProduct {
  id: string;
  category: InsuranceCategory;
  name: string;
  description: string;
  risks: string;
  customers: string;
}

export interface ServiceCategory {
  slug: string;
  name: InsuranceCategory;
  introduction: string;
  products: CategoryProduct[];
}

const product = (id: string, category: InsuranceCategory, name: string, description: string, risks: string, customers: string): CategoryProduct => ({ id, category, name, description, risks, customers });

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { slug: 'motor', name: 'Motor', introduction: 'Cover for private vehicles, commercial fleets and the liabilities that arise from using vehicles on Nigerian roads.', products: [
    product('motor-third-party', 'Motor', 'Motor Third-Party Insurance', 'Covers eligible legal liability to third parties arising from the use of an insured vehicle, subject to the policy and applicable requirements.', 'Third-party bodily injury, death and property damage liabilities.', 'Private motorists, businesses and fleet operators.'),
    product('motor-comprehensive', 'Motor', 'Motor Comprehensive Insurance', 'A broader motor policy that may combine own-vehicle damage and theft perils with third-party liability, subject to agreed terms.', 'Collision, overturning, fire, theft and selected third-party liabilities.', 'Private vehicle owners, executives and commercial fleets.'),
  ] },
  { slug: 'marine-aviation', name: 'Marine & Aviation', introduction: 'Protection designed around cargo movements, vessels, aircraft and specialist aviation interests.', products: [
    product('marine-cargo', 'Marine & Aviation', 'Marine Cargo Insurance', 'Helps protect goods while in transit by sea, air, road or multimodal routes under the selected cargo clauses.', 'Physical loss or damage to cargo, subject to transit terms, exclusions and packing requirements.', 'Importers, exporters, manufacturers and trading businesses.'),
    product('marine-hull-machinery', 'Marine & Aviation', 'Marine Hull & Machinery Insurance', 'Cover for an insured vessel and its machinery against agreed marine perils and physical damage.', 'Hull damage, machinery damage and related marine perils stated in the policy.', 'Vessel owners, operators and maritime businesses.'),
    product('aviation-hull', 'Marine & Aviation', 'Aviation Hull Insurance', 'Protection for the physical aircraft against insured accidental damage and other agreed aviation risks.', 'Aircraft damage or loss, subject to aviation policy conditions and exclusions.', 'Aircraft owners, operators and aviation businesses.'),
    product('aviation-spares-liability', 'Marine & Aviation', 'Aviation Spares & Liability Insurance', 'Addresses aviation spares interests and selected liabilities connected with aviation operations.', 'Loss or damage to spares and third-party liabilities within policy limits.', 'Air operators, maintenance organisations and aviation suppliers.'),
  ] },
  { slug: 'property-engineering', name: 'Property & Engineering', introduction: 'Structured protection for buildings, plant, equipment, construction projects and business premises.', products: [
    product('fire-special-perils', 'Property & Engineering', 'Fire & Special Perils Insurance', 'Covers insured property against fire and selected additional perils listed in the policy.', 'Fire, lightning, explosion and other scheduled perils, subject to wording.', 'Property owners, occupiers, manufacturers and SMEs.'),
    product('buildings-under-construction', 'Property & Engineering', 'Insurance of Buildings Under Construction', 'Protection for construction works and related interests during the project period.', 'Accidental physical damage to works and specified construction exposures.', 'Property developers, owners and project sponsors.'),
    product('contractors-all-risks', 'Property & Engineering', "Contractors' All Risks (CAR) Insurance", 'Combines cover for construction works with selected third-party liability during a project.', 'Project-site damage, materials and third-party liability as agreed.', 'Contractors, developers and construction companies.'),
    product('machinery-breakdown-plant', 'Property & Engineering', 'Machinery Breakdown & Plant All Risks Insurance', 'Protects specified machinery and plant against accidental breakdown or damage under agreed terms.', 'Sudden mechanical or electrical breakdown and accidental physical damage.', 'Factories, utilities, warehouses and plant operators.'),
    product('electronic-equipment', 'Property & Engineering', 'Electronic Equipment Insurance (EEI)', 'Cover for specified electronic equipment against insured accidental damage.', 'Damage to computers, communications and electronic systems, subject to exclusions.', 'Offices, technology users, hospitals and businesses.'),
    product('burglary-all-risks', 'Property & Engineering', 'Burglary & All Risks Insurance', 'Protection for specified contents, portable assets or premises against selected theft and accidental damage risks.', 'Burglary, theft and accidental damage to scheduled property, as agreed.', 'Retailers, offices, warehouses and professional firms.'),
  ] },
  { slug: 'liability', name: 'Liability', introduction: 'Insurance solutions for legal liabilities arising from premises, professional services, leadership decisions and products.', products: [
    product('public-occupiers-liability', 'Liability', "Public Liability & Occupiers' Liability Insurance", 'Helps address liability to members of the public or visitors arising from business premises and operations.', 'Third-party injury or property damage connected with premises or operations.', 'Premises owners, retailers, landlords and operating businesses.'),
    product('professional-indemnity', 'Liability', 'Professional Indemnity Insurance (PI)', 'Responds to eligible claims alleging negligent acts, errors or omissions in professional services.', 'Professional negligence, errors and omissions, subject to policy terms.', 'Consultants, advisers, designers and professional practices.'),
    product('directors-officers', 'Liability', "Directors' & Officers' (D&O) Liability Insurance", 'Addresses certain claims against directors and officers arising from management decisions and duties.', 'Management liability and defence costs within the insured scope.', 'Companies, boards and senior executives.'),
    product('product-liability', 'Liability', 'Product Liability Insurance', 'Helps protect businesses against eligible third-party claims connected with products supplied or manufactured.', 'Injury or property damage allegedly caused by a product, subject to wording.', 'Manufacturers, distributors, importers and retailers.'),
  ] },
  { slug: 'life-personal', name: 'Life & Personal', introduction: 'Personal and employee-benefit covers that help households and organisations plan for life, accident and key-person risks.', products: [
    product('group-life-assurance', 'Life & Personal', 'Group Life Assurance (GLA)', 'Life assurance arranged for eligible employees or members of a defined group under agreed benefits.', 'Death benefits for insured members, subject to policy terms and declarations.', 'Employers, associations and employee groups.'),
    product('personal-accident', 'Life & Personal', 'Personal Accident Insurance', 'Individual accident cover for selected accidental death, injury or disability benefits.', 'Accidental bodily injury, disability or death as specified in the policy.', 'Individuals, travellers and independent workers.'),
    product('group-personal-accident', 'Life & Personal', 'Group Personal Accident (GPA)', 'Accident protection for a defined group of employees or members.', 'Accidental injury, disability or death benefits for enrolled members.', 'Employers, teams and membership organisations.'),
    product('keyman-executive-life', 'Life & Personal', 'Keyman & Executive Life Assurance', 'Life assurance structured around the financial impact of losing a key employee or executive.', 'Financial exposure following death of an insured key person, as agreed.', 'Companies dependent on key executives or specialists.'),
  ] },
  { slug: 'commercial-specialist', name: 'Commercial & Specialist', introduction: 'Specialist covers for money, goods, people, revenue continuity, agriculture and energy-related exposures.', products: [
    product('goods-in-transit', 'Commercial & Specialist', 'Goods-in-Transit (GIT) Insurance', 'Protects goods while moving between declared locations under the selected transit basis.', 'Loss or damage to goods in transit, subject to route, packing and policy terms.', 'Distributors, manufacturers, retailers and logistics operators.'),
    product('fidelity-guarantee', 'Commercial & Specialist', 'Fidelity Guarantee Insurance', 'Addresses certain direct financial losses caused by dishonest acts of covered employees.', 'Employee dishonesty or fraud within the insured scope and limits.', 'Employers handling stock, cash or sensitive transactions.'),
    product('money-transit-premises', 'Commercial & Specialist', 'Money Insurance — Transit & Premises', 'Cover for declared money while in transit or at insured premises under agreed security conditions.', 'Loss of cash or money through insured events, subject to limits and warranties.', 'Retailers, banks, offices and cash-handling businesses.'),
    product('business-interruption', 'Commercial & Specialist', 'Business Interruption / Consequential Loss Insurance', 'Helps replace defined lost gross profit or continuing expenses after insured physical damage causes interruption.', 'Loss of income and increased working costs following an insured event.', 'Manufacturers, retailers, hospitality and service businesses.'),
    product('agricultural-agribusiness', 'Commercial & Specialist', 'Agricultural & Agribusiness Insurance', 'Risk solutions for farms, agricultural assets, produce and agribusiness operations.', 'Specified crop, livestock, equipment, property or operational exposures.', 'Farmers, processors, cooperatives and agribusinesses.'),
    product('oil-gas-energy', 'Commercial & Specialist', 'Oil & Gas / Energy Insurance', 'Specialist placement for selected energy assets, projects, operations and liabilities.', 'Property, construction, operational and liability risks identified for the energy activity.', 'Energy companies, contractors and service providers.'),
  ] },
];

export const getServiceCategory = (slug: string) => SERVICE_CATEGORIES.find((category) => category.slug === slug);
