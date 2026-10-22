/**
 * Exercise: useLocalStorage
 * Level:    08 - Custom Hooks
 * Topics:   custom hooks, lazy initial state, useEffect, JSON, try/catch,
 *           functional updates
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write a hook that works like useState, but also saves the value in
 * the browser's localStorage. When the page loads again, the saved
 * value comes back.
 *
 *     const [name, setName] = useLocalStorage("name", "stranger");
 *
 * ========================================================================
 * BACKGROUND: LOCALSTORAGE AND JSON
 * ========================================================================
 * localStorage is a small key/value store built into the browser. It
 * survives page reloads. It only stores STRINGS:
 *
 *     localStorage.setItem("score", "42");
 *     localStorage.getItem("score");     // "42"
 *     localStorage.getItem("missing");   // null
 *
 * To store numbers, arrays or objects, turn them into a string with
 * JSON.stringify, and back with JSON.parse:
 *
 *     JSON.stringify({ level: 3 });      // '{"level":3}'
 *     JSON.parse('{"level":3}');         // { level: 3 }
 *     JSON.parse("{oops");               // THROWS a SyntaxError
 *
 * Saved data can be broken: an old version of your app wrote it, or a
 * user edited it by hand. JSON.parse throws on bad text, so wrap it in
 * try/catch.
 *
 * ========================================================================
 * BACKGROUND: LAZY INITIAL STATE
 * ========================================================================
 * useState(expensive()) calls expensive() on EVERY render, then throws
 * the answer away after the first one. Pass a function instead, and
 * React calls it only once, on the first render:
 *
 *     const [rows, setRows] = useState(() => buildBigTable());
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your hook must:
 * 1. Accept a `key` (the localStorage key) and an `initialValue`.
 * 2. Return a pair [value, setValue], like useState.
 * 3. On the first render, read localStorage[key]. If something is
 *    stored there and it is valid JSON, start with the parsed value.
 *    If nothing is stored, start with `initialValue`.
 * 4. Start with `initialValue` if the stored text is not valid JSON.
 *    The hook must never throw because of bad saved data.
 * 5. Read localStorage only ONCE, on the first render. Later
 *    re-renders must not read it again.
 * 6. Make setValue(next) change the value (so the component
 *    re-renders) and save JSON.stringify(next) under `key`.
 * 7. Make setValue accept a function too: setValue((prev) => prev + 1).
 *    Two such calls inside one act must both count.
 * 8. Keep localStorage in sync after the first render as well. Right
 *    after the hook first renders, localStorage[key] holds the JSON of
 *    the current value. So the default gets saved, and broken data gets
 *    replaced.
 *
 * You can assume:
 * - `key` never changes while the hook is mounted.
 * - The value is plain data (strings, numbers, booleans, arrays,
 *   objects), never a function.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     storage is empty
 *       useLocalStorage("count", 0)      ->  value 0
 *                                            storage "count" is "0"
 *
 *     storage has "count" = "5"
 *       useLocalStorage("count", 0)      ->  value 5      saved value wins
 *       setValue(6)                      ->  value 6, storage "6"
 *       setValue((n) => n + 1)           ->  value 7, storage "7"
 *
 *     storage has "user" = '{"name":"Ada"}'
 *       useLocalStorage("user", null)    ->  value { name: "Ada" }
 *
 *     storage has "count" = "{oops"
 *       useLocalStorage("count", 0)      ->  value 0      bad data ignored
 *                                            storage "count" is "0"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Nothing stored -> initialValue
 * - A stored number, string or object comes back parsed
 * - Bad JSON stored -> initialValue, and no error thrown
 * - setValue("hi") -> storage holds '"hi"' (JSON keeps the quotes)
 * - Two functional updates in one act -> both apply (0 -> 2)
 * - After the first render, storage already holds the default
 * - localStorage.getItem is called once, even after a rerender
 * - Two hooks with different keys don't affect each other
 * - Unmount, then render the hook again: it starts with the saved value
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Write a small helper outside the hook that reads and parses the
 *    key, and returns `initialValue` if anything goes wrong.
 * 2. For rule 5, pass a function to useState (see LAZY INITIAL STATE).
 * 3. For rules 6 and 8, think "keep the outside world in sync with my
 *    state". That is exactly what an effect is for. Which values does
 *    the effect depend on?
 * 4. Once saving happens in an effect, useState's own setter already
 *    supports functional updates. You can return it as it is.
 * 5. TESTING: localStorage keeps its data between tests in the same
 *    file. The beforeEach in the test file clears it before each test.
 * 6. TESTING: to put bad data in storage, call
 *    localStorage.setItem("count", "{oops") BEFORE renderHook.
 * 7. TESTING: to count reads, spy on the method all storages share:
 *        const getItem = vi.spyOn(Storage.prototype, "getItem");
 *    Then expect(getItem).toHaveBeenCalledTimes(1). The afterEach in
 *    the test file removes the spy again.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Lazy initial state: useState(() => ...)
 * - Effects that keep an outside system (localStorage) in sync
 * - Generic hooks: useLocalStorage<T> works for any type of value
 * - Returning a [value, setter] pair like useState
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Support a changing `key`: read the new key when it changes.
 * - Listen for the window "storage" event, so a change made in another
 *   browser tab shows up in this one. Remove the listener on unmount.
 * - Add a third return value, remove(), that deletes the key and goes
 *   back to initialValue.
 */

/** The setter returned by useLocalStorage. It takes a value or a function. */
export type SetValue<T> = (next: T | ((previous: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: useLocalStorage");
}
