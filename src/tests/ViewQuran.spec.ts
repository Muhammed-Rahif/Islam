/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test('clicking on fatiha item should navigate to "Al-Fatihah" page', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/quran');

  // clicking on the fatiha link on quran page
  await page.getByRole('heading', { name: 'Al-Fatihah' }).click();
  // checking if the title of the page is "Al-Fatihah"
  const pageTitle = page
    .locator('ion-title')
    .filter({ hasText: '1. Al-Fatihah' });

  await expect(pageTitle).toBeInViewport();
});

test('clicking on next chapter btn in "Al-Fatihah" page should navigate to "Al-Baqarah"', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/quran/1?chapterName=Al-Fatihah');
  await page.getByRole('link', { name: 'Next Chapter' }).click();
  const nextPageTitle = page
    .locator('ion-title')
    .filter({ hasText: '2. Al-Baqarah' });
  await delay(1000);
  await expect(nextPageTitle).toBeInViewport();
});

test('clicking on next chapter btn in "An-Nas" page should navigate to "Al-Falaq"', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/quran/114?chapterName=An-Nas');
  await page.getByRole('link', { name: 'Prev Chapter' }).click();
  const nextPageTitle = page
    .locator('ion-title')
    .filter({ hasText: '113. Al-Falaq' });
  await delay(1000);
  await expect(nextPageTitle).toBeInViewport();
});

test('change type to translation', async ({ page }) => {
  await page.goto('http://localhost:8100/quran/1?chapterName=Al-Fatihah');
  await page
    .locator('ion-segment-button')
    .filter({ hasText: 'Translation' })
    .click();
  const translationTxt = page
    .locator('ion-text')
    .filter({ hasText: 'All praise is for Allah—Lord of all worlds' });
  await delay(1000);
  await expect(translationTxt).toBeInViewport();
});

test('on Surah 114, "next chapter" btn should disabled, "prev chapter" btn should enabled', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/quran/114');
  const nextBtn = page.locator('ion-button', { hasText: 'Next Chapter' });
  const prevBtn = page.locator('ion-button', { hasText: 'Prev Chapter' });

  await expect(nextBtn).toHaveAttribute('disabled', '');
  await expect(prevBtn).not.toHaveAttribute('disabled', '');
});

test('on Surah 1, "prev chapter" btn should disabled', async ({ page }) => {
  await page.goto('http://localhost:8100/quran/1');
  const nextBtn = page.locator('ion-button', { hasText: 'Next Chapter' });
  const prevBtn = page.locator('ion-button', { hasText: 'Prev Chapter' });

  await expect(nextBtn).not.toHaveAttribute('disabled', '');
  await expect(prevBtn).toHaveAttribute('disabled', '');
});
