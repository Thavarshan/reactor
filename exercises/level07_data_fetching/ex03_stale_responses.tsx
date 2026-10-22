/**
 * Exercise: Stale Responses
 * Level:    07 - Data Fetching
 * Topics:   race conditions, effect cleanup, the ignore flag, AbortController
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <UserPosts> list that loads the posts of the user given by the
 * `userId` prop. The prop can change quickly (picture someone clicking
 * through a list of users), and answers can come back in ANY order. Only
 * the answer for the CURRENT user may ever reach the screen.
 *
 *     Loading posts...      ->    - Notes on the Analytical Engine
 *                                 - Sketch of the Engine
 *
 *     <UserPosts userId={selectedUserId} />
 *
 * ========================================================================
 * BACKGROUND: RACE CONDITIONS
 * ========================================================================
 * Picture this:
 *
 *     0 ms    userId is 1, request A (user 1) starts. The server is slow.
 *     50 ms   userId becomes 2, request B (user 2) starts.
 *     80 ms   B answers: user 2's posts show. Good.
 *     300 ms  A answers: user 1's posts REPLACE them. Wrong user!
 *
 * That's a RACE CONDITION: the result depends on which request happens
 * to finish first. The fix uses the effect's CLEANUP function, which
 * React calls before running the effect again for the new userId. Two
 * common ways:
 *
 * 1. An "ignore" flag. The cleanup sets it, and the old request checks
 *    it before touching state:
 *
 *        useEffect(() => {
 *          let ignore = false;
 *          loadSomething().then((x) => { if (!ignore) setThing(x); });
 *          return () => { ignore = true; };
 *        }, [id]);
 *
 * 2. An AbortController, which actually cancels the old request:
 *
 *        const controller = new AbortController();
 *        fetch(url, { signal: controller.signal });
 *        return () => controller.abort();
 *
 *    A cancelled fetch REJECTS with an error named "AbortError". That's
 *    not a real failure, so don't show an error message for it.
 *
 * React's <StrictMode> runs each effect twice in development (effect,
 * cleanup, effect), so the very first request is always cleaned up at
 * once. If you use AbortController, StrictMode is where you'll first
 * see an AbortError.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * The server: `GET /api/users/<userId>/posts` answers with JSON like
 *     [{ "id": 1, "title": "Notes on the Analytical Engine" }, ...]
 *
 * The component shows exactly one of:
 * - Loading: an element with role="status" and the text
 *   "Loading posts...".
 * - Posts: a list (<ul>) with one list item (<li>) per post, whose text
 *   is the post's title.
 * - No posts (an empty array): the text "No posts yet." and no list.
 * - Failure (an error status, or no answer at all): an element with
 *   role="alert" and the text "Could not load posts."
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Request `/api/users/<userId>/posts` when it appears and whenever
 *    `userId` changes.
 * 2. Show the loading status while waiting. When `userId` changes,
 *    show it straight away: never show the old user's posts while the
 *    new ones load.
 * 3. Show the posts, "No posts yet." or the error, as above.
 * 4. NEVER show the answer to an older request, whether it's posts or
 *    an error, once `userId` has changed.
 * 5. Never show an error for a request that was cancelled on purpose.
 * 6. Work inside <StrictMode>.
 *
 * You can assume:
 * - `userId` is a positive whole number.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     server: user 1's posts take 200 ms, user 2's arrive at once
 *
 *     <UserPosts userId={1} />          ->  "Loading posts..."
 *     re-render with userId={2}         ->  still "Loading posts..."
 *     user 2's answer                   ->  user 2's titles
 *     200 ms later, user 1's answer     ->  STILL user 2's titles
 *
 *     server: user 3 has []             ->  "No posts yet."
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Loading first, then the titles in list items
 * - An empty array shows "No posts yet." and no list
 * - A 500 shows "Could not load posts."
 * - Switching user shows loading at once, without the old titles
 * - A slow old answer arriving after a fast new one is ignored
 * - A slow old ERROR arriving after a fast new answer is ignored too
 *   (no alert)
 * - Inside <StrictMode>: the posts show, and no alert appears
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Start from your user profile solution: one state value for
 *    loading, error or success, and an effect that depends on `userId`.
 * 2. Every `setState` that happens after the `await` (or inside a
 *    `.then`) must be guarded: only update if this effect hasn't been
 *    cleaned up.
 * 3. If you use AbortController, check the error in your `catch`:
 *    `if (error instanceof DOMException && error.name === "AbortError") return;`
 *    The ignore flag alone handles this too, because a cancelled
 *    request's effect was already cleaned up.
 * 4. TESTING: make user 1 slow with MSW's `delay`, and send different
 *    answers by reading the id from the URL:
 *        server.use(
 *          http.get("/api/users/:userId/posts", async ({ params }) => {
 *            if (params.userId === "1") {
 *              await delay(200);
 *              return HttpResponse.json(ADA_POSTS);
 *            }
 *            return HttpResponse.json(GRACE_POSTS);
 *          }),
 *        );
 *    Params are always strings, hence "1".
 * 5. TESTING: render with userId={1}, then straight away
 *    `rerender(<UserPosts userId={2} />)`, and `findByText` a user 2
 *    title. Then WAIT longer than user 1's delay, so the old answer has
 *    time to arrive:
 *        await act(() => new Promise((resolve) => setTimeout(resolve, 300)));
 *    act(...) makes React finish any update that answer causes. Now
 *    check that user 2's titles are still there and user 1's are not.
 * 6. TESTING: delete your guard for a moment and run the test again. It
 *    should FAIL. A test that can't fail proves nothing.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Race conditions between overlapping requests
 * - Effect cleanup as "this effect is out of date now"
 * - The ignore flag pattern, and AbortController
 * - StrictMode's double effect run and AbortError
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Use BOTH: abort the old request (saving the network) and keep the
 *   ignore flag (saving your state).
 * - Keep showing the old posts, dimmed, while the new ones load, with
 *   aria-busy="true" on the list.
 */

import type { ReactElement } from 'react';

/** A post, as the server sends it. */
export type Post = {
  id: number;
  title: string;
};

export type UserPostsProps = {
  /** Whose posts to load: requests /api/users/<userId>/posts. */
  userId: number;
};

export function UserPosts({ userId }: UserPostsProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: UserPosts');
}
