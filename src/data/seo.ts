import { COMPANY_CONFIG } from './companyConfig';
import pageSeoData from './pageSeo.json';

export interface PageSeo {
  title: string;
  description: string;
  noindex?: boolean;
}

const DEFAULT_DESCRIPTION = pageSeoData['/404'].description;
export const PAGE_SEO: Record<string, PageSeo> = pageSeoData;

const upsertMeta = (selector: string, attribute: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    const attributeValue = selector.match(/\[.+?="(.+?)"\]/)?.[1];
    if (!attributeValue) return;
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

const upsertStructuredData = (canonicalOrigin: string) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: COMPANY_CONFIG.legalName,
        url: canonicalOrigin,
        telephone: COMPANY_CONFIG.phoneNumbers.primary,
        email: COMPANY_CONFIG.emails.generalEnquiry,
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY_CONFIG.headOffice.addressLine1,
          addressLocality: COMPANY_CONFIG.headOffice.city,
          addressRegion: COMPANY_CONFIG.headOffice.state,
          addressCountry: 'NG',
        },
      },
      { '@type': 'WebSite', name: COMPANY_CONFIG.legalName, url: canonicalOrigin },
    ],
  };
  let script = document.head.querySelector<HTMLScriptElement>('script[data-kedge-structured-data]');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.kedgeStructuredData = 'true';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

export const applyPageSeo = (path: string) => {
  const cleanPath = path.replace(/\/$/, '') || '/';
  const categorySlug = cleanPath.startsWith('/services/') ? cleanPath.split('/').pop() : undefined;
  const categoryName = categorySlug?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const page = PAGE_SEO[cleanPath] ?? (categoryName
    ? { title: `${categoryName} Insurance | KEDGE Insurance Brokers Ltd`, description: `Explore ${categoryName.toLowerCase()} insurance information from KEDGE Insurance Brokers Ltd.` }
    : { title: 'Page Not Found | KEDGE Insurance Brokers Ltd', description: DEFAULT_DESCRIPTION, noindex: true });
  const configuredOrigin = import.meta.env.VITE_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  const canonicalOrigin = configuredOrigin || window.location.origin;
  const canonicalUrl = new URL(cleanPath, `${canonicalOrigin}/`).toString();

  document.title = page.title;
  upsertMeta('meta[name="description"]', 'name', page.description);
  upsertMeta('meta[name="robots"]', 'name', page.noindex ? 'noindex,follow' : 'index,follow');
  upsertMeta('meta[property="og:title"]', 'property', page.title);
  upsertMeta('meta[property="og:description"]', 'property', page.description);
  upsertMeta('meta[property="og:url"]', 'property', canonicalUrl);
  upsertMeta('meta[property="og:site_name"]', 'property', COMPANY_CONFIG.legalName);
  upsertMeta('meta[name="twitter:title"]', 'name', page.title);
  upsertMeta('meta[name="twitter:description"]', 'name', page.description);
  upsertLink('canonical', canonicalUrl);
  upsertStructuredData(canonicalOrigin);
};
