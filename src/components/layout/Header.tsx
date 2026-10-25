import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { Menu, X, ChevronDown, PhoneCall, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '../../data/companyConfig';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Industries', path: '/industries' },
    { label: 'Risk Advisory', path: '/risk-management' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-white border-b ${
        scrolled
          ? 'border-slate-200 shadow-sm py-3'
          : 'border-slate-100 py-4'
      }`}
    >
      {/* Top Bar Contract Container: 1 row, 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Brand title, one line */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0a192f] rounded-lg"
          aria-label="KEDGE Insurance Brokers - Return to homepage"
        >
          <BrandLogo />
        </button>

        {/* Zone 2: Navigation Links (single-line, clean typography, hover feedback) */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-700"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a192f] rounded ${
                  isActive
                    ? 'text-[#0a192f] font-semibold'
                    : 'text-slate-600 hover:text-[#0a192f]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c51f1f] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('/quote')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c51f1f] active:scale-[0.98]"
          >
            Request a Quote
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a192f]"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="py-2 mb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Direct Advisory Desk:</span>
            {COMPANY_CONFIG.phoneNumbers.primary && <a
              href={`tel:${COMPANY_CONFIG.phoneNumbers.primary}`}
              className="text-[#0a192f] font-semibold hover:underline"
            >
              {COMPANY_CONFIG.phoneNumbers.primary}
            </a>}
          </div>

          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-[#0a192f] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => handleNavClick('/quote')}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm"
            >
              Request a Quote
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-center">
              <button
                onClick={() => handleNavClick('/claims-assistance')}
                className="py-2 px-3 border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50"
              >
                Claims Help
              </button>
              <button
                onClick={() => handleNavClick('/renewal-enquiry')}
                className="py-2 px-3 border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50"
              >
                Policy Renewal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
