/**
 * Tests for exercises/level00_javascript/ex01_array_methods.ts
 *
 * Write your tests here first, run them and watch them fail, then write
 * the functions until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_array_methods
 */

import { describe, expect, it } from 'vitest';

import {
  allCheaperThan,
  anySoldOut,
  findById,
  groupByCategory,
  inStockNames,
  totalPrice,
  type Product,
} from './ex01_array_methods';

const lamp: Product = {
  id: 1,
  name: 'Lamp',
  price: 2500,
  category: 'home',
  inStock: true,
};
const pen: Product = {
  id: 2,
  name: 'Pen',
  price: 150,
  category: 'office',
  inStock: false,
};
const mug: Product = {
  id: 3,
  name: 'Mug',
  price: 800,
  category: 'home',
  inStock: true,
};

describe('array methods', () => {
  // Examples to get you started:
  //
  // it("inStockNames returns the names of in-stock products", () => {
  //   expect(inStockNames([lamp, pen, mug])).toEqual(["Lamp", "Mug"]);
  // });
  //
  // it("totalPrice adds up every price", () => {
  //   expect(totalPrice([lamp, pen, mug])).toBe(3450);
  // });

  it.todo('inStockNames returns [] for an empty array');
  it.todo('inStockNames returns [] when nothing is in stock');
  it.todo('totalPrice returns 0 for an empty array');
  it.todo('findById returns the very same product object (toBe)');
  it.todo('findById returns undefined for an unknown id');
  it.todo('anySoldOut is true when one product is sold out, false for []');
  it.todo('allCheaperThan is false when a price equals the limit');
  it.todo('allCheaperThan is true for an empty array');
  it.todo('groupByCategory groups products and keeps their order');
  it.todo('groupByCategory returns {} for an empty array');
  it.todo('no function changes a frozen input array');
});
