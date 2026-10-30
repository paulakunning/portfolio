import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      // Safari sizes the pinned reel its own way; the rest of the suite runs in Chrome only.
      name: "desktop-safari",
      grep: /desktop reel/,
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
  webServer: {
    // CI builds in an earlier step; locally the server builds first.
    command: process.env.CI
      ? "npm run start -- -p 3100"
      : "npm run build && npm run start -- -p 3100",
    url: "http://localhost:3100",
    env: { CONTACT_DRY_RUN: "true" },
    // Always test a fresh production build, never a dev server left on the port.
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
