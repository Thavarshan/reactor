/**
 * Tests for exercises/level09_reducers_and_context/ex05_undo_redo.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the reducer, the hook and the component until they pass. The "EDGE
 * CASES TO TEST" section of the exercise lists good cases to cover. Turn
 * each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_undo_redo
 */

import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
  ColorPicker,
  type History,
  historyReducer,
  useHistory,
} from './ex05_undo_redo';

describe('historyReducer', () => {
  // Example to get you started:
  //
  // it("moves the present into the past on set", () => {
  //   const start: History<string> = { past: [], present: "white", future: [] };
  //   expect(historyReducer(start, { type: "set", value: "red" })).toEqual({
  //     past: ["white"],
  //     present: "red",
  //     future: [],
  //   });
  // });

  it.todo('clears the future on set');
  it.todo('returns the same state when setting the same value');
  it.todo('returns the same state for undo or redo with nothing to do');
  it.todo('gets back to an equal state after undo then redo');
  it.todo('never mutates frozen input');
});

describe('useHistory', () => {
  // Example to get you started:
  //
  // it("undoes a change to a number", () => {
  //   const { result } = renderHook(() => useHistory(0));
  //   act(() => result.current.set(1));
  //   act(() => result.current.set(2));
  //   act(() => result.current.undo());
  //   expect(result.current.value).toBe(1);
  // });

  it.todo('reports canUndo and canRedo as the history changes');
});

describe('ColorPicker', () => {
  // Example to get you started:
  //
  // it("starts white with Undo and Redo disabled", () => {
  //   render(<ColorPicker />);
  //   expect(screen.getByRole("status")).toHaveTextContent("Current color: white");
  //   expect(screen.getByRole("button", { name: "Undo" })).toBeDisabled();
  //   expect(screen.getByRole("button", { name: "Redo" })).toBeDisabled();
  // });

  it.todo("marks only the current colour's button as pressed");
  it.todo('follows the undo and redo example from the exercise');
  it.todo('adds no undo step when the current colour is clicked');
  it.todo('disables Redo after a new colour is picked following an undo');
});
