/**
 * Exercise: User Profile
 * Level:    07 - Data Fetching
 * Topics:   fetch in useEffect, loading/error/success states, response.ok, MSW
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <UserProfile> that loads one user from the server and shows
 * their name and email. While it waits it says so, and if the request
 * fails it shows an error instead.
 *
 *     Loading user...          ->     Ada Lovelace            (an <h2>)
 *                                     Email: ada@example.com
 *
 *     <UserProfile userId={1} />
 *
 * ========================================================================
 * BACKGROUND: FETCHING IN AN EFFECT
 * ========================================================================
 * `fetch(url)` asks a server for data and returns a PROMISE: a value
 * that arrives later. Talking to a server is a SIDE EFFECT (it reaches
 * outside the component), so you start it in useEffect:
 *
 *     useEffect(() => {
 *       fetch("/api/weather")
 *         .then((response) => response.json())
 *         .then((data) => setWeather(data));
 *     }, []);
 *
 * Three things surprise almost everyone:
 *
 * 1. `fetch` does NOT fail on a 404 or 500 answer. It only rejects when
 *    there is no answer at all (no network). For an error status, the
 *    promise still resolves, with `response.ok` set to false. You must
 *    check `response.ok` (or `response.status`) yourself.
 * 2. A component shows ONE of three states at a time: loading, error,
 *    or success. Model them so you can't end up "loading AND failed".
 * 3. In development, React's <StrictMode> runs each effect twice when a
 *    component appears (effect, cleanup, effect), so you'll see TWO
 *    requests in the browser's network tab. That's expected. A cleanup
 *    that tells the first request "ignore your answer" keeps it
 *    harmless, and the later exercises in this level need that anyway:
 *
 *        useEffect(() => {
 *          let ignore = false;
 *          fetch(...).then((data) => { if (!ignore) setData(data); });
 *          return () => { ignore = true; };
 *        }, [...]);
 *
 * In tests there is no real server. MSW (Mock Service Worker) catches
 * each request and answers with whatever the test tells it to. See the
 * HINTS.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * The server: `GET /api/users/<userId>` answers with JSON like
 *     { "id": 1, "name": "Ada Lovelace", "email": "ada@example.com" }
 *
 * The component shows exactly one of:
 * - Loading: an element with role="status" and the text
 *   "Loading user...".
 * - Success: a heading (<h2>) with the user's name, and the text
 *   "Email: ada@example.com".
 * - Not found (status 404): an element with role="alert" and the text
 *   "User not found.". role="alert" makes screen readers announce it.
 * - Any other failure (another error status, or no answer at all): an
 *   element with role="alert" and the text "Could not load the user."
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Request `/api/users/<userId>` when it appears. Use exactly this
 *    relative URL.
 * 2. Show the loading status until the answer arrives, and remove it
 *    afterwards.
 * 3. On success, show the name heading and the email line.
 * 4. On a 404 answer, show "User not found."
 * 5. On any other failure, show "Could not load the user."
 * 6. When `userId` changes, show the loading status again (not the
 *    old user), request the new user, then show them.
 * 7. Request each user only once: re-rendering with the same `userId`
 *    must not fetch again.
 *
 * You can assume:
 * - Answers arrive in the same order the requests were sent. (The
 *   stale responses exercise drops this assumption.)
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     server: /api/users/1 -> { id: 1, name: "Ada Lovelace", email: "ada@example.com" }
 *
 *     <UserProfile userId={1} />
 *       at first           ->  "Loading user..."
 *       answer arrives     ->  heading "Ada Lovelace", "Email: ada@example.com"
 *
 *     server: /api/users/99 -> status 404
 *     <UserProfile userId={99} />   ->  alert "User not found."
 *
 *     server: /api/users/1 -> status 500
 *     <UserProfile userId={1} />    ->  alert "Could not load the user."
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Shows "Loading user..." first, then the user, and the loading text
 *   is gone afterwards
 * - A 404 shows "User not found."
 * - A 500 shows "Could not load the user."
 * - A network failure (`HttpResponse.error()`) shows "Could not load
 *   the user."
 * - Changing userId shows loading again, then the new user, and the old
 *   name is gone
 * - Re-rendering with the same userId sends no second request (count
 *   the requests in your handler)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One state value can hold all three cases, e.g.
 *        { status: "loading" }
 *        { status: "error", message: string }
 *        { status: "success", user: User }
 *    TypeScript then checks you only read `user` when it exists.
 * 2. The effect depends on `userId`. At its start, set the state back
 *    to loading.
 * 3. Inside the first `.then`, check the response before reading it:
 *    `if (response.status === 404) ...`, `if (!response.ok) ...`.
 *    Throwing an Error there jumps straight to your `.catch`. async/await
 *    works too: write an `async function load()` INSIDE the effect and
 *    call it. (The effect itself must not be async, because it has to
 *    return its cleanup, not a promise.)
 * 4. TESTING: tell the fake server what to answer, at the start of each
 *    test, with `server.use`:
 *        server.use(
 *          http.get("/api/users/1", () =>
 *            HttpResponse.json({ id: 1, name: "Ada Lovelace", email: "ada@example.com" }),
 *          ),
 *        );
 *    For an error status: `HttpResponse.json({}, { status: 404 })`.
 *    For "no answer at all": `HttpResponse.error()`.
 *    Handlers are removed after each test, so tests don't leak into each
 *    other.
 * 5. TESTING: the answer arrives LATER, so use the async `findBy...`
 *    queries. They keep looking for up to a second:
 *        expect(await screen.findByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
 *    The loading text is there straight away, so `getByRole` works for it.
 * 6. TESTING: to count requests, add to a variable inside the handler:
 *        let calls = 0;
 *        server.use(http.get("/api/users/1", () => { calls++; return HttpResponse.json(...); }));
 *    After `rerender`, give a wrong extra request a moment to arrive
 *    before you check: `await new Promise((r) => setTimeout(r, 50));`
 *    then `expect(calls).toBe(1)`.
 * 7. TESTING: if a test prints "[MSW] Error: intercepted a request
 *    without a matching request handler", your component asked for a
 *    URL that no handler covers. Check the URL you build.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Fetching data in useEffect, with the id in the dependency array
 * - Modelling loading, error and success as one state
 * - Checking response.ok, because fetch doesn't reject on 404/500
 * - The "ignore" flag cleanup, and StrictMode's double request
 * - Testing async UI with MSW and findBy queries
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Show the email as a `mailto:` link.
 * - Show a "Try again" button on errors (that's the next exercise).
 * - Move the fetching into a custom hook, `useUser(userId)`.
 */

import type { ReactElement } from "react";

/** A user, as the server sends it. */
export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserProfileProps = {
  /** Which user to load: requests /api/users/<userId>. */
  userId: number;
};

export function UserProfile({ userId }: UserProfileProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: UserProfile");
}
