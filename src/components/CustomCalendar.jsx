import React, { useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaBan,
  FaCalendarDays,
  FaCircleInfo
} from 'react-icons/fa6';
import {
  getNow,
  parseDate,
  isWeekend,
  isPastDate,
  formatDate
} from '../utils/date';

export default function CustomCalendar({
  villa,
  checkIn,
  checkOut,
  onSelectDates
}) {
  const now = getNow();
  // State for currently displayed month/year view
  const [currentView, setCurrentView] = useState(() => {
    if (checkIn) {
      return parseDate(checkIn).startOf('month');
    }
    return now.startOf('month');
  });

  const bookedDates = villa?.bookedDates || [];

  // Month navigation
  const nextMonth = () => {
    setCurrentView((prev) => prev.add(1, 'month'));
  };

  const prevMonth = () => {
    // Prevent navigating to months before the current month
    if (currentView.isAfter(now.startOf('month'))) {
      setCurrentView((prev) => prev.subtract(1, 'month'));
    }
  };

  const isPrevDisabled = currentView.isSameOrBefore(now.startOf('month'));

  // Calculate calendar days
  const year = currentView.year();
  const month = currentView.month(); // 0-indexed
  const daysInMonth = currentView.daysInMonth();
  const firstDayOfWeek = currentView.startOf('month').day(); // 0 = Sunday

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Handle cell click
  const handleDayClick = (dateStr) => {
    if (!villa) return;

    // If past or booked, do nothing
    if (isPastDate(dateStr) || bookedDates.includes(dateStr)) {
      return;
    }

    if (!checkIn || (checkIn && checkOut)) {
      // Starting new selection
      const newCheckIn = dateStr;
      // Auto-set checkOut to next day if not booked
      const nextDayStr = parseDate(dateStr).add(1, 'day').format('YYYY-MM-DD');
      const isNextBooked = bookedDates.includes(newCheckIn); // checkIn night booked
      
      onSelectDates({
        checkIn: newCheckIn,
        checkOut: nextDayStr
      });
    } else {
      // checkIn is selected, picking checkOut
      const start = parseDate(checkIn);
      const clicked = parseDate(dateStr);

      if (clicked.isBefore(start)) {
        // Tapped earlier date, make it the new check-in
        const nextDayStr = clicked.add(1, 'day').format('YYYY-MM-DD');
        onSelectDates({
          checkIn: dateStr,
          checkOut: nextDayStr
        });
      } else if (clicked.isSame(start)) {
        // Tapped same date, clear checkout or keep 1 night
        const nextDayStr = clicked.add(1, 'day').format('YYYY-MM-DD');
        onSelectDates({
          checkIn: dateStr,
          checkOut: nextDayStr
        });
      } else {
        // Valid checkout date
        onSelectDates({
          checkIn,
          checkOut: dateStr
        });
      }
    }
  };

  return (
    <div className="calendar-container">
      {/* Month & Year Header with Controls */}
      <div className="calendar-header">
        <button
          type="button"
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
          style={{ width: 36, height: 36, borderRadius: 10, opacity: isPrevDisabled ? 0.3 : 1 }}
          aria-label="Previous Month"
        >
          <FaChevronLeft size={13} />
        </button>

        <div className="text-center">
          <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>
            {currentView.format('MMMM YYYY')}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>
            Kolkata Time (IST)
          </div>
        </div>

        <button
          type="button"
          onClick={nextMonth}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
          style={{ width: 36, height: 36, borderRadius: 10 }}
          aria-label="Next Month"
        >
          <FaChevronRight size={13} />
        </button>
      </div>

      {/* Weekday Header Labels */}
      <div className="calendar-grid mb-1">
        {dayLabels.map((lbl, i) => (
          <div
            key={lbl}
            className="calendar-day-label"
            style={{
              color: i === 5 || i === 6 ? 'var(--marigold-dark)' : 'var(--muted)'
            }}
          >
            {lbl}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="calendar-grid">
        {/* Empty cells before 1st day of month */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-cell" style={{ visibility: 'hidden' }} />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateObj = currentView.date(dayNum);
          const dateStr = dateObj.format('YYYY-MM-DD');

          const isPast = isPastDate(dateStr);
          const isBooked = bookedDates.includes(dateStr);
          const weekend = isWeekend(dateStr);
          const price = weekend ? villa?.weekendRate : villa?.weekdayRate;

          const isCheckIn = checkIn === dateStr;
          const isCheckOut = checkOut === dateStr;

          let isInRange = false;
          if (checkIn && checkOut) {
            const start = parseDate(checkIn);
            const end = parseDate(checkOut);
            isInRange = dateObj.isAfter(start) && dateObj.isBefore(end);
          }

          let cellClass = 'calendar-cell';
          if (weekend) cellClass += ' weekend';
          if (isPast) cellClass += ' disabled';
          if (isBooked) cellClass += ' booked';
          if (isCheckIn || isCheckOut) cellClass += ' selected';
          if (isInRange) cellClass += ' in-range';

          return (
            <div
              key={dateStr}
              className={cellClass}
              onClick={() => handleDayClick(dateStr)}
              title={
                isBooked
                  ? 'Already Booked'
                  : isPast
                  ? 'Past date'
                  : `${weekend ? 'Weekend' : 'Weekday'}: ₹${price}`
              }
              role="button"
              tabIndex={isPast || isBooked ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleDayClick(dateStr);
                }
              }}
            >
              <span style={{ lineHeight: 1.1 }}>{dayNum}</span>
              {!isPast && !isBooked && price && (
                <span className="cell-price">₹{Math.round(price / 1000)}k</span>
              )}
              {isBooked && (
                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--error)' }}>
                  Booked
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend & Instructions */}
      <div className="mt-3 pt-3 border-top border-light-subtle" style={{ fontSize: 12 }}>
        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-1">
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                border: '1.5px solid var(--marigold)',
                background: 'rgba(240, 162, 31, 0.1)'
              }}
            />
            <span className="text-muted">Weekend (Fri/Sat)</span>
          </div>

          <div className="d-flex align-items-center gap-1">
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: 'repeating-linear-gradient(-45deg, #f8d7da, #f8d7da 3px, #f5c2c7 3px, #f5c2c7 6px)',
                border: '1px solid #f5c2c7'
              }}
            />
            <span className="text-muted">Booked / Blocked</span>
          </div>

          <div className="d-flex align-items-center gap-1">
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: 'var(--teal-primary)'
              }}
            />
            <span className="text-muted">Selected</span>
          </div>
        </div>

        <div className="mt-2 text-muted d-flex align-items-center gap-1">
          <FaCircleInfo className="text-info flex-shrink-0" />
          <span>Tap check-in date first, then check-out date. 12:00 PM standard timing applies.</span>
        </div>
      </div>
    </div>
  );
}
