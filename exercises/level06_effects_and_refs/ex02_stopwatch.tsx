/**
 * Exercise: Stopwatch
 * Level:    06 - Effects and Refs
 * Topics:   setInterval in useEffect, cleanup, functional updates, fake timers
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Stopwatch> that counts up in tenths of a second. One button
 * starts and stops it, another resets it to zero.
 *
 *     01:05.3
 *     [ Stop ]  [ Reset ]
 *
 *     <Stopwatch />
 *
 * ========================================================================
 * BACKGROUND: TIMERS NEED CLEANUP
 * ========================================================================
 * `setInterval(fn, ms)` calls `fn` again and again, every `ms`
 * milliseconds, until you stop it with `clearInterval(id)`. Starting one
 * is a SIDE EFFECT (something outside the component's returned JSX), so
 * it belongs in useEffect, and the effect's CLEANUP function (the one it
 * returns) must stop it:
 *
 *     useEffect(() => {
 *       const id = setInterval(() => console.log("tick"), 1000);
 *       return () => clearInterval(id);   // stop it again
 *     }, []);
 *
 * Forget the cleanup and the interval keeps running after the component
 * is gone. Worse: in development, React's <StrictMode> runs each effect
 * twice when a component appears (effect, cleanup, effect). Without a
 * cleanup you'd have TWO intervals, and your stopwatch would run at
 * double speed. That's exactly the kind of bug StrictMode is there to
 * show you.
 *
 * A second trap: inside the interval callback, a state variable keeps
 * the value it had when the effect ran. `setTenths(tenths + 1)` would add
 * 1 to the same old number forever. A FUNCTIONAL UPDATE asks React for
 * the latest value instead: `setTenths((t) => t + 1)`.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - The time inside an element with role="timer", e.g.
 *   <p role="timer">00:00.0</p>. Its text is ONLY the time.
 * - A button named "Start" while stopped. The SAME button is named
 *   "Stop" while running.
 * - A button named "Reset".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Show "00:00.0" at first, stopped.
 * 2. Format the time as mm:ss.t: minutes with two digits, seconds with
 *    two digits, then tenths. Minutes keep going past 59 ("75:00.0").
 * 3. When "Start" is clicked, add one tenth for every 100 ms that pass.
 *    The button now reads "Stop".
 * 4. When "Stop" is clicked, freeze the time and stop the timer
 *    completely (no interval left running). The button reads "Start".
 * 5. Clicking "Start" again continues from the frozen time.
 * 6. "Reset" stops the stopwatch and shows "00:00.0". It works whether
 *    the stopwatch is running or not.
 * 7. Stop every timer it started when it is removed from the page
 *    ("unmounted").
 * 8. Run at the right speed inside <StrictMode>.
 *
 * You can assume:
 * - Tests only move time forward in whole steps of 100 ms.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <Stopwatch />                 shows 00:00.0, a "Start" button
 *       click "Start", wait 1.5 s  ->  00:01.5, the button says "Stop"
 *       click "Stop", wait 5 s     ->  still 00:01.5    frozen
 *       click "Start", wait 0.5 s  ->  00:02.0          continues
 *       click "Reset"              ->  00:00.0, the button says "Start"
 *
 *     running for 65.3 seconds      ->  01:05.3
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Starts at 00:00.0 with a "Start" button
 * - After Start and 1500 ms: 00:01.5
 * - Rolls over into minutes: 65300 ms -> 01:05.3
 * - Stop freezes the time, and Start continues from it
 * - Stop leaves no timer running (`vi.getTimerCount()` is 0)
 * - Reset while running: 00:00.0, stopped, and time no longer moves
 * - Reset while stopped: 00:00.0
 * - Unmounting leaves no timer running
 * - Inside <StrictMode>, 1000 ms shows 00:01.0 (not 00:02.0)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Two pieces of state are enough: how many tenths have passed, and
 *    whether it is running.
 * 2. The display is derived from the tenths: minutes =
 *    Math.floor(tenths / 600), and so on. `String(n).padStart(2, "0")`
 *    adds the leading zero.
 * 3. Let an effect start the interval only while running:
 *    `if (!running) return;` at the top, then setInterval, then return
 *    a cleanup. Put `running` in the dependency array. Clicking Stop
 *    changes `running`, so React runs the cleanup for you.
 * 4. Use a functional update in the callback: `setTenths((t) => t + 1)`.
 * 5. TESTING: fake timers replace setInterval and setTimeout with a fake
 *    clock that only moves when YOU say so. Turn them on at the start
 *    of the test and off again afterwards:
 *        afterEach(() => vi.useRealTimers());
 *        ...
 *        vi.useFakeTimers();
 *        render(<Stopwatch />);
 *        fireEvent.click(screen.getByRole("button", { name: "Start" }));
 *        act(() => { vi.advanceTimersByTime(1500); });
 *        expect(screen.getByRole("timer")).toHaveTextContent("00:01.5");
 *    Wrap advanceTimersByTime in act(...): the timer callbacks update
 *    state, and act makes React finish re-rendering before you look.
 * 6. TESTING: why `fireEvent.click` and not `userEvent`? user-event
 *    waits on real timers between its steps, so with plain fake timers
 *    `await user.click(...)` never finishes. The workaround,
 *    `vi.useFakeTimers({ shouldAdvanceTime: true })`, makes the fake
 *    clock creep forward with real time, which can add an extra tenth
 *    and make an exact test fail now and then. `fireEvent` fires one
 *    event instantly and needs no clock at all, so tests stay exact.
 * 7. TESTING: `vi.getTimerCount()` tells you how many fake timers are
 *    still waiting to run. After Stop, Reset or unmount it should be 0.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Starting and stopping intervals from useEffect
 * - Cleanup functions, and StrictMode's extra effect run
 * - Functional state updates (stale values in callbacks)
 * - Deriving display text from state
 * - Testing time with fake timers and act
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a "Lap" button that records the current time in a list.
 * - Make it accurate even when the browser is busy: store the start
 *   time (Date.now()) and work out the elapsed time on each tick,
 *   instead of counting ticks.
 */

import type { ReactElement } from 'react';

export function Stopwatch(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Stopwatch');
}
