'use client'

import { useTheme } from '@/contexts/ThemeContext'

export default function Template({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-colors`}>
      {children}
    </div>
  )
}