import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExpand, FaImages } from 'react-icons/fa6';
import siteConfig from '../data/config';
import ImageLightbox from '../components/ImageLightbox';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const categories = ['All', 'Pool & Outdoor', 'Bedrooms', 'Exterior', 'Living Area', 'Kitchen', 'Surroundings'];

  const filteredImages = selectedCategory === 'All'
    ? siteConfig.gallery
    : siteConfig.gallery.filter((img) => img.category === selectedCategory);

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="gallery-page container py-4 py-md-5">
      {/* Title */}
      <div className="text-center mb-4">
        <span
          className="badge px-3 py-2 rounded-pill mb-2"
          style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)', fontWeight: 700 }}
        >
          Photo Gallery
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="display-5 fw-bold"
          style={{ color: 'var(--color-headings)' }}
        >
          Life at Dinesh Boy Villas
        </motion.h1>
        <p className="text-muted mx-auto" style={{ maxWidth: 640 }}>
          Take a real photo tour through our private swimming pools, cozy bedrooms, breezy living spaces, and beachside gardens along East Coast Road.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm px-3 py-2 rounded-pill ${
              selectedCategory === cat ? 'btn-teal' : 'btn-outline-secondary'
            }`}
            style={{ fontWeight: 600, fontSize: 13 }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="row g-3 g-md-4">
        {filteredImages.map((img, idx) => (
          <motion.div
            key={img.id}
            className="col-12 col-sm-6 col-lg-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
          >
            <div
              className="db-card overflow-hidden position-relative"
              style={{ cursor: 'pointer', height: 280, background: '#082a32' }}
              onClick={() => openLightbox(idx)}
            >
              <img
                src={img.src}
                alt={img.alt || img.caption}
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
                className="gallery-grid-img"
              />

              {/* Dark Gradient Overlay for Guaranteed Contrast */}
              <div
                className="position-absolute inset-0 d-flex flex-column justify-content-end p-3"
                style={{
                  background: 'linear-gradient(to top, rgba(7, 35, 42, 0.94) 0%, rgba(7, 35, 42, 0.35) 60%, transparent 100%)',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0
                }}
              >
                <div className="d-flex justify-content-between align-items-end text-white">
                  <div>
                    <span
                      className="badge mb-1"
                      style={{ background: 'var(--marigold)', color: '#2b1c00', fontSize: 10, fontWeight: 700 }}
                    >
                      {img.category}
                    </span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#ffffff !important', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>
                      {img.caption}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(4px)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#ffffff'
                    }}
                  >
                    <FaExpand size={13} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={filteredImages}
        currentIndex={activePhotoIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActivePhotoIndex((prev) => (prev + 1) % filteredImages.length)}
        onPrev={() => setActivePhotoIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)}
      />
    </div>
  );
}
