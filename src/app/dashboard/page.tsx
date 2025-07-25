'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Portfolio Value</h2>
            <p className="text-3xl font-bold text-green-600">₹1,25,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Today's P&L</h2>
            <p className="text-3xl font-bold text-red-600">-₹2,500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Stocks</h2>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}