/**
 * Tests for exercises/level05_sharing_state/ex04_controlled_tabs.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_controlled_tabs
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { type Tab, Tabs } from "./ex04_controlled_tabs";

const TABS: Tab[] = [
  { id: "profile", label: "Profile", content: "Your name and photo." },
  { id: "billing", label: "Billing", content: "Your billing details." },
  { id: "security", label: "Security", content: "Your password." },
];

describe("Tabs", () => {
  // Examples to get you started:
  //
  // it("selects the first tab by default", () => {
  //   render(<Tabs label="Settings" tabs={TABS} />);
  //   expect(screen.getByRole("tab", { name: "Profile" })).toHaveAttribute("aria-selected", "true");
  //   expect(screen.getByRole("tabpanel")).toHaveTextContent("Your name and photo.");
  // });
  //
  // it("doesn't move by itself when controlled", async () => {
  //   const user = userEvent.setup();
  //   const onChange = vi.fn();
  //   render(<Tabs label="Settings" tabs={TABS} value="profile" onChange={onChange} />);
  //   await user.click(screen.getByRole("tab", { name: "Billing" }));
  //   expect(onChange).toHaveBeenCalledWith("billing");
  //   expect(screen.getByRole("tab", { name: "Profile" })).toHaveAttribute("aria-selected", "true");
  // });

  it.todo("selects the first tab and shows one panel without defaultValue");
  it.todo("starts on defaultValue");
  it.todo("switches tabs on click and calls onChange when uncontrolled");
  it.todo("doesn't call onChange when the selected tab is clicked");
  it.todo("keeps the selection when controlled with a fixed value");
  it.todo("follows a parent's state, including changes from outside");
  it.todo("names the panel after the selected tab and links them both ways");
  it.todo("works without onChange");
});

// A parent that controls the tabs, for the "follows a parent's state" test.
// Uncomment it when you write that test, and render <ControlledParent />.
//
// function ControlledParent() {
//   const [tab, setTab] = useState("profile");
//   return (
//     <>
//       <Tabs label="Settings" tabs={TABS} value={tab} onChange={setTab} />
//       <button type="button" onClick={() => setTab("profile")}>
//         Back to profile
//       </button>
//     </>
//   );
// }
