import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaLocationDot, FaClock, FaShieldHeart } from 'react-icons/fa6';
import siteConfig from '../data/config';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--teal-dark)',
        color: '#e6f4f5',
        paddingTop: '48px',
        paddingBottom: '32px',
        marginTop: '60px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Info with Logo */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/logo/logo-white.svg"
                alt="Dinesh Boy Villas Logo"
                width="42"
                height="42"
                style={{ borderRadius: 10 }}
              />
              <h4 className="m-0" style={{ fontSize: 22, color: '#ffffff !important' }}>
                {siteConfig.businessName} <span style={{ color: 'var(--marigold)' }}>Villas</span>
              </h4>
            </div>
            <p style={{ color: '#cfe3e4', fontSize: 14, lineHeight: 1.6 }}>
              {siteConfig.description}
            </p>
            <div className="d-flex align-items-center gap-2 mt-3" style={{ fontSize: 13, color: 'var(--marigold)' }}>
              <FaShieldHeart />
              <span style={{ fontWeight: 600 }}>100% Gated & Private • Direct Owner Booking</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="mb-3" style={{ fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff !important' }}>
              Explore
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: 14 }}>
              <li>
                <Link to="/" style={{ color: '#cfe3e4', textDecoration: 'none' }}>Home</Link>
              </li>
              <li>
                <Link to="/villas" style={{ color: '#cfe3e4', textDecoration: 'none' }}>All Villas</Link>
              </li>
              <li>
                <Link to="/gallery" style={{ color: '#cfe3e4', textDecoration: 'none' }}>Photo Gallery</Link>
              </li>
              <li>
                <Link to="/rates" style={{ color: '#cfe3e4', textDecoration: 'none' }}>Rates & Policies</Link>
              </li>
              <li>
                <Link to="/book" style={{ color: '#cfe3e4', textDecoration: 'none' }}>Book a Stay</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#cfe3e4', textDecoration: 'none' }}>Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Stay Timings & Pricing */}
          <div className="col-6 col-md-3">
            <h6 className="mb-3" style={{ fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff !important' }}>
              Timings & Rates
            </h6>
            <div style={{ fontSize: 14, color: '#cfe3e4' }} className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2">
                <FaClock style={{ color: 'var(--marigold)' }} />
                <span>Check-in: <strong className="text-white">{siteConfig.checkInTime}</strong></span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaClock style={{ color: 'var(--marigold)' }} />
                <span>Check-out: <strong className="text-white">{siteConfig.checkOutTime}</strong> next day</span>
              </div>
              <div className="mt-1" style={{ fontSize: 13, color: '#9bb8bb' }}>
                • Weekdays: Sun night to Thu night
                <br />
                • Weekends: Fri & Sat nights
                <br />
                • Advance: {siteConfig.advancePercentage}% via UPI
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="col-12 col-md-3">
            <h6 className="mb-3" style={{ fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff !important' }}>
              Owner Contact
            </h6>
            <div className="d-flex flex-column gap-2" style={{ fontSize: 14 }}>
              <a
                href={`tel:+91${siteConfig.phone}`}
                className="text-decoration-none d-flex align-items-center gap-2"
                style={{ color: '#ffffff' }}
              >
                <FaPhone style={{ color: 'var(--marigold)' }} />
                <span>+91 {siteConfig.phone}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none d-flex align-items-center gap-2"
                style={{ color: '#ffffff' }}
              >
                <FaWhatsapp style={{ color: 'var(--whatsapp)' }} />
                <span>WhatsApp: {siteConfig.phone}</span>
              </a>

              <div className="d-flex align-items-start gap-2 mt-1" style={{ color: '#cfe3e4' }}>
                <FaLocationDot className="mt-1 text-white" />
                <span>{siteConfig.address}</span>
              </div>

              <div className="p-2 rounded mt-2" style={{ background: 'rgba(255,255,255,0.08)', fontSize: 12 }}>
                <span style={{ color: '#9bb8bb' }}>UPI ID:</span>{' '}
                <strong className="text-white">{siteConfig.upiId}</strong>
                <br />
                <span style={{ color: '#9bb8bb' }}>Payee: {siteConfig.payeeName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Honest confirmation disclaimer banner */}
        <div
          className="p-3 rounded-3 mb-4"
          style={{ background: 'rgba(240, 162, 31, 0.12)', border: '1px solid rgba(240, 162, 31, 0.35)' }}
        >
          <div className="d-flex align-items-center gap-2 mb-1" style={{ fontWeight: 700, fontSize: 14, color: 'var(--marigold)' }}>
            <FaShieldHeart /> Important Booking Notice
          </div>
          <div style={{ fontSize: 13, color: '#e6f4f5' }}>
            All bookings are confirmed manually by Dinesh Boy upon reviewing your UPI payment screenshot sent via WhatsApp.
            We do not automate card/bank deductions to guarantee authentic, personal attention for every guest.
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25" style={{ fontSize: 13, color: '#9bb8bb' }}>
          <div>
            © {new Date().getFullYear()} {siteConfig.businessName} Villas. All rights reserved.
          </div>
          <div className="mt-2 mt-sm-0">
            East Coast Road (ECR), Chennai, Tamil Nadu
          </div>
        </div>
      </div>
    </footer>
  );
}
