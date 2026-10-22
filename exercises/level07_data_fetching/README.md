# Level 07: Data Fetching

Most apps show data that lives on a server. In this level your components
talk to one: they load data, show what's happening while they wait, cope
with failures, and send changes back. You'll also meet the classic bugs of
fetching (requests that race each other, double submits) and learn how to
avoid them.

## Loading data in an effect

Asking a server for data is a **side effect**, so you start it in
`useEffect`. `fetch` returns a **promise**: a value that arrives later.

```tsx
useEffect(() => {
  let ignore = false;
  fetch(`/api/books/${bookId}`)
    .then((response) => response.json())
    .then((book) => {
      if (!ignore) setBook(book);
    });
  return () => {
    ignore = true;
  };
}, [bookId]);
```

The `ignore` flag is set by the **cleanup**, which React runs when
`bookId` changes or the component goes away. An answer that arrives after
that is out of date, and the flag makes sure it never reaches the screen.

## Three states, always

While data loads, a component is in one of three states: **loading**,
**error** or **success**. Show something useful for each one. A screen
reader announces an element with `role="status"` (for "Loading...") and
`role="alert"` (for errors) when it appears.

One surprise: `fetch` does NOT reject when the server answers 404 or 500.
It only rejects when there's no answer at all. Check `response.ok`
yourself:

```tsx
const response = await fetch('/api/books/1');
if (!response.ok) throw new Error(`Server said ${response.status}`);
```

## Sending data

Saving happens because the user did something (clicked, submitted), so it
belongs in the **event handler**, not in an effect. Pass `fetch` a method,
a header and a JSON body:

```tsx
await fetch('/api/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Emma' }),
});
```

## StrictMode and double requests

In development, React's `<StrictMode>` runs every effect twice when a
component first appears: effect, cleanup, effect. That's why you see two
identical requests in the browser's network tab when you try a component
in the playground. It's on purpose: it proves your cleanup works. With
the `ignore` flag (or an `AbortController` that cancels the first
request), the first answer is thrown away and nothing breaks.

## Testing with MSW

There's no real server in the tests. **MSW** (Mock Service Worker) catches
every request and answers with whatever the test asks for. Add the
answers at the start of each test with `server.use`. They're removed
automatically after each test:

```tsx
import { delay, http, HttpResponse } from 'msw';
import { server } from '../../test/server';

server.use(
  http.get('/api/books/1', () => HttpResponse.json({ id: 1, title: 'Emma' })),
);
```

Handy tricks, all explained in the exercises' HINTS:

- **Errors:** `HttpResponse.json({}, { status: 500 })` for an error
  status, `HttpResponse.error()` for "no answer at all".
- **Slow answers:** `await delay(200)` inside a handler.
- **One-time answers:** `http.get(url, resolver, { once: true })`.
- **Reading the request:** `await request.json()`, `request.method`,
  `params.id`, and `new URL(request.url).searchParams`.
- **Gates:** a handler can `await` a promise that the test resolves when
  it's ready. That freezes the "waiting for the server" moment, so you
  can check loading and optimistic states without any timing luck.
- **Waiting for the answer:** use the async `findBy...` queries, which
  keep looking for up to a second.

If a test prints `[MSW] Error: intercepted a request without a matching
request handler`, your component asked for a URL that no handler covers.
Check the URL your code builds. All URLs in this level are relative,
like `/api/users/1`.

## Exercises

1. `ex01_user_profile`: loading, error and success states, and the
   `response.ok` check.
2. `ex02_retry_on_error`: an error message with a "Try again" button that
   fetches again.
3. `ex03_stale_responses`: the `userId` changes quickly and answers race.
   Make sure an old answer never wins.
4. `ex04_pagination`: page buttons, disabled at the ends, with the old
   page kept on screen while the next one loads.
5. `ex05_create_post_form`: POST JSON, block double submits, and show the
   server's validation messages next to each field.
6. `ex06_optimistic_like`: update the screen before the server answers,
   and roll back with an error if it fails.
