'use client'

import { useState } from 'react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Plus, Minus, TrendingUp, TrendingDown, Search, X } from 'lucide-react'

function AddStockModal({ isOpen, onClose, portfolioType }: { isOpen: boolean, onClose: () => void, portfolioType: string }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [quantity, setQuantity] = useState('')
  
  const stocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.50 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4125.30 },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1685.75 }
  ]
  
  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Stock to {portfolioType}</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search Stock</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="max-h-32 overflow-y-auto">
            {filteredStocks.map((stock) => (
              <div key={stock.symbol} className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="flex justify-between">
                  <span className="font-medium">{stock.symbol}</span>
                  <span className="text-sm text-gray-600">₹{stock.price}</span>
                </div>
                <p className="text-xs text-gray-500">{stock.name}</p>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioTab({ name, isActive, onClick, performance }: { 
  name: string, 
  isActive: boolean, 
  onClick: () => void,
  performance: { value: string, change: string, isPositive: boolean }
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 rounded-lg border transition-colors ${
        isActive 
          ? 'bg-blue-50 border-blue-200 text-blue-700' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className="text-left">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-2xl font-bold mt-1">{performance.value}</p>
        <p className={`text-sm ${performance.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {performance.change}
        </p>
      </div>
    </button>
  )
}

function StockRow({ stock, onRemove }: { 
  stock: any, 
  onRemove: (symbol: string) => void 
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm">
            {stock.symbol.substring(0, 2)}
          </span>
        </div>
        <div>
          <p className="font-semibold">{stock.symbol}</p>
          <p className="text-sm text-gray-600">{stock.quantity} shares</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-semibold">{stock.currentValue}</p>
        <div className={`flex items-center space-x-1 text-sm ${
          stock.isProfit ? 'text-green-600' : 'text-red-600'
        }`}>
          {stock.isProfit ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{stock.change}</span>
        </div>
      </div>
      
      <button
        onClick={() => onRemove(stock.symbol)}
        className="p-2 text-red-600 hover:bg-red-50 rounded"
      >
        <Minus className="h-4 w-4" />
      </button>
    </div>
  )
}

function PerformanceSection({ portfolioType }: { portfolioType: string }) {
  const metrics = {
    'Swing Trading': {
      totalValue: '₹45,000',
      dayChange: '+₹1,250 (+2.85%)',
      totalReturn: '+₹5,000 (+12.5%)',
      isPositive: true
    },
    'Short Term': {
      totalValue: '₹65,000',
      dayChange: '-₹850 (-1.29%)',
      totalReturn: '+₹8,500 (+15.1%)',
      isPositive: false
    },
    'Long Term': {
      totalValue: '₹1,15,000',
      dayChange: '+₹2,100 (+1.86%)',
      totalReturn: '+₹25,000 (+27.8%)',
      isPositive: true
    }
  }
  
  const data = metrics[portfolioType as keyof typeof metrics]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg border">
        <p className="text-sm text-gray-600">Total Value</p>
        <p className="text-2xl font-bold">{data.totalValue}</p>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <p className="text-sm text-gray-600">Today's Change</p>
        <p className={`text-xl font-semibold ${
          data.isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {data.dayChange}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <p className="text-sm text-gray-600">Total Return</p>
        <p className="text-xl font-semibold text-green-600">{data.totalReturn}</p>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('Swing Trading')
  const [showAddModal, setShowAddModal] = useState(false)
  
  const portfolios = {
    'Swing Trading': {
      performance: { value: '₹45,000', change: '+2.85%', isPositive: true },
      stocks: [
        { symbol: 'RELIANCE', quantity: 10, currentValue: '₹28,475', change: '+1.51%', isProfit: true },
        { symbol: 'TCS', quantity: 4, currentValue: '₹16,501', change: '+2.8%', isProfit: true }
      ]
    },
    'Short Term': {
      performance: { value: '₹65,000', change: '-1.29%', isPositive: false },
      stocks: [
        { symbol: 'INFY', quantity: 25, currentValue: '₹42,144', change: '-0.45%', isProfit: false },
        { symbol: 'HDFCBANK', quantity: 15, currentValue: '₹23,133', change: '+0.85%', isProfit: true }
      ]
    },
    'Long Term': {
      performance: { value: '₹1,15,000', change: '+1.86%', isPositive: true },
      stocks: [
        { symbol: 'WIPRO', quantity: 100, currentValue: '₹42,580', change: '+3.2%', isProfit: true },
        { symbol: 'ICICIBANK', quantity: 58, currentValue: '₹72,245', change: '-1.2%', isProfit: false }
      ]
    }
  }
  
  const handleRemoveStock = (symbol: string) => {
    console.log(`Remove ${symbol} from ${activeTab}`)
  }
  
  const currentPortfolio = portfolios[activeTab as keyof typeof portfolios]
  
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Management</h1>
            <p className="text-gray-600">Manage your multi-strategy investment portfolios</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(portfolios).map(([name, data]) => (
              <PortfolioTab
                key={name}
                name={name}
                isActive={activeTab === name}
                onClick={() => setActiveTab(name)}
                performance={data.performance}
              />
            ))}
          </div>
          
          <PerformanceSection portfolioType={activeTab} />
          
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">{activeTab} Holdings</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add Stock</span>
              </button>
            </div>
            
            <div>
              {currentPortfolio.stocks.map((stock) => (
                <StockRow
                  key={stock.symbol}
                  stock={stock}
                  onRemove={handleRemoveStock}
                />
              ))}
            </div>
          </div>
      </div>
      
      <AddStockModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        portfolioType={activeTab}
      />
    </ProtectedRoute>
  )
}