/**
 * Exercise: Optimistic Like
 * Level:    07 - Data Fetching
 * Topics:   optimistic updates, rollback on failure, aria-pressed, POST/DELETE
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <LikeButton> that reacts INSTANTLY. When clicked, it shows the
 * new like state and count straight away, then tells the server. If the
 * server says no, it puts everything back and shows an error.
 *
 *     [ Like ]  10 likes        click  ->  [*Like*]  11 likes   (at once)
 *                                          server fails
 *                                      ->  [ Like ]  10 likes
 *                                          Could not update your like. Please try again.
 *
 *     <LikeButton postId={1} initialLiked={false} initialCount={10} />
 *
 * ========================================================================
 * BACKGROUND: OPTIMISTIC UPDATES
 * ========================================================================
 * Waiting for the server makes an app feel slow. For small actions that
 * almost always work, like a "like", you can be OPTIMISTIC: update the
 * screen as if the server had already said yes, and only fix it up if
 * it says no.
 *
 * The recipe has three steps:
 *
 * 1. Remember the current values, so you can go back to them.
 * 2. Show the new values at once, then send the request.
 * 3. On success, show what the server says is true now. On failure,
 *    ROLL BACK to the remembered values and tell the user.
 *
 * Like saving a form, this happens because of a click, so it lives in
 * the click handler, not in useEffect. (React 19 also has a
 * `useOptimistic` hook for this. Here you'll do it by hand, to see how
 * it works.)
 *
 * A toggle button tells screen readers whether it is "on" with
 * aria-pressed:
 *
 *     <button aria-pressed={isBold}>Bold</button>
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * The server, for post 1:
 * - `POST /api/posts/1/like` likes it.
 * - `DELETE /api/posts/1/like` removes the like.
 * Both answer with the true state after the change:
 *     { "liked": true, "likes": 12 }
 *
 * The component shows:
 * - A button named "Like" with aria-pressed="true" when liked and
 *   aria-pressed="false" when not. Its name stays "Like" either way.
 * - The count as text in its own element: "10 likes", "1 like" (just
 *   one), or "0 likes".
 * - After a failure: an element with role="alert" and the text
 *   "Could not update your like. Please try again."
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Show `initialLiked` and `initialCount` at first.
 * 2. On click, BEFORE the server answers: flip aria-pressed, add 1 to
 *    the count (or take 1 away when un-liking), and send POST (to like)
 *    or DELETE (to un-like) to `/api/posts/<postId>/like`.
 * 3. Disable the button until the server answers, so only one request
 *    is in flight at a time.
 * 4. On success, show the `liked` and `likes` from the server's answer.
 *    Other people may have liked it meanwhile, so the number can differ
 *    from yours.
 * 5. On failure (an error status, or no answer at all), put back the
 *    values from before the click and show the alert.
 * 6. Remove the alert when the button is clicked again.
 *
 * You can assume:
 * - `initialCount` is 0 or more, and is at least 1 when `initialLiked`
 *   is true.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <LikeButton postId={1} initialLiked={false} initialCount={10} />
 *       click                 ->  pressed, "11 likes", button disabled
 *       server: { liked: true, likes: 12 }
 *                             ->  pressed, "12 likes", button enabled
 *
 *     <LikeButton postId={1} initialLiked={true} initialCount={1} />
 *       click                 ->  not pressed, "0 likes", DELETE sent
 *       server: 500           ->  pressed, "1 like", alert shown
 *       click again           ->  alert gone
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - The initial values show, with the right plural ("1 like", "0 likes")
 * - Liking: pressed and +1 at once, before the server answers
 * - The button is disabled while waiting, and enabled afterwards
 * - Liking sends POST, un-liking sends DELETE, to the right postId
 * - On success, the server's count wins (e.g. 12, not 11)
 * - A failed like rolls back to not pressed and the old count, with
 *   the alert
 * - A failed un-like rolls back to pressed
 * - A network failure (`HttpResponse.error()`) rolls back too
 * - The next click removes the alert
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State: liked, count, "is saving", and "did it fail".
 * 2. At the top of the click handler, copy the current values into
 *    local constants (`const before = { liked, count };`). The catch
 *    block can use them to roll back.
 * 3. The handler can be `async`. Set the optimistic values BEFORE the
 *    `await fetch(...)`, and the server's values (or the rollback)
 *    after it.
 * 4. Remember `fetch` doesn't reject on a 500: check `response.ok` and
 *    throw, so the failure lands in your catch block.
 * 5. The plural is derived from the count, not stored:
 *        const label = count === 1 ? "1 like" : `${count} likes`;
 * 6. TESTING: the interesting moment is BETWEEN the click and the
 *    answer. Make the handler wait at a "gate" that the test opens when
 *    it's done looking (the test file has a `createGate` helper):
 *        const gate = createGate();
 *        server.use(http.post("/api/posts/1/like", async () => {
 *          await gate.opened;
 *          return HttpResponse.json({ liked: true, likes: 12 });
 *        }));
 *        await user.click(likeButton);
 *        expect(likeButton).toHaveAttribute("aria-pressed", "true"); // optimistic
 *        gate.open();
 *        expect(await screen.findByText("12 likes")).toBeInTheDocument();
 * 7. TESTING: to prove which method was used, register only that one
 *    (`http.delete(...)`). A request no handler matches makes the test
 *    print an MSW error and the fetch fail.
 * 8. TESTING: `screen.getByRole("button", { name: "Like", pressed: true })`
 *    finds the button only when aria-pressed is "true".
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Optimistic updates and rollback
 * - async event handlers that update state before and after a request
 * - Disabling a control while a request is in flight
 * - aria-pressed for toggle buttons
 * - Testing the moment before a response arrives
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Keep the button enabled, and let fast clicks queue up correctly.
 * - Rewrite it with React 19's `useOptimistic` (see the concurrent
 *   React level).
 * - Show "1.2k likes" for big numbers with Intl.NumberFormat's
 *   `notation: "compact"`.
 */

import type { ReactElement } from "react";

/** What the server answers after a like or un-like. */
export type LikeResponse = {
  liked: boolean;
  likes: number;
};

export type LikeButtonProps = {
  /** Which post this button likes: used in /api/posts/<postId>/like. */
  postId: number;
  /** Whether the current user already likes the post. */
  initialLiked: boolean;
  /** How many likes the post has right now. */
  initialCount: number;
};

export function LikeButton({ postId, initialLiked, initialCount }: LikeButtonProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: LikeButton");
}
