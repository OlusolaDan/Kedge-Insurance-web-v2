import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_CONFIG } from '../../data/companyConfig';

export const QuickContact: React.FC = () => {
  const number = COMPANY_CONFIG.whatsappBusinessNumber.replace(/\D/g, '');
  if (number.length < 8 || number.length > 15) return null;

  const message = encodeURIComponent('Hello KEDGE, I would like to make an insurance enquiry.');
  return <a href={`https://wa.me/${number}?text=${message}`} target="_blank" rel="noopener noreferrer" aria-label="Start a WhatsApp enquiry with KEDGE" className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-[#0a192f] shadow-lg transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a192f] sm:bottom-7 sm:right-7"><MessageCircle className="h-5 w-5 text-emerald-700" aria-hidden="true"/><span>WhatsApp</span></a>;
};
