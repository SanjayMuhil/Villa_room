import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBed,
  FaUsers,
  FaWaterLadder,
  FaSquareParking,
  FaSnowflake,
  FaUtensils,
  FaWifi,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck
} from 'react-icons/fa6';
import CountUp from './CountUp';

export default function VillaCard({ villa }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const images = villa.images && villa.images.length > 0
    ? villa.images
    : ['/images/fallback-villa.jpg'];

  const alts = villa.imageAlts && villa.imageAlts.length > 0
    ? villa.imageAlts
    : [villa.name];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="db-card h-100 d-flex flex-column">
      {/* Image Carousel Header */}
      <div className="position-relative" style={{ height: 240, overflow: 'hidden', background: '#082a32' }}>
        <img
          src={imgError ? '/images/fallback-villa.svg' : images[activeImageIndex]}
          alt={alts[activeImageIndex] || villa.name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="villa-card-img"
        />

        {/* Dark Gradient Overlay for Badges & Contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(7, 35, 42, 0.6) 0%, transparent 40%, rgba(7, 35, 42, 0.4) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Badges */}
        <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-1">
          {villa.hasPool && (
            <span
              className="badge"
              style={{
                background: '#0ea5e9',
                color: '#ffffff',
                fontSize: 12,
                padding: '6px 12px',
                borderRadius: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <FaWaterLadder /> Private Pool
            </span>
          )}
          {villa.tag && (
            <span
              className="badge"
              style={{
                background: 'rgba(7, 35, 42, 0.9)',
                color: 'var(--marigold)',
                fontSize: 11,
                padding: '5px 10px',
                borderRadius: 20
              }}
            >
              {villa.tag}
            </span>
          )}
        </div>

        {/* Carousel Arrow Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous Image"
              className="btn btn-sm position-absolute top-50 start-0 translate-middle-y ms-2 rounded-circle"
              style={{
                width: 32,
                height: 32,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                display: 'grid',
                placeItems: 'center',
                padding: 0
              }}
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next Image"
              className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle"
              style={{
                width: 32,
                height: 32,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                display: 'grid',
                placeItems: 'center',
                padding: 0
              }}
            >
              <FaChevronRight size={12} />
            </button>

            {/* Dots */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1">
              {images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === activeImageIndex ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === activeImageIndex ? 'var(--marigold)' : 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3 p-md-4 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>
            <Link
              to={`/villas/${villa.id}`}
              className="text-decoration-none"
              style={{ color: 'var(--color-headings)' }}
            >
              {villa.name}
            </Link>
          </h3>
        </div>

        <p className="text-muted small mb-3" style={{ lineHeight: 1.5 }}>
          {villa.description}
        </p>

        {/* Feature Icons Grid */}
        <div
          className="p-2 rounded-3 mb-3"
          style={{ background: 'var(--teal-light)', border: '1px solid var(--border)' }}
        >
          <div className="row g-2 text-center" style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-headings)' }}>
            <div className="col-4 d-flex align-items-center justify-content-center gap-1">
              <FaBed style={{ color: 'var(--teal-primary)' }} />
              <span>{villa.bedrooms} Bedrooms</span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center gap-1">
              <FaUsers style={{ color: 'var(--teal-primary)' }} />
              <span>Up to {villa.maxGuests}</span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center gap-1">
              <FaSnowflake style={{ color: 'var(--teal-primary)' }} />
              <span>AC Rooms</span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center gap-1">
              <FaUtensils style={{ color: 'var(--teal-primary)' }} />
              <span>Kitchen</span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center gap-1">
              <FaSquareParking style={{ color: 'var(--teal-primary)' }} />
              <span>Car Parking</span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center gap-1">
              <FaWifi style={{ color: 'var(--teal-primary)' }} />
              <span>Free Wi-Fi</span>
            </div>
          </div>
        </div>

        {/* Pricing Box with Count-up animation */}
        <div
          className="mt-auto p-3 rounded-3 mb-3"
          style={{
            background: 'rgba(240, 162, 31, 0.08)',
            border: '1px dashed var(--marigold)'
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Weekday (Sun-Thu):</span>
            <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-headings)' }}>
              <CountUp end={villa.weekdayRate} />{' '}
              <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--color-muted)' }}>/night</span>
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Weekend (Fri-Sat):</span>
            <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--marigold-dark)' }}>
              <CountUp end={villa.weekendRate} />{' '}
              <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--color-muted)' }}>/night</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <Link
            to={`/villas/${villa.id}`}
            className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
            style={{ borderRadius: 12, fontSize: 14, fontWeight: 600 }}
          >
            Details
          </Link>
          <Link
            to={`/book?villa=${villa.id}`}
            className="btn-marigold flex-grow-1"
            style={{ fontSize: 14, padding: '10px 14px' }}
          >
            <FaCalendarCheck />
            <span className="shimmer-text">Book Villa</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
