/**
 * Tests for exercises/level05_sharing_state/ex01_temperature_converter.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_temperature_converter
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import {
  TemperatureConverter,
  TemperatureInput,
} from './ex01_temperature_converter';

describe('TemperatureInput', () => {
  // Example to get you started:
  //
  // it("shows its value, named by its label", () => {
  //   render(<TemperatureInput label="Celsius" value="20" onChange={vi.fn()} />);
  //   expect(screen.getByRole("textbox", { name: "Celsius" })).toHaveValue("20");
  // });

  it.todo('calls onChange with the new text on every keystroke');
});

describe('TemperatureConverter', () => {
  // Example to get you started:
  //
  // it("converts Celsius to Fahrenheit", async () => {
  //   const user = userEvent.setup();
  //   render(<TemperatureConverter />);
  //   await user.type(screen.getByRole("textbox", { name: "Celsius" }), "100");
  //   expect(screen.getByRole("textbox", { name: "Fahrenheit" })).toHaveValue("212");
  // });

  it.todo('starts with both boxes empty and no alert');
  it.todo('converts Celsius to Fahrenheit (37 -> 98.6, -40 -> -40)');
  it.todo('converts Fahrenheit to Celsius (212 -> 100, 0 -> -17.8)');
  it.todo('keeps the exact text in the box being typed in');
  it.todo(
    "shows an alert and empties the other box for text that isn't a number",
  );
  it.todo(
    'empties the other box, without an alert, for empty or space-only text',
  );
  it.todo('removes the alert once the input is fixed');
  it.todo('follows whichever box was typed in last');
});
