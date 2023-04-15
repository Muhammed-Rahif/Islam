import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test.beforeEach(async ({ page, context }) => {
  await page.goto('http://localhost:8100/settings');

  await context.grantPermissions(['geolocation'], {
    origin: 'http://localhost:8100',
  });

  // set geolocation to Makkah
  await context.setGeolocation({
    latitude: 21.3891,
    longitude: 39.8579,
  });
});

test('changing prayer timing method to "Qatar" should update the times screen', async ({
  page,
}) => {
  await page.getByTitle('Select timing method').click();

  await page.getByRole('radio', { name: 'Qatar' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  await page.getByRole('tab', { name: 'Prayer Times' }).click({ force: true });

  // wait for the page to load
  await delay(1000);

  const timingMethod = await page.locator('#timing-method').innerText();

  expect(timingMethod).toMatch(/Qatar/gi);
});
