import { useState, useEffect } from 'react'
import { JWTService } from '@/lib/jwt'

interface User {
  id: string
  email: string
  name?: string
  role: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken')
    
    if (!token) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      })
      return
    }

    if (JWTService.isTokenExpired(token)) {
      refreshToken()
      return
    }

    const payload = JWTService.decodeToken(token)
    if (payload) {
      setAuthState({
        user: {
          id: payload.userId,
          email: payload.email,
          role: payload.role || 'user'
        },
        isLoading: false,
        isAuthenticated: true
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('accessToken', data.accessToken)
        checkAuth()
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const register = async (email: string, password: string, name?: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('accessToken', data.accessToken)
        checkAuth()
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    }
  }

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('accessToken', data.accessToken)
        checkAuth()
      } else {
        logout()
      }
    } catch (error) {
      logout()
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('accessToken')
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      })
    }
  }

  return {
    ...authState,
    login,
    register,
    logout,
    refreshToken
  }
}