import { render, screen } from '@testing-library/react'
import DashboardPage from '@/app/dashboard/page'

// Mock ProtectedRoute
jest.mock('@/components/auth/ProtectedRoute', () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe('Dashboard Page', () => {
  test('renders dashboard with key sections', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Total Portfolio Value')).toBeInTheDocument()
    expect(screen.getByText('Portfolio Overview')).toBeInTheDocument()
    expect(screen.getByText('Market Overview')).toBeInTheDocument()
  })

  test('shows loading states initially', () => {
    render(<DashboardPage />)
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })
})