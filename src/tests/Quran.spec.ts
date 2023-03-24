/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test('have "Quran" named toolbar', async ({ page }) => {
  await page.goto('http://localhost:8100/quran');
  const quranTitle = page.locator('ion-title');

  await expect(quranTitle).toHaveText('Quran');
});

test('have segment btn with text of "Surah"', async ({ page }) => {
  await page.goto('http://localhost:8100/quran');
  // const segBtnTexts = ['Surah', 'Juz', 'Revelation Order'];

  const ionSegBtn = await page
    .locator('ion-segment-button')
    .filter({ hasText: 'Juz' });
  await page.locator('ion-segment-button').filter({ hasText: 'Surah' });

  await expect(ionSegBtn).toBeInViewport();
});

test('in "Revelation Order" surah Alaq should be first', async ({ page }) => {
  await page.goto('http://localhost:8100/quran');

  await page
    .locator('ion-segment-button')
    .filter({ hasText: 'Revelation Order' })
    .click();
  const alaqSurahItem = await page.getByRole('heading', { name: "Al-'Alaq" });
  await expect(alaqSurahItem).toBeInViewport();
});
