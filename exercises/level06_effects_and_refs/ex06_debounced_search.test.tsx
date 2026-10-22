/**
 * Tests for exercises/level06_effects_and_refs/ex06_debounced_search.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_debounced_search
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DebouncedSearch } from './ex06_debounced_search';

// Put new text in the search box in one instant event.
function typeInto(value: string) {
  fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), {
    target: { value },
  });
}

// Move the fake clock forward. act(...) lets React finish any updates.
function wait(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

describe('DebouncedSearch', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  // Examples to get you started:
  //
  // it("calls onSearch 300 ms after typing stops", () => {
  //   vi.useFakeTimers();
  //   const onSearch = vi.fn();
  //   render(<DebouncedSearch onSearch={onSearch} />);
  //   typeInto("react");
  //   expect(screen.getByRole("searchbox", { name: "Search" })).toHaveValue("react");
  //   wait(299);
  //   expect(onSearch).not.toHaveBeenCalled();
  //   wait(1);
  //   expect(onSearch).toHaveBeenCalledWith("react");
  // });
  //
  // it("restarts the wait on every change", () => {
  //   vi.useFakeTimers();
  //   const onSearch = vi.fn();
  //   render(<DebouncedSearch onSearch={onSearch} />);
  //   typeInto("r");
  //   wait(200);
  //   typeInto("re");
  //   wait(200);
  //   expect(onSearch).not.toHaveBeenCalled();
  //   wait(100);
  //   expect(onSearch).toHaveBeenCalledTimes(1);
  //   expect(onSearch).toHaveBeenCalledWith("re");
  // });

  it.todo("doesn't call onSearch on the first render, even after waiting");
  it.todo('trims the query before calling onSearch');
  it.todo("doesn't search the same query twice in a row");
  it.todo("doesn't call onSearch for only spaces");
  it.todo(
    'calls onSearch with an empty string when the box is cleared after a search',
  );
  it.todo('uses a custom delay');
  it.todo('never calls onSearch after unmount');
  it.todo('calls onSearch once inside StrictMode');
});
