// The fake server (MSW) used by tests that fetch data. It starts with no
// routes. Each test adds the responses it needs:
//
//   import { http, HttpResponse } from "msw";
//   import { server } from "../../test/server";
//
//   server.use(
//     http.get("/api/users/1", () => HttpResponse.json({ id: 1, name: "Ada" })),
//   );
import { setupServer } from "msw/node";

export const server = setupServer();
