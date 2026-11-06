import React from 'react';
import { ArrowLeft, Home, Compass, PhoneCall } from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-6">
        <BrandLogo className="justify-center" />

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-mono font-bold text-[#c51f1f] block">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0a192f] font-display">
            Page or Resource Not Found
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page you requested does not exist or may have been relocated within our corporate directory.
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          <a href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }} className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0a192f] hover:bg-slate-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </a>

          <a href="/services" onClick={(event) => { event.preventDefault(); navigate('/services'); }} className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Browse Insurance Directory</span>
          </a>

          <a href="/contact" onClick={(event) => { event.preventDefault(); navigate('/contact'); }} className="w-full py-2.5 px-4 text-xs font-semibold text-[#c51f1f] bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-2">
            <PhoneCall className="w-4 h-4" />
            <span>Contact Advisory Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
};
