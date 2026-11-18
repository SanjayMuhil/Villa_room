import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCalendarCheck,
  FaArrowRight,
  FaClock,
  FaShieldHalved,
  FaWaterLadder,
  FaLocationDot,
  FaPhoneVolume,
  FaUtensils,
  FaBolt,
  FaImages,
  FaWhatsapp,
  FaTag
} from 'react-icons/fa6';
import siteConfig from '../data/config';
import VillaCard from '../components/VillaCard';
import CountUp from '../components/CountUp';

// Typewriter component for the tagline
function TypewriterText({ text, speed = 25 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      return;
    }

    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="typewriter-cursor" style={{ color: 'var(--marigold)', fontWeight: 300 }}>|</span>
      )}
    </span>
  );
}

export default function Home() {
  const iconMap = {
    shield: <FaShieldHalved size={26} />,
    pool: <FaWaterLadder size={26} />,
    location: <FaLocationDot size={26} />,
    phone: <FaPhoneVolume size={26} />,
    utensils: <FaUtensils size={26} />,
    bolt: <FaBolt size={26} />
  };

  // Letter by letter animation for "Dinesh Boy"
  const heroLetters = Array.from("Dinesh Boy");
  const heroVillas = Array.from("Villas");

  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    }
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 220,
        duration: 0.4
      }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="position-relative text-white overflow-hidden"
        style={{
          background: 'linear-gradient(165deg, #06262c 0%, #0b4a57 55%, #127a86 100%)',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '70px',
          paddingBottom: '110px'
        }}
      >
        {/* Dark gradient overlay to ensure WCAG AA contrast for all text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 40%, rgba(11, 74, 87, 0.4) 0%, rgba(6, 38, 44, 0.85) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Floating Sun Ornament */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [0, 8, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: '12%',
            right: '8%',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffc74f 20%, #f0a21f 70%, rgba(240, 162, 31, 0) 100%)',
            filter: 'blur(3px)',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
        />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-12 col-lg-8">
              {/* Script Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="script-font mb-2"
                style={{
                  fontSize: 'clamp(20px, 4vw, 30px)',
                  color: 'var(--marigold)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)'
                }}
              >
                Welcome to East Coast Road
              </motion.div>

              {/* Main Heading: Letter-by-Letter Staggered Rise & Fade */}
              <motion.h1
                variants={titleContainer}
                initial="hidden"
                animate="visible"
                className="d-flex flex-wrap align-items-center gap-1 mb-2"
                style={{
                  fontSize: 'clamp(38px, 6.5vw, 68px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: '#ffffff !important',
                  textShadow: '0 4px 18px rgba(0,0,0,0.5)'
                }}
              >
                <span className="d-inline-flex">
                  {heroLetters.map((char, index) => (
                    <motion.span
                      key={`l-${index}`}
                      variants={letterVariant}
                      style={{ display: 'inline-block', color: '#ffffff' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </span>
                <span className="d-inline-flex ms-2" style={{ color: 'var(--marigold)' }}>
                  {heroVillas.map((char, index) => (
                    <motion.span
                      key={`v-${index}`}
                      variants={letterVariant}
                      style={{ display: 'inline-block', color: 'var(--marigold)' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* Tagline: Typewriter Effect */}
              <div
                className="lead mt-3 mb-4"
                style={{
                  fontSize: 'clamp(16px, 2.2vw, 20px)',
                  color: '#e6f4f5',
                  maxWidth: 620,
                  fontWeight: 400,
                  minHeight: '3.2em',
                  lineHeight: 1.5
                }}
              >
                <TypewriterText text={siteConfig.tagline} speed={22} />
              </div>

              {/* Action Buttons with subtle shimmer */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="d-flex flex-wrap gap-3"
              >
                <Link
                  to="/book"
                  className="btn-marigold pulse-cta"
                  style={{ fontSize: 17, padding: '14px 28px' }}
                >
                  <FaCalendarCheck size={18} />
                  <span className="shimmer-text">Book Now</span>
                </Link>
                <Link
                  to="/villas"
                  className="btn-outline-teal"
                  style={{
                    fontSize: 17,
                    padding: '12px 26px',
                    borderColor: 'rgba(255,255,255,0.7)',
                    color: '#ffffff !important'
                  }}
                >
                  View Villas <FaArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Animated Wave SVG at bottom of hero */}
        <div
          style={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0,
            zIndex: 1
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: 60 }}
          >
            <path
              d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V120H0V95.8C59.71 118 152.47 131.8 241 113.8c27.1-5.5 54.3-13.6 80.39-24.36z"
              fill="var(--teal-surface)"
            />
          </svg>
        </div>
      </section>

      {/* Quick Facts Banner */}
      <section className="container mt-n4 position-relative" style={{ zIndex: 3, marginTop: -35 }}>
        <div
          className="db-card p-3 p-md-4"
          style={{
            background: 'var(--sand-card)',
            boxShadow: '0 12px 35px rgba(11, 74, 87, 0.12)'
          }}
        >
          <div className="row g-3 align-items-center text-center text-md-start">
            <div className="col-12 col-md-4 border-md-end border-light-subtle">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--teal-light)',
                    color: 'var(--teal-primary)',
                    display: 'grid',
                    placeItems: 'center'
                  }}
                >
                  <FaClock size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-headings)' }}>
                    Check-In & Check-Out
                  </div>
                  <div className="text-muted small">
                    {siteConfig.checkInTime} In • {siteConfig.checkOutTime} Out next day
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 border-md-end border-light-subtle">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(240, 162, 31, 0.15)',
                    color: '#945700',
                    display: 'grid',
                    placeItems: 'center'
                  }}
                >
                  <FaTag size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-headings)' }}>
                    Starting from <CountUp end={4000} />/night
                  </div>
                  <div className="text-muted small">
                    Whole Villa • Zero Platform Commission
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--teal-light)',
                    color: 'var(--teal-primary)',
                    display: 'grid',
                    placeItems: 'center'
                  }}
                >
                  <FaLocationDot size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-headings)' }}>
                    Prime ECR Belt
                  </div>
                  <div className="text-muted small">
                    East Coast Road, Chennai (Near Beach)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Villas Section */}
      <section className="container py-5 my-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <div className="text-uppercase small fw-bold" style={{ color: 'var(--teal-primary)', letterSpacing: '0.08em' }}>
              Handpicked Accommodations
            </div>
            {/* Section heading: slide up & fade in on scroll */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="display-6 fw-bold mt-1"
            >
              Our Private Villas
            </motion.h2>
            <p className="text-muted m-0">Entire villa to yourself • Completely private & gated</p>
          </div>
          <Link to="/villas" className="btn-outline-teal mt-3 mt-md-0 align-self-start align-self-md-auto">
            View All Villas <FaArrowRight size={14} />
          </Link>
        </div>

        <div className="row g-4">
          {siteConfig.villas.map((villa) => (
            <motion.div
              key={villa.id}
              className="col-12 col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <VillaCard villa={villa} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Dinesh Boy Section */}
      <section
        className="py-5"
        style={{
          background: 'var(--sand-card)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="container py-3">
          <div className="text-center mb-5">
            <div className="text-uppercase small fw-bold" style={{ color: 'var(--teal-primary)', letterSpacing: '0.08em' }}>
              Why Book With Us
            </div>
            {/* Section heading: slide up & fade in on scroll */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="display-6 fw-bold mt-1"
            >
              Peaceful Beach Getaways Without Hassle
            </motion.h2>
            <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
              Enjoy maximum freedom and comfort with friends and family along Chennai’s scenic coastline.
            </p>
          </div>

          <div className="row g-4">
            {siteConfig.whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                className="col-12 col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div
                  className="p-4 rounded-4 h-100"
                  style={{
                    background: 'var(--teal-surface)',
                    border: '1px solid var(--border)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, var(--teal-primary), var(--teal-dark))',
                      color: 'var(--marigold)',
                      display: 'grid',
                      placeItems: 'center',
                      marginBottom: 16
                    }}
                  >
                    {iconMap[item.icon] || <FaShieldHalved size={24} />}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--color-headings)' }}>
                    {item.title}
                  </h3>
                  <p className="text-muted small m-0" style={{ lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="container py-5 my-2">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <div className="text-uppercase small fw-bold" style={{ color: 'var(--teal-primary)', letterSpacing: '0.08em' }}>
              Visual Tour
            </div>
            {/* Section heading: slide up & fade in on scroll */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="display-6 fw-bold mt-1"
            >
              Moments at Dinesh Boy
            </motion.h2>
            <p className="text-muted m-0">Real photos of our pool, lawns, bedrooms, and beachside vibe.</p>
          </div>
          <Link to="/gallery" className="btn-outline-teal mt-3 mt-md-0 align-self-start align-self-md-auto">
            <FaImages /> Open Full Gallery
          </Link>
        </div>

        <div className="row g-3">
          {siteConfig.gallery.slice(0, 6).map((item, idx) => (
            <div key={item.id} className="col-6 col-md-4">
              <Link to="/gallery" className="text-decoration-none">
                <div
                  className="rounded-3 overflow-hidden position-relative"
                  style={{
                    height: idx % 3 === 0 ? 240 : 180,
                    background: '#07252c'
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt || item.caption}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/fallback-villa.svg';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    className="gallery-preview-img"
                  />
                  {/* Dark gradient overlay for text readability */}
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                    style={{
                      background: 'linear-gradient(to top, rgba(7,35,42,0.92) 0%, rgba(7,35,42,0.4) 70%, transparent 100%)',
                      fontSize: 12,
                      fontWeight: 600
                    }}
                  >
                    {item.caption}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="container py-5">
        <div
          className="rounded-4 p-4 p-md-5 text-white text-center position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0b4a57 0%, #072b33 100%)',
            boxShadow: '0 16px 40px rgba(11, 74, 87, 0.25)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="position-relative" style={{ zIndex: 2 }}>
            <span
              className="badge px-3 py-2 rounded-pill mb-3"
              style={{ background: 'var(--marigold)', color: '#2b1c00', fontWeight: 700 }}
            >
              Direct Owner Reservation
            </span>
            {/* Section heading: slide up & fade in on scroll */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="display-5 fw-bold mb-3"
              style={{ color: '#ffffff !important' }}
            >
              Planning a Weekend Break on ECR?
            </motion.h2>
            <p className="mx-auto lead mb-4" style={{ maxWidth: 640, color: '#e6f4f5' }}>
              Check live calendar availability, review itemized weekday/weekend rates, and send your booking request directly to Dinesh Boy on WhatsApp.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/book" className="btn-marigold pulse-cta" style={{ fontSize: 17, padding: '14px 30px' }}>
                <FaCalendarCheck />
                <span className="shimmer-text">Book Now</span>
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hi Dinesh, I would like to enquire about villa availability on ECR.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ fontSize: 17, padding: '14px 28px' }}
              >
                <FaWhatsapp size={20} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
