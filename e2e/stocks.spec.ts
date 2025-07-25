import { test, expect } from '@playwright/test'

test.describe('Stock Pages', () => {
  test('should display stock list and search', async ({ page }) => {
    await page.goto('/stocks')
    
    // Check stock list
    await expect(page.locator('text=Top Stocks')).toBeVisible()
    await expect(page.locator('text=RELIANCE')).toBeVisible()
    await expect(page.locator('text=TCS')).toBeVisible()
    
    // Test search functionality
    await page.fill('input[placeholder="Search stocks..."]', 'REL')
    await expect(page.locator('text=RELIANCE')).toBeVisible()
    await expect(page.locator('text=TCS')).not.toBeVisible()
  })

  test('should navigate to stock detail page', async ({ page }) => {
    await page.goto('/stocks')
    
    // Click on a stock
    await page.click('text=RELIANCE')
    
    // Check stock detail page
    await expect(page).toHaveURL('/stocks/reliance')
    await expect(page.locator('text=RELIANCE')).toBeVisible()
    await expect(page.locator('text=Price Chart')).toBeVisible()
    await expect(page.locator('text=Key Metrics')).toBeVisible()
    await expect(page.locator('text=Trading Signals')).toBeVisible()
  })
})