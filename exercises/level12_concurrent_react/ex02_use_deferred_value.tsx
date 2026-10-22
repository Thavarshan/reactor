/**
 * Exercise: A search box that never waits (useDeferredValue)
 * Level:    12 - Concurrent React
 * Topics:   useDeferredValue, Suspense, showing stale content
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <DeferredSearch> component: a search box above a list of
 * results. The box must always show what the user types right away. The
 * results are slow, so they may lag behind. While they lag, keep the OLD
 * results on screen and say "Updating results...".
 *
 *     Search: [ app_        ]
 *     Updating results...
 *       - apricot            <- old results, for "ap"
 *       - apple
 *
 *     <DeferredSearch search={(query) => fetchFruits(query)} />
 *
 * ========================================================================
 * BACKGROUND: DEFERRED VALUES
 * ========================================================================
 * useDeferredValue gives you a copy of a value that is allowed to "lag
 * behind" the real one:
 *
 *     const [text, setText] = useState("");
 *     const deferredText = useDeferredValue(text);
 *
 * When `text` changes, React first re-renders (draws the component
 * again) with the NEW `text` but the OLD `deferredText`. That render is
 * quick, so the screen updates at once. Then, in the background, React
 * tries a second render where `deferredText` catches up.
 *
 * If that background render is slow, or has to wait for data, the user
 * keeps seeing the quick version. So:
 *
 *     text !== deferredText    means "the slow part is behind"
 *
 * Use `text` for things that must feel instant (the input box) and
 * `deferredText` for the slow part (the results).
 *
 * The slow part here is <SearchResults> (PROVIDED below). It WAITS for
 * the `search` function to answer. A component that waits "suspends",
 * and the nearest <Suspense fallback={...}> shows its fallback until it
 * is ready. With a deferred value, React shows the old results instead
 * of that fallback.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A text input with the label "Search" (use <label> and <input>).
 * - The PROVIDED <SearchResults> renders <ul aria-label="Results"> with
 *   one <li> per result, or <p>No results</p> when the list is empty.
 * - Around <SearchResults>, a <Suspense> whose fallback is
 *   <p>Loading results...</p>.
 * - While the results lag behind the input:
 *   <p role="status">Updating results...</p>. Render it ONLY then.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept a `search` prop: a function that takes the query and returns
 *    a Promise of matching strings.
 * 2. Keep the input's text in state (a "controlled input": the input
 *    always shows the state, and typing updates the state). It starts
 *    empty and shows every keystroke immediately.
 * 3. Make a deferred copy of the text with useDeferredValue.
 * 4. Render <SearchResults query={deferredQuery} search={search} />
 *    inside the Suspense boundary. Pass the DEFERRED text, not the live
 *    one.
 * 5. Show the "Updating results..." status whenever the live text and
 *    the deferred text differ.
 *
 * You can assume:
 * - `search` doesn't change while the component is on screen.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     first render             ->  "Loading results..."  (no old results yet)
 *     search("") answers [apple, banana]
 *                              ->  apple, banana listed
 *     type "a"                 ->  the input shows "a" at once,
 *                                  apple and banana still listed,
 *                                  "Updating results..." shows
 *     search("a") answers [apple, banana]
 *                              ->  results for "a", no status
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render shows "Loading results..." until the first answer
 * - The input shows typed text immediately, even before results arrive
 * - While a new query loads: old results stay, the status shows, and
 *   "Loading results..." does NOT come back
 * - When the answer arrives: new results, no status
 * - An empty answer shows "No results"
 * - Typing several letters quickly: the results end up matching the
 *   FULL text, even if earlier queries never answer
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Two values: `query` (state) and `deferredQuery`
 *    (useDeferredValue(query)). The status is `query !== deferredQuery`.
 * 2. Place the status OUTSIDE the Suspense boundary, so it can show
 *    while the results are waiting.
 * 3. TESTING: in tests, React finishes all rendering before `act()` (and
 *    every user-event action) returns, so a list that is merely slow to
 *    DRAW would never look stale in a test. A list that WAITS for data
 *    does look stale, which is why <SearchResults> waits.
 *    `createControlledSearch` (PROVIDED) gives you a `search` function
 *    that only answers when you tell it to:
 *
 *        const fake = createControlledSearch();
 *        await act(async () => { render(<DeferredSearch search={fake.search} />); });
 *        await act(async () => fake.respond("", ["apple", "banana"]));
 *
 * 4. TESTING: anything that makes a component wait must happen inside an
 *    awaited act, or React may never show the result. That includes
 *    typing:
 *
 *        await act(() => user.type(screen.getByLabelText("Search"), "a"));
 *
 * 5. TESTING: `fake.calls` lists every query `search` was asked for.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - useDeferredValue: letting a slow part lag behind
 * - Urgent updates (typing) versus background work (results)
 * - Showing stale content instead of a loading fallback
 * - Why tests can see waiting, but not slow drawing
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Dim the stale results with `style={{ opacity: 0.5 }}`.
 * - Show "Searching for "ap"..." with the text being searched.
 * - Replace the provided search with a real fetch to an /api endpoint.
 */

import { use, type ReactElement } from 'react';

export type DeferredSearchProps = {
  /** Finds matches for a query. Returns a Promise of result strings. */
  search: (query: string) => Promise<string[]>;
};

// PROVIDED: you don't need to change anything below, until DeferredSearch.

// Remembers one Promise per search function and query, so asking twice
// for the same query gives the SAME Promise. (`use` needs that.)
const resultsCache = new WeakMap<
  DeferredSearchProps['search'],
  Map<string, Promise<string[]>>
>();

function getResults(search: DeferredSearchProps['search'], query: string) {
  let byQuery = resultsCache.get(search);
  if (!byQuery) {
    byQuery = new Map();
    resultsCache.set(search, byQuery);
  }
  let promise = byQuery.get(query);
  if (!promise) {
    promise = search(query);
    byQuery.set(query, promise);
  }
  return promise;
}

/**
 * PROVIDED: you don't need to change this.
 * Shows the results for `query`. It WAITS (suspends) until `search`
 * answers, so it must sit inside a <Suspense> boundary.
 */
export function SearchResults({
  query,
  search,
}: {
  query: string;
  search: DeferredSearchProps['search'];
}) {
  const results = use(getResults(search, query));
  if (results.length === 0) {
    return <p>No results</p>;
  }
  return (
    <ul aria-label="Results">
      {results.map((result) => (
        <li key={result}>{result}</li>
      ))}
    </ul>
  );
}

/**
 * PROVIDED: you don't need to change this. A helper for your TESTS.
 * `search` waits until you call `respond(query, results)` for that query.
 * `calls` lists every query that `search` was asked for.
 */
export function createControlledSearch() {
  const answers = new Map<string, (results: string[]) => void>();
  const promises = new Map<string, Promise<string[]>>();
  const calls: string[] = [];

  function promiseFor(query: string) {
    let promise = promises.get(query);
    if (!promise) {
      promise = new Promise<string[]>((resolve) => answers.set(query, resolve));
      promises.set(query, promise);
    }
    return promise;
  }

  return {
    calls,
    search(query: string) {
      calls.push(query);
      return promiseFor(query);
    },
    respond(query: string, results: string[]) {
      void promiseFor(query);
      answers.get(query)!(results);
    },
  };
}

export function DeferredSearch({ search }: DeferredSearchProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: DeferredSearch');
}
