import assert from 'node:assert';
import {
  isWeekend,
  nightsBetween,
  calculateTotal,
  generateBookingId,
  getConflictingDates,
  validateBookingStay,
  formatDate
} from '../src/utils/date.js';

console.log('🧪 Running Dinesh Boy Date & Booking Utility Tests...\n');

const testVilla = {
  id: 'villa-test',
  name: 'Test 2BHK Villa',
  weekdayRate: 4000,
  weekendRate: 6000,
  bookedDates: ['2026-11-21', '2026-12-31', '2028-02-29']
};

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// 1. Weekend Logic
runTest('Weekend check: Friday and Saturday nights are weekend rates', () => {
  assert.strictEqual(isWeekend('2026-11-20'), true, 'Friday must be weekend');
  assert.strictEqual(isWeekend('2026-11-21'), true, 'Saturday must be weekend');
  assert.strictEqual(isWeekend('2026-11-22'), false, 'Sunday night is weekday');
  assert.strictEqual(isWeekend('2026-11-19'), false, 'Thursday night is weekday');
});

// 2. Single Night Stay (Weekday vs Weekend)
runTest('Single night weekday stay (Tue to Wed): exactly 1 weekday rate', () => {
  const calc = calculateTotal(testVilla, '2026-11-24', '2026-11-25');
  assert.strictEqual(calc.nights, 1);
  assert.strictEqual(calc.weekdayNights, 1);
  assert.strictEqual(calc.weekendNights, 0);
  assert.strictEqual(calc.total, 4000);
  assert.strictEqual(calc.advance, 2000);
  assert.strictEqual(calc.balance, 2000);
});

runTest('Single night weekend stay (Fri to Sat): exactly 1 weekend rate', () => {
  const calc = calculateTotal(testVilla, '2026-11-20', '2026-11-21');
  assert.strictEqual(calc.nights, 1);
  assert.strictEqual(calc.weekdayNights, 0);
  assert.strictEqual(calc.weekendNights, 1);
  assert.strictEqual(calc.total, 6000);
  assert.strictEqual(calc.advance, 3000);
});

// 3. Stay Crossing Friday to Sunday
runTest('Stay crossing Friday to Sunday (Fri, Sat nights): 2 weekend nights', () => {
  const calc = calculateTotal(testVilla, '2026-11-20', '2026-11-22');
  assert.strictEqual(calc.nights, 2);
  assert.strictEqual(calc.weekdayNights, 0);
  assert.strictEqual(calc.weekendNights, 2);
  assert.strictEqual(calc.total, 12000);
  assert.strictEqual(calc.advance, 6000);
});

runTest('Stay from Thursday to Sunday (Thu, Fri, Sat nights): 1 weekday + 2 weekend', () => {
  const calc = calculateTotal(testVilla, '2026-11-19', '2026-11-22');
  assert.strictEqual(calc.nights, 3);
  assert.strictEqual(calc.weekdayNights, 1);
  assert.strictEqual(calc.weekendNights, 2);
  assert.strictEqual(calc.total, 4000 + 6000 * 2); // 16,000
  assert.strictEqual(calc.advance, 8000);
});

// 4. Month End Edge Case
runTest('Month end stay crossing Nov 30 to Dec 2: 2 nights calculated seamlessly', () => {
  // Nov 30 (Mon) to Dec 2 (Wed) = 2 weekday nights
  const calc = calculateTotal(testVilla, '2026-11-30', '2026-12-02');
  assert.strictEqual(calc.nights, 2);
  assert.strictEqual(calc.weekdayNights, 2);
  assert.strictEqual(calc.total, 8000);
});

// 5. Year End Edge Case
runTest('Year end stay crossing Dec 30 2026 to Jan 2 2027: rollover across year boundary', () => {
  // Dec 30 2026 (Wed) - weekday
  // Dec 31 2026 (Thu) - weekday
  // Jan 01 2027 (Fri) - weekend
  const calc = calculateTotal(testVilla, '2026-12-30', '2027-01-02');
  assert.strictEqual(calc.nights, 3);
  assert.strictEqual(calc.weekdayNights, 2);
  assert.strictEqual(calc.weekendNights, 1);
  assert.strictEqual(calc.total, 4000 * 2 + 6000); // 14,000
});

// 6. Leap Year Edge Case (2028 is a leap year)
runTest('Leap year stay (Feb 28 2028 to Mar 1 2028): includes Feb 29', () => {
  const nights = nightsBetween('2028-02-28', '2028-03-01');
  assert.strictEqual(nights, 2, 'Must account for Feb 29 in 2028 leap year');
});

// 7. Booking ID format validation
runTest('Booking ID matches pattern DB-YYMMDD-XXXX', () => {
  const id = generateBookingId('2026-11-18');
  assert.match(id, /^DB-261118-[A-Z0-9]{4}$/);
});

// 8. Conflicting Dates & Booked Dates Detection
runTest('Detects overlapping booked dates properly', () => {
  const conflicts = getConflictingDates('2026-11-20', '2026-11-23', testVilla.bookedDates);
  assert.deepStrictEqual(conflicts, ['2026-11-21']);
});

// 9. Validation rules
runTest('Prevents checkout date on or before checkin date', () => {
  const res = validateBookingStay(testVilla, '2026-11-25', '2026-11-25');
  assert.strictEqual(res.valid, false);
});

console.log(`\n================================`);
console.log(`Results: ${passed} passed, ${failed} failed.`);
console.log(`================================\n`);

if (failed > 0) process.exit(1);
