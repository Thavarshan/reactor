/**
 * Exercise: Tabs that wait with useTransition
 * Level:    12 - Concurrent React
 * Topics:   useTransition, isPending, Suspense, keeping old UI on screen
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <TransitionTabs> component: a row of tabs and one panel. Some
 * panels are slow to get ready. While a slow panel gets ready, keep the
 * OLD panel on screen and show a small "Switching tabs..." message,
 * instead of blanking the page with a loading spinner.
 *
 *     [ About ] [ Posts ] [ Contact ]      Switching tabs...
 *     +-----------------------------------------------+
 *     | About panel (still visible while Posts loads)  |
 *     +-----------------------------------------------+
 *
 *     <TransitionTabs tabs={[{ id: "about", label: "About", content: <About /> }, ...]} />
 *
 * ========================================================================
 * BACKGROUND: TRANSITIONS
 * ========================================================================
 * A state update normally means "show this NOW". React drops whatever is
 * on screen and draws the new thing, even if the new thing has to show a
 * loading fallback first.
 *
 * A TRANSITION is a state update marked as "not urgent". You make one
 * with the useTransition hook:
 *
 *     const [isPending, startTransition] = useTransition();
 *
 *     function showPage(page: string) {
 *       startTransition(() => {
 *         setPage(page);        // this update is now a transition
 *       });
 *     }
 *
 * During a transition React prepares the new screen in the background.
 * The old screen stays visible and stays clickable. `isPending` is true
 * until the new screen is ready, so you can show a small hint.
 *
 * SUSPENSE is how a component says "I'm not ready yet" (for example,
 * because it is still waiting for data). You wrap such components in
 * <Suspense fallback={...}>, and React shows the fallback until they are
 * ready:
 *
 *     <Suspense fallback={<p>Loading...</p>}>
 *       <SomethingSlow />
 *     </Suspense>
 *
 * The two work together: if the slow part appears because of a
 * TRANSITION, React keeps the old content instead of showing the
 * fallback.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Your component must render exactly these:
 *
 * - An element with role="tablist" around the tab buttons.
 * - One <button role="tab"> per tab. Its accessible name (the text a
 *   screen reader reads out) is the tab's `label`. The selected tab has
 *   aria-selected="true", the others aria-selected="false".
 * - One element with role="tabpanel" that holds the selected tab's
 *   `content`.
 * - Inside the tabpanel, a <Suspense> boundary whose fallback is
 *   <p>Loading tab...</p>.
 * - While a tab switch is pending: <p role="status">Switching tabs...</p>.
 *   Render it ONLY while pending, not as an empty element.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept `tabs` (an array of { id, label, content }) and an optional
 *    `defaultTabId`. Start on `defaultTabId`, or on the first tab when
 *    it is missing.
 * 2. Render one tab button per tab, in order, and mark the selected one
 *    with aria-selected="true".
 * 3. Show the selected tab's content in the tabpanel, inside the
 *    Suspense boundary.
 * 4. Switch tabs inside startTransition when a tab is clicked.
 * 5. While the switch is pending, show the "Switching tabs..." status.
 *    The old panel stays on screen, the old tab stays selected, and
 *    the "Loading tab..." fallback does NOT appear.
 * 6. When the new panel is ready, show it, move aria-selected to the
 *    new tab, and remove the status.
 *
 * You can assume:
 * - `tabs` has at least one tab, and every `id` is unique.
 * - `defaultTabId`, when given, is the id of one of the tabs.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     tabs: About (fast), Posts (slow)
 *
 *     first render        ->  About is selected, About panel shows
 *     click "Posts"       ->  About panel still shows, About still
 *                             selected, "Switching tabs..." appears
 *     Posts gets ready    ->  Posts panel shows, Posts selected,
 *                             "Switching tabs..." is gone
 *
 *     defaultTabId="posts" and Posts is slow on the first render
 *                         ->  "Loading tab..." shows   (nothing older
 *                             to keep on screen, so the fallback is used)
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No defaultTabId: the first tab is selected and its panel shows
 * - defaultTabId picks the starting tab
 * - Clicking a fast tab switches right away, and no status remains
 * - Clicking a slow tab: old panel and old selection stay, status shows,
 *   and "Loading tab..." is NOT shown
 * - When the slow tab finishes: new panel, new selection, status gone
 * - A slow FIRST tab shows the "Loading tab..." fallback
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. You need one piece of state: the selected tab id. Find the selected
 *    tab object with `tabs.find(...)` during render.
 * 2. `const [isPending, startTransition] = useTransition()`. In the
 *    click handler: `startTransition(() => setSelectedId(tab.id))`.
 * 3. Put the <Suspense> INSIDE the tabpanel and do NOT give it a `key`.
 *    A Suspense with a new key counts as brand new, and a brand new
 *    boundary has no old content to keep, so React shows its fallback
 *    even during a transition.
 * 4. TESTING: a "slow" tab is hard to fake with heavy calculations. In
 *    tests, React finishes ALL rendering before `act()` (and every
 *    user-event action) returns, so a slow calculation just makes the
 *    test slower and you never see `isPending` become true. What you CAN
 *    see is a tab that WAITS for something. `createSlowContent` below
 *    makes exactly that:
 *
 *        const posts = createSlowContent("All posts");
 *        // posts.content waits until you call posts.finish()
 *
 * 5. TESTING: when a click makes something wait (suspend), wrap the
 *    click in an awaited act, and finish the slow content inside one
 *    too. Without the outer act, React can lose track of the waiting
 *    work and the panel never appears:
 *
 *        await act(() => user.click(screen.getByRole("tab", { name: "Posts" })));
 *        expect(screen.getByRole("status")).toHaveTextContent("Switching tabs...");
 *        await act(async () => posts.finish());
 *        expect(screen.queryByRole("status")).not.toBeInTheDocument();
 *
 *    For a slow FIRST tab, render inside `await act(async () => { render(...) })`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - useTransition: marking an update as not urgent, and isPending
 * - Suspense boundaries and fallbacks
 * - Why a transition keeps old content instead of showing a fallback
 * - Why a `key` on a Suspense boundary changes that behaviour
 * - ARIA tabs: tablist, tab, tabpanel, aria-selected
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Dim the old panel (opacity: 0.5) while the switch is pending.
 * - Mark the tab the user clicked as "on its way" while pending, for
 *   example with a spinner next to its label. (Hint: store the clicked
 *   id in normal, urgent state as well.)
 * - Try it in the playground with a slow calculation instead of waiting
 *   data. In a real browser, isPending DOES show for slow rendering.
 */

import { use, type ReactNode, type ReactElement } from "react";

export type TransitionTab = {
  /** A unique id for the tab. */
  id: string;
  /** The text on the tab button. */
  label: string;
  /** What the panel shows when this tab is selected. */
  content: ReactNode;
};

export type TransitionTabsProps = {
  /** The tabs, in order. There is at least one. */
  tabs: TransitionTab[];
  /** The id of the tab to start on. Default: the first tab. */
  defaultTabId?: string;
};

/**
 * PROVIDED: you don't need to change this.
 *
 * Makes panel content that WAITS until you call `finish()`. Use it in
 * your tests to build a "slow" tab:
 *
 *     const posts = createSlowContent("All posts");
 *     const tabs = [
 *       { id: "about", label: "About", content: <p>About us</p> },
 *       { id: "posts", label: "Posts", content: posts.content },
 *     ];
 *     // ...later
 *     await act(async () => posts.finish());   // now it shows <p>All posts</p>
 */
export function createSlowContent(text: string) {
  let finish!: () => void;
  const ready = new Promise<string>((resolve) => {
    finish = () => resolve(text);
  });
  function SlowText() {
    // `use` waits for the promise (you'll learn it properly in ex04).
    return <p>{use(ready)}</p>;
  }
  return { content: <SlowText />, finish };
}

export function TransitionTabs({ tabs, defaultTabId = tabs[0]?.id }: TransitionTabsProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: TransitionTabs");
}
