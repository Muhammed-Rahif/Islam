import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8100/about');
});

test('should have "about" screen contents', async ({ page }) => {
  const aboutHeading = page.getByText(
    'The Islam Application - Your Comprehensive Resource for Enhancing Your Knowledge'
  );
  const aboutParaStartgin = page.getByText(
    'The Islam Application is a mobile app that provides Muslims with easy access to '
  );

  const contributorsTitle = page.getByRole('heading', {
    name: 'Our Contributors',
  });
  const stargazersTitle = page.getByRole('heading', { name: 'Our Stargazers' });

  for (const element of [
    aboutHeading,
    aboutParaStartgin,
    contributorsTitle,
    contributorsTitle,
    stargazersTitle,
  ]) {
    await expect(element).toBeVisible();
  }
});
