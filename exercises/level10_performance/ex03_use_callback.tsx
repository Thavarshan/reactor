/**
 * Exercise: useCallback
 * Level:    10 - Performance
 * Topics:   useCallback, stable function identity, functional updates, memo
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Playlist> that shows a list of songs with a "Play" button on
 * each, plus a "Mute" button. The rows are already memoized for you.
 * Your job is to pass them an `onPlay` handler that stays the same
 * between renders, so clicking "Mute" redraws no rows, and playing a
 * song only redraws the rows that changed.
 *
 *     Now playing: Blue Train                      [ Mute ]
 *
 *     Playlist
 *     - So What          [ Play So What ]
 *     - Blue Train       [ Play Blue Train ]   (pressed)
 *     - Take Five        [ Play Take Five ]
 *
 *     <Playlist songs={songs} />
 *
 * ========================================================================
 * BACKGROUND: FUNCTIONS ARE NEW EVERY RENDER
 * ========================================================================
 * React.memo skips re-rendering (drawing again) a component when every
 * prop is the same as last time, compared with Object.is. Functions are
 * objects, so a function made inside a component is a brand new
 * function on every render:
 *
 *     function Parent() {
 *       const handleClick = () => console.log("hi");  // new every render
 *       return <MemoChild onClick={handleClick} />;    // memo can't help
 *     }
 *
 * useCallback gives you the same function back on every render, until
 * one of its dependencies changes:
 *
 *     const handleClick = useCallback(() => {
 *       console.log(name);
 *     }, [name]);   // a new function only when `name` changes
 *
 * There's a catch. If the function reads state, that state must be a
 * dependency, so the function changes whenever the state changes. A
 * "functional update" avoids reading state at all. You pass the setter
 * a function, and React hands it the current value:
 *
 *     setCount((current) => current + 1);  // no need to read `count`
 *
 * A setter from useState never changes, so it's safe to use without
 * listing it.
 *
 * Note: in <StrictMode> React renders everything twice in development.
 * Tests don't use StrictMode, so render counts are exact.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A status (<p role="status">) with "Now playing: <title>", or
 *   "Nothing playing" when no song is playing.
 * - A button named "Mute" with aria-pressed="false", or "true" when
 *   muted. (aria-pressed tells screen readers it's a toggle button.)
 * - A list named "Playlist" (<ul aria-label="Playlist">) with one
 *   <SongRow> per song. SongRow is PROVIDED. Each row is a listitem with
 *   the title and a button named "Play <title>". That button has
 *   aria-pressed="true" on the playing song.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Keep two pieces of state: the id of the playing song (none at
 *    first) and whether it's muted (false at first).
 * 2. Render one SongRow per song, with `key={song.id}`, `song`,
 *    `isPlaying`, `onPlay`, and `onRender={onRowRender}`.
 * 3. onPlay(id): play that song. If that song is already playing, stop
 *    it (nothing plays).
 * 4. Pass the SAME onPlay function to every row on every render. It must
 *    never change identity, even after a song starts playing.
 * 5. Clicking "Mute" toggles muted, and must not re-render any row.
 * 6. Show the "Now playing" status and the Mute button as described.
 *
 * You can assume:
 * - Song ids are unique, and `songs` doesn't change while playing.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Rows rendered, counted with onRowRender:
 *
 *     first render              ->  3 row renders, "Nothing playing"
 *     click "Mute"              ->  0 row renders, Mute is pressed
 *     click "Play Blue Train"   ->  1 row render (Blue Train),
 *                                   "Now playing: Blue Train"
 *     click "Play Take Five"    ->  2 row renders: Blue Train stops,
 *                                   Take Five starts
 *     click "Play Take Five"    ->  1 row render, "Nothing playing"
 *
 * Why only those rows? The rows whose `isPlaying` didn't change get the
 * same song, the same isPlaying and the same onPlay, so memo skips them.
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render: every row renders once, status "Nothing playing",
 *   Mute not pressed
 * - Mute toggles aria-pressed both ways and renders zero rows
 * - Playing a song re-renders only that row, and marks its button
 *   pressed
 * - Switching songs re-renders exactly the old row and the new row
 * - Playing the playing song again stops it
 * - The parent re-rendering Playlist with the same songs renders zero
 *   rows
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Get it working first with a plain arrow function for onPlay. Your
 *    "Mute renders zero rows" test fails. That's the bug this exercise
 *    is about.
 * 2. Wrapping it in useCallback with `[playingId]` as the dependency
 *    fixes Mute, but switching songs still re-renders every row. Why?
 * 3. Use a functional update inside onPlay so it doesn't read
 *    `playingId`. Then the dependency array can be empty: `[]`.
 * 4. The status needs the playing song's title. Find it with
 *    `songs.find(...)` during render. Don't store the title in state too.
 * 5. TESTING: count with a spy, `onRowRender={spy}`, and call
 *    `spy.mockClear()` before each click you want to measure.
 *    `expect(spy.mock.calls).toEqual([["b"], ["c"]])` checks which rows
 *    rendered, in order.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - useCallback and its dependency array
 * - Why a new function every render defeats React.memo
 * - Functional state updates: setX(current => ...)
 * - aria-pressed for toggle buttons
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a "Remove" button to each row with an onRemove(id) prop. Keep it
 *   stable too.
 * - Replace useState with useReducer. A `dispatch` function never
 *   changes identity, so you can pass it down without useCallback.
 */

import { memo, type ReactElement } from 'react';

export type Song = {
  id: string;
  title: string;
};

export type SongRowProps = {
  /** The song in this row. */
  song: Song;
  /** True when this song is playing. */
  isPlaying: boolean;
  /** Called with the song id when "Play <title>" is clicked. */
  onPlay: (id: string) => void;
  /** Called with the song id every time this row renders. For tests. */
  onRender?: (id: string) => void;
};

/**
 * PROVIDED: you don't need to change this.
 * One memoized row. It calls `onRender` each time it renders, so tests
 * can count renders.
 */
export const SongRow = memo(function SongRow({
  song,
  isPlaying,
  onPlay,
  onRender,
}: SongRowProps) {
  onRender?.(song.id);
  return (
    <li>
      {song.title}{' '}
      <button
        type="button"
        aria-pressed={isPlaying}
        onClick={() => onPlay(song.id)}
      >
        Play {song.title}
      </button>
    </li>
  );
});

export type PlaylistProps = {
  /** The songs to show, in order. */
  songs: Song[];
  /** Passed to every SongRow as its `onRender` prop. */
  onRowRender?: (id: string) => void;
};

export function Playlist({ songs, onRowRender }: PlaylistProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Playlist');
}
