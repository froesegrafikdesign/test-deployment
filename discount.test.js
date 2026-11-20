'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateDiscount } = require('./discount.js');

test('applies a regular discount', () => {
  assert.equal(calculateDiscount(200, 25), 150);
  assert.equal(calculateDiscount(80, 50), 40);
});

test('0 percent returns the original price', () => {
  assert.equal(calculateDiscount(99.99, 0), 99.99);
});

test('100 percent returns zero', () => {
  assert.equal(calculateDiscount(42, 100), 0);
});

test('zero price is allowed', () => {
  assert.equal(calculateDiscount(0, 30), 0);
});

test('fractional values', () => {
  assert.ok(Math.abs(calculateDiscount(19.99, 12.5) - 17.49125) < 1e-9);
});

test('rejects non-number types with TypeError', () => {
  for (const bad of ['100', null, undefined, {}, [], true, 10n]) {
    assert.throws(() => calculateDiscount(bad, 10), TypeError);
    assert.throws(() => calculateDiscount(100, bad), TypeError);
  }
});

test('rejects non-finite numbers with TypeError', () => {
  for (const bad of [NaN, Infinity, -Infinity]) {
    assert.throws(() => calculateDiscount(bad, 10), TypeError);
    assert.throws(() => calculateDiscount(100, bad), TypeError);
  }
});

test('rejects negative price with RangeError', () => {
  assert.throws(() => calculateDiscount(-0.01, 10), RangeError);
  assert.throws(() => calculateDiscount(-100, 10), RangeError);
});

test('rejects percent outside 0..100 with RangeError', () => {
  assert.throws(() => calculateDiscount(100, -1), RangeError);
  assert.throws(() => calculateDiscount(100, -0.001), RangeError);
  assert.throws(() => calculateDiscount(100, 100.001), RangeError);
  assert.throws(() => calculateDiscount(100, 150), RangeError);
});
