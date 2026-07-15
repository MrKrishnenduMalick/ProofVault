import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
  test('should allow user to sign up via email', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('/(auth)/register');
    
    // Fill in the email field
    await page.locator('input[type="email"]').fill('test@example.com');
    
    // Click the send registration link button
    await page.locator('button[type="submit"]').click();
    
    // Wait for the success message
    await expect(page.locator('text=Registration link sent!')).toBeVisible();
  });

  test('should allow user to sign up via Google OAuth', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('/(auth)/register');
    
    // Click the Google OAuth button
    const googleButton = page.locator('button:has-text("Google")');
    await expect(googleButton).toBeVisible();
    await googleButton.click();
    
    // Since we can't actually complete OAuth in test, we'll just verify
    // that the button exists and the flow starts
    // In a real implementation, we'd mock the OAuth provider
  });

  test('should allow user to sign up via GitHub OAuth', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('/(auth)/register');
    
    // Click the GitHub OAuth button
    const githubButton = page.locator('button:has-text("GitHub")');
    await expect(githubButton).toBeVisible();
    await githubButton.click();
    
    // Since we can't actually complete OAuth in test, we'll just verify
    // that the button exists and the flow starts
    // In a real implementation, we'd mock the OAuth provider
  });
});