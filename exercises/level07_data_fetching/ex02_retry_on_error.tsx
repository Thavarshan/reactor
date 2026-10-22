/**
 * Exercise: Retry on Error
 * Level:    07 - Data Fetching
 * Topics:   refetching on demand, effect dependencies as triggers, MSW one-time handlers
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <QuoteOfTheDay> that loads a quote from the server. If the
 * request fails, show an error with a "Try again" button that loads it
 * again.
 *
 *     Loading quote...
 *
 *     Could not load the quote.   [ Try again ]
 *
 *     "The more I study, the more insatiable do I feel my genius for it."
 *     Ada Lovelace
 *
 *     <QuoteOfTheDay />
 *
 * ========================================================================
 * BACKGROUND: FETCHING AGAIN ON DEMAND
 * ========================================================================
 * An effect runs again when something in its dependency array changes.
 * So far that was a prop, like `userId`. But a button click can also
 * trigger a new fetch: make the click change a piece of state, and put
 * that state in the dependency array. A plain counter works well as a
 * "please run again" signal:
 *
 *     const [version, setVersion] = useState(0);
 *
 *     useEffect(() => {
 *       console.log("running, version", version);
 *     }, [version]);
 *
 *     <button onClick={() => setVersion((v) => v + 1)}>Run again</button>
 *
 * In development, React's <StrictMode> runs each effect twice when the
 * component appears (effect, cleanup, effect), so the FIRST load sends
 * two requests. Use the `ignore` flag cleanup from the previous exercise
 * so the first answer is thrown away.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * The server: `GET /api/quote` answers with JSON like
 *     { "text": "The more I study...", "author": "Ada Lovelace" }
 *
 * The component shows exactly one of:
 * - Loading: an element with role="status" and the text
 *   "Loading quote...".
 * - Success: the quote text and the author's name, each in its own
 *   element (for example a <blockquote> and a <figcaption> inside a
 *   <figure>), so `getByText(text)` and `getByText(author)` find them.
 * - Failure (an error status, or no answer at all): an element with
 *   role="alert" and the text "Could not load the quote.", plus a
 *   button named "Try again".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Request `/api/quote` when it appears, showing the loading status.
 * 2. Show the quote and author on success.
 * 3. Show the alert and the "Try again" button on any failure. Check
 *    `response.ok`: fetch doesn't reject on an error status.
 * 4. When "Try again" is clicked: hide the alert and the button, show
 *    the loading status, and send exactly ONE new request.
 * 5. Allow as many retries as the user wants.
 *
 * You can assume:
 * - Nothing else changes while a request is in flight.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     server: fails once, then answers with the quote
 *
 *     <QuoteOfTheDay />
 *       at first               ->  "Loading quote..."
 *       first answer: 500      ->  alert "Could not load the quote.", "Try again"
 *       click "Try again"      ->  "Loading quote...", no alert, no button
 *       second answer: quote   ->  the quote and "Ada Lovelace"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Success on the first try: the quote shows and there's no
 *   "Try again" button
 * - A 500 shows the alert and the button
 * - A network failure (`HttpResponse.error()`) shows them too
 * - Fail, then click "Try again" and succeed: the quote shows and the
 *   alert is gone
 * - While retrying: loading shows, and the alert and button are gone
 * - Fail twice: after the second failure the button is back, and a
 *   third try can succeed
 * - Each click on "Try again" sends exactly one request (count them)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Keep the same three-state idea as the user profile exercise:
 *    loading, error, or success with the quote.
 * 2. Add an "attempt" counter to state. "Try again" adds one, and the
 *    effect lists it as a dependency. The effect doesn't even need to
 *    read the number: changing it is the signal.
 * 3. Set the state back to loading at the start of the effect, or in the
 *    click handler. Either hides the alert and button straight away.
 * 4. TESTING: MSW can answer differently the first time. A handler with
 *    `{ once: true }` is used for one request, then skipped. Handlers
 *    added later with `server.use` are tried FIRST, so add the normal
 *    answer, then the one-time failure on top:
 *        server.use(http.get("/api/quote", () => HttpResponse.json(QUOTE)));
 *        server.use(
 *          http.get("/api/quote", () => HttpResponse.json({}, { status: 500 }), { once: true }),
 *        );
 * 5. TESTING: for full control, keep a counter in one handler and
 *    decide by its value:
 *        let calls = 0;
 *        server.use(http.get("/api/quote", () => {
 *          calls++;
 *          return calls < 3 ? HttpResponse.json({}, { status: 500 }) : HttpResponse.json(QUOTE);
 *        }));
 *    The counter also proves rule 4: `expect(calls).toBe(2)` after one
 *    retry.
 * 6. TESTING: to see the loading state DURING a retry, the answer must
 *    not arrive too quickly. MSW's `delay` waits before answering:
 *        http.get("/api/quote", async () => { await delay(100); return HttpResponse.json(QUOTE); })
 *    Check the loading text right after the click, then `findByText`
 *    the quote. (`import { delay } from "msw"`.)
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Using state as a trigger in an effect's dependency array
 * - Resetting to a loading state before a new request
 * - Error recovery UI with role="alert"
 * - MSW one-time handlers and delays in tests
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a "New quote" button on success that loads another quote.
 * - Retry automatically, up to 3 times, waiting a little longer each
 *   time, before showing the button.
 * - Show "Attempt 2 of 3" while retrying.
 */

import type { ReactElement } from "react";

/** A quote, as the server sends it. */
export type Quote = {
  text: string;
  author: string;
};

export function QuoteOfTheDay(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: QuoteOfTheDay");
}
