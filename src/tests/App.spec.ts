/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8100/');
});

test('has title', async ({ page }) => {
  // Expects the title to contain 'Islam'.
  await expect(page).toHaveTitle(/Islam/);
});

test('redirect home to /quran', async ({ page }, testInfo) => {
  // capturing a screenshot
  const screenshot = await page.screenshot({
    type: 'png',
  });
  await testInfo.attach('home-screen', {
    body: screenshot,
    contentType: 'image/png',
  });

  // Expects to redirect '/' to '/quran'.
  await expect(page).toHaveURL(/quran/);
});
