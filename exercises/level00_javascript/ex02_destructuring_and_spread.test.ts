/**
 * Tests for exercises/level00_javascript/ex02_destructuring_and_spread.ts
 *
 * Write your tests here first, run them and watch them fail, then write
 * the functions until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_destructuring_and_spread
 */

import { describe, expect, it } from 'vitest';

import {
  addTag,
  publicProfile,
  removeItem,
  updateUser,
  type User,
} from './ex02_destructuring_and_spread';

// Frozen, so any attempt to change it throws an error and fails the test.
const ada: User = Object.freeze({
  id: 1,
  name: 'Ada',
  email: 'ada@example.com',
  tags: Object.freeze(['math']),
});

describe('destructuring and spread', () => {
  // Examples to get you started:
  //
  // it("updateUser returns a new user with the change", () => {
  //   const updated = updateUser(ada, { name: "Ada L." });
  //   expect(updated).toEqual({ id: 1, name: "Ada L.", email: "ada@example.com", tags: ["math"] });
  //   expect(updated).not.toBe(ada);
  // });
  //
  // it("removeItem removes the item at the index", () => {
  //   expect(removeItem(["a", "b", "c"], 1)).toEqual(["a", "c"]);
  // });

  it.todo('updateUser returns a new object even when there are no changes');
  it.todo('updateUser can change several fields at once');
  it.todo('addTag adds the tag to the end without changing ada.tags');
  it.todo('addTag returns the same user when the tag is already there');
  it.todo('publicProfile has every field except email');
  it.todo('removeItem works for the first and the last index');
  it.todo(
    'removeItem returns a new array with the same items for -1 or a too-big index',
  );
  it.todo('removeItem returns [] for an empty array');
});
