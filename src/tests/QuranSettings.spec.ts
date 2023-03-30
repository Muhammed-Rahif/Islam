import { test, expect } from '@playwright/test';

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
