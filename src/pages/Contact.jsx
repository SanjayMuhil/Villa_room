import React, { useState } from 'react';
import {
  FaPhone,
  FaWhatsapp,
  FaLocationDot,
  FaCopy,
  FaCheck,
  FaClock,
  FaPaperPlane,
  FaQrcode
} from 'react-icons/fa6';
import siteConfig from '../data/config';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    villaId: siteConfig.villas[0]?.id || '',
    dates: '',
    message: ''
  });

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(siteConfig.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    const villa = siteConfig.villas.find((v) => v.id === form.villaId);
    const text = `*New Website Enquiry - Dinesh Boy Villas*
Name: ${form.name}
Phone: ${form.phone}
Villa: ${villa ? villa.name : 'General Enquiry'}
Preferred Dates: ${form.dates || 'Not specified'}
Message: ${form.message || 'I would like more information about availability.'}`;

    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="contact-page container py-4 py-md-5">
      {/* Title */}
      <div className="text-center mb-5">
        <span
          className="badge px-3 py-2 rounded-pill mb-2"
          style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)', fontWeight: 700 }}
        >
          Get In Touch
        </span>
        <h1 className="display-5 fw-bold">Contact Dinesh Boy</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
          Have questions about our villas, amenities, or party guidelines? Reach out directly via call or WhatsApp.
        </p>
      </div>

      <div className="row g-4 mb-5">
        {/* Contact Info Cards */}
        <div className="col-12 col-lg-5">
          <div className="d-flex flex-column gap-3">
            {/* Phone & WhatsApp Card */}
            <div className="db-card p-4">
              <h3 className="fw-bold mb-3" style={{ fontSize: 20 }}>Direct Phone & WhatsApp</h3>
              <div className="d-flex flex-column gap-3">
                <a
                  href={`tel:+91${siteConfig.phone}`}
                  className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none"
                  style={{
                    background: 'var(--teal-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--ink)'
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--teal-primary)',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <div className="text-muted small">Direct Call</div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>+91 {siteConfig.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none"
                  style={{
                    background: 'rgba(37, 211, 102, 0.08)',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    color: 'var(--ink)'
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--whatsapp)',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <FaWhatsapp size={22} />
                  </div>
                  <div>
                    <div className="text-muted small">WhatsApp Instant Chat</div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--whatsapp-dark)' }}>
                      +91 {siteConfig.phone}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* UPI ID Card with Copy Button */}
            <div className="db-card p-4">
              <h3 className="fw-bold mb-2" style={{ fontSize: 20 }}>Official UPI Payment ID</h3>
              <p className="text-muted small mb-3">
                Pay your 50% advance to this official account to block dates.
              </p>

              <div
                className="p-3 rounded-3 d-flex align-items-center justify-content-between"
                style={{
                  background: 'var(--teal-surface)',
                  border: '1px solid var(--border)'
                }}
              >
                <div>
                  <div className="text-muted" style={{ fontSize: 11, textTransform: 'uppercase' }}>
                    UPI VPA
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--teal-dark)' }}>
                    {siteConfig.upiId}
                  </div>
                  <div className="text-muted small">Payee: {siteConfig.payeeName}</div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                  style={{ borderRadius: 8, padding: '8px 12px' }}
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-success" /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Timings */}
            <div className="db-card p-4">
              <h3 className="fw-bold mb-3" style={{ fontSize: 20 }}>Villa Address & Timings</h3>
              <div className="d-flex align-items-start gap-3 mb-3">
                <FaLocationDot size={20} style={{ color: 'var(--marigold-dark)', marginTop: 4 }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{siteConfig.address}</div>
                  <a
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="small text-decoration-none fw-semibold"
                    style={{ color: 'var(--teal-primary)' }}
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <FaClock size={20} style={{ color: 'var(--teal-primary)', marginTop: 4 }} />
                <div className="small text-muted">
                  Check-in: <strong>{siteConfig.checkInTime}</strong> | Check-out: <strong>{siteConfig.checkOutTime}</strong> next day.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: WhatsApp Enquiry Form */}
        <div className="col-12 col-lg-7">
          <div className="db-card p-4 p-md-5 h-100">
            <h3 className="fw-bold mb-1" style={{ fontSize: 22 }}>Send a Quick Enquiry</h3>
            <p className="text-muted small mb-4">
              Fill in your details below and hit submit to open a pre-filled WhatsApp conversation with Dinesh Boy.
            </p>

            <form onSubmit={handleSubmitEnquiry}>
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <label className="form-label fw-bold small">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Ramesh Kumar"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="col-12 col-sm-6">
                  <label className="form-label fw-bold small">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="col-12 col-sm-6">
                  <label className="form-label fw-bold small">Select Villa</label>
                  <select
                    className="form-select"
                    value={form.villaId}
                    onChange={(e) => setForm({ ...form, villaId: e.target.value })}
                  >
                    {siteConfig.villas.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-sm-6">
                  <label className="form-label fw-bold small">Preferred Dates (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Nov 28 - Nov 29"
                    value={form.dates}
                    onChange={(e) => setForm({ ...form, dates: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold small">Special Requests or Notes</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Tell us about the number of guests, bachelor party, family gathering, or barbecue requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn-whatsapp w-100"
                    style={{ fontSize: 16, padding: '14px' }}
                  >
                    <FaPaperPlane /> Send Enquiry on WhatsApp
                  </button>
                  <div className="text-center text-muted small mt-2">
                    We usually respond within 15 minutes!
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="db-card overflow-hidden">
        <div className="p-3 bg-light border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2" style={{ fontWeight: 700 }}>
            <FaLocationDot className="text-danger" />
            <span>ECR Coastal Location Map</span>
          </div>
          <a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="small text-decoration-none fw-semibold"
          >
            Open in Google Maps App ↗
          </a>
        </div>
        <div style={{ height: 350, width: '100%' }}>
          <iframe
            src={siteConfig.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dinesh Boy ECR Chennai Map"
          />
        </div>
      </div>
    </div>
  );
}
