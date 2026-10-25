import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  showSlogan?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  showSlogan = false,
  className = '',
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-slate-900';
  const subtextColor = isLight ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SVG Kedge Geometric Mark */}
      <div className="relative w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-[#0a192f] p-1.5 shadow-sm border border-slate-700/30">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Geometric K mark */}
          <path
            d="M12 7V29M12 18L25 8M12 18L25 28"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* KEDGE red accent */}
          <path d="M18 13L25 8" stroke="#c51f1f" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`text-lg font-bold tracking-tight uppercase font-display leading-none ${textColor}`}>
          KEDGE <span className="text-[#c51f1f]">INSURANCE</span>
        </span>
        <span className={`text-[10px] tracking-wider uppercase font-medium mt-0.5 ${subtextColor}`}>
          Brokers Ltd
        </span>
        {showSlogan && (
          <span className="text-[11px] italic text-slate-400 mt-1">
            “With You From Now, Into The Future”
          </span>
        )}
      </div>
    </div>
  );
};
