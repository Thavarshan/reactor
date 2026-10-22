/**
 * Tests for exercises/level10_performance/ex03_use_callback.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * These tests count renders with a spy. They don't use <StrictMode>,
 * which would render everything twice and double the counts.
 *
 * Run just this file:
 *     npm test -- ex03_use_callback
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Playlist, type Song } from './ex03_use_callback';

const songs: Song[] = [
  { id: 'a', title: 'So What' },
  { id: 'b', title: 'Blue Train' },
  { id: 'c', title: 'Take Five' },
];

describe('Playlist', () => {
  // Examples to get you started:
  //
  // it("renders every row once at first", () => {
  //   const spy = vi.fn();
  //   render(<Playlist songs={songs} onRowRender={spy} />);
  //   expect(spy).toHaveBeenCalledTimes(3);
  //   expect(screen.getByRole("status")).toHaveTextContent("Nothing playing");
  // });
  //
  // it("re-renders no rows when Mute is clicked", async () => {
  //   const user = userEvent.setup();
  //   const spy = vi.fn();
  //   render(<Playlist songs={songs} onRowRender={spy} />);
  //   spy.mockClear();
  //   await user.click(screen.getByRole("button", { name: "Mute" }));
  //   expect(spy).not.toHaveBeenCalled();
  // });

  it.todo("toggles Mute's aria-pressed both ways");
  it.todo('re-renders only the played row and marks its button pressed');
  it.todo("shows 'Now playing: <title>' for the playing song");
  it.todo(
    're-renders exactly the old row and the new row when switching songs',
  );
  it.todo('stops the song when its Play button is clicked again');
  it.todo('renders no rows when the parent re-renders with the same songs');
});
