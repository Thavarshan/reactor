/**
 * Exercise: Create Post Form
 * Level:    07 - Data Fetching
 * Topics:   POST with JSON, submitting state, server validation errors, aria-describedby
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <CreatePostForm> that sends a new post to the server. While
 * it's sending, the button is disabled. If the server rejects a field,
 * show its message next to that field. On success, clear the form.
 *
 *     Title [ Hello world        ]
 *           Title is too short.            <- from the server
 *     Body  [ My first post...   ]
 *
 *     [ Create post ]     Creating post...
 *
 *     <CreatePostForm onCreated={(post) => console.log(post.id)} />
 *
 * ========================================================================
 * BACKGROUND: SENDING DATA WITH fetch
 * ========================================================================
 * `fetch` can do more than read. Pass an options object to choose the
 * METHOD and send a BODY. JSON is sent as a string, with a header that
 * tells the server what the string is:
 *
 *     const response = await fetch("/api/comments", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify({ text: "Nice!" }),
 *     });
 *
 * Saving is NOT a side effect of rendering. It happens because the user
 * submitted the form, so it belongs in the submit handler, not in
 * useEffect. A handler can be `async`.
 *
 * Servers often check the data themselves and answer with status 422
 * ("Unprocessable Content") plus a message per field. A good form
 * shows each message next to its field, and links them for screen
 * readers with aria-describedby: the field's DESCRIPTION is then read
 * out after its name.
 *
 *     <input id="email" aria-describedby="email-error" aria-invalid="true" />
 *     <p id="email-error">That email is already taken.</p>
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * The server: `POST /api/posts` with the JSON body
 *     { "title": "...", "body": "..." }
 * answers with one of:
 * - 201 and the new post: { "id": 7, "title": "...", "body": "..." }
 * - 422 and messages: { "errors": { "title"?: "...", "body"?: "..." } }
 * - anything else: a failure.
 *
 * The form contains:
 * - A text input labelled "Title" and a textarea labelled "Body".
 * - A submit button named "Create post".
 * - An element with role="status" that is ALWAYS on the page (screen
 *   readers only announce changes to a status that already exists). Its
 *   text is empty, "Creating post..." or "Post created.".
 * - For each field the server complained about: the message as text,
 *   linked to the field with aria-describedby, and aria-invalid="true"
 *   on the field.
 * - On a failure: an element with role="alert" and the text
 *   "Could not create the post. Please try again."
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. On submit (button click or Enter in the title), prevent the page
 *    reload and POST `{ title, body }` as JSON to `/api/posts`, with the
 *    "Content-Type: application/json" header. Send the text exactly as
 *    typed.
 * 2. Not check the fields itself (no `required` attribute either): the
 *    server decides what's valid.
 * 3. While waiting: disable the button and show "Creating post...".
 * 4. On 201: call `onCreated` with the post from the answer, clear both
 *    fields, and show "Post created.".
 * 5. On 422: show each field message as described, keep what the user
 *    typed, and enable the button again.
 * 6. On any other failure (other status, or no answer): show the alert,
 *    keep what the user typed, and enable the button again.
 * 7. At the start of every submit, remove the old messages, the alert
 *    and "Post created.".
 *
 * You can assume:
 * - A 422 answer always has an `errors` object.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     type "Hello" and "My first post", click "Create post"
 *       while waiting        ->  button disabled, "Creating post..."
 *       201                  ->  onCreated({ id: 7, ... }), both fields
 *                                empty, "Post created."
 *
 *     click "Create post" with an empty title
 *       422 { errors: { title: "Title is required." } }
 *                            ->  "Title is required." under Title, Title
 *                                has aria-invalid="true", body text kept
 *
 *     500                    ->  alert "Could not create the post. Please try again."
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - The request is a POST with the right JSON body and Content-Type
 * - While waiting: button disabled, "Creating post...", and a second
 *   click sends no second request
 * - Success: onCreated called once with the server's post, fields
 *   cleared, "Post created."
 * - 422 for title only: message linked to Title (check it with
 *   `toHaveAccessibleDescription`), Body not marked invalid, text kept
 * - 422 for both fields: both messages
 * - 500 and network failure: alert, text kept, button enabled again
 * - Submitting again clears the old messages and the alert
 * - Pressing Enter in the Title field submits
 * - Works without an onCreated prop
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State: the two field values, "is submitting", the field errors
 *    (an object, `{}` when there are none), and flags for "failed" and
 *    "created".
 * 2. `async function handleSubmit(e: React.FormEvent<HTMLFormElement>)`:
 *    call `e.preventDefault()` first, then `await fetch(...)`. Wrap the
 *    request in try/catch/finally and set "submitting" back to false in
 *    `finally`, so the button comes back whatever happens.
 * 3. Check `response.status === 422` BEFORE `!response.ok`, and read
 *    the messages with `await response.json()`.
 * 4. IDs for aria-describedby must be unique on the page. `useId()`
 *    gives you one per component: `const id = useId();` then
 *    `${id}-title-error`.
 * 5. Only add aria-describedby when there IS a message. Pointing at an
 *    element that doesn't exist confuses screen readers.
 * 6. TESTING: the MSW handler can read what you sent:
 *        let received: unknown;
 *        server.use(
 *          http.post("/api/posts", async ({ request }) => {
 *            received = await request.json();
 *            return HttpResponse.json({ id: 7, ...(received as object) }, { status: 201 });
 *          }),
 *        );
 *    and the header: `request.headers.get("Content-Type")`.
 * 7. TESTING: to look at the form WHILE it's waiting, make the handler
 *    wait at a "gate" that the test opens when it's done looking. The
 *    test file has a `createGate` helper for this: `await gate.opened`
 *    in the handler, `gate.open()` in the test.
 * 8. TESTING: `toHaveAccessibleDescription("Title is required.")`
 *    checks the aria-describedby link. `toBeInvalid()` checks
 *    aria-invalid="true".
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Sending data from an event handler (not an effect)
 * - async handlers with try/catch/finally
 * - Submitting state to prevent double submits
 * - Showing server validation errors accessibly (aria-describedby,
 *   aria-invalid, useId)
 * - A live status region that is always rendered
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Move focus to the first invalid field after a 422.
 * - Also check the fields in the browser before sending, but keep
 *   showing the server's messages too.
 * - Rewrite it with React 19's `<form action={...}>` and
 *   `useActionState` (see the concurrent React level).
 */

import type { ReactElement } from 'react';

/** A post, as the server sends it back. */
export type Post = {
  id: number;
  title: string;
  body: string;
};

/** The messages a 422 answer can contain. */
export type FieldErrors = {
  title?: string;
  body?: string;
};

export type CreatePostFormProps = {
  /** Called with the new post after the server has saved it. */
  onCreated?: (post: Post) => void;
};

export function CreatePostForm({
  onCreated,
}: CreatePostFormProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: CreatePostForm');
}
