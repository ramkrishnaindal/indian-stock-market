'use client'

import { useState, useEffect } from 'react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertCircle, Clock } from 'lucide-react'

// Loading skeleton component
function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  )
}

// Stats card component
function StatsCard({ title, value, change, icon: Icon, isLoading }: {
  title: string
  value: string
  change?: string
  icon: any
  isLoading: boolean
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          {isLoading ? (
            <LoadingSkeleton className="h-8 w-24 mt-2" />
          ) : (
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          )}
          {change && !isLoading && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </div>
  )
}

// Portfolio section component
function PortfolioSection({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Portfolio Overview</h3>
      {isLoading ? (
        <div className="space-y-3">
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-3/4" />
          <LoadingSkeleton className="h-4 w-1/2" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Swing Trading</span>
            <span className="font-medium">₹45,000 (+2.3%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Short Term</span>
            <span className="font-medium">₹65,000 (-1.2%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Long Term</span>
            <span className="font-medium">₹1,15,000 (+5.7%)</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Market overview component
function MarketOverview({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Market Overview</h3>
      {isLoading ? (
        <div className="space-y-3">
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-2/3" />
          <LoadingSkeleton className="h-4 w-3/4" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">NIFTY 50</span>
            <span className="font-medium text-green-600">24,315 (+0.8%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">SENSEX</span>
            <span className="font-medium text-green-600">80,248 (+0.6%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">BANK NIFTY</span>
            <span className="font-medium text-red-600">52,145 (-0.3%)</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Top performers component
function TopPerformers({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <LoadingSkeleton className="h-4 w-20" />
              <LoadingSkeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">RELIANCE</span>
            <span className="text-sm text-green-600">+3.2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">TCS</span>
            <span className="text-sm text-green-600">+2.8%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">INFY</span>
            <span className="text-sm text-green-600">+2.1%</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Recent alerts component
function RecentAlerts({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <LoadingSkeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1">
                <LoadingSkeleton className="h-4 w-full mb-1" />
                <LoadingSkeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Buy signal for HDFC Bank</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Price alert: WIPRO reached ₹425</p>
              <p className="text-xs text-gray-500">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-full">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Stop loss triggered for ITC</p>
              <p className="text-xs text-gray-500">10 minutes ago</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's your market overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Portfolio Value"
              value="₹2,25,000"
              change="+4.2%"
              icon={DollarSign}
              isLoading={isLoading}
            />
            <StatsCard
              title="Today's P&L"
              value="+₹3,250"
              change="+1.5%"
              icon={TrendingUp}
              isLoading={isLoading}
            />
            <StatsCard
              title="Active Positions"
              value="18"
              icon={Activity}
              isLoading={isLoading}
            />
            <StatsCard
              title="Pending Orders"
              value="5"
              icon={Clock}
              isLoading={isLoading}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Portfolio & Market */}
            <div className="lg:col-span-2 space-y-6">
              <PortfolioSection isLoading={isLoading} />
              <MarketOverview isLoading={isLoading} />
            </div>

            {/* Right Column - Alerts & Performers */}
            <div className="space-y-6">
              <RecentAlerts isLoading={isLoading} />
              <TopPerformers isLoading={isLoading} />
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Portfolio Performance Chart</h3>
            {isLoading ? (
              <LoadingSkeleton className="h-64 w-full" />
            ) : (
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart component will be implemented in Phase 2</p>
              </div>
            )}
          </div>
      </div>
    </ProtectedRoute>
  )
}