import gbengaBadejoLogo from '../assets/customer-logos/Gbenga_Badejo.png';
import lagosSealLogo from '../assets/customer-logos/Lagos_Seal.svg';
import nnpcLogo from '../assets/customer-logos/NNPC-Logo.jpg';
import crossCountryLogo from '../assets/customer-logos/cross-country-log.png';
import nycilLogo from '../assets/customer-logos/nycil-logo.png';
import tetfundLogo from '../assets/customer-logos/tetfund-logo.webp';
import cbnLogo from '../assets/customer-logos/cbn.png';
import crustBaseLogo from '../assets/customer-logos/crust-base-engineering.png';
import regencyLogo from '../assets/customer-logos/regency-logo.avif';
import headOfServiceLogo from '../assets/customer-logos/head-of-cilvil-logo.png';
import faanLogo  from '../assets/customer-logos/FAAN-logo.png';


export interface CustomerLogo {
  /** Organisation name, used only for accessible text when KEDGE approves publication. */
  name: string;
  /** Path to the approved, unmodified SVG or transparent PNG asset. */
  src: string;
  /** Short, meaningful description of the logo. */
  alt: string;
}

/** Populate only with customers KEDGE has confirmed and authorised for public display. */
export const APPROVED_CUSTOMER_LOGOS: CustomerLogo[] = [
  {
    name: 'Gbenga Badejo',
    src: gbengaBadejoLogo,
    alt: 'Gbenga Badejo logo',
  },
  {
    name: 'Lagos Seal',
    src: lagosSealLogo,
    alt: 'Lagos Seal logo',
  },
  {
    name: 'NNPC',
    src: nnpcLogo,
    alt: 'NNPC logo',
  },
  {
    name: 'Cross Country',
    src: crossCountryLogo,
    alt: 'Cross Country logo',
  },
  {
    name: 'NYCIL',
    src: nycilLogo,
    alt: 'NYCIL logo',
  },
  {
    name: 'TETFUND',
    src: tetfundLogo,
    alt: 'TETFUND logo',
  },
  {
    name: 'CBN',
    src: cbnLogo,
    alt: 'CBN logo',
  },
  {
    name: 'Crust Base',
    src: crustBaseLogo,
    alt: 'Crust Base logo',
  },
  {
    name: 'Regency',
    src: regencyLogo,
    alt: 'Regency logo',
  },
  {
    name: 'Head of Service',
    src: headOfServiceLogo,
    alt: 'Head of Service logo',
  },
  {
    name: 'FAAN',
    src: faanLogo,
    alt: 'FAAN logo',
  }
];
