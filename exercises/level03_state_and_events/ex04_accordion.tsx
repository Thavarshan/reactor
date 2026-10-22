/**
 * Exercise: Accordion
 * Level:    03 - State and Events
 * Topics:   storing an id in state, aria-expanded, aria-controls, hidden, useId
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <Accordion>: a stack of sections where clicking a title opens
 * that section's content. Only ONE section can be open at a time, so
 * opening one closes the others.
 *
 *     [ Shipping ]
 *     [ Returns  ]                 click "Returns"
 *       Return within 30 days.     <- open
 *     [ Warranty ]
 *
 *     <Accordion sections={faq} defaultOpenId="returns" />
 *
 * ========================================================================
 * BACKGROUND: WHAT TO PUT IN STATE
 * ========================================================================
 * You could give every section its own `isOpen` boolean. But "only one
 * open at a time" would then mean updating several booleans on every
 * click, and they could disagree. Look for the SMALLEST state that
 * describes the screen. Here, that's "which section is open, if any":
 * one id, or null for "none". Each section works out whether it's open
 * by comparing its own id with that one.
 *
 * The WAI-ARIA accordion pattern (a well known recipe for accessible
 * widgets) says each title is a <button> inside a heading, and that
 * button tells screen readers about its panel with two attributes:
 *
 *     aria-expanded="true"       the panel it controls is open
 *     aria-controls="panel-id"   the id of that panel
 *
 * The panel is a role="region" named after its button with
 * aria-labelledby="button-id". The HTML `hidden` attribute hides an
 * element completely, from eyes and screen readers alike.
 *
 * Ids must be unique on the whole page. Section ids like "shipping" are
 * only unique INSIDE one accordion, so put a prefix from React's
 * `useId()` in front of them.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * For each section, in order:
 * - A <button type="button"> named by the section's title, inside an
 *   <h3> (role "heading", level 3).
 * - On the button: aria-expanded="true" or "false", and aria-controls
 *   set to the id of its panel.
 * - The panel: an element with role="region", that id, and
 *   aria-labelledby pointing at the button, so it's found with
 *   getByRole("region", { name: "Returns" }). It holds `content`.
 * - Closed panels STAY on the page with the `hidden` attribute, so
 *   aria-controls always points at a real element. Hidden elements are
 *   skipped by getByRole, so a closed panel isn't found as a "region".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render one heading + button + panel per section, in order.
 * 2. Start with the `defaultOpenId` section open, or all closed when it
 *    is missing (default null).
 * 3. Open a closed section when its button is clicked, and close any
 *    other open section.
 * 4. Close an open section when its own button is clicked again, leaving
 *    all closed.
 * 5. Keep aria-expanded and the panel's `hidden` attribute in step with
 *    what's open.
 * 6. Use ids that are unique even with two accordions on one page, and
 *    keep each accordion's open section separate.
 *
 * You can assume:
 * - Section ids are unique within one `sections` list.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <Accordion sections={faq} />
 *       all closed, no region found, every aria-expanded is "false"
 *       click "Shipping"  ->  Shipping open
 *       click "Returns"   ->  Returns open, Shipping closed   one at a time
 *       click "Returns"   ->  all closed                      click to close
 *
 *     <Accordion sections={faq} defaultOpenId="returns" />
 *       Returns open from the start
 *
 *     two accordions with the same sections
 *       every id on the page is different, and opening "Shipping" in the
 *       first leaves the second alone
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Each title is a button inside a level-3 heading
 * - All closed at first: aria-expanded "false", no region found, content
 *   not visible
 * - defaultOpenId opens that section
 * - Clicking a title opens it, and its content is visible
 * - Opening a second section closes the first (only one region found)
 * - Clicking the open section's title closes it
 * - Every button's aria-controls points at an element with
 *   role="region", and the open one is the region named after it
 * - A closed panel is on the page, not visible, and holds its content
 * - Two accordions: all ids are unique, and they open independently
 * - sections={[]}: no buttons
 * - Keyboard: Tab to the first title, Enter opens it
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. `const [openId, setOpenId] = useState<string | null>(defaultOpenId);`
 * 2. In the map, `const isOpen = section.id === openId;`. Clicking sets
 *    openId to `isOpen ? null : section.id`.
 * 3. Call `useId()` ONCE at the top (hooks can't go inside a loop) and
 *    build ids from it: `${prefix}-panel-${section.id}`.
 * 4. React renders `hidden={true}` as the attribute and leaves it out
 *    for `hidden={false}`. Same for `aria-expanded={isOpen}`, which
 *    becomes "true" or "false".
 * 5. TESTING: `toBeVisible()` is false for elements with `hidden` (or
 *    inside one). To follow aria-controls, read the attribute and look
 *    the element up:
 *    `document.getElementById(button.getAttribute("aria-controls")!)`.
 * 6. TESTING: to check ids are unique, collect them with
 *    `container.querySelectorAll("[id]")` and compare
 *    `new Set(ids).size` with `ids.length`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Choosing the smallest state: one id instead of many booleans
 * - Deriving each item's "open" from that one value
 * - Rendering lists with keys
 * - useId for unique, linked ids
 * - aria-expanded, aria-controls, role="region", hidden
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add an `allowMultiple` prop that lets several sections be open.
 *   What should the state look like then?
 * - Add keyboard support from the WAI-ARIA pattern: ArrowDown and
 *   ArrowUp move focus between the titles, Home and End jump to the
 *   first and last.
 */

import type { ReactNode } from 'react';
import { type ReactElement } from 'react';

export type AccordionSection = {
  /** Unique within this accordion, e.g. "shipping". */
  id: string;
  /** The text on the section's button. */
  title: string;
  /** What the panel shows when open. */
  content: ReactNode;
};

export type AccordionProps = {
  /** The sections, in order. */
  sections: AccordionSection[];
  /** The id of the section that starts open. Default null (all closed). */
  defaultOpenId?: string | null;
};

export function Accordion({
  sections,
  defaultOpenId = null,
}: AccordionProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Accordion');
}
