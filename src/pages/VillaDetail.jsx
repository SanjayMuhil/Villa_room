import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaBed,
  FaUsers,
  FaWaterLadder,
  FaSquareParking,
  FaSnowflake,
  FaUtensils,
  FaWifi,
  FaCheck,
  FaCalendarCheck,
  FaClock,
  FaArrowLeft,
  FaExpand
} from 'react-icons/fa6';
import siteConfig from '../data/config';
import ImageLightbox from '../components/ImageLightbox';
import CountUp from '../components/CountUp';

export default function VillaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const villa = siteConfig.villas.find((v) => v.id === id);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!villa) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold">Villa Not Found</h2>
        <p className="text-muted">The requested villa could not be located.</p>
        <Link to="/villas" className="btn-teal">
          Browse All Villas
        </Link>
      </div>
    );
  }

  const images = villa.images && villa.images.length > 0
    ? villa.images
    : ['/images/fallback-villa.jpg'];

  const alts = villa.imageAlts && villa.imageAlts.length > 0
    ? villa.imageAlts
    : [villa.name];

  return (
    <div className="villa-detail-page container py-4 py-md-5">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-outline-secondary mb-3 d-inline-flex align-items-center gap-2"
        style={{ borderRadius: 10 }}
      >
        <FaArrowLeft size={13} /> Back
      </button>

      {/* Title & Badges */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span
              className="badge px-3 py-1 rounded-pill"
              style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)', fontWeight: 700 }}
            >
              {villa.bedrooms} BHK
            </span>
            {villa.hasPool && (
              <span
                className="badge px-3 py-1 rounded-pill"
                style={{ background: '#0ea5e9', color: '#fff', fontWeight: 700 }}
              >
                <FaWaterLadder /> Private Swimming Pool
              </span>
            )}
            {villa.tag && (
              <span
                className="badge px-3 py-1 rounded-pill"
                style={{ background: 'rgba(240, 162, 31, 0.15)', color: 'var(--marigold-dark)', fontWeight: 700 }}
              >
                {villa.tag}
              </span>
            )}
          </div>
          <h1 className="display-6 fw-bold m-0" style={{ color: 'var(--color-headings)' }}>{villa.name}</h1>
          <div className="text-muted small mt-1">
            East Coast Road (ECR), Chennai • 100% Private Entire Villa
          </div>
        </div>

        <div className="mt-3 mt-md-0 d-flex gap-2">
          <Link
            to={`/book?villa=${villa.id}`}
            className="btn-marigold pulse-cta"
            style={{ fontSize: 16, padding: '12px 24px' }}
          >
            <FaCalendarCheck />
            <span className="shimmer-text">Book This Villa</span>
          </Link>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="row g-3 mb-4">
        {/* Main Photo */}
        <div className="col-12 col-lg-8">
          <div
            className="rounded-4 overflow-hidden position-relative"
            style={{ height: 'clamp(280px, 45vw, 450px)', background: '#082a32', cursor: 'pointer' }}
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={images[activePhotoIndex]}
              alt={alts[activePhotoIndex] || villa.name}
              onError={(e) => {
                e.target.src = '/images/fallback-villa.svg';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Dark gradient overlay on photo */}
            <div className="photo-dark-overlay" />

            <button
              className="btn btn-sm position-absolute bottom-0 end-0 m-3 text-white d-flex align-items-center gap-2 rounded-pill px-3 py-2"
              style={{ background: 'rgba(7,35,42,0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
            >
              <FaExpand size={13} /> Fullscreen ({images.length} Photos)
            </button>
          </div>
        </div>

        {/* Thumbnail Stack */}
        <div className="col-12 col-lg-4">
          <div className="row g-2 h-100">
            {images.map((img, idx) => (
              <div key={idx} className="col-4 col-lg-6">
                <div
                  className={`rounded-3 overflow-hidden h-100 position-relative ${
                    activePhotoIndex === idx ? 'border border-3 border-warning' : ''
                  }`}
                  style={{
                    height: 100,
                    cursor: 'pointer',
                    background: '#082a32'
                  }}
                  onClick={() => setActivePhotoIndex(idx)}
                >
                  <img
                    src={img}
                    alt={alts[idx] || `${villa.name} photo ${idx + 1}`}
                    onError={(e) => {
                      e.target.src = '/images/fallback-villa.svg';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Details and Rates */}
      <div className="row g-4">
        {/* Left Column: Description & Features */}
        <div className="col-12 col-lg-8">
          <div className="db-card p-4 mb-4">
            <h3 className="fw-bold mb-3" style={{ fontSize: 22, color: 'var(--color-headings)' }}>About this Villa</h3>
            <p className="text-muted" style={{ lineHeight: 1.7, fontSize: 16 }}>
              {villa.description}
            </p>

            <hr className="my-4 border-light-subtle" />

            <h4 className="fw-bold mb-3" style={{ fontSize: 18, color: 'var(--color-headings)' }}>Key Amenities & Specifications</h4>
            <div className="row g-3">
              <div className="col-6 col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <FaBed size={18} style={{ color: 'var(--teal-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-headings)' }}>Bedrooms</div>
                    <div className="text-muted small">{villa.bedrooms} AC Bedrooms</div>
                  </div>
                </div>
              </div>

              <div className="col-6 col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <FaUsers size={18} style={{ color: 'var(--teal-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-headings)' }}>Capacity</div>
                    <div className="text-muted small">Max {villa.maxGuests} Guests</div>
                  </div>
                </div>
              </div>

              <div className="col-6 col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <FaWaterLadder size={18} style={{ color: 'var(--teal-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-headings)' }}>Swimming Pool</div>
                    <div className="text-muted small">{villa.hasPool ? 'Private Pool' : 'No Pool'}</div>
                  </div>
                </div>
              </div>

              <div className="col-6 col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <FaSquareParking size={18} style={{ color: 'var(--teal-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-headings)' }}>Parking</div>
                    <div className="text-muted small">Private Gated Parking</div>
                  </div>
                </div>
              </div>

              <div className="col-6 col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <FaUtensils size={18} style={{ color: 'var(--teal-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-headings)' }}>Kitchen</div>
                    <div className="text-muted small">Equipped / Cooking Allowed</div>
                  </div>
                </div>
              </div>

              <div className="col-6 col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <FaWifi size={18} style={{ color: 'var(--teal-primary)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-headings)' }}>Internet</div>
                    <div className="text-muted small">Free High-Speed Wi-Fi</div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4 border-light-subtle" />

            <h4 className="fw-bold mb-3" style={{ fontSize: 18, color: 'var(--color-headings)' }}>Complete Feature List</h4>
            <div className="row g-2">
              {villa.features.map((feature, i) => (
                <div key={i} className="col-12 col-sm-6 d-flex align-items-center gap-2">
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'rgba(37, 211, 102, 0.15)',
                      color: 'var(--whatsapp-dark)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0
                    }}
                  >
                    <FaCheck size={11} />
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--color-body)' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Booking Card */}
        <div className="col-12 col-lg-4">
          <div
            className="db-card p-4 sticky-top"
            style={{ top: '85px', zIndex: 10 }}
          >
            <h3 className="fw-bold mb-3" style={{ fontSize: 20, color: 'var(--color-headings)' }}>Tariff & Booking</h3>

            {/* Rate Table with CountUp */}
            <div
              className="p-3 rounded-3 mb-3"
              style={{ background: 'var(--teal-surface)', border: '1px solid var(--border)' }}
            >
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle">
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--color-headings)' }}>Weekday Rate</div>
                  <div className="text-muted small">Sunday to Thursday nights</div>
                </div>
                <div className="text-end">
                  <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--color-headings)' }}>
                    <CountUp end={villa.weekdayRate} />
                  </div>
                  <div className="text-muted small">/ night</div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center py-2">
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--color-headings)' }}>Weekend Rate</div>
                  <div className="text-muted small">Friday & Saturday nights</div>
                </div>
                <div className="text-end">
                  <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--marigold-dark)' }}>
                    <CountUp end={villa.weekendRate} />
                  </div>
                  <div className="text-muted small">/ night</div>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="mb-3 small d-flex flex-column gap-2 text-muted">
              <div className="d-flex align-items-center gap-2">
                <FaClock style={{ color: 'var(--teal-primary)' }} />
                <span>Check-in: <strong className="text-dark">{siteConfig.checkInTime}</strong></span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaClock style={{ color: 'var(--teal-primary)' }} />
                <span>Check-out: <strong className="text-dark">{siteConfig.checkOutTime}</strong> next day</span>
              </div>
              <div>• Advance: {siteConfig.advancePercentage}% via UPI (balances at check-in)</div>
            </div>

            {/* Book Now Button with subtle shimmer */}
            <Link
              to={`/book?villa=${villa.id}`}
              className="btn-marigold w-100 pulse-cta"
              style={{ fontSize: 16, padding: '12px' }}
            >
              <FaCalendarCheck />
              <span className="shimmer-text">Reserve This Villa</span>
            </Link>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi Dinesh, I would like to inquire about ${villa.name} on ECR.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-100 mt-2"
              style={{ fontSize: 14, padding: '10px' }}
            >
              Ask Questions on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={activePhotoIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActivePhotoIndex((prev) => (prev + 1) % images.length)}
        onPrev={() => setActivePhotoIndex((prev) => (prev - 1 + images.length) % images.length)}
      />
    </div>
  );
}
