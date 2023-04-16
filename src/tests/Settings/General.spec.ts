import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8100/settings');
});

test('on first appearence, clicking dark mode toggle btn should add "dark" class to body tag', async ({
  page,
}) => {
  // selecting the first toggle which the dark mode toggle btn
  await page.getByTitle(/Select theme/).click();
  const docBody = page.locator('body');

  await expect(docBody).toHaveClass(/dark/);
});

test('should have "Report a problem" btn and it should open telegram community page', async ({
  page,
}) => {
  await page
    .locator('ion-label')
    .filter({ hasText: 'Report a problem' })
    .click();

  const telegramPagePopup = page.waitForEvent('popup');
  const telegramPage = await telegramPagePopup;

  const viewTelegramChannelLink = await telegramPage.getByRole('link', {
    name: 'View in Telegram',
  });

  await expect(viewTelegramChannelLink).toBeInViewport();
});

test('should have "about" screen link and it should work', async ({ page }) => {
  await page.goto('http://localhost:8100/settings');

  await page.getByRole('link', { name: 'About' }).click({ force: true });

  const aboutTitle = await page
    .locator('ion-title')
    .filter({ hasText: 'About' });
  const aboutMainHeading = await page.getByText(
    'The Islam Application - Your Comprehensive Resource for Enhancing Your Knowledge'
  );

  await expect(aboutTitle).toBeInViewport();
  await expect(aboutMainHeading).toBeInViewport();
});
