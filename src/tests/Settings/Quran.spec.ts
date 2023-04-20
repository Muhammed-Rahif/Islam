import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8100/settings');
});

test('changing font size to "175%" should work', async ({ page }) => {
  await page.getByTitle('Select font size').click();

  // font size to 175%
  await page.locator('label').filter({ hasText: '175%' }).click();

  // go to surah fatiha
  await page.goto('http://localhost:8100/quran/1');
  const readingQuranContainer = page.getByLabel('reading-quran-container');
  const fatiha1stAyahStyle = await readingQuranContainer.getAttribute('style');

  expect(fatiha1stAyahStyle).toMatch(/font-size: 175%/gi);
});

test('changing font size to "175%" should not have value "100%"', async ({
  page,
}) => {
  await page.locator('label').filter({ hasText: '100%' }).click();

  // font size to 175%
  await page.locator('label').filter({ hasText: '175%' }).click();

  // go to surah fatiha
  await page.goto('http://localhost:8100/quran/1');
  const readingQuranContainer = page.getByLabel('reading-quran-container');
  const fatiha1stAyahStyle = await readingQuranContainer.getAttribute('style');

  expect(fatiha1stAyahStyle).not.toMatch(/font-size: 100%/gi);
});

test('changing font family to "Al Qalam" should work', async ({ page }) => {
  // clicking on font family select
  await page.getByTitle('Select font family').click();

  // selecting 'Al Qalam'
  await page.getByRole('radio', { name: 'Al Qalam', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // go to surah fatiha
  await page.goto('http://localhost:8100/quran/1');
  const readingQuranContainer = page.getByLabel('reading-quran-container');
  const fatiha1stAyahStyle = await readingQuranContainer.getAttribute('style');

  expect(fatiha1stAyahStyle).toMatch(/font-family: "Al Qalam"/gi);
});

test('enabling translations of french and chinese with default eng translation', async ({
  page,
}) => {
  // opening translations selecting modal in settings
  await page.getByTitle('Select translations').click();
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
  await page
    .getByRole('link', { name: '1 Al-Fatihah The Opener 7 Ayahs' })
    .click({ force: true });
  await page
    .locator('ion-segment-button')
    .filter({ hasText: 'Translation' })
    .click();

  const chineseTranslation = page.getByText(
    '奉至仁至慈的安拉之名- Muhammad Makin'
  );
  const frenchTranslation = page.getByText(
    'Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux. 1- French Transl'
  );
  const engTranslation = page.getByText(
    'In the Name of Allah—the Most Compassionate, Most Merciful.- Dr. Mustafa Khattab'
  );

  // waiting for translations to load
  await delay(1000);

  await expect(chineseTranslation).toBeInViewport();
  await expect(frenchTranslation).toBeInViewport();
  await expect(engTranslation).toBeInViewport();
});

test('replacing default translation "Eng - Dr. Mustafa Khattab" by "Malayalam, Abdul-Hamid Haidar & Kanhi Muhammad"', async ({
  page,
}) => {
  // opening translations selecting modal in settings
  await page.getByTitle('Select translations').click();

  // disabling default translation "Eng - Dr. Mustafa Khattab"
  await page
    .getByRole('listitem')
    .filter({ hasText: 'english, Dr. Mustafa Khattab, the Clear Quran' })
    .locator('svg')
    .click();

  // searching for "Malayalam, Abdul-Hamid Haidar & Kanhi Muhammad"
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('mala');

  // selecting "Malayalam, Abdul-Hamid Haidar & Kanhi Muhammad"
  await page
    .getByRole('listitem')
    .filter({ hasText: 'malayalam, Abdul-Hamid Haidar & Kanhi Muhammad' })
    .locator('svg')
    .click();
  await page.getByRole('button', { name: 'Done' }).click();

  // checking if "Malayalam, Abdul-Hamid Haidar & Kanhi Muhammad" is visible
  await page.goto('http://localhost:8100/quran/1');
  await page
    .locator('ion-segment-button')
    .filter({ hasText: 'Translation' })
    .click();
  const malayalamTranslation = page.getByText(
    'സ്തുതി സര്‍വ്വലോക പരിപാലകനായ അല്ലാഹുവിന്നാകുന്നു- Abdul-Hamid Haidar & Kanhi Muh'
  );

  // checking if default translation "Eng - Dr. Mustafa Khattab" is visible
  const engTranslation = page
    .locator('ion-text')
    .filter({
      hasText:
        'In the Name of Allah—the Most Compassionate, Most Merciful.- Dr. Mustafa Khattab',
    })
    .locator('small');

  // waiting for translations to load
  await delay(1000);

  await expect(malayalamTranslation).toBeInViewport();
  await expect(engTranslation).not.toBeInViewport();
});
