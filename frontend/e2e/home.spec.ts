import { test, expect } from '@playwright/test';

test('root redirects to the landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/landing$/);
  await expect(
    page.getByRole('heading', { name: 'Trading Management System' }),
  ).toBeVisible();
});

test('landing has a working login link', async ({ page }) => {
  await page.goto('/landing');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/auth\/login$/);
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});
