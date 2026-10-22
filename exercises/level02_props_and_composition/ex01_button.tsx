/**
 * Exercise: Button
 * Level:    02 - Props and Composition
 * Topics:   props, children, className, rest props (...rest), default props
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a reusable <Button> that every page of an app could share. It
 * picks its look from a `variant` and a `size`, and it passes every
 * other prop (onClick, disabled, title...) straight to the real
 * <button> element.
 *
 *     [ Save ]   [ Delete ]   [ Cancel ]
 *     primary     danger       secondary
 *
 *     <Button variant="danger" size="small" onClick={remove}>Delete</Button>
 *
 * ========================================================================
 * BACKGROUND: PROPS AND "REST" PROPS
 * ========================================================================
 * PROPS are the inputs of a component, like the arguments of a function.
 * React passes them all in one object, which you usually destructure
 * (unpack) right in the function's signature:
 *
 *     function Greeting({ name, excited = false }) { ... }
 *     //                         ^ a default value for a missing prop
 *
 * `children` is a special prop: whatever you put between the opening
 * and closing tags. In <Tag>Hello</Tag>, children is "Hello".
 *
 * Sometimes you only care about a few props and want to pass the rest
 * along untouched. The "rest" syntax collects everything you didn't
 * name into a new object, and the "spread" syntax passes it on:
 *
 *     function Link({ newTab = false, ...rest }) {
 *       return <a target={newTab ? "_blank" : undefined} {...rest} />;
 *     }
 *     // <Link href="/about" title="About us">About</Link>
 *     // rest is { href: "/about", title: "About us", children: "About" }
 *
 * ORDER MATTERS with spread. Props written AFTER {...rest} win over
 * anything inside rest. Props written BEFORE it can be overridden.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements the way a user (or a screen reader) would: by
 * their ROLE (what kind of thing it is, like "button") and their
 * ACCESSIBLE NAME (the text a screen reader reads out for it). So:
 *
 * - Render exactly one <button>. Its name is its children, so
 *   <Button>Save</Button> is found with
 *   screen.getByRole("button", { name: "Save" }).
 * - Its class attribute must contain these three classes (any order):
 *     "btn"
 *     "btn-" + variant      e.g. "btn-primary", "btn-danger"
 *     "btn-" + size         e.g. "btn-medium", "btn-small"
 *   plus any extra `className` the parent passed in.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept `variant` ("primary" | "secondary" | "danger", default
 *    "primary") and `size` ("small" | "medium" | "large", default
 *    "medium"), and add the matching classes listed above.
 * 2. Render `children` inside the button.
 * 3. Use type="button" when no `type` prop is given. A plain <button>
 *    inside a <form> is a SUBMIT button by default, which surprises
 *    people. A parent can still pass type="submit" on purpose.
 * 4. Merge an extra `className` with its own classes, never replace them:
 *    <Button className="wide"> gets "btn btn-primary btn-medium wide".
 * 5. Pass every other prop (onClick, disabled, title, id, name,
 *    aria-label, aria-describedby...) through to the <button>.
 *
 * You can assume:
 * - `variant` and `size` are always one of the allowed values (the
 *   TypeScript types make sure of that).
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <Button>Save</Button>
 *       class "btn btn-primary btn-medium", type "button"
 *
 *     <Button variant="danger" size="small">Delete</Button>
 *       class "btn btn-danger btn-small"      no "btn-primary"
 *
 *     <Button className="wide">Save</Button>
 *       class "btn btn-primary btn-medium wide"   extra class is ADDED
 *
 *     <Button type="submit">Send</Button> inside a <form>
 *       click  ->  the form submits             the parent chose submit
 *
 *     <Button>Cancel</Button> inside a <form>
 *       click  ->  the form does NOT submit     type="button" by default
 *
 *     <Button disabled onClick={spy}>Save</Button>
 *       click  ->  spy is not called            disabled passed through
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No props: classes "btn", "btn-primary", "btn-medium", type "button"
 * - variant="danger" size="small": has "btn-danger" and "btn-small",
 *   and does NOT have "btn-primary" or "btn-medium"
 * - className="wide": has "wide" AND still has "btn", "btn-primary",
 *   "btn-medium"
 * - type="submit" inside a form: clicking it submits the form
 * - No type inside a form: clicking it does NOT submit the form
 * - onClick is called once per click
 * - disabled: the button is disabled and onClick is not called
 * - Other attributes arrive on the <button>: title, id, name,
 *   aria-describedby
 * - aria-label="Close dialog" becomes the accessible name
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. For the prop types, start from everything a real <button> accepts:
 *    `ComponentProps<"button">` (import the type from "react"). Then add
 *    your own two props with `&`. This is already done for you below.
 * 2. Pull out the props you treat specially (variant, size, className,
 *    type) and collect the rest: `({ variant = "primary", ..., ...rest })`.
 * 3. Build the class string from a list, skipping an empty className:
 *    `["btn", ..., className].filter(Boolean).join(" ")`.
 * 4. Because you pulled `type` and `className` out of rest, rest can't
 *    override them, so the order of the JSX attributes doesn't matter
 *    here. A good habit anyway: write the props that must WIN after
 *    {...rest}.
 * 5. TESTING: `toHaveClass("btn", "btn-primary")` checks several classes
 *    at once, in any order. To test form submission, render
 *    <form onSubmit={spy}>...</form> and give the spy a body that calls
 *    `e.preventDefault()`, because jsdom does not support real
 *    navigation: `vi.fn((e: { preventDefault(): void }) => e.preventDefault())`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Props as a function's arguments, and default values
 * - The `children` prop
 * - Rest (`...rest`) and spread (`{...rest}`) props
 * - Building a className from props
 * - Typing props with ComponentProps<"button">
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `loading` prop: show "Loading..." instead of children, disable
 *   the button, and set aria-busy="true".
 * - Add `fullWidth` (adds "btn-full").
 * - Write a small CSS file for the classes and try the button in the
 *   playground.
 */

import { ComponentProps, type ReactElement } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = ComponentProps<"button"> & {
  /** How the button looks. Default "primary". */
  variant?: ButtonVariant;
  /** How big the button is. Default "medium". */
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "medium",
  className,
  type = "button",
  ...rest
}: ButtonProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: Button");
}
