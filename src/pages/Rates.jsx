import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaClock,
  FaCalendarDays,
  FaShieldHalved,
  FaCircleCheck,
  FaCircleExclamation,
  FaCalendarCheck
} from 'react-icons/fa6';
import siteConfig from '../data/config';
import CountUp from '../components/CountUp';

export default function Rates() {
  return (
    <div className="rates-page container py-4 py-md-5">
      {/* Title */}
      <div className="text-center mb-5">
        <span
          className="badge px-3 py-2 rounded-pill mb-2"
          style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)', fontWeight: 700 }}
        >
          Tariff & Guidelines
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="display-5 fw-bold"
          style={{ color: 'var(--color-headings)' }}
        >
          Transparent Rates & Booking Rules
        </motion.h1>
        <p className="text-muted mx-auto" style={{ maxWidth: 640 }}>
          Whole villa private rental pricing with zero surprise charges. All rates include full villa access, bedrooms, amenities, and electricity backup.
        </p>
      </div>

      {/* Comparison Rate Table */}
      <div className="db-card p-3 p-md-4 mb-5">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: 'var(--teal-surface)', borderBottom: '2px solid var(--border)' }}>
              <tr>
                <th style={{ minWidth: 200, padding: '14px 16px', color: 'var(--color-headings)' }}>Villa Type</th>
                <th style={{ minWidth: 100, padding: '14px 16px', color: 'var(--color-headings)' }}>Bedrooms</th>
                <th style={{ minWidth: 110, padding: '14px 16px', color: 'var(--color-headings)' }}>Max Guests</th>
                <th style={{ minWidth: 140, padding: '14px 16px', color: 'var(--color-headings)' }}>
                  Weekday Rate <br />
                  <span className="text-muted fw-normal" style={{ fontSize: 11 }}>Sun to Thu night</span>
                </th>
                <th style={{ minWidth: 140, padding: '14px 16px', color: 'var(--color-headings)' }}>
                  Weekend Rate <br />
                  <span className="text-muted fw-normal" style={{ fontSize: 11 }}>Fri & Sat night</span>
                </th>
                <th style={{ minWidth: 120, padding: '14px 16px', color: 'var(--color-headings)' }} className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {siteConfig.villas.map((villa) => (
                <tr key={villa.id}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-headings)' }}>{villa.name}</div>
                    {villa.hasPool && (
                      <span className="badge bg-info text-dark" style={{ fontSize: 10 }}>
                        Private Pool Included
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px' }}>{villa.bedrooms} BHK</td>
                  <td style={{ padding: '16px' }}>{villa.maxGuests} Guests</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--color-headings)' }}>
                      <CountUp end={villa.weekdayRate} />
                    </div>
                    <span className="text-muted" style={{ fontSize: 11 }}>/ night</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--marigold-dark)' }}>
                      <CountUp end={villa.weekendRate} />
                    </div>
                    <span className="text-muted" style={{ fontSize: 11 }}>/ night</span>
                  </td>
                  <td style={{ padding: '16px' }} className="text-end">
                    <Link
                      to={`/book?villa=${villa.id}`}
                      className="btn btn-sm btn-marigold"
                      style={{ borderRadius: 8, padding: '6px 14px' }}
                    >
                      <span className="shimmer-text">Book</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rules, Policies & Timings Cards */}
      <div className="row g-4 mb-5">
        {/* Timings & Advance Card */}
        <div className="col-12 col-md-6">
          <div className="db-card p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'var(--teal-light)',
                  color: 'var(--teal-primary)',
                  display: 'grid',
                  placeItems: 'center'
                }}
              >
                <FaClock size={22} />
              </div>
              <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700, color: 'var(--color-headings)' }}>
                Timings & Days
              </h3>
            </div>

            <ul className="list-unstyled d-flex flex-column gap-3 mb-0" style={{ fontSize: 14 }}>
              <li className="d-flex align-items-start gap-2">
                <FaCircleCheck className="text-success mt-1 flex-shrink-0" />
                <div>
                  <strong>Check-in Time:</strong> {siteConfig.checkInTime}
                  <div className="text-muted small">Keys handed over after guest register sign-in.</div>
                </div>
              </li>
              <li className="d-flex align-items-start gap-2">
                <FaCircleCheck className="text-success mt-1 flex-shrink-0" />
                <div>
                  <strong>Check-out Time:</strong> {siteConfig.checkOutTime} (Next day noon)
                  <div className="text-muted small">Cleaning team begins maintenance at 12:00 PM for incoming guests.</div>
                </div>
              </li>
              <li className="d-flex align-items-start gap-2">
                <FaCircleCheck className="text-success mt-1 flex-shrink-0" />
                <div>
                  <strong>Weekend Classification:</strong> Friday & Saturday nights are weekend rate. Sunday night to Thursday nights are weekday rate.
                </div>
              </li>
              <li className="d-flex align-items-start gap-2">
                <FaCircleCheck className="text-success mt-1 flex-shrink-0" />
                <div>
                  <strong>Advance Payment:</strong> {siteConfig.advancePercentage}% advance via UPI blocks the date on the calendar. Remaining 50% paid at check-in.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Guest Policies & Coastal Rules */}
        <div className="col-12 col-md-6">
          <div className="db-card p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(240, 162, 31, 0.15)',
                  color: 'var(--marigold-dark)',
                  display: 'grid',
                  placeItems: 'center'
                }}
              >
                <FaShieldHalved size={22} />
              </div>
              <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700, color: 'var(--color-headings)' }}>
                House Rules & Policies
              </h3>
            </div>

            <ul className="list-unstyled d-flex flex-column gap-3 mb-0" style={{ fontSize: 14 }}>
              {siteConfig.rules.map((rule, idx) => (
                <li key={idx} className="d-flex align-items-start gap-2">
                  <FaCircleExclamation className="text-warning mt-1 flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="text-center p-4 rounded-4" style={{ background: 'var(--teal-dark)', color: '#fff' }}>
        <h3 className="fw-bold mb-2" style={{ color: '#ffffff !important' }}>Ready to Secure Your Dates?</h3>
        <p className="mx-auto mb-4" style={{ maxWidth: 500, color: '#cfe3e4' }}>
          Check our live calendar availability now. No online transaction fees.
        </p>
        <Link to="/book" className="btn-marigold pulse-cta" style={{ fontSize: 16, padding: '12px 28px' }}>
          <FaCalendarCheck />
          <span className="shimmer-text">Book Villa on ECR</span>
        </Link>
      </div>
    </div>
  );
}
