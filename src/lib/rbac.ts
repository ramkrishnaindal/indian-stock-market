export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export enum Permission {
  READ_STOCKS = 'read:stocks',
  WRITE_STOCKS = 'write:stocks',
  READ_USERS = 'read:users',
  WRITE_USERS = 'write:users',
  DELETE_USERS = 'delete:users'
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.USER]: [Permission.READ_STOCKS],
  [Role.ADMIN]: [
    Permission.READ_STOCKS,
    Permission.WRITE_STOCKS,
    Permission.READ_USERS,
    Permission.WRITE_USERS,
    Permission.DELETE_USERS
  ]
}

export function hasPermission(userRole: string, permission: Permission): boolean {
  const role = userRole as Role
  return rolePermissions[role]?.includes(permission) || false
}

export function requireRole(userRole: string, requiredRole: Role): boolean {
  return userRole === requiredRole || (requiredRole === Role.USER && userRole === Role.ADMIN)
}