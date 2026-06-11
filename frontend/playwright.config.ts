import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright e2e config. Run with `npm run test:e2e` (from frontend/).
 * First time only: `npm run test:e2e:install` to download browsers.
 * Auto-starts the Next.js dev server before running tests.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3600',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3600',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
