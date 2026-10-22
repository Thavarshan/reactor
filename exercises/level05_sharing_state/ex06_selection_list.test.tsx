/**
 * Tests for exercises/level05_sharing_state/ex06_selection_list.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_selection_list
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { CONTACTS, ContactManager } from './ex06_selection_list';

describe('ContactManager', () => {
  // Examples to get you started:
  //
  // it("asks you to select a contact at first", () => {
  //   render(<ContactManager initialContacts={CONTACTS} />);
  //   const details = screen.getByRole("region", { name: "Details" });
  //   expect(within(details).getByText("Select a contact")).toBeInTheDocument();
  // });
  //
  // it("shows edits in the list and the heading", async () => {
  //   const user = userEvent.setup();
  //   render(<ContactManager initialContacts={CONTACTS} />);
  //   await user.click(screen.getByRole("button", { name: "Grace Hopper" }));
  //   await user.type(screen.getByRole("textbox", { name: "Name" }), " B.");
  //   expect(screen.getByRole("button", { name: "Grace Hopper B." })).toBeInTheDocument();
  //   expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Grace Hopper B.");
  // });

  it.todo('lists every contact, none pressed, and has no edit boxes at first');
  it.todo("presses only the selected contact's button and fills the panel");
  it.todo(
    'updates the list button and the heading live while editing the name',
  );
  it.todo('updates the email text while editing the email');
  it.todo("shows the other contact's values after switching");
  it.todo('keeps edits after switching away and back');
  it.todo("deletes the contact and shows 'Select a contact'");
  it.todo("shows '(no name)' for an empty name");
});
