import { useAuth } from './useAuth'
import { Permission, hasPermission } from '@/lib/rbac'

export function usePermissions() {
  const { user } = useAuth()

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false
    return hasPermission(user.role, permission)
  }

  const isAdmin = (): boolean => {
    return user?.role === 'admin'
  }

  return {
    checkPermission,
    isAdmin,
    canReadStocks: checkPermission(Permission.READ_STOCKS),
    canWriteStocks: checkPermission(Permission.WRITE_STOCKS),
    canReadUsers: checkPermission(Permission.READ_USERS),
    canWriteUsers: checkPermission(Permission.WRITE_USERS),
    canDeleteUsers: checkPermission(Permission.DELETE_USERS)
  }
}