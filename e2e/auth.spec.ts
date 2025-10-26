import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/');
    
    // Fill in login form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Click login button
    await page.click('button:has-text("Login")');
    
    // Should redirect to task manager
    await expect(page).toHaveURL('http://localhost:5173/');
    
    // Should see task manager header
    await expect(page.locator('h1')).toContainText('Task Manager');
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    await page.goto('/');
    
    // Fill in login form with invalid credentials
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    // Click login button
    await page.click('button:has-text("Login")');
    
    // Should show error message
    await expect(page.locator('text=/failed to login/i')).toBeVisible();
  });

  test('should register a new user', async ({ page }) => {
    await page.goto('/');
    
    // Switch to register form
    await page.click('button:has-text("Register here")');
    
    // Fill in register form
    await page.fill('input[type="email"]', 'newuser@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Click register button
    await page.click('button:has-text("Register")');
    
    // Should redirect to task manager
    await expect(page).toHaveURL('http://localhost:5173/');
    
    // Should see task manager
    await expect(page.locator('h1')).toContainText('Task Manager');
  });

  test('should logout successfully', async ({ page }) => {
    // First login
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:has-text("Login")');
    
    // Wait for login to complete
    await expect(page.locator('h1')).toContainText('Task Manager');
    
    // Click logout button
    await page.click('button:has-text("Logout")');
    
    // Should redirect back to login page
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('h2')).toContainText('Login');
  });

  test('should switch between login and register forms', async ({ page }) => {
    await page.goto('/');
    
    // Should see login form initially
    await expect(page.locator('h2')).toContainText('Login');
    
    // Switch to register
    await page.click('button:has-text("Register here")');
    await expect(page.locator('h2')).toContainText('Register');
    
    // Switch back to login
    await page.click('button:has-text("Login here")');
    await expect(page.locator('h2')).toContainText('Login');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('/');
    
    // Try to submit without filling fields
    await page.click('button:has-text("Login")');
    
    // Should see validation error
    await expect(page.locator('text=/please fill in all fields/i')).toBeVisible();
  });

  test('should require password length', async ({ page }) => {
    await page.goto('/');
    
    // Switch to register form
    await page.click('button:has-text("Register here")');
    
    // Try to register with short password
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', '123');
    
    await page.click('button:has-text("Register")');
    
    // Should show error (this will be handled by backend if we integrate)
    // For now, just check that form doesn't submit successfully
    await expect(page.locator('h2')).toContainText('Register');
  });
});

