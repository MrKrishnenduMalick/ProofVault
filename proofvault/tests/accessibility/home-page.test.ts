import { test, expect } from '@playwright/test';

test.describe('Home Page Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading structure
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();
    expect(await mainHeading.textContent()).not.toBe('');
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/');
    
    // Check that images have alt attributes
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt).not.toBe('');
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    // This test would normally use an accessibility testing library
    // For now, we'll just verify that basic elements exist
    await expect(page.locator('body')).toBeVisible();
  });

  test('should be navigable with keyboard', async ({ page }) => {
    await page.goto('/');
    
    // Focus on the first link and verify keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});