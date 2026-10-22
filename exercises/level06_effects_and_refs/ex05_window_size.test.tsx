/**
 * Tests for exercises/level06_effects_and_refs/ex05_window_size.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_window_size
 */

import { act, render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { WindowSize } from './ex05_window_size';

// Pretend the user resized the window. act(...) lets React finish
// re-rendering before the test looks at the screen.
function resizeWindow(width: number, height: number) {
  act(() => {
    Object.assign(window, { innerWidth: width, innerHeight: height });
    window.dispatchEvent(new Event('resize'));
  });
}

describe('WindowSize', () => {
  afterEach(() => {
    // Put the test browser back to its normal size, and remove any spies.
    Object.assign(window, { innerWidth: 1024, innerHeight: 768 });
    vi.restoreAllMocks();
  });

  // Examples to get you started:
  //
  // it("updates when the window is resized", () => {
  //   render(<WindowSize />);
  //   resizeWindow(800, 600);
  //   expect(screen.getByText("Width: 800px")).toBeInTheDocument();
  //   expect(screen.getByText("Height: 600px")).toBeInTheDocument();
  //   expect(screen.getByText("Layout: tablet")).toBeInTheDocument();
  // });
  //
  // it("removes the resize listener on unmount", () => {
  //   const removeSpy = vi.spyOn(window, "removeEventListener");
  //   const { unmount } = render(<WindowSize />);
  //   unmount();
  //   expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  // });

  it.todo('shows the current size and layout on the first render');
  it.todo('uses mobile below 600, tablet from 600 to 1023, desktop from 1024');
  it.todo('removes the SAME function it added');
  it.todo('has exactly one resize listener inside StrictMode');
});
