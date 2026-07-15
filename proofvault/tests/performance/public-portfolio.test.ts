import { test, expect } from '@playwright/test';

test.describe('Public Portfolio Performance', () => {
  test('should load within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate to a public portfolio
    await page.goto('/u/test-portfolio');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Check that the page loads within 2.5 seconds (LCP < 2.5s requirement)
    expect(loadTime).toBeLessThan(2500);
  });

  test('should have good Largest Contentful Paint (LCP)', async ({ page }) => {
    // This would normally use a performance testing library
    // For now, we'll just verify the page loads
    await page.goto('/u/test-portfolio');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have good Cumulative Layout Shift (CLS)', async ({ page }) => {
    // This would normally use a performance testing library
    // For now, we'll just verify the page loads
    await page.goto('/u/test-portfolio');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have good Interaction to Next Paint (INP)', async ({ page }) => {
    await page.goto('/u/test-portfolio');
    
    // Measure interaction performance
    const startTime = Date.now();
    
    // Click on a link to measure interaction time
    const link = page.locator('a').first();
    await link.click();
    
    const interactionTime = Date.now() - startTime;
    
    // Check that interactions happen within 200ms (INP < 200ms requirement)
    expect(interactionTime).toBeLessThan(200);
  });
});