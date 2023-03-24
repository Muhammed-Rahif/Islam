/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8100/');

  // Expects the title to contain 'Islam'.
  await expect(page).toHaveTitle(/Islam/);
});

test('redirect home to /quran', async ({ page }) => {
  await page.goto('http://localhost:8100/');

  // Expects to redirect '/' to '/quran'.
  await expect(page).toHaveURL(/quran/);
});
