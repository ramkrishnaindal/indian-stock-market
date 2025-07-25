'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { TrendingUp, Clock } from 'lucide-react'

function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
}

function StockHeader({ symbol, isLoading }: { symbol: string, isLoading: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          {isLoading ? (
            <>
              <LoadingSkeleton className="h-8 w-32 mb-2" />
              <LoadingSkeleton className="h-6 w-48" />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900">{symbol.toUpperCase()}</h1>
              <p className="text-gray-600">Reliance Industries Limited</p>
            </>
          )}
        </div>
        <div className="mt-4 md:mt-0 text-right">
          {isLoading ? (
            <>
              <LoadingSkeleton className="h-10 w-24 mb-1" />
              <LoadingSkeleton className="h-5 w-20" />
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-gray-900">₹2,847.50</div>
              <div className="text-green-600 font-medium">+42.30 (+1.51%)</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ChartArea({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-xl font-semibold">Price Chart</h2>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
            <button
              key={period}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      {isLoading ? (
        <LoadingSkeleton className="h-80 w-full" />
      ) : (
        <div className="h-80 bg-gray-50 rounded flex items-center justify-center">
          <p className="text-gray-500">TradingView chart will be integrated here</p>
        </div>
      )}
    </div>
  )
}

function KeyMetrics({ isLoading }: { isLoading: boolean }) {
  const metrics = [
    { label: 'Market Cap', value: '₹18,25,432 Cr' },
    { label: 'P/E Ratio', value: '24.5' },
    { label: '52W High', value: '₹3,024.90' },
    { label: '52W Low', value: '₹2,220.30' },
    { label: 'Volume', value: '1.2M' },
    { label: 'Avg Volume', value: '2.1M' }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index}>
            <p className="text-sm text-gray-600">{metric.label}</p>
            {isLoading ? (
              <LoadingSkeleton className="h-5 w-20 mt-1" />
            ) : (
              <p className="font-medium">{metric.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TradingSignals({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Trading Signals</h3>
      {isLoading ? (
        <div className="space-y-3">
          <LoadingSkeleton className="h-16 w-full" />
          <LoadingSkeleton className="h-16 w-full" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">BUY Signal</span>
            </div>
            <p className="text-sm text-green-700">Entry: ₹2,840 | Target: ₹2,950 | SL: ₹2,780</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">Watch Signal</span>
            </div>
            <p className="text-sm text-blue-700">Breakout above ₹2,860 for momentum trade</p>
          </div>
        </div>
      )}
    </div>
  )
}

function TechnicalIndicators({ isLoading }: { isLoading: boolean }) {
  const indicators = [
    { name: 'RSI (14)', value: '68.5', signal: 'Neutral' },
    { name: 'MACD', value: '12.3', signal: 'Bullish' },
    { name: 'SMA (20)', value: '₹2,785', signal: 'Bullish' },
    { name: 'Bollinger Bands', value: 'Upper', signal: 'Overbought' }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Technical Indicators</h3>
      <div className="space-y-3">
        {indicators.map((indicator, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{indicator.name}</p>
              {isLoading ? (
                <LoadingSkeleton className="h-4 w-16 mt-1" />
              ) : (
                <p className="text-sm text-gray-600">{indicator.value}</p>
              )}
            </div>
            {!isLoading && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                indicator.signal === 'Bullish' ? 'bg-green-100 text-green-800' :
                indicator.signal === 'Bearish' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {indicator.signal}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StockDetailPage() {
  const params = useParams()
  const symbol = params.symbol as string
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <StockHeader symbol={symbol} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ChartArea isLoading={isLoading} />
        </div>
        
        <div className="space-y-6">
          <KeyMetrics isLoading={isLoading} />
          <TradingSignals isLoading={isLoading} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TechnicalIndicators isLoading={isLoading} />
      </div>
    </div>
  )
}