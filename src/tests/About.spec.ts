import { test, expect } from '@playwright/test';

test('should have "about" screen contents', async ({ page }) => {
  await page.goto('http://localhost:8100/about');

  const aboutHeading = page.getByText(
    'The Islam Application - Your Comprehensive Resource for Enhancing Your Knowledge'
  );
  const aboutParaStartgin = page.getByText(
    'The Islam Application is a mobile app that provides Muslims with easy access to '
  );

  const contributorsTitle = page.getByRole('heading', {
    name: 'Our Contributors',
  });

  const authorName = page.getByRole('heading', {
    name: 'Muhammed-Rahif',
  });

  for (const element of [
    aboutHeading,
    aboutParaStartgin,
    contributorsTitle,
    authorName,
  ]) {
    await expect(element).toBeVisible();
  }
});
