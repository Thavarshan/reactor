/**
 * Tests for exercises/level06_effects_and_refs/ex04_dropdown_click_outside.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_dropdown_click_outside
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Dropdown } from './ex04_dropdown_click_outside';

const ITEMS = ['Edit', 'Duplicate', 'Delete'];

describe('Dropdown', () => {
  // Examples to get you started:
  //
  // it("closes when you click outside", async () => {
  //   const user = userEvent.setup();
  //   render(
  //     <>
  //       <Dropdown label="Options" items={ITEMS} />
  //       <p>Somewhere else</p>
  //     </>,
  //   );
  //   await user.click(screen.getByRole("button", { name: "Options" }));
  //   expect(screen.getByRole("list")).toBeInTheDocument();
  //   await user.click(screen.getByText("Somewhere else"));
  //   expect(screen.queryByRole("list")).not.toBeInTheDocument();
  // });
  //
  // it("closes on Escape and focuses the toggle button", async () => {
  //   const user = userEvent.setup();
  //   render(<Dropdown label="Options" items={ITEMS} />);
  //   const toggle = screen.getByRole("button", { name: "Options" });
  //   await user.click(toggle);
  //   await user.keyboard("{Escape}");
  //   expect(screen.queryByRole("list")).not.toBeInTheDocument();
  //   expect(toggle).toHaveFocus();
  //   expect(toggle).toHaveAttribute("aria-expanded", "false");
  // });

  it.todo('starts closed with aria-expanded false and no list');
  it.todo('opens and closes when the button is clicked twice');
  it.todo('calls onSelect with the item text and closes');
  it.todo('stays open when the list itself is clicked');
  it.todo('does nothing on Escape while closed (focus stays put)');
  it.todo('opens and closes correctly a second time');
});
