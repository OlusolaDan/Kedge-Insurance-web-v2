import { createRoot } from 'react-dom/client';
import { preload } from 'react-dom';
import App from './App.tsx';
import './index.css';
import heroImagePath from './assets/images/hero_commercial_port_1792794885795-optimized.jpg';
import heroImageMobilePath from './assets/images/hero_commercial_port_mobile.jpg';

// The prerendered root is a search-engine and first-response fallback, not an
// SSR-compatible React tree. Preload the known homepage LCP image before the
// route chunk renders, selecting the responsive variant matching viewport width.
if (window.location.pathname === '/') {
  const isMobile = window.innerWidth <= 768;
  preload(isMobile ? heroImageMobilePath : heroImagePath, { as: 'image', fetchPriority: 'high' });
}

const root = document.getElementById('root');
if (!root) throw new Error('KEDGE application root was not found.');

createRoot(root).render(<App />);
