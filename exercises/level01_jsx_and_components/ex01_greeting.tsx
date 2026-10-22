/**
 * Exercise: Greeting
 * Level:    01 - JSX and Components
 * Topics:   your first component, JSX, props, curly braces, headings
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Greeting> component that shows a big heading saying hello to
 * a person by name, or to a "stranger" when there is no name.
 *
 *     +--------------------------+
 *     |  Hello, Ada!             |   <- an <h1> heading
 *     +--------------------------+
 *
 *     <Greeting name="Ada" />
 *
 * ========================================================================
 * BACKGROUND: COMPONENTS, JSX AND PROPS
 * ========================================================================
 * A COMPONENT is a function whose name starts with a capital letter and
 * which returns what should appear on the screen. What it returns is
 * written in JSX, which looks like HTML inside JavaScript:
 *
 *     function Title() {
 *       return <h2>Welcome to the shop</h2>;
 *     }
 *
 * You use a component like an HTML tag: `<Title />`.
 *
 * PROPS are a component's inputs, like a function's arguments. The parent
 * writes them as attributes, and the component receives them as one
 * object. Destructuring pulls out the ones you need:
 *
 *     <Price amount={20} />                    // the parent
 *
 *     function Price({ amount }: { amount: number }) {
 *       return <p>Total: {amount} dollars</p>;  // shows "Total: 20 dollars"
 *     }
 *
 * Curly braces `{...}` in JSX drop in any JavaScript value: a variable, a
 * sum, or the result of a function call. Text props can use quotes
 * (`name="Ada"`), other values need braces (`amount={20}`).
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements the way a user (or a screen reader) would: by their
 * ARIA ROLE (what kind of thing it is, like "heading" or "button") and
 * their ACCESSIBLE NAME (the text a screen reader reads out for it). For
 * a heading, the name is its text. So your component must render:
 *
 * - One heading of level 1 (an <h1>) whose text is the whole greeting,
 *   e.g. "Hello, Ada!".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept an optional `name` prop (a string).
 * 2. Render an <h1> with the text "Hello, NAME!", where NAME is the name.
 * 3. Remove spaces from the start and end of the name before showing it.
 * 4. Show "Hello, stranger!" when `name` is missing, empty, or only
 *    spaces.
 *
 * You can assume:
 * - `name`, when given, is a string.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <Greeting name="Ada" />        shows "Hello, Ada!"
 *     <Greeting />                   shows "Hello, stranger!"    no name
 *     <Greeting name="" />           shows "Hello, stranger!"    empty
 *     <Greeting name="  Bo  " />     shows "Hello, Bo!"          trimmed
 *     <Greeting name="   " />        shows "Hello, stranger!"    only spaces
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - A name: "Ada" -> heading "Hello, Ada!"
 * - The heading is level 1: `getByRole("heading", { level: 1 })`
 * - No name prop -> "Hello, stranger!"
 * - Empty string -> "Hello, stranger!"
 * - Spaces around the name are removed: "  Bo  " -> "Hello, Bo!"
 * - Only spaces -> "Hello, stranger!"
 * - Names with spaces inside stay whole: "Grace Hopper" ->
 *   "Hello, Grace Hopper!"
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Work out the name to show BEFORE the `return`, in a normal
 *    variable. Then put that variable inside the JSX with `{...}`.
 * 2. `"  Bo  ".trim()` is "Bo". `name?.trim()` is undefined when name
 *    is undefined, instead of crashing.
 * 3. `a || b` gives `b` when `a` is "falsy". The empty string "" and
 *    undefined are both falsy.
 * 4. TESTING: `render(<Greeting name="Ada" />)` draws the component into
 *    a fake page. `screen.getByRole("heading", { name: "Hello, Ada!" })`
 *    finds the heading, and fails the test if there isn't exactly one.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - A component is a function that returns JSX
 * - Props: a component's inputs, received as one object
 * - Curly braces in JSX to show JavaScript values
 * - Optional props, and working out values before `return`
 * - Finding elements by role and accessible name in tests
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add an optional `greeting` prop (default "Hello"), so
 *   <Greeting greeting="Hi" name="Ada" /> shows "Hi, Ada!".
 * - Render it in the playground (see playground/App.tsx) and look at it in
 *   a browser.
 */

import type { ReactElement } from "react";

export type GreetingProps = {
  /** Who to greet. Missing, empty or blank means "stranger". */
  name?: string;
};

export function Greeting({ name }: GreetingProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: Greeting");
}
