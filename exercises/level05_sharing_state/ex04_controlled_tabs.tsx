/**
 * Exercise: Controlled Tabs
 * Level:    05 - Sharing State
 * Topics:   controlled vs uncontrolled components, value + onChange,
 *           defaultValue, ARIA tabs
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Tabs> component that works in two ways. Left alone, it
 * remembers the selected tab itself (uncontrolled). Given a `value`
 * prop, it shows whatever the parent says and only REPORTS clicks
 * through `onChange` (controlled).
 *
 *     [ Profile ] [ Billing ] [ Security ]
 *     -------------------------------------
 *     Your billing details.
 *
 *     <Tabs label="Settings" tabs={tabs} defaultValue="billing" />
 *     <Tabs label="Settings" tabs={tabs} value={tab} onChange={setTab} />
 *
 * ========================================================================
 * BACKGROUND: CONTROLLED AND UNCONTROLLED
 * ========================================================================
 * You have already met both kinds, in plain HTML inputs:
 *
 *     <input defaultValue="hi" />                  uncontrolled
 *     <input value={text} onChange={...} />        controlled
 *
 * An UNCONTROLLED component keeps its own state. The parent can only
 * pick the starting value (`defaultValue`) and then lets go.
 *
 * A CONTROLLED component keeps no state for that value. The parent
 * owns it and passes it down as `value`. When the user does something,
 * the component calls `onChange` with what it WANTS the new value to be,
 * and the parent decides whether to pass that back down.
 *
 * Many good components support both. The trick is one line that picks
 * where the current value comes from:
 *
 *     const isControlled = value !== undefined;
 *     const current = isControlled ? value : ownState;
 *
 * A controlled component lets the parent do things like save the tab
 * in the URL, change it from a "Next" button, or refuse a change.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - An element with role="tablist" and aria-label set to the `label`
 *   prop.
 * - Inside it, one <button role="tab"> per tab, named by its `label`.
 *   Each has aria-selected="true" when selected, otherwise "false".
 * - ONE element with role="tabpanel" showing the selected tab's
 *   `content`. Give the selected tab an `id`, and the panel
 *   aria-labelledby with that id, so the panel's accessible name is the
 *   tab's label. Give the tab aria-controls with the panel's id.
 *   (useId() helps make unique ids.)
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render the tabs in order, and only the selected tab's panel.
 * 2. Uncontrolled (no `value` prop): start on `defaultValue`, or on the
 *    first tab when there is no `defaultValue`. Switch tabs when one is
 *    clicked.
 * 3. Controlled (`value` is passed): always show the tab whose id is
 *    `value`. A click does NOT switch tabs by itself. When the parent
 *    passes a new `value`, show that tab.
 * 4. In both modes, call the optional `onChange` with the clicked tab's
 *    id, but NOT when the clicked tab is already selected.
 *
 * You can assume:
 * - `tabs` has at least one tab, and the ids are unique.
 * - `value` and `defaultValue`, when given, are ids of tabs in `tabs`.
 * - A Tabs component never switches between controlled and
 *   uncontrolled while it is on screen.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <Tabs label="Settings" tabs={TABS} />
 *       "Profile" selected, the panel shows its content
 *       click "Billing"  ->  "Billing" selected, its panel shown
 *
 *     <Tabs label="Settings" tabs={TABS} value="profile" onChange={spy} />
 *       click "Billing"  ->  spy("billing"), but "Profile" STAYS selected
 *                            because the parent didn't change `value`
 *
 *     a parent with useState that passes value={tab} onChange={setTab}
 *       click "Security"  ->  "Security" selected
 *       the parent's own "Back to profile" button sets tab to "profile"
 *                         ->  "Profile" selected
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No defaultValue: the first tab is selected, one panel is shown
 * - defaultValue picks the starting tab
 * - Uncontrolled: clicking switches tabs and calls onChange
 * - Clicking the selected tab does NOT call onChange
 * - Controlled with a fixed value: clicking calls onChange, but the
 *   selection doesn't move
 * - Controlled by a parent with state: clicks switch tabs, and the
 *   parent can switch tabs from outside
 * - The panel is named by the selected tab (aria-labelledby), and the
 *   selected tab's aria-controls points at the panel
 * - Works without onChange (no crash when clicking)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Always create the inner state, even when controlled (hooks can't
 *    be called conditionally):
 *    `const [inner, setInner] = useState(defaultValue ?? tabs[0].id)`.
 * 2. Then `const selected = value !== undefined ? value : inner`.
 * 3. In the click handler: do nothing if the tab is already selected.
 *    Otherwise, update `inner` only when uncontrolled, and call
 *    `onChange?.(id)` either way.
 * 4. Only the selected tab gets the id the panel points to, so an id
 *    like `${baseId}-tab-${tab.id}` per tab is fine.
 * 5. TESTING the controlled case with state: write a tiny wrapper
 *    component inside your test file that holds `useState` and renders
 *    <Tabs value={tab} onChange={setTab} />, plus a plain <button> that
 *    calls setTab("profile"). The test file already has one for you,
 *    called ControlledParent: uncomment it.
 *    `expect(tab).toHaveAttribute("aria-selected", "true")` checks the
 *    selection.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Controlled vs uncontrolled components
 * - `value` + `onChange` vs `defaultValue`
 * - Letting the parent own state when it needs to
 * - The ARIA tab pattern: tablist, tab, tabpanel, aria-selected
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Arrow keys move between tabs (level 11 covers this in depth).
 * - Add a `disabled` flag per tab.
 * - Warn in the console if a component switches from uncontrolled to
 *   controlled, like React does for inputs.
 */

import type { ReactNode } from 'react';
import { type ReactElement } from 'react';

export type Tab = {
  /** A unique id, used by `value`, `defaultValue` and `onChange`. */
  id: string;
  /** The text on the tab button. */
  label: string;
  /** What the panel shows when this tab is selected. */
  content: ReactNode;
};

export type TabsProps = {
  /** The tabs, in display order. */
  tabs: Tab[];
  /** The accessible name of the tablist, like "Settings". */
  label: string;
  /** Controlled mode: the id of the selected tab. */
  value?: string;
  /** Uncontrolled mode: the id of the tab selected at first. Default: the first tab. */
  defaultValue?: string;
  /** Called with the id of a clicked tab that wasn't already selected. */
  onChange?: (id: string) => void;
};

export function Tabs({
  tabs,
  label,
  value,
  defaultValue,
  onChange,
}: TabsProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Tabs');
}
