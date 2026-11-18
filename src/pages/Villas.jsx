import React from 'react';
import { motion } from 'framer-motion';
import siteConfig from '../data/config';
import VillaCard from '../components/VillaCard';

export default function Villas() {
  return (
    <div className="villas-page container py-4 py-md-5">
      {/* Header Banner */}
      <div className="text-center mb-5">
        <span
          className="badge px-3 py-2 rounded-pill mb-2"
          style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)', fontWeight: 700 }}
        >
          ECR Chennai Properties
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="display-5 fw-bold"
          style={{ color: 'var(--color-headings)' }}
        >
          Explore Our Private Villas
        </motion.h1>
        <p className="text-muted mx-auto" style={{ maxWidth: 640 }}>
          Choose the ideal private villa for your family reunion, weekend getaway, or celebration. All villas are 100% private, gated, and fully furnished.
        </p>
      </div>

      {/* Villas Grid */}
      <div className="row g-4">
        {siteConfig.villas.map((villa, idx) => (
          <motion.div
            key={villa.id}
            className="col-12 col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <VillaCard villa={villa} />
          </motion.div>
        ))}
      </div>

      {/* Note on adding new villas / custom inquiries */}
      <div
        className="mt-5 p-4 rounded-4"
        style={{
          background: 'var(--sand-card)',
          border: '1px solid var(--border)'
        }}
      >
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <h4 className="fw-bold mb-1" style={{ color: 'var(--color-headings)' }}>
              Need a custom requirement or large corporate retreat?
            </h4>
            <p className="text-muted small m-0">
              We can arrange multiple villas side-by-side or customize check-in arrangements for events. Contact Dinesh Boy directly.
            </p>
          </div>
          <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hi Dinesh, I have a special group inquiry for private villas on ECR.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
