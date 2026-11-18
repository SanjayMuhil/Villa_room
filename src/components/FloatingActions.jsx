import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp, FaPhone } from 'react-icons/fa6';
import siteConfig from '../data/config';

export default function FloatingActions() {
  const location = useLocation();

  // Hide on booking flow page (/book) as requested
  if (location.pathname === '/book') {
    return null;
  }

  const defaultWaMessage = encodeURIComponent(
    `Hello Dinesh Boy! I am interested in booking a private villa on ECR. Could you please share the details?`
  );

  return (
    <div className="floating-actions" aria-label="Quick Contact Actions">
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${defaultWaMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <a
        href={`tel:+91${siteConfig.phone}`}
        className="floating-btn call"
        title="Call Dinesh Boy"
        aria-label="Call Dinesh Boy"
      >
        <FaPhone />
      </a>
    </div>
  );
}
