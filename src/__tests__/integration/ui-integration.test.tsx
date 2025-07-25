import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Layout } from '@/components/layout/Layout'
import Home from '@/app/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}))

// Mock auth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}))

// Mock permissions hook
jest.mock('@/hooks/usePermissions', () => ({
  usePermissions: () => ({
    isAdmin: () => false,
    canReadUsers: false,
    canWriteUsers: false,
    canDeleteUsers: false,
  }),
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <Layout>
        {component}
      </Layout>
    </ThemeProvider>
  )
}

describe('UI Integration Tests', () => {
  test('renders home page with all integrated components', async () => {
    renderWithProviders(<Home />)
    
    // Check hero section
    expect(screen.getByText('Indian Stock Market')).toBeInTheDocument()
    expect(screen.getByText('Trading Platform')).toBeInTheDocument()
    expect(screen.getByText('Phase 1 Complete - All 18 Tasks Finished!')).toBeInTheDocument()
    
    // Check navigation buttons
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('View Dashboard')).toBeInTheDocument()
    
    // Check features section
    expect(screen.getByText('Powerful Features')).toBeInTheDocument()
    expect(screen.getByText('Advanced Analytics')).toBeInTheDocument()
    expect(screen.getByText('Secure Trading')).toBeInTheDocument()
    expect(screen.getByText('Multi-Portfolio Management')).toBeInTheDocument()
    
    // Check navigation cards
    expect(screen.getByText('Explore the Platform')).toBeInTheDocument()
    
    // Check completed tasks section
    expect(screen.getByText('Development Progress')).toBeInTheDocument()
    expect(screen.getByText('Next.js 14 with TypeScript setup')).toBeInTheDocument()
    
    // Check CTA section
    expect(screen.getByText('Ready to Start Trading?')).toBeInTheDocument()
  })

  test('navigation component renders correctly', () => {
    renderWithProviders(<Home />)
    
    // Check navigation elements
    expect(screen.getByText('StockTrader')).toBeInTheDocument()
    expect(screen.getByText('Stocks')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  test('all feature cards are rendered', () => {
    renderWithProviders(<Home />)
    
    const expectedFeatures = [
      'Advanced Analytics',
      'Secure Trading', 
      'Multi-Portfolio Management',
      'User Management',
      'Dark/Light Theme',
      'Live Market Data'
    ]
    
    expectedFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  test('navigation cards have proper links', () => {
    renderWithProviders(<Home />)
    
    // Check for navigation card links
    const dashboardCard = screen.getByText('Dashboard').closest('a')
    const stocksCard = screen.getByText('Stocks').closest('a')
    const portfolioCard = screen.getByText('Portfolio').closest('a')
    
    expect(dashboardCard).toHaveAttribute('href', '/dashboard')
    expect(stocksCard).toHaveAttribute('href', '/stocks')
    expect(portfolioCard).toHaveAttribute('href', '/portfolio')
  })

  test('completed tasks are displayed correctly', () => {
    renderWithProviders(<Home />)
    
    const expectedTasks = [
      'Next.js 14 with TypeScript setup',
      'Tailwind CSS & ShadCN/ui integration',
      'Docker Compose with PostgreSQL & Redis',
      'JWT Authentication with Google OAuth',
      'Role-based access control (RBAC)'
    ]
    
    expectedTasks.forEach(task => {
      expect(screen.getByText(task)).toBeInTheDocument()
    })
  })

  test('footer is rendered', () => {
    renderWithProviders(<Home />)
    
    expect(screen.getByText('© 2024 StockTrader. All rights reserved.')).toBeInTheDocument()
  })
})