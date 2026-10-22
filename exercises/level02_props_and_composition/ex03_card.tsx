/**
 * Exercise: Card
 * Level:    02 - Props and Composition
 * Topics:   children, "slot" props, ReactNode, useId, aria-labelledby
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Card>: a box with an optional title at the top, any content
 * in the middle, and an optional footer at the bottom.
 *
 *     +----------------------------+
 *     | Profile                    |   <- title (optional)
 *     |----------------------------|
 *     | Ada Lovelace               |   <- children
 *     | Mathematician              |
 *     |----------------------------|
 *     | [ Edit ]                   |   <- footer (optional)
 *     +----------------------------+
 *
 *     <Card title="Profile" footer={<button>Edit</button>}>...</Card>
 *
 * ========================================================================
 * BACKGROUND: COMPOSITION AND SLOTS
 * ========================================================================
 * COMPOSITION means building components by putting other components
 * (or any JSX) inside them. The `children` prop is the main way: the
 * Card doesn't know or care what's inside it.
 *
 * A component can have more than one "hole" to fill. Any prop can hold
 * JSX, not just `children`. Props used like this are often called
 * SLOTS:
 *
 *     function Dialog({ actions, children }) {
 *       return <div>{children}<div className="actions">{actions}</div></div>;
 *     }
 *     <Dialog actions={<button>OK</button>}>Saved!</Dialog>
 *
 * The TypeScript type for "anything React can render" (text, numbers,
 * elements, null...) is `ReactNode`.
 *
 * To give the card an accessible name (the name a screen reader reads
 * out) you can point at the heading with `aria-labelledby="some-id"`.
 * Ids must be unique on the whole page, and a card can appear many
 * times. React's `useId()` hook makes a unique id for each copy of a
 * component:
 *
 *     const id = useId();
 *     <label htmlFor={id}>Email</label> <input id={id} />
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - The card is an <article> (role "article").
 * - The title is an <h2> (role "heading", level 2).
 * - When there's a title, the article's accessible name is the title,
 *   so getByRole("article", { name: "Profile" }) finds it. Do this with
 *   aria-labelledby pointing at the heading's id.
 * - The footer is a <footer> element inside the article. A <footer>
 *   inside an <article> has no special role, so tests look for it with
 *   `article.querySelector("footer")` or `element.closest("footer")`.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render `children` inside an <article>.
 * 2. When `title` is given, render it in an <h2> at the top, and name
 *    the article after it (aria-labelledby).
 * 3. When `title` is missing (undefined or null), render no heading and
 *    no aria-labelledby.
 * 4. When `footer` is given, render it inside a <footer> at the bottom.
 *    When it's missing (undefined or null), render no <footer> at all.
 * 5. Keep the order: title, then children, then footer.
 * 6. Accept any ReactNode in all three slots, not only strings.
 *
 * You can assume:
 * - `children` is always given.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <Card>Hello</Card>
 *       an article containing "Hello", no heading, no footer, no name
 *
 *     <Card title="Profile">Body</Card>
 *       a heading "Profile", and the article is named "Profile"
 *
 *     <Card title="T" footer="F">B</Card>
 *       the article's text is "TBF"                   order matters
 *
 *     <Card title={<>Settings <em>beta</em></>}>...</Card>
 *       heading and article both named "Settings beta"   JSX in a slot
 *
 *     two cards titled "First" and "Second"
 *       each article has its own name                 ids are unique
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Children only: an article with the text, no heading, accessible
 *   name "" and no aria-labelledby
 * - title={null}: no heading
 * - A title: an h2 heading, and the article is named after it
 * - footer={<button>Save</button>}: the button is inside a <footer>
 *   inside the article
 * - No footer, or footer={null}: no <footer> element
 * - title="T", children "B", footer="F": text content is exactly "TBF"
 * - JSX in every slot (a title with <em>, a list as children, a link in
 *   the footer)
 * - Two cards on one page: getByRole("article", { name: "First" }) and
 *   { name: "Second" } find different cards
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. `{condition && <h2>...</h2>}` renders the heading only when the
 *    condition is true.
 * 2. Don't use `{title && ...}` directly: a title of 0 would render "0".
 *    `title != null` (with `!=`, not `!==`) is true for everything
 *    except undefined and null. That's exactly rules 3 and 4.
 * 3. Call `useId()` once at the top of the component, give that id to
 *    the <h2>, and set `aria-labelledby={hasTitle ? id : undefined}` on
 *    the article. React leaves out an attribute whose value is undefined.
 * 4. TESTING: `toHaveAccessibleName("Profile")` checks the name of an
 *    element, and `toHaveTextContent(/^TBF$/)` checks the exact text.
 *    `within(article).getByRole(...)` searches only inside the article.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Composition with `children`
 * - Slot props that hold JSX, typed as ReactNode
 * - Optional parts of a component (conditional rendering)
 * - useId for unique ids, and aria-labelledby
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `headingLevel` prop (2 to 6) so a card can sit under an h2.
 * - Add an `actions` slot shown on the right of the title.
 * - In the playground, put the Button from ex01 in a Card's footer.
 */

import type { ReactNode } from 'react';
import { type ReactElement } from 'react';

export type CardProps = {
  /** Shown in an <h2> at the top. Optional. */
  title?: ReactNode;
  /** Shown in a <footer> at the bottom. Optional. */
  footer?: ReactNode;
  /** The main content of the card. */
  children: ReactNode;
};

export function Card({ title, footer, children }: CardProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Card');
}
