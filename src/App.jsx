import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import MobileTopBar from './components/MobileTopBar';
import MobileTabBar from './components/MobileTabBar';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';

// Code-split routes for optimal performance and fast initial load
const Home = lazy(() => import('./pages/Home'));
const Villas = lazy(() => import('./pages/Villas'));
const VillaDetail = lazy(() => import('./pages/VillaDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Rates = lazy(() => import('./pages/Rates'));
const Booking = lazy(() => import('./pages/Booking'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading spinner fallback
function RouteLoading() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '60vh' }}
    >
      <div
        className="spinner-border text-info"
        role="status"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Loading page...</span>
      </div>
      <div className="text-muted small mt-3">Loading Dinesh Boy Villas...</div>
    </div>
  );
}

// Scroll to top automatically when route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  // Dark / Light Theme state
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('db-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.setAttribute('data-bs-theme', next ? 'dark' : 'light');
      try {
        localStorage.setItem('db-theme', next ? 'dark' : 'light');
      } catch (e) {}
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Support for custom back button action in MobileTopBar (e.g. for booking wizard steps)
  const [customBackAction, setCustomBackAction] = useState(null);
  const [customTitle, setCustomTitle] = useState(null);

  // Clear custom actions when changing top-level route
  useEffect(() => {
    if (location.pathname !== '/book') {
      setCustomBackAction(null);
      setCustomTitle(null);
    }
  }, [location.pathname]);

  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      <ScrollToTop />

      {/* Desktop Header */}
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Mobile Top Bar */}
      <MobileTopBar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        customBackAction={customBackAction}
        customTitle={customTitle}
      />

      {/* Main Content Area with Page Slide Transitions */}
      <main className="app-content flex-grow-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <Suspense fallback={<RouteLoading />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/villas" element={<Villas />} />
                <Route path="/villas/:id" element={<VillaDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/rates" element={<Rates />} />
                <Route
                  path="/book"
                  element={
                    <Booking
                      setCustomBackAction={setCustomBackAction}
                      setCustomTitle={setCustomTitle}
                    />
                  }
                />
                <Route path="/contact" element={<Contact />} />
                {/* Fallback */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Action Buttons (Hidden on /book) */}
      <FloatingActions />

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar />

      {/* Footer */}
      <Footer />
    </div>
  );
}
