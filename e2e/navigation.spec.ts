import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/')
    
    // Check home page
    await expect(page.locator('h1')).toContainText('Dashboard')
    
    // Navigate to stocks
    await page.click('text=Stocks')
    await expect(page).toHaveURL('/stocks')
    await expect(page.locator('h1')).toContainText('Stocks')
    
    // Check responsive navigation
    await page.setViewportSize({ width: 375, height: 667 })
    await page.click('[data-testid="mobile-menu-button"]')
    await expect(page.locator('text=Dashboard')).toBeVisible()
  })

  test('should toggle theme', async ({ page }) => {
    await page.goto('/')
    
    // Check initial theme
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)
    
    // Toggle to dark mode
    await page.click('button[aria-label="Toggle theme"]')
    await expect(html).toHaveClass(/dark/)
    
    // Reload and check persistence
    await page.reload()
    await expect(html).toHaveClass(/dark/)
  })
})