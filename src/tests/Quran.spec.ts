/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test('have "Quran" named toolbar', async ({ page }) => {
  await page.goto('http://localhost:8100/quran');

  // the title in the header toolbar
  const quranTitle = page.locator('ion-title');

  // Expects the title to contain 'Quran'.
  await expect(quranTitle).toHaveText('Quran');
});

test('should "Quran" title visible', async ({ page }) => {
  await page.goto('http://localhost:8100/quran');

  // Expects the title to be in viewport.
  const quranTitleInViewport = page.locator('ion-title').filter({
    hasText: 'Quran',
  });
  await expect(quranTitleInViewport).toBeInViewport();
});

test('have segment btn with text of "Surah"', async ({ page }) => {
  await page.goto('http://localhost:8100/quran');

  const ionSegBtn = page
    .locator('ion-segment-button')
    .filter({ hasText: 'Juz' });
  page.locator('ion-segment-button').filter({ hasText: 'Surah' });

  await expect(ionSegBtn).toBeInViewport();
});

test('in "Revelation Order", surah Alaq should be visible', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/quran');

  await page
    .locator('ion-segment-button')
    .filter({ hasText: 'Revelation Order' })
    .click();
  const alaqSurahItem = page.getByRole('heading', { name: "Al-'Alaq" });
  await expect(alaqSurahItem).toBeInViewport();
});

test('search for "Mulk" should show mulk surah', async ({ page }) => {
  await page.goto('http://localhost:8100/quran');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('mulk');
  await delay(1000);
  const mulkSurahItem = page.getByRole('link', {
    name: '67 Al-Mulk The Sovereignty 30 Ayahs',
  });
  await expect(mulkSurahItem).toBeInViewport();
});

test('scroll down to bottom, surah "Al-Nas" should be visible', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/quran');
  await delay(1000);

  // scrolling down maximum
  await page.mouse.wheel(0, 7000);

  const alNasSurah = page.getByText('Mankind');
  await expect(alNasSurah).toBeInViewport();
});
