/**
 * Exercise: Unread Badge
 * Level:    01 - JSX and Components
 * Topics:   conditional rendering, &&, the ternary operator, aria-label
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <UnreadBadge> for an app's header: a "Messages" button with a
 * little badge showing how many messages are unread. With no unread
 * messages, there is no badge at all.
 *
 *     [ Messages (3) ]        count 3
 *     [ Messages (99+) ]      count 120, more than max
 *     [ Messages ]            count 0: no badge
 *
 *     <UnreadBadge count={3} />
 *
 * ========================================================================
 * BACKGROUND: SHOWING THINGS ONLY SOMETIMES
 * ========================================================================
 * In JSX you can't write an `if` statement inside the markup, but you can
 * use EXPRESSIONS, bits of code that produce a value. Two are common:
 *
 *     {isLoggedIn ? <p>Welcome back</p> : <p>Please sign in</p>}
 *     {isLoggedIn && <p>Welcome back</p>}
 *
 * The first (the "ternary") picks one of two things. The second means
 * "if the left side is truthy, show the right side". When the left side is
 * false, null or undefined, React shows nothing at all.
 *
 * Now the trap. `&&` gives back its LEFT side when that side is falsy.
 * React skips false, null and undefined, but it happily shows numbers,
 * including 0:
 *
 *     const items: string[] = [];
 *     <div>{items.length && <List items={items} />}</div>
 *     // items.length is 0, so this renders <div>0</div>
 *
 * A stray "0" on the page is a classic React bug. Make the left side a
 * real true or false instead: `{items.length > 0 && ...}`.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA ROLE and ACCESSIBLE NAME (what a
 * screen reader reads out). A badge that only says "3" means nothing to
 * someone who can't see it, so the button gets a full sentence as its
 * name using `aria-label`, which REPLACES the name the button would get
 * from its text. Your component must render:
 *
 * - One button (role "button") with the visible text "Messages", and
 *   this aria-label:
 *     count 0        -> "Messages"
 *     count 1        -> "Messages, 1 unread message"    (no "s")
 *     count 5        -> "Messages, 5 unread messages"
 *     count 120      -> "Messages, 120 unread messages" (the real count)
 * - Inside the button, when count is 1 or more, a badge element with the
 *   badge text on its own, e.g. <span className="badge">3</span>. The
 *   brackets in the sketch above are just decoration from CSS, so don't
 *   render them.
 * - When count is 0, no badge, and NO "0" anywhere in the button's text.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept a `count` prop and an optional `max` prop (default 99).
 * 2. Render a button (`type="button"`) whose visible text includes
 *    "Messages".
 * 3. When count is 1 or more, show a badge with the count. When count is
 *    bigger than `max`, the badge shows `max` followed by "+", e.g. "99+".
 * 4. When count is 0, show no badge and no "0".
 * 5. Give the button the aria-label described above. It always uses the
 *    real count, even when the badge shows "99+".
 *
 * You can assume:
 * - `count` and `max` are whole numbers, `count` is 0 or more, and `max`
 *   is 1 or more.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <UnreadBadge count={3} />
 *       badge "3", button named "Messages, 3 unread messages"
 *     <UnreadBadge count={0} />
 *       no badge, no "0", button named "Messages"
 *     <UnreadBadge count={1} />
 *       badge "1", named "Messages, 1 unread message"       singular
 *     <UnreadBadge count={99} />
 *       badge "99"                    99 is not MORE than max
 *     <UnreadBadge count={100} />
 *       badge "99+", named "Messages, 100 unread messages"
 *     <UnreadBadge count={10} max={9} />
 *       badge "9+"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - count 3 -> badge "3", name "Messages, 3 unread messages"
 * - count 0 -> button named "Messages", and the button's text does not
 *   contain "0" (`not.toHaveTextContent("0")`)
 * - count 1 -> "1 unread message", singular
 * - count 99 -> badge "99" (equal to max is fine)
 * - count 100 -> badge "99+", but the name says 100
 * - a custom max: count 10, max 9 -> "9+"
 * - The button has type="button"
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Work out two strings before `return`: the badge text and the label.
 *    Then the JSX stays short.
 * 2. For the badge text: `count > max ? ... : ...`. A template string
 *    like `${max}+` builds "99+".
 * 3. For the label, handle count 0 first. Then pick "message" or
 *    "messages" with another ternary.
 * 4. Show the badge with `{count > 0 && <span ...>...</span>}`. Try
 *    `{count && ...}` once on purpose, and watch your count 0 test catch
 *    the stray "0".
 * 5. TESTING: `getByRole("button", { name: "Messages" })` must match the
 *    WHOLE name exactly, so it won't match "Messages, 3 unread messages".
 *    `within(button).getByText("3")` looks only inside the button.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Conditional rendering with `&&` and the ternary `? :`
 * - The `{count && ...}` trap, and why it renders "0"
 * - What React renders for false, null, undefined, 0 and ""
 * - aria-label: giving an element a clearer accessible name
 * - Template strings for building text
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `label` prop (default "Messages") so it works for
 *   "Notifications" too.
 * - Add an `onClick` prop and pass it to the button.
 * - Look up `Intl.PluralRules` for picking singular or plural words in
 *   any language.
 */

import type { ReactElement } from 'react';

export type UnreadBadgeProps = {
  /** How many messages are unread. 0 means none. */
  count: number;
  /** The biggest number the badge shows before it says "max+". Default 99. */
  max?: number;
};

export function UnreadBadge({
  count,
  max = 99,
}: UnreadBadgeProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: UnreadBadge');
}
