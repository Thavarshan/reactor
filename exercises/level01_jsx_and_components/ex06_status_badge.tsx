/**
 * Exercise: Status Badge
 * Level:    01 - JSX and Components
 * Topics:   lookup objects, className from data, fallbacks, normalising input
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <StatusBadge> that turns an account status from a server, such
 * as "active", into a small coloured label. The status picks both the
 * text and the CSS classes. Anything it doesn't recognise shows a grey
 * "Unknown" badge instead of crashing or showing nonsense.
 *
 *     ( Active )   ( Pending )   ( Suspended )   ( Unknown )
 *       green        yellow          red            grey
 *
 *     <StatusBadge status="active" />
 *
 * ========================================================================
 * BACKGROUND: LOOKUP OBJECTS INSTEAD OF IF CHAINS
 * ========================================================================
 * When one value decides several others, a long `if / else if` chain
 * gets hard to read. A LOOKUP OBJECT keeps all the choices in one place:
 *
 *     const SIZES = {
 *       s: { label: "Small",  className: "tag tag-s" },
 *       m: { label: "Medium", className: "tag tag-m" },
 *     };
 *
 *     const size = SIZES["m"];        // { label: "Medium", ... }
 *     const nope = SIZES["xl"];       // undefined: no such key
 *
 * Data from a server can't be trusted to be tidy. It might arrive as
 * "Medium", " m " or something brand new. So you NORMALISE it first
 * (trim spaces, make it lower case), and you plan a FALLBACK for anything
 * you don't recognise.
 *
 * One more trap. Every plain object quietly inherits a few built-in
 * properties from JavaScript itself, such as `toString` and
 * `constructor`:
 *
 *     SIZES["toString"]   // a function, NOT undefined!
 *
 * So "is this key one of mine?" needs a careful check. `key in SIZES` is
 * fooled too. `Object.hasOwn(SIZES, key)` only looks at the keys you
 * wrote yourself.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find this element by its text, then check its classes. Your
 * component must render:
 *
 * - A single <span> whose text is exactly the label, and whose className
 *   is exactly "badge" plus the colour class from this table:
 *
 *     status        text          className
 *     "active"      "Active"      "badge badge-green"
 *     "pending"     "Pending"     "badge badge-yellow"
 *     "suspended"   "Suspended"   "badge badge-red"
 *     anything else "Unknown"     "badge badge-grey"
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept a `status` prop (any string).
 * 2. Ignore spaces around the status and upper or lower case, so
 *    " Active ", "ACTIVE" and "active" all count as "active".
 * 3. Render a <span> with the label and classes from the table above.
 * 4. Use the "Unknown" badge for any other status, including "",
 *    "deleted", and the names of built-in object properties such as
 *    "constructor" and "toString".
 *
 * You can assume:
 * - `status` is always a string.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <StatusBadge status="active" />       "Active"    badge badge-green
 *     <StatusBadge status="pending" />      "Pending"   badge badge-yellow
 *     <StatusBadge status="suspended" />    "Suspended" badge badge-red
 *     <StatusBadge status="  ACTIVE " />    "Active"    badge badge-green
 *     <StatusBadge status="deleted" />      "Unknown"   badge badge-grey
 *     <StatusBadge status="" />             "Unknown"   badge badge-grey
 *     <StatusBadge status="constructor" />  "Unknown"   not a status, just a
 *                                                       built-in property
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Each of the three known statuses shows its label and classes
 * - Upper case and extra spaces still match: "  ACTIVE " -> "Active"
 * - An unrecognised status -> "Unknown" with badge-grey
 * - The empty string -> "Unknown"
 * - "constructor" and "toString" -> "Unknown" (not a crash, and not
 *   "[object Object]")
 * - The className is exactly right: `toHaveAttribute("class", "badge badge-red")`
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Write the table above as a lookup object outside the component,
 *    keyed by "active", "pending" and "suspended". Each value holds a
 *    label and a colour.
 * 2. Normalise first: `status.trim().toLowerCase()`.
 * 3. Pick the entry with a ternary: if `Object.hasOwn(STYLES, key)`, use
 *    `STYLES[key]`, else use your fallback entry. TypeScript may then
 *    complain that a plain string can't index the object. Type the
 *    object as `Record<string, { label: string; color: string }>` to fix
 *    that.
 * 4. Build the class with a template string: `badge badge-${color}`.
 * 5. TESTING: `screen.getByText("Active")` finds the span. `toHaveClass`
 *    checks that some classes are present.
 *    `toHaveAttribute("class", "badge badge-green")` checks the WHOLE
 *    className exactly.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Mapping data to a label and a className
 * - Keeping constant data outside the component
 * - Normalising props before you use them
 * - Fallbacks for values you don't recognise
 * - Why `obj[key]` with an untrusted key needs `Object.hasOwn` (or a Map)
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Rewrite the lookup with a `Map` and compare.
 * - Add a `title` attribute with a longer explanation for each status,
 *   e.g. "Waiting for an admin to approve this account".
 * - Type the known statuses as `"active" | "pending" | "suspended"` and
 *   write a function `isKnownStatus(s): s is KnownStatus` (a "type
 *   guard").
 */

import type { ReactElement } from "react";

export type StatusBadgeProps = {
  /** An account status from the server, e.g. "active". May be messy or unknown. */
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: StatusBadge");
}
