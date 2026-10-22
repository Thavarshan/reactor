/**
 * Tests for exercises/level03_state_and_events/ex02_toggle_switch.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_toggle_switch
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ToggleSwitch } from './ex02_toggle_switch';

describe('ToggleSwitch', () => {
  // Examples to get you started:
  //
  // it("starts off by default", () => {
  //   render(<ToggleSwitch label="Dark mode" />);
  //   expect(screen.getByRole("switch", { name: "Dark mode" })).toHaveAttribute(
  //     "aria-checked",
  //     "false",
  //   );
  // });
  //
  // it("turns on when clicked", async () => {
  //   const user = userEvent.setup();
  //   render(<ToggleSwitch label="Dark mode" />);
  //   await user.click(screen.getByRole("switch", { name: "Dark mode" }));
  //   expect(screen.getByRole("switch", { name: "Dark mode", checked: true })).toBeInTheDocument();
  // });

  it.todo('shows the label text on screen');
  it.todo('starts on with defaultChecked');
  it.todo('toggles on and off when clicked twice');
  it.todo('is a type=button button that never submits a form');
  it.todo('calls onChange with the new value, but not on the first render');
  it.todo('toggles with Space and Enter from the keyboard');
  it.todo('ignores clicks when disabled');
  it.todo('keeps two switches independent');
});
