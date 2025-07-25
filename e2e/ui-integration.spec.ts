import { test, expect } from '@playwright/test'

test.describe('UI Integration Tests', () => {
  test('home page loads with all integrated components', async ({ page }) => {
    await page.goto('/')
    
    // Check hero section
    await expect(page.getByText('Indian Stock Market')).toBeVisible()
    await expect(page.getByText('Trading Platform')).toBeVisible()
    await expect(page.getByText('Phase 1 Complete - All 18 Tasks Finished!')).toBeVisible()
    
    // Check navigation
    await expect(page.getByText('StockTrader')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Stocks' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
    
    // Check features section
    await expect(page.getByText('Powerful Features')).toBeVisible()
    await expect(page.getByText('Advanced Analytics')).toBeVisible()
    await expect(page.getByText('Secure Trading')).toBeVisible()
    await expect(page.getByText('Multi-Portfolio Management')).toBeVisible()
    
    // Check navigation cards
    await expect(page.getByText('Explore the Platform')).toBeVisible()
    const dashboardCard = page.getByRole('link').filter({ hasText: 'Dashboard' }).first()
    await expect(dashboardCard).toHaveAttribute('href', '/dashboard')
    
    // Check completed tasks
    await expect(page.getByText('Development Progress')).toBeVisible()
    await expect(page.getByText('Next.js 14 with TypeScript setup')).toBeVisible()
    
    // Check footer
    await expect(page.getByText('© 2024 StockTrader. All rights reserved.')).toBeVisible()
  })

  test('navigation between pages works correctly', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to stocks page
    await page.getByRole('link', { name: 'Stocks' }).click()
    await expect(page).toHaveURL('/stocks')
    await expect(page.getByText('Top Stocks')).toBeVisible()
    
    // Navigate to auth page
    await page.getByRole('link', { name: 'Login' }).click()
    await expect(page).toHaveURL('/auth')
    await expect(page.getByText('Welcome Back!')).toBeVisible()
    
    // Navigate back to home
    await page.getByText('StockTrader').click()
    await expect(page).toHaveURL('/')
  })

  test('theme toggle functionality works', async ({ page }) => {
    await page.goto('/')
    
    // Check initial light theme
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)
    
    // Click theme toggle button
    const themeToggle = page.getByRole('button').filter({ has: page.locator('svg') }).first()
    await themeToggle.click()
    
    // Check dark theme is applied
    await expect(html).toHaveClass(/dark/)
  })

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check mobile navigation
    const mobileMenuButton = page.getByRole('button').filter({ has: page.locator('svg') })
    await expect(mobileMenuButton.first()).toBeVisible()
    
    // Check responsive layout
    await expect(page.getByText('Indian Stock Market')).toBeVisible()
    await expect(page.getByText('Trading Platform')).toBeVisible()
  })

  test('stocks page integration', async ({ page }) => {
    await page.goto('/stocks')
    
    // Check stocks page elements
    await expect(page.getByText('Stocks')).toBeVisible()
    await expect(page.getByPlaceholder('Search stocks...')).toBeVisible()
    await expect(page.getByText('Top Stocks')).toBeVisible()
    
    // Check stock items
    await expect(page.getByText('RELIANCE')).toBeVisible()
    await expect(page.getByText('TCS')).toBeVisible()
    
    // Test search functionality
    await page.getByPlaceholder('Search stocks...').fill('RELIANCE')
    await expect(page.getByText('RELIANCE')).toBeVisible()
    await expect(page.getByText('TCS')).not.toBeVisible()
  })

  test('auth page integration', async ({ page }) => {
    await page.goto('/auth')
    
    // Check auth page elements
    await expect(page.getByText('Welcome Back!')).toBeVisible()
    await expect(page.getByText('Continue with Google')).toBeVisible()
    await expect(page.getByPlaceholder('Email Address')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()
    
    // Test form toggle
    await page.getByText("Don't have an account? Sign up here").click()
    await expect(page.getByText('Join Us Today')).toBeVisible()
    await expect(page.getByPlaceholder('Full Name')).toBeVisible()
  })

  test('portfolio page requires authentication', async ({ page }) => {
    await page.goto('/portfolio')
    
    // Should redirect to auth page or show login prompt
    // This depends on the ProtectedRoute implementation
    const currentUrl = page.url()
    expect(currentUrl).toMatch(/(auth|login)/)
  })

  test('dashboard page requires authentication', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Should redirect to auth page or show login prompt
    const currentUrl = page.url()
    expect(currentUrl).toMatch(/(auth|login)/)
  })

  test('stock detail page works', async ({ page }) => {
    await page.goto('/stocks/reliance')
    
    // Check stock detail elements
    await expect(page.getByText('RELIANCE')).toBeVisible()
    await expect(page.getByText('Price Chart')).toBeVisible()
    await expect(page.getByText('Key Metrics')).toBeVisible()
    await expect(page.getByText('Trading Signals')).toBeVisible()
    
    // Check chart timeframe buttons
    await expect(page.getByText('1D')).toBeVisible()
    await expect(page.getByText('1W')).toBeVisible()
    await expect(page.getByText('1M')).toBeVisible()
  })

  test('all pages have consistent navigation', async ({ page }) => {
    const pages = ['/', '/stocks', '/auth']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      // Check navigation is present
      await expect(page.getByText('StockTrader')).toBeVisible()
      
      // Check footer is present (except auth page which might have different layout)
      if (pagePath !== '/auth') {
        await expect(page.getByText('© 2024 StockTrader. All rights reserved.')).toBeVisible()
      }
    }
  })
})