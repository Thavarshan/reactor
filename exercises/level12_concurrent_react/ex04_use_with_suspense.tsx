/**
 * Exercise: Reading data with use()
 * Level:    12 - Concurrent React
 * Topics:   use(promise), caching Promises, Suspense, error boundaries
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <UserCard userId={1} /> that loads a user from
 * /api/users/1 and shows their name and email. While it loads, show
 * "Loading user...". If loading fails, show "Could not load this user."
 *
 *     +-------------------------+
 *     | Ada Lovelace            |
 *     | ada@example.com         |
 *     +-------------------------+
 *
 *     <UserCard userId={1} />
 *
 * You'll write four small pieces: `fetchUser` (gets a user, and
 * remembers the answer), `clearUserCache`, <UserDetails> (reads the
 * user with `use`) and <UserCard> (adds the loading and error screens).
 *
 * ========================================================================
 * BACKGROUND: use() AND SUSPENSE
 * ========================================================================
 * `use` reads the value of a Promise during render:
 *
 *     function Quote({ quotePromise }: { quotePromise: Promise<string> }) {
 *       const quote = use(quotePromise);   // a string, not a Promise
 *       return <blockquote>{quote}</blockquote>;
 *     }
 *
 * If the Promise hasn't finished yet, the component "suspends": React
 * stops drawing it and shows the nearest <Suspense fallback={...}>
 * instead. When the Promise finishes, React draws the component again
 * and `use` returns the value. If the Promise fails (rejects), `use`
 * THROWS the error, and the nearest error boundary catches it. An error
 * boundary is a component that shows a fallback when something below
 * it throws. One is PROVIDED below.
 *
 * The big trap: `use` must get the SAME Promise every time the
 * component renders. This is wrong:
 *
 *     const user = use(fetch(`/api/users/${id}`).then(r => r.json()));
 *     // a NEW Promise on every render: React waits forever
 *
 * So you keep each Promise in a cache (a Map from id to Promise) and
 * hand out the cached one.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * <UserDetails> renders:
 * - A heading (<h2>) with the user's name.
 * - A paragraph with the user's email.
 *
 * <UserCard> renders:
 * - While loading: <p role="status">Loading user...</p>
 * - On failure:    <p role="alert">Could not load this user.</p>
 * - Otherwise:     the <UserDetails> above.
 *
 * The server: GET /api/users/:id answers with JSON like
 * { "id": 1, "name": "Ada Lovelace", "email": "ada@example.com" }.
 * Any status that isn't OK (such as 404 or 500) is a failure.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your code must:
 * 1. fetchUser(id): request GET /api/users/{id} and return a Promise of
 *    the User. If the response is not OK, the Promise rejects with
 *    `new Error("Could not load user {id}")`.
 * 2. fetchUser(id) returns the SAME Promise every time for the same id,
 *    so each user is requested only once.
 * 3. clearUserCache(): forget every cached Promise.
 * 4. <UserDetails userId>: read the user with `use(fetchUser(userId))`
 *    and render the heading and email.
 * 5. <UserCard userId>: wrap <UserDetails> in a <Suspense> (fallback:
 *    the loading status) and wrap THAT in the provided <ErrorBoundary>
 *    (fallback: the alert).
 * 6. When `userId` changes, load and show the new user. After a
 *    failure, a new `userId` must get a fresh chance (the alert must not
 *    stick around).
 *
 * You can assume:
 * - `userId` is a positive whole number.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <UserCard userId={1} />    ->  "Loading user...", then
 *                                    heading "Ada Lovelace" and
 *                                    "ada@example.com"
 *     two <UserCard userId={1} /> on one page
 *                                ->  ONE request to /api/users/1
 *     /api/users/9 answers 404   ->  "Could not load this user."
 *     change userId 1 -> 2       ->  "Loading user...", then user 2
 *     change userId 2 -> 1       ->  user 1 straight away (cached)
 *
 *     fetchUser(1) === fetchUser(1)       ->  true
 *     await fetchUser(9)  (a 404)         ->  throws "Could not load user 9"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Shows "Loading user..." first, then the name and email
 * - fetchUser gives back the same Promise for the same id
 * - Two cards for the same user make only one request
 * - A failed request shows the alert, and fetchUser rejects with
 *   "Could not load user 9"
 * - Changing userId shows the loading status, then the new user
 * - Going back to an already loaded user shows it at once
 * - After a failure, changing to a working userId shows that user
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Make the cache at the top level of the file:
 *    `const cache = new Map<number, Promise<User>>()`. In fetchUser,
 *    return the cached Promise if there is one. Otherwise create it,
 *    store it, then return it.
 * 2. `fetch` only rejects on network errors, not on a 404. Check
 *    `response.ok` inside `.then` and `throw` your own Error.
 * 3. The order of wrappers matters. The error boundary goes OUTSIDE the
 *    Suspense: <ErrorBoundary><Suspense><UserDetails /></Suspense></ErrorBoundary>.
 * 4. An error boundary keeps showing its fallback until it is reset.
 *    The simplest reset is a `key`: `<ErrorBoundary key={userId}>`.
 *    A new key makes React throw the old boundary away and start fresh.
 * 5. TESTING: call clearUserCache() in `beforeEach`, or one test's
 *    cached users leak into the next test.
 * 6. TESTING: render inside an awaited act, or React may never show the
 *    user after it suspends:
 *        await act(async () => { render(<UserCard userId={1} />); });
 *        expect(await screen.findByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
 *    Do the same for `rerender(...)`.
 * 7. TESTING: count requests with a variable inside your MSW handler:
 *        let requests = 0;
 *        server.use(http.get("/api/users/:id", ({ params }) => { requests++; ... }));
 * 8. TESTING: React logs caught errors with console.error. Silence it in
 *    the failure tests with
 *    `vi.spyOn(console, "error").mockImplementation(() => {})`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - use(promise): reading async data during render
 * - Why the Promise must be cached (stable between renders)
 * - Suspense for loading, error boundaries for failures
 * - Resetting a component with `key`
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a "Try again" button to the error screen. It must remove the
 *   failed Promise from the cache first, or it will fail again at once.
 * - Start loading the next user when the mouse moves over a "Next"
 *   button (call fetchUser early, `use` will find it in the cache).
 * - Switch users inside startTransition, so the old user stays on
 *   screen while the next one loads.
 */

import { Component, type ReactNode, type ReactElement } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserCardProps = {
  /** Which user to load from /api/users/:id. */
  userId: number;
};

/**
 * PROVIDED: you don't need to change this.
 * Shows `fallback` instead of its children if any of them throws while
 * rendering (for example, when `use` reads a failed Promise).
 */
export class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function fetchUser(id: number): Promise<User> {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: fetchUser");
}

export function clearUserCache(): void {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: clearUserCache");
}

export function UserDetails({ userId }: UserCardProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: UserDetails");
}

export function UserCard({ userId }: UserCardProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: UserCard");
}
