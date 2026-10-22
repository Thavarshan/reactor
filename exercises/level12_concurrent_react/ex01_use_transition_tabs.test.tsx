/**
 * Tests for exercises/level12_concurrent_react/ex01_use_transition_tabs.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_use_transition_tabs
 */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { createSlowContent, TransitionTabs } from './ex01_use_transition_tabs';

describe('TransitionTabs', () => {
  // Examples to get you started:
  //
  // it("selects the first tab by default", () => {
  //   render(
  //     <TransitionTabs
  //       tabs={[
  //         { id: "about", label: "About", content: <p>About us</p> },
  //         { id: "contact", label: "Contact", content: <p>Write to us</p> },
  //       ]}
  //     />,
  //   );
  //   expect(screen.getByRole("tab", { name: "About" })).toHaveAttribute("aria-selected", "true");
  //   expect(screen.getByRole("tabpanel")).toHaveTextContent("About us");
  // });
  //
  // it("keeps the old panel while a slow tab gets ready", async () => {
  //   const user = userEvent.setup();
  //   const posts = createSlowContent("All posts");
  //   render(
  //     <TransitionTabs
  //       tabs={[
  //         { id: "about", label: "About", content: <p>About us</p> },
  //         { id: "posts", label: "Posts", content: posts.content },
  //       ]}
  //     />,
  //   );
  //   await act(() => user.click(screen.getByRole("tab", { name: "Posts" })));
  //   expect(screen.getByRole("status")).toHaveTextContent("Switching tabs...");
  //   expect(screen.getByRole("tabpanel")).toHaveTextContent("About us");
  //
  //   await act(async () => posts.finish());
  //   expect(screen.getByRole("tabpanel")).toHaveTextContent("All posts");
  // });

  it.todo(
    'selects the first tab and shows its panel when there is no defaultTabId',
  );
  it.todo('starts on defaultTabId');
  it.todo('switches to a fast tab right away and leaves no status behind');
  it.todo('keeps the old panel and old selection while a slow tab gets ready');
  it.todo('does not show the Loading tab... fallback during the switch');
  it.todo(
    'shows the new panel, moves the selection and removes the status when ready',
  );
  it.todo('shows the Loading tab... fallback when the FIRST tab is slow');
});
