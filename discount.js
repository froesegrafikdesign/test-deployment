'use strict';

/**
 * Calculate the discounted price.
 * @param {number} price - Non-negative finite price.
 * @param {number} percent - Finite discount percentage in the range 0..100.
 * @returns {number} The price after applying the discount.
 * @throws {TypeError} If an argument is not a finite number.
 * @throws {RangeError} If price is negative or percent is outside 0..100.
 */
function calculateDiscount(price, percent) {
  if (typeof price !== 'number' || !Number.isFinite(price)) {
    throw new TypeError('price must be a finite number');
  }
  if (typeof percent !== 'number' || !Number.isFinite(percent)) {
    throw new TypeError('percent must be a finite number');
  }
  if (price < 0) {
    throw new RangeError('price must not be negative');
  }
  if (percent < 0 || percent > 100) {
    throw new RangeError('percent must be between 0 and 100');
  }
  return price - (price * percent) / 100;
}

module.exports = { calculateDiscount };
