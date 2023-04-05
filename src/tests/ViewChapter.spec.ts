/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import { delay } from 'utils/time';

test('clicking on fatiha item should navigate to "Al-Fatihah" page', async ({
  page,
}, testInfo) => {
  await page.goto('http://localhost:8100/quran');

  // adding delay for fetching data
  await delay(2000);

  // clicking on the fatiha link on quran page
  await page.getByRole('heading', { name: 'Al-Fatihah' }).click();
  // checking if the title of the page is "Al-Fatihah"
  const pageTitle = page
    .locator('ion-title')
    .filter({ hasText: '1. Al-Fatihah' });

  // capturing a screenshot
  const screenshot = await page.screenshot({
    type: 'png',
  });
  await testInfo.attach('view-quran-fatiha', {
    body: screenshot,
    contentType: 'image/png',
  });

  await expect(pageTitle).toBeInViewport();
});

test('clicking on next chapter btn in "Al-Fatihah" page should navigate to "Al-Baqarah"', async ({
  page,
}) => {
  // surah 1 is "Al-Fatihah"
  await page.goto('http://localhost:8100/quran/1');
  await page.getByLabel('floating-action-button', { exact: true }).click();
  await page
    .getByRole('link', { name: 'next-chapter-btn' })
    .click({ force: true });
  const nextPageTitle = page
    .locator('ion-title')
    .filter({ hasText: '2. Al-Baqarah' });
  await delay(1000);
  await expect(nextPageTitle).toBeInViewport();
});

test('clicking on previous chapter btn in "An-Nas" page should navigate to "Al-Falaq"', async ({
  page,
}) => {
  // surah 114 is "An-Nas"
  await page.goto('http://localhost:8100/quran/114');
  await page.locator('ion-fab').getByRole('button').click({ force: true });
  await page
    .getByRole('link', { name: 'previous-chapter-btn' })
    .click({ force: true });
  const nextPageTitle = page
    .locator('ion-title')
    .filter({ hasText: '113. Al-Falaq' });
  await delay(1000);
  await expect(nextPageTitle).toBeInViewport();
});

test('change type to translation', async ({ page }) => {
  // surah 1 is "Al-Fatihah"
  await page.goto('http://localhost:8100/quran/1');
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
  // surah 114 is "An-Nas"
  await page.goto('http://localhost:8100/quran/114');
  await page.locator('ion-fab').getByRole('button').click({ force: true });
  const nextBtn = page.getByRole('link', { name: 'next-chapter-btn' });
  const prevBtn = page.getByRole('link', { name: 'previous-chapter-btn' });

  await expect(nextBtn).toHaveAttribute('disabled', '');
  await expect(prevBtn).not.toHaveAttribute('disabled', '');
});

test('on Surah 1 (al-Fatihah), "prev chapter" btn should disabled', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/quran/1');
  await page.locator('ion-fab').getByRole('button').click({ force: true });
  const nextBtn = page.getByRole('link', { name: 'next-chapter-btn' });
  const prevBtn = page.getByRole('link', { name: 'previous-chapter-btn' });

  await expect(nextBtn).not.toHaveAttribute('disabled', '');
  await expect(prevBtn).toHaveAttribute('disabled', '');
});

test('should scroll to top fab button scroll to top', async ({ page }) => {
  await page.goto('http://localhost:8100/quran');
  await page.getByRole('heading', { name: 'Al-Baqarah' }).click();
  await page.getByText('Click here or Scroll down to load more').click();
  await page.getByText('Click here or Scroll down to load more').click();
  await page.getByText('Click here or Scroll down to load more').click();
  await page.getByText('Click here or Scroll down to load more').click();
  await page.locator('ion-fab').getByRole('button').click({ force: true });
  await page
    .getByRole('button', { name: 'scroll-to-top-btn' })
    .click({ force: true });

  // wait page to scroll to smoothly to top
  await delay(1000);

  // reading segment button is in the top of the page
  const readingSegBtn = page
    .locator('ion-segment-button')
    .filter({ hasText: 'Reading' });

  await expect(readingSegBtn).toBeInViewport();
});
