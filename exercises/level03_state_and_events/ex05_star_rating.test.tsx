/**
 * Tests for exercises/level03_state_and_events/ex05_star_rating.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_star_rating
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { StarRating } from './ex05_star_rating';

// All the stars' text joined together, e.g. "★★★☆☆".
function starTexts() {
  return screen
    .getAllByRole('button')
    .map((b) => b.textContent)
    .join('');
}

describe('StarRating', () => {
  // Examples to get you started:
  //
  // it("starts empty with No rating", () => {
  //   render(<StarRating />);
  //   expect(starTexts()).toBe("☆☆☆☆☆");
  //   expect(screen.getByRole("status")).toHaveTextContent("No rating");
  // });
  //
  // it("previews the rating on hover without changing it", async () => {
  //   const user = userEvent.setup();
  //   render(<StarRating defaultValue={1} />);
  //   await user.hover(screen.getByRole("button", { name: "4 stars" }));
  //   expect(starTexts()).toBe("★★★★☆");
  //   expect(screen.getByRole("status")).toHaveTextContent("1 out of 5");
  // });

  it.todo('renders 5 star buttons named 1 star ... 5 stars');
  it.todo('wraps the stars in a group named Rating, or by label');
  it.todo('starts at defaultValue');
  it.todo('sets the rating when a star is clicked');
  it.todo('changes the rating when another star is clicked');
  it.todo('clears the rating when the same star is clicked again');
  it.todo('previews fewer stars than the rating on hover');
  it.todo('follows the mouse from star to star');
  it.todo('goes back to the rating when the mouse leaves');
  it.todo('calls onChange on clicks only, with 0 when cleared');
  it.todo('supports a different max');
  it.todo('can be used with the keyboard');
  it.todo('uses type=button for every star');
});
