'use client'

import { useAuth } from '@/hooks/useAuth'
import { Role, requireRole } from '@/lib/rbac'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: Role
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, requiredRole, fallback }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user && !requireRole(user.role, requiredRole)) {
    return fallback || <div className="text-center py-8">Access denied. Insufficient permissions.</div>
  }

  return <>{children}</>
}