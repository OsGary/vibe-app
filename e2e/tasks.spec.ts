import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:has-text("Login")');
    
    // Wait for task manager to load
    await expect(page.locator('h1')).toContainText('Task Manager');
  });

  test('should display existing tasks', async ({ page }) => {
    // Should see test tasks
    await expect(page.locator('text=/task/i').first()).toBeVisible();
  });

  test('should create a new task', async ({ page }) => {
    // Fill in task form
    await page.fill('input[id="title"]', 'My New Task');
    await page.fill('textarea[id="description"]', 'Task description');
    await page.fill('input[id="category"]', 'work');
    
    // Submit form
    await page.click('button:has-text("Add Task")');
    
    // Should see new task in the list
    await expect(page.locator('text=My New Task')).toBeVisible();
  });

  test('should toggle task completion', async ({ page }) => {
    // Find first task checkbox
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    
    // Click to complete task
    await firstCheckbox.click();
    
    // Task should be checked
    await expect(firstCheckbox).toBeChecked();
  });

  test('should delete a task', async ({ page }) => {
    // Get initial task count
    const initialTasks = await page.locator('[role="checkbox"]').count();
    
    // Click delete button on first task
    const deleteButton = page.locator('button[aria-label="Delete task"]').first();
    await deleteButton.click();
    
    // Should have one less task
    await expect(page.locator('[role="checkbox"]')).toHaveCount(initialTasks - 1);
  });

  test('should show empty state when no tasks', async ({ page }) => {
    // Delete all tasks by clicking all delete buttons
    const deleteButtons = page.locator('button[aria-label="Delete task"]');
    const count = await deleteButtons.count();
    
    for (let i = 0; i < count; i++) {
      await deleteButtons.first().click();
    }
    
    // Should see empty state
    await expect(page.locator('text=/no tasks/i')).toBeVisible();
    await expect(page.locator('text=/get started by creating a new task/i')).toBeVisible();
  });

  test('should separate active and completed tasks', async ({ page }) => {
    // Create a task first
    await page.fill('input[id="title"]', 'Test Task');
    await page.fill('textarea[id="description"]', 'Description');
    await page.click('button:has-text("Add Task")');
    
    // Complete the task
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.first().click();
    
    // Should see completed section
    await expect(page.locator('text=/completed tasks/i')).toBeVisible();
  });

  test('should show validation error when title is empty', async ({ page }) => {
    // Try to submit without title
    await page.fill('textarea[id="description"]', 'Description without title');
    await page.click('button:has-text("Add Task")');
    
    // Should show validation (HTML5 required attribute)
    const titleInput = page.locator('input[id="title"]');
    await expect(titleInput).toHaveAttribute('required', '');
  });

  test('should update task title in the form and see it saved', async ({ page }) => {
    // Create a task
    await page.fill('input[id="title"]', 'Original Title');
    await page.fill('textarea[id="description"]', 'Description');
    await page.fill('input[id="category"]', 'work');
    await page.click('button:has-text("Add Task")');
    
    // Should see the task with original title
    await expect(page.locator('text=Original Title')).toBeVisible();
    
    // Form should be cleared after submission
    await expect(page.locator('input[id="title"]')).toHaveValue('');
  });

  test('should display task details (title, description, category)', async ({ page }) => {
    // Create a task with all fields
    await page.fill('input[id="title"]', 'Complete Task');
    await page.fill('textarea[id="description"]', 'This is a complete description');
    await page.fill('input[id="category"]', 'personal');
    await page.click('button:has-text("Add Task")');
    
    // Should see all details in the task
    await expect(page.locator('text=Complete Task')).toBeVisible();
    await expect(page.locator('text=This is a complete description')).toBeVisible();
    await expect(page.locator('text=personal')).toBeVisible();
  });
});

