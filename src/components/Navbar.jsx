import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa6';
import siteConfig from '../data/config';

export default function Navbar({ isDark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`desktop-navbar fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container d-flex align-items-center justify-content-between py-2">
        {/* Brand Logo with animated SVG */}
        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2" aria-label="Dinesh Boy Home">
          <img
            src="/logo/logo-white.svg"
            alt="Dinesh Boy Villas Logo"
            width="42"
            height="42"
            style={{ borderRadius: 10, display: 'block' }}
          />
          <div>
            <div style={{ color: '#ffffff', fontWeight: 800, fontSize: 20, lineHeight: 1.1 }}>
              {siteConfig.businessName} <span style={{ color: 'var(--marigold)' }}>Villas</span>
            </div>
            <div style={{ color: '#cfe3e4', fontSize: 11, letterSpacing: '0.06em', fontWeight: 600 }}>
              ECR, CHENNAI
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="d-flex align-items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/villas" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Villas
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Gallery
          </NavLink>
          <NavLink to="/rates" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Rates & Rules
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>

          {/* Book Now highlighted CTA button with subtle shimmer */}
          <Link to="/book" className="btn-marigold pulse-cta ms-2">
            <span className="shimmer-text">Book Now</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="btn btn-sm btn-outline-light ms-2 d-inline-flex align-items-center justify-content-center"
            style={{ width: 38, height: 38, borderRadius: 10, borderColor: 'rgba(255,255,255,0.35)' }}
            aria-label="Toggle Dark/Light Mode"
            title="Toggle theme"
          >
            {isDark ? <FaSun className="text-warning" /> : <FaMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
}
