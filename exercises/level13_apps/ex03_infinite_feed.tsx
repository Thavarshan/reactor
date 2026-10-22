/**
 * Exercise: Infinite feed
 * Level:    13 - Small Apps
 * Topics:   paginated fetching, IntersectionObserver, refs, effects with
 *           cleanup, loading and error states
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <InfiniteFeed>: a list of posts that loads page 1 from the
 * server, then loads the next page by itself when the user scrolls to
 * the bottom. A "Load more" button does the same for anyone who can't
 * or doesn't scroll.
 *
 *     - Post 1
 *     - Post 2
 *     - ...
 *     - Post 10
 *     Loading posts...           <- while a page loads
 *     [ Load more ]
 *     (invisible "sentinel" element: when it scrolls into view, load more)
 *
 *     <InfiniteFeed />
 *
 * ========================================================================
 * BACKGROUND: INTERSECTIONOBSERVER
 * ========================================================================
 * How do you know the user reached the bottom? Put an empty element (a
 * "sentinel") after the list, and ask the browser to tell you when it
 * becomes visible. IntersectionObserver does exactly that:
 *
 *     const observer = new IntersectionObserver((entries) => {
 *       if (entries.some((entry) => entry.isIntersecting)) {
 *         console.log("the sentinel is on screen!");
 *       }
 *     });
 *     observer.observe(sentinelElement);
 *     // later, to stop watching:
 *     observer.disconnect();
 *
 * In React you get the element with a ref, start observing in a
 * useEffect, and disconnect in the effect's cleanup function (the
 * function the effect returns, which React runs on unmount).
 *
 * One catch: the observer's callback is created ONCE, so it would
 * remember OLD state forever (a "stale closure"). The usual fix is to
 * keep the latest `loadMore` function in a ref and call
 * `loadMoreRef.current()` from the callback.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * The server: GET /api/posts?page=N answers with JSON
 *     { "posts": [{ "id": 1, "title": "Post 1" }, ...], "nextPage": 2 }
 * where nextPage is null on the last page. Any status that isn't OK is
 * a failure.
 *
 * Your component renders:
 * - <ul aria-label="Posts">, always, with one <li> per post title, in
 *   order (page 1 first).
 * - While a page loads: <p role="status">Loading posts...</p>
 * - When more pages exist and nothing is loading: a button "Load more".
 * - When the last page has loaded: <p>You're all caught up!</p>
 * - When a request fails: <p role="alert">Could not load posts.</p>
 *   and a button "Try again". ("Load more" is hidden then.)
 * - An empty sentinel <div> AFTER the list, watched by an
 *   IntersectionObserver.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Request page 1 when it first appears.
 * 2. Add each page's posts to the END of the list.
 * 3. "Load more" requests the next page.
 * 4. When the sentinel becomes visible (an entry with
 *    isIntersecting: true), request the next page, just like "Load
 *    more".
 * 5. Never ask for a page while another request is running, and never
 *    ask for a page after the last one. Two quick triggers must lead to
 *    ONE request.
 * 6. On failure, show the alert and "Try again". Keep the posts you
 *    already have. "Try again" requests the SAME page again. The
 *    sentinel does not retry by itself.
 * 7. If `IntersectionObserver` doesn't exist (old browsers, and the
 *    test environment unless your test adds a fake), skip it. "Load
 *    more" still works.
 * 8. Disconnect the observer when the component unmounts.
 *
 * You can assume:
 * - Pages are numbered 1, 2, 3... and nextPage is always "this page + 1"
 *   or null.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     appear                 ->  "Loading posts...", GET ?page=1
 *     page 1 arrives         ->  Post 1 ... Post 10, "Load more"
 *     sentinel visible       ->  GET ?page=2, then Post 11 ... Post 20
 *     page 3 has nextPage null
 *                            ->  "You're all caught up!", no "Load more"
 *     page 2 answers 500     ->  "Could not load posts." + "Try again",
 *                                posts 1-10 still listed
 *     click "Try again"      ->  GET ?page=2 again
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Shows "Loading posts..." then page 1
 * - "Load more" adds page 2 after page 1
 * - The sentinel becoming visible loads the next page
 * - isIntersecting: false does nothing
 * - Two quick triggers make only one request
 * - Last page: "You're all caught up!", no "Load more", and the
 *   sentinel no longer requests anything
 * - A failure keeps old posts, and "Try again" asks for the same page
 * - Works without IntersectionObserver (button only)
 * - Unmounting disconnects the observer
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State: `posts`, `nextPage` (start at 1, null when done),
 *    `loading` and `error`.
 * 2. One `loadMore()` function does all the work: check the guards,
 *    fetch `/api/posts?page=${nextPage}`, then append and update
 *    nextPage. Call it from the mount effect, the button, "Try again"
 *    and the observer.
 * 3. State updates are not instant, so two quick calls can both see
 *    `loading === false`. Keep a `loadingRef` (useRef) that you set to
 *    true BEFORE fetching, and check it as the guard.
 * 4. Store the latest loadMore in a ref on every render
 *    (`loadMoreRef.current = loadMore`) and make the observer once,
 *    in a `useEffect(..., [])`, calling `loadMoreRef.current()`.
 * 5. TESTING: jsdom (the fake browser tests run in) has NO
 *    IntersectionObserver. Make a fake one in your test, let your
 *    component create it, and fire its callback by hand:
 *
 *        class FakeObserver {
 *          static instances: FakeObserver[] = [];
 *          elements: Element[] = [];
 *          disconnected = false;
 *          constructor(public callback: IntersectionObserverCallback) {
 *            FakeObserver.instances.push(this);
 *          }
 *          observe(element: Element) { this.elements.push(element); }
 *          unobserve() {}
 *          disconnect() { this.disconnected = true; }
 *          takeRecords() { return []; }
 *          // call this from tests: pretend the sentinel scrolled in or out
 *          trigger(isIntersecting: boolean) {
 *            const entries = this.elements.map(
 *              (target) => ({ isIntersecting, target }) as IntersectionObserverEntry,
 *            );
 *            this.callback(entries, this as unknown as IntersectionObserver);
 *          }
 *        }
 *
 *        beforeEach(() => {
 *          FakeObserver.instances = [];
 *          vi.stubGlobal("IntersectionObserver", FakeObserver);
 *        });
 *        afterEach(() => vi.unstubAllGlobals());
 *
 *        // in a test:
 *        act(() => FakeObserver.instances.at(-1)!.trigger(true));
 *
 * 6. TESTING: count requests per page with an MSW handler that reads
 *    the query string:
 *        http.get("/api/posts", ({ request }) => {
 *          const page = Number(new URL(request.url).searchParams.get("page"));
 *          requested.push(page);
 *          ...
 *        })
 *    Use MSW's `delay()` in the handler when you need a request to stay
 *    "in flight" for a moment (for example, to trigger twice quickly).
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Fetching page after page and appending results
 * - Refs for DOM elements AND for values that must not re-render
 * - Stale closures, and the "latest value in a ref" pattern
 * - Effect cleanup for observers and subscriptions
 * - Graceful fallback when a browser feature is missing
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Start loading a bit early with the `rootMargin: "200px"` option.
 * - Cancel the request on unmount with an AbortController.
 * - Turn the logic into a reusable `useInfiniteList(fetchPage)` hook.
 */

import type { ReactElement } from "react";

export type Post = {
  id: number;
  title: string;
};

export type FeedPage = {
  /** The posts on this page, in order. */
  posts: Post[];
  /** The number of the next page, or null on the last page. */
  nextPage: number | null;
};

export function InfiniteFeed(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: InfiniteFeed");
}
