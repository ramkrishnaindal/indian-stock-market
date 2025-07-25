'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function PortfolioPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Holdings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Stock</th>
                    <th className="text-left py-2">Qty</th>
                    <th className="text-left py-2">Avg Price</th>
                    <th className="text-left py-2">Current Price</th>
                    <th className="text-left py-2">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">RELIANCE</td>
                    <td className="py-2">50</td>
                    <td className="py-2">₹2,450</td>
                    <td className="py-2">₹2,520</td>
                    <td className="py-2 text-green-600">+₹3,500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">TCS</td>
                    <td className="py-2">25</td>
                    <td className="py-2">₹3,200</td>
                    <td className="py-2">₹3,150</td>
                    <td className="py-2 text-red-600">-₹1,250</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}