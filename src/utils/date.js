import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

export const TIMEZONE = 'Asia/Kolkata';

/**
 * Returns a dayjs instance in Asia/Kolkata timezone.
 * Defaults to current time if no date string provided.
 */
export function getNow() {
  return dayjs().tz(TIMEZONE);
}

/**
 * Parse any date string or object into Asia/Kolkata dayjs instance.
 */
export function parseDate(date) {
  if (!date) return null;
  return dayjs(date).tz(TIMEZONE);
}

/**
 * Checks if a night is a weekend night.
 * Friday night (day 5) and Saturday night (day 6) are weekend nights.
 * Sunday night (day 0) through Thursday night (day 4) are weekday nights.
 */
export function isWeekend(date) {
  const d = parseDate(date);
  if (!d || !d.isValid()) return false;
  const dayOfWeek = d.day(); // 0 is Sunday, 5 is Friday, 6 is Saturday
  return dayOfWeek === 5 || dayOfWeek === 6;
}

/**
 * Calculate the number of nights between check-in and check-out.
 * E.g., check-in Nov 20, check-out Nov 21 = 1 night.
 */
export function nightsBetween(checkIn, checkOut) {
  const d1 = parseDate(checkIn).startOf('day');
  const d2 = parseDate(checkOut).startOf('day');
  if (!d1.isValid() || !d2.isValid()) return 0;
  const diff = d2.diff(d1, 'day');
  return diff > 0 ? diff : 0;
}

/**
 * Format date for friendly human reading: "Fri, 20 Nov 2026"
 */
export function formatDate(date, format = 'ddd, DD MMM YYYY') {
  const d = parseDate(date);
  if (!d || !d.isValid()) return '';
  return d.format(format);
}

/**
 * Format time to 12-hour AM/PM: "12:00 PM"
 */
export function formatTime12h(timeStr) {
  if (!timeStr) return '12:00 PM';
  // If already like "12:00 PM"
  if (/^(0?[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)$/i.test(timeStr)) {
    return timeStr.toUpperCase();
  }
  // If 24h format like "14:30"
  const parsed = dayjs(`2000-01-01 ${timeStr}`, 'YYYY-MM-DD HH:mm');
  if (parsed.isValid()) {
    return parsed.format('hh:mm A');
  }
  return timeStr;
}

/**
 * Generates unique booking ID in format DB-YYMMDD-XXXX (random 4 alphanumeric)
 */
export function generateBookingId(date = new Date()) {
  const d = parseDate(date);
  const yymmdd = d.format('YYMMDD');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DB-${yymmdd}-${rand}`;
}

/**
 * Checks whether a given stay has any overlap with booked dates.
 * Returns array of conflicting dates (YYYY-MM-DD).
 */
export function getConflictingDates(checkIn, checkOut, bookedDates = []) {
  if (!checkIn || !checkOut || !Array.isArray(bookedDates)) return [];
  const start = parseDate(checkIn).startOf('day');
  const end = parseDate(checkOut).startOf('day');
  if (!start.isValid() || !end.isValid() || end.isSameOrBefore(start)) return [];

  const conflicts = [];
  let curr = start;
  while (curr.isBefore(end)) {
    const formatted = curr.format('YYYY-MM-DD');
    if (bookedDates.includes(formatted)) {
      conflicts.push(formatted);
    }
    curr = curr.add(1, 'day');
  }
  return conflicts;
}

/**
 * Check if a date is in the past compared to today in Kolkata timezone.
 */
export function isPastDate(date) {
  const today = getNow().startOf('day');
  const target = parseDate(date).startOf('day');
  return target.isBefore(today);
}

/**
 * Calculates itemized pricing for a stay.
 * Returns:
 * {
 *   nights: number,
 *   weekdayNights: number,
 *   weekendNights: number,
 *   weekdayRate: number,
 *   weekendRate: number,
 *   weekdayTotal: number,
 *   weekendTotal: number,
 *   total: number,
 *   advance: number,
 *   balance: number,
 *   nightDetails: Array<{ date: string, isWeekend: boolean, rate: number }>
 * }
 */
export function calculateTotal(villa, checkIn, checkOut, advancePercentage = 50) {
  if (!villa || !checkIn || !checkOut) {
    return {
      nights: 0,
      weekdayNights: 0,
      weekendNights: 0,
      weekdayRate: villa?.weekdayRate || 0,
      weekendRate: villa?.weekendRate || 0,
      weekdayTotal: 0,
      weekendTotal: 0,
      total: 0,
      advance: 0,
      balance: 0,
      nightDetails: []
    };
  }

  const start = parseDate(checkIn).startOf('day');
  const end = parseDate(checkOut).startOf('day');

  if (!start.isValid() || !end.isValid() || end.isSameOrBefore(start)) {
    return {
      nights: 0,
      weekdayNights: 0,
      weekendNights: 0,
      weekdayRate: villa.weekdayRate,
      weekendRate: villa.weekendRate,
      weekdayTotal: 0,
      weekendTotal: 0,
      total: 0,
      advance: 0,
      balance: 0,
      nightDetails: []
    };
  }

  let curr = start;
  let weekdayNights = 0;
  let weekendNights = 0;
  const nightDetails = [];

  while (curr.isBefore(end)) {
    const weekend = isWeekend(curr);
    const rate = weekend ? villa.weekendRate : villa.weekdayRate;
    if (weekend) {
      weekendNights++;
    } else {
      weekdayNights++;
    }
    nightDetails.push({
      date: curr.format('YYYY-MM-DD'),
      formattedDate: curr.format('ddd, DD MMM'),
      isWeekend: weekend,
      rate
    });
    curr = curr.add(1, 'day');
  }

  const nights = weekdayNights + weekendNights;
  const weekdayTotal = weekdayNights * villa.weekdayRate;
  const weekendTotal = weekendNights * villa.weekendRate;
  const total = weekdayTotal + weekendTotal;
  const advance = Math.round((total * advancePercentage) / 100);
  const balance = total - advance;

  return {
    nights,
    weekdayNights,
    weekendNights,
    weekdayRate: villa.weekdayRate,
    weekendRate: villa.weekendRate,
    weekdayTotal,
    weekendTotal,
    total,
    advance,
    balance,
    nightDetails
  };
}

/**
 * Validate booking inputs
 */
export function validateBookingStay(villa, checkIn, checkOut) {
  if (!villa) {
    return { valid: false, error: 'Please choose a villa.' };
  }
  if (!checkIn) {
    return { valid: false, error: 'Please choose a check-in date.' };
  }
  if (!checkOut) {
    return { valid: false, error: 'Please choose a check-out date.' };
  }

  const start = parseDate(checkIn).startOf('day');
  const end = parseDate(checkOut).startOf('day');
  const today = getNow().startOf('day');

  if (start.isBefore(today)) {
    return { valid: false, error: 'Check-in date cannot be in the past.' };
  }
  if (end.isSameOrBefore(start)) {
    return { valid: false, error: 'Check-out date must be after check-in date.' };
  }

  const conflicts = getConflictingDates(checkIn, checkOut, villa.bookedDates);
  if (conflicts.length > 0) {
    const formattedConflicts = conflicts.map(d => formatDate(d, 'DD MMM')).join(', ');
    return {
      valid: false,
      error: `Villa is already booked for: ${formattedConflicts}. Please select different dates.`
    };
  }

  return { valid: true, error: null };
}

export default {
  getNow,
  parseDate,
  isWeekend,
  nightsBetween,
  formatDate,
  formatTime12h,
  generateBookingId,
  getConflictingDates,
  isPastDate,
  calculateTotal,
  validateBookingStay,
  TIMEZONE
};
