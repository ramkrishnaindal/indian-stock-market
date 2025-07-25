'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    
    if (newTheme === 'dark') {
      document.body.style.backgroundColor = '#111827'
      document.body.style.color = '#ffffff'
      document.documentElement.style.backgroundColor = '#111827'
    } else {
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = '#000000'
      document.documentElement.style.backgroundColor = '#ffffff'
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark'
    const initialTheme = saved || 'light'
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)