import React, { useState } from 'react';
import { INSIGHT_ARTICLES } from '../data/insightsData';
import { InsightArticle } from '../types';
import { BookOpen, Clock, Calendar, ArrowRight, X, ShieldCheck, Share2 } from 'lucide-react';

interface InsightsPageProps {
  navigate: (path: string) => void;
  selectedArticleId?: string | null;
  onClearSelectedArticle?: () => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({
  navigate,
  selectedArticleId,
  onClearSelectedArticle,
}) => {
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(() => {
    if (selectedArticleId) {
      return INSIGHT_ARTICLES.find((a) => a.id === selectedArticleId) || null;
    }
    return null;
  });

  const handleRead = (article: InsightArticle) => {
    setActiveArticle(article);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleClose = () => {
    setActiveArticle(null);
    if (onClearSelectedArticle) onClearSelectedArticle();
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Page Header */}
      <section className="bg-[#0a192f] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">
              Insurance Education & Insights
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
              Authoritative Guidance on Nigerian Insurance & Risk Regulation
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Clear, practical analysis of statutory mandates, claims protocols, marine cargo regulations, and risk planning for Nigerian corporate leaders and entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Article View */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeArticle ? (
            /* Full Article Reading View */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <button
                  onClick={handleClose}
                  className="text-xs font-semibold text-[#0a192f] hover:text-[#c51f1f] inline-flex items-center"
                >
                  ← Back to all articles
                </button>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeArticle.readTime}</span>
                  </span>
                  <span>·</span>
                  <span>{activeArticle.publishedDate}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#c51f1f] uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] font-display mt-2 leading-tight">
                  {activeArticle.title}
                </h2>
                {activeArticle.regulatoryReference && (
                  <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900">Regulatory Authorities & Statutory References:</span>
                      <p className="mt-0.5">{activeArticle.regulatoryReference}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                {activeArticle.content.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {sec.sectionHeading}
                    </h3>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Bottom Article Bar */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Published by KEDGE Insurance Brokers Ltd Technical Advisory Desk.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/quote')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#c51f1f] hover:bg-[#a81717] rounded-lg shadow-sm"
                  >
                    Discuss this cover with KEDGE
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Articles Directory List */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INSIGHT_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-[#0a192f]">{article.category}</span>
                      <span className="text-[11px]">{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-display leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {article.summary}
                    </p>

                    {article.regulatoryReference && (
                      <p className="text-[11px] text-slate-600 mt-3 pt-2 border-t border-slate-100 line-clamp-1 italic">
                        Ref: {article.regulatoryReference}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">{article.publishedDate}</span>
                    <button
                      onClick={() => handleRead(article)}
                      className="font-semibold text-[#0a192f] hover:text-[#c51f1f] transition-colors inline-flex items-center"
                    >
                      <span>Read Complete Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
