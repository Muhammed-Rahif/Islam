import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test('changing font size to "175%" should work', async ({ page }) => {
  await page.goto('http://localhost:8100/settings');
  await page.getByText('100%').nth(1).click();

  // font size to 175%
  await page.locator('label').filter({ hasText: '175%' }).click();

  // go to surah fatiha
  await page.goto('http://localhost:8100/quran/1');
  const fatiha1stAyah = page.getByText(
    'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ﴿٢﴾'
  );
  const fatiha1stAyahStyle = await fatiha1stAyah.getAttribute('style');

  expect(fatiha1stAyahStyle).toMatch(/font-size: 175%/gi);
});

test('changing font size to "175%" should not have value "100%"', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/settings');
  await page.getByText('100%').nth(1).click();

  // font size to 175%
  await page.locator('label').filter({ hasText: '175%' }).click();

  // go to surah fatiha
  await page.goto('http://localhost:8100/quran/1');
  const fatiha1stAyah = page.getByText(
    'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ﴿٢﴾'
  );
  const fatiha1stAyahStyle = await fatiha1stAyah.getAttribute('style');

  expect(fatiha1stAyahStyle).not.toMatch(/font-size: 100%/gi);
});

test('changing font family to "Al Qalam" should work', async ({ page }) => {
  await page.goto('http://localhost:8100/settings');

  // clicking on font family select
  await page.locator('label').filter({ hasText: 'Me Quran' }).click();

  // selecting 'Al Qalam'
  await page.getByRole('radio', { name: 'Al Qalam', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // go to surah fatiha
  await page.goto('http://localhost:8100/quran/1');
  const fatiha1stAyah = page.getByText(
    'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ﴿٢﴾'
  );
  const fatiha1stAyahStyle = await fatiha1stAyah.getAttribute('style');

  expect(fatiha1stAyahStyle).toMatch(/font-family: \"Al Qalam\"/gi);
});

test('enabling translations of french and chinese with default eng translation', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/settings');

  // opening translations selecting modal in settings
  await page.getByRole('button', { name: 'english' }).click();
  await page.getByPlaceholder('Search').click();

  // selecting french translations
  await page.getByPlaceholder('Search').fill('fre');
  await page
    .getByRole('listitem')
    .filter({ hasText: 'french, Muhammad Hamidullah' })
    .locator('svg')
    .click();

  // selecting chinese translations
  await page.getByPlaceholder('Search').fill('chi');
  await page
    .getByRole('listitem')
    .filter({ hasText: 'chinese, Muhammad Makin' })
    .locator('svg')
    .click();

  // closing translations selecting modal
  await page.getByRole('button', { name: 'Done' }).click();

  await page.goto('http://localhost:8100/quran');
  await page.getByText('Al-FatihahThe Opener').click();
  await page
    .locator('ion-segment-button')
    .filter({ hasText: 'Translation' })
    .click();

  const chineseTranslation = page
    .locator('ion-text')
    .filter({ hasText: '奉至仁至慈的安拉之名- Muhammad Makin' })
    .locator('small');
  const frenchTranslation = page
    .locator('ion-text')
    .filter({
      hasText:
        'Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux. 1- French Transl',
    })
    .locator('small');
  const engTranslation = page
    .locator('ion-text')
    .filter({
      hasText:
        'In the Name of Allah—the Most Compassionate, Most Merciful.- Dr. Mustafa Khattab',
    })
    .locator('small');

  // waiting for translations to load
  await delay(1000);

  await expect(chineseTranslation).toBeInViewport();
  await expect(frenchTranslation).toBeInViewport();
  await expect(engTranslation).toBeInViewport();
});
