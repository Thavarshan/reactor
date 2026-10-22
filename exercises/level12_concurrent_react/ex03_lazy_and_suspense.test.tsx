/**
 * Tests for exercises/level12_concurrent_react/ex03_lazy_and_suspense.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_lazy_and_suspense
 */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lazy, type ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  LazySalesChart,
  LazySalesTable,
  LazyTabs,
} from './ex03_lazy_and_suspense';

describe('LazyTabs', () => {
  // Examples to get you started:
  //
  // it("shows the fallback, then the panel", async () => {
  //   let finish!: (m: { default: ComponentType }) => void;
  //   const Chart = lazy(() => new Promise<{ default: ComponentType }>((resolve) => { finish = resolve; }));
  //   await act(async () => {
  //     render(<LazyTabs tabs={[{ label: "Chart", Component: Chart }]} />);
  //   });
  //   expect(screen.getByRole("status")).toHaveTextContent("Loading Chart...");
  //
  //   await act(async () => finish({ default: () => <h2>My chart</h2> }));
  //   expect(screen.getByRole("heading", { name: "My chart" })).toBeInTheDocument();
  // });
  //
  // it("loads the real sales chart", async () => {
  //   render(<LazyTabs tabs={[{ label: "Chart", Component: LazySalesChart }]} />);
  //   expect(await screen.findByRole("heading", { name: "Sales chart" })).toBeInTheDocument();
  // });

  it.todo('selects the first tab, and its fallback names it');
  it.todo('shows the panel once its component has loaded');
  it.todo('never starts loading a tab that is never clicked');
  it.todo("shows the clicked tab's own fallback, then its panel");
  it.todo('shows an already loaded tab straight away, with no fallback');
  it.todo('loads the real SalesChart and SalesTable panels');
});
