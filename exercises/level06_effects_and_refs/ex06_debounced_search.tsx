/**
 * Exercise: Debounced Search
 * Level:    06 - Effects and Refs
 * Topics:   setTimeout in useEffect, debouncing, cleanup, refs, fake timers
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <DebouncedSearch> box. It calls `onSearch` only once the user
 * has STOPPED typing for 300 ms, instead of on every key press. That
 * saves a server from answering "r", "re", "rea", "reac" and "react"
 * when only "react" matters.
 *
 *     Search [ react|          ]
 *
 *     <DebouncedSearch onSearch={(query) => console.log(query)} />
 *
 * ========================================================================
 * BACKGROUND: DEBOUNCING WITH AN EFFECT
 * ========================================================================
 * DEBOUNCING means "wait until things calm down, then act once". Each new
 * event cancels the previous wait and starts a fresh one.
 *
 * In React, an effect with a cleanup does this almost by itself. Look at
 * this effect, which says hello a second after `name` changes:
 *
 *     useEffect(() => {
 *       const id = setTimeout(() => console.log("hello", name), 1000);
 *       return () => clearTimeout(id);
 *     }, [name]);
 *
 * When `name` changes again before the second is up, React runs the
 * CLEANUP first (cancelling the old timer), then the effect again
 * (starting a new one). Only the last change survives long enough to
 * say hello. The cleanup also runs when the component is removed, so
 * nothing fires after it's gone.
 *
 * In development, React's <StrictMode> runs each effect twice when the
 * component appears (effect, cleanup, effect). Thanks to the cleanup,
 * the first timer is cancelled and you still get one call.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A search box: <input type="search">, which has the role "searchbox",
 *   with the accessible name "Search" (the name a screen reader reads
 *   out). Use <label> or aria-label.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Show what the user types straight away (it's a CONTROLLED input:
 *    its value comes from state).
 * 2. Call `onSearch` with the text, trimmed, `delay` ms after the last
 *    change. `delay` defaults to 300.
 * 3. Restart the wait on every change, so fast typing makes just one
 *    call at the end.
 * 4. Never call `onSearch` with the same query as the last call. The
 *    empty query "" counts as already searched at the start. So:
 *    - nothing is called on the first render,
 *    - typing only spaces calls nothing,
 *    - clearing the box after a search DOES call onSearch("").
 * 5. Not call `onSearch` after it is unmounted, even if a wait was
 *    still running.
 * 6. Call `onSearch` once (not twice) inside <StrictMode>.
 *
 * You can assume:
 * - `delay` doesn't change while the component is on the page.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <DebouncedSearch onSearch={spy} />
 *       type "react"                 ->  the box shows "react" at once
 *       wait 299 ms                  ->  spy not called yet
 *       wait 1 more ms               ->  spy called with "react"
 *
 *       type "r", wait 200 ms, type "e", wait 200 ms
 *                                    ->  not called: the wait restarted
 *       wait 100 more ms             ->  spy called once, with "re"
 *
 *     after searching "react":
 *       type "  react  ", wait 300   ->  not called again (same query)
 *       clear the box, wait 300      ->  spy called with ""
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Not called on the first render, even after waiting
 * - Not called at 299 ms, called at 300 ms with the trimmed text
 * - Fast typing (changes less than 300 ms apart) makes ONE call with
 *   the final text
 * - The same query again (even with extra spaces) is not searched twice
 * - Only spaces: not called
 * - Clearing the box after a search calls onSearch("")
 * - A custom delay works: delay={1000}
 * - Unmounting before the wait ends: never called
 * - Inside <StrictMode>: called exactly once
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State holds what's in the box. An effect that depends on it starts
 *    a setTimeout and returns a cleanup that clears it.
 * 2. "The last query I searched for" is not shown on screen, so it
 *    doesn't need state. A ref (`useRef("")`) is a box that keeps a
 *    value between renders without causing a re-render.
 * 3. At the start of the effect, compare the trimmed text with the ref.
 *    If they're the same, return early and start no timer. Update the
 *    ref inside the timer callback, right when you call onSearch.
 * 4. TESTING: fake timers replace setTimeout with a clock that only
 *    moves when you tell it to:
 *        afterEach(() => vi.useRealTimers());
 *        ...
 *        vi.useFakeTimers();
 *        render(<DebouncedSearch onSearch={spy} />);
 *        fireEvent.change(screen.getByRole("searchbox", { name: "Search" }), {
 *          target: { value: "react" },
 *        });
 *        act(() => { vi.advanceTimersByTime(299); });
 *        expect(spy).not.toHaveBeenCalled();
 * 5. TESTING: why `fireEvent.change` and not `userEvent.type`? user-event
 *    waits on real timers between key presses, so with plain fake
 *    timers it never finishes. The usual fix,
 *    `vi.useFakeTimers({ shouldAdvanceTime: true })` together with
 *    `userEvent.setup({ advanceTimers: vi.advanceTimersByTime })`, lets
 *    the fake clock creep forward with real time while you type. That's
 *    fine for "eventually called" tests, but it breaks exact checks
 *    like "not yet at 299 ms". `fireEvent.change` sets the whole value
 *    in one instant event, so the clock moves only when you say.
 * 6. TESTING: to simulate fast typing, fire several changes with small
 *    `advanceTimersByTime` steps between them: "r", then "re", then
 *    "rea".
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Debouncing with an effect and its cleanup
 * - Controlled inputs
 * - useRef for values that don't affect the screen
 * - StrictMode's extra effect run, and why cleanup makes it harmless
 * - Fake timers and act in tests
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Parents often pass a new arrow function as onSearch on every
 *   render. If onSearch is in your dependency array, that restarts the
 *   wait. Keep the latest onSearch in a ref instead, and leave it out.
 * - Show "Searching..." while a wait is pending.
 * - Pull the timing out into a `useDebouncedValue(value, delay)` hook.
 */

import type { ReactElement } from "react";

export type DebouncedSearchProps = {
  /** Called with the trimmed query once typing has stopped. */
  onSearch: (query: string) => void;
  /** How many milliseconds to wait after the last change. Default 300. */
  delay?: number;
};

export function DebouncedSearch({ onSearch, delay = 300 }: DebouncedSearchProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: DebouncedSearch");
}
