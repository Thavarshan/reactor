/**
 * Tests for exercises/level06_effects_and_refs/ex03_inline_edit.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_inline_edit
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { InlineEdit } from './ex03_inline_edit';

describe('InlineEdit', () => {
  // Examples to get you started:
  //
  // it("focuses the text box when Edit is clicked", async () => {
  //   const user = userEvent.setup();
  //   render(<InlineEdit initialValue="Buy milk" label="Task name" />);
  //   await user.click(screen.getByRole("button", { name: "Edit" }));
  //   const box = screen.getByRole("textbox", { name: "Task name" });
  //   expect(box).toHaveFocus();
  //   expect(box).toHaveValue("Buy milk");
  // });
  //
  // it("saves on Enter and focuses Edit again", async () => {
  //   const user = userEvent.setup();
  //   const onSave = vi.fn();
  //   render(<InlineEdit initialValue="Buy milk" label="Task name" onSave={onSave} />);
  //   await user.click(screen.getByRole("button", { name: "Edit" }));
  //   await user.type(screen.getByRole("textbox", { name: "Task name" }), " and eggs{Enter}");
  //   expect(onSave).toHaveBeenCalledWith("Buy milk and eggs");
  //   expect(screen.getByText("Buy milk and eggs")).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: "Edit" })).toHaveFocus();
  // });

  it.todo('shows the text and an Edit button first, and moves no focus');
  it.todo('trims spaces before saving');
  it.todo('Escape keeps the old text, skips onSave and focuses Edit');
  it.todo('Enter with a blank box keeps the old text');
  it.todo("Enter without changes doesn't call onSave");
  it.todo('editing again after Escape starts from the saved text');
  it.todo('works without an onSave prop');
});
