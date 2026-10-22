/**
 * Tests for exercises/level10_performance/ex04_key_bugs.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * The BuggyGuestList tests pass right away: they prove the bug that is
 * already there. The GuestList tests fail until you build it.
 *
 * Run just this file:
 *     npm test -- ex04_key_bugs
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { BuggyGuestList, GuestList, type Guest } from './ex04_key_bugs';

const guests: Guest[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Cy' },
];

const note = (name: string) =>
  screen.getByRole('textbox', { name: `Note for ${name}` });

describe('BuggyGuestList (proves the bug)', () => {
  // Example to get you started:
  //
  // it("moves the note to the wrong guest after Reverse order", async () => {
  //   const user = userEvent.setup();
  //   render(<BuggyGuestList initialGuests={guests} />);
  //   await user.type(note("Ada"), "vegetarian");
  //   await user.click(screen.getByRole("button", { name: "Reverse order" }));
  //   expect(note("Cy")).toHaveValue("vegetarian"); // wrong guest!
  //   expect(note("Ada")).toHaveValue("");
  // });

  it.todo("gives the removed guest's note to the next guest");
  it.todo('gives the first note to a guest added at the top');
});

describe('GuestList (the fix)', () => {
  // Example to get you started:
  //
  // it("keeps the note with its guest after Reverse order", async () => {
  //   const user = userEvent.setup();
  //   render(<GuestList initialGuests={guests} />);
  //   await user.type(note("Ada"), "vegetarian");
  //   await user.click(screen.getByRole("button", { name: "Reverse order" }));
  //   expect(note("Ada")).toHaveValue("vegetarian");
  //   expect(note("Cy")).toHaveValue("");
  // });

  it.todo('shows the guests in reverse order after Reverse order');
  it.todo("removes a guest, and the next guest's note stays empty");
  it.todo('adds a trimmed name to the top and clears the box');
  it.todo('keeps notes with their guests after Add to top');
  it.todo('ignores Add to top when the name is only spaces');
  it.todo('adds two guests in a row, each with its own note');
});
