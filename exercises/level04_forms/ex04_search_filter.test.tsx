/**
 * Tests for exercises/level04_forms/ex04_search_filter.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_search_filter
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SearchFilter } from './ex04_search_filter';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Mango'];

describe('SearchFilter', () => {
  // Examples to get you started:
  //
  // it("shows every item at first", () => {
  //   render(<SearchFilter items={FRUITS} />);
  //   const shown = screen.getAllByRole("listitem").map((li) => li.textContent);
  //   expect(shown).toEqual(["Apple", "Banana", "Cherry", "Mango"]);
  // });
  //
  // it("filters as you type", async () => {
  //   const user = userEvent.setup();
  //   render(<SearchFilter items={FRUITS} />);
  //   await user.type(screen.getByRole("searchbox", { name: "Search" }), "an");
  //   const shown = screen.getAllByRole("listitem").map((li) => li.textContent);
  //   expect(shown).toEqual(["Banana", "Mango"]);
  //   expect(screen.getByRole("status")).toHaveTextContent("2 results");
  // });

  it.todo('shows every item in order, with the count, when the box is empty');
  it.todo('ignores upper and lower case');
  it.todo('matches text in the middle of an item');
  it.todo("says '1 result' for exactly one match");
  it.todo("shows no list and a 'No results for' message when nothing matches");
  it.todo(
    'ignores spaces around the text, and shows everything for only spaces',
  );
  it.todo('brings every item back when the text is deleted');
  it.todo('names the search box with the label prop');
});
