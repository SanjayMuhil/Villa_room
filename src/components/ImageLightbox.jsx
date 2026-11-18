import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export default function ImageLightbox({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onNext,
  onPrev
}) {
  // Handle keyboard events (Escape, Left, Right)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex] || {};
  const currentSrc = typeof currentItem === 'string' ? currentItem : currentItem.src;
  const currentCaption = typeof currentItem === 'object' ? currentItem.caption : '';

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-link text-white position-absolute top-0 end-0 m-3 p-2"
          style={{ zIndex: 2010 }}
          aria-label="Close Lightbox"
        >
          <FaXmark size={28} />
        </button>

        {/* Counter */}
        <div
          className="position-absolute top-0 start-0 m-3 text-white px-3 py-1 rounded-pill"
          style={{ background: 'rgba(0,0,0,0.5)', fontSize: 14, zIndex: 2010 }}
        >
          {currentIndex + 1} / {images.length}
        </div>

        {/* Prev Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="btn btn-link text-white position-absolute start-0 top-50 translate-middle-y ms-2 p-2"
            style={{ zIndex: 2010 }}
            aria-label="Previous Photo"
          >
            <FaChevronLeft size={32} />
          </button>
        )}

        {/* Main Image Container */}
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={currentSrc}
            src={currentSrc}
            alt={currentCaption || 'Villa Image'}
            className="lightbox-img"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />

          {currentCaption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-center mt-3 px-3 py-1 rounded"
              style={{ background: 'rgba(0,0,0,0.6)', maxWidth: '80vw', fontSize: 15 }}
            >
              {currentCaption}
            </motion.div>
          )}
        </div>

        {/* Next Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="btn btn-link text-white position-absolute end-0 top-50 translate-middle-y me-2 p-2"
            style={{ zIndex: 2010 }}
            aria-label="Next Photo"
          >
            <FaChevronRight size={32} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
