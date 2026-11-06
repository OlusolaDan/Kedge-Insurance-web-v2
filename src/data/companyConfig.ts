export interface CompanyConfiguration {
  legalName: string;
  tradingName: string;
  brandSlogan: string;
  brandPersonality: string[];

  // Official Contact Channels (Real corporate communication desk)
  headOffice: {
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    verificationStatus: 'Pending Final Management Confirmation' | 'Verified';
  };
  phoneNumbers: {
    primary: string;
    directDesk: string;
    display: string;
  };
  emails: {
    generalEnquiry: string;
    quoteDesk: string;
    claimsSupport: string;
    renewals: string;
  };
  // Leave empty until KEDGE confirms an authorised WhatsApp Business number.
  whatsappBusinessNumber: string;
  officeHours: string;

  // Regulatory & Statutory Declarations
  regulatory: {
    regulatoryBody: string;
    naicomLicenceNumber: string;
    ncribMembershipNumber: string;
    cacRegistrationNumber: string;
    statusNote: string;
  };

  // Corporate Philosophy (Proposed & documented for management sign-off)
  philosophy: {
    vision: string;
    mission: string;
    coreValues: {
      name: string;
      definition: string;
    }[];
    statusNote: string;
  };
}

export const COMPANY_CONFIG: CompanyConfiguration = {
  legalName: 'KEDGE Insurance Brokers Ltd',
  tradingName: 'KEDGE Insurance Brokers Ltd',
  brandSlogan: 'With You From Now, Into The Future',
  brandPersonality: [
    'Professional',
    'Trustworthy',
    'Modern',
    'Client-focused',
    'Knowledgeable',
    'Dependable',
    'Forward-looking',
    'Technologically progressive',
  ],

  headOffice: {
    addressLine1: '20, Oshidehin Street, off Akilo Road;',
    city: 'Ogba-Ikeja',
    state: 'Lagos State',
    country: 'Nigeria',
    verificationStatus: 'Verified',
  },

  phoneNumbers: {
    primary: '+234 814 636 4641',
    directDesk: '+234 706 721 0112',
    display: 'Verified',
  },

  emails: {
    generalEnquiry: 'info@kedgeinsure.com.ng',
    quoteDesk: 'info@kedgeinsure.com.ng',
    claimsSupport: 'kegdeinsurancebrokers@yahoo.com',
    renewals: 'Verified',
  },
  whatsappBusinessNumber: '2348146364641',

  officeHours: 'Monday to Friday, 8:30 AM to 4:30 PM (WAT)',

  regulatory: {
    regulatoryBody: 'National Insurance Commission (NAICOM)',
    naicomLicenceNumber: 'RBC-LIC-903',
    ncribMembershipNumber: 'NCRIB/MBR/896',
    cacRegistrationNumber: 'RC-476963',
    statusNote: 'KEDGE is NAICOM-licensed and NCRIB-Member.',
  },

  philosophy: {
    vision:
      'To be a trusted insurance brokerage and risk advisory partner, recognised for professional excellence, innovative solutions and lasting value to the people and businesses we serve.',
    mission:
      'To help individuals, businesses and organisations identify, understand and manage their risks by providing professional insurance advice, suitable insurance solutions, dependable client service and support throughout the insurance lifecycle.',
    coreValues: [
      {
        name: 'Integrity',
        definition: 'Acting honestly, ethically, and transparently in every advisory engagement and client representation.',
      },
      {
        name: 'Professionalism',
        definition: 'Applying rigorous insurance technical knowledge, diligence, and the highest standards of the broking profession.',
      },
      {
        name: 'Client Focus',
        definition: 'Genuinely understanding each client’s unique operating exposures and structuring tailored protection.',
      },
      {
        name: 'Accountability',
        definition: 'Taking end-to-end ownership for advisory guidance, policy execution, and claims settlement advocacy.',
      },
      {
        name: 'Excellence',
        definition: 'Pursuing uncompromising quality, technical precision, and continuous operational improvement.',
      },
      {
        name: 'Innovation',
        definition: 'Leveraging contemporary risk management tools and seamless digital channels to enhance the client experience.',
      },
      {
        name: 'Trust',
        definition: 'Fostering enduring relationships built on strict confidentiality, consistency, and dependability.',
      },
    ],
    statusNote: 'Corporate philosophy statements are proposed and awaiting final executive board ratifications.',
  },
};
