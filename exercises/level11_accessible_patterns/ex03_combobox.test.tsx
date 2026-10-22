/**
 * Tests for exercises/level11_accessible_patterns/ex03_combobox.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_combobox
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Combobox } from './ex03_combobox';

const fruits = ['Apple', 'Banana', 'Mango', 'Orange'];

describe('Combobox', () => {
  // Examples to get you started:
  //
  // it("shows matching options while typing", async () => {
  //   const user = userEvent.setup();
  //   render(<Combobox label="Fruit" options={fruits} />);
  //   const box = screen.getByRole("combobox", { name: "Fruit" });
  //   await user.type(box, "an");
  //   expect(box).toHaveAttribute("aria-expanded", "true");
  //   const names = screen.getAllByRole("option").map((o) => o.textContent);
  //   expect(names).toEqual(["Banana", "Mango", "Orange"]);
  // });
  //
  // it("picks the active option with Enter", async () => {
  //   const user = userEvent.setup();
  //   const onSelect = vi.fn();
  //   render(<Combobox label="Fruit" options={fruits} onSelect={onSelect} />);
  //   const box = screen.getByRole("combobox", { name: "Fruit" });
  //   await user.type(box, "an");
  //   await user.keyboard("{ArrowDown}{Enter}");
  //   expect(box).toHaveValue("Banana");
  //   expect(onSelect).toHaveBeenCalledWith("Banana");
  //   expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  // });

  it.todo('starts closed, with no listbox and no aria-activedescendant');
  it.todo('matches ignoring case, in the original order');
  it.todo('points aria-controls at the listbox, which is named by the label');
  it.todo('moves the active option with ArrowDown and ArrowUp, wrapping');
  it.todo(
    'sets aria-activedescendant and aria-selected on the active option only',
  );
  it.todo(
    'opens all options with the first active on ArrowDown, and the last on ArrowUp',
  );
  it.todo('does nothing on Enter when no option is active');
  it.todo('closes on Escape and keeps the text');
  it.todo(
    'closes the list when nothing matches, and ArrowDown then does nothing',
  );
  it.todo('starts from the first match again after Escape');
  it.todo('clears the active option when typing again');
  it.todo('picks an option on click and keeps focus in the text box');
  it.todo('keeps focus in the text box while using the arrow keys');
  it.todo('calls preventDefault for ArrowDown, ArrowUp and Enter');
});
