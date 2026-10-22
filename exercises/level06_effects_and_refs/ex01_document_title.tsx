/**
 * Exercise: Document Title
 * Level:    06 - Effects and Refs
 * Topics:   useEffect, effect dependencies, cleanup functions, StrictMode
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <PageTitle> component. It shows a page heading AND copies the
 * same title into the browser tab (`document.title`), with an unread
 * count in front when there is one. When the component goes away, the
 * tab gets its old title back.
 *
 *     Browser tab:  "(3) Inbox"
 *
 *     Inbox                      <- an <h1>
 *
 *     <PageTitle title="Inbox" count={3} />
 *
 * ========================================================================
 * BACKGROUND: SIDE EFFECTS AND useEffect
 * ========================================================================
 * A component's main job is to RETURN some JSX. Anything else it does,
 * like changing `document.title`, starting a timer or fetching data, is a
 * SIDE EFFECT: it reaches outside the component.
 *
 * Side effects don't belong in the body of the component, because React
 * may call that body many times. Put them in `useEffect`. React runs the
 * effect AFTER the component appears on screen:
 *
 *     useEffect(() => {
 *       console.log("the colour is now", colour);
 *       return () => {
 *         console.log("cleaning up", colour);   // the CLEANUP function
 *       };
 *     }, [colour]);                             // the DEPENDENCY array
 *
 * - The dependency array lists the values the effect uses. React runs
 *   the effect again only when one of them changed since the last
 *   render ("re-render" means React calling your component again).
 * - The function you return is the CLEANUP. React calls it before it
 *   runs the effect again, and once more when the component is removed
 *   from the page ("unmounted").
 *
 * In development, React's <StrictMode> runs every effect twice when a
 * component first appears: effect, cleanup, effect. It does this on
 * purpose, to catch effects with a missing or broken cleanup. The
 * playground in this repo uses StrictMode, so you'll see it there.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A heading, level 1, whose text is exactly `title`:
 *   screen.getByRole("heading", { level: 1, name: "Inbox" })
 * - `document.title`: a plain string your test can read and set.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render an <h1> with the `title` text. The count is NOT in the
 *    heading.
 * 2. Set `document.title` to `title` when `count` is missing or 0.
 * 3. Set it to "(N) title" when `count` is 1 or more, e.g. "(3) Inbox".
 * 4. Show "(99+) title" when `count` is more than 99.
 * 5. Update `document.title` when `title` or `count` changes.
 * 6. Put back the title the tab had BEFORE the component appeared when
 *    the component is unmounted.
 * 7. Still work inside <StrictMode>.
 *
 * You can assume:
 * - `count`, when given, is a whole number of 0 or more.
 * - Only one <PageTitle> is on the page at a time.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     document.title is "My app" before anything renders.
 *
 *     <PageTitle title="Inbox" />             tab: "Inbox"
 *     <PageTitle title="Inbox" count={0} />   tab: "Inbox"      0 shows nothing
 *     <PageTitle title="Inbox" count={3} />   tab: "(3) Inbox"
 *     <PageTitle title="Inbox" count={150} /> tab: "(99+) Inbox"
 *
 *     render with count={3}, re-render with count={4}  ->  "(4) Inbox"
 *     then unmount                                      ->  "My app"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No count: the tab shows just the title
 * - count={0}: the tab shows just the title
 * - count={99} -> "(99) Inbox", count={100} -> "(99+) Inbox"
 * - The heading shows the title without the count
 * - Changing `title` or `count` (with `rerender`) updates the tab
 * - Unmounting restores the ORIGINAL title, even after several changes
 *   (not the title from just before the last change)
 * - Inside <StrictMode> the tab still shows "(3) Inbox", and unmounting
 *   still restores the original title
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Work out the text first, in the component body:
 *    `const text = ...`. That's plain JavaScript, not a side effect.
 * 2. Then copy it into the tab inside useEffect. Which values does the
 *    effect use? Those go in the dependency array.
 * 3. To restore the old title, read `document.title` at the start of
 *    the effect, BEFORE you change it, and keep it in a variable. The
 *    cleanup function can see that variable.
 * 4. Think it through for a change from "(3) Inbox" to "(4) Inbox":
 *    the cleanup of the old effect runs first, and puts back the
 *    title it saved. Then the new effect runs and saves... what? If
 *    each effect undoes its own change, unmounting always ends on the
 *    original title.
 * 5. TESTING: `document.title` stays set between tests, because the
 *    same fake browser page is used for the whole file. Set it in a
 *    `beforeEach`: `document.title = "My app";`. Then you know exactly
 *    what "restored" should look like.
 * 6. TESTING: `render` returns helpers. `rerender(<PageTitle ... />)`
 *    gives the component new props, and `unmount()` removes it:
 *        const { rerender, unmount } = render(<PageTitle title="A" />);
 * 7. TESTING: to check StrictMode, wrap the component:
 *    `render(<StrictMode><PageTitle title="Inbox" count={3} /></StrictMode>)`
 *    and import StrictMode from "react".
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Side effects and why they live in useEffect
 * - The dependency array: when an effect runs again
 * - Cleanup functions: undoing what an effect did
 * - StrictMode running effects twice in development
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Move the logic into a custom hook, `useDocumentTitle(text)`, and
 *   use it from <PageTitle>.
 * - Add a `prefix` prop, e.g. "Mail", so the tab reads
 *   "(3) Inbox - Mail".
 */

import type { ReactElement } from "react";

export type PageTitleProps = {
  /** The page name. Shown in the <h1> and in the browser tab. */
  title: string;
  /** How many unread items there are. Missing or 0 shows no count. */
  count?: number;
};

export function PageTitle({ title, count = 0 }: PageTitleProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: PageTitle");
}
