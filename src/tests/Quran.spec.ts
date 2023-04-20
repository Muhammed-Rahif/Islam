import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8100/quran');
});

test('have "Quran" named toolbar', async ({ page }) => {
  // the title in the header toolbar
  const quranTitle = page.locator('ion-title');

  // Expects the title to contain 'Quran'.
  await expect(quranTitle).toHaveText('Quran');
});

test('should "Quran" title visible', async ({ page }) => {
  // Expects the title to be in viewport.
  const quranTitleInViewport = page.locator('ion-title').filter({
    hasText: 'Quran',
  });
  await expect(quranTitleInViewport).toBeInViewport();
});

test('have segment btn with text of "Surah"', async ({ page }) => {
  const ionSegBtn = page
    .locator('ion-segment-button')
    .filter({ hasText: 'Juz' });
  page.locator('ion-segment-button').filter({ hasText: 'Surah' });

  await expect(ionSegBtn).toBeInViewport();
});

test('in "Revelation Order", surah Alaq should be visible', async ({
  page,
}) => {
  await page
    .locator('ion-segment-button')
    .filter({ hasText: 'Revelation Order' })
    .click();
  const alaqSurahItem = page.getByRole('heading', { name: "Al-'Alaq" });
  await expect(alaqSurahItem).toBeInViewport();
});

test('search for "Mulk" should show mulk surah', async ({ page }) => {
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
  const alNasSurah = page.getByRole('heading', { name: 'An-Nas', exact: true });
  await delay(1000);

  // before scrolling, should not be visible
  await expect(alNasSurah).not.toBeInViewport();

  // scrolling down maximum
  const { windowHeight, windowWidth } = await page.evaluate(() => ({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  }));
  await page.mouse.move(windowWidth * 0.5, windowHeight * 0.5); // setting mouse position to center of the screen
  await page.mouse.wheel(0, 200 * 114); // if one item approximate 200px, then 114 surahs

  await delay(1000);
  // after scrolling, should be visible
  await expect(alNasSurah).toBeInViewport();
});
