/**
 * Exercise: Avatar
 * Level:    02 - Props and Composition
 * Topics:   images and alt text, fallback content, onError, a first look at state
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <Avatar> that shows a person's picture. When there is no
 * picture, or the picture fails to load, show their initials instead.
 *
 *     +------+        +------+
 *     | :-)  |        |  AL  |
 *     +------+        +------+
 *     photo           no photo (or a broken link)
 *
 *     <Avatar name="Ada Lovelace" src="/photos/ada.png" />
 *
 * ========================================================================
 * BACKGROUND: ALT TEXT, onError AND A LITTLE STATE
 * ========================================================================
 * Every <img> needs an `alt` attribute: the text a screen reader reads
 * out instead of the picture. For a person's photo, their name is the
 * right alt text.
 *
 * An <img> fires an "error" event when its file can't be loaded (a
 * typo in the URL, a deleted file, no network). React lets you listen
 * for it like a click:
 *
 *     <img src={url} alt="Logo" onError={() => console.log("broken!")} />
 *
 * To react to that error, the component has to REMEMBER that it
 * happened, and then draw itself again ("re-render") without the
 * image. Remembering things between renders is what STATE is for.
 * Level 03 covers state in depth, but here's all you need now:
 *
 *     import { useState, type ReactElement } from "react";
 *
 *     const [isOpen, setIsOpen] = useState(false);
 *     //     ^ current value  ^ call this to change it and re-render
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ROLE and their ACCESSIBLE NAME (the text
 * a screen reader reads out). BOTH versions of the avatar must be found
 * with the same query, screen.getByRole("img", { name: "Ada Lovelace" }):
 *
 * - The photo: an <img> with `src` set and `alt` set to the name.
 * - The fallback: a <span role="img" aria-label="Ada Lovelace"> whose
 *   text is the initials, e.g. "AL". role="img" tells screen readers to
 *   treat the span as one picture, and aria-label gives it its name.
 *   It must NOT have a `src` attribute.
 * - When the name is blank, the name used for alt / aria-label is
 *   "Unknown user", and the initials are "?".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Show an <img> with `src` and alt text when `src` is a non-empty
 *    string.
 * 2. Show the initials fallback when `src` is missing or "".
 * 3. Switch to the initials fallback when the image fires an error.
 * 4. Work out the initials like this: split the name into words
 *    (ignoring extra spaces), take the first letter of the FIRST word
 *    and the first letter of the LAST word, and uppercase them. A name
 *    with one word gives one letter. A hyphen doesn't split a word.
 * 5. Use "Unknown user" as the name and "?" as the initials when the
 *    name is empty or only spaces. Otherwise use the name with spaces
 *    trimmed from both ends.
 * 6. Try again when `src` changes to a NEW url after an error: show the
 *    <img> with the new src. The same broken url stays on the fallback.
 *
 * You can assume:
 * - `name` is always a string (maybe empty).
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Name and initials:
 *
 *     "Ada Lovelace"        ->  "AL"
 *     "Grace"               ->  "G"     one word, one letter
 *     "Mary Ann Evans"      ->  "ME"    first and LAST word
 *     "ada lovelace"        ->  "AL"    uppercased
 *     "  ada   lovelace  "  ->  "AL"    extra spaces ignored
 *     "Jean-Luc Picard"     ->  "JP"    a hyphen doesn't split
 *     "   "                 ->  "?"     named "Unknown user"
 *
 * What the user sees:
 *
 *     <Avatar name="Ada Lovelace" src="/ada.png" />
 *       the photo, alt "Ada Lovelace"
 *       the file is missing (error)  ->  "AL", still named "Ada Lovelace"
 *
 *     the parent then passes src="/new.png"
 *       ->  the photo again, with the new src     a new url gets a new try
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - src given: an img named "Ada Lovelace" with that src and alt
 * - No src: the fallback, named "Ada Lovelace", text "AL", no src attribute
 * - src="": same as no src
 * - Image error (fireEvent.error): switches to the fallback "GH"
 * - "Grace" -> "G", "Mary Ann Evans" -> "ME"
 * - "ada lovelace" -> "AL", "  ada   lovelace  " -> "AL" (named
 *   "ada lovelace")
 * - "Jean-Luc Picard" -> "JP"
 * - Blank name: named "Unknown user", text "?"
 * - Blank name with a src: an img named "Unknown user"
 * - Error, then a new src: the img comes back with the new src
 * - Error, then a re-render with the SAME src: still the fallback
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Write a small helper function `getInitials(name)` first. It's plain
 *    JavaScript: `name.trim().split(/\s+/)` turns "  a  b " into
 *    ["a", "b"].
 * 2. The component returns one of two things. An early `return` keeps
 *    it readable: `if (showPhoto) { return <img ... />; } return <span ...>`.
 * 3. For rule 3 a boolean state like `const [failed, setFailed] =
 *    useState(false)` works, but then rule 6 is hard: when src changes,
 *    `failed` is still true. Store WHICH src failed instead:
 *    `useState<string | null>(null)`. Show the photo when
 *    `src && src !== failedSrc`.
 * 4. TESTING: jsdom (the fake browser in tests) never loads images, so
 *    you trigger the error yourself:
 *    `fireEvent.error(screen.getByRole("img", { name: "Ada Lovelace" }))`.
 *    Import fireEvent from "@testing-library/react". To change props,
 *    use `rerender`: `const { rerender } = render(<Avatar ... />);` then
 *    `rerender(<Avatar ... src="/new.png" />)`.
 * 5. TESTING: `toHaveTextContent("AL")` also matches "ALX". Use a regular
 *    expression to match the whole text: `toHaveTextContent(/^AL$/)`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - alt text, role="img" and aria-label
 * - Returning different elements from one component
 * - Image events (onError)
 * - A first, small piece of state, and choosing WHAT to store in it
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `size` prop in pixels that sets width and height on both
 *   versions.
 * - Pick a background colour for the fallback from the name, so the
 *   same person always gets the same colour.
 */

import type { ReactElement } from "react";

export type AvatarProps = {
  /** The person's full name. Used for alt text and initials. */
  name: string;
  /** The photo's url. Missing or "" means "no photo". */
  src?: string;
};

export function Avatar({ name, src }: AvatarProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: Avatar");
}
