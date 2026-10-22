/**
 * Tests for exercises/level11_accessible_patterns/ex01_modal_dialog.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_modal_dialog
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ModalDialog } from './ex01_modal_dialog';

describe('ModalDialog', () => {
  // Examples to get you started. First, a helper that renders a dialog
  // with two focusable children and returns the onClose spy:
  //
  // function renderProfileDialog(onClose = vi.fn()) {
  //   render(
  //     <ModalDialog triggerLabel="Edit profile" title="Edit profile" onClose={onClose}>
  //       <label>
  //         Name <input />
  //       </label>
  //       <button type="button">Save</button>
  //     </ModalDialog>,
  //   );
  //   return onClose;
  // }
  //
  // it("opens and focuses the first field", async () => {
  //   const user = userEvent.setup();
  //   renderProfileDialog();
  //   await user.click(screen.getByRole("button", { name: "Edit profile" }));
  //   expect(screen.getByRole("dialog", { name: "Edit profile" })).toHaveAttribute("aria-modal", "true");
  //   expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
  // });
  //
  // it("closes on Escape and gives focus back to the trigger", async () => {
  //   const user = userEvent.setup();
  //   renderProfileDialog();
  //   const trigger = screen.getByRole("button", { name: "Edit profile" });
  //   await user.click(trigger);
  //   await user.keyboard("{Escape}");
  //   expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  //   expect(trigger).toHaveFocus();
  // });

  it.todo('renders no dialog at first');
  it.todo('focuses Close when the children have nothing focusable');
  it.todo('wraps Tab from the last element to the first');
  it.todo('wraps Shift+Tab from the first element to the last');
  it.todo('keeps focus on Close when it is the only focusable element');
  it.todo('closes with the Close button and focuses the trigger');
  it.todo('calls onClose once per close, and not when opening');
  it.todo('can be opened again, and focus moves in again');
  it.todo('gives two dialogs on one page different ids');
});
