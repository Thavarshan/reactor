// Runs before every test file. You don't need to edit this.
import "@testing-library/jest-dom/vitest"; // adds matchers like toBeInTheDocument()
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "./server";

// A fake network for the data-fetching levels. Unexpected requests fail
// the test, so you always know when your code calls the wrong URL.
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterEach(() => {
  cleanup(); // remove whatever the test rendered
  server.resetHandlers(); // forget handlers a test added with server.use()
});
afterAll(() => server.close());
