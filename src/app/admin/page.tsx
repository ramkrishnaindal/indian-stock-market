'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Role } from '@/lib/rbac'
import { usePermissions } from '@/hooks/usePermissions'

export default function AdminPage() {
  const { canReadUsers, canWriteUsers, canDeleteUsers } = usePermissions()

  return (
    <ProtectedRoute requiredRole={Role.ADMIN}>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {canReadUsers && (
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">User Management</h2>
              <p className="text-gray-600">View and manage users</p>
            </div>
          )}
          
          {canWriteUsers && (
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Stock Management</h2>
              <p className="text-gray-600">Add and edit stocks</p>
            </div>
          )}
          
          {canDeleteUsers && (
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">System Settings</h2>
              <p className="text-gray-600">Configure system settings</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}