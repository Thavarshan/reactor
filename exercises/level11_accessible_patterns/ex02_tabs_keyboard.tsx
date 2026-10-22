/**
 * Exercise: Keyboard Tabs
 * Level:    11 - Accessible UI Patterns
 * Topics:   ARIA tabs pattern, roving tabindex, arrow keys, Home/End, useId
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build <Tabs>: a row of tabs with one panel below. Clicking a tab shows
 * its panel. A keyboard user Tabs onto the row once, then moves between
 * tabs with the arrow keys, Home and End, exactly as the WAI-ARIA
 * Authoring Practices describe.
 *
 *     Account settings
 *     [ Profile ]  [*Security*]  [ Billing ]
 *     +---------------------------------------+
 *     | Change your password here.            |
 *     +---------------------------------------+
 *
 *     <Tabs label="Account settings" tabs={[
 *       { label: "Profile", content: <p>Your name and photo.</p> },
 *       { label: "Security", content: <p>Change your password here.</p> },
 *       { label: "Billing", content: <p>Your invoices.</p> },
 *     ]} />
 *
 * ========================================================================
 * BACKGROUND: ROLES THAT DESCRIBE A WIDGET
 * ========================================================================
 * An ARIA role tells assistive technology (like a screen reader) what an
 * element is. The tabs pattern uses three:
 *
 * - role="tablist" on the row of tabs, with a name (aria-label)
 * - role="tab" on each tab, with aria-selected="true" or "false"
 * - role="tabpanel" on the content, linked both ways by ids:
 *   the tab has aria-controls="<panel id>", and the panel has
 *   aria-labelledby="<tab id>" (so its accessible name is the tab label)
 *
 * ========================================================================
 * BACKGROUND: ROVING TABINDEX
 * ========================================================================
 * The Tab key should treat the whole tab row as one stop, not one stop
 * per tab. Otherwise a page with 10 tabs needs 10 key presses to get
 * past them. The trick is called "roving tabindex":
 *
 * - The selected tab gets tabIndex={0}: Tab can reach it.
 * - Every other tab gets tabIndex={-1}: Tab skips it, but code can still
 *   focus it with `.focus()`.
 * - The arrow keys move focus (and the 0) from tab to tab.
 *
 *     <button role="tab" tabIndex={isSelected ? 0 : -1} ... />
 *
 * To focus a tab from code you need its DOM element. You can keep an
 * array of refs, or look the tab up inside the tablist:
 *
 *     const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
 *     <button ref={(el) => { tabRefs.current[i] = el; }} ... />
 *     tabRefs.current[2]?.focus();
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A tablist named `label` (<div role="tablist" aria-label={label}>).
 * - One tab per item: <button role="tab"> named by its label, with
 *   aria-selected ("true" only on the selected tab), aria-controls (the
 *   panel's id), and tabIndex 0 on the selected tab, -1 on the others.
 * - Exactly one visible tabpanel: <div role="tabpanel"> with the
 *   selected tab's content, aria-labelledby set to the selected tab's
 *   id (so its accessible name is the tab label), and tabIndex={0}.
 *   Don't render the other panels, or render them with the `hidden`
 *   attribute. Either way, tests only find the visible one.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Select tab number `defaultIndex` first (default 0).
 * 2. Clicking a tab selects it.
 * 3. With focus on a tab, these keys move focus AND select the new tab
 *    ("automatic activation"):
 *      ArrowRight  next tab, wrapping from the last to the first
 *      ArrowLeft   previous tab, wrapping from the first to the last
 *      Home        first tab
 *      End         last tab
 * 4. Call preventDefault() for those four keys (so Home and End don't
 *    scroll the page). Ignore every other key.
 * 5. Keep exactly one tab with tabIndex 0: the selected one.
 * 6. Pressing Tab from the selected tab moves focus to the panel (this
 *    happens by itself thanks to tabIndex).
 * 7. Make ids with useId, so two Tabs on one page don't clash.
 *
 * You can assume:
 * - There's at least one tab, tab labels are unique, and `defaultIndex`
 *   is a valid index.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Tabs Profile, Security, Billing:
 *
 *     first render                   ->  Profile selected, its panel shown
 *     click "Billing"                ->  Billing selected and shown
 *     focus Profile, ArrowRight      ->  Security focused and selected
 *     on Billing, ArrowRight         ->  Profile (wraps)
 *     on Profile, ArrowLeft          ->  Billing (wraps)
 *     End                            ->  Billing.   Home  ->  Profile
 *     ArrowDown                      ->  nothing happens
 *     on Security, press Tab         ->  focus moves to the Security panel
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - The tablist is named, and the first tab is selected by default
 * - defaultIndex={2} selects the third tab first
 * - Only the selected tab has tabIndex 0. The rest have -1
 * - The panel is named by its tab, and the ids link both ways
 * - Only one tabpanel is visible at a time
 * - ArrowRight and ArrowLeft move focus and selection, and wrap
 * - Home and End jump to the first and last tab
 * - Other keys (ArrowDown, "a") change nothing
 * - The four handled keys call preventDefault. Other keys don't
 * - Tab from the selected tab focuses the panel
 * - Two Tabs on one page have different ids
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One piece of state is enough: the selected index.
 * 2. Make ids from one useId: `${id}-tab-${i}` and `${id}-panel-${i}`.
 * 3. Put a single onKeyDown on the tablist. Work out the new index with
 *    a switch on `event.key`. For wrapping, `(i + 1) % count` goes
 *    forward and `(i - 1 + count) % count` goes back.
 * 4. When a key picks a new index, set the state and call `.focus()` on
 *    that tab's element.
 * 5. TESTING: put focus on a tab with `await user.click(tab)` (or
 *    `act(() => tab.focus())`), then `await user.keyboard("{ArrowRight}")`.
 *    Other keys: "{ArrowLeft}", "{Home}", "{End}".
 * 6. TESTING: `getByRole("tab", { name: "Security", selected: true })`
 *    only finds the tab if aria-selected is "true".
 * 7. TESTING: `fireEvent.keyDown(tab, { key: "End" })` returns false
 *    when your handler called preventDefault(), and true when it didn't.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - The WAI-ARIA tabs pattern: tablist, tab, tabpanel
 * - Roving tabindex for keyboard navigation inside a widget
 * - An array of refs, and focusing elements from code
 * - useId for linked ids (aria-controls / aria-labelledby)
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add an `activation` prop: "manual" means arrows only move focus,
 *   and Enter or Space selects.
 * - Support `disabled` tabs that the arrow keys skip.
 * - Add an `orientation="vertical"` option that uses ArrowUp and
 *   ArrowDown and sets aria-orientation on the tablist.
 */

import type { ReactNode } from 'react';
import { type ReactElement } from 'react';

export type TabItem = {
  /** The tab's text, which is also the panel's accessible name. */
  label: string;
  /** What the panel shows when this tab is selected. */
  content: ReactNode;
};

export type TabsProps = {
  /** The accessible name of the tab list. */
  label: string;
  /** The tabs, in order. */
  tabs: TabItem[];
  /** The index of the tab selected first. Default 0. */
  defaultIndex?: number;
};

export function Tabs({
  label,
  tabs,
  defaultIndex = 0,
}: TabsProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Tabs');
}
