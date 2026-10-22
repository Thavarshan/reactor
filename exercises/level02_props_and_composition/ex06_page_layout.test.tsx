/**
 * Tests for exercises/level02_props_and_composition/ex06_page_layout.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_page_layout
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PageLayout } from './ex06_page_layout';

describe('PageLayout', () => {
  // Examples to get you started:
  //
  // it("puts children in the main landmark", () => {
  //   render(<PageLayout>Content</PageLayout>);
  //   expect(screen.getByRole("main")).toHaveTextContent("Content");
  // });
  //
  // it("makes the skip link the first thing Tab reaches", async () => {
  //   const user = userEvent.setup();
  //   render(<PageLayout header={<a href="/">Home</a>}>Content</PageLayout>);
  //   await user.tab();
  //   expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveFocus();
  //   await user.tab();
  //   expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
  // });

  it.todo('renders every slot inside its landmark');
  it.todo('leaves out missing or null landmarks, but always renders main');
  it.todo('names the navigation Sidebar by default, or sidebarLabel');
  it.todo('orders landmarks banner, navigation, main, contentinfo');
  it.todo(
    'has a skip link to #main-content, and main has the id and tabindex -1',
  );
  it.todo('does not put main itself in the Tab order');
  it.todo('adds the with-sidebar class only when there is a sidebar');
});
