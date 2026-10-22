/**
 * Tests for exercises/level01_jsx_and_components/ex06_status_badge.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_status_badge
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusBadge } from './ex06_status_badge';

describe('StatusBadge', () => {
  // Examples to get you started:
  //
  // it("shows a green Active badge", () => {
  //   render(<StatusBadge status="active" />);
  //   expect(screen.getByText("Active")).toHaveAttribute("class", "badge badge-green");
  // });
  //
  // it("falls back to Unknown for a status it doesn't know", () => {
  //   render(<StatusBadge status="deleted" />);
  //   expect(screen.getByText("Unknown")).toHaveClass("badge", "badge-grey");
  // });

  it.todo('shows a yellow Pending badge');
  it.todo('shows a red Suspended badge');
  it.todo("ignores case and spaces: '  ACTIVE ' shows Active");
  it.todo('shows Unknown for the empty string');
  it.todo("shows Unknown for 'constructor' and 'toString'");
});
