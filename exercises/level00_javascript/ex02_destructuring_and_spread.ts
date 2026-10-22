/**
 * Exercise: Destructuring and Spread
 * Level:    00 - Modern JavaScript for React
 * Topics:   object and array spread, destructuring, rest, immutability
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write four helpers that "change" a user or a list WITHOUT changing the
 * original. Each one returns a brand new object or array with the change
 * in it, and leaves its input exactly as it was.
 *
 *     updateUser(ada, { name: "Ada L." })  ->  a new user named "Ada L."
 *
 * ========================================================================
 * BACKGROUND: SPREAD, DESTRUCTURING AND NOT MUTATING
 * ========================================================================
 * To MUTATE something means to change it in place: `user.name = "Bo"` or
 * `list.push(4)`. React expects you to never mutate the data you keep in
 * state. Instead you make a new copy with the change in it. React then
 * sees a new object and knows something changed. (You'll see why in
 * level 03. For now, practise the habit.)
 *
 * SPREAD (`...`) copies everything out of an object or array:
 *
 *     const point = { x: 1, y: 2 };
 *     const moved = { ...point, y: 5 };    // { x: 1, y: 5 }
 *     // later keys win, so y: 5 replaces y: 2. `point` is untouched.
 *
 *     const nums = [1, 2];
 *     const more = [...nums, 3];           // [1, 2, 3]
 *     const first = [0, ...nums];          // [0, 1, 2]
 *
 * DESTRUCTURING pulls values out into variables. The REST pattern
 * (also written `...`) collects whatever is left over:
 *
 *     const { x, ...others } = { x: 1, y: 2, z: 3 };
 *     // x is 1, others is { y: 2, z: 3 }
 *
 *     const [head, ...tail] = [1, 2, 3];
 *     // head is 1, tail is [2, 3]
 *
 * One catch: spread makes a SHALLOW copy. `{ ...user }` is a new object,
 * but `user.tags` inside it is still the very same array. If you want to
 * change the tags, you must copy that array too.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your functions must:
 * 1. updateUser(user, changes): return a new user with every field in
 *    `changes` replacing the old value. Fields not in `changes` stay the
 *    same. (The `changes` type doesn't allow `id`, so the id can never
 *    change.)
 * 2. addTag(user, tag): return a new user with `tag` added to the END of
 *    a new `tags` array. If the user already has that tag, return the
 *    SAME user object you were given (nothing changed, so no copy).
 * 3. publicProfile(user): return a new object with every field of the
 *    user EXCEPT `email`. The result must not have an `email` key at all.
 * 4. removeItem(items, index): return a new array without the item at
 *    `index`. If `index` is outside the array, return a new array with
 *    all the same items. (The `<T>` in its signature means it works on an
 *    array of any type: strings, numbers, users.)
 * 5. Never mutate the objects or arrays you are given.
 *
 * You can assume:
 * - `changes` never contains `undefined` values.
 * - `index` is a whole number (it may be negative or too big).
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     ada = { id: 1, name: "Ada", email: "ada@example.com", tags: ["math"] }
 *
 *     updateUser(ada, { name: "Ada L." })
 *       ->  { id: 1, name: "Ada L.", email: "ada@example.com", tags: ["math"] }
 *     updateUser(ada, {})                ->  a copy that equals ada
 *     addTag(ada, "code")                ->  tags ["math", "code"]
 *     addTag(ada, "math")                ->  ada itself (already tagged)
 *     publicProfile(ada)                 ->  { id: 1, name: "Ada", tags: ["math"] }
 *     removeItem(["a", "b", "c"], 1)     ->  ["a", "c"]
 *     removeItem(["a", "b", "c"], 5)     ->  ["a", "b", "c"]   a new array
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - updateUser returns a new object (`not.toBe(ada)`), even with `{}`
 * - updateUser can change several fields at once
 * - addTag does not change the original tags array (ada.tags still has
 *   one item afterwards)
 * - addTag with a tag the user already has returns the same object
 *   (`toBe(ada)`)
 * - publicProfile has no email key: `not.toHaveProperty("email")`
 * - removeItem with index 0 and with the last index
 * - removeItem with -1 or an index past the end -> a new array, same items
 * - removeItem on an empty array -> []
 * - Every function works on frozen input. `Object.freeze` makes an
 *   object read-only, so any attempt to change it throws an error.
 *   Freeze the user AND its tags array.
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. updateUser is a single object spread. Think about which order the
 *    two spreads go in, since later keys win.
 * 2. addTag needs two spreads: one for the user and one for a new tags
 *    array. Check `user.tags.includes(tag)` first.
 * 3. For publicProfile, destructure `email` out and keep the rest. Your
 *    editor may grey out `email` because you never use it. That's fine,
 *    pulling it out is the whole point.
 * 4. removeItem: `filter` gets the index as its second argument,
 *    `(item, i) => ...`. Or glue two `slice` calls together with spread.
 *    Be careful: `slice(-1)` counts from the END of the array.
 * 5. TESTING: build a frozen user like this:
 *    `const ada = Object.freeze({ ..., tags: Object.freeze(["math"]) })`.
 *    `expect(a).not.toBe(b)` proves you got a new object.
 *
 * ========================================================================
 * JAVASCRIPT CONCEPTS TO LEARN
 * ========================================================================
 * - Object spread `{ ...obj, key: value }` and array spread `[...arr, x]`
 * - Object and array destructuring, with rest `...rest`
 * - Shallow copies: nested arrays and objects are shared, not copied
 * - Immutability: return a new value instead of changing the old one
 * - `Object.freeze` to catch accidental mutation in tests
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Write `removeTag(user, tag)`. Return the same user when the tag isn't
 *   there.
 * - Write `insertItem(items, index, item)` that puts an item in the
 *   middle of an array.
 * - Write `moveItem(items, from, to)` without mutating anything.
 */

export type User = {
  /** A unique number. It never changes. */
  id: number;
  /** The user's display name. */
  name: string;
  /** The user's email address. Private, so it's left out of profiles. */
  email: string;
  /** Labels such as "math" or "admin". No duplicates. */
  tags: readonly string[];
};

/** Any fields of a user except `id`. */
export type UserChanges = Partial<Omit<User, 'id'>>;

/** A user without the private `email` field. */
export type PublicProfile = Omit<User, 'email'>;

export function updateUser(user: User, changes: UserChanges): User {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: updateUser');
}

export function addTag(user: User, tag: string): User {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: addTag');
}

export function publicProfile(user: User): PublicProfile {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: publicProfile');
}

export function removeItem<T>(items: readonly T[], index: number): T[] {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: removeItem');
}
