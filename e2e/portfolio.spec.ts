import { test, expect } from '@playwright/test'

test.describe('Portfolio Management', () => {
  test('should display portfolio tabs and switch between them', async ({ page }) => {
    await page.goto('/portfolio')
    
    // Check portfolio tabs
    await expect(page.locator('text=Swing Trading')).toBeVisible()
    await expect(page.locator('text=Short Term')).toBeVisible()
    await expect(page.locator('text=Long Term')).toBeVisible()
    
    // Switch to Short Term tab
    await page.click('text=Short Term')
    await expect(page.locator('text=Short Term Holdings')).toBeVisible()
    
    // Check performance metrics
    await expect(page.locator('text=Total Value')).toBeVisible()
    await expect(page.locator('text=Today\'s Change')).toBeVisible()
  })

  test('should open add stock modal', async ({ page }) => {
    await page.goto('/portfolio')
    
    // Click add stock button
    await page.click('text=Add Stock')
    
    // Check modal is open
    await expect(page.locator('text=Add Stock to Swing Trading')).toBeVisible()
    await expect(page.locator('input[placeholder="Search stocks..."]')).toBeVisible()
    
    // Close modal
    await page.click('text=Cancel')
    await expect(page.locator('text=Add Stock to Swing Trading')).not.toBeVisible()
  })
})