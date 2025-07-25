'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Search } from 'lucide-react'

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const stocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹2,847.50', change: '+1.51%', isPositive: true },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: '₹4,125.30', change: '+2.8%', isPositive: true },
    { symbol: 'INFY', name: 'Infosys Limited', price: '₹1,685.75', change: '-0.45%', isPositive: false },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: '₹1,542.20', change: '+0.85%', isPositive: true },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', price: '₹1,245.60', change: '-1.2%', isPositive: false },
    { symbol: 'WIPRO', name: 'Wipro Limited', price: '₹425.80', change: '+3.2%', isPositive: true }
  ]

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Stocks</h1>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Top Stocks</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredStocks.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/stocks/${stock.symbol.toLowerCase()}`}
                className="block px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {stock.symbol.substring(0, 2)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{stock.symbol}</p>
                        <p className="text-sm text-gray-600">{stock.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{stock.price}</p>
                    <div className={`flex items-center justify-end space-x-1 ${
                      stock.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{stock.change}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {filteredStocks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No stocks found matching your search.</p>
          </div>
        )}
    </div>
  )
}