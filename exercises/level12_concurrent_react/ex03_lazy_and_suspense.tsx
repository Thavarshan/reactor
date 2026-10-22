/**
 * Exercise: Load panels only when needed (lazy and Suspense)
 * Level:    12 - Concurrent React
 * Topics:   React.lazy, dynamic import(), Suspense fallbacks, code splitting
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build two things:
 *
 * - <LazyTabs>: tabs where each tab's panel is a component that may
 *   still be loading. While it loads, show "Loading <label>...".
 * - LazySalesChart and LazySalesTable: "lazy" versions of the two
 *   panels in ex03_report_panels.tsx, so that file is only downloaded
 *   the first time a panel is shown.
 *
 *     [ Chart ] [ Table ]
 *     +--------------------------+
 *     | Loading Chart...         |   <- first time only
 *     +--------------------------+
 *
 *     <LazyTabs tabs={[
 *       { label: "Chart", Component: LazySalesChart },
 *       { label: "Table", Component: LazySalesTable },
 *     ]} />
 *
 * ========================================================================
 * BACKGROUND: LAZY COMPONENTS
 * ========================================================================
 * Normally every component you import is bundled into one big file that
 * the browser downloads before showing anything. A dynamic import()
 * loads a file LATER, when your code asks for it. It returns a Promise
 * of the file's exports:
 *
 *     const module = await import("./big-editor");
 *     module.Editor;   // the named export
 *
 * React.lazy turns such a loader into a component. React calls the
 * loader the first time the component is drawn, and remembers the
 * result after that. The loader must give back an object with a
 * `default` property:
 *
 *     // big-editor.tsx has `export default function Editor() {...}`
 *     const LazyEditor = lazy(() => import("./big-editor"));
 *
 * Until the file has loaded, a lazy component "suspends" (it says "I'm
 * not ready yet"). The nearest <Suspense fallback={...}> above it shows
 * the fallback instead:
 *
 *     <Suspense fallback={<p>Loading editor...</p>}>
 *       <LazyEditor />
 *     </Suspense>
 *
 * Call lazy() ONCE, at the top level of a file. Never call it inside a
 * component: you'd get a brand new lazy component on every render.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * <LazyTabs> renders:
 * - An element with role="tablist" around the tab buttons.
 * - One <button role="tab"> per tab, named by its `label`. The selected
 *   tab has aria-selected="true", the others aria-selected="false".
 * - One element with role="tabpanel" holding the selected tab's
 *   component.
 * - While that component loads: <p role="status">Loading Chart...</p>
 *   (with the selected tab's label instead of "Chart").
 *
 * The provided panels render a heading "Sales chart" (SalesChart) and a
 * heading "Sales table" plus a table (SalesTable).
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your code must:
 * 1. LazyTabs: accept `tabs`, an array of { label, Component }. Start
 *    with the first tab selected.
 * 2. Render one tab button per tab, in order, with aria-selected.
 * 3. Render ONLY the selected tab's Component, inside a <Suspense>
 *    inside the tabpanel. The fallback is the "Loading <label>..."
 *    status. Tabs that were never selected never start loading.
 * 4. Select a tab when it is clicked.
 * 5. LazySalesChart and LazySalesTable: use lazy() with a dynamic
 *    import() of "./ex03_report_panels". Create them at the top level
 *    of this file.
 *
 * You can assume:
 * - `tabs` has at least one tab, and every label is unique.
 * - `tabs` doesn't change while the component is on screen.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     first render            ->  "Loading Chart..."   (Chart is loading)
 *     the chart loads         ->  heading "Sales chart"
 *     click "Table"           ->  "Loading Table..."   (first time)
 *     the table loads         ->  heading "Sales table" and a table
 *     click "Chart"           ->  heading "Sales chart" at once,
 *                                 no fallback          (already loaded)
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - The first tab is selected and its fallback names it
 * - The panel shows once its component has loaded
 * - A tab that is never clicked never starts loading
 * - Clicking another tab shows THAT tab's fallback, then its panel
 * - Going back to a loaded tab shows it straight away, with no fallback
 * - LazySalesChart and LazySalesTable really load the provided panels
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Keep the selected INDEX (or label) in state, and pick the tab with
 *    `tabs[selectedIndex]`. A component stored in a variable must start
 *    with a capital letter to be used in JSX:
 *    `const Panel = tabs[selectedIndex].Component;` then `<Panel />`.
 * 2. The provided panels are NAMED exports, but lazy() wants a
 *    `default`. Rename it on the way in:
 *        lazy(() => import("./x").then((m) => ({ default: m.Thing })))
 * 3. TESTING: lazy() remembers what it loaded for as long as the test
 *    file runs. So LazySalesChart only shows its fallback in the FIRST
 *    test that draws it. For the real panels, just wait for the result:
 *        expect(await screen.findByRole("heading", { name: "Sales chart" })).toBeInTheDocument();
 * 4. TESTING: for full control, make your own lazy components in each
 *    test. A loader whose Promise you resolve by hand lets you see the
 *    fallback, and `vi.fn` tells you whether it was ever called:
 *
 *        let finishChart!: (m: { default: ComponentType }) => void;
 *        const loadChart = vi.fn(
 *          () => new Promise<{ default: ComponentType }>((resolve) => { finishChart = resolve; }),
 *        );
 *        const Chart = lazy(loadChart);
 *        await act(async () => {
 *          render(<LazyTabs tabs={[{ label: "Chart", Component: Chart }]} />);
 *        });
 *        // fallback is showing here
 *        await act(async () => finishChart({ default: () => <h2>My chart</h2> }));
 *
 * 5. TESTING: when a tab is replaced by a fallback, React may keep the
 *    old panel in the page but hidden (display: none). getByRole skips
 *    hidden elements, while getByText does NOT. Prefer getByRole, or
 *    check `.not.toBeVisible()`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - React.lazy and dynamic import(): code splitting
 * - Suspense fallbacks for code that is still loading
 * - Why lazy() belongs at the top level of a file
 * - A component stored in a variable (capitalised) and rendered in JSX
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Switch tabs inside startTransition, so a loaded panel stays on
 *   screen while the next one loads (see ex01).
 * - Preload: start loading a tab's file when the mouse moves over its
 *   button (call the import() early, React.lazy reuses the result).
 * - If a file fails to load, show "Could not load Chart." with an error
 *   boundary (a component that catches errors thrown below it).
 */

import { ComponentType, type ReactElement } from "react";

export type LazyTab = {
  /** The text on the tab button. Also used in "Loading <label>...". */
  label: string;
  /** The panel to show. Usually a lazy component. */
  Component: ComponentType;
};

export type LazyTabsProps = {
  /** The tabs, in order. There is at least one. */
  tabs: LazyTab[];
};

export function LazyTabs({ tabs }: LazyTabsProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: LazyTabs");
}

/** The SalesChart panel, loaded only when it is first shown. */
export const LazySalesChart: ComponentType = function LazySalesChart(): never {
  // TODO: replace this whole function with lazy(...), then make your tests pass.
  throw new Error("Not implemented: LazySalesChart");
};

/** The SalesTable panel, loaded only when it is first shown. */
export const LazySalesTable: ComponentType = function LazySalesTable(): never {
  // TODO: replace this whole function with lazy(...), then make your tests pass.
  throw new Error("Not implemented: LazySalesTable");
};
