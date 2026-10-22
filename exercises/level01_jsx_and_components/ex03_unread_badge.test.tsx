/**
 * Tests for exercises/level01_jsx_and_components/ex03_unread_badge.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_unread_badge
 */

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UnreadBadge } from './ex03_unread_badge';

describe('UnreadBadge', () => {
  // Examples to get you started:
  //
  // it("shows the count in a badge and a full sentence as the name", () => {
  //   render(<UnreadBadge count={3} />);
  //   const button = screen.getByRole("button", { name: "Messages, 3 unread messages" });
  //   expect(within(button).getByText("3")).toBeInTheDocument();
  // });
  //
  // it("shows no stray 0 when there are no unread messages", () => {
  //   render(<UnreadBadge count={0} />);
  //   expect(screen.getByRole("button", { name: "Messages" })).not.toHaveTextContent("0");
  // });

  it.todo("uses the singular 'message' for a count of 1");
  it.todo('shows 99 when the count equals max');
  it.todo('shows 99+ above max, but the name has the real count');
  it.todo('uses a custom max: count 10, max 9 shows 9+');
  it.todo("renders a button with type='button'");
});
