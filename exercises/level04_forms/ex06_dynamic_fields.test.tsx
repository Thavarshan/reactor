/**
 * Tests for exercises/level04_forms/ex06_dynamic_fields.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_dynamic_fields
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EmailListForm } from './ex06_dynamic_fields';

describe('EmailListForm', () => {
  // Examples to get you started:
  //
  // it("starts with one field whose remove button is disabled", () => {
  //   render(<EmailListForm onSubmit={vi.fn()} />);
  //   expect(screen.getAllByRole("textbox")).toHaveLength(1);
  //   expect(screen.getByRole("button", { name: "Remove email 1" })).toBeDisabled();
  // });
  //
  // it("adds a second field", async () => {
  //   const user = userEvent.setup();
  //   render(<EmailListForm onSubmit={vi.fn()} />);
  //   await user.click(screen.getByRole("button", { name: "Add email" }));
  //   expect(screen.getByRole("textbox", { name: "Email 2" })).toHaveValue("");
  // });

  it.todo("starts with one empty 'Email 1' and a disabled remove button");
  it.todo("adds 'Email 2' and enables both remove buttons");
  it.todo("disables 'Add email' at max");
  it.todo('removes the middle row, keeping the other texts and renumbering');
  it.todo('disables the last remove button when one field is left');
  it.todo('submits the non-empty values in order');
  it.todo(
    "shows the alert and doesn't call onSubmit when every field is empty",
  );
  it.todo('removes the alert after a good submit');
  it.todo("prevents the browser's default submit");
});
