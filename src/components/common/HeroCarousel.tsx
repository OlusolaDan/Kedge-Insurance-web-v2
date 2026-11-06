import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface HeroSlide {
  image: string;
  mobileImage?: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  onNavigate: (path: string) => void;
}

const AUTOPLAY_MS = 7000;

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number, nextDirection: 'next' | 'previous') => {
    if (isTransitioning || slides.length < 2) return;
    setHasTransitioned(true);
    setDirection(nextDirection);
    setIsTransitioning(true);
    setActiveIndex((index + slides.length) % slides.length);
    window.setTimeout(() => setIsTransitioning(false), 850);
  }, [isTransitioning, slides.length]);

  const next = useCallback(() => goTo(activeIndex + 1, 'next'), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1, 'previous'), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || isTransitioning || slides.length < 2) return undefined;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, isTransitioning, next, slides.length]);

  const slide = slides[activeIndex];
  const slideAnimationClass = hasTransitioned ? `hero-slide hero-slide-${direction}` : 'hero-slide-initial';
  const copyAnimationClass = hasTransitioned ? 'hero-copy hero-copy-animated' : 'hero-copy';

  return (
    <section
      className="hero-carousel relative min-h-[580px] overflow-hidden bg-[#0a192f] text-white lg:min-h-[660px]"
      aria-roledescription="carousel"
      aria-label="KEDGE insurance solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0]?.clientX - touchStartX.current;
        if (Math.abs(delta) > 45) delta < 0 ? next() : previous();
        touchStartX.current = null;
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      }}
      tabIndex={0}
    >
      <div className={`${slideAnimationClass} absolute inset-0`} key={slide.image}>
        <picture>
          {slide.mobileImage && (
            <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
          )}
          <img
            src={slide.image}
            alt={slide.imageAlt}
            width={1376}
            height={768}
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority={activeIndex === 0 ? 'high' : undefined}
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            sizes="100vw"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061326_0%,rgba(10,25,47,.94)_37%,rgba(10,25,47,.58)_72%,rgba(10,25,47,.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,13,26,.72),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[580px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:min-h-[660px] lg:px-8 lg:py-24">
        <div className="max-w-3xl" aria-live="polite">
          <div className={`${copyAnimationClass} hero-copy-eyebrow mb-5 inline-flex items-center gap-2 rounded border border-slate-700/60 bg-slate-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-200`}>
            <span>{slide.eyebrow}</span><span className="text-red-400">|</span><span>RISK ADVISORY</span>
          </div>
          <p className={`${copyAnimationClass} mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-300`}>{slide.accent}</p>
          <h1 className={`${copyAnimationClass} hero-copy-title text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-6xl font-display`}>{slide.title}</h1>
          <p className={`${copyAnimationClass} hero-copy-body mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg`}>{slide.body}</p>
          <div className={`${copyAnimationClass} hero-copy-actions mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center`}>
            <button onClick={() => onNavigate('/quote')} className="inline-flex items-center justify-center rounded-lg bg-[#c51f1f] px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#a81717] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c51f1f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a192f] active:scale-[.98]">
              Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button onClick={() => onNavigate('/services')} className="inline-flex items-center justify-center rounded-lg border border-slate-600/80 bg-slate-800/70 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-700/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Explore Our Services</button>
          </div>
          <div className="hero-copy hero-copy-trust mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-700/70 pt-6 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Independent guidance</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Risk-led advice</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Nigerian market context</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-4 z-20 flex items-center gap-3 sm:right-8 lg:right-12">
        <button type="button" onClick={previous} aria-label="Previous hero slide" className="hero-control rounded-full border border-white/30 bg-[#0a192f]/70 p-2.5 text-white hover:bg-[#0a192f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"><ArrowLeft className="h-5 w-5" /></button>
        <div className="flex gap-2" role="tablist" aria-label="Hero slides">
          {slides.map((item, index) => <button key={item.image} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`Show slide ${index + 1}`} onClick={() => goTo(index, index > activeIndex ? 'next' : 'previous')} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-10 bg-red-400' : 'w-2 bg-white/50 hover:bg-white'}`} />)}
        </div>
        <button type="button" onClick={next} aria-label="Next hero slide" className="hero-control rounded-full border border-white/30 bg-[#0a192f]/70 p-2.5 text-white hover:bg-[#0a192f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"><ArrowRight className="h-5 w-5" /></button>
      </div>
      <span className="sr-only">Slide {activeIndex + 1} of {slides.length}</span>
    </section>
  );
};
