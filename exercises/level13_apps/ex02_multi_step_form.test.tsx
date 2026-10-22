/**
 * Tests for exercises/level13_apps/ex02_multi_step_form.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_multi_step_form
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MultiStepForm } from './ex02_multi_step_form';

describe('MultiStepForm', () => {
  // Examples to get you started:
  //
  // it("starts on step 1", () => {
  //   render(<MultiStepForm onSubmit={vi.fn()} />);
  //   expect(screen.getByRole("heading", { name: "Step 1 of 3: Account" })).toBeInTheDocument();
  // });
  //
  // it("shows linked errors for an empty step 1", async () => {
  //   const user = userEvent.setup();
  //   render(<MultiStepForm onSubmit={vi.fn()} />);
  //   await user.click(screen.getByRole("button", { name: "Next" }));
  //   expect(screen.getByLabelText("Email")).toHaveAccessibleDescription("Email is required");
  //   expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  // });

  it.todo('starts on step 1 with Free checked and no errors');
  it.todo('shows both errors, linked to their fields, for an empty step 1');
  it.todo('asks for a valid email when there is no @');
  it.todo('rejects a 7-character password and accepts an 8-character one');
  it.todo('shows no errors while typing, only after Next');
  it.todo('goes to step 2 and focuses its heading when step 1 is valid');
  it.todo("requires a name on step 2, and spaces only don't count");
  it.todo('keeps the values when going Back');
  it.todo('shows the values on the review step, but not the password');
  it.todo(
    'calls onSubmit once with trimmed data, then shows the welcome heading',
  );
  it.todo('does not call onSubmit when the form is submitted on step 1 or 2');
});
