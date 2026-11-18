import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaPhone, FaSun, FaMoon } from 'react-icons/fa6';
import siteConfig from '../data/config';

export default function MobileTopBar({ isDark, onToggleTheme, customBackAction, customTitle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const getPageTitle = () => {
    if (customTitle) return customTitle;
    const path = location.pathname;
    if (path === '/') return siteConfig.businessName;
    if (path.startsWith('/villas/')) return 'Villa Details';
    if (path === '/villas') return 'Private Villas';
    if (path === '/gallery') return 'Villa Gallery';
    if (path === '/rates') return 'Rates & Policies';
    if (path === '/book') return 'Book Your Stay';
    if (path === '/contact') return 'Contact & Location';
    return siteConfig.businessName;
  };

  const handleBack = () => {
    if (customBackAction) {
      customBackAction();
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="mobile-top-bar">
      <div className="d-flex align-items-center gap-2" style={{ minWidth: 44 }}>
        {!isHome ? (
          <button
            onClick={handleBack}
            className="btn btn-link text-white p-0 d-flex align-items-center justify-content-center"
            style={{ width: 44, height: 44, textDecoration: 'none' }}
            aria-label="Go Back"
          >
            <FaArrowLeft size={18} />
          </button>
        ) : (
          <Link to="/" className="d-flex align-items-center" aria-label="Dinesh Boy Home">
            <img
              src="/logo/logo-white.svg"
              alt="Dinesh Boy Logo"
              width="34"
              height="34"
              style={{ borderRadius: 8, display: 'block' }}
            />
          </Link>
        )}
      </div>

      <div className="text-center flex-grow-1 px-2" style={{ overflow: 'hidden' }}>
        <h1
          style={{
            fontSize: 17,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff !important',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {getPageTitle()}
        </h1>
        {isHome && (
          <div style={{ fontSize: 11, color: '#cfe3e4', lineHeight: 1, fontWeight: 500 }}>
            ECR, Chennai
          </div>
        )}
      </div>

      <div className="d-flex align-items-center gap-1" style={{ minWidth: 44, justifyContent: 'flex-end' }}>
        <button
          onClick={onToggleTheme}
          className="btn btn-link text-white p-0 d-flex align-items-center justify-content-center"
          style={{ width: 36, height: 36 }}
          aria-label="Toggle Theme"
        >
          {isDark ? <FaSun size={15} className="text-warning" /> : <FaMoon size={15} />}
        </button>

        <a
          href={`tel:+91${siteConfig.phone}`}
          className="btn btn-link text-white p-0 d-flex align-items-center justify-content-center"
          style={{
            width: 36,
            height: 36,
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '50%'
          }}
          aria-label="Call Owner"
        >
          <FaPhone size={14} style={{ color: 'var(--marigold)' }} />
        </a>
      </div>
    </div>
  );
}
