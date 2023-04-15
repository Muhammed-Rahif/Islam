import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test.beforeEach(async ({ page, context }) => {
  await page.goto('http://localhost:8100/');

  await context.grantPermissions(['geolocation'], {
    origin: 'http://localhost:8100',
  });

  // set geolocation to Makkah
  await context.setGeolocation({
    latitude: 21.3891,
    longitude: 39.8579,
  });
});

test('prayer times basic contents should be in viewport', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['geolocation'], {
    origin: 'http://localhost:8100',
  });
  // set geolocation to Makkah
  await context.setGeolocation({
    latitude: 21.3891,
    longitude: 39.8579,
  });

  await page.getByRole('tab', { name: 'Prayer Times' }).click({ force: true });

  // wait for the page to load
  await delay(1000);

  const nextPrayerTxt = page.getByText('is the next prayer in');
  const defaultMethod = page.getByText('Umm Al-Qura University, Makkah'); // default method is Umm Al-Qura University, Makkah
  const location = page.getByText('Asia/Riyadh'); /// location is set to Makkah
  const hijriCalender = page.getByRole('cell', { name: 'Hijri' });
  const gregorianCalender = page.getByRole('cell', { name: 'Gregorian' });

  await expect(nextPrayerTxt).toBeInViewport();
  await expect(defaultMethod).toBeInViewport();
  await expect(location).toBeInViewport();
  await expect(hijriCalender).toBeInViewport();
  await expect(gregorianCalender).toBeInViewport();
});

test('should have all obligatory prayer times', async ({ page }) => {
  await page.getByRole('tab', { name: 'Prayer Times' }).click({ force: true });

  // wait for the page to load
  await delay(1000);

  const obligatoryPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  for (const prayer of obligatoryPrayers) {
    await expect(page.getByRole('list').getByText(prayer)).toBeInViewport();
  }
});
