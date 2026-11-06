import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { APPROVED_CUSTOMER_LOGOS, type CustomerLogo } from '../../data/customerLogos';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface CustomerLogoCarouselProps {
  /** Passing a list allows the reusable track to support any approved logo count. */
  logos?: CustomerLogo[];
}

export const CustomerLogoCarousel: React.FC<CustomerLogoCarouselProps> = ({ logos }) => {
  const [paused, setPaused] = useState(false);
  const [copiesPerGroup, setCopiesPerGroup] = useState(1);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstRunRef = useRef<HTMLDivElement>(null);
  const visibleLogos = logos ?? APPROVED_CUSTOMER_LOGOS;

  useIsomorphicLayoutEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    const firstRun = firstRunRef.current;
    if (!marquee || !track || !firstRun) return;

    const updateLayout = () => {
      const runWidth = firstRun.getBoundingClientRect().width;
      const viewportWidth = marquee.getBoundingClientRect().width;
      if (runWidth > 0 && viewportWidth > 0) {
        const requiredCopies = Math.max(1, Math.ceil(viewportWidth / runWidth));
        setCopiesPerGroup((current) => current === requiredCopies ? current : requiredCopies);
        const pixelsPerSecond = 36;
        track.style.setProperty('--customer-logo-duration', `${runWidth * requiredCopies / pixelsPerSecond}s`);
      }
    };

    updateLayout();
    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(marquee);
    resizeObserver.observe(firstRun);
    window.addEventListener('resize', updateLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateLayout);
    };
  }, [visibleLogos.length]);

  if (visibleLogos.length === 0) return null;

  return (
    <section aria-labelledby="customer-logos-heading" className="customer-logos-section border-y border-slate-100 bg-white py-10 sm:py-11">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 id="customer-logos-heading" className="text-xl font-bold tracking-tight text-[#0a192f] sm:text-2xl">Businesses That Trust KEDGE</h2>
            <p className="mt-1 text-sm text-slate-500">A selection of organisations we are proud to serve.</p>
          </div>
          {visibleLogos.length > 0 && <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
            className="shrink-0 rounded-md px-2.5 py-2 text-xs font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-[#0a192f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c51f1f]"
          >{paused ? 'Resume logos' : 'Pause logos'}</button>}
        </div>

        {visibleLogos.length > 0 && <div ref={marqueeRef} className="customer-logo-marquee" data-paused={paused}>
          <div ref={trackRef} className="customer-logo-track" aria-label="Customer logos moving from right to left">
            <LogoGroup
              logos={visibleLogos}
              copies={copiesPerGroup}
              firstRunRef={firstRunRef}
            />
            <LogoGroup logos={visibleLogos} copies={copiesPerGroup} ariaHidden />
          </div>
        </div>}
      </div>
    </section>
  );
};

function LogoGroup({
  logos,
  copies,
  ariaHidden = false,
  firstRunRef,
}: {
  logos: CustomerLogo[];
  copies: number;
  ariaHidden?: boolean;
  firstRunRef?: React.Ref<HTMLDivElement>;
}) {
  return <div className="customer-logo-group" aria-hidden={ariaHidden || undefined}>
    {Array.from({ length: copies }, (_, copy) => <div
      ref={copy === 0 ? firstRunRef : undefined}
      className="customer-logo-run"
      aria-hidden={ariaHidden || copy > 0 || undefined}
      key={`logo-run-${copy}`}
    >
      {logos.map((logo, index) => <div className="customer-logo-item" key={`${logo.name}-${index}`}>
        <img
          src={logo.src}
          alt={ariaHidden || copy > 0 ? '' : logo.alt}
          width={224}
          height={96}
          loading="lazy"
          decoding="async"
          onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
        />
      </div>)}
    </div>)}
  </div>;
}
