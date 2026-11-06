import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QuickContact } from './components/layout/QuickContact';
import { applyPageSeo } from './data/seo';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CategoryServicesPage, ServicesLandingPage } from './pages/CategoryServicesPage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { RiskManagementPage } from './pages/RiskManagementPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { ClaimsAssistancePage } from './pages/ClaimsAssistancePage';
import { RenewalEnquiryPage } from './pages/RenewalEnquiryPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CoverageMatrixPage } from './pages/CoverageMatrixPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [preselectedQuoteService, setPreselectedQuoteService] = useState<string | null>(() => {
    return new URLSearchParams(window.location.search).get('service');
  });

  useEffect(() => {
    applyPageSeo(currentPath);
  }, [currentPath]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      // check search params if any
      const params = new URLSearchParams(window.location.search);
      setPreselectedQuoteService(params.get('service'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Safe navigation function supporting query params
  const navigate = (toPath: string) => {
    const [pathPart, queryPart] = toPath.split('?');
    if (queryPart) {
      const params = new URLSearchParams(queryPart);
      setPreselectedQuoteService(params.get('service'));
    } else {
      setPreselectedQuoteService(null);
    }

    if (toPath !== window.location.pathname + window.location.search) {
      window.history.pushState({}, '', toPath);
    }
    setCurrentPath(pathPart);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the appropriate page
  const renderCurrentPage = () => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    switch (cleanPath) {
      case '/':
        return (
          <HomePage
            navigate={navigate}
            onSelectService={(id) => {
              setSelectedServiceId(id);
              navigate('/insurance-directory');
            }}
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              navigate('/insights');
            }}
          />
        );

      case '/about':
        return <AboutPage navigate={navigate} />;

      case '/services':
        return (
          <ServicesLandingPage navigate={navigate} />
        );

      case '/insurance-directory':
        return (
          <ServicesPage
            navigate={navigate}
            selectedServiceId={selectedServiceId}
            onClearSelectedService={() => setSelectedServiceId(null)}
          />
        );

      case '/services/motor':
      case '/services/marine-aviation':
      case '/services/property-engineering':
      case '/services/liability':
      case '/services/life-personal':
      case '/services/commercial-specialist':
        return <CategoryServicesPage navigate={navigate} slug={cleanPath.replace('/services/', '')} />;

      case '/industries':
        return <IndustriesPage navigate={navigate} />;

      case '/risk-management':
        return <RiskManagementPage navigate={navigate} />;

      case '/news-events/risk-advisory':
        return <RiskManagementPage navigate={navigate} />;

      case '/insights':
        return (
          <InsightsPage
            navigate={navigate}
            selectedArticleId={selectedArticleId}
            onClearSelectedArticle={() => setSelectedArticleId(null)}
          />
        );

      case '/contact':
        return <ContactPage navigate={navigate} />;

      case '/quote':
        return (
          <QuotePage
            navigate={navigate}
            preselectedService={preselectedQuoteService}
          />
        );

      case '/claims-assistance':
        return <ClaimsAssistancePage navigate={navigate} />;

      case '/renewal-enquiry':
        return <RenewalEnquiryPage navigate={navigate} />;

      case '/faq':
        return <FaqPage navigate={navigate} />;

      case '/privacy-policy':
        return <PrivacyPolicyPage navigate={navigate} />;

      case '/terms':
        return <TermsPage navigate={navigate} />;

      case '/coverage-matrix':
        return <CoverageMatrixPage navigate={navigate} />;

      case '/404':
        return <NotFoundPage navigate={navigate} />;

      default:
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-800 bg-slate-50 selection:bg-red-700 selection:text-white">
      {/* Global Navigation Header */}
      <Header
        currentPath={currentPath}
        navigate={navigate}
        onSelectService={(id) => {
          setSelectedServiceId(id);
          navigate('/insurance-directory');
        }}
        onSelectArticle={(id) => {
          setSelectedArticleId(id);
          navigate('/insights');
        }}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Corporate Footer */}
      <Footer navigate={navigate} />
      <QuickContact />
    </div>
  );
}
