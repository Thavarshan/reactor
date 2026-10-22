/**
 * Tests for exercises/level10_performance/ex02_use_memo.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * These tests count calls with a spy. They don't use <StrictMode>,
 * which would call the useMemo function twice and double the counts.
 *
 * Run just this file:
 *     npm test -- ex02_use_memo
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { filterProducts, ProductSearch, sampleProducts } from './ex02_use_memo';

describe('ProductSearch', () => {
  // Examples to get you started:
  //
  // it("filters once on the first render", () => {
  //   const spy = vi.fn(filterProducts);
  //   render(<ProductSearch products={sampleProducts} filter={spy} />);
  //   expect(spy).toHaveBeenCalledTimes(1);
  //   expect(spy).toHaveBeenCalledWith(sampleProducts, "");
  // });
  //
  // it("does not filter again when Dark mode is toggled", async () => {
  //   const user = userEvent.setup();
  //   const spy = vi.fn(filterProducts);
  //   render(<ProductSearch products={sampleProducts} filter={spy} />);
  //   spy.mockClear();
  //   await user.click(screen.getByRole("checkbox", { name: "Dark mode" }));
  //   expect(spy).not.toHaveBeenCalled();
  //   expect(screen.getByRole("region", { name: "Product search" })).toHaveClass("theme-dark");
  // });

  it.todo("lists every product with '6 results' at first");
  it.todo('calls filter once per keystroke, with the latest text');
  it.todo('shows only matching products after typing');
  it.todo('does not call filter when re-rendered with the same products');
  it.todo('calls filter once when re-rendered with a new products array');
  it.todo("says '1 result' for exactly one match");
  it.todo(
    "shows '0 results' and 'No products found.' with no list when nothing matches",
  );
});
