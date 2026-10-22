/**
 * Exercise: Page Layout
 * Level:    02 - Props and Composition
 * Topics:   slot props, landmark roles, skip links, focus order
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <PageLayout> that arranges a whole page: a header on top, a
 * sidebar of links, the main content, and a footer. Each part is
 * passed in as a prop, and each lands in the right LANDMARK element.
 *
 *     Skip to main content          <- hidden until focused (with CSS)
 *     +--------------------------------------+
 *     | header                               |
 *     +----------+---------------------------+
 *     | sidebar  | main (children)           |
 *     |          |                           |
 *     +----------+---------------------------+
 *     | footer                               |
 *     +--------------------------------------+
 *
 *     <PageLayout header={<h1>My site</h1>} sidebar={<Links />} footer="© 2026">
 *       <Article />
 *     </PageLayout>
 *
 * ========================================================================
 * BACKGROUND: LANDMARKS AND SKIP LINKS
 * ========================================================================
 * Screen reader users can jump between the big regions of a page, called
 * LANDMARKS, much like sighted users glance at the layout. Some HTML
 * elements are landmarks automatically. Each has an ARIA ROLE, the name
 * screen readers (and tests) use for it:
 *
 *     <header>   role "banner"        the site's top bar
 *     <nav>      role "navigation"    a group of links
 *     <main>     role "main"          the page's own content
 *     <footer>   role "contentinfo"   the site's bottom bar
 *
 * (A <header> or <footer> INSIDE an <article> or <main> is not a
 * landmark. Here they sit at the top level, so they are.)
 *
 * A page can have several <nav>s, so give each one a name with
 * aria-label="...".
 *
 * Keyboard users move with Tab, one link or button at a time. Tabbing
 * through 30 header links on every page is tiring, so pages start with
 * a SKIP LINK: a link to "#some-id" that jumps straight to the content.
 * For the jump to also move keyboard focus, the target needs
 * tabIndex={-1}: "focusable by code and links, but not by Tab".
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - role "banner": a <header> holding `header`
 * - role "navigation", named `sidebarLabel` (default "Sidebar"): a
 *   <nav aria-label=...> holding `sidebar`
 * - role "main": a <main id="main-content" tabIndex={-1}> holding
 *   `children`
 * - role "contentinfo": a <footer> holding `footer`
 * - role "link" named "Skip to main content", with
 *   href="#main-content"
 * - The outer element (container.firstElementChild in a test) has the
 *   class "page-layout", plus "page-layout--with-sidebar" when there is
 *   a sidebar. A stylesheet could use that class to switch to two
 *   columns.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render one outer <div> with the classes described above.
 * 2. Start with the skip link, before anything else that can be
 *    focused.
 * 3. Render `header` in a <header>, `sidebar` in a named <nav>,
 *    `children` in the <main>, and `footer` in a <footer>, in that
 *    order.
 * 4. Leave out the <header>, <nav> or <footer> completely when its prop
 *    is missing (undefined or null). The <main> is always there.
 * 5. Give the <main> id="main-content" and tabIndex={-1}.
 *
 * You can assume:
 * - Only one PageLayout is on the page at a time (so a fixed id is ok).
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <PageLayout>Content</PageLayout>
 *       a skip link and a main with "Content". No banner, navigation or
 *       contentinfo
 *
 *     <PageLayout header="H" sidebar="S" footer="F">M</PageLayout>
 *       banner, navigation "Sidebar", main, contentinfo, in that order
 *
 *     <PageLayout sidebar={links} sidebarLabel="Chapters">...</PageLayout>
 *       a navigation named "Chapters"
 *
 *     header holds a "Home" link
 *       Tab  ->  focus on "Skip to main content"    the skip link is first
 *       Tab  ->  focus on "Home"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Children only: main holds them, and there's no banner, navigation or
 *   contentinfo
 * - All slots: each one is inside its landmark (use `within`)
 * - Navigation named "Sidebar" by default, or by sidebarLabel
 * - null slots behave like missing ones
 * - Landmark order: banner, then navigation, then main, then contentinfo
 * - The skip link has href "#main-content", and main has
 *   id "main-content" and tabindex "-1"
 * - First Tab focuses the skip link, second Tab the first header link
 * - Tab never stops on the <main> itself: with a button inside main,
 *   Tab, Tab focuses that button
 * - The outer element has "page-layout", and gets
 *   "page-layout--with-sidebar" only when there is a sidebar
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. This is Card (ex03) again, with four slots instead of three.
 *    `{header != null && <header>{header}</header>}` handles rule 4.
 * 2. Write the skip link as the very first child of the outer <div>.
 *    Tab order follows the order of elements on the page.
 * 3. In JSX the attribute is spelled `tabIndex`, with a capital I.
 * 4. TESTING: `a.compareDocumentPosition(b) &
 *    Node.DOCUMENT_POSITION_FOLLOWING` is non-zero when b comes after a
 *    on the page. Wrap it in a small `isBefore(a, b)` helper.
 * 5. TESTING: `await user.tab()` presses Tab, then
 *    `expect(element).toHaveFocus()` checks where focus went.
 *    `render` returns `container`, the <div> your component is drawn
 *    into, so `container.firstElementChild` is your outer <div>.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Layout components built from slot props
 * - Landmark elements and their roles
 * - Naming landmarks with aria-label
 * - Skip links, tabIndex={-1} and focus order
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Write CSS that hides the skip link until it's focused, and a grid
 *   that uses "page-layout--with-sidebar".
 * - Make the id unique with useId, so two layouts could share a page.
 * - Add an `aside` slot rendered as <aside> (role "complementary").
 */

import { ReactNode, type ReactElement } from "react";

export type PageLayoutProps = {
  /** Shown in the <header> (role "banner"). Optional. */
  header?: ReactNode;
  /** Shown in the <nav> (role "navigation"). Optional. */
  sidebar?: ReactNode;
  /** The <nav>'s accessible name. Default "Sidebar". */
  sidebarLabel?: string;
  /** Shown in the <footer> (role "contentinfo"). Optional. */
  footer?: ReactNode;
  /** The page content, shown in <main>. */
  children: ReactNode;
};

export function PageLayout({
  header,
  sidebar,
  sidebarLabel = "Sidebar",
  footer,
  children,
}: PageLayoutProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: PageLayout");
}
