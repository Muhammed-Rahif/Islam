/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8100/');

  // Expects the title to contain 'Islam'.
  await expect(page).toHaveTitle(/Islam/);
});

test('redirect home to /quran', async ({ page }, testInfo) => {
  await page.goto('http://localhost:8100/');

  // putting 1s delay to fetch data
  await delay(1000);

  // capturing a screenshot
  const screenshot = await page.screenshot();
  testInfo.attach('home-screen', {
    body: screenshot,
    contentType: 'image/png',
  });

  // Expects to redirect '/' to '/quran'.
  await expect(page).toHaveURL(/quran/);
});
