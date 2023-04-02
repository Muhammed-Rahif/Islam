import { test, expect } from '@playwright/test';

test('on first appearence, clicking dark mode toggle btn should add "dark" class to body tag', async ({
  page,
}) => {
  await page.goto('http://localhost:8100/settings');

  // selecting the first toggle which the dark mode toggle btn
  await page.getByTitle(/Select theme/).click();
  const docBody = page.locator('body');

  await expect(docBody).toHaveClass(/dark/);
});
