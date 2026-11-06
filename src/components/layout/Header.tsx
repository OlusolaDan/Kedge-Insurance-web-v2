import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { COMPANY_CONFIG } from '../../data/companyConfig';
import { INSURANCE_SERVICES } from '../../data/servicesData';
import { INDUSTRY_SECTORS } from '../../data/industriesData';
import { INSIGHT_ARTICLES } from '../../data/insightsData';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  onSelectService?: (serviceId: string) => void;
  onSelectArticle?: (articleId: string) => void;
}

type MenuName = 'services' | 'news' | null;
const services = [['Motor', '/services/motor'], ['Marine & Aviation', '/services/marine-aviation'], ['Property & Engineering', '/services/property-engineering'], ['Liability', '/services/liability'], ['Life & Personal', '/services/life-personal'], ['Commercial & Specialist', '/services/commercial-specialist']];
const news = [['Insights', '/insights'], ['Risk Advisory', '/news-events/risk-advisory'], ['FAQ', '/faq']];

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate, onSelectService, onSelectArticle }) => {
  const [openMenu, setOpenMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const servicesRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const active = (path: string) => path === '/' ? currentPath === '/' : currentPath === path || currentPath.startsWith(`${path}/`);
  const go = (path: string) => {
    navigate(path);
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const searchResults = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const searchTerms = normalizedSearch.split(/\s+/).filter(Boolean);
    if (normalizedSearch.length < 2) return [];
    const results = [
      ...INSURANCE_SERVICES.map((service) => ({ title: service.name, description: `${service.category} · ${service.shortDescription}`, keywords: `${service.name} ${service.category} ${service.shortDescription} ${service.fullDescription}`, path: '/insurance-directory', onSelect: onSelectService ? () => onSelectService(service.id) : undefined })),
      ...INDUSTRY_SECTORS.map((industry) => ({ title: industry.title, description: industry.subtitle, keywords: `${industry.title} ${industry.subtitle} ${industry.description}`, path: '/industries', onSelect: undefined })),
      ...INSIGHT_ARTICLES.map((article) => ({ title: article.title, description: `${article.category} · ${article.summary}`, keywords: `${article.title} ${article.category} ${article.summary}`, path: '/insights', onSelect: onSelectArticle ? () => onSelectArticle(article.id) : undefined })),
      { title: 'Frequently Asked Questions', description: 'Answers about brokers, cover, premiums, claims, policies, and compliance.', keywords: 'faq frequently asked questions broker insurance cover premium claims policy deductible compulsory compliance', path: `/faq?search=${encodeURIComponent(searchQuery.trim())}`, onSelect: undefined },
      { title: 'About KEDGE', description: 'Our brokerage and advisory approach.', keywords: 'about kedge company broker advisory', path: '/about', onSelect: undefined },
      { title: 'Risk Management', description: 'Explore our risk advisory services.', keywords: 'risk management advisory survey assessment', path: '/risk-management', onSelect: undefined },
      { title: 'Contact an Advisor', description: 'Speak with the KEDGE advisory desk.', keywords: 'contact advisor enquiry email phone', path: '/contact', onSelect: undefined },
    ];
    return results.filter((item) => {
      const searchableText = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
      return searchTerms.every((term) => searchableText.includes(term));
    }).slice(0, 6);
  }, [onSelectArticle, onSelectService, searchQuery]);

  const closeSearch = () => {
    setSearchOpen(false);
    searchButtonRef.current?.focus();
  };

  const selectSearchResult = (result: (typeof searchResults)[number]) => {
    if (result.onSelect) result.onSelect();
    else navigate(result.path);
    closeSearch();
  };

  useEffect(() => {
    if (searchOpen) requestAnimationFrame(() => searchInputRef.current?.focus());
  }, [searchOpen]);

  useEffect(() => {
    const outside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (![servicesRef.current, newsRef.current, searchRef.current].some((node) => node?.contains(target))) setOpenMenu(null);
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (searchOpen) closeSearch();
        else if (openMenu) {
          const menu = openMenu;
          setOpenMenu(null);
          triggerRefs.current[menu]?.focus();
        }
      }
    };
    document.addEventListener('click', outside);
    document.addEventListener('keydown', keyboard);
    return () => { document.removeEventListener('click', outside); document.removeEventListener('keydown', keyboard); };
  }, [openMenu, searchOpen]);

  const dropdown = (menu: Exclude<MenuName, null>, items: string[][], ref: React.RefObject<HTMLDivElement | null>) => (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpenMenu(menu)}
      onMouseLeave={(event) => {
        const menuElement = event.currentTarget.querySelector('[role="menu"]');
        if (menuElement?.contains(document.activeElement)) return;
        setOpenMenu((current) => current === menu ? null : current);
      }}
    >
      <a
        href={menu === 'services' ? '/services' : '/insights'}
        ref={(node) => { triggerRefs.current[menu] = node; }}
        onClick={(event) => {
          event.preventDefault();
          setOpenMenu((current) => current === menu ? null : menu);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpenMenu(menu);
            requestAnimationFrame(() => (document.getElementById(`${menu}-menu`)?.querySelector('a') as HTMLElement)?.focus());
          }
        }}
        aria-haspopup="true"
        aria-expanded={openMenu === menu}
        className={`inline-flex min-h-11 items-center gap-1 py-2 ${openMenu === menu || items.some(([, path]) => active(path)) ? 'text-[#0a192f] font-semibold' : 'text-slate-600 hover:text-[#0a192f]'}`}
      >
        {menu === 'services' ? 'Services' : 'News & Event'}
        <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === menu ? 'rotate-180' : ''}`} />
      </a>
      {openMenu === menu && (
        <div id={`${menu}-menu`} role="menu" className="absolute left-0 top-full z-[60] min-w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          {items.map(([label, path]) => (
            <a
              role="menuitem"
              href={path}
              key={path}
              onClick={(event) => {
                event.preventDefault();
                go(path);
              }}
              className={`block min-h-11 rounded-lg px-3 py-2.5 text-sm ${active(path) ? 'bg-slate-100 text-[#0a192f] font-semibold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#0a192f]'}`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const submitSearch = () => {
    if (searchResults[0]) selectSearchResult(searchResults[0]);
    else if (searchQuery.trim()) {
      navigate(`/faq?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  const searchControl = <div ref={searchRef} className="relative"><button ref={searchButtonRef} type="button" onClick={() => setSearchOpen((isOpen) => !isOpen)} aria-label="Search the KEDGE website" aria-expanded={searchOpen} aria-controls="global-search-panel" className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#0a192f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c51f1f]"><Search className="h-5 w-5" aria-hidden="true" /></button>{searchOpen && <div id="global-search-panel" role="dialog" aria-label="Global search" className="absolute right-0 top-[calc(100%+0.65rem)] z-[70] w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-3 text-slate-900 shadow-xl search-panel-enter"><form onSubmit={(event) => { event.preventDefault(); submitSearch(); }} role="search"><label htmlFor="global-site-search" className="sr-only">Search the KEDGE website</label><div className="flex items-center gap-2"><Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" /><input ref={searchInputRef} id="global-site-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search insurance, industries, claims..." autoComplete="off" className="min-w-0 flex-1 rounded-md border border-slate-300 px-2.5 py-2 text-sm focus:border-[#c51f1f] focus:outline-none focus:ring-2 focus:ring-red-100" /><button type="button" onClick={closeSearch} aria-label="Close search" className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-[#0a192f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c51f1f]"><X className="h-4 w-4" aria-hidden="true" /></button></div></form>{searchQuery.trim().length >= 2 && <div className="mt-2 max-h-80 overflow-y-auto border-t border-slate-100 pt-2" role="region" aria-label="Search results">{searchResults.length > 0 ? searchResults.map((result) => <button key={`${result.title}-${result.path}`} type="button" onClick={() => selectSearchResult(result)} className="block w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a192f]"><span className="block text-sm font-semibold text-[#0a192f]">{result.title}</span><span className="mt-0.5 block text-xs text-slate-600 line-clamp-2">{result.description}</span></button>) : <p className="px-3 py-3 text-sm text-slate-600">No matching pages or topics.</p>}</div>}</div>}</div>;

  const internalLink = (path: string, className: string, label: React.ReactNode) => (
    <a href={path} onClick={(event) => { event.preventDefault(); go(path); }} className={className}>{label}</a>
  );

  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm"><div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">{internalLink('/', 'shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c51f1f]', <BrandLogo />)}<nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium lg:flex">{internalLink('/', active('/') ? 'text-[#0a192f] font-semibold' : 'text-slate-600 hover:text-[#0a192f]', 'Home')}{internalLink('/about', active('/about') ? 'text-[#0a192f] font-semibold' : 'text-slate-600 hover:text-[#0a192f]', 'About Us')}{dropdown('services', services, servicesRef)}{dropdown('news', news, newsRef)}{internalLink('/contact', active('/contact') ? 'text-[#0a192f] font-semibold' : 'text-slate-600 hover:text-[#0a192f]', 'Contact')}</nav><div className="flex items-center gap-2 sm:gap-3">{internalLink('/quote', 'hidden rounded-lg bg-[#c51f1f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#a81717] sm:inline-flex', 'Request a Quote')}{searchControl}<button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a192f] lg:hidden">{mobileOpen ? <X /> : <Menu />}</button></div></div>{mobileOpen && <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden"><div className="mb-3 border-b border-slate-100 pb-3 text-xs text-slate-500">{COMPANY_CONFIG.phoneNumbers.primary ? <a href={`tel:${COMPANY_CONFIG.phoneNumbers.primary}`} className="font-semibold text-[#0a192f]">{COMPANY_CONFIG.phoneNumbers.primary}</a> : 'KEDGE Insurance Brokers Ltd.'}</div><div className="grid gap-1">{internalLink('/', 'mobile-nav', 'Home')}{internalLink('/about', 'mobile-nav', 'About Us')}<p className="px-3 pt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Services</p>{services.map(([label, path]) => <React.Fragment key={path}>{internalLink(path, `mobile-nav pl-6 ${active(path) ? 'bg-slate-100 font-semibold text-[#0a192f]' : ''}`, label)}</React.Fragment>)}<p className="px-3 pt-3 text-xs font-bold uppercase tracking-wider text-slate-400">News & Event</p>{news.map(([label, path]) => <React.Fragment key={path}>{internalLink(path, `mobile-nav pl-6 ${active(path) ? 'bg-slate-100 font-semibold text-[#0a192f]' : ''}`, label)}</React.Fragment>)}{internalLink('/contact', 'mobile-nav', 'Contact')}{internalLink('/quote', 'mt-3 rounded-lg bg-[#c51f1f] px-4 py-3 text-sm font-semibold text-white', 'Request a Quote')}</div></div>}</header>;
};
