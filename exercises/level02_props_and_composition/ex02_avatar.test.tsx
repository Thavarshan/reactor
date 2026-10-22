/**
 * Tests for exercises/level02_props_and_composition/ex02_avatar.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_avatar
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './ex02_avatar';

describe('Avatar', () => {
  // Examples to get you started:
  //
  // it("shows the image with the name as alt text", () => {
  //   render(<Avatar name="Ada Lovelace" src="/ada.png" />);
  //   const img = screen.getByRole("img", { name: "Ada Lovelace" });
  //   expect(img).toHaveAttribute("src", "/ada.png");
  // });
  //
  // it("falls back to initials when the image fails to load", () => {
  //   render(<Avatar name="Grace Hopper" src="/broken.png" />);
  //   fireEvent.error(screen.getByRole("img", { name: "Grace Hopper" }));
  //   const avatar = screen.getByRole("img", { name: "Grace Hopper" });
  //   expect(avatar).not.toHaveAttribute("src");
  //   expect(avatar).toHaveTextContent(/^GH$/);
  // });

  it.todo('shows initials and no src when there is no src');
  it.todo('treats an empty src like a missing one');
  it.todo('uses one letter for a single-word name');
  it.todo('uses the first and last word for longer names');
  it.todo('uppercases the initials and ignores extra spaces');
  it.todo('treats a hyphenated word as one word');
  it.todo('shows ? named Unknown user for a blank name');
  it.todo('uses Unknown user as alt text for a blank name with an image');
  it.todo('tries again when src changes after an error');
  it.todo('stays on the fallback when re-rendered with the same broken src');
});
