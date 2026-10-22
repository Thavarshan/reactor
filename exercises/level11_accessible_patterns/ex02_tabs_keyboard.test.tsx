/**
 * Tests for exercises/level11_accessible_patterns/ex02_tabs_keyboard.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_tabs_keyboard
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tabs, type TabItem } from './ex02_tabs_keyboard';

const tabs: TabItem[] = [
  { label: 'Profile', content: <p>Your name and photo.</p> },
  { label: 'Security', content: <p>Change your password here.</p> },
  { label: 'Billing', content: <p>Your invoices.</p> },
];

describe('Tabs', () => {
  // Examples to get you started:
  //
  // it("selects the first tab by default", () => {
  //   render(<Tabs label="Account settings" tabs={tabs} />);
  //   expect(screen.getByRole("tablist", { name: "Account settings" })).toBeInTheDocument();
  //   expect(screen.getByRole("tab", { name: "Profile", selected: true })).toBeInTheDocument();
  //   expect(screen.getByRole("tabpanel", { name: "Profile" })).toHaveTextContent("Your name and photo.");
  // });
  //
  // it("moves focus and selection with ArrowRight", async () => {
  //   const user = userEvent.setup();
  //   render(<Tabs label="Account settings" tabs={tabs} />);
  //   await user.click(screen.getByRole("tab", { name: "Profile" }));
  //   await user.keyboard("{ArrowRight}");
  //   const security = screen.getByRole("tab", { name: "Security" });
  //   expect(security).toHaveFocus();
  //   expect(security).toHaveAttribute("aria-selected", "true");
  // });

  it.todo('selects the tab at defaultIndex first');
  it.todo('selects a tab when it is clicked');
  it.todo('gives only the selected tab tabIndex 0');
  it.todo('links the tab and the panel with ids both ways');
  it.todo('shows exactly one tabpanel');
  it.todo('wraps ArrowRight from the last tab to the first');
  it.todo('wraps ArrowLeft from the first tab to the last');
  it.todo('jumps to the first and last tab with Home and End');
  it.todo('calls preventDefault for the four handled keys only');
  it.todo('ignores other keys');
  it.todo('moves focus from the selected tab to the panel with Tab');
  it.todo('gives two Tabs on one page different ids');
});
