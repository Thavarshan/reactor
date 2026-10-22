/**
 * Tests for exercises/level13_apps/ex03_infinite_feed.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_infinite_feed
 */

import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { server } from '../../test/server';
import { InfiniteFeed, type FeedPage } from './ex03_infinite_feed';

// A fake server with 3 pages of 2 posts each. `requested` records which
// pages were asked for.
let requested: number[] = [];
function mockFeedApi() {
  server.use(
    http.get('/api/posts', ({ request }) => {
      const page = Number(new URL(request.url).searchParams.get('page'));
      requested.push(page);
      const body: FeedPage = {
        posts: [
          { id: page * 10 + 1, title: `Post ${page}.1` },
          { id: page * 10 + 2, title: `Post ${page}.2` },
        ],
        nextPage: page < 3 ? page + 1 : null,
      };
      return HttpResponse.json(body);
    }),
  );
}

describe('InfiniteFeed', () => {
  beforeEach(() => {
    requested = [];
  });

  // Examples to get you started:
  //
  // it("loads page 1 first", async () => {
  //   mockFeedApi();
  //   render(<InfiniteFeed />);
  //   expect(screen.getByRole("status")).toHaveTextContent("Loading posts...");
  //   const list = screen.getByRole("list", { name: "Posts" });
  //   expect(await within(list).findByText("Post 1.1")).toBeInTheDocument();
  //   expect(requested).toEqual([1]);
  // });
  //
  // it("loads the next page with Load more", async () => {
  //   const user = userEvent.setup();
  //   mockFeedApi();
  //   render(<InfiniteFeed />);
  //   await user.click(await screen.findByRole("button", { name: "Load more" }));
  //   expect(await screen.findByText("Post 2.1")).toBeInTheDocument();
  //   expect(requested).toEqual([1, 2]);
  // });

  it.todo('shows Loading posts... and then page 1');
  it.todo('adds page 2 after page 1 with Load more');
  it.todo('loads the next page when the sentinel becomes visible');
  it.todo('does nothing when isIntersecting is false');
  it.todo('makes only one request for two quick triggers');
  it.todo("shows You're all caught up! after the last page and stops loading");
  it.todo('keeps old posts on failure, and Try again asks for the same page');
  it.todo('works with the button when IntersectionObserver is missing');
  it.todo('disconnects the observer on unmount');
});
