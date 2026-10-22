/**
 * Exercise: Undo and Redo
 * Level:    09 - Reducers and Context
 * Topics:   reducers with history, generic reducers and hooks,
 *           useReducer, aria-pressed, disabled buttons
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Give any piece of state an undo/redo history. Build three pieces:
 *
 * - historyReducer: a pure reducer that tracks the past, the present
 *   and the future.
 * - useHistory(initialValue): a hook that runs it, for values of any
 *   type.
 * - <ColorPicker>: colour buttons with Undo and Redo.
 *
 *     Current color: red
 *
 *     [ White ] [ Red ] [ Green ] [ Blue ]
 *
 *     [ Undo ] [ Redo ]
 *
 *     <ColorPicker initialColor="white" />
 *
 * ========================================================================
 * BACKGROUND: PAST, PRESENT AND FUTURE
 * ========================================================================
 * Undo works like a stack of plates. Keep three things:
 *
 *     past:    the values before this one, oldest first
 *     present: the value now
 *     future:  the values you undid, so you can redo them, next first
 *
 * Picture setting white -> red -> green, then pressing Undo once:
 *
 *     after the sets:   past [white, red]   present green  future []
 *     after one undo:   past [white]        present red    future [green]
 *
 * Making a NEW change after an undo throws the future away, like most
 * editors do.
 *
 * ========================================================================
 * BACKGROUND: GENERIC REDUCERS
 * ========================================================================
 * The history logic doesn't care what the values are: colours, text,
 * whole drawings. A type parameter <T> lets one reducer work for all of
 * them:
 *
 *     function pairOf<T>(value: T): [T, T] {
 *       return [value, value];
 *     }
 *     pairOf("hi");   // [string, string]
 *     pairOf(3);      // [number, number]
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * ColorPicker renders:
 * - An element with role="status" and the text "Current color: red"
 *   (the colour in lower case, as in COLORS).
 * - One button per colour in COLORS, named with a capital letter:
 *   "White", "Red", "Green", "Blue". The current colour's button has
 *   aria-pressed="true", and the others aria-pressed="false". The
 *   aria-pressed attribute tells screen readers that a button is
 *   switched on.
 * - Buttons named "Undo" and "Redo". Each uses the HTML `disabled`
 *   attribute when there is nothing to undo or redo.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * historyReducer must:
 * 1. Never mutate the state or the arrays it is given.
 * 2. "set": move the present to the END of `past`, make the new value
 *    the present, and empty `future`. If the new value is the same as
 *    the present (Object.is), return the SAME state object.
 * 3. "undo": move the last value of `past` into the present, and put
 *    the old present at the START of `future`. If `past` is empty,
 *    return the SAME state object.
 * 4. "redo": the opposite. Move the first value of `future` into the
 *    present, and put the old present at the END of `past`. If `future`
 *    is empty, return the SAME state object.
 *
 * useHistory must:
 * 5. Start with { past: [], present: initialValue, future: [] }, kept
 *    with useReducer and historyReducer.
 * 6. Return { value, set, undo, redo, canUndo, canRedo }. `value` is the
 *    present. canUndo is true when `past` isn't empty, and canRedo is
 *    true when `future` isn't empty.
 *
 * ColorPicker must:
 * 7. Accept an optional `initialColor` (default "white").
 * 8. Use useHistory for the colour.
 * 9. Set the colour when a colour button is clicked. Clicking the
 *    current colour changes nothing (so it adds no undo step).
 * 10. Undo and Redo when those buttons are clicked.
 *
 * You can assume:
 * - `initialColor` is one of COLORS.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * The reducer (past | present | future):
 *
 *     [] | white | []          + set red     ->  [white] | red | []
 *     [white] | red | []       + set red     ->  the SAME state
 *     [white] | red | []       + undo        ->  [] | white | [red]
 *     [] | white | [red]       + redo        ->  [white] | red | []
 *     [] | white | [red]       + set blue    ->  [white] | blue | []
 *                                                the future is gone
 *     [] | white | []          + undo        ->  the SAME state
 *
 * The component:
 *
 *     <ColorPicker />
 *       "Current color: white", Undo and Redo disabled
 *       click "Red", click "Green"  ->  "Current color: green"
 *       click "Undo"                ->  "Current color: red", Redo enabled
 *       click "Undo"                ->  "Current color: white", Undo disabled
 *       click "Redo"                ->  "Current color: red"
 *       click "Blue"                ->  "Current color: blue", Redo disabled
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * Reducer:
 * - set adds the old present to the end of past and clears future
 * - set with the same value returns the same state (toBe)
 * - undo and redo with nothing to undo or redo return the same state
 * - undo then redo gets back to an equal state
 * - Frozen input never throws
 * Hook (renderHook):
 * - Works with numbers too: set(1), set(2), undo() -> value 1
 * - canUndo and canRedo follow the history
 * Component:
 * - Starts with Undo and Redo disabled, and "White" pressed
 * - The pressed button follows the current colour
 * - Clicking the current colour leaves Undo disabled
 * - A new colour after an undo disables Redo
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Write and test historyReducer first. No React needed.
 * 2. For "undo": the new present is past[past.length - 1], the new past
 *    is past.slice(0, -1), and the new future is [present, ...future].
 * 3. useHistory is short: call useReducer, then return an object built
 *    from the state, with set/undo/redo calling dispatch.
 * 4. A generic hook can pass its type on:
 *    useReducer(historyReducer<T>, { past: [], present: initialValue,
 *    future: [] }).
 * 5. For the button names, capitalise the colour:
 *    color[0].toUpperCase() + color.slice(1).
 * 6. TESTING: check aria-pressed with jest-dom:
 *        expect(screen.getByRole("button", { name: "Red" }))
 *          .toHaveAttribute("aria-pressed", "true");
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Modelling history as past/present/future
 * - Generic reducers and hooks: historyReducer<T>, useHistory<T>
 * - Deriving canUndo/canRedo instead of storing them
 * - aria-pressed for toggle buttons
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Keyboard shortcuts: Ctrl+Z for undo and Ctrl+Shift+Z for redo
 *   (a keydown listener on window, removed on unmount).
 * - Limit the history to the last 20 steps.
 * - Add a "reset" action that starts over with a new value and empty
 *   past and future.
 */

import type { ReactElement } from 'react';

export type History<T> = {
  /** Earlier values, oldest first. */
  past: readonly T[];
  /** The current value. */
  present: T;
  /** Undone values that can be redone, the next one first. */
  future: readonly T[];
};

export type HistoryAction<T> =
  { type: 'set'; value: T } | { type: 'undo' } | { type: 'redo' };

export function historyReducer<T>(
  state: History<T>,
  action: HistoryAction<T>,
): History<T> {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: historyReducer');
}

export type UseHistoryResult<T> = {
  /** The current value (the present). */
  value: T;
  /** Makes a new value the present. */
  set: (value: T) => void;
  /** Goes back one step. */
  undo: () => void;
  /** Goes forward one step. */
  redo: () => void;
  /** True when there is something to undo. */
  canUndo: boolean;
  /** True when there is something to redo. */
  canRedo: boolean;
};

export function useHistory<T>(initialValue: T): UseHistoryResult<T> {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: useHistory');
}

// PROVIDED: you don't need to change this.
export const COLORS = ['white', 'red', 'green', 'blue'] as const;
export type Color = (typeof COLORS)[number];

export type ColorPickerProps = {
  /** The colour at first. Default "white". */
  initialColor?: Color;
};

export function ColorPicker({
  initialColor = 'white',
}: ColorPickerProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: ColorPicker');
}
