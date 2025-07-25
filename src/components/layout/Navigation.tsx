'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { usePermissions } from '@/hooks/usePermissions'
import { useTheme } from '@/contexts/ThemeContext'
import { Menu, X, TrendingUp, User, LogOut, Sun, Moon } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const { isAdmin } = usePermissions()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', auth: true },
    { href: '/stocks', label: 'Stocks', auth: false },
    { href: '/portfolio', label: 'Portfolio', auth: true },
    { href: '/admin', label: 'Admin', auth: true, admin: true }
  ]

  const isActive = (href: string) => pathname === href

  const handleThemeToggle = () => {
    toggleTheme()
    // Force immediate style change
    if (theme === 'light') {
      document.body.style.backgroundColor = '#111827'
      document.body.style.color = '#ffffff'
      document.documentElement.style.backgroundColor = '#111827'
    } else {
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = '#000000'
      document.documentElement.style.backgroundColor = '#ffffff'
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">StockTrader</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.auth && !isAuthenticated) return null
              if (item.admin && !isAdmin()) return null
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <User className="h-4 w-4 mr-2 inline" />
                  {user?.name || user?.email}
                </Link>
                <button onClick={logout} className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Link href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {navItems.map((item) => {
              if (item.auth && !isAuthenticated) return null
              if (item.admin && !isAdmin()) return null
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            
            <button
              onClick={() => { handleThemeToggle(); setIsOpen(false) }}
              className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}