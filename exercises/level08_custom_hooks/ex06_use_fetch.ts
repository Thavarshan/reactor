/**
 * Exercise: useFetch
 * Level:    08 - Custom Hooks
 * Topics:   custom hooks, generics, fetch, AbortController, effect
 *           cleanup, waitFor, MSW
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write a reusable hook that fetches JSON from a URL and tells you how
 * it went: still loading, failed, or done with data. It cancels
 * requests nobody needs any more, and it can fetch again on demand.
 *
 *     const { data, error, loading, refetch } = useFetch<User>("/api/users/1");
 *
 * ========================================================================
 * BACKGROUND: GENERICS
 * ========================================================================
 * A GENERIC function takes a type as a kind of argument, written in
 * angle brackets. The caller says what shape of data to expect:
 *
 *     function firstItem<T>(list: T[]): T | undefined {
 *       return list[0];
 *     }
 *     firstItem<string>(["a", "b"]);   // TypeScript knows: string
 *
 * TypeScript can't check what a server really sends. useFetch<User>
 * is a promise YOU make about the JSON. Inside the hook, a cast like
 * `(await response.json()) as T` is fine.
 *
 * ========================================================================
 * BACKGROUND: CANCELLING A REQUEST
 * ========================================================================
 * An AbortController cancels a fetch. Pass its `signal` to fetch, and
 * call abort() when you no longer need the answer:
 *
 *     const controller = new AbortController();
 *     fetch("/api/slow", { signal: controller.signal })
 *       .catch((error) => console.log(error.name));   // "AbortError"
 *     controller.abort();
 *
 * An aborted fetch REJECTS with an error named "AbortError". That isn't
 * a real failure. You cancelled it on purpose, so ignore it.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your hook must:
 * 1. Accept a `url` and return an object with `data`, `error`,
 *    `loading` and `refetch`.
 * 2. Fetch `url` (a GET request) when the hook first renders, and again
 *    whenever `url` changes.
 * 3. While a request is running, return loading: true, data: undefined
 *    and error: undefined. The very first render already returns
 *    loading: true.
 * 4. On a successful response (status 200 to 299), return the parsed
 *    JSON as `data`, with loading: false and error: undefined.
 * 5. On any other status, return an Error whose message is exactly
 *    "Request failed with status 404" (with the real status number), with
 *    loading: false and data: undefined.
 * 6. If fetch itself fails (no network), return the error it threw,
 *    with loading: false and data: undefined.
 * 7. Abort the running request when `url` changes or the component
 *    unmounts. Pass an AbortController's signal to fetch.
 * 8. Never let an old request change the result. After an abort, its
 *    data or error must not show up, and the AbortError must not
 *    become `error`.
 * 9. Make refetch() fetch the same `url` again, following rules 3 to 8.
 *    A refetch aborts a request that is still running.
 *
 * You can assume:
 * - The server always answers with JSON when the status is 2xx.
 * - `url` is never an empty string.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     server: GET /api/users/1  ->  200 { "name": "Ada" }
 *       first render        ->  { loading: true,  data: undefined }
 *       when it arrives     ->  { loading: false, data: { name: "Ada" } }
 *
 *     server: GET /api/users/9  ->  404
 *       when it arrives     ->  { loading: false,
 *                                 error: Error("Request failed with status 404") }
 *
 *     url "/api/users/1" (slow) then quickly "/api/users/2" (fast)
 *       the first request is aborted
 *       data ends as user 2, and stays user 2 forever
 *
 *     refetch()             ->  loading: true again, then the new data
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render: loading true, data and error undefined
 * - Success: data is the JSON, loading false
 * - A 404 or 500: error message "Request failed with status 500"
 * - A network failure (HttpResponse.error()): error is an Error
 * - Changing the url aborts the old request (its signal is aborted)
 * - A slow old response never replaces newer data, and error stays
 *   undefined
 * - Unmounting aborts the running request
 * - refetch() requests the url again and shows the new data
 * - The type argument works: useFetch<{ name: string }>(...) lets you
 *   write result.current.data?.name with no TypeScript error
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Keep data, error and loading in state. One state object holding
 *    all three is easiest to keep consistent.
 * 2. Do the fetching in an effect that depends on `url`. Create the
 *    AbortController inside the effect, and abort it in the cleanup.
 * 3. response.ok is true for statuses 200 to 299. If it is false,
 *    throw your own Error so one catch handles both kinds of failure.
 * 4. In your .then and .catch, check controller.signal.aborted first.
 *    If it is true, return without touching state.
 * 5. For refetch, keep a counter in state. Add it to the effect's
 *    dependency array, and make refetch add 1 to it.
 * 6. TESTING: give each test its own fake responses with server.use:
 *        server.use(
 *          http.get("/api/users/1", () => HttpResponse.json({ name: "Ada" })),
 *        );
 *    For an error status: new HttpResponse(null, { status: 500 }).
 *    For a network failure: HttpResponse.error().
 * 7. TESTING: the answer arrives later, so wait for it:
 *        await waitFor(() => expect(result.current.loading).toBe(false));
 * 8. TESTING: to make a response slow, `await delay(100)` (from "msw")
 *    inside the handler. To check that a request was aborted, save the
 *    request's signal in the handler and look at it afterwards:
 *        let signal: AbortSignal | undefined;
 *        http.get("/api/slow", async ({ request }) => {
 *          signal = request.signal;
 *          await delay(100);
 *          return HttpResponse.json({});
 *        });
 *        ...
 *        expect(signal?.aborted).toBe(true);
 *    Wait until the handler has run (waitFor(() => expect(signal)
 *    .toBeDefined())) before you rerender or unmount.
 * 9. TESTING: to check an old response never wins, wait a little longer
 *    than its delay after the new data arrives, then check data again:
 *        await new Promise((resolve) => setTimeout(resolve, 150));
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Moving data fetching into a reusable custom hook
 * - Effect cleanup that cancels async work (AbortController)
 * - Generic hooks: useFetch<T>
 * - Re-running an effect on demand with a counter in its dependencies
 * - Testing async hooks with waitFor and MSW
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Keep the old data on screen during a refetch (only clear it when
 *   the url changes), so the page doesn't flash empty.
 * - Accept `null` as the url to mean "don't fetch yet", with
 *   loading: false.
 * - Rewrite one of your level 07 components to use this hook. How much
 *   code disappears?
 */

export type UseFetchResult<T> = {
  /** The parsed JSON from the last successful request, or undefined. */
  data: T | undefined;
  /** What went wrong with the last request, or undefined. */
  error: Error | undefined;
  /** True while a request is running. */
  loading: boolean;
  /** Fetches the same url again. */
  refetch: () => void;
};

export function useFetch<T>(url: string): UseFetchResult<T> {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: useFetch");
}
