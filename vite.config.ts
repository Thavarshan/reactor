import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["exercises/**/*.test.{ts,tsx}"],
    setupFiles: ["./test/setup.ts"],
    // Fail (rather than hang) a test that never finishes, e.g. one waiting
    // for an element that never appears or a timer that never fires.
    testTimeout: 10_000,
  },
});
