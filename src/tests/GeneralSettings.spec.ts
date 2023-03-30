import { test, expect } from '@playwright/test';

test('one first appearence, clicking dark mode toggle btn should add "dark" class to body tag', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/settings');

  // selecting the first toggle which the dark mode toggle btn
  await page.locator('ion-toggle div').nth(1).click();
  await page.getByRole('main').click();
  const docBody = page.locator('body');

  await expect(docBody).toHaveClass(/dark/);
});
