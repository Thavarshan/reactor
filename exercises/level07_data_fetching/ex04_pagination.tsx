/**
 * Exercise: Pagination
 * Level:    07 - Data Fetching
 * Topics:   query parameters, page state, keeping old data while loading, aria-current
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <PostsPager> that shows a list of posts one page at a time.
 * Previous / Next buttons and numbered page buttons load other pages
 * from the server. While a page loads, the old one stays on screen and
 * the buttons are disabled.
 *
 *     - Hello world
 *     - Second post
 *
 *     Page 1 of 3
 *     [ Previous ]  [1]  [2]  [3]  [ Next ]
 *
 *     <PostsPager />
 *
 * ========================================================================
 * BACKGROUND: QUERY PARAMETERS AND "KEEPING THE OLD PAGE"
 * ========================================================================
 * Servers usually split long lists into pages. You ask for one page
 * with a QUERY PARAMETER in the URL, the part after `?`:
 *
 *     fetch(`/api/products?sort=${sort}`)
 *
 * The page number you WANT and the page you're SHOWING are two different
 * things for a moment: after a click on "Next", you want page 2 but you
 * still show page 1 until page 2 arrives. Keeping the old page visible
 * avoids the list jumping to a spinner and back. You can tell whether
 * you're loading by comparing the two:
 *
 *     const isLoading = shown === null || shown.page !== wantedPage;
 *
 * The page that's showing is marked for screen readers with
 * aria-current="page", the same attribute navigation links use for the
 * current page.
 *
 * In development, React's <StrictMode> runs each effect twice when a
 * component appears (effect, cleanup, effect), so page 1 is requested
 * twice. Ignore the first answer with an `ignore` flag in the cleanup,
 * like in the earlier exercises.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * The server: `GET /api/posts?page=<n>` answers with JSON like
 *     { "posts": [{ "id": 1, "title": "Hello world" }, ...],
 *       "page": 1, "totalPages": 3 }
 *
 * - Posts: a list (<ul>) with one list item per post (the title).
 * - "Page 1 of 3": the page that's SHOWING and the total, as text.
 * - Inside <nav aria-label="Pagination"> (role "navigation", name
 *   "Pagination"):
 *   - a button named "Previous" and a button named "Next",
 *   - one button per page, named "Page 1", "Page 2"... (show just the
 *     number, and use aria-label="Page 2" for the name). The button of
 *     the page that's showing has aria-current="page".
 * - While a page loads: an element with role="status" and the text
 *   "Loading page 2..." (with the page being loaded).
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Request page 1 when it appears. Until it arrives show only the
 *    status "Loading page 1...": no list, no "Page x of y", no
 *    navigation.
 * 2. Show the posts, "Page N of M" and the navigation once a page has
 *    arrived.
 * 3. Disable "Previous" on page 1, and "Next" on the last page.
 * 4. Load the page before/after on Previous/Next, and page N on
 *    "Page N".
 * 5. While a page loads: show "Loading page N...", keep the OLD posts
 *    and the old "Page x of y" on screen, and disable EVERY navigation
 *    button.
 * 6. When the new page arrives: show its posts, update "Page N of M"
 *    and aria-current, and remove the status.
 * 7. Do nothing when the button of the page that's already showing is
 *    clicked (no new request).
 *
 * You can assume:
 * - The server never fails, and `page` in the answer is the page you
 *   asked for.
 * - `totalPages` is at least 1.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     server: 3 pages
 *
 *     <PostsPager />           ->  "Loading page 1..."
 *     page 1 arrives           ->  page 1 posts, "Page 1 of 3",
 *                                  Previous disabled, "Page 1" is current
 *     click "Next"             ->  "Loading page 2...", page 1 posts still
 *                                  shown, all buttons disabled
 *     page 2 arrives           ->  page 2 posts, "Page 2 of 3"
 *     click "Page 3"           ->  ... "Page 3 of 3", Next disabled
 *
 *     server: 1 page            ->  Previous and Next both disabled
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First load: only "Loading page 1...", then posts and "Page 1 of 3"
 * - On page 1, Previous is disabled and Next is enabled
 * - Next loads page 2, and the request has `page=2`
 * - While loading: old posts visible, status shown, all buttons
 *   disabled
 * - A numbered button jumps straight to that page
 * - On the last page, Next is disabled
 * - aria-current="page" is on the button of the page that's showing,
 *   and only on that one
 * - Only one page: Previous and Next both disabled
 * - Clicking the current page's button sends no request
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Two pieces of state: the page you want (a number, starting at 1)
 *    and the last answer you got (or null).
 * 2. One effect with the wanted page in its dependency array does all
 *    the fetching. The buttons only change the wanted page.
 * 3. "Is it loading?" is derived: compare the wanted page with the
 *    page in the last answer (see BACKGROUND). Use it for the status
 *    and for `disabled`.
 * 4. Rule 7 is free with this design: setting state to the value it
 *    already has changes nothing, so the effect that depends on it
 *    doesn't run again.
 * 5. Build the page buttons from `totalPages`:
 *    `Array.from({ length: totalPages }, (_, i) => i + 1)`.
 *    For aria-current, React leaves out an attribute whose value is
 *    `undefined`: `aria-current={n === shown.page ? "page" : undefined}`.
 * 6. TESTING: read the query parameter in the MSW handler:
 *        http.get("/api/posts", ({ request }) => {
 *          const page = Number(new URL(request.url).searchParams.get("page"));
 *          return HttpResponse.json(makePage(page, 3));
 *        })
 *    MSW matches the path and ignores the `?page=...` part, so one
 *    handler serves every page.
 * 7. TESTING: to look at the loading state, the answer has to WAIT
 *    until the test is done looking. A "gate" is a promise that the
 *    test opens when it's ready:
 *        const gate = createGate();
 *        // in the handler, for page 2: await gate.opened;
 *        await user.click(screen.getByRole("button", { name: "Next" }));
 *        // ...check the loading state here...
 *        gate.open();
 *        expect(await screen.findByText("Page 2 of 3")).toBeInTheDocument();
 *    The test file already has `createGate` and `makePage` for you.
 * 8. TESTING: `within(nav).getAllByRole("button")` finds the buttons
 *    inside the navigation only, handy for "every button is disabled".
 *    Import `within` from "@testing-library/react".
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Fetching with query parameters
 * - Separating "wanted" state from "loaded" data
 * - Deriving loading and disabled states
 * - aria-current and labelled navigation landmarks
 * - Controlling when a mocked answer arrives
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Handle errors: show an alert and keep the buttons usable.
 * - Put the page in the URL (`?page=2`) so a reload keeps it.
 * - Prefetch the next page in the background, so "Next" is instant.
 */

import type { ReactElement } from "react";

/** One post in the list. */
export type Post = {
  id: number;
  title: string;
};

/** One page of posts, as the server sends it. */
export type PostsPage = {
  posts: Post[];
  page: number;
  totalPages: number;
};

export function PostsPager(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: PostsPager");
}
