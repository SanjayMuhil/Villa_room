import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import {
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
  FaBed,
  FaUsers,
  FaWaterLadder,
  FaClock,
  FaCalendarDays,
  FaTriangleExclamation,
  FaCircleCheck,
  FaQrcode,
  FaCopy,
  FaWhatsapp,
  FaShieldHalved,
  FaMoneyBillWave,
  FaUserCheck,
  FaRotateRight
} from 'react-icons/fa6';
import siteConfig from '../data/config';
import CustomCalendar from '../components/CustomCalendar';
import {
  formatDate,
  formatTime12h,
  calculateTotal,
  validateBookingStay,
  generateBookingId,
  getConflictingDates,
  nightsBetween
} from '../utils/date';

const STORAGE_KEY = 'db_last_booking_state';

export default function Booking({ setCustomBackAction, setCustomTitle }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load saved state or set defaults
  const [step, setStep] = useState(1);
  const [selectedVillaId, setSelectedVillaId] = useState(() => {
    const queryVilla = searchParams.get('villa');
    if (queryVilla && siteConfig.villas.some((v) => v.id === queryVilla)) {
      return queryVilla;
    }
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.selectedVillaId) return saved.selectedVillaId;
    } catch (e) {}
    return siteConfig.villas[0]?.id || '';
  });

  const [dates, setDates] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.dates) return saved.dates;
    } catch (e) {}
    return {
      checkIn: '',
      checkOut: '',
      checkInTime: siteConfig.checkInTime,
      checkOutTime: siteConfig.checkOutTime
    };
  });

  const [guest, setGuest] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.guest) return saved.guest;
    } catch (e) {}
    return {
      name: '',
      phone: '',
      guestCount: 2,
      notes: ''
    };
  });

  const [bookingId, setBookingId] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.bookingId) return saved.bookingId;
    } catch (e) {}
    return generateBookingId();
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Selected Villa object
  const selectedVilla = siteConfig.villas.find((v) => v.id === selectedVillaId) || siteConfig.villas[0];

  // Price calculations
  const priceBreakdown = calculateTotal(
    selectedVilla,
    dates.checkIn,
    dates.checkOut,
    siteConfig.advancePercentage
  );

  // Conflicting dates check
  const conflictingDates = getConflictingDates(
    dates.checkIn,
    dates.checkOut,
    selectedVilla?.bookedDates
  );

  // Save progress in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step,
          selectedVillaId,
          dates,
          guest,
          bookingId
        })
      );
    } catch (e) {}
  }, [step, selectedVillaId, dates, guest, bookingId]);

  // Handle mobile top bar back arrow hook
  useEffect(() => {
    if (setCustomBackAction) {
      if (step > 1 && step < 5) {
        setCustomBackAction(() => () => setStep((prev) => prev - 1));
      } else {
        setCustomBackAction(null);
      }
    }
    if (setCustomTitle) {
      setCustomTitle(`Book Stay (Step ${step}/5)`);
    }
    return () => {
      if (setCustomBackAction) setCustomBackAction(null);
      if (setCustomTitle) setCustomTitle(null);
    };
  }, [step, setCustomBackAction, setCustomTitle]);

  // Generate UPI QR Code for Step 4
  useEffect(() => {
    if (step >= 4 && priceBreakdown.advance > 0) {
      const upiUrl = `upi://pay?pa=${siteConfig.upiId}&pn=${encodeURIComponent(
        siteConfig.payeeName
      )}&am=${priceBreakdown.advance}&cu=INR&tn=${bookingId}`;

      QRCode.toDataURL(upiUrl, { width: 220, margin: 2 })
        .then((url) => setQrDataUrl(url))
        .catch(() => {});
    }
  }, [step, priceBreakdown.advance, bookingId]);

  // Trigger Confetti on Step 5
  useEffect(() => {
    if (step === 5) {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [step]);

  // Form validation for each step
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleNext = () => {
    const errors = {};

    if (step === 1) {
      if (!selectedVillaId) {
        errors.villa = 'Please select a villa.';
      }
    } else if (step === 2) {
      const stayValidation = validateBookingStay(selectedVilla, dates.checkIn, dates.checkOut);
      if (!stayValidation.valid) {
        errors.stay = stayValidation.error;
      }
    } else if (step === 3) {
      if (!guest.name.trim()) {
        errors.name = 'Full name is required.';
      }
      // Indian 10-digit phone validation
      const phoneDigits = guest.phone.replace(/\D/g, '');
      if (!phoneDigits) {
        errors.phone = 'Phone number is required.';
      } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
        errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
      }

      if (!guest.guestCount || guest.guestCount < 1) {
        errors.guests = 'Please enter at least 1 guest.';
      } else if (guest.guestCount > selectedVilla.maxGuests) {
        errors.guests = `Maximum capacity for this villa is ${selectedVilla.maxGuests} guests.`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      triggerShake();
      return;
    }

    setValidationErrors({});
    if (step < 5) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setValidationErrors({});
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // UPI deep link URL
  const generateUpiUrl = (appScheme = 'upi') => {
    const amount = priceBreakdown.advance;
    const base = `${appScheme}://pay?pa=${siteConfig.upiId}&pn=${encodeURIComponent(
      siteConfig.payeeName
    )}&am=${amount}&cu=INR&tn=${bookingId}`;
    return base;
  };

  // WhatsApp Message Composer
  const getWhatsAppMessage = () => {
    const inDate = formatDate(dates.checkIn, 'ddd, DD MMM YYYY');
    const outDate = formatDate(dates.checkOut, 'ddd, DD MMM YYYY');
    const inTime = formatTime12h(dates.checkInTime);
    const outTime = formatTime12h(dates.checkOutTime);

    return `*BOOKING RESERVATION REQUEST*
----------------------------------------
*Booking ID:* ${bookingId}
*Villa:* ${selectedVilla.name}
*Guest Name:* ${guest.name}
*Phone:* ${guest.phone}
*Guests:* ${guest.guestCount}
*Check-in:* ${inDate} at ${inTime}
*Check-out:* ${outDate} at ${outTime}
*Nights:* ${priceBreakdown.nights} (${priceBreakdown.weekdayNights} Weekday, ${priceBreakdown.weekendNights} Weekend)
*Total Amount:* ₹${priceBreakdown.total.toLocaleString('en-IN')}
*Advance (50%):* ₹${priceBreakdown.advance.toLocaleString('en-IN')}
*Balance at Check-in:* ₹${priceBreakdown.balance.toLocaleString('en-IN')}
*UPI ID Used:* ${siteConfig.upiId}
${guest.notes ? `*Special Notes:* ${guest.notes}\n` : ''}----------------------------------------
Please share the room details. I am attaching my payment screenshot.`;
  };

  const handleOpenWhatsApp = () => {
    const msg = getWhatsAppMessage();
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handlePaidAndSendWhatsApp = () => {
    handleOpenWhatsApp();
    setStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(siteConfig.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const stepTitles = [
    'Choose Villa',
    'Dates & Timing',
    'Guest Details',
    'Review & Pay',
    'WhatsApp Confirmation'
  ];

  return (
    <div className="booking-page container py-4 py-md-5">
      {/* Stepper Progress Bar */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2 px-1">
          <span className="fw-bold small text-muted">
            STEP {step} OF 5: <span style={{ color: 'var(--teal-primary)' }}>{stepTitles[step - 1]}</span>
          </span>
          <span className="badge bg-light text-dark border">
            {Math.round((step / 5) * 100)}% Complete
          </span>
        </div>

        {/* Progress bar line */}
        <div
          className="progress"
          style={{ height: 8, borderRadius: 10, background: 'var(--border)' }}
        >
          <motion.div
            className="progress-bar"
            style={{ background: 'linear-gradient(90deg, var(--teal-primary), var(--marigold))' }}
            initial={{ width: `${((step - 1) / 5) * 100}%` }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step indicator bubbles for desktop */}
        <div className="d-none d-md-flex justify-content-between mt-3 px-2">
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <div
                key={idx}
                className="d-flex align-items-center gap-2"
                style={{
                  color: isCurrent ? 'var(--teal-primary)' : isCompleted ? 'var(--ink)' : 'var(--muted)',
                  fontWeight: isCurrent ? 700 : 500,
                  fontSize: 13
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: isCompleted
                      ? 'var(--whatsapp-dark)'
                      : isCurrent
                      ? 'var(--marigold)'
                      : 'var(--border)',
                    color: isCompleted || isCurrent ? '#fff' : 'var(--muted)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 12,
                    fontWeight: 700
                  }}
                >
                  {isCompleted ? <FaCheck size={11} /> : stepNum}
                </div>
                <span>{title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Step Body */}
      <div className={`booking-step-container ${shake ? 'animate-shake' : ''}`}>
        <AnimatePresence mode="wait">
          {/* STEP 1: CHOOSE VILLA */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h2 className="fw-bold mb-1">1. Select Your Villa</h2>
                <p className="text-muted small">
                  Tap to choose the villa that best suits your group size.
                </p>
                {validationErrors.villa && (
                  <div className="alert alert-danger py-2">{validationErrors.villa}</div>
                )}
              </div>

              <div className="row g-3">
                {siteConfig.villas.map((villa) => {
                  const isSelected = selectedVillaId === villa.id;
                  return (
                    <div key={villa.id} className="col-12 col-md-4">
                      <div
                        onClick={() => setSelectedVillaId(villa.id)}
                        className={`db-card h-100 p-3 position-relative ${
                          isSelected ? 'border-2' : ''
                        }`}
                        style={{
                          cursor: 'pointer',
                          borderColor: isSelected ? 'var(--marigold)' : 'var(--border)',
                          boxShadow: isSelected ? '0 8px 24px rgba(240, 162, 31, 0.25)' : 'none'
                        }}
                      >
                        {/* Selected Radio Indicator */}
                        <div
                          className="position-absolute top-0 end-0 m-3"
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--marigold)' : 'var(--muted)'}`,
                            background: isSelected ? 'var(--marigold)' : 'transparent',
                            display: 'grid',
                            placeItems: 'center',
                            color: '#1f1400',
                            zIndex: 2
                          }}
                        >
                          {isSelected && <FaCheck size={12} />}
                        </div>

                        <div
                          className="rounded-3 overflow-hidden mb-3"
                          style={{ height: 160, background: '#082a32' }}
                        >
                          <img
                            src={villa.images[0] || '/images/fallback-villa.jpg'}
                            alt={villa.name}
                            onError={(e) => {
                              e.target.src = '/images/fallback-villa.svg';
                            }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>

                        <h4 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px' }}>
                          {villa.name}
                        </h4>

                        <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: 13, color: 'var(--muted)' }}>
                          <span className="d-flex align-items-center gap-1">
                            <FaBed style={{ color: 'var(--teal-primary)' }} /> {villa.bedrooms} Beds
                          </span>
                          <span>•</span>
                          <span className="d-flex align-items-center gap-1">
                            <FaUsers style={{ color: 'var(--teal-primary)' }} /> Max {villa.maxGuests}
                          </span>
                          {villa.hasPool && (
                            <>
                              <span>•</span>
                              <span className="text-info fw-bold">Pool</span>
                            </>
                          )}
                        </div>

                        <div
                          className="mt-auto p-2 rounded-2"
                          style={{ background: 'var(--teal-surface)', fontSize: 13 }}
                        >
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Weekday:</span>
                            <strong>₹{villa.weekdayRate.toLocaleString('en-IN')}</strong>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Weekend:</span>
                            <strong style={{ color: 'var(--marigold-dark)' }}>
                              ₹{villa.weekendRate.toLocaleString('en-IN')}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATES AND TIME */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h2 className="fw-bold mb-1">2. Choose Dates & Check-In Time</h2>
                <p className="text-muted small">
                  Selected villa: <strong>{selectedVilla.name}</strong>. Tap check-in and check-out dates.
                </p>
                {validationErrors.stay && (
                  <div className="alert alert-danger py-2 d-flex align-items-center gap-2">
                    <FaTriangleExclamation />
                    <span>{validationErrors.stay}</span>
                  </div>
                )}
                {conflictingDates.length > 0 && (
                  <div className="alert alert-danger py-2 d-flex align-items-center gap-2">
                    <FaTriangleExclamation />
                    <span>
                      Not available! Selected dates clash with existing bookings on:{' '}
                      <strong>{conflictingDates.map((d) => formatDate(d, 'DD MMM')).join(', ')}</strong>.
                    </span>
                  </div>
                )}
              </div>

              <div className="row g-4">
                {/* Left: Custom Calendar */}
                <div className="col-12 col-lg-7">
                  <CustomCalendar
                    villa={selectedVilla}
                    checkIn={dates.checkIn}
                    checkOut={dates.checkOut}
                    onSelectDates={({ checkIn, checkOut }) => {
                      setDates((prev) => ({
                        ...prev,
                        checkIn,
                        checkOut
                      }));
                      setValidationErrors({});
                    }}
                  />
                </div>

                {/* Right: Time Pickers & Live Price Breakdown */}
                <div className="col-12 col-lg-5">
                  <div className="db-card p-4">
                    <h4 className="fw-bold mb-3" style={{ fontSize: 18 }}>
                      Check-In / Out Timings
                    </h4>

                    <div className="row g-3 mb-4">
                      <div className="col-6">
                        <label className="form-label small fw-bold mb-1">Check-In Time</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={dates.checkInTime}
                          onChange={(e) =>
                            setDates({ ...dates, checkInTime: e.target.value })
                          }
                          placeholder="12:00 PM"
                        />
                        <div className="text-muted" style={{ fontSize: 10 }}>Standard: 12:00 PM</div>
                      </div>

                      <div className="col-6">
                        <label className="form-label small fw-bold mb-1">Check-Out Time</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={dates.checkOutTime}
                          onChange={(e) =>
                            setDates({ ...dates, checkOutTime: e.target.value })
                          }
                          placeholder="12:00 PM"
                        />
                        <div className="text-muted" style={{ fontSize: 10 }}>Next Day: 12:00 PM</div>
                      </div>
                    </div>

                    <hr className="border-light-subtle" />

                    {/* Live Pricing Breakdown */}
                    <h4 className="fw-bold mb-3" style={{ fontSize: 18 }}>
                      Live Price Breakdown
                    </h4>

                    {dates.checkIn && dates.checkOut ? (
                      <div className="d-flex flex-column gap-2" style={{ fontSize: 14 }}>
                        <div className="d-flex justify-content-between text-muted">
                          <span>Check-in:</span>
                          <strong className="text-dark">{formatDate(dates.checkIn, 'ddd, DD MMM YYYY')}</strong>
                        </div>
                        <div className="d-flex justify-content-between text-muted">
                          <span>Check-out:</span>
                          <strong className="text-dark">{formatDate(dates.checkOut, 'ddd, DD MMM YYYY')}</strong>
                        </div>
                        <div className="d-flex justify-content-between text-muted">
                          <span>Total Stay Duration:</span>
                          <strong>{priceBreakdown.nights} {priceBreakdown.nights === 1 ? 'Night' : 'Nights'}</strong>
                        </div>

                        {priceBreakdown.weekdayNights > 0 && (
                          <div className="d-flex justify-content-between text-muted">
                            <span>Weekday Nights ({priceBreakdown.weekdayNights} × ₹{priceBreakdown.weekdayRate.toLocaleString('en-IN')}):</span>
                            <span>₹{priceBreakdown.weekdayTotal.toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        {priceBreakdown.weekendNights > 0 && (
                          <div className="d-flex justify-content-between text-muted">
                            <span>Weekend Nights ({priceBreakdown.weekendNights} × ₹{priceBreakdown.weekendRate.toLocaleString('en-IN')}):</span>
                            <span style={{ color: 'var(--marigold-dark)', fontWeight: 600 }}>
                              ₹{priceBreakdown.weekendTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}

                        <div className="p-3 rounded-3 mt-2" style={{ background: 'var(--teal-surface)', border: '1px solid var(--border)' }}>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="fw-bold">Total Tariff:</span>
                            <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--teal-dark)' }}>
                              ₹{priceBreakdown.total.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-1" style={{ color: 'var(--marigold-dark)' }}>
                            <span className="fw-bold">50% Advance Required:</span>
                            <span style={{ fontWeight: 800, fontSize: 18 }}>
                              ₹{priceBreakdown.advance.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center text-muted small">
                            <span>Remaining at check-in:</span>
                            <span>₹{priceBreakdown.balance.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted small p-3 rounded text-center bg-light">
                        Please tap check-in and check-out dates on the calendar to see live calculation.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: GUEST DETAILS */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h2 className="fw-bold mb-1">3. Guest Details</h2>
                <p className="text-muted small">
                  Enter your details so Dinesh Boy can identify your booking.
                </p>
              </div>

              <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                  <div className="db-card p-4 p-md-5">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Primary Guest Full Name *</label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                        placeholder="e.g. Anandha Krishnan"
                        value={guest.name}
                        onChange={(e) => {
                          setGuest({ ...guest, name: e.target.value });
                          if (validationErrors.name) setValidationErrors({ ...validationErrors, name: null });
                        }}
                      />
                      {validationErrors.name && (
                        <div className="invalid-feedback">{validationErrors.name}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">WhatsApp Phone Number *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
                          placeholder="9876543210"
                          value={guest.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setGuest({ ...guest, phone: val });
                            if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: null });
                          }}
                        />
                        {validationErrors.phone && (
                          <div className="invalid-feedback">{validationErrors.phone}</div>
                        )}
                      </div>
                      <div className="text-muted small mt-1">
                        10-digit Indian mobile number for WhatsApp coordination.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Number of Guests *</label>
                      <input
                        type="number"
                        min={1}
                        max={selectedVilla.maxGuests + 5}
                        className={`form-control ${validationErrors.guests ? 'is-invalid' : ''}`}
                        value={guest.guestCount}
                        onChange={(e) => {
                          const count = parseInt(e.target.value, 10) || 1;
                          setGuest({ ...guest, guestCount: count });
                          if (validationErrors.guests) setValidationErrors({ ...validationErrors, guests: null });
                        }}
                      />
                      {validationErrors.guests && (
                        <div className="invalid-feedback">{validationErrors.guests}</div>
                      )}
                      {guest.guestCount > selectedVilla.maxGuests && (
                        <div className="text-warning small mt-1 d-flex align-items-center gap-1">
                          <FaTriangleExclamation />
                          Friendly notice: This villa's maximum recommended capacity is {selectedVilla.maxGuests} guests. Extra mattresses might be required.
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Special Notes / Occasion (Optional)</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        placeholder="Family vacation, birthday gathering, barbecue grill request, etc."
                        value={guest.notes}
                        onChange={(e) => setGuest({ ...guest, notes: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: REVIEW AND PAY */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h2 className="fw-bold mb-1">4. Review & Pay 50% Advance</h2>
                <p className="text-muted small">
                  Verify your stay details and pay <strong>₹{priceBreakdown.advance.toLocaleString('en-IN')}</strong> via your favorite UPI app.
                </p>
              </div>

              <div className="row g-4">
                {/* Left: Summary Card */}
                <div className="col-12 col-lg-6">
                  <div className="db-card p-4 h-100">
                    <div className="d-flex justify-content-between align-items-start mb-3 border-bottom pb-3">
                      <div>
                        <span className="badge bg-secondary mb-1">Booking Ref</span>
                        <h4 className="fw-bold m-0" style={{ color: 'var(--teal-primary)' }}>
                          {bookingId}
                        </h4>
                      </div>
                      <div className="text-end">
                        <span className="badge" style={{ background: 'var(--marigold)', color: '#1f1400' }}>
                          50% Advance
                        </span>
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-2 mb-4" style={{ fontSize: 14 }}>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Villa:</span>
                        <strong>{selectedVilla.name}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Guest:</span>
                        <strong>{guest.name} (+91 {guest.phone})</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Guests:</span>
                        <strong>{guest.guestCount} Persons</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Check-In:</span>
                        <strong>
                          {formatDate(dates.checkIn, 'ddd, DD MMM YYYY')} @ {formatTime12h(dates.checkInTime)}
                        </strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Check-Out:</span>
                        <strong>
                          {formatDate(dates.checkOut, 'ddd, DD MMM YYYY')} @ {formatTime12h(dates.checkOutTime)}
                        </strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Duration:</span>
                        <strong>{priceBreakdown.nights} Nights</strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-3" style={{ background: 'var(--teal-surface)', border: '1px solid var(--border)' }}>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Total Rent:</span>
                        <span className="fw-bold">₹{priceBreakdown.total.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1 text-danger">
                        <span>Advance to Pay Now (50%):</span>
                        <span className="fw-bold" style={{ fontSize: 18 }}>
                          ₹{priceBreakdown.advance.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between text-muted small">
                        <span>Balance at check-in:</span>
                        <span>₹{priceBreakdown.balance.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Payment Options & QR Code */}
                <div className="col-12 col-lg-6">
                  <div className="db-card p-4">
                    <h4 className="fw-bold mb-3" style={{ fontSize: 18 }}>
                      Pay via UPI (GPay / PhonePe / Paytm)
                    </h4>

                    {/* Quick UPI App Deep Links for Mobile */}
                    <div className="d-grid gap-2 mb-3">
                      <a
                        href={generateUpiUrl('gpay')}
                        className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 py-2"
                        style={{ borderRadius: 10, fontWeight: 600 }}
                      >
                        <span>Pay with Google Pay</span>
                      </a>
                      <a
                        href={generateUpiUrl('phonepe')}
                        className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2"
                        style={{ borderRadius: 10, fontWeight: 600 }}
                      >
                        <span>Pay with PhonePe</span>
                      </a>
                      <a
                        href={generateUpiUrl('paytmmp')}
                        className="btn btn-outline-info text-dark d-flex align-items-center justify-content-center gap-2 py-2"
                        style={{ borderRadius: 10, fontWeight: 600 }}
                      >
                        <span>Pay with Paytm</span>
                      </a>
                      <a
                        href={generateUpiUrl('upi')}
                        className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 py-2"
                        style={{ borderRadius: 10, fontWeight: 600 }}
                      >
                        <span>Other UPI App</span>
                      </a>
                    </div>

                    {/* QR Code and Copy UPI ID for Desktop */}
                    <div className="p-3 rounded-3 text-center mb-3" style={{ background: '#ffffff', border: '1px solid var(--border)' }}>
                      <div className="text-muted small mb-2">Scan QR code using any UPI app:</div>
                      {qrDataUrl && (
                        <img
                          src={qrDataUrl}
                          alt="UPI QR Code"
                          style={{ width: 170, height: 170, margin: '0 auto', display: 'block' }}
                        />
                      )}

                      <div className="mt-2 d-flex align-items-center justify-content-center gap-2">
                        <span className="fw-bold small text-dark">{siteConfig.upiId}</span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="btn btn-sm btn-light border py-1 px-2"
                          style={{ fontSize: 12 }}
                        >
                          {copiedUpi ? <FaCheck className="text-success" /> : <FaCopy />}
                        </button>
                      </div>
                      <div className="text-muted" style={{ fontSize: 11 }}>Payee: {siteConfig.payeeName}</div>
                    </div>

                    {/* Honest Note */}
                    <div
                      className="p-3 rounded-3 mb-3 small"
                      style={{ background: 'rgba(240, 162, 31, 0.15)', border: '1px solid rgba(240, 162, 31, 0.4)' }}
                    >
                      <strong>Important step:</strong> After transferring the advance, tap the button below and attach your payment screenshot in WhatsApp.
                    </div>

                    {/* I Have Paid Button */}
                    <button
                      type="button"
                      onClick={handlePaidAndSendWhatsApp}
                      className="btn-whatsapp w-100"
                      style={{ fontSize: 16, padding: '14px' }}
                    >
                      <FaWhatsapp size={20} /> I Have Paid, Send on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: SEND ON WHATSAPP & SUCCESS SCREEN */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-4"
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.15)',
                  color: 'var(--whatsapp-dark)',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <FaCircleCheck size={48} />
              </div>

              <h2 className="display-6 fw-bold mb-2">Booking Request Generated!</h2>
              <p className="text-muted mx-auto mb-4" style={{ maxWidth: 540 }}>
                Your booking ID is <strong>{bookingId}</strong>. To complete the confirmation, send the generated message and your payment screenshot to Dinesh Boy on WhatsApp.
              </p>

              {/* Status Note Banner */}
              <div
                className="p-3 rounded-4 mx-auto mb-4 text-start"
                style={{
                  maxWidth: 540,
                  background: 'var(--sand-card)',
                  border: '1px solid var(--border)'
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2 text-warning fw-bold small">
                  <FaShieldHalved /> Booking Status: Pending Owner Confirmation
                </div>
                <div className="small text-muted mb-2">
                  To ensure complete transparency and eliminate automated double-bookings, Dinesh Boy will verify your payment screenshot and confirm your room allocation within minutes.
                </div>
                <div className="d-flex justify-content-between small pt-2 border-top">
                  <span>Villa: <strong>{selectedVilla.name}</strong></span>
                  <span>Advance: <strong>₹{priceBreakdown.advance.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="btn-whatsapp"
                  style={{ fontSize: 16, padding: '14px 28px' }}
                >
                  <FaWhatsapp size={20} /> Send Again on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(STORAGE_KEY);
                    setBookingId(generateBookingId());
                    setStep(1);
                  }}
                  className="btn btn-outline-secondary d-flex align-items-center gap-2 px-4"
                  style={{ borderRadius: 12 }}
                >
                  <FaRotateRight /> Make Another Booking
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stepper Navigation Buttons (Step 1 to 4) */}
        {step < 5 && (
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-light-subtle">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2"
              style={{ borderRadius: 10, visibility: step === 1 ? 'hidden' : 'visible' }}
            >
              <FaArrowLeft size={13} /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-marigold d-flex align-items-center gap-2 px-4 py-2"
              >
                Next <FaArrowRight size={13} />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
