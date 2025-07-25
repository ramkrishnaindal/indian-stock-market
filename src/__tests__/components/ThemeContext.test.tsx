import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  test('provides theme context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme')).toBeInTheDocument()
  })

  test('toggles theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    const toggleButton = screen.getByText('Toggle')
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })
})