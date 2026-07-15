import { test, expect } from '@playwright/test';

test.describe('Portfolio Publish Flow', () => {
  test('should allow user to create and publish a portfolio', async ({ page }) => {
    // Mock authentication by setting session cookie
    await page.context().addCookies([{
      name: 'sb-access-token',
      value: 'mock-token',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false
    }]);
    
    // Navigate to the dashboard
    await page.goto('/(dashboard)');
    
    // Navigate to portfolio builder
    await page.locator('text=Portfolio').click();
    
    // Create or edit a portfolio
    // In a real test, we would create a new portfolio or use an existing one
    // For this test, we'll assume a portfolio exists and navigate to it
    await page.locator('text=Edit Portfolio').click();
    
    // Publish the portfolio
    const publishButton = page.locator('button:has-text("Publish")');
    await expect(publishButton).toBeVisible();
    
    // Click publish
    await publishButton.click();
    
    // Wait for success message
    await expect(page.locator('text=Portfolio published successfully')).toBeVisible();
    
    // Verify the portfolio status is published
    await expect(page.locator('text=published')).toBeVisible();
  });
});